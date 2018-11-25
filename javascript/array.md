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

## 数组去重
> **经典的一个面试题目**：如何实现数组去重？假设有数组 `array = [1,5,2,3,4,2,3,1,3,4]`你要写一个函数 `unique`，使得 `unique(array)` 的值为 `[1,5,2,3,4]`。要求：不要做多重循环，只能遍历一次；请给出两种方案，一种能在 ES 5 环境中运行，一种能在 ES 6 环境中运行。

### 答案
- ES 5
```javascript
function unique(array){
    var result = []
    var obj = {}
    for(var i=0; i<array.length; i++) {
        if(!obj[array[i]]) {
            result.push(array[i])
            obj[array[i]] = array[i]
        }
    }
    return result
}
```
- ES 6
```javascript
function unique(array){
    return Array.from(new Set(array))
}
```

