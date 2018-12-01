# DOM 事件基础

## 1、DOM0、DOM2、DOM3 标准
- DOM0
    `DOM0` 就是直接通过 `onclick` 写在 html 里面的事件；
- DOM2
    `DOM2` 是通过 `addEventListener` 绑定的事件, IE下通过 `attachEvent` 绑定;
- DOM3
    `DOM3` 是增加了一些新的事件；

## 2、事件捕获和事件冒泡
`DOM2` 级的事件规定了事件流包含三个阶段包括： 
- 事件捕获
- 处于目标阶段
- 事件冒泡阶段

IE的事件流是冒泡, 从里面往上面冒, netscape是从外部元素往内部元素捕获;
`addEventListener` 方法也可以通过设置第三个参数来决定使用冒泡还是捕获；

![](https://img.yancongwen.cn/18-11-6/95071756.jpg)

可以看一下这个 [示例](https://yancongwen.cn/task/dom-event/)、[源码在此](https://github.com/yancongwen/task/tree/master/dom-event)

## 3、事件对象


## 参考
- [[解惑]JavaScript事件机制](http://www.cnblogs.com/hustskyking/p/problem-javascript-event.html)
- [DOM0,DOM2,DOM3事件,事件基础知识入门](https://www.cnblogs.com/diligenceday/p/4175721.html)
- [JavaScript 标准参考教程--阮一峰](http://javascript.ruanyifeng.com/dom/event.html)