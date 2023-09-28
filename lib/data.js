/*
 * Title :  Data
 * Description :  All Data Will Be Here
 * Author : Kishor Paroi
 * Date : 2023/09/27
 * Time :  11:21:28 PM
 */

// dependencies
import path from 'path';

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    '../helpers/handleReqRes.js'
);
console.log(lib.basedir);
