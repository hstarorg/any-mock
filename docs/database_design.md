# 数据库简易设计

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
}
```

## 3、API表（apis）

存储用户配置的API。

```
{
  apiId: string api唯一ID（Hash）
  appId: string 关联App的ID
  userId: string 关联User的ID
  method: string 请求的类型
  desc: string 描述信息
  path: string 请求的路径（支持参数）
  createDate: long 创建时间
  lastUpdateDate: long 最后更新时间
  reqCount: number 请求次数（默认0）
  response: {
    headers: { 响应头

    },
    statusCode: number 响应状态码,
    body: string 相应数据。
  }
}
```