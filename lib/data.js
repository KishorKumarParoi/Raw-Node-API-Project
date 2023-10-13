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
                    // closing the file after writing
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
// reading data from file
lib.read = (dir, file, callback) => {
    fs.readFile(`${lib.basedir + dir}/${file}.json`, 'utf8', (err, data) => {
        callback(err, data);
    });
};

// updating data of existing file

lib.update = (dir, file, data, callback) => {
    // opening file to update data
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', (err, fileDescriptor) => {
        if (!err && fileDescriptor) {
            // converting data to string
            const stringData = JSON.stringify(data);

            // truncating file
            fs.ftruncate(fileDescriptor, (err1) => {
                if (!err1) {
                    // writing to file
                    fs.writeFile(fileDescriptor, stringData, (err2) => {
                        if (!err2) {
                            // closing after writing the file
                            fs.close(fileDescriptor, (err3) => {
                                if (!err3) {
                                    callback(false);
                                } else {
                                    callback(err3, ' : error happens upon closing file');
                                }
                            });
                        } else {
                            callback(err2, ' : error happens writing to file');
                        }
                    });
                } else {
                    callback(err1, ' : error happens truncating file');
                }
            });
        } else {
            callback(err, ' : Error updating. File may not exist!');
        }
    });
};

// deleting existing file
lib.delete = (dir, file, callback) => {
    fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback(err, ': Error happens deleting file');
        }
    });
};

// list all the items in a directory

lib.list = (dir, callback) => {
    fs.readdir(`${lib.basedir + dir}/`, (err, fileNames) => {
        if (!err && fileNames && fileNames.length > 0) {
            const trimmedFileNames = [];
            fileNames.forEach((fileName) => {
                trimmedFileNames.push(fileName.replace('.json', ''));
            });
            callback(fileNames);
        } else {
            callback('Error reading directory');
        }
    });
};

export default lib;
