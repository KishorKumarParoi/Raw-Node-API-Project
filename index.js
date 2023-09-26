/*
 * Title : Uptime Monitoring Application
 * Description : A RESTFul API to monitor up or down time of user defined links
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 9:42:10 PM
 */

// Dependencies
import http from 'http';
import url from 'url';

// App Object - Module Scaffolding
const app = {};

// Configuration
app.config = {
    port: 3000,
};

// Create Server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`);
    });
};

// Handle Request and Response
app.handleReqRes = (req, res) => {
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

    // response handle
    res.end('Hello World KKP!!!');
};

// Start the server
app.createServer();
