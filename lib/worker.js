/*
 * Title :  Worker for node js
 * Description : Worker for speeding up the application
 * Author : Kishor Paroi
 * Date : 2023/10/11
 * Time :  1:53:36 PM
 */

// dependencies
import http from 'http';
import https from 'https';
import url from 'node:url';
import notifications from '../helpers/notifications.js';
import utilities from '../helpers/utilities.js';
import data from './data.js';

console.log('🚀 ~ file: worker.js:11 ~ data:', data);

// module scaffolding
const worker = {};

// perform check
worker.performCheck = (realCheckData) => {
    let checkOutcome = {
        error: false,
        responseCode: false,
    };

    let outcomeSent = false;

    // parse the hostname and full url from the original check data

    const originalCheckData = realCheckData;
    const parsedUrl = url.parse(`${originalCheckData.protocol}://${originalCheckData.url}`, true);
    const { hostname } = parsedUrl;
    const { path } = parsedUrl;

    // construct the request
    const requestDetails = {
        protocol: `${originalCheckData.protocol}:`,
        hostname,
        method: originalCheckData.method.toUpperCase(),
        path,
        timeout: originalCheckData.timeOutSeconds * 1000,
    };

    console.log('🚀 ~ file: worker.js:36 ~ requestDetails:', requestDetails);

    const protocolToUse = originalCheckData.protocol === 'http' ? http : https;

    const req = protocolToUse.request(requestDetails, (res) => {
        // grab the status cod eof response
        const status = res.statusCode;
        console.log('🚀 ~ file: worker.js:46 ~ req ~ status:', status);
        checkOutcome.responseCode = status;

        // update the check outcome and pass to the next process
        if (!outcomeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.on('error', (e) => {
        checkOutcome = {
            error: true,
            value: e,
        };
        if (!outcomeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    req.on('timeout', () => {
        checkOutcome = {
            error: true,
            value: 'timeout',
        };
        if (!outcomeSent) {
            worker.processCheckOutcome(originalCheckData, checkOutcome);
            outcomeSent = true;
        }
    });

    // req end()
    req.end();
};

// save check outcome to database and send to next process
worker.processCheckOutcome = (originalCheckData, checkOutcome) => {
    // check if check outcome is up or down
    const state =
        !checkOutcome.error &&
        checkOutcome.responseCode &&
        originalCheckData.successCodes.indexOf(checkOutcome.responseCode) > -1
            ? 'up'
            : 'down';

    // decide whether we should alert the user or not
    const alertWanted = !!(originalCheckData.lastChecked && originalCheckData.state !== state);

    // update the check data
    const newCheckData = originalCheckData;
    newCheckData.state = state;
    newCheckData.lastChecked = Date.now();

    data.update('checks', newCheckData.id, newCheckData, (err) => {
        if (!err) {
            // send the checkData to next process;
            if (alertWanted) {
                worker.alertUserToStatusChange(newCheckData);
            } else {
                console.log('Alert is not needed as there is no state change happended!');
            }
        } else {
            console.log(
                'Error : Error happened trying to save the new check data of one of the checks!'
            );
        }
    });
};

// send notification sms to user if state changes
worker.alertUserToStatusChange = (newCheckData) => {
    const msg = `Alert : Your Check for ${newCheckData.method.toUpperCase()} ${
        newCheckData.protocol
    }://${newCheckData.url} is currently
    ${newCheckData.state}`;

    notifications.sendTwilioSms(newCheckData.userPhone, msg, (err) => {
        if (!err) {
            console.log(`User was alerted to a status change VIA SMS : ${msg}`);
        } else {
            console.log('There was error in sending message to one of the user!');
        }
    });
};

worker.validateCheckData = (realCheckData) => {
    const originalCheckData = realCheckData;
    if (originalCheckData && originalCheckData.id) {
        originalCheckData.state =
            typeof originalCheckData.state === 'string' &&
            ['up', 'down'].indexOf(originalCheckData.state) > -1
                ? originalCheckData.state
                : 'down';
        originalCheckData.lastChecked =
            typeof originalCheckData.lastChecked === 'number' && originalCheckData.lastChecked > 0
                ? originalCheckData.lastChecked
                : false;

        // pass to the next process
        worker.performCheck(originalCheckData);
    } else {
        console.log('error : check was invalid or not properly formatted!');
    }
};

// lookup all the checks
worker.gatherAllChecks = () => {
    // get all the checks
    data.list('checks', (err, checks) => {
        console.log('🚀 ~ file: worker.js:164 ~ data.list ~ err:', err);
        console.log('🚀 ~ file: worker.js:181 ~ data.list ~ checks:', checks);

        if (!err && checks && checks.length > 0) {
            checks.forEach((check) => {
                // read the checkData
                data.read('checks', check, (err2, realCheckData) => {
                    if (!err2 && realCheckData) {
                        // pass the data into valdiation check
                        worker.validateCheckData(utilities.parseJSON(realCheckData));
                    } else {
                        console.log('error : reading one of the checks data!');
                    }
                });
                console.log(check);
            });
        } else {
            console.log('error : could not find any checks to process!');
        }
    });
};

// timer to start the worker process once in every minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 1000 * 60);
};

// start the worker
worker.init = () => {
    console.log('worker started successfully');
    // execute all checks
    worker.gatherAllChecks();

    // call the loop so that checks continue to execute on their own
    worker.loop();
};

// export module
export default worker;
