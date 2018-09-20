# JS 数据类型转换

## 任意类型转字符串
- String(x)         
![](https://img.yancongwen.cn/18-9-20/9436618.jpg)
- x.toString()  
![](https://img.yancongwen.cn/18-9-20/40339551.jpg)
- x + ''
![](https://img.yancongwen.cn/18-9-20/5923289.jpg)

## 任意类型转布尔  
- 六个 **falsy** 值：`false`、`0`、`NaN`、`null`、`undefined`、`''`(其实还有一个`document.all`)，除了以上六个值被转为`false`外，其他值都转为true； 
- 所有的对象都被转换为 `true`（数组、函数、空数组、空对象）  
- Boolean(x)    
![](https://img.yancongwen.cn/18-9-18/2569689.jpg)
- !!x   
![](https://img.yancongwen.cn/18-9-18/79806060.jpg)

## 任意类型转数字
- Number(x)
- parseInt(x, 10)
- parseFloat(x) 
- x - 0
- +x