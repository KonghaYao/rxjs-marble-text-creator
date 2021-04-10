export default `
// rxjs 6+
// We have prepared rxjs for you below.
// 我们已经帮您导入了 rxjs.
// If you feel that the generated animation is not right, you can click on the mode switch button below!
// 如果您感觉到生成动画不对劲，可以点击下面的模式切换按钮！
// 下面是关于 并发操作 的一个代码。
let {range,of} = rxjs;
let {map ,bufferCount,concatMap,map} = rxjs.operators
range(0, 10)
    .pipe(
        map((current, index) => {
            return index * 10;
        }),
        bufferCount(3),
        concatMap((item) => {
            return of(...item);
        }),
        map((i) => i)
    )
    .subscribe((item) => console.log("完成", new Date().getTime()));
`;
