# DOM 事件基础

## 1、DOM0、DOM2、DOM3 标准

- DOM0
  - 直接通过 `onclick` 写在 html 里面的事件；
  - 缺点：html 和 js 耦合在一起，修改不方便；
- DOM2
  - 通过 `addEventListener` 绑定事件;
  - 通过 `removeEvementListener` 解绑事件；
  - IE 下通过 `attachEvent` 绑定，`detachEvent` 解绑；
- DOM3
  - DOM3 是增加了一些新的事件；

## 2、事件捕获和事件冒泡

- `DOM2` 级的事件规定了事件流包含三个阶段包括：

  - 事件捕获：事件开始由顶层对象触发，然后逐级向下传播，直到目标元素；
  - 处于目标阶段：处在绑定事件的元素上；
  - 事件冒泡阶段：事件由具体的元素先接收，然后逐级向上传播，直到不具体的元素；

  ![](https://img.yancongwen.cn/18-11-6/95071756.jpg)

  可以看一下这个 [示例](https://yancongwen.cn/task/dom-event/)、[源码在此](https://github.com/yancongwen/task/tree/master/dom-event)

- 一般来说事件冒泡机制，用的更多一些，所以在 IE8 以及之前，IE 只支持事件冒泡。IE9/FF/Chrome 这 2 种模型都支持，可以通过 `addEventListener((type, listener, useCapture)`的`useCapture`参数来设定，useCapture=false（默认）代表着事件冒泡，useCapture=true 代表着采用事件捕获。
- `e.stopPropagation()` 阻止冒泡；
- `e.preventDefault()` 阻止事件默认行为；

## 3、事件代理

```html
<div id="div1">
  <a href="#">a1</a>
  <a href="#">a2</a>
  <a href="#">a3</a>
  <a href="#">a4</a>
  ......
</div>
```

```js
var div1 = document.getElementById('div1')
div1.addEventListener('click', function(e) {
  var target = e.target
  if (target.nodeName === 'A') {
    alert(target.innerHTML)
  }
})
```

## 4、几个不常用的事件

```js
// 禁止显示右键选项
document.oncontextmenu = function(e) {
  return false
}
// 禁止选择
document.onselectstart = function(e) {
  return false
}
// 禁止粘贴
document.onpaste = function(e) {
  return false
}
// 禁止复制
document.oncopy = function(e) {
  return false
}
// 禁止剪切
document.oncut = function(e) {
  return false
}
```

## 参考

- [[解惑]JavaScript 事件机制](http://www.cnblogs.com/hustskyking/p/problem-javascript-event.html)
- [DOM0,DOM2,DOM3 事件,事件基础知识入门](https://www.cnblogs.com/diligenceday/p/4175721.html)
- [JavaScript 标准参考教程--阮一峰](http://javascript.ruanyifeng.com/dom/event.html)
