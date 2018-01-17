let path         = require('path');
let os           = require('os');
let spawn        = require('child_process').spawn;
let homedir      = os.homedir();

let fsExt        = require(path.join('../lib/ext/fs-ext'));
let invoke       = require(path.join('../lib/fn/invoke'));
let msg          = require(path.join('../lib/fn/msg'));

let init = () => fsExt.createSync(require.resolve('aria2rc'), path.join(homedir, '.aria2rc'));

let start = () => {
    try {
        let aria2 = spawn('aria2c', [`--conf-path=${homedir}/.aria2rc`]);
        msg.success('aira2 started!');

        aria2.stdout.on('data', data => {
            console.log(data.toString());
        });
        aria2.stderr.on('data', error => {
            console.error(error.toString());
        });
        aria2.on('exit', code => {
            console.log('aria2 exit! code: ' + code.toString());
        });
        return true;
    } catch (e) {
        return false;
    }
};

let aria2rc = (args) => {
    let methods = {
        init,
        start,
    };

    invoke(methods, args, ['--init', '--start']);
};

module.exports = aria2rc;

