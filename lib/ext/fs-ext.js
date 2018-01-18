let fs      = require('fs');
let mkdir   = require('make-dir');
let request = require('request');
let path    = require('path');

let msg     = require(path.join('../fn/msg'));

let copy = (src, dest) => fs.createReadStream(path.resolve(src)).pipe(fs.createWriteStream(path.resolve(dest)));

let copySync = (src, dest) => {
    try {
        if (!fs.existsSync(src)) {
            fs.writeFileSync(src, '', 'UTF-8');
        }

        let text = fs.readFileSync(src, 'UTF-8');
        fs.writeFileSync(dest, text, 'UTF-8');
        return true;
    } catch (e) {
        return false;
    }
};

let createSync = (src, dest, {isBackup=false, backupSuff='.backup'}={}) => {
    let backup = () => copySync(path.join(dest), path.join(dest + backupSuff));

    let create = () => copySync(src, dest);

    let init = () => {
        if (isBackup && !backup()) {
            msg.error('backup ' + dest);
            return false;
        }
        if (!create()) {
            msg.error('create ' + src);
            return false;
        }

        isBackup && msg.success('backup ' + dest + backupSuff);
        msg.success('create ' + dest);
        return true;
    };

    return init();
};

let download = (uri, filename) => new Promise((res, rej) => {
    try {
        mkdir(path.resolve(filename, '../')).then(() => {
            let stream = fs.createWriteStream(filename);
            request({
                uri,
                timeout: 60000,
            })
                .on('error', e => {
                    msg.error(e);
                })
                .pipe(stream).on('close', res); 
        });
    } catch (e) {
        rej(e);
    }
});

module.exports = {
    copy,
    copySync,
    createSync,
    download,
};

