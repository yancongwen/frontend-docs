# JavaScript 之 Function

## 1、函数的五种声明方式

```js
// 方式1：函数声明，存在变量提升
function f1(x, y) {
  return x + y
}
f1.name === 'f1'
// 方式2：函数表达式，不存在变量提升
var f2 = function(x, y) {
  return x + y
}
f2.name === 'f2'
// 方式3（不用）
var f3 = function fff(x, y) {
  return x + y
}
f3.name === 'fff'
// 方式4（不用）
var f4 = new Function(x, y, 'return x+y')
f4.name === 'anonymous' //匿名的
// 方式5（ES6增）
var f5 = (x, y) => x + y
f5.name === 'f5'
```

## 2、函数内部属性：name、length、this、arguments、callee、caller

- **name**（函数名）
- **length**（函数形参长度）
- **this**  
  js 中的 `this` 和 java、C# 中的类似，表示函数据以执行的的环境对象。
  此外，这里还要注意一点的是，普通函数和 ES6 中的箭头函数中 `this` 是有区别的。 - 普通函数中的 `this` 是不固定的，它会随着执行环境的改变而改变； - ES6 中的箭头函数没有自己的 `this`, 箭头函数函数体内的 `this` 就是定义时所在的对象，而不是使用时所在的对象，一旦它定义以后就不会再变；

  ```js
  var color = 'red'
  var obj = { color: 'blue' }
  function sayColor() {
    console.log(this.color)
  }
  sayColor() // red
  obj.sayColor = sayColor
  obj.sayColor() // blue

  var sayColor2 = () => {
    console.log(this.color)
  }
  sayColor2() // red
  obj.sayColor2 = sayColor2
  obj.sayColor2() // red
  ```

- **arguments** 与 **callee**  
  `arguments` 是一个伪数组对象，包含着传入函数中的所有参数。虽然它的主要用途是保存函数参数，但这个对象还有一个 `callee` 属性，该属性是一个指针，指向拥有这个 `arguments` 对象的函数。  
  下面是阶乘函数的定义，用到了递归，使用 `callee` 很好的避免了函数内部的耦合：

```js
function factorial(num) {
  if (num <= 1) {
    return 1
  } else {
    return this.arguments.callee(num - 1)
    //等价于（且优于） return factorial(num-1)
  }
}
```

- **caller**  
  ECMAScript 5 规范化了另一个函数对象属性：`caller`。这个属性保存着调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，那么它的值为 null。

```js
fucntion outer(){
    inner()
}
function inner(){
    alert(arguments.callee.caller)
    // 等价于 alert(outer)
}
outer()
```

## 3、改变函数中 this 指向的三个方法：call、apply、bind

每一个函数都会从它的构造函数 `Function` 的原型中继承得到 `call`、`apply`、`bind` 三个方法。它们的用途在于在特定的作用域中调用函数，实际上等于改变函数内部 `this` 指针的指向（ES6 的箭头函数当然没用啦）。`call`、`apply` 为立即调用函数而 `bind` 是返回函数。

- apply  
  该方法接收两个参数，函数作用域对象、参数数组（数组或者 arguments 伪数组）

- call  
  `call` 方法和 `apply` 方法作用完全相同，它们的区别仅在于接收的第二个参数形式不同。`call`方法要求传递给函数的参数必须逐个列举出来。至于是采用 `call` 还是 `apply` 完全取决于你采取哪种传参方式方便。

```js
function sum(num1, num2) {
  return sum1 + sum2
}
function callSum(num1, num2) {
  return sum.apply(this, arguments)
  // 等价于 return sum.applay(this, [num1,num2])
  // 等价于 return sum.call(this, num1, num2)
}
callSum(1, 2) // 3
```

事实上，传递参数并非 `applay()`、`call()` 的真正用武之地，他们真正强大之处在于能够扩充函数赖以运行的环境。来看下面一个列子。

```js
window.color = 'red'
var obj = { color: 'blue' }
function sayColor() {
  console.log(this.color)
}
sayColor() // red
sayColor.call(window) // red
sayColor.call(this) // red
sayColor.call(obj) // blue
```

使用 `call()` 或者 `apply()` 来扩充函数作用域的最大好处就是对象与方法的解耦。

- bind  
  `bind` 是 ES5 中定义的一个方法，`bind` 接受的参数跟 `call` 一致，执行`bind()`不会立即调用，它会生成一个新的函数，新函数的 this 就是 bind 方法穿进去的参数。例如：

```js
window.color = 'red'
var obj = { color: 'blue' }
function sayColor() {
  console.log(this.color)
}
var newSayColorFun = sayColor.bind(obj)
newSayColorFun() // blue
```

## 4、什么是闭包，闭包的用途是什么？

- 定义：「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。JavaScript 有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。但是，在函数外部无法读取函数内部声明的变量。换言之，如果一个函数，使用了它范围外的变量，那么‘这个函数+这个变量’就叫做闭包。
- 示例
  ```js
  function foo() {
    var local = 1
    function bar() {
      local++
      return local
    }
    return bar
  }
  var func = foo()
  func()
  ```
  为什么要函数套函数呢？是因为需要局部变量，所以才把 local 放在一个函数里，如果不把 local 放在一个函数里，local 就是一个全局变量了，达不到使用闭包的目的——隐藏变量
- 用途
  - 隐藏一个变量，外部无法直接访问这个变量
  - 让这些变量始终保持在内存中
  - 封装对象的私有属性和私有方法
  ```js
  function f1(n) {
    return function() {
      return n++
    }
  }
  var a1 = f1(1)
  a1() // 1
  a1() // 2
  var a2 = f1(1)
  a2() // 1
  a2() // 2
  //这段代码中，a1 和 a2 是相互独立的，各自返回自己的私有变量。
  ```

## 5、什么是 call stack

js 是单线程的，也就是说同一时间只能执行一个方法。

## 参考

- [Javascript 高级程序设计（第 3 版）](<javascript:void(0)>)
- [JS 中的闭包是什么？](https://segmentfault.com/a/1190000012785212)
