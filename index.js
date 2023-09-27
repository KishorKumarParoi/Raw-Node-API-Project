/*
 * Title : Uptime Monitoring Application
 * Description : A RESTFul API to monitor up or down time of user defined links
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 9:42:10 PM
 */

// Dependencies
import http from 'http';
import handler from './helpers/handleReqRes.js';

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
        console.log('Environment variable : ', process.env.NODE_ENV);
        console.log(`Listening to port ${app.config.port}`);
    });
};

// Handle Request and Response
app.handleReqRes = handler.handleReqRes;

// Start the server
app.createServer();
