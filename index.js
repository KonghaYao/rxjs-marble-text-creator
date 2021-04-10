import { editor, restart } from "./js/editorImport.js";
let { fromEvent } = rxjs;
let { pluck, throttleTime } = rxjs.operators;
// DOM Event 挂载
const run = document.querySelectorAll(".run");

fromEvent(run, "click").pipe(throttleTime(2000)).subscribe(restart);

fromEvent(document.getElementById("state"), "click")
    .pipe(throttleTime(2000), pluck("target"))
    .subscribe((target) => {
        let listening;
        switch (target.innerText) {
            case "Listening Mode":
                listening = false;
                target.innerText = "Slowing Mode";
                break;
            case "Slowing Mode":
                listening = true;
                target.innerText = "Listening Mode";
        }
        localStorage.setItem("listening", listening);
        document.getElementById("iframe").contentWindow.postMessage({ listening });
    });
fromEvent(document.getElementById("hideEditor"), "click")
    .pipe(throttleTime(500))
    .subscribe(() => {
        document.getElementById("editor").classList.toggle("hide");
        restart();
    });
