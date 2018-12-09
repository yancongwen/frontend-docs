# git 相关

## 基本概念
- 工作区（Working Directory）  
    就是你在电脑里能看到的目录
- 版本库（Repository）  
    工作区有一个隐藏目录.git就是版本库。
- 暂存区  
    Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。
- 远程库  
    指github或码云等git服务器上的版本库。

## 常用命令
- git init：初始化一个Git仓库
- git add：把文件修改添加到暂存区，可反复多次使用，添加多个文件
    - git add -A   // 添加所有改动
    - git add *    //加新建文件和修改，但是不包括删除
    - git add .    //加新建文件和修改，但是不包括删除
    - git add -u   //加修改和删除，但是不包括新建文件
- git commit：提交更改，把暂存区的所有内容提交到当前分支
- git status：查看仓库当前的状态
- git diff：查看改变
- git log：查看提交历史
- git reflog：查看命令历史
    - --pretty=oneline 一行显示 
- git reset：回退到指定版本。HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id
- git clone :克隆远程库
```bash
// SSH加密
git clone git@github.com:yancongwen/仓库名.git
// HTTPS加密，采用此协议的话以后每次推送都要登陆，比较繁琐
git clone https://github.com/yancongwen/仓库名.git
克隆分支: 
git clone -b <branch name> [remote repository address].git
或者：
git clone <respository-name>,先克隆库
git checkout <branchname>,检出分支
git pull 取回远程主机某个分支的更新，再与本地的指定分支合并
```
- git pull: 取回远程主机某个分支的更新，再与本地的指定分支合并
```
$ git pull --rebase <远程主机名> <远程分支名>:<本地分支名>
例：
$ git pull origin next:master 
取回origin主机的next分支，与本地的master分支合并
```
- git push：将本地分支的更新，推送到远程主机
```
$ git push <远程主机名> <本地分支名>:<远程分支名>
```

## 行尾结束符
Windows平台下使用git add或diff命令时出现以下提示：
```bash
warning: LF will be replaced by CRLF in config/index.js.
The file will have its original line endings in your working directory.
//在工作区里，这个文件会保持它原本的换行符
```
- 由于历史的原因，各种不同的操作系统在处理行尾结束符采取了不同的处理方法
    - CRLF -> Windows-style。回车换行，表示句尾使用回车换行两个字符(即我们常在Windows编程时使用"\r\n"换行)。
    - LF -> Unix Style。 只使用换行。
    - CR -> Mac Style。 只使用回车。CR是MAC老版本的做法，但是后来的MAC系统统一换成LF了。
- 在 Windows 的 git 中，默认会设置 core.autocrlf = true。设置方法为 `git config --global core.autocrlf true`
    + core.autocrlf = true：提交时转换为LF，检出时转换为CRLF；
    + core.autocrlf = input：提交时转换为LF，检出时不转换；
    + core.autocrlf = false：提交检出均不转换；
    + core.autocrlf = true：拒绝提交包含混合换行符的文件；
    + core.autocrlf = false：允许提交包含混合换行符的文件；
    + core.autocrlf = warn：提交包含混合换行符的文件时给出警告；