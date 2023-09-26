/*
 * Title : Routes
 * Description : Application Routes
 * Author : Kishor Paroi
 * Date : 2023/09/26
 * Time : 4:32:40 PM
 */

// dependencies
import { sampleHandler } from './handlers/routeHandlers/sampleHandler.js';
// module scaffolding
const routes = {
    sample: sampleHandler,
};

// export module
export default routes;
