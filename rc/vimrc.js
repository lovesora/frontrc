let path    = require('path');
let os      = require('os');
let homedir = os.homedir();

let fsExt   = require(path.join('../lib/ext/fs-ext'));
let invoke  = require(path.join('../lib/fn/invoke'));

let init = () => fsExt.createSync(require.resolve('vimrc'), path.join(homedir, '.vimrc'), {isBackup: true});


let vimrc = (args) => {
    let methods = {
        init: init
    };

    invoke(methods, args);
};

module.exports = vimrc;
