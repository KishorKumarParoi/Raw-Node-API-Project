/*
 * Title :  Data
 * Description :  All Data Will Be Here
 * Author : Kishor Paroi
 * Date : 2023/09/27
 * Time :  11:21:28 PM
 */

// dependencies
import fs from 'fs';
import path from 'path';

// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(path.dirname(new URL(import.meta.url).pathname), '../.data/');
console.log(lib.basedir);

// write data to file

lib.create = (dir, file, data, callback) => {
    // open file for writing
    fs.open(`${lib.basedir + dir}/${file}.json`, 'wx', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and close it
            fs.writeFile(fileDescriptor, stringData, (err2) => {
                if (!err2) {
                    fs.close(fileDescriptor, (err3) => {
                        if (!err3) {
                            callback(false);
                        } else {
                            callback('Error closing new file!');
                        }
                    });
                } else {
                    callback('Error writing to new file');
                }
            });
        } else {
            callback(`Kumar ${err} Paroi`);
        }
    });
};

lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

export default lib;
