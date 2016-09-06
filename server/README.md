# any-mock-server

``any-mock`` 的服务端API项目，主要提供两部分的API：

1. 配置类API - 系统登录注册，项目管理，权限分配，api管理。
2. Mock Api Server - 通过发送模拟到该API，实现API的mock功能。

# How to develop?

项目采用 ``rest-express`` 提供api功能，数据存储使用 ``nedb`` ，采用 ``gulp`` 作为构建工具。

要开始开发，请先fork项目，然后进入 server 目录，执行如下操作：

``` bash
# 安装依赖包
$ npm install

# 启动构建并监视代码变更（自动重启服务）
$ npm run start
# or
$ npm run dev
```