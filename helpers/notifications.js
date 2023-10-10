/*
 * Title :  Notification for Twilio SMS
 * Description : Sending notification to phone using Twilio SMS API
 * Author : Kishor Paroi
 * Date : 2023/10/10
 * Time :  12:45:25 PM
 */

// dependencies
// import https from 'https';
import environmentVariables from './environmentVariables.js';

// module scaffolding
const notifications = {};

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
            From: environmentVariables.twilio.fromPhone;
            To: `+88${userPhone}`,
            Body : userMessage
        }

        // stringify the payload
        
    } else {
        callback('Given parameters were missing or invalid!');
    }
};

export default notifications;
