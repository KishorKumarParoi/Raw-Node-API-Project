/*
 * Title :  check Handler
 * Description :  check Handler for checking Specific Routes
 * Author : Kishor Paroi
 * Date : 2023/10/05
 * Time :  10:38:59 AM
 */

// dependencies

// module scaffolding
const handler = {};

handler.checkHandler = (requestProperties, callback) => {
    // console.log(requestProperties);
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

handler._checks.post = (requestProperties, callback) => {};

handler._checks.get = (requestProperties, callback) => {};

handler._checks.put = (requestProperties, callback) => {};

handler._checks.delete = (requestProperties, callback) => {};

export default handler;
