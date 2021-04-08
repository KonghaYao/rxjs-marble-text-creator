// 我的代码内部根据 rxjs 生成一个 “被代理” 的 rxjs，不会对 rxjs 产生修改
// 需要在这里引入您的 rxjs 源
let rxjs = window.rxjs;
export { rxjs as default };
