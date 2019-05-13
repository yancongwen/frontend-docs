# JS 对象的遍历

## for in

- 遍历的是对象的可枚举属性（key），返回的是所有能够通过对象访问的、可枚举的（enumerated）属性，其中既包括存在于实例中的属性，也包括存在于原型中的属性。
- 不建议使用for in 遍历数组，因为输出的顺序是不固定的。
- 如果迭代的对象的变量值是null或者undefined, for in不执行循环体，建议在使用for in循环之前，先检查该对象的值是不是null或者undefined。

## for of

## Object.keys()、Object.getOwnPropertyNames()

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

如果你想要得到所有实例属性，无论它是否可枚举，都可以使用 Object.getOwnPropertyNames() 方法。

```js
var keys = Object.getOwnPropertyNames(Person.prototype)
alert(keys) //"constructor,name,age,job,sayName"
```

注意结果中包含了不可枚举的 constructor 属性。Object.keys()和 Object.getOwnPropertyNames()方法都可以用来替代 for-in 循环。
