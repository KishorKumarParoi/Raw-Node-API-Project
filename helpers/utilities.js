/*
 * Title :  Utilities
 * Description :  Utilities for JSON Parsing
 * Author : Kishor Paroi
 * Date : 2023/09/30
 * Time :  9:12:05 PM
 */

// dependencies
import * as crypto from 'crypto';
import environment from './environmentVariables.js';

// module scaffolding
const utilities = {};

// parse json string to object

utilities.parseJSON = (jsonString) => {
    console.log('🚀 ~ file: utilities.js:18 ~ jsonString:', jsonString);
    let output = {};
    try {
        output = JSON.parse(jsonString);
        console.log('🚀 ~ file: utilities.js:21 ~ output:', output);
    } catch {
        console.log('kkp');
        output = {};
    }

    return output;
};

// hash making
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');
        console.log('🚀 ~ file: utilities.js:36 ~ hash :', hash);
    }
};

// export module
export default utilities;
