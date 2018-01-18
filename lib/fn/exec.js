let spawn        = require('child_process').spawn;
let msg          = require('./msg');

/**
 * @params string command
 * @params string[] args
 */
let exec = (command, args) => {
    try {
        let child = spawn(command, args);
        msg.success('spawn started!');

        let lineBuffer = '';
        child.stdout.on('data', data => {
            lineBuffer += data.toString();
            let lines = lineBuffer.split('\n');
            for (let i = 0; i < lines.length - 1; i++) {
                let line = lines[i];
                msg.log(line);
            }
            lineBuffer = lines[lines.length - 1];
        });
        child.stderr.on('data', error => {
            msg.error(error.toString());
        });
        child.on('exit', code => {
            msg.log('exit! code: ' + code.toString());
        });
        let p = new Promise(function (res, rej) {
            child.on('error', err => rej(err));
            child.on('close', code => res(code));
        });
        return p;
    } catch (e) {
        return false;
    }
};

module.exports = exec;

