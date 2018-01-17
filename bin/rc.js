#! /usr/bin/env node
let process  = require('process');
let path     = require('path');

let msg      = require('../lib/fn/msg');

let argv     = process.argv;
let type     = argv[2];
let args     = argv.slice(3);

let rc = {
    aria2: require(path.join('../rc/aria2rc')),
    eslint: require(path.join('../rc/eslintrc')),
    htmlhint: require(path.join('../rc/htmlhintrc')),
    stylelint: require(path.join('../rc/stylelintrc')),
    tern: require(path.join('../rc/ternrc')),
    vim: require(path.join('../rc/vimrc')),
};

try {
    rc[type](args);
} catch (e) {
    msg.error('invalid arguments!');
}

