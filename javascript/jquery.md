# 理解 jQuery

## 1、还有必要学习 jQuery 吗

首先必须肯定的回答：有必要。  
虽然目前 MVVM 框架很流行，但 jQuery 依然占据一定地位。某些特定场景的项目 jQuery 依然是最好的选择，jQuery 帮助我们解决了太多的兼容性问题，而且对于有一定 JS 基础的人来说学习 jQuery 的成本很低，没必要去掌握全部 API，只要会查文档就可以。虽然新项目中不一定会使用 jQuery ，但是学习 jQuery ，尤其是去阅读 jQuery 源码，理解其设计思想、设计模式，你将会颇有收获。

## 2、jQuery DOM 操作设计思想

jQuery 的基本设计思想和主要用法，就是"选择某个网页元素，然后对其进行某种操作"。使用 jQuery 的第一步，往往就是将一个选择表达式，放进构造函数 jQuery()（简写为\$），得到被选中的元素，选中的元素可能是一个，也可能是多个。第二步就是对这些元素进行一系列操作，例如添加 class、移除 class、取值和赋值、移动等。 jQuery 的一大特点就是支持链式操作，即类似于这样`$('div').find('h3').eq(2).html('Hello');`,将一系列操作连接在一起。它的原理在于每一步的 jQuery 操作，返回的都是一个 jQuery 对象，所以不同操作可以连在一起。

## 3、自己实现一个简单的 jQuery

```js
window.jQuery = function(nodeOrSelector) {
  var nodes = {}
  if (typeof nodeOrSelector === 'string') {
    var nodeList = document.querySelectorAll(nodeOrSelector)
    nodeList.forEach(function(item, index) {
      nodes[index] = item
    })
    nodes.length = nodeList.length
  } else if (nodeOrSelector instanceof Node) {
    nodes = {
      '1': nodeOrSelector,
      lenght: 1
    }
  }
  nodes.addClass = function(classNames) {
    for (var i = 0; i < nodes.length; i++) {
      classNames.forEach(function(item) {
        nodes[i].classList.add(item)
      })
    }
  }
  nodes.setText = function(text) {
    for (var i = 0; i < nodes.length; i++) {
      nodeList[i].innerHTML = text
    }
  }
  return nodes
}
// alias
window.$ = jQuery
// 使用
$('ul>li').addClass(['red', 'blue'])
$('ul>li').setText('Hello jQuery')
```

以上是本人实现的一个简单的 jQuery 对象。该对象接收一个参数，可以是一个已经获取到的 DOM 对象，也可以是一个选择器字符串。jQuery 方法返回的是一个自定义的节点对象，该对象上定义了 addClass、setText 等一系列操作方法。

## 4、jQuery 获取 DOM 和 JS 选择器获取的 DOM 的区别与联系

例如：

```html
<div id="x"></div>
```

```js
var div = document.getElementById('x')
var $div = $('#x')
```

- div 是由原生 API 获取的元素节点对象，  
   `div.__proto__ === HTMLDivElement.prototype`   
   `div.__proto__.__proto__ === HTMLElement .prototype`
- \$div 是 jQuery 对象实例，它包含了从 jQuery 继承过来的很多方法和属性
  `$div.__proto__ === jQuery.prototype`  
   `$div.__proto__ .__proto__ === Object.prototype`
- div 变成 \$div:
  `$(div)`
- \$div 变成 div:
  `$div[0] === div`
