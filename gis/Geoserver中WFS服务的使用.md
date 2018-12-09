# Geoserver 中 WFS 服务的使用

## 解决跨域问题
- 为了保证数据安全，geoserver 本身发布的矢量要素服务(wfs)不允许跨域访问。
- 解决跨域的方式有很多，主要分为三大类：服务端解决、前端解决、代理转发。

### 1、服务端解决：修改GeoServer某些配置来解决跨域。
- 1、下载跨域jar包[jetty-servlets.jar](http://central.maven.org/maven2/org/eclipse/jetty/jetty-servlets/)\
下载geoserver使用的对应jetty版本,并将jar包放到 `<Geoserver>\webapps\geoserver\WEB-INF\lib`文件夹下。
- 2、设置跨域配置。\
打开`<Geoserver>\webapps\geoserver\web.xml`文件，找到文件中<filter>平级的位置，添加如下内容。
```
<filter>    
 <filter-name>cross-origin</filter-name>    
 <filter-class>org.eclipse.jetty.servlets.CrossOriginFilter</filter-class>    
 <init-param>    
     <param-name>allowedOrigins</param-name>    
     <param-value>*</param-value>    
 </init-param>    
 <init-param>    
     <param-name>allowedMethods</param-name>    
     <param-value>GET,POST</param-value>    
 </init-param>    
 <init-param>    
     <param-name>allowedHeaders</param-name>    
     <param-value>x-requested-with,content-type</param-value>    
 </init-param>    
</filter>  
```
找到文件中<filter-mapping>平级的位置，添加如下内容：
```
<filter-mapping>    
 <filter-name>cross-origin</filter-name>    
 <url-pattern>/*</url-pattern>    
</filter-mapping>  
```
- 3、重启GeoServer服务

参考链接：  
[1] http://blog.csdn.net/mengdong_zy/article/details/51784781

### 2、前端：Jsonp跨域
参考：[跨域及常见解决方案](webdev_summary/跨域及常见解决方案)
### 3、使用代理服务器
参考：[跨域及常见解决方案](webdev_summary/跨域及常见解决方案)
### 4、chorm 浏览器插件
参考：[跨域及常见解决方案](webdev_summary/跨域及常见解决方案)

## WFS 矢量查询
待更...

## 几个名词
- gwc: GeoWebCache 缓存
- ows: OGC Web Service
