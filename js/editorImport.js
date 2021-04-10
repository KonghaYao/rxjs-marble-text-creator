import initCode from "./initCode.js";
let code = localStorage.getItem("my-code");
let editor;

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
    document.getElementById("iframe").contentWindow.location.reload();
}

window.onload = () => {
    restart();
};
export { editor, restart };
