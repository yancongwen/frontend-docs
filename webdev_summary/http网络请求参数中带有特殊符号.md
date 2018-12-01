# http网络请求参数中带有特殊符号相关问题

## GET 请求参数中带有空格
请求参数中带有空格会被处理为`+`号。这是`HTML4`标准中定义的，请看这里[Form content types](https://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1)。
在`HTTP`请求头中，首部字段`Content-type`用于指示资源的MIME类型，规定了提交表单元素时对数据的处理方式。下面是几个常见的值：
```
1.text/html
2.text/plain
3.text/css
4.text/javascript
5.application/x-www-form-urlencoded
6.multipart/form-data
7.application/json
8.application/xml
```
其中`application/x-www-form-urlencoded`是默认值，使用该值时，提交表单时内容会按照如下规则编码：空格转换为`+`号；非法字符转换为类似于`%E0`的两位16进制表示的ASCII码；换行符被转换为`CR LF`；数据项名称和数据值以`=`号分割，数据项与数据项之间以`&`分割；.......      
按照以上规则，在`GET`请求中，我们的请求参数会按照以上编码规则进行编码，然后拼接到请求`URL`后面。
例如：
```Javascript
$.ajax({ 
  type： 'GET',
  url: "http://ip:port/count",
  data: { app: '互联网 举证' },
  success: function(response){
    console.log(response)
  }
})
```
当我们发起以上请求时，请求参数会进行转码后拼接在 `url` 后面，空格被转换为了`+`号，真正的请求 `URI` 为 `http://ip:port/count?app=app=%E4%BA%92%E8%81%94%E7%BD%91+%E4%B8%BE%E8%AF%81`   
![](https://img.yancongwen.cn/18-10-20/32458749.jpg)    
当我们直接在浏览器地址栏中输入请求地址，如下图（`%20`就是输入的空格），浏览器就会去请求你输入的地址，而不会再将特殊字符转码。但是会将中文转码。（其实相当于执行了JS中的`encodeURI`）     
![](https://img.yancongwen.cn/18-10-20/2972838.jpg)

## GET 请求参数中带有`+`号
`+` 号和汉字一样，会被转码，转码后为 `%2B`。例如：
```Javascript
$.ajax({ 
  type： 'GET',
  url: "http://ip:port/count",
  data: { app: '互联网+举证' },
  success: function(response){
    console.log(response)
  }
})
```
当我们发起以上请求时，请求参数会进行转码后拼接在 `url` 后面，`+`号被转为`%2B`,真正的请求 `URI` 为 `http://ip:port/count?app=%E4%BA%92%E8%81%94%E7%BD%91%2B%E4%B8%BE%E8%AF%81`    
![](https://img.yancongwen.cn/18-10-20/89868941.jpg)    
直接在浏览器地址栏中输入请求地址，参数中带有`+`号，真实请求中就会保留`+`号。
![](https://img.yancongwen.cn/18-10-20/94235014.jpg)

请细细品味这这几个示例的区别。

## JavaScript中的 URI 编码解码方法
- encodeURI     
    该方法用于将一个**完整**的URI编码，该方法不会对那些保留的并且在URI中有特殊意思的字符进行编码；

- decodeURI     
    该方法解码一个由`encodeURI`先前创建的统一资源标识符（URI）；

- encodeURIComponent        
    对统一资源标识符（URI）的**组成部分**进行编码的方法。转义除了字母、数字、`(`、`)`、`.`、`!`、`~`、`*`、`'`、`-`和`_`之外的所有字符。     
    **对于 `application/x-www-form-urlencoded` (POST) 这种数据方式，空格需要被替换成 '+'，所以通常使用 `encodeURIComponent` 的时候还会把 "%20" 替换为 "+"。[参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)**

- decodeURIComponent    
    用于解码由`encodeURIComponent`或者其它类似方法编码的部分统一资源标识符（URI）。

![](https://img.yancongwen.cn/18-10-20/22263377.jpg)

