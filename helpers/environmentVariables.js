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
    twilio: {
        fromPhone: '+13344588125',
        accountSid: 'AC74f107efbf4a20079747065dda875dd8',
        authToken: 'a4d6a3d02ed117fdabab9112c351af3c',
    },
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'dskfjdfkdsgdkfj',
    maxChecks: 5,
    twilio: {
        fromPhone: '+13344588125',
        accountSid: 'AC74f107efbf4a20079747065dda875dd8',
        authToken: 'a4d6a3d02ed117fdabab9112c351af3c',
    },
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
