# Mongodb 基本使用

## 配置
新建并编辑文件 `/etc/mongod.conf`：
```bash
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

