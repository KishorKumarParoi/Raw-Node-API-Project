/*
 * Title :  Worker for node js
 * Description : Worker for speeding up the application
 * Author : Kishor Paroi
 * Date : 2023/10/11
 * Time :  1:53:36 PM
 */

// dependencies
import url from 'node:url';
import utilities from '../helpers/utilities.js';
import data from './data.js';

console.log('🚀 ~ file: worker.js:11 ~ data:', data);

// module scaffolding
const worker = {};

// perform check
worker.performCheck = (realCheckData) => {
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
