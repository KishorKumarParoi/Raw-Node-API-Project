/*
 * Title : Handling Request Response
 * Description : Handle Request Response of Monitoring API Project
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 4:18:33 PM
 */

// Dependencies
import { StringDecoder } from 'string_decoder';
import url from 'url';
import routes from '../routes.js';

// App Object - Module Scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const q = req.url;
    const parsedUrl = url.parse(req.url, true);
    console.log(q);
    console.log(parsedUrl);

    // get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log(trimmedPath);

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : routes.notFound;
    console.log('chosenHandler : ', chosenHandler);

    const method = req.method.toLowerCase();
    console.log(method);

    // get the query string as an object
    const queryStringObject = parsedUrl.query;
    console.log(queryStringObject);

    // get the query headers as an object
    const headersObject = req.headers;
    console.log(headersObject);

    // string decoder
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        // response handle
        res.end('Hello World KKP!!!');
    });
};

// export the module
export default handler;
