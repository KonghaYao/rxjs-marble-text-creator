import FunctionList from "./rxjsFunction.js";

function createRxjsProxy(rxjs, creatorsFunc, operatorsFun) {
    // 此处的source 是原版的 rxjs
    // 浅复制一份，因为创造操作符是一个直接的Function，所以浅复制也可以
    const rxjsProxy = Object.assign({}, rxjs);
    // 从已知的操作符中抽取并代理
    FunctionList.forEach((key) => {
        //其实就是创建之后进行一次 rxjs 外部的事件
        rxjsProxy[key] = (...args) => rxjs[key](...args).pipe(creatorsFunc(key));
    });
    console.log("rxjs 创建操作符修改完成");
    // 挂载 RXJS 的操作符，其实是外包了一层，加上一个 tap 函数产生副作用
    rxjsProxy.operators = Object.entries(rxjs.operators).reduce((collection, [key, value]) => {
        collection[key] = (...args) => {
            return (source) => {
                // 核心部分
                return source.pipe(value(...args), operatorsFun(source, key));
            };
        };
        return collection;
    }, {});
    console.log("rxjs 操作符 修改完成");
    return rxjsProxy;
}

export default createRxjsProxy;
