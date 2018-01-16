var fs   = require('fs');
var path = require('path');

let msg     = require(path.join('../fn/msg'));

var copy = (src, dest) => {
    return fs.createReadStream(path.resolve(src)).pipe(fs.createWriteStream(path.resolve(dest)));
};

var copySync = (src, dest) => {
    try {
        if (!fs.existsSync(src)) {
            fs.writeFileSync(src, '', 'UTF-8');
        }

        let text = fs.readFileSync(src, 'UTF-8');
        fs.writeFileSync(dest, text, 'UTF-8');
        return true;
    } catch(e) {
        return false;
    }
};

var createSync = (src, dest, {isBackup=false, backupSuff='.backup'}={}) => {
    let backup = () => {
        return copySync(path.join(dest), path.join(dest + backupSuff));
    };

    let create = () => {
        return copySync(src, dest);
    };

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
    }

    return init();
};

module.exports = {
    copy,
    copySync,
    createSync,
};

