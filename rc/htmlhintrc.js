let path    = require('path');
let process = require('process');

let fsExt   = require(path.join('../lib/ext/fs-ext'));
let invoke  = require(path.join('../lib/fn/invoke'));

let init = () => fsExt.createSync(require.resolve('htmlhintrc'), path.join(process.env['PWD'], '.htmlhintrc'));

let htmlhintrc = (args) => {
    let methods = {
        init,
    };
    let order = ['--init'];

    invoke(methods, order, args);
};

module.exports = htmlhintrc;

