# CSS 设置滚动条样式
!> `::-webkit-scrollbar`只适用于 webkit 内核的浏览器 (谷歌Chrome, 苹果Safari、360、QQ、搜狗...)，本文也仅讨论适用于webkit 内核浏览器的设置方法。

定义滚动条样式就是设置伪元素和伪类样式。

## 1、滚动条伪元素选择器（7个）
| 数字 | 属性 | 解释 |
| --- | --- | --- |
| 1 | ::-webkit-scrollbar             | 滚动条整体部分（可以设置纵向滚动条宽度、横向滚动条高度） |
| 2 | ::-webkit-scrollbar-button      | 滚动条两端的按钮（没有该属性默认无按钮 ） |
| 3 | ::-webkit-scrollbar-track       | 滚动条轨道 |
| 4 | ::-webkit-scrollbar-track-piece | 滚动条没有滑块的轨道部分 |
| 5 | ::-webkit-scrollbar-thumb       | 滚动的滑块 |
| 6 | ::-webkit-scrollbar-corner      | 当同时有垂直滚动条和水平滚动条时交汇的部分 |
| 7 | ::-webkit-resizer               | 某些元素的corner部分的部分样式（例如textarea的可拖动按钮)|

![滚动条选择器](https://img.yancongwen.cn/18-11-25/33084573.jpg)

## 2、伪类
伪类有点复杂，但是常用的只有前两个
```
:horizontal  //horizontal伪类适用于任何水平方向上的滚动条
:vertical  //vertical伪类适用于任何垂直方向的滚动条
:decrement  //decrement伪类适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮
:increment  //increment伪类适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮
:start  //start伪类适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的前面
:end  //end伪类适用于按钮和轨道碎片。表示对象（按钮 轨道碎片）是否放在滑块的后面
:double-button  //double-button伪类适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。
:single-button  //single-button伪类适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。
:no-button  //no-button伪类表示轨道结束的位置没有按钮。
:corner-present  //corner-present伪类表示滚动条的角落是否存在。
:window-inactive  //适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。
```
## 示例
以下代码就是本页面的滚动条样式设置
```css
::-webkit-scrollbar {
  display: inline-block;
  width: 8px;
  height: 12px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 4px;
}
:hover::-webkit-scrollbar-thumb {
  background-color: rgba(28,70,100,1);
}
::-webkit-scrollbar-thumb:horizontal {
  border-radius: 0;
}
```

## 参考
- [MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::-webkit-scrollbar)
- [css设置滚动条样式](https://blog.csdn.net/yerongtao/article/details/70171602)
- [CSS3自定义滚动条样式 -webkit-scrollbar](http://www.xuanfengge.com/css3-webkit-scrollbar.html)