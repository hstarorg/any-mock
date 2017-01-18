# 数据库简易设计

## 0、用户信息表

| 列名 | 类型 | 备注 |
| --- | --- | --- |
| id | shortid | User ID |
| username | string | User Name |

## 1、项目信息表

| 列名 | 类型 | 备注 |
| --- | --- | --- |
| id | shortid | 项目ID |
| name | string | 项目名称 |
| description | string | 项目明细 |
| createDate | number | 创建时间，Date.now() |
| createBy | shortid | 创建人 |
| groups | Array<{groupId: shortid, name: string}> | API分组 |
| users | Array<{userId: shortid, role: string}> | 项目的人员列表 |


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
| lastUpdateDate | number | 最后更新时间 |
| lastUpdateBy | shortid | 最后更新人 |
| isEnable | boolean | 是否可用 |
| enableProxy | boolean | 是否启用二次代理 |
| proxyUrl | string | 二次代理URL |

**以下为初版设计，暂时先不关注**
---
---

**注：虽然是用的Nosql，但是数据表设计是用的关系型表的设计。**

**注2：如果要按照Nosql的方式来做的话，应该在用户表中加一个数组类型的apps属性，然后把项目存储在其中。**

## 1、用户信息表（users）

用于存储用户基本信息。后期可能增加扩展信息

```json
{
  userId: string 用户唯一ID（Hash字符串）
  username: string 用户名
  password: string 密码（加密后）
  createDate: long 注册时间
  accessToken: string 用户登录token
  expiredTime: long 过期时间
}
```

## 2、用户项目表（apps）

用于存储用户名下的项目信息。当前版本并未考虑逻辑删除等逻辑。

**注：理论上API应该作为项目表的属性，但此处先基于关系型表的设计。**。

```json
{
  appId: string APP唯一ID（Hash字符串）
  userId: string 关联用户（外键-用户信息表中的userId）
  appName: 项目名称
  appDesc: 项目描述信息
  createDate: long 创建时间
  authorizedUser: string  授权用户列表
  // authorizedUser: {
  //   userId: string,
  //   permission: number // 类似于Linux的权限代码，一共二个权限，继承到API（管理， 查看），如果都有，则11。
  // }
}
```

## 3、API表（apis）

存储用户配置的API。

```
{
  apiId: string api唯一ID（Hash）
  appId: string 关联App的ID
  userId: string 关联User的ID
  apiName: string API名称
  apiPath: string 请求的路径（支持参数）
  apiMethod: string 请求的类型
  responseHeaders: object 响应Headers
  responseStatus: int 响应状态码
  responseContentType: string 响应Content-Type
  responseData: any 响应数据
  createDate: long 创建时间
  isEnable: boolean 是否启用
}
```
