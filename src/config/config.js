'use strict';

var path = require('path');

module.exports = {
  port: 7410, //服务监听的端口
  dbFolderPath: path.join(__dirname, '/database/') //数据文件存放地址
};