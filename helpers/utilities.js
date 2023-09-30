/*
 * Title :  Utilities
 * Description :  Utilities for JSON Parsing
 * Author : Kishor Paroi
 * Date : 2023/09/30
 * Time :  9:12:05 PM
 */

// dependencies

// module scaffolding
const utilities = {};

// parse json string to object

utilities.parseJSON = (jsonString) => {
    let output;
    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }

    return output;
};

// export module
export default utilities;
