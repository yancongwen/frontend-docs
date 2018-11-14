# CSS 实现多行文字截断
> 做响应式系统设计的时候遇到需要对标题进行多行文字截取的效果，但是并没有一个统一 CSS 属性实现标准，需要用到一些奇淫妙计来实现。下面是一些实现方法。

## 单行文字截断 text-overflow
文本溢出我们经常用到的应该就是 `text-overflow:ellipsis` 了，只需轻松几行代码就可以实现单行文本截断。该属性浏览器原生支持，各大浏览器兼容性好，缺点就是只支持单行文本截断。如果是多行文字截取效果，实现起来就没有那么轻松。
```css
div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
```

## 多行文字截断
#### 方法1： -webkit-line-clamp 实现
具体的方式如下：
```css
div{
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
```
它需要和 display、 -webkit-box-orient 和 overflow 结合使用：
- `display:-webkit-box;` 必须结合的属性，将对象作为弹性伸缩盒子模型显示。
- `-webkit-box-orient:vertical;` 必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式。
- `text-overflow:ellipsis;` 可选属性，可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本。
- `-webkit-line-clamp: 2;` 限制在一个块元素显示的文本的行数。    

**优点**：
- 响应式截断，根据不同宽度做出调整。
- 文本超出范围才显示省略号，否则不显示省略号。
- 浏览器原生实现，所以省略号位置显示刚好。

**缺点**：-webkit-line-clamp 是一个不规范的属性，只有 webkit 内核的浏览器才支持这个属性，Firefox, IE 浏览器统统都不支持这个属性。

**使用场景**：多用于移动端页面，因为移动设备浏览器更多是基于 webkit 内核，除了兼容性不好，实现截断的效果不错。

#### 方法2：定位元素实现多行文本截断
通过伪元素绝对定位到行尾并遮住文字，再通过 overflow: hidden 隐藏多余文字。
```css
p {
    position: relative;
    line-height: 18px;
    height: 36px;
    overflow: hidden;
}
p::after {
    content: "...";
    font-weight: bold;
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0 20px 1px 45px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```
在 [jsfiddle](https://jsfiddle.net/lindz/6aqnye4u/2/) 查看演示。

**优点**： 兼容性好
**缺点**： 无法识别文字的长短，省略号一直都在
**使用场景**： 文字内容较多，确定文字内容一定会超过容器的，那么选择这种方式不错

#### 方法3：float 特性实现多行文本截断
下面这个方法充分利用了元素浮动的特性。
![](https://raw.githubusercontent.com/happylindz/blog/master/images/jiequ/6.jpg)    
有个三个盒子 div，粉色盒子左浮动，浅蓝色盒子和黄色盒子右浮动，
- 当浅蓝色盒子的高度低于粉色盒子，黄色盒子仍会处于浅蓝色盒子右下方。
- 如果浅蓝色盒子文本过多，高度超过了粉色盒子，则黄色盒子不会停留在右下方，而是掉到了粉色盒子下。

以上是理论基础，具体的实现方法就是：将最后一个黄色的盒子看做省略号，当文本多余需要截断时，将已经浮动到左下侧的黄色盒子相对定位到浅蓝色盒子的右下侧。这样，当文本较少时，黄色盒子被定位到盒子以外不可见的区域，当文本超出时，就显示在文本右下角。具体实现请看代码：
```html
<div class="wrap">
  <div class="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos labore sit vel itaque delectus atque quos magnam assumenda quod architecto perspiciatis animi.</div>
</div>
```
```css
.wrap {
    height: 40px;
    line-height: 20px;
    overflow: hidden;
}
.wrap .text {
    float: right;
    margin-left: -5px;
    width: 100%;
    word-break:break-all;
}
.wrap::before {
    float: left;
    width: 5px;
    content: '';
    height: 40px;
}
.wrap::after {
    float: right;
    content: "...";
    height: 20px;
    line-height: 20px;
    padding-right: 5px;
    text-align: right;
    /* 为三个省略号的宽度 */
    width: 3em;
    /* 使盒子不占位置 */
    margin-left: -3em;
    /* 移动省略号位置 */
    position: relative;
    left: 100%;
    top: -20px;
    padding-right: 5px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), white 50%, white);
}
```
在 [jsfiddle](https://jsfiddle.net/lindz/95h0edp6/35/) 查看演示。

**优点**： 兼容性好；响应式截断，根据不同宽度做出调整；文本超出范围才显示省略号，否则不显示省略号；    
**缺点**： 增加了额外的div包裹元素和伪元素；  
**使用场景**： 这个方法应该是我看到最好的用纯 CSS 处理的方式了，推荐！


## 参考
- 本文摘录自：[纯 CSS 实现多行文字截断](https://github.com/happylindz/blog/issues/12)