#! /usr/bin/env node
let process  = require('process');
let path     = require('path');

let argv     = process.argv;
let type     = argv[2];
let args     = argv.slice(3);

let rc = {
    vim: require(path.join('../rc/vimrc')),
    tern: require(path.join('../rc/ternrc')),
    eslint: require(path.join('../rc/eslintrc')),
    stylelint: require(path.join('../rc/stylelintrc')),
    htmlhint: require(path.join('../rc/htmlhintrc')),
};

rc[type](args);

