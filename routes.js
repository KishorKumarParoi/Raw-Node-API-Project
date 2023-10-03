/*
 * Title : Routes
 * Description : Application Routes
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 4:32:40 PM
 */

// dependencies
import handler1 from './handlers/routeHandlers/notFoundHandler.js';
import handler2 from './handlers/routeHandlers/sampleHandler.js';
import handler4 from './handlers/routeHandlers/tokenHandler.js';
import handler3 from './handlers/routeHandlers/userHandler.js';

// module scaffolding

const routes = {
    notFound: handler1.noHandler,
    sample: handler2.sampleHandler,
    user: handler3.userHandler,
    token: handler4.tokenHandler,
};

// export module
export default routes;
