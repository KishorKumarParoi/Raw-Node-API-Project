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
lib.basedir = path.join(path.dirname(new URL(import.meta.url).pathname), 'Kishor', '../.data/');
console.log(lib.basedir);

const x = path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// Returns: '/foo/bar/baz/asdf'

const y = path.join('foo', '{}', 'bar');
// Throws 'TypeError: Path must be a string. Received {}'

console.log(x);
console.log(y);

const fullPath = path.join(
    'folderA',
    'folderB',
    '/foo',
    'bar',
    'baz/asdf',
    'quux',
    '..',
    'file.txt'
);
console.log(fullPath); // Outputs: folderA/folderB/file.txt (on UNIX-like platforms)
