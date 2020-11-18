# 你不知道的 Cookies

## HTTP Headers
### 响应首部 Set-Cookie
### 请求首部 Cookie

### SameSite
从 Chrome 80 开始，后端设置的 Cookie 如果没有设置 SameSite 属性，将会被处理为 SameSite=Lax。

## 参考
- [Chrome Enterprise release notes](https://support.google.com/chrome/a/answer/7679408/)
- [https://www.chromium.org/updates/same-site#20190930](https://www.chromium.org/updates/same-site#20190930)
- [Cookie Legacy SameSite Policies](https://www.chromium.org/administrators/policy-list-3/cookie-legacy-samesite-policies)
- [SameSite cookies explained](https://web.dev/samesite-cookies-explained/)
- [chrome://flags/](chrome://flags/)
- [HTTP cookies (MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
- [当浏览器全面禁用三方 Cookie](https://mp.weixin.qq.com/s/XlhDeYl9wtDhuX89oyuSQw)
