import rxjs from "./rxjsImport.js";
import createRxjsProxy from "./rxjsProxy.js";

// 这是画行的函数
class LineList {
    constructor(draw, lineHeight) {
        this.draw = draw;
        this.lineHeight = lineHeight;
        this.LineList = [];
    }
    Length = 0;
    destroy() {
        this.LineList.forEach((Line) => {
            Line.line.remove();
            Line.ball.forEach((el) => {
                el.removeAnime();
                el.remove();
            });
            console.log("执行销毁");
        });
        this.Length = 0;
    }

    // 多画一行
    createLine(lineKey, lineName) {
        let length = this.Length++;
        const line = document.createElement("div");
        line.innerHTML = lineName;
        line.classList.add("Line", "animate__animated", "animate__fadeIn");
        line.style.top = length * this.lineHeight + "rem";
        line.style.left = 0;
        this.draw.appendChild(line);

        this[lineKey] = {
            height: length,
            line,
            timeline: anime.timeline(),
            ball: [],
        };
        this.LineList.push(this[lineKey]);
    }
    // 在某一行加一个弹珠
    addABallTo(lineKey, circle) {
        this[lineKey].line.appendChild(circle);
        this[lineKey].ball.push(circle);
    }
}

class BallTest {
    constructor(id, options) {
        const { lineHeight = 5, BallR = 2.5, timeScale = 1000, listening } = options || {};
        this.draw = document.querySelector(id);
        Object.assign(this, {
            lineHeight,
            BallR,
            LineList: {
                destroy() {},
            },
            listening,
            timeScale,
        });

        this.canvasClean(); // 这个函数会重新赋值
        this.rxjs = createRxjsProxy(rxjs, this.creatorsFunc.bind(this), this.operatorsFunc.bind(this));
        console.log(this);
    }
    creatorsFunc(key) {
        return rxjs.operators.tap((val) => {
            const Key = "$" + key;
            this.newBall(val, Key, { lineName: Key, time: new Date().getTime() });
            console.log(Key, val);
        });
    }
    operatorsFunc(source, key) {
        return rxjs.operators.tap((val) => {
            this.newBall(val, key + JSON.stringify(source), { lineName: key, time: new Date().getTime() });
            console.log(key, val);
        });
    }
    // 重置画布的函数
    canvasClean() {
        this.LineList.destroy();
        this.LineList = new LineList(this.draw, this.lineHeight);
        // this.draw.innerHTML = "";
        this.startTime = new Date().getTime();
    }

    // 提供给外部的创建弹珠的函数
    newBall(value, lineKey, { lineName, time }) {
        // 判断是否需要加一条线
        if (!this.LineList.hasOwnProperty(lineKey)) this.LineList.createLine(lineKey, lineName);

        //画一个圆
        const circle = document.createElement("span");
        circle.classList.add("Ball");
        circle.innerHTML = JSON.stringify(value);
        circle.style.top = `-${this.BallR}rem`;
        circle.removeAnime = function () {
            anime.remove(this);
        };
        this.LineList.addABallTo(lineKey, circle);

        const bounceControl = 1;
        let delay = 0;
        if (!this.listening) {
            delay = parseInt((new Date().getTime() - this.startTime) / bounceControl) * bounceControl * 100;
        } else {
            delay = 0;
        }

        const duration = this.timeScale;
        const move = getComputedStyle(this.draw).width;

        let Options = {
            targets: circle,
            keyframes: [
                { scale: [0, 1], opacity: [0, 1], duration },
                { left: move, duration: duration * 5 },
                { scale: [1, 0], opacity: [1, 0], duration },
            ],
            delay,
            easing: "linear",
        };
        if (this.listening) {
            Options.complete = function () {
                anime.remove(circle);
                circle.remove();
            };
        }

        // this.LineList[lineKey].timeline.add(Options, 0);
        anime(Options);
    }
}

export default BallTest;
