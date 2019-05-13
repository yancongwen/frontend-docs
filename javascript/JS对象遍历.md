# JS 对象的遍历

## for...in

- 遍历的是对象的可枚举属性（key），返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。
- 不建议使用 for in 遍历数组，因为输出的顺序是不固定的。
- 如果迭代的对象的变量值是 null 或者 undefined, for in 不执行循环体，建议在使用 for in 循环之前，先检查该对象的值是不是 null 或者 undefined。

```js
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  say() {
    console.log(`My name is ${this.name}`)
  }
}
let p = new Person('Javon', 18)
for (let key in p) {
  console.log(key) // name age
}
```

## Object.keys()

取得对象上所有可枚举的**实例属性**（不包含从原型中继承而来的属性），这个方法接收一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

```js
function Person() {}

Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'Software Engineer'
Person.prototype.sayName = function() {
  alert(this.name)
}

var keys = Object.keys(Person.prototype)
alert(keys) //"name,age,job,sayName"

var p1 = new Person()
p1.name = 'Rob'
p1.age = 31
var p1keys = Object.keys(p1)
alert(p1keys) //"name,age"
```

## Object.getOwnPropertyNames()

如果你想要得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames() 方法。

```js
var keys = Object.getOwnPropertyNames(Person.prototype)
alert(keys) //"constructor,name,age,job,sayName"
```

注意结果中包含了不可枚举的 constructor 属性。Object.keys() 和 Object.getOwnPropertyNames()方法都可以用来替代 for-in 循环。

## for...of （数组）

for...in 遍历的是键名，而 for...of 遍历的是键值。

一个数据结构只要部署了 Symbol.iterator 属性，就被视为具有 Iterator 接口，就可以使用 for...of 循环遍历它的成员。可以使用 for..of 循环的有：数组、Set、Map 结构以及类数组对象（arguments 对象、DOM NodeList 对象）、Generator 对象以及字符串。

for...of 循环可以替代数组的 forEach 方法。

```js
let arr = ['a', 'b', 'c', 'd']
for (let value of arr) {
  console.log(value) // a b c d
}
for (let key in arr) {
  console.log(key) // 0 1 2 3
}
```
