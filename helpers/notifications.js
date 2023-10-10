/*
 * Title :  Notification for Twilio SMS
 * Description : Sending notification to phone using Twilio SMS API
 * Author : Kishor Paroi
 * Date : 2023/10/10
 * Time :  12:45:25 PM
 */

// dependencies
import https from 'https';
import queryString from 'querystring';
import environments from './environmentVariables.js';

// module scaffolding
const notifications = {};

// send sms to user using Twilio api

notifications.sendTwilioSms = (phone, message, callback) => {
    console.log('🚀 ~ file: notifications.js:19 ~ phone:', phone);
    // input validation
    const userPhone =
        typeof phone === 'string' && phone.trim().length === 11 ? phone.trim() : false;
    const userMessage =
        typeof message === 'string' && message.trim().length > 0 && message.trim().length <= 1600
            ? message.trim()
            : false;

    console.log('🚀 ~ file: notifications.js:27 ~ userPhone):', userPhone);
    console.log('🚀 ~ file: notifications.js:27 ~ userMessage:', userMessage);

    if (userMessage && userPhone) {
        // configure the request payload
        const payload = {
            From: environments.twilio.fromPhone,
            Body: userMessage,
            To: `+88${userPhone}`,
        };

        console.log('🚀 ~ file: notifications.js:39 ~ environments.twilio:', environments.twilio);

        // stringify the payload
        const stringifyPayload = queryString.stringify(payload);
        console.log('🚀 ~ file: notifications.js:37 ~ stringifyPayload:', stringifyPayload);

        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${environments.twilio.accountSid}/Messages.json`,
            auth: `${environments.twilio.accountSid}:${environments.twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        console.log('🚀 ~ file: notifications.js:43 ~ requestDetails:', requestDetails);

        // instantiate the request object
        const req = https.request(requestDetails, (res) => {
            // get the status of the sent request
            const status = res.statusCode;
            // callback successfully if the request went through
            if (status === 200 || status === 201) {
                callback(false);
            } else {
                callback(`Status code returned ${status}`);
            }
        });
        req.on('error', (e) => {
            callback(e);
        });
        req.write(stringifyPayload);
        req.end();
    } else {
        callback('Given parameters were missing or invalid!');
    }
};

export default notifications;
