/*
 * Title :  Notification for Twilio SMS
 * Description : Sending notification to phone using Twilio SMS API
 * Author : Kishor Paroi
 * Date : 2023/10/10
 * Time :  12:45:25 PM
 */

// dependencies
// import https from 'https';
import queryString from 'querystring';
import environmentVariables from './environmentVariables.js';
// module scaffolding
const notifications = {};
const { twilio } = environmentVariables;

// send sms to user using Twilio api

notifications.sendTwilioSms = (phone, message, callback) => {
    // input validation
    const userPhone = typeof phone === 'number' && phone.trim().length === 1 ? phone.trim() : false;
    const userMessage =
        typeof message === 'string' && message.trim().length > 0 && message.trim().length <= 1600
            ? message.trim()
            : false;

    if (userMessage && userPhone) {
        // configure the request payload
        const payload = {
            From: twilio.fromPhone,
            To: `+88${userPhone}`,
            Body: userMessage,
        };

        // stringify the payload
        const stringifyPayload = queryString.stringify(payload);
        console.log('🚀 ~ file: notifications.js:37 ~ stringifyPayload:', stringifyPayload);

        const requestDetails = {
            hostname: 'api.twilio.com',
            method: 'POST',
            path: `/2010-04-01/Accounts/${twilio.accoutSid}/Messages.json`,
            auth: `${twilio.accoutSid}:${twilio.authToken}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        };
        console.log('🚀 ~ file: notifications.js:43 ~ requestDetails:', requestDetails);
    } else {
        callback('Given parameters were missing or invalid!');
    }
};

export default notifications;
