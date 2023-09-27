/*
 * Title : No Handler
 * Description : 404 Not Found
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 6:19:15 PM
 */
// module scaffolding
const handler = {};

handler.noHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, {
        message: 'Your requested url was not found',
    });
};

// export module
export default handler;
