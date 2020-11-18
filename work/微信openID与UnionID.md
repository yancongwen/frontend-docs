# 微信小程序及公众号中的 OpenID 及 UnionID

## 什么是 OpenID
每个用户针对每个公众号或小程序等应用会产生一个安全的OpenID，公众号或应用可将此ID进行存储，便于用户下次登录时辨识其身份，或将其与用户在第三方应用中的原有账号进行绑定。同一个用户，不同应用中的 OpenID 是不一样的，但是这样就会有一个问题，如果同意运营主体拥有多个小程序应用或公众号，他们是无法根据 OpenID 识别同一用户的，于是就有了 UnionID。

## 什么是 UnionID
如果开发者拥有多个移动应用、网站应用、和公众帐号（包括小程序），可通过 UnionID 来区分用户的唯一性，因为只要是同一个微信开放平台帐号下的移动应用、网站应用和公众帐号（包括小程序），用户的 UnionID 是唯一的。换句话说，同一用户，对同一个微信开放平台下的不同应用，UnionID是相同的。

## 小程序中如何获取 OpenID
- 1、小程序调用 wx.login() 获取临时登录凭证code ，并回传到开发者服务器；
- 2、服务端调用 auth.code2Session 接口，换取用户唯一标识 OpenID 和 会话密钥 session_key；





## 参考
- [小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)
- [小程序开发文档 wx.login](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/login/wx.login.html)
- [UnionID 机制说明](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/union-id.html)
