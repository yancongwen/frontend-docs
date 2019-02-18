# git commit 信息规范化

## 1、前言
&emsp;&emsp;Git 每次提交代码，都要写 Commit message（提交说明），否则就不允许提交。
```
$ git commit -m "hello world"
```
&emsp;&emsp;上面代码的`-m`参数，就是用来指定 `commit mesage` 的。如果一行不够，可以只执行`git commit`，就会跳出文本编辑器，让你写多行。   
&emsp;&emsp;git 并没有规定你提交信息的内容和格式，但是，一个好的项目，一定要有一个自己的统一的提交格式，以便于后期回顾代码。目前，社区有多种 Commit message 的[写法规范](https://github.com/ajoslin/conventional-changelog/blob/master/conventions)。本文介绍[Angular 规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#heading=h.greljkmo14y0)，这是目前使用最广的写法，比较合理和系统化，并且有配套的工具。

## 2、规范
&emsp;&emsp;每次提交，Commit message 都包括三个部分：Header（必需），Body（可选） 和 Footer（可选）。
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
- Header 部分只有一行，包括三个字段：
    - `type（必需）` 用于说明 commit 的类别，只允许使用下面7个标识。
        + feat：新功能（feature）
        + fix：修补bug
        + docs：文档（documentation）
        + style： 格式（不影响代码运行的变动）
        + refactor：重构（即不是新增功能，也不是修改bug的代码变动）
        + test：增加测试
        + chore：构建过程或辅助工具的变动    
    - `scope（可选）`用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。    
    - `subject（必需）`是 commit 目的的简短描述，不超过50个字符。

- Body 部分是对本次 commit 的详细描述
- Footer 部分只用于两种情况（详细请看阮一峰博客）
    - 不兼容变动
    - 关闭 Issue 

## 3、设置 git commit 模板
&emsp;&emsp;如果你只是个人的项目, 或者想尝试一下这样的规范格式, 那么你可以为 git 设置 commit template, 每次 git commit 的时候在 vim 中带出, 以时刻提醒自己提交规范。 
修改 ~/.gitconfig, 添加:
```
[commit]
template = ~/.gitmessage
```
&emsp;&emsp;新建 ~/.gitmessage 内容可以如下:
```
# head: (): 
# - type: feat, fix, docs, style, refactor, test, chore
# - scope: can be empty (eg. if the change is a global or difficult to assign to a single component)
# - subject: start with verb (such as 'change'), 50-character line
#
# body: 72-character wrapped. This should answer:
# * Why was this change necessary?
# * How does it address the problem?
# * Are there any side effects?
#
# footer: 
# - Include a link to the ticket, if any.
# - BREAKING CHANGE
#
```
&emsp;&emsp;按照以上方式设置以后，每次执行 `git commit` 命令提交时进入 vim 编辑器，就会出现提交规范提示信息。

## 4、工具：Commitizen
&emsp;&emsp;`Commitizen` 是一个帮助我们撰写合格 Commit message 的工具。它提供一个交互式的命令行工具 `commitizen/cz-cli` 帮助我们生成符合规范的 commit message。除此之外, 我们还需要为 commitizen 指定一个 Adapter 比如: `cz-conventional-changelog` (一个符合 Angular团队规范的 preset). 使得 commitizen 按照我们指定的规范帮助我们生成 commit message.

### 4.1 全局安装和使用
- 全局安装
```
npm install -g commitizen cz-conventional-changelog
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc
```
全局模式下, 需要 ~/.czrc 配置文件, 为 commitizen 指定 Adapter 

- 使用    
&emsp;&emsp;如果全局安装过 commitizen, 那么在对应的项目中执行 `git cz` 或者 `npm run commit` 来替代 `git commit` 就可以了。执行命令后会进入一个交互式的命令环境，按照提示填写内容就可以了。如图：
![](https://img.yancongwen.cn/18-10-9/88873392.jpg)
> 提示：如果你是在Windows中使用 Git Bash 执行命令，交互提示符并不工作。你必须通过 `winpty git cz` 启动这个命令；也可以通过修改 `.bashrc` 文件，添加别名：`alias git='winpty git'`

### 4.2 项目级安装和使用
```
npm install -D commitizen cz-conventional-changelog
```
package.json中配置:
```
"script":{
    "commit":"git-cz"
},
"config":{
    "commitizen":{
        "path":"node_modules/cz-conventional-changelog"
    }
}
```

### 4.3 自定义 Adapter
也许 Angular 的那套规范我们不习惯, 那么可以通过指定 Adapter cz-customizable 指定一套符合自己团队的规范。我本人采用的就是使用最广泛的 Angular 规范，关于自定义规范，这里不再重复描述，具体请看[这里](http://chuansong.me/n/2233522251134)。

## 参考
- [阮一峰：Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)
- [优雅的提交你的 Git Commit Message](http://chuansong.me/n/2233522251134)
- [https://github.com/commitizen/cz-cli](https://github.com/commitizen/cz-cli)
- [git commit 规范指南](https://segmentfault.com/a/1190000009048911)
- [详解使用git commit 工作流的标准姿势](https://www.imooc.com/article/43615)