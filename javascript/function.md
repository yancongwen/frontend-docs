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


