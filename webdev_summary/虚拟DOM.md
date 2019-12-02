# Virtual DOM

## 1、What
Virtual DOM 是一种用JS对象表示DOM的一种技术；是一种开发思想，用一个简单的对象去代替复杂的 DOM 对象。DOM 就是文档树，在 web 开发中通常指 HTML 对应的渲染树，广义的 DOM 也可以指 Android 中的 XML 布局对应的控件树，也可以是指小程序开发中的 WXML，DOM 操作就是指直接操作渲染树（或控件树）。我们写的HTML也好、Vue中的模板也好、React中的JSX也好，都可以转换为虚拟DOM表达，然后再渲染。

## 2、Why
#### 过去开发中的痛点
- 业务逻辑和视图操作代码耦合
- 高频DOM操作造成性能损耗（JS引擎和渲染引擎频繁‘交流’）
- 回流和重绘（修改元素样式）

> 把 DOM 和 ECMAScript 各自想象成一个岛屿，它们之间用收费桥梁连接。ECMAScript 每次访问 DOM，都要经过这座桥，并交纳“过桥费”，访问 DOM 的次数越多，费用也就越高。因此，推荐的做法是尽量减少过桥的次数，努力呆在 ECMAScript 岛上。  ——《高性能JavaScript》

- 减少跨界过桥次数，合并操作

```js
function updateElement() {
  let el = document.getElementById('wrapper_wrapper')
  for (let i = 0; i < 10000; i++) {
    el.innerHTML += 'Test'
  }
}

function updateElement2() {
  let el = document.getElementById('wrapper_wrapper')
  let content = ''
  for (let i = 0; i < 10000; i++) {
    content += 'Test'
  }
  el.innerHTML = content
}

let start = new Date().getTime()
updateElement()
let end = new Date().getTime()
console.log(end - start)

start = new Date().getTime()
updateElement2()
end = new Date().getTime()
console.log(end - start)
```

#### 虚拟DOM带来的好处
- 对开发者友好，提升开发效率
- 数据驱动，提供了一个视图中间层，一套代码，多端运行
- 浏览器执行机制，减少DOM操作，减少回流重绘
- 很多时候并不是最优的操作，但它具有普适性，可在效率、可维护性之间达平衡

## 3、How

```js
let newState = payloadToState(payload, previousState)
let newVirtualNode = stateToVirtualNode(newState)
let diff = virtualNodeToDiff(previousVirtualNode, newVirtualNode)
let modifications = diffToModifications(diff)
let newView = applyModifications(previousView, modifications)
```

## 4、snabbdom 源码分析
> snabbdom 一个经典的虚拟 DOM 库，虽然核心代码只有 200 行，但是功能丰富，性能极佳，支持自定义模块拓展功能。vue的虚拟dom实现也是参考了snabbdom.js的实现。

```
src
├── helpers
│   └── attachto.ts # 定义了AttachData，VNodeDataWithAttach ，VNodeWithAttachData 等数据结构
├── modules # 可选模块，该文件夹中主要存放一些在更新dom差异的时候需要的操作
│   ├── attributes.ts # 在vnode更新的时候，更新dom中的attrs操作
│   ├── class.ts  # 在vnode更新的时候，更新dom中的class操作
│   ├── dataset.ts # 在vnode更新的时候，更新dom中的dataset(自定义数据集)操作
│   ├── eventlisteners.ts  # 在vnode更新的时候，更新dom中的eventlisteners(自定义数据集)操作
│   ├── hero.ts # 在vnode更新的时候，和动画效果有关的支持
│   ├── module.ts # 定义的module结构
│   ├── props.ts # 在vnode更新的时候，更新dom中的props操作
│   └── style.js # 在vnode更新的时候，更新dom中的style操作
├── h.ts   # 帮助函数主要用来操作生成vnode的
├── hooks.ts   # 定义snabbdom在运行的过程中hooks的模型
├── htmldomapi.ts # 对浏览器的dom的api进行二次包装，可以直接操作，html的dom的api
├── is.ts # is函数主要是针对做一些数据类型判断，分 primitive和array类型
├── snabbdom.bundle.ts # snabbdom.ts、attributes、class、props、style 、eventListenersModule和h组成了这个ts文件
├── snabbdom.ts # 主要文件，程序的主线逻辑都在这个文件里
├── thunk.ts # thunk这个文件不知道干什么的，但是不影响理解主线逻辑
├── tovnode.ts   # 提供了toVNode的方法，把真实dom转化为vnode
└── vnode.ts # 定义了vnode的模型和转化成为vnode的工具方法
```

### 1、数据结构定义
```ts
export interface VNode {
  sel: string | undefined; // nodeName+id+class拼接的字符串
  data: VNodeData | undefined; // VNodeData
  children: Array<VNode | string> | undefined;
  elm: Node | undefined; // 存储vnode对应的真实的dom的地方
  text: string | undefined; // vnode的text文本，和children只能二选一
  key: Key | undefined; // 主要用于后续vnode的diff过程
}

export interface VNodeData {
  props?: Props; // vnode上传递的其他属性
  attrs?: Attrs; // vnode上的其他dom属性，可以通过setAttribute来设置或删除的
  class?: Classes; // vnode上的class的属性集合
  style?: VNodeStyle; // vnode上的style属性集合
  dataset?: Dataset; // vnode挂载的数据集合
  on?: On;  // 监听的事件集合
  hero?: Hero; 
  attachData?: AttachData; // 额外附加的数据
  hook?: Hooks; // vnode的钩子函数集合，主要用于在不同阶段调用不通过的钩子函数
  key?: Key; 
  ns?: string; // for SVGs 命名空间，主要用于SVG
  fn?: () => VNode; // for thunks
  args?: Array<any>; // for thunks
  [key: string]: any; // for any other 3rd party module
}
```
### 2、真实DOM转化为虚拟DOM：toVNode

### 3、虚拟DOM生成真实DOM：createElm

### 4、判断是否是同一个节点
```js
function sameVnode(vnode1: VNode, vnode2: VNode): boolean {
  return vnode1.key === vnode2.key && vnode1.sel === vnode2.sel;
}
```
### 5、Diff 算法：


三种操作：移动、创建、删除

首尾交叉对比

- 假设： 如果 oldVnode 和 vnode 不同（如 type 从 div 变到 p，或者 key 改变），意味着整个 vnode 被替换，不用比较了
- 在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较；Web 应用很少有 component 移动到树的另一个层级去，它们大部分只是在相邻的子节点之间移动.（简化复杂度）

<!-- !()[https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/1.png] -->
!()[https://pic1.zhimg.com/80/0c08dbb6b1e0745780de4d208ad51d34_hd.png]

## 5、开发中应注意的问题

- 尽量保持 DOM 结构不变，避免跨层级操作
- 合理使用 key
- 不要盲目相信diff的效率，在必要时可以手工优化


## 参考
- [现代前端科技解析 —— Virtual DOM](https://github.com/jin5354/404forest/issues/71)