/**
 * 按照order顺序调用methods中的方法，并且该方法在args数组中
 */
let invoke = (methods, order, args) => {
    let orderArgs = order.filter((arg) => args.indexOf(arg) > -1);

    orderArgs.map((arg) => {
        let fnName = arg.slice(2).replace(/-[a-z]/g, match => match[1].toUpperCase());
        methods[fnName]();
    });
};

module.exports = invoke;
