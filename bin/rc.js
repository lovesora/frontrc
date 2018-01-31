#! /usr/bin/env node
let process  = require('process');
let path     = require('path');
let fs       = require('fs');

let msg      = require('../lib/fn/msg');
let fsExt    = require('../lib/ext/fs-ext');

let argv     = process.argv;
let type     = argv[2];
let args     = argv.slice(3);

let rcs = {};
fsExt.loadDir(path.resolve(__dirname, '../rc')).map(rc => {
    rcs[rc.file.slice(0, -5)] = require(rc.filePath);
});
try {
    rcs[type](args);
} catch (e) {
    msg.error(e);
}

