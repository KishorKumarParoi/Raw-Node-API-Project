/*
 * Title : Uptime Monitoring Application
 * Description : A RESTFul API to monitor up or down time of user defined links
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 9:42:10 PM
 */

// Dependencies
import http from 'http';
import environment from './helpers/environmentVariables.js';
import handler from './helpers/handleReqRes.js';
import data from './lib/data.js';

// App Object - Module Scaffolding
const app = {};
// ! To Do : Delete kore dite hobe test korar pore
// Testing Purpose
console.log(data);
console.log(process.cwd);

data.create(
    'test',
    'newFile',
    {
        name: 'Kishor',
        title: 'Paroi',
        middleName: 'Kumar',
    },
    (err) => {
        console.log(err, 'Kishor');
    }
);

data.read('test', 'newFile', (err, info) => {
    console.log(err, info);
});

// Create Server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log('Environment variable : ', environment.port);
        console.log(`Listening to port ${environment.port}`);
    });
};

// Handle Request and Response
app.handleReqRes = handler.handleReqRes;
console.log('process.cwd() : ', process.cwd());
// Start the server
app.createServer();
