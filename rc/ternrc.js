let path    = require('path');
let process = require('process');

let fsExt   = require(path.join('../lib/ext/fs-ext'));
let invoke  = require(path.join('../lib/fn/invoke'));

let init = () => fsExt.createSync(require.resolve('ternrc'), path.join(process.env['PWD'], '.tern-project'));

let initNode = () => fsExt.createSync(require.resolve('ternrc/node.tern-project'), path.join(process.env['PWD'], '.tern-project'));

let ternrc = (args) => {
    let methods = {
        init,
        initNode,
    };
    let order = ['--init', '--init-node'];

    invoke(methods, order, args);
};

module.exports = ternrc;

