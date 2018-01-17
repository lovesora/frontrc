let msg = {
    error(str) {
        console.error('lx-rc error: ' + str);
    },
    success(str) {
        console.log('lx-rc success: ' + str);
    }
};

module.exports = msg;
