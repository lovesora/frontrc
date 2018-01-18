let path         = require('path');
let fs           = require('fs');

let _var         = require('../lib/var/var');
let fsExt        = require(path.join('../lib/ext/fs-ext'));
let msg          = require(path.join('../lib/fn/msg'));
let invoke       = require(path.join('../lib/fn/invoke'));
let exec         = require(path.join('../lib/fn/exec'));

let install = () => {
    let aria2ReleaseUri = 'https://github.com/aria2/aria2/releases/download/release-1.33.1/aria2-1.33.1.tar.gz',
        aria2FileDir = path.join(_var.project.pwd, 'tmp'),
        aria2Dir = 'aria2-1.33.1',
        aria2FilePath = path.join(aria2FileDir, aria2Dir + '.tar.gz');

    let execShell = () => {
        exec('sh', [`${_var.project.pwd}/bash/aria2.sh`, aria2FileDir, aria2Dir]).then(() => {
            msg.success('build finished!');
        }).catch(e => {
            msg.error(e);
        });
    };

    if (fs.existsSync(aria2FilePath)) {
        execShell();
    } else {
        msg.success('downloading: ' + aria2FilePath);
        fsExt.download(aria2ReleaseUri, aria2FilePath).then(() => {
            msg.success(`downloaded: ${aria2FileDir}/${aria2Dir}.tar.gz`);
            execShell();
        }).catch(e => msg.error(e));
    }
};

let init = () => fsExt.createSync(require.resolve('aria2rc'), path.join(_var.env.homedir, '.aria2rc'));

let start = () => exec('aria2c', [`--conf-path=${_var.env.homedir}/.aria2rc`]);

let aria2rc = (args) => {
    let methods = {
        install,
        init,
        start,
    };

    invoke(methods, args, ['--install', '--init', '--start']);
};

module.exports = aria2rc;

