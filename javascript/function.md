# JavaScript 中的函数

## 1、函数的五种声明方式
```javascript
// 方式1
function f1(x,y){
    return x+y;
}
f1.name === "f1"
// 方式2
var f2 = function(x,y){
    return x+y;
}
f2.name === "f2"
// 方式3（不用）
var f3 = function fff(x,y){
    return x+y;
}
f3.name === "fff"
// 方式4（不用）
var f4 = new Function(x,y,'return x+y')
f4.name === "anonymous" //匿名的
// 方式5（ES6增）
var f5 = (x,y) => x+y
f5.name === "f5"
```
## 2、this
## 3、arguments
## 4、什么是 call stack
## 5、作用域
## 6、call、apply、bind 三者的用法


## 7、什么是闭包，闭包的用途是什么？
- 定义：「函数」和「函数内部能访问到的变量」（也叫环境）的总和，就是一个闭包。JavaScript有两种作用域：全局作用域和函数作用域。函数内部可以直接读取全局变量。但是，在函数外部无法读取函数内部声明的变量。换言之，如果一个函数，使用了它范围外的变量，那么‘这个函数+这个变量’就叫做闭包。
- 示例    
    ```javascript
    function foo(){
      var local = 1
      function bar(){
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
    ```javascript
    function f1(n) {
      return function () {
        return n++
      };
    }
    var a1 = f1(1)
    a1() // 1
    a1() // 2
    a1() // 3
    var a2 = f1(5)
    a2() // 5
    a2() // 6
    a2() // 7
    //这段代码中，a1 和 a2 是相互独立的，各自返回自己的私有变量。
    ```


## 参考
- [JS 中的闭包是什么？](https://segmentfault.com/a/1190000012785212)


