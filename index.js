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
import notifications from './helpers/notifications.js';
import data from './lib/data.js';

// App Object - Module Scaffolding
const app = {};
// ! To Do : Delete kore dite hobe test korar pore
// Testing Purpose

notifications.sendTwilioSms('01724870810', 'Hello Kishor', (err) => {
    console.log('THis is the error : ', err);
});

console.log(data);
console.log(process.cwd);

// data.create(
//     'test',
//     'newFile',
//     {
//         name: 'Kishor',
//         title: 'Paroi',
//         middleName: 'Kumar',
//     },
//     (err) => {
//         console.log(err, 'Kishor');
//     }
// );

data.read('test', 'newFile', (err, result) => {
    console.log(err, result);
});

// data.update(
//     'test',
//     'newFile',
//     {
//         name: 'Kishor Kumar Paroi',
//         age: 24,
//         dream: 'AI Developer',
//         salary: '1M Dollar',
//     },
//     (err) => {
//         console.log(err);
//     }
// );

// data.delete('test', 'newFile', (err) => {
//     console.log(err);
// });

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
