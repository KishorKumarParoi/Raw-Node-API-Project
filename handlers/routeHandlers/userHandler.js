/*
 * Title :  User Handler
 * Description :  User Handler for User Specific Routes
 * Author : Kishor Paroi
 * Date : 2023/09/30
 * Time :  10:38:59 AM
 */

// dependencies
import utilities from '../../helpers/utilities.js';
import data from '../../lib/data.js';

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.includes(requestProperties.method)) {
        handler._users[requestProperties.method](requestProperties, callback);
    } else {
        callback(405, {
            message: "Can't get User",
        });
    }
};

handler._users = {};
handler._users.post = (requestProperties, callback) => {
    const firstName =
        typeof requestProperties.body.firstName === 'string' &&
        requestProperties.body.firstName.trim().length > 0
            ? requestProperties.body.firstName
            : false;
    const lastName =
        typeof requestProperties.body.lastName === 'string' &&
        requestProperties.body.lastName.trim().length > 0
            ? requestProperties.body.lastName
            : false;
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
    const tosAgreement =
        typeof requestProperties.body.tosAgreement === 'boolean'
            ? requestProperties.body.tosAgreement
            : false;

    console.log('Handler-requestProperties : ', requestProperties);
    console.log(firstName, lastName, phone, password, tosAgreement);

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure the user data doesn't already exist
        data.read('users', phone, (err) => {
            if (err) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: utilities.hash(password),
                    tosAgreement,
                };

                // storing data to database
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        console.log('User is created successfully');
                    } else {
                        callback(500, {
                            error: 'Could not create user',
                        });
                    }
                });
            } else {
                // data.update(
                //     'users',
                //     phone,
                //     {
                //         firstName: 'Pallabi',
                //         lastName: 'Karmaker',
                //         phone: '01775293579',
                //         password: 'securePassword123',
                //         tosAgreement: true,
                //     },
                //     (err4) => {
                //         console.log(
                //             '🚀 ~ file: userHandler.js:93 ~ data.read ~ err4: Error Happened',
                //             err4
                //         );
                //     }
                // );

                // if data exists delete data
                // data.delete('user', phone, (err2) => {
                //     console.log(`deleted ${phone} data : `, err2);
                // });

                callback(500, {
                    error: 'There was an error from server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem in your request',
        });
    }
};
handler._users.get = (requestProperties, callback) => {
    console.log('🚀 ~ file: userHandler.js:117 ~ requestProperties:', requestProperties);
    // check if the phone number is valid
    console.log(
        '🚀 ~ file: userHandler.js:119 ~ queryStringObject:',
        requestProperties.queryStringObject
    );
    const phone =
        typeof requestProperties.queryStringObject.phone === 'string' &&
        requestProperties.queryStringObject.phone.trim().length === 11
            ? requestProperties.queryStringObject.phone
            : false;
    console.log('🚀 ~ file: userHandler.js:129 ~ phone:', phone);

    // lookup the user
    if (phone) {
        data.read('users', phone, (err, u) => {
            const user = { ...utilities.parseJSON(u) };
            if (!err && user) {
                delete user.password;
                callback(200, user);
            } else {
                callback(404, {
                    error: 'Requested user not found in server',
                });
            }
        });
    } else {
        callback(404, {
            error: 'Requested URL not found',
        });
    }
};
handler._users.put = (requestProperties, callback) => {
    callback(100);
};
handler._users.delete = (requestProperties, callback) => {
    callback(300);
};

export default handler;
