/*
 * Title :  Check Handler
 * Description :  Check Handler for checking Specific Routes
 * Author : Kishor Paroi
 * Date : 2023/10/05
 * Time :  10:38:59 AM
 */

// dependencies
import environmentVariables from '../../helpers/environmentVariables.js';
import utilities from '../../helpers/utilities.js';
import data from '../../lib/data.js';
import tokenHandler from './tokenHandler.js';

// module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    console.log('🚀 ~ file: checkHandler.js:19 ~ requestProperties:', requestProperties);

    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    console.log('🚀 ~ file: checkHandler.js:22 ~ acceptedMethods:', acceptedMethods);
    console.log(
        '🚀 ~ file: checkHandler.js:25 ~ requestProperties.method:',
        requestProperties.method
    );

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
        ['GET', 'POST', 'PUT', 'DELETE'].includes(requestProperties.body.method)
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

    const obj = {
        protocol,
        url,
        method,
        successCodes,
        timeOutSeconds,
    };

    console.log('🚀 ~ file: checkHandler.js:70 ~ obj:', obj);

    if (protocol && url && method && successCodes && timeOutSeconds) {
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
                    if (!err2 && uData) {
                        tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
                            if (tokenIsValid) {
                                const userObject = {
                                    ...utilities.parseJSON(uData),
                                };
                                console.log(
                                    '🚀 ~ file: checkHandler.js:101 ~ tokenHandler._token.verify ~ userObject:',
                                    userObject
                                );

                                const userChecks =
                                    typeof userObject.checks === 'object' &&
                                    userObject.checks instanceof Array
                                        ? userObject.checks
                                        : [];

                                console.log(
                                    '🚀 ~ file: checkHandler.js:108 ~ tokenHandler._token.verify ~ userChecks:',
                                    userChecks
                                );

                                if (userChecks.length < environmentVariables.maxChecks) {
                                    const checkId = utilities.createRandomString(11);
                                    const checkObject = {
                                        id: checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeOutSeconds,
                                    };

                                    // save the object
                                    data.create('checks', checkId, checkObject, (err3) => {
                                        if (!err3) {
                                            //  add check id to user's object
                                            userObject.checks = userChecks;
                                            userObject.checks.push(checkId);

                                            console.log(
                                                '🚀 ~ file: checkHandler.js:136 ~ data.create ~ userObject:',
                                                userObject
                                            );

                                            // save the updated userObject
                                            data.update('users', userPhone, userObject, (err4) => {
                                                if (!err4) {
                                                    callback(200, checkObject);
                                                } else {
                                                    callback(400, {
                                                        error: 'There was error in server side',
                                                    });
                                                }
                                            });
                                        } else {
                                            callback(500, {
                                                error: 'There was sever side error',
                                            });
                                        }
                                    });
                                } else {
                                    callback(401, {
                                        error: 'User already reached maximum check limit',
                                    });
                                }
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

handler._checks.get = (requestProperties, callback) => {
    const id =
        requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 11
            ? requestProperties.queryStringObject.id
            : false;

    console.log('🚀 ~ file: checkHandler.js:190 ~ id:', id);

    if (id) {
        // lookup the user
        data.read('checks', id, (err, checkData) => {
            if (!err && checkData) {
                const userObject = utilities.parseJSON(checkData);
                const token =
                    typeof requestProperties.headersObject.token === 'string'
                        ? requestProperties.headersObject.token
                        : false;

                tokenHandler._token.verify(token, userObject.userphone, (tokenIsValid) => {
                    if (!tokenIsValid) {
                        callback(200, userObject);
                    } else {
                        callback(403, {
                            error: 'Authentication Failure',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'You have problem in your request',
                });
            }
        });
    } else {
        callback(400, {
            error: "Can't get Data",
        });
    }
};

handler._checks.put = (requestProperties, callback) => {
    callback(400);
};

handler._checks.delete = (requestProperties, callback) => {
    callback(300);
};

export default handler;
