# JS中的数据类型
七种：`number`、`string`、 `boolean`、 `undefined`、 `null`、 `object`、 `symbol`、

## number
- 整数和小数：`1`、 `1.1`、 `.1`
- 科学记数法：`1.23e2`
- 二进制：`0b11`
- 八进制：`011`（后来 ES5 添加了 0o11 语法）
- 十六进制：`0x11`

## string
- 空字符串： `''`
- 多行字符串： 
    ```javascript
     var s = `12345
    67890` // 含回车符号
    ```

## boolean
没什么可说的

## undefined 和 null
都可以表示“没有”，含义非常相似      
- （规范）如果一个变量没有被赋值，那么这个变量的值就是 `undefiend`
- （习俗）如果你想表示一个还没赋值的对象，就用 `null`。如果你想表示一个还没赋值的字符串/数字/布尔/symbol，就用 `undefined`（但是实际上你直接 `var xxx` 一下就行了，不用写 `var xxx = undefined`）
- `null`是一个表示“空”的对象，转为数值时为0；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`
- `undefined == null  //true`

## object
- `object` 就是几种基本类型（无序地）组合在一起
- `object` 里面可以有 `object`
- `object` 的 key 一律是字符串，不存在其他类型的 key（ES6中也可以是 Symbol类型的）
- `object['']` 是合法的
- `object['key']` 可以写作 `object.key`
- `object.key` 与 `object[key]` 不同
- `delete object['key']`
- `'key' in object` 用于判断是否存在这个 key

## symbol
ES6中新增的一个类型，它是 JavaScript 语言的第七种数据类型，表示独一无二的值。
Symbol 值通过Symbol函数生成。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

## typeof 操作符

| 类型 |string | number | boolean | symbol | undefined | null | object | function |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| typeof的值 | 'string' | 'number' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'object' | 'function' |  

1、注意 function 并不是一个类型;    
2、null的类型是object，这是由于历史原因造成的。1995年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑null，只把它当作object的一种特殊值。后来null独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null返回object就没法改变了。
