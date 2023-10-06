/*
 * Title :  Check Handler
 * Description :  Check Handler for checking Specific Routes
 * Author : Kishor Paroi
 * Date : 2023/10/05
 * Time :  10:38:59 AM
 */

// dependencies
import utilities from '../../helpers/utilities.js';
import data from '../../lib/data.js';
import tokenHandler from './tokenHandler.js';

// module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.includes(requestProperties.method)) {
        handler._checks[requestProperties.method](requestProperties, callback);
    } else {
        callback(405, {
            message: "Can't get check",
        });
    }
};

handler._checks = {};

handler._checks.post = (requestProperties, callback) => {
    // validate methods
    const protocol =
        typeof requestProperties.body.protocol === 'string' &&
        ['http', 'https'].includes(requestProperties.body.protocol)
            ? requestProperties.body.protocol
            : false;
    const url =
        typeof requestProperties.body.url === 'string' &&
        requestProperties.body.url.trim().length > 0
            ? requestProperties.body.url
            : false;
    const method =
        typeof requestProperties.body.method === 'string' &&
        ['get', 'put', 'post', 'delete'].includes(requestProperties.body.method)
            ? requestProperties.body.method
            : false;

    const successCodes =
        typeof requestProperties.body.successCodes === 'object' &&
        requestProperties.body.successCodes instanceof Array
            ? requestProperties.body.successCodes
            : false;

    const timeOutSeconds =
        typeof requestProperties.body.timeOutSeconds === 'number' &&
        requestProperties.body.timeOutSeconds % 1 === 0 &&
        requestProperties.body.timeOutSeconds >= 1 &&
        requestProperties.body.timeOutSeconds <= 5
            ? requestProperties.body.timeOutSeconds
            : false;

    if (protocol && url && method & successCodes && timeOutSeconds) {
        const token =
            typeof requestProperties.headersObject.token === 'string'
                ? requestProperties.headersObject.token
                : false;

        // lookup the user phone by reading the token
        data.read('tokens', token, (err1, tData) => {
            const tokenData = { ...utilities.parseJSON(tData) };

            if (!err1 && tokenData) {
                const userPhone = tokenData.phone;

                // lookup the user
                data.read('users', userPhone, (err2, uData) => {
                    const userData = { ...utilities.parseJSON(uData) };
                    if (!err2 && userData) {
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
                            if (tokenIsValid) {
                            } else {
                                callback(403, {
                                    error: 'Check Authentication Problem',
                                });
                            }
                        });
                    } else {
                        callback(403, {
                            error: 'User Authentication Problem',
                        });
                    }
                });
            } else {
                callback(403, {
                    error: 'Token Authentication Problem ',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};

handler._checks.get = (requestProperties, callback) => {};

handler._checks.put = (requestProperties, callback) => {};

handler._checks.delete = (requestProperties, callback) => {};

export default handler;
