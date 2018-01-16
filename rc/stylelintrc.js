let path    = require('path');
let childProcess = require('child_process');
let process = require('process');

let fsExt   = require(path.join('../lib/ext/fs-ext'));
let invoke  = require(path.join('../lib/fn/invoke'));

let init = () => {
    try {
        childProcess.execSync('npm i -D stylelintrc');
        fsExt.createSync(require.resolve('stylelintrc/.stylelintrc'), path.join(process.env['PWD'], '.stylelintrc'));
        return true;
    } catch (e) {
        return false;
    }
};

let stylelintrc = (args) => {
    let methods = {
        init,
    };
    let order = ['--init'];

    invoke(methods, order, args);
};

module.exports = stylelintrc;

