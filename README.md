<div style='display:flex;flex-direction:column;justify-content:center;align-items:center'>
<img src='./assets/SVG/logo.svg' style='width:20%;'>
<h3 style='background-image: linear-gradient(45deg, #7c0094, #ff27a1cd, #ff0090);font-weight: bolder; -webkit-background-clip: text;-webkit-text-fill-color: transparent;'> RXJS Marble Test Animation Creator</h3>
</div>
# RXJS 弹珠测试动画生成网站
#### RXJS Marble Test Animation Creator


![animationDemo](./doc/assets/animationDemo.gif)

 你可以通过下面的链接去实践一下！你可以将你的大部分 rxjs 代码动画化！
> You can use the link below to try it out!You can animate most of your RxJS code!

[Github Page](https://konghayao.github.io/rxjs-marble-text-creator/)

[Gitee Page](http://dongzhongzhidong.gitee.io/rxjs-marble-test-creator/)

# 介绍 Introduction
这是一个用于生成 rxjs 的弹珠测试动画的网站，你可以直接写入你的代码，并查看相关的动画。

> This is a website for generating RxJS pinball test animations. You can write your code directly and view the associated animations.

# 为什么要制作这个网站？
#### Why did you create this website?
在学习 rxjs 的时候，我想要查看真实的 rxjs 运行动画，虽然网络上有 rxjs 的动画示例。但是我想要自定义 rxjs 的动画，我写什么代码，就给我展示什么，这才是编程的魅力！所以我制作了这个网站！

> While learning about RxJS, I want to see real RxJS running animations, although there are examples of RxJS animations available online. But I want to customize RxJS animation, whatever code I write, just show me what, that's the charm of programming! So I made this website!

# 在您的网页中引入动画

#### Introduce rxjs animation to your web pages

如果您想要在您的网页中引入动画,那么使用 一个 iframe ,id 设置为 iframe,使用下面的代码可以帮助您控制代码演示动画。
***同时，我的网站没有设置防御措施，会直接使用 `eval` 来执行您的代码，请勿使用攻击性代码。***

If you want to introduce animation in your web page, use an iframe with the ID set to iframe, and use the following code to help you control the animation of the code presentation.

***Also, my website has no defensive measures and will directly use `eval` to execute your code. Do not use offensive code.***


```html
 <iframe src="http://dongzhongzhidong.gitee.io/rxjs-marble-test-creator/animation.html" id='iframe'></iframe>
 
 <!-- or  -->
 
 <iframe src="https://konghayao.github.io/rxjs-marble-text-creator/aniamtion.html" id='iframe'></iframe>
```
```js
document.getElementById('iframe').contentWindow.postMessage(
{
    listening:false,// 是否实时监听 rxjs
    data:`
        // your code
        let {interval,range,of} = rxjs;
        let {map ,bufferCount,concatMap} = rxjs.operators
        range(0,10)
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
            .subscribe((item) => console.log("完成", new Date().getTime()));`
},
'*'
)
```