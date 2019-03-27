# Mongodb 基本使用

## 安装
MongoDB 提供了 linux 各发行版本 64 位的安装包，你可以在官网下载安装包。下载地址：[https://www.mongodb.com/download-center#community](https://www.mongodb.com/download-center#community)。下载完安装包，并解压 tgz（以下演示的是 64 位 Linux上的安装）。
```sh
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz    # 下载
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz                                   # 解压
mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb                         # 将解压包拷贝到指定目录
```
MongoDB 的可执行文件位于 bin 目录下，所以可以将其添加到 PATH 路径中：
```sh
export PATH=<mongodb-install-directory>/bin:$PATH
```
`<mongodb-install-directory>` 为你 MongoDB 的安装路径。如本文的 `/usr/local/mongodb` 。
## 配置
新建并编辑文件 `/etc/mongod.conf`：
```sh
# Where and how to store data.
storage:
  dbPath: /data/db
  journal:
    enabled: true

# where to write logging data.
systemLog:
  destination: file
  logAppend: true
  path: /data/db/log/mongodb.log

# network interfaces
net:
  port: 27017
  bindIp: 127.0.0.1

# how the process runs
processManagement:
  timeZoneInfo: /usr/share/zoneinfo
  # Enable a daemon mode that runs the mongos or mongod process in the background.
  fork: true
```
参考文档：[配置文档](http://docs.mongodb.org/manual/reference/configuration-options/)

## 启动
- 配置文件启动    
`mongod -f /etc/mongod.conf` 或 `mongod --config /etc/mongod.conf`

- 自定义命令启动   
`mongod --dbpath=/data/db --logpath=/data/logs --fork`

## 停止
- 方式1   
`mongod --shutdown`
- 方式2   
如果不是后台启动的mongodb，直接 `Crtl+C` 关闭
- 方式3   
使用数据库命令关闭：
输入 `mongo` 进入 mongodb 的命令行模式，依次输入`use admin`、 `db.shutdownServer()`命令
- 方式4   
使用操作系统的进程命令或进程管理工具关闭

## MongoDB GUI： Robo 3T

