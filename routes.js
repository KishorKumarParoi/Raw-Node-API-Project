/*
 * Title : Routes
 * Description : Application Routes
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 4:32:40 PM
 */

// dependencies
import handler from './handlers/routeHandlers/notFoundHandler.js';
import handler2 from './handlers/routeHandlers/sampleHandler.js';
import handler3 from './handlers/routeHandlers/userHandler.js';
// module scaffolding
const routes = {
    sample: handler2.sampleHandler,
    notFound: handler.noHandler,
    user: handler3.userHandler,
};

// export module
export default routes;
