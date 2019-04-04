# linux 常用命令记录

#### ssh 登录
```bash
ssh [-p 非标准端口] 账号@IP
```

#### tar

```bash
// 压缩
tar zcvf  [文件名.tar.gz]  [要被压缩的文件或目录名称]
// 解压
tar zxvf [文件名.tar.gz] -C [目标文件夹]
```

#### 文件上传下载
```bash
// 从服务器下载
scp username@serverIp:/path/filename  ~/local_dir（本地目录）
// 示例：将47.100.63.15服务器上root用户中~/upload/weiyi.tar.gz下载至本地~/local_dir目录中
scp root@47.100.63.15:~/upload/weiyi.tar.gz ~/local_dir

// 上传到服务器
scp /path/filename username@serverIp:/path
// 示例：将当前路径下的weiyi.tar.gz 上传至服务器47.100.63.15中root用户中~/upload文件夹
scp weiyi.tar.gz root@47.100.63.15:~/upload
```
