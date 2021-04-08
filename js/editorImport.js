import { drawer } from "./BaseChange.js";
let code = localStorage.getItem("my-code");
let editor;

const initCode = `
// rxjs 6+
// We have prepared rxjs for you below.
// 我们已经帮您导入了 rxjs.
// If you feel that the generated animation is not right, you can click on the mode switch button below!
// 如果您感觉到生成动画不对劲，可以点击下面的模式切换按钮！
let { from, interval, range, fromEvent, of } = rxjs;
let { map, take, bufferCount, pluck, concatMap } = rxjs.operators;
`;

// 使用 Monaco 编辑器
require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/vs" } });
window.MonacoEnvironment = {
    getWorkerUrl: function (workerId, label) {
        return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/'
        };
        importScripts('https://cdn.jsdelivr.net/npm/monaco-editor@0.23.0/min/vs/base/worker/workerMain.js');`)}`;
    },
};
// 事件挂载
require(["vs/editor/editor.main"], () => {
    editor = monaco.editor.create(document.getElementById("container"), {
        value: initCode,
        language: "javascript",
    });
    editor.setValue(code);
    console.log(editor);
    editor.onDidBlurEditorText(() => {
        localStorage.setItem("my-code", editor.getValue());
    });
});
// 重新加载动画的一个函数
function restart() {
    let code = editor.getValue();
    localStorage.setItem("my-code", code);
    drawer.canvasClean();
    let rxjs = drawer.rxjs;
    eval(`let {${Object.keys(rxjs.operators).join(",")}} = rxjs.operators`);
    eval(code);
}
window.onload = () => {
    restart();
};
export { editor, restart };
