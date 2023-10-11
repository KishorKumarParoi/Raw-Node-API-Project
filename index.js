/*
 * Title : Uptime Monitoring Application
 * Description : A RESTFul API to monitor up or down time of user defined links
 * Author : Kishor Paroi
 * Date : 2023/09/25
 * Time : 9:42:10 PM
 */

// Dependencies
import server from './lib/server.js';
import workers from './lib/worker.js';

// App Object - Module Scaffolding
const app = {};

app.init = () => {
    // start the server
    server.init();

    // start the  workers
    workers.init();
};

app.init();

// export module
export default app;
