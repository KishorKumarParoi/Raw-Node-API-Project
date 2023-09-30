/*
 * Title :  User Handler
 * Description :  User Handler for User Specific Routes
 * Author : Kishor Paroi
 * Date : 2023/09/30
 * Time :  10:38:59 AM
 */

// dependencies

// module scaffolding
const handler = {};

handler.userHandler = (requestProperties, callback) => {
    console.log(requestProperties);
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
    callback(500, {
        message: 'Posted',
    });
};
handler._users.get = (requestProperties, callback) => {
    callback(200, {
        message: 'Hello World',
    });
};
handler._users.put = (requestProperties, callback) => {
    callback(100);
};
handler._users.delete = (requestProperties, callback) => {
    callback(300);
};

export default handler;
