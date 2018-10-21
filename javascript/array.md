# JavaScript 中的数组

## 数组的本质
数组就是原型链中有 Array.prototype 的对象

## 常用API
- forEach
- sort
- join
- concat
- toString
- map
- filter
- reduce

## 伪数组
- 什么是伪数组？ 1、 有 0,1,2,3,4,5...n,length 这些 key 的对象； 2、 原型链中没有 Array.prototype   
- 目前知道的伪数组有:
    - 函数的`arguments`对象；
    - `document.querySelectorAll('div')` 返回的节点的集合[NodeList](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)；