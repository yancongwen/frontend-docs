# JS 中的数据类型

JavaScript 语言的每一个值都属于某一种数据类型。JavaScript 语言规定了 7 种语言类型：`Number`、`String`、 `Boolean`、 `Undefined`、 `Null`、 `Object`、 `Symbol`。

关于数据类型，我们不妨来看看下面的问题：
- 为什么有的编程规范要求用 void 0 代替 undefined？
- 字符串有最大长度吗？
- JavaScript 中，0.1 + 0.2 等于 0.3 么？
- ES6 新加入的 Symbol 是个什么东西？
- 为什么给对象添加的方法能用在基本类型上？

## Number

- 双精度IEEE 754 64位浮点类型
- 数值范围：
  - 整数范围：-2^53到2^53之间（不含两个端点）
  - 最大安全整数：Number.MAX_SAFE_INTEGER，即 2^53 - 1，9007199254740991
  - 最大安全负整数：MIN_SAFE_INTEGER，即 - (2^53 - 1)，-9007199254740991
- 表示方法
  - 整数和小数：`1`、 `1.1`、 `.1`  
  - 科学记数法：`1.23e2`
  - 二进制：`0b11`
  - 八进制：`011`（后来 ES5 添加了 `0o11` 语法）
  - 十六进制：`0x11`
- 几个特殊值
  - NaN：占用了9007199254740990这个值
  - Infinity 和 -Infinity：无穷大
- 小数的精度问题
  - 为什么 `0.1 + 0.2 != 0.3`?
  - 非整数的 Number 类型无法用 ==（=== 也不行） 来比较
  - 浮点数运算的精度问题导致等式左右的结果并不是严格相等，而是相差了个微小的值
  - Number 类型运算都要想将其转化为二进制，将二进制运算，运算的结果再转化为十进制，因为Number是64位双精度，小数部分只有52位，但0.1转化成为二进制是无限循环的，所以四舍五入了，这里就发生了精度丢失，0.1的二进制和0.2的二进制相加需要保留有效数字，所以又发生了精度丢失，所以结果为0.300000000000004
  ```js
    0.1 + 0.2 // 0.30000000000000004
    0.1 + 0.2 == 0.3 // false
    Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON // true
  ```

> [BigInt](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt) 任意精度数字类型，已经进入 TC39 提案的第四阶段。BigInt 是一种内置对象，它提供了一种方法来表示大于 2^53 - 1 的整数。这原本是 Javascript中可以用 Number 表示的最大数字。BigInt 可以表示任意大的整数。

```js
// 判断是否为数字
typeof value === 'number'
// 判断是否为整数
Number.isInteger(value)
typeof value === 'number' && value % 1 === 0
parseInt(value, 10) === value
Math.floor(value) === value
```

## String

- 编码 UTF16
- 最大长度：2^53 - 1
- String 的意义并非“字符串”，而是字符串的 UTF16 编码，我们字符串的操作 charAt、charCodeAt、length 等方法针对的都是 UTF16 编码。所以，字符串的最大长度，实际上是受字符串的编码长度影响的。
- JavaScript 字符串把每个 UTF16 单元当作一个字符来处理，所以处理基本字符区域（U+0000 - U+FFFF）范围以外的字符时，你应该格外小心。
- 空字符串： `''`
- 多行字符串：
  ```javascript
  var s = `12345
  67890` // 含回车符号
  ```
- Base64
  - Base64 是网络上最常见的用于传输 8Bit 字节码的编码方式之一，Base64 就是一种基于 64 个可打印字符来表示二进制数据的方法；Base64 编码是从二进制到字符的过程，可用于在 HTTP 环境下传递较长的标识信息。
  - 编码方法：`window.btoa("test")  //"dGVzdA=="`
  - 解码方法：`window.atob("dGVzdA==")  //"test"`

## Boolean

true or false

## Undefined 和 Null

都可以表示“没有”，含义非常相似

- （规范）如果一个变量没有被赋值，那么这个变量的值就是 `undefiend`
- （习俗）如果你想表示一个还没赋值的对象，就用 `null`。如果你想表示一个还没赋值的字符串/数字/布尔/symbol，就用 `undefined`（但是实际上你直接 `var xxx` 一下就行了，不用写 `var xxx = undefined`）
- `null`是一个表示“空”的对象，转为数值时为 0；`undefined`是一个表示"此处无定义"的原始值，转为数值时为`NaN`
- `undefined == null //true`
- `undefined` 是一个变量，而并非是一个关键字，这是 JavaScript 语言公认的设计失误之一，为防止被修改，故而推荐使用 `void 0` 来表示 `undefined`

## Object

- `object` 就是几种基本类型（无序地）组合在一起,可以无限嵌套
- `object` 的 key 一律是字符串，不存在其他类型的 key（ES6 中也可以是 Symbol 类型的）
- `object['']` 是合法的
- `object['key']` 可以写作 `object.key`
- `object.key` 与 `object[key]` 不同
- `delete object['key']`
- `'key' in object` 用于判断是否存在这个 key

```js
// 判断是否为对象
typeof value === 'object' && value !== null
```

## Symbol

ES6 中新增的一个类型，它是 JavaScript 语言的第七种数据类型，表示独一无二的值。
Symbol 值通过 Symbol 函数生成。凡是属性名属于 Symbol 类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

## typeof 操作符

| 类型        | string   | number   | boolean   | symbol   | undefined   | null     | object   | function   |
| ----------- | -------- | -------- | --------- | -------- | ----------- | -------- | -------- | ---------- |
| typeof 的值 | 'string' | 'number' | 'boolean' | 'symbol' | 'undefined' | 'object' | 'object' | 'function' |

1、注意 function 并不是一个类型;  
2、null 的类型是 object，这是由于历史原因造成的。1995 年的 JavaScript 语言第一版，只设计了五种数据类型（对象、整数、浮点数、字符串和布尔值），没考虑 null，只把它当作 object 的一种特殊值。后来 null 独立出来，作为一种单独的数据类型，为了兼容以前的代码，typeof null 返回 object 就没法改变了。

```js
typeof undefine    //undefine
typeof 'abc'       //string
typeof 123         //number
typof 1n           //bigint
typeof true        //boolean
typeof {}          //object
typeof []          //object
typeof null        //object
tyoeof console.log //function
```


## 参考

- [JavaScript类型：关于类型，有哪些你不知道的细节？](https://time.geekbang.org/column/article/78884)