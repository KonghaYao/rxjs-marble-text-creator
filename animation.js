import { drawer } from "./js/BaseChange.js";
let { fromEvent } = rxjs;
let { pluck, tap, filter } = rxjs.operators;

// 重新加载动画的一个函数
function restart(code) {
    code = code || localStorage.getItem("my-code");
    drawer.canvasClean();
    const rxjs = drawer.rxjs;
    CodePrepare.bind(rxjs)(code, rxjs);
}
function CodePrepare(code, rxjs) {
    try {
        eval(code);
    } catch (e) {
        console.log(e);
    }
}
window.onload = () => {
    restart();
};
let Origan = ["https://konghayao.github.io"];

fromEvent(window, "message")
    .pipe(
        tap((i) => console.warn(i)),
        pluck("data")
    )
    .subscribe((data) => {
        console.log("数据", data);
        const { listening, data: code } = data;
        drawer.listening = listening;
        if (code) localStorage.setItem("my-code", code);
        restart(code);
    });
