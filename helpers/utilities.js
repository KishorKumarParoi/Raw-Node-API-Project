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
    console.log(typeof jsonString);
    const x = JSON.parse(jsonString);
    console.log('🚀 ~ file: utilities.js:23 ~ x :', x);

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
        return hash;
    }
    return false;
};

// create a random string
utilities.createRandomString = (strLength) => {
    const length = typeof strLength === 'number' && strLength > 0 ? strLength : false;
    console.log('🚀 ~ file: utilities.js:49 ~ length:', length);

    if (length) {
        const possibleCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let output = '';

        for (let i = 1; i <= length; i += 1) {
            const randomCharacter = possibleCharacters.charAt(
                Math.floor(Math.random() * possibleCharacters.length)
            );

            // console.log('🚀 ~ file: utilities.js:61 ~ randomCharacter:', randomCharacter);
            output += randomCharacter;
        }

        console.log('🚀 ~ file: utilities.js:63 ~ output;:', output);
        console.log(output.length);
        return output;
    }
    return false;
};

// export module
export default utilities;
