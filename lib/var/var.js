let process = require('process');
let path    = require('path');
let os      = require('os');

let variables = {
    project: {
        pwd: path.resolve(__dirname, '../../'),
    },
    env: {
        pwd: process.env['PWD'],
        homedir: os.homedir(),
    }
};

module.exports = variables;
