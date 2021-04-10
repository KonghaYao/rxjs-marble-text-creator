import BallTest from "./drawer.js";

var drawer = new BallTest("#canvas", {
    timeScale: 300,
    listening: Boolean(localStorage.getItem("listening")) || false,
});

export { drawer };
