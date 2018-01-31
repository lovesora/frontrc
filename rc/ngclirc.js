let path    = require('path');
let os      = require('os');
let homedir = os.homedir();

let fsExt   = require(path.join('../lib/ext/fs-ext'));
let invoke  = require(path.join('../lib/fn/invoke'));

let init = () => fsExt.createSync(require.resolve('ngclirc'), path.join(homedir, '.angular-cli.json'), {isBackup: true});


let ngclirc = (args) => {
    let methods = {
        init: init
    };

    invoke(methods, args);
};

module.exports = ngclirc;
