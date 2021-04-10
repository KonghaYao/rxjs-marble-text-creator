import { drawer } from "./js/BaseChange.js";
let { fromEvent } = rxjs;
let { pluck, tap } = rxjs.operators;

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
fromEvent(window, "message")
    .pipe(
        tap((i) => console.warn(i)),
        pluck("data")
    )
    .subscribe((data) => {
        console.log("数据", data);
        const { listening, code } = data;
        drawer.listening = listening;
        if (code) localStorage.setItem("my-code", code);
        restart(code);
    });
