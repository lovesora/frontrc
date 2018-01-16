#! /usr/bin/env node
let process = require('process');
let path    = require('path');

let vimrc   = require(path.join('../rc/vimrc'));
let ternrc  = require(path.join('../rc/ternrc'));

let argv    = process.argv;
let type    = argv[2];
let args    = argv.slice(3);

switch (type) {
    case 'vim': {
        vimrc(args);
        break;
    }
    case 'tern': {
        ternrc(args);
        break;
    }
}
