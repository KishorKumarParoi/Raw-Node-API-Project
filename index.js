/*
 * Title : Uptime Monitoring Application
 * Description : A RESTFul API to monitor up or down time of user defined links
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 9:42:10 PM
 */

// Dependencies
import http from 'http';

// App object - module scaffolding
const app = {};

// Configuration
app.config = {
    port: 3000,
};

// Create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`Listening to port ${app.config.port}`);
    });
};

// Handle request response
app.handleReqRes = (req, res) => {
    // response handle
    res.write("Hi Kishor, I'm from Node JS.\n");
    res.write('I will first finish All of from Sumit vai\n');
    res.write('then Fayzul Karim Vai, then HM Naym Vai\n');
    res.write('then I will start learning AWS from Avisek\n');
    res.write('then I will start learning Blockchain from learnweb3.0\n');
    res.end('Hello World of Programming Kishor !!!');
};

// Start the server
app.createServer();
