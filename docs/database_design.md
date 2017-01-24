# 数据库简易设计

## 0、用户信息表

| 列名 | 类型 | 备注 |
| --- | --- | --- |
| id | shortid | User ID |
| username | string | User Name |
| password | string | 密码 |
| createDate | number | 创建时间 |

## 1、项目信息表

| 列名 | 类型 | 备注 |
| --- | --- | --- |
| id | shortid | 项目ID |
| name | string | 项目名称 |
| description | string | 项目明细 |
| createDate | number | 创建时间，Date.now() |
| createBy | shortid | 创建人 |
| groups | Array<{groupId: shortid, name: string}> | API分组 |
| users | Array<{userId: shortid, role: string, username: string}> | 项目的人员列表 |
| apiCount | number | 项目下所有的API数量，新增/删除API，删除Group的时候进行sync |


## 2、API信息表

| 列名 | 类型 | 备注 |
| --- | --- | --- |
| id | shortid | API ID |
| projectId | shortid | 所在的项目ID |
| groupId | shortid | 分组ID |
| name | string | API名称 |
| path | string | API PATH |
| method | string | API 请求方法 |
| res | {<br>headers: Array<{key: string, value: string>,<br>status: number, <br>contentType: string, <br>body: any<br>}  | 响应对象 |
| filters | {condition: any, res} | 满足条件时，返回指定res |
| createDate | number | 创建时间，Date.now() |
| createBy | shortid | 创建人 |
| createByName | string | 创建人用户名 |
| lastUpdateDate | number | 最后更新时间 |
| lastUpdateBy | id: shortid | 最后更新人 |
| lastUpdateByName | string | 最后更新人用户名 |
| isEnable | boolean | 是否可用 |
| enableProxy | boolean | 是否启用二次代理 |
| proxyUrl | string | 二次代理URL |
