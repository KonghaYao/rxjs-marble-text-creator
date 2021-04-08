import { drawer } from "./BaseChange.js";
import { editor, restart } from "./editorImport.js";

// DOM Event 挂载
const run = document.getElementById("run");
rxjs.fromEvent(run, "click").pipe(rxjs.operators.throttleTime(2000)).subscribe(restart);
rxjs.fromEvent(document.getElementById("state"), "click")
    .pipe(rxjs.operators.throttleTime(2000), rxjs.operators.pluck("target"))
    .subscribe((target) => {
        switch (target.innerText) {
            case "Listening Mode":
                drawer.listening = false;
                target.innerText = "Slowing Mode";
                break;
            case "Slowing Mode":
                drawer.listening = true;
                target.innerText = "Listening Mode";
        }
        restart();
    });
