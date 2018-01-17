/**
 * 按照order顺序调用methods中的方法，并且该方法在args数组中
 */
let invoke = (methods, args, order = ['--init']) => {
    // 设置方法别名
    args = Array.from(new Set(args.map(arg => {
        switch (arg) {
            case '-i': {
                return '--init';
            }
            default: {
                return arg;
            }
        }
    })));


    let orderArgs = order.filter(arg => args.indexOf(arg) > -1);

    orderArgs.map((arg) => {
        // 通用参数格式 --arg=value --arg-xxx-yyy=value
        let _arg    = arg.split('=');
        let fnName  = _arg[0];
        fnName      = fnName.slice(2).replace(/-[a-z]/g, match => match[1].toUpperCase());
        let fnArgs  = _arg.slice(1);

        methods[fnName].apply(methods, fnArgs);
    });
};

module.exports = invoke;
