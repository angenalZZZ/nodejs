`[基于 hapi 的 Node.js 后端开发]`

[1. 项目工程初始化](#项目工程初始化) 

[2. 接口契约与入参校验 —— 使用 Swagger & Joi](#接口契约与入参校验——Swagger&Joi) 

[3. 身份验证实现 —— 使用 hapi-auth-jwt2](#身份验证——hapi-auth-jwt2) 

`[实用程序库]`

  [hapi源代码](https://github.com/hapijs/hapi) [hapi官网](https://hapijs.com)

---


# **项目工程初始化**

> Node.js 项目

````javascript
npm init
````

**安装 hapi 模块**

````javascript
npm i hapi@16  # hapi是基于Express构建的服务器端框架 https://github.com/hapijs/hapi  https://hapijs.com
````

介绍 hapi 功能

```
# Lab & Code 测试插件
# Joi 面向 Object Schema 的验证器插件
# Bell 第三方登录插件
# Good 监控日志相关插件
# Boom 友好的 HTTP 错误返回插件
# h2o2 代理转发插件
# Catbox 缓存策略插件
# hapi-auth-cookie 基于 Cookie 的用户认证插件
# Inert 静态文件资源管理插件 https://github.com/hapijs/inert
# tv 可交互式的 debug 控制台
# Vision 网页模板渲染插件
# Sequelize 数据库访问-ORM  https://github.com/danecando/hapi-sequelize
# and so on ... 案例教程 https://github.com/yeshengfei/hapi-tutorial
```

数据库访问-ORM

```
npm i -S mongoose  # MongoDB https://mongoosejs.com/docs/index.html
npm i -S knex | npm i -S pg sqlite3 mysql mysql2 oracle mssql  # https://knexjs.org
```



# **接口契约与入参校验——Swagger&Joi**

> 使用 Swagger

```javascript
# 安装适配 hapi v16 的 swagger 插件
npm i hapi-swagger@7
npm i inert@4
npm i vision@4
npm i package

# 数据库操作
npm i sequelize-cli -D
npm i sequelize
npm i mysql2
npm i hapi-pagination@1
```

通过 sequelize-cli 初始化 sequelize

```
node_modules/.bin/sequelize init #  windows-cmd: node_modules\.bin\sequelize init

├── config                       # 项目配置目录
|   ├── config.json              # 数据库连接的配置
├── models                       # 数据库 model
|   ├── index.js                 # 数据库连接的样板代码
├── migrations                   # 数据迁移的目录
├── seeders                      # 数据填充的目录...
```

配置了 config/config.json 中的数据库连接，来完成数据库的创建 code first

```
node_modules/.bin/sequelize db:create

# 通过 --env 参数，指定为生产环境创建项目数据库
# node_modules/.bin/sequelize db:create --env production
```

## migrate 数据迁移

```
# 创建 migrations 目录下的迁移
node_modules\.bin\sequelize migration:create --name create-shops-table
node_modules\.bin\sequelize migration:create --name create-goods-table
# 将 migrations 目录下的迁移 按时间戳的顺序，逐个执行，最终完成数据库表结构的自动化创建
node_modules\.bin\sequelize db:migrate
# 帮助我们按照 down 方法中所定义的规则，回退一个数据库表结构迁移的状态，--to 选项恢复到特定的迁移
node_modules/.bin/sequelize db:migrate:undo
node_modules/.bin/sequelize db:migrate:undo:all --to xxxxxxxxx-create-shops-table.js
# 向表中追加字段
node_modules/.bin/sequelize migration:create --name add-columns-to-shops-table
```

## seeders 种子数据填充

```
# 为shops表 添加基础数据
node_modules\.bin\sequelize seed:create --name init-shops
# 向数据库填充 seeders 目录中所有 up 方法所定义的数据，--seed 制定特定的 seed 配置来做填充
node_modules\.bin\sequelize db:seed:all
node_modules/.bin/sequelize db:seed --seed xxxxxxxxx-init-shopsjs
# 撤销所有的种子，--seed 撤销指定的种子
node_modules/.bin/sequelize db:seed:undo:all
node_modules/.bin/sequelize db:seed:undo --seed XXXXXXXXXXXXXX-demo-user.js
```



****

# **身份验证——hapi-auth-jwt2**

> 用 jsonwebtoken 签发 JWT

```javascript
npm i jsonwebtoken
```

## jwt.sign 签发

JWT 的签发语法是 jwt.sign(payload, secretOrPrivateKey, [options, callback])。默认的签发算法基于 HS256 (HMAC SHA256)，可以在 options 参数的 algorithm 另行修改。JWT 签发规范中的一些标准保留字段比如 exp，nbf，aud，sub，iss 等都没有默认值，可以一并在 payload 参数中按需声明使用，亦可以在第三个参数 options 中，通过 expiresIn，notBefore，audience，subject，issuer 来分别赋值，但是不允许在两处同时声明。

```
const jwt = require('jsonwebtoken');
const token = jwt.sign(
  {
    foo: 'bar',
    exp: Date.now() + 60 * 60 * 1000, // 1 小时后失效
  },
  'your-secret'
);
# 生成 your-secret
node -e "console.log(require('crypto').randomBytes(32).toString('base64'));"
```


通过 [jwt.io](https://link.juejin.im/?target=https%3A%2F%2Fjwt.io) 来 decode JWT 中的 payload 信息

## hapi-auth-jwt2 接口用户验证

```
npm i hapi-auth-jwt2@7
```

