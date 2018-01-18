let msg = {
    error(str) {
        console.error('lx-rc error: ' + str);
    },
    success(str) {
        console.log('lx-rc success: ' + str);
    },
    log(str) {
        console.log(str);
    }
};

module.exports = msg;
