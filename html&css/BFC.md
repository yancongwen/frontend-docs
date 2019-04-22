# BFC（块级格式化上下文）

## 一、CSS 规范中对 BFC 的描述

浮动，绝对定位元素，非块盒的块容器（例如，inline-blocks，table-cells 和 table-captions）和'overflow'不为'visible'的块盒会为它们的内容建立一个新的块格式化上下文。

在一个块格式化上下文中，盒在竖直方向一个接一个地放置，从包含块的顶部开始。两个兄弟盒之间的竖直距离由'margin'属性决定。同一个块格式化上下文中的相邻块级盒之间的竖直 margin 会合并。

在一个块格式化上下文中，每个盒的 left 外边（left outer edge）挨着包含块的 left 边（对于从右向左的格式化，right 边挨着）。即使存在浮动（尽管一个盒的行盒可能会因为浮动收缩），这也成立。除非该盒建立了一个新的块格式化上下文（这种情况下，该盒自身可能会因为浮动变窄）。

## 二、MDN 对 BFC 的描述

一个块格式化上下文（block formatting context） 是 Web 页面的可视化 CSS 渲染出的一部分。它是块级盒布局出现的区域，也是浮动层元素进行交互的区域。

一个块格式化上下文由以下之一创建：

- 根元素或其它包含它的元素
- 浮动元素 (元素的 float 不是 none)
- 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
- 内联块 (元素具有 display: inline-block)
- overflow 除了 visible 以外的值 (hidden、auto、scroll)
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 表格单元格 (元素具有 display: table-cell，HTML 表格单元格默认属性)
- 表格标题 (元素具有 display: table-caption, HTML 表格标题默认属性)...

## 三、张鑫旭对 BFC 的描述

BFC 全称“Block Formatting Context”, 中文为“块级格式化上下文”。BFC 元素特性表现原则就是，内部子元素再怎么翻江倒海，翻云覆雨都不会影响外部的元素。所以，避免 margin 穿透啊，清除浮动什么的也好理解了。

## 四、BFC 特性

具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

- 内部的 Box 会在垂直方向，一个接一个地放置
- 同一个 BFC 下外边距会发生折叠
- 计算 BFC 的高度时，浮动元素也参与计算

## 四、BFC 常用功能

### 1、爸爸关儿子

用 BFC 包住浮动元素。(注意，这不是清除浮动，.clearfix 才是清除浮动）

[示例](http://js.jirengu.com/rozaxufetu/1/edit?html,css,output)
通常情况下父元素的高度会被子元素撑开，而在这里因为其子元素为浮动元素所以父元素发生了高度坍塌。这时就可以触发 BFC，让父元素包住浮动的子元素。

### 2、兄弟之间划清界限

BFC 可用于实现两栏自适用布局。
[示例](http://js.jirengu.com/felikenuve/1/edit?html,css,output)

## 参考：

- [MDN 块格式化上下文](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)
- [BFC 到底是神马？](https://zhuanlan.zhihu.com/p/33437517)
- [10 分钟理解 BFC 原理](https://zhuanlan.zhihu.com/p/25321647)
