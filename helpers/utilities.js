/*
 * Title :  Utilities
 * Description :  Utilities for JSON Parsing
 * Author : Kishor Paroi
 * Date : 2023/09/30
 * Time :  9:12:05 PM
 */

// dependencies
import hash from 'crypto';

// module scaffolding
const utilities = {};

// parse json string to object

utilities.parseJSON = (jsonString) => {
    console.log('🚀 ~ file: utilities.js:18 ~ jsonString:', jsonString);
    let output;
    try {
        output = JSON.parse(jsonString);
        console.log('🚀 ~ file: utilities.js:21 ~ output:', output);
    } catch {
        output = {};
    }

    return output;
};

// hash making
console.log('🚀 ~ file: utilities.js:30 ~ hash:', hash);
// export module
export default utilities;
