let path    = require('path');
let childProcess = require('child_process');
let process = require('process');

let fsExt   = require(path.join('../lib/ext/fs-ext'));
let invoke  = require(path.join('../lib/fn/invoke'));

let init = () => {
    try {
        childProcess.execSync('npm i -D eslintrc');
        fsExt.createSync(require.resolve('eslintrc/.eslintrc'), path.join(process.env['PWD'], '.eslintrc'));
        return true;
    } catch (e) {
        return false;
    }
};

let eslintrc = (args) => {
    let methods = {
        init,
    };
    let order = ['--init'];

    invoke(methods, order, args);
};

module.exports = eslintrc;

