/*
 * Title : Uptime Monitoring Application
 * Description : A RESTFul API to monitor up or down time of user defined links
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 9:42:10 PM
 */

// Dependencies
import http from 'http';

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
    res.writeHead(200, {
        'Content-Type': 'text/plain',
    });
    res.write(`
Hi Kishor, I'm from Node JS.
I will first finish All of from Sumit vai
then Fayzul Karim Vai, then HM Naym Vai
then I will start learning AWS from Avisek
then I will start learning Blockchain from learnweb3.0
Hello World of Programming Kishor !!!
`);
    res.end('Hello World KKP!!!');
};

// Start the server
app.createServer();
