# JavaScript 之 Array

> 本文内容大部分总结自 《Javascript 高级程序设计(第 3 版)》

## 1. 介绍

本质：数组就是原型链中有 `Array.prototype` 的对象

- 新建

```js
//第一种方法：通过构造函数 Array //注：可以省略 new 关键字
var colors = new Array()
var colors = new Array(20)
var colors = new Array()
//第二种方法：数组字面量
var colors = []
var colors = ['blue', 'black', 'green']
```

- 使用和赋值

```js
var colors = ['blue', 'black', 'green']
alert(colors[0]) //使用
colors[2] = 'black' //赋值
colors[3] = 'brown' //新增
```

- length 属性\
  length 属性不是只读的！
  通过设置此属性可以从数组的末尾添加或删除项，新增的项默认为 undefined。
  利用 length 属性可以方便的向数组的末尾添加项。

```js
var colors = ['blue', 'black', 'green']
colors[colors.length] = 'black'
colors[colors.length] = 'brown'
colors[99] = 'white'
alert(colors.length) //100
```

## 2. 检测数组：Array.isArray()

当检测 Array 实例时, `Array.isArray()` 优于 `instanceof`, 因为`Array.isArray()`能检测 iframes。使用`instanceof`操作符的问题在于它是假定只有一个全局执行环境。如果项目中使用了多个框架，就存在两个以上的全局执行环境，从而存在两个以上版本的 Array 构造函数。
为了解决这个问题，ECMASsript5 新增了`Array.isArray()`。这个方法的目的是最终确定某个值到底是不是数组。

```js
var bool = value instanceof Array
var bool = Array.isArray(value)
```

Polyfill:

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
}
```

## 3. 转换方法：toLocaleString()、toString()、valueOf()、join()

- `toString()`：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，为了创建这个字符串，会调用每一项的 toString 方法；
- `toLocaleString()`：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，为了创建这个字符串，会调用每一项的 toLocaleString 方法；
- `valueOf()`：返回的还是数组；
- `join()`：可以使用不同的分隔符来构建数组字符串；

## 4. 添加删除：push()、pop()、shift()、unshift()

- `push()`：末尾添加
- `pop()`：末尾删除
- `shift()`：前端移除
- `unshift()`：前端添加
- `栈`：后进先出 (LIFO)，栈中项的操作只发生在一个位置——栈的顶部。可使用 push、pop 实现。
- `队列`：先进先出 (FIFO)，末尾添加、前端移除。可使用 push、shift 实现。

## 5. 重排序方法：reverse()、sort()

- `reverse()`：反转
- `sort()`：排序

```js
// 最简单的例子：
var array = [1, 2, 3, 4, 5]
array.reverse() //[5,4,3,2,1]
```

在上面的例子, reverse 方法直观明了，但不够灵活，不能满足我们自定义排序规则的需求。因此才有了 sort 方法。 sort 方法默认按照升序排列。为了实现排序，该方法会自动调用每个数组项的 toString 方法，比较字符串进行排序。如：

```js
var array = [0, 1, 5, 10, 15]
var result = array.sort() //[0,1,10,15,5]
//在这里会得到意外的结果，因为并不是按照数字比较的
```

sort 方法强大之处在于其可以接受一个 **比较函数作为参数**，从而实现我们自定义排序规则。比较函数接收两个参数，表示的是数组中的两项，暂用 a, b 表示，如果 a 应该位于 b 之前,则返回一个负数（表示不用交换位置）；如果 a 应该位于 b 之后,则返回一个正数（表示需要交换位置）；如果 a 等于 b，则返回 0。例：

```js
function compare(a, b) {
  if (a < b) {
    return -1
  } else if (a > b) {
    return 1
  } else {
    return 0
  }
}
//使用以上比较函数实现升序
var array = [0, 10, 15, 1, 5]
var result = array.sort(compare) //[0,1,5,10,15]
// 上面的比较函数可以简化为：
function compare(a, b) {
  return a - b
}
```

通过以上形式，可以实现更复杂的排序效果。\
reverse 和 sort 方法操作数组本身，返回值是经过排序后的数组。

## 6. 操作方法：concat()、slice()、splice()

- `concat()`：合并数组，不影响原数组\
  concat()方法会先创建当前数组的一个副本，然后将接收到的参数添加到副本的末尾，最后返回新建的数组。

```js
var colors1 = ['red', 'green']
var colors2 = colors1.concat('yellow', ['blue', 'black'])
//colors2 = ['red','green','yellow','blue','black']
```

- `slice()`：剪切数组，不影响原数组\
  slice 基于当前数组的一个或多项组建新数组。接受一个或者两个参数.

```js
var colors1 = ['red', 'green', 'yellow', 'blue', 'black']
//若只有一个参数，则返回从该参数指定位置到结束位置之间项的数组
var colors2 = colors1.slice(1) //['green','yellow','blue','black']
//若有两个参数，则返回第一个参数指定位置项至第二个参数指定项(不包含)之间的项的数组
var colors3 = colors1.slice(1, 4) //['green','yellow','blue']
//若参数中有负数，则用数组长度加上该参数确定位置
var colors4 = colors1.slice(-4, -1) //['green','yellow','blue']
//若第二个参数小于第一个参数，则返回空数组
var colors5 = colors1.slice(2, 1) //[]
```

- `splice()`：拼接数组，对原数组操作\
  可以实现对原数组的删除、插入、替换操作，始终返回一个数组，该数组中包含从原始数组中删除的项。
  - `删除`：接收两个参数：要删除的第一项位置和要删除的项数；
  - `插入`：接收三个以上参数：起始位置、0（要删除的项数）、要插入的项；
  - `替换`：接收三个以上参数：起始位置、要删除的项数、要插入的项；

```js
var colors = ['red', 'green', 'yellow', 'blue', 'black']
//删除
var removed = colors.splice(0, 1) // 返回 ['red']
//colors = ['green','yellow','blue','black']
//插入
var removed = colors.splice(1, 0, 'white', 'orange') // 返回 []
//colors = ['green','white','orange','yellow','blue','black']
//替换
var removed = colors.splice(1, 1, 'red') // 返回 ['white']
//colors = ['green','red','orange','yellow','blue','black']
```

## 7. 位置方法：indexOf()、lastIndexOf()

ECMAScript5 增加了两个位置方法。这两个方法都接收两个参数：要查找的项和开始查找的位置索引。返回值是要查找的项在数组中的位置，没找到返回-1.在查找的过程中使用全等操作符。

- `indexOf()` 正序
- `lastIndexOf()` 反序

```js
var number = [1,2,3,4,5,4,3,2,1];
alert number.indexOf(4);       //3
alert number.lastIndexOf(4);   //5
alert number.indexOf(4,4);     //5
alert number.lastIndexOf(4,4); //3
```

## 8. 迭代方法：every()、filter()、forEach、map()、some()

5 个迭代方法，都接收两个参数：要在每一项上运行的函数和运行该函数的作用域对象（影响 this）。传入的函数接收三个参数：当前数组项的值，该项在数组中位置，数组本身。

- `every()` ：对数组中每一项运行给定函数，若结果全都是 true，则返回 true；
- `some()` ：对数组中每一项运行给定函数，有一项结果为 true 就返回 true；
- `filter()` ：对数组中每一项运行给定函数，返回结果为 true 的数组项组合的新数组；
- `forEach()` ：对数组中每一项运行给定函数，没有返回值；
- `map()` ：对数组中每一项运行给定函数，返回每一项的运行结果数组；

```js
var number = [1,2,3,4,5,4,3,2,1];
var everyResult =  number.every(function(item,index,array){
    return (item>2);
});   //false

var someResult = number.some(functon(item,index,array){
    return (item>2);
});   //true

var filterResult = number.filter(function(item,index,array){
    return (item>2);
})   //[3,4,5,4,3]

var mapResult = number.map(function(item,index,array){
    return (item*2);
});  //[2,4,6,8,10,8,6,4,2]

//forEach方法没有返回值
number.forEach(function(item,index,array){
    doSomething()
});
```

![](https://img.yancongwen.cn/18-12-9/56839813.jpg)

## 9. 归并方法：reduce()、reduceRight()

ECMAScript5 新增方法。这两个方法都会迭代数组所有项，构建一个最终返回值。接受两个参数：一个在每一项上调用的函数和作为归并基础的初始值。其中接受的第一个参数是函数，它接收 4 个参数：`前一个值`、`当前值`、`项索引`、`数组对象`；这个函数返回的任何值都会作为第一个参数自动传给下一项，两个函数执行方向不同，除此之外完全相同。

- `reduce()` 正序
- `reduceRight()` 反序

```js
//数组求和：
var number = [1, 2, 3, 4, 5]
var sum = number.reduce(function(prev, cur, index, array) {
  console.log(prev, cur, index, array)
  return prev + cur
}) //15
var sum = number.reduceRight(function(prev, cur, index, array) {
  return prev + cur
}) //15
```

我们把 index 打印出来，你会发现，它的 index 是从 1 开始的。

## 10. ES6 中新增的方法

### 1. Array.from()

`Array.from` 方法用于将两类对象转为真正的数组：伪数组对象和可遍历（iterable）对象（包括 ES6 新增的数据结构 Set 和 Map ）。

```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  '2': 'c',
  length: 3
}
// ES5
var arr1 = [].slice.call(arrayLike) // ['a', 'b', ''c]
// ES6
var arr2 = Array.from(arrayLike) // ['a', 'b', ''c]
```

只要是部署了`Iterator`接口的数据结构，`Array.from` 都能将其转为数组。

```js
Array.from('hello') // ['h', 'e', 'l', 'l', 'o']
// Set
let nameSet = new Set(['a', 'b'])
Array.from(nameSet) // ['a', 'b']
```

Polyfill:

```js
const toArray = (() => {
  Array.from ? Array.from : obj => [].slice.call(obj)
})()
```

### 2. Array.of()

`Array.of` 方法用于将一组值转为数组。

```js
Array.of() // []
Array.of(3, 4, 5) // [3,4,5]
Array.of(3) // [3]
Array.of(3).length // 3
```

这个方法的目的主要是弥补数组构造函数`Array()`的不足。因为参数个数的不同会导致`Array()`的行为有差异。

```js
Array() // []
Array(3) // [ , , ]
Array(3, 4, 5) // [3,4,5]
```

上面代码中，Array 方法没有参数、有 1 个参数、或 3 个参数时，返回结果不一样。只有参数不少于 2 个时，Array() 才会返回由参数组成的新数组。参数只有 1 个时，实际上是指定数组长度。Array.of 基本上可以替代 Array() 或 new Array()，并且不存在由于参数不同而导致的重载。它的行为非常统一。

Polyfill:

```js
function ArrayOf() {
  return [].slice.call(arguments)
}
```

### 3. find() 和 findIndex()

查找

### 4. fill()

填充

### 5. copyWithin()

### 6. includes()

## 11. 伪数组

- 什么是伪数组？
  - 1. 拥有一个 length 属性和若干索引属性的任意对象(有 0,1,2,3,4,5...n,length 这些 key 的对象)；
  - 2. 原型链中没有 Array.prototype；
  - 3.
- 目前知道的伪数组有:
  - 1. 函数的`arguments`对象；
  - 2. `document.querySelectorAll('div')` 返回的节点的集合[NodeList](https://developer.mozilla.org/zh-CN/docs/Web/API/NodeList)；

## 12. 数组去重

- 经典的一个面试题目：如何实现数组去重？：
  > 假设有数组 array = [1,5,2,3,4,2,3,1,3,4] 你要写一个函数 unique，使得 unique(array) 的值为 [1,5,2,3,4]。要求：不要做多重循环，只能遍历一次；请给出两种方案，一种能在 ES 5 环境中运行，一种能在 ES 6 环境中运行。
- 答案
  - ES 5
  ```js
  function unique(array) {
    var result = []
    var obj = {}
    for (var i = 0; i < array.length; i++) {
      if (!obj[array[i]]) {
        result.push(array[i])
        obj[array[i]] = true
      }
    }
    return result
  }
  ```
  - ES 6
  ```js
  function unique(array) {
    return Array.from(new Set(array))
  }
  ```
