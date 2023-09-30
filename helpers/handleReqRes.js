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

    const method = req.method.toLowerCase();
    console.log(method);

    // get the query string as an object
    const queryStringObject = parsedUrl.query;
    console.log(queryStringObject);

    // get the query headers as an object
    const headersObject = req.headers;
    console.log(headersObject);

    // request properties
    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headersObject,
    };

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : routes.notFound;
    console.log('chosenHandler : ', chosenHandler);

    let realData = '';
    // string decoder
    const decoder = new StringDecoder('utf-8');

    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();
        console.log('realdata : ', realData);

        requestProperties.body = realData;
        console.log('RequestProperties : ', requestProperties);

        chosenHandler(requestProperties, (statusCode, payload) => {
            let insideStatusCode = statusCode;
            let insidePayload = payload;
            insideStatusCode = typeof statusCode === 'number' ? insideStatusCode : 500;
            insidePayload = typeof payload === 'object' ? insidePayload : {};

            const payloadString = JSON.stringify(insidePayload);

            // return the final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(insideStatusCode);
            res.end(payloadString);
        });
    });
};

// export the module
export default handler;
