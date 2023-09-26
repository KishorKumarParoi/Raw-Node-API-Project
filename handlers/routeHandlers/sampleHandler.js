/*
 * Title : Sample Handler
 * Description : Sample Handler for Routes
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 4:36:33 PM
 */

// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: 'This is a sample url',
    });
};
// export module
export default handler;
