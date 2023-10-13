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

// init script
worker.init = () => {
    console.log('worker started successfully');
    // execute all checks
    worker.gatherAllChecks();

    // call the loop so that checks continue to execute on their own
    worker.loop();
};

// export module
export default worker;
