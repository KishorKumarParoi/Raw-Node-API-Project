/*
 * Title : Routes
 * Description : Application Routes
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 4:32:40 PM
 */

// dependencies
import handler from './handlers/routeHandlers/noHandler.js';
import handler2 from './handlers/routeHandlers/sampleHandler.js';
// module scaffolding
const routes = {
    sample: handler2.sampleHandler,
    notFound: handler.noHandler,
};

// export module
export default routes;
