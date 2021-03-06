## JavaScript 运行机制及 Event Loop

> 本文主要摘自阮一峰老师文章《JavaScript 运行机制详解：再谈 Event Loop》

## 1. JavaScript 是单线程

JavaScript 语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。为了利用多核 CPU 的计算能力，HTML5 提出 WebWorker 标准，允许 JavaScript 脚本创建多个线程，但是子线程完全受主线程控制，且不得操作 DOM 。所以，这个新标准并没有改变 JavaScript 单线程的本质。

## 2. 任务队列

单线程：所有任务需要排队，前一个任务结束，才会执行后一个任务。如果排队是因为计算量大，CPU 忙不过来，倒也算了，但是很多时候 CPU 是闲着的，因为 IO 设备（输入输出设备）很慢（比如 Ajax 操作从网络读取数据），不得不等着结果出来，再往下执行。于是，所有任务可以分成两种，一种是 **同步任务（synchronous）**，另一种是 **异步任务（asynchronous）**。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入“任务队列”（task queue）的任务，只有“任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。具体来说，异步执行的运行机制如下。

- 1、所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
- 2、主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
- 3、一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
- 4、主线程不断重复上面的第三步。只要主线程空了，就会去读取"任务队列"，这就是 JavaScript 的运行机制。这个过程会不断重复。
  ![JavaScript的运行机制](https://img.yancongwen.cn/18-12-9/26499105.jpg)

## 3. 事件和回调函数

- "任务队列"是一个事件的队列，IO 设备完成一项任务，就在"任务队列"中添加一个事件，表示相关的异步任务可以进入"执行栈"了。主线程读取"任务队列"，就是读取里面有哪些事件。
- "任务队列"中的事件，除了 IO 设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入"任务队列"，等待主线程读取。
- 所谓"回调函数"（callback），就是那些会被主线程挂起来的代码，回调函数放在任务队列中。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。
- "任务队列"是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，"任务队列"上第一位的事件就自动进入主线程。但是，由于存在后文提到的"定时器"功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。
- 如果执行栈没有执行完的话，是永远不会触发 callback 的，任务队列也不会被执行。

## 4. Event Loop

主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为 Event Loop（事件循环）。
为了更好地理解 Event Loop，请看下图：

![JS Event Loop](https://img.yancongwen.cn/18-12-9/45676300.jpg)

上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部 API，它们在"任务队列"中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取"任务队列"，依次执行那些事件所对应的回调函数。\
执行栈中的代码（同步任务），总是在读取"任务队列"（异步任务）之前执行。请看下面这个例子。

```js
var req = new XMLHttpRequest()
req.open('GET', url)
req.onload = function a() {}
req.onerror = function b() {}
req.send()
```

上面代码中的 req.send 方法是 Ajax 操作向服务器发送数据，它是一个异步任务，意味着只有当前脚本的所有代码执行完，系统才会去读取"任务队列"。所以，它与下面的写法等价。

```js
var req = new XMLHttpRequest()
req.open('GET', url)
req.send()
req.onload = function a() {}
req.onerror = function b() {}
```

也就是说，指定回调函数的部分（onload 和 onerror），在 send()方法的前面或后面无关紧要，因为它们属于执行栈的一部分，系统总是执行完它们，才会去读取"任务队列"。
function a,b 就是存放在任务队列中，当事件触发，且执行栈为空，就会去任务队列中读取 a，b 执行。

## 5. 定时器

除了放置异步任务的事件，"任务队列"还可以放置定时事件，即指定某些代码在多少时间之后执行。定时器功能主要由 `setTimeout` 和 `setInterval` 这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。以下主要讨论`setTimeout`。

```js
console.log(1)
setTimeout(function() {
  console.log(2)
}, 1000)
console.log(3)
```

上面代码的执行结果是 1，3，2，因为`setTimeout`将第二行推迟到 1000 毫秒之后执行。如果将`setTimeout`的第二个参数设为 0，就表示当前代码执行完（执行栈清空）以后，立即执行（0 毫秒间隔）指定的回调函数。

```js
setTimeout(function() {
  console.log(1)
}, 0)
console.log(2)
```

上面代码的执行结果总是 2，1，因为只有在执行完第二行以后，系统才会去执行"任务队列"中的回调函数。\
需要注意的是，`setTimeout`只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在`setTimeout`指定的时间执行。

## 6. 一道题目

```js
setTimeout(() => console.log(1))
new Promise((resolve, reject) => {
  console.log(2)
  for (var i = 0; i < 10000; i++) {
    i == 9999 && resolve()
  }
  console.log(3)
}).then(() => {
  console.log(4)
})
console.log(5)
// 为什么输出结果为 2 3 5 4 1,而不是 2 3 5 1 4
```

这个题目我纠结的一点是，为什么 `Promise` 的异步任务要比 `setTimeout` 的异步先执行，仅仅靠以上知识点是无法回答这个问题的。原来异步任务之间也是存在差异的，可分为微任务和宏任务。宿主（浏览器）发起的任务称为宏观任务，JavaScript 引擎发起的任务称为微观任务。

- `macro-task`（宏任务）：包括整体 script 代码、`setInterval`、`setTimeout`、`setImmediate`、 I/O 操作、UI 渲染等
- `micro-task`（微任务）：`Promise`、`process.nextTick`、`MutationObserver`

不同类型的任务会进入对应的 event queue，比如 `setInterval`，`setTimeout` 会进入相同的 event queue。事件循环的顺序决定 js 代码的执行顺序。进入整体代码（宏任务）后，开始第一次循环。接着执行当前产生的所有微任务。然后再从宏任务开始，找到其中一个任务队列执行完毕，再执行所有的微任务。
分析一下以上代码中的代码执行顺序：

- (1) 这段代码作为宏任务进入主线程，先遇到 `setTimeout`，那么将其回调函数分发到宏任务的 event queue 上;
- (2) 接下来遇到 `Promise`，`new Promise` 立即执行，`then` 函数分发到微任务的 event queue 中;
- (3) 然后，整体 script 代码作为第一个宏任务执行结束，看看有哪些微任务，我们发现 `then `在微任务 event queue 里，则执行;
- (4) 第一轮循环事件结束，开始第二轮循环，当然是从宏任务的 event queue 开始，我们发现了宏任务 event queue 中的 `setTimeout` 对应的回调函数，则立即执行

## 7. 总结

- Javascript 是单线程的，所有的同步任务都会在主线程中执行;
- 当主线程中的任务，都执行完之后，系统会 “依次” 读取任务队列里的事件。与之相对应的异步任务进入主线程，开始执行;
- 异步任务之间，会存在差异，所以它们执行的优先级也会有区别。大致分为**_微任务_**（micro task，如：`Promise`、`MutaionObserver`、`process.nextTick` 等）和**_宏任务_**（macro task，如：`setTimeout`、`setInterval`、I/O 等）；
- `Promise` 执行器中的代码会被同步调用，但是回调是基于微任务的；
- 宏任务的优先级高于微任务；
- 每一个宏任务执行完毕都必须将当前的微任务队列清空；
- 第一个 script 标签的代码是第一个宏任务；
- 主线程会不断重复上面的步骤，直到执行完所有任务；

## 参考：

- [JavaScript 运行机制详解：再谈 Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [从 setTimeout 谈 JavaScript 运行机制](http://www.cnblogs.com/zichi/p/4604053.html)
- [JavaScript 是如何工作的：引擎，运行时和调用堆栈的概述！](https://segmentfault.com/a/1190000017352941)
- [js 基础进阶--promise 和 setTimeout 执行顺序的问题](http://xiaolongwu.cn/2019/01/26/js%E5%9F%BA%E7%A1%80%E8%BF%9B%E9%98%B6--promise%E5%92%8CsetTimeout%E6%89%A7%E8%A1%8C%E9%A1%BA%E5%BA%8F%E7%9A%84%E9%97%AE%E9%A2%98/#more)
- [从多线程角度来看 Event Loop](https://mp.weixin.qq.com/s/DLunwkzknoQ0tczLHuqpHg)
