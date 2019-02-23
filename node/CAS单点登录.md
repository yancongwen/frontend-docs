# node 项目集成 CAS 单点登录
> 最近接到一个新的需求，将现有的 node + vue 前后端分离的项目和公司已有的 CAS 单点登录系统对接，即需要删除项目中已有的登录认证机制，和 CAS 集成。

## 一、 什么是单点登录（SSO）
假设用户X需同时登录站点A和站点B，这两个站点之间其实是有关联性的，但是如果用户认证数据不通用，那将需要注册或登录两次。
单点登录系统（Single Sign On，简称 SSO）就是为了解决这种场景的问题，建立一种用户认证中心，只要经过这个中心注册或登录了某一站点服务的用户，总是能够认证登录这个中心所授权的其他所有服务。

- 登录    
    相比于单系统登录，SSO 需要一个独立的认证中心，只有认证中心能接受用户的用户名密码等安全信息，其他系统不提供登录入口，只接受认证中心的间接授权。间接授权通过令牌实现，sso认证中心验证用户的用户名密码没问题，创建授权令牌，在接下来的跳转过程中，授权令牌作为参数发送给各个子系统，子系统拿到令牌，即得到了授权，可以借此创建局部会话，局部会话登录方式与单系统的登录方式相同。

- 注销    
    在一个子系统中注销，所有子系统的会话都将被销毁。

## 二、 什么是 CAS
CAS (Central Authentication Service) 是耶鲁 Yale 大学发起的一个java开源项目，旨在为 Web应用系统提供一种可靠的单点登录解决方案（ Web SSO ），[github地址](https://github.com/apereo/cas)。CAS作为一种单点登录框架，后端可配置不同的用户数据库，支持自定义验证或加密逻辑，并提供不同的协议用于与业务server(cas-client)间的通信。CAS的源码是由java写的，因此对于java的web项目天生友好。当然只要实现CAS相关协议的client，无论是哪种语言实现的，都能集成到CAS认证框架中。CAS的部署请参考[这里](https://blog.csdn.net/zzq900503/article/details/54693267)     
从结构上看， CAS 包含两个部分： CAS Server 和 CAS Client 。
- CAS Server    
    CAS Server 需要独立部署，主要负责对用户的认证工作， 它会处理用户名 / 密码等凭证 (Credentials)
- CAS Client    
    CAS Client 部署在客户端， 负责处理 对本地 Web 应用（客户端）受保护资源的访问请求，并且当需要对请求方进行身份认证时，重定向到 CAS Server 进行认证 。CAS Client 负责部署在客户端（Web 应用），原则上， CAS Client 的部署意味着，当有对本地 Web 应用的受保护资源的访问请求，并且需要对请求方进行身份认证， Web 应用不再接受任何的用户名密码等类似的 Credentials ，而是重定向到 CAS Server 进行认证。     
    通常单点登陆都会涉及到对已有系统的改造。所以，client端的侵入性就变的很重要。侵入性越小，越容易部署和测试。CAS框架的优点之一就在于它的client端对应用系统的侵入性比较小。对于Java的Web项目来说，你只需要在web.xml里面添加一个filter，拷贝CAS client的jar包到应用系统，然后改造登陆认证过程即可。


## 三、 node 项目集成 CAS
首先介绍一下项目架构，项目前端采用 Vue 开发，服务端采用 node + express 开发。项目最终上线部署时，前端打包后放在服务端的 `/public` 目录下，即采用 express 静态服务功能。        
开始我还是固有的思维，考虑在前端实现单点登录的集承，用户登录不都是在前端做的吗，调用服务端接口，CAS 也提供了一些列的 Restful Api，然而当我去实现的时候却相当麻烦，还会有跨域的问题。然后想到了可否直接在服务端控制访问权限？于是网上搜索一番，终于找到了 [connect-cas2](https://github.com/TencentWSRD/connect-cas2) node 中间件，其实它就是 CAS Client 的 node 实现，正好符合我的项目场景。connect-cas2 的使用也比较简单，具体请看官方文档，直接抄文档示例就可以了。以下是主要代码：
```js
var express = require('express');
var ConnectCas = require('connect-cas2');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var MemoryStore = require('session-memory-store')(session);

var app = express();

app.use(cookieParser());
app.use(session({
    name: 'NSESSIONID',
    secret: 'Hello I am a long long long secret',
    resave: true,
    saveUninitialized: true,
    store: new MemoryStore()
}));

var casClient = new ConnectCas({
  debug: true,
    ignore: [
      /\/ignore/
    ],
    match: [],
    servicePrefix: 'http://localhost:3000',
    serverPath: 'http://your-cas-server.com',
    paths: {
        validate: 'cas/validate',
        serviceValidate: 'cas/serviceValidate',
        login: 'cas/login',
        logout: 'cas/logout',
        proxy: '',
        proxyCallback: ''
    }
});

app.use(casClient.core());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/logout', casClient.logout());

app.get('/', function (req, res) {
    if (!req.session.cas.user) {
        return next();
    }
    const username = req.session.cas.user;
    return res.send('<p>You are logged in. Your username is ' + username + '. <a href="/logout">Log Out</a></p>');
});

app.get('/api', function (req, res) {
  return res.send('hi');
});

app.listen(3000);
```

## 参考
- [单点登录原理与简单实现](https://mp.weixin.qq.com/s?__biz=MzU5NTAzNjM0Mw==&mid=2247485480&idx=2&sn=5690b9f36f332bf4e350190ee8bd145f&chksm=fe7959f0c90ed0e600f597c4224a4a9e6c853a193c394e126bad53c80de95be40fd6117194bf&scene=21)
- [基于CAS单点登录的前后端分离架构说明](https://www.imooc.com/article/48995)
- [单点登录终极方案之 CAS 应用及原理](https://blog.csdn.net/xiamiflying/article/details/82794422)
- [单点登录(一)-单点登录SSO的介绍和CAS+选型](https://blog.csdn.net/zzq900503/article/details/54646828)
- [connect-cas2 文档](https://github.com/TencentWSRD/connect-cas2/blob/master/README.zh.md)
- [基于node.js的sso(单点登录-客户端校验)](https://www.jianshu.com/p/097f60be55f0)
