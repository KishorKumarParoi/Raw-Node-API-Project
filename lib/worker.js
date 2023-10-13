/*
 * Title :  Worker for node js
 * Description : Worker for speeding up the application
 * Author : Kishor Paroi
 * Date : 2023/10/11
 * Time :  1:53:36 PM
 */

// dependencies

// module scaffolding
const worker = {};

// timer to start the worker process once in every minute
worker.loop = () => {
    setInterval(() => {
        worker.gatherAllChecks();
    }, 1000 * 60);
};

// start the worker
worker.init = () => {
    console.log('worker started successfully');
    // execute all checks
    worker.gatherAllChecks();

    // call the loop so that checks continue to execute on their own
    worker.loop();
};

// export module
export default worker;
