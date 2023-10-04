/*
 * Title :  Token Handler
 * Description : Token Handler for User Specific Routes
 * Author : Kishor Paroi
 * Date : 2023/10/03
 * Time :  12:08:59 PM
 */

// dependencies
import utilities from '../../helpers/utilities.js';
import data from '../../lib/data.js';

// module scaffolding
const handler = {};

handler.tokenHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.includes(requestProperties.method)) {
        handler._tokens[requestProperties.method](requestProperties, callback);
    } else {
        callback(405, {
            message: "Can't get User",
        });
    }
};

handler._tokens = {};

handler._tokens.post = (requestProperties, callback) => {
    console.log('🚀 ~ file: tokenHandler.js:31 ~ requestProperties:', requestProperties);
    const phone =
        typeof requestProperties.body.phone === 'string' &&
        requestProperties.body.phone.trim().length === 11
            ? requestProperties.body.phone
            : false;

    const password =
        typeof requestProperties.body.password === 'string' &&
        requestProperties.body.password.trim().length > 0
            ? requestProperties.body.password
            : false;

    console.log('🚀 ~ file: tokenHandler.js:44 ~ password:', password);
    console.log('🚀 ~ file: tokenHandler.js:44 ~ phone:', phone);

    if (phone && password) {
        data.read('users', phone, (err1, uData) => {
            const userData = uData;
            const hashedPassword = utilities.hash(password);

            if (hashedPassword === utilities.parseJSON(userData).password) {
                const tokenId = utilities.createRandomString(55);
                const expires = Date.now() + 60 * 60 * 1000;
                const tokenObject = {
                    phone,
                    id: tokenId,
                    expires,
                };

                // store the token in database
                data.create('tokens', tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(400, {
                            error: 'There was a problem from server side',
                        });
                    }
                });
            } else {
                callback(400, {
                    error: 'Password is not valid',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};
handler._tokens.get = (requestProperties, callback) => {
    console.log('🚀 ~ file: tokenHandler.js:86 ~ requestProperties:', requestProperties);
    console.log(requestProperties.queryStringObject.id.length);

    // check if id is valid
    const id =
        typeof requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 55
            ? requestProperties.queryStringObject.id
            : false;

    console.log('🚀 ~ file: tokenHandler.js:89 ~ id:', id);

    // lookup the token
    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            const token = { ...utilities.parseJSON(tokenData) };
            console.log('🚀 ~ file: tokenHandler.js:138 ~ data.read ~ token:', token);
            if (!err && token) {
                delete token.password;
                callback(200, token);
            } else {
                callback(404, {
                    error: 'Requested token not found in server',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested URL not found',
        });
    }
};

// TODO: Authentication
handler._tokens.put = (requestProperties, callback) => {
    const id =
        typeof requestProperties.body.id === 'string' &&
        requestProperties.body.id.trim().length === 55
            ? requestProperties.body.id
            : false;

    const extend = !!(
        typeof requestProperties.body.extend === 'boolean' && requestProperties.body.extend === true
    );

    if (id && extend) {
        data.read('tokens', id, (err, tokenData) => {
            const tokenObject = { ...utilities.parseJSON(tokenData) };

            console.log('🚀 ~ file: tokenHandler.js:134 ~ data.read ~ Date.now():', Date.now());
            console.log(
                '🚀 ~ file: tokenHandler.js:135 ~ data.read ~ tokenObject.expire:',
                tokenObject.expires
            );

            if (tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 60 * 60 * 1000;
            }

            // store in database
            data.update('tokens', id, tokenObject, (err2) => {
                if (!err2) {
                    callback(200, {
                        message: 'Token was updated successfully',
                    });
                } else {
                    callback(400, {
                        error: 'Token was expired',
                    });
                }
            });
        });
    } else {
        callback(400, {
            Error: 'There is a problem in your request',
        });
    }
};

handler._tokens.delete = (requestProperties, callback) => {
    console.log(
        '🚀 ~ file: tokenHandler.js:166 ~ handler._tokens.delete ~ requestProperties:',
        requestProperties
    );
    const id =
        typeof requestProperties.queryStringObject.id === 'string' &&
        requestProperties.queryStringObject.id.trim().length === 55
            ? requestProperties.queryStringObject.id
            : false;
    console.log('🚀 ~ file: tokenHandler.js:129 ~ id:', id);

    // lookup the user
    if (id) {
        data.read('tokens', id, (err, tokenData) => {
            if (!err && tokenData) {
                data.delete('tokens', id, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'Token was successfully deleted',
                        });
                    } else {
                        callback(404, {
                            message: "Can't delete token ",
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'There was server side error',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested URL not found',
        });
    }
};

export default handler;
