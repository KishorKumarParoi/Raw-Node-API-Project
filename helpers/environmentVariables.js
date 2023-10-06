/*
 * Title :  Environment Variables
 * Description :  All Environment Variables
 * Author : Kishor Paroi
 * Date : 2023/09/27
 * Time :  10:50:49 PM
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'dsfldkjfdsgjd',
    maxChecks: 5,
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'dskfjdfkdsgdkfj',
    maxChecks: 5,
};

// determine which environment was passed
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport =
    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

// export module
export default environmentToExport;
