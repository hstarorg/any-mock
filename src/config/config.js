'use strict';

var path = require('path');

module.exports = {
  isDebug: true,
  port: 7410, //服务监听的端口
  dbFolderPath: path.join(__dirname, './../../src/database/') //数据文件存放地址
};