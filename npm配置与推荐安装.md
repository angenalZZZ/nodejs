 # npm 配置

~~~
  [git全局用户]
  git config --global user.name "yangzhou"
  git config --global user.email "angenal@hotmail.com"

  [nodejs系统变量 NODE_PATH] = D:\Program\nodejs\node_global\node_modules
  [nodejs用户变量 Path] += D:\Program\nodejs\node_global
  npm set init-author-name yangzhou
  npm set init-author-email angenal@hotmail.com
  npm set init-license MIT
  npm config set cache "D:\Program\nodejs\node_cache"      [全局缓存下载目录]
  npm config set prefix "D:\Program\nodejs\node_global"    [全局模块安装目录]
  npm config set proxy http://localhost:23547              [不建议]
  npm config set https-proxy http://localhost:23547        [不建议]
  npm config set registry https://registry.npm.taobao.org  [不建议] [默认值https://registry.npmjs.org/]
  yarn config set registry https://registry.npm.taobao.org [不建议]
~~~

 # npm 升级 & 加速器

~~~
 npm info [package-name]
 npm config ls -l                                         [检查代理等配置]
 npm i npm@latest -g                                      [建议]
 npm i --proxy=http://localhost:23547                     [建议] [不建议 npm config set proxy]
 npm i --registry=https://registry.npm.taobao.org         [建议] [不建议 npm config set registry]
 # install cnpm
 npm i -g cnpm --registry=https://registry.npm.taobao.org [代理taobao]
 npm i -g nrm	                                          [代理切换]
 # install yarn from https://yarn.bootcss.com/docs/install/
 npm i -g yarn > yarn | yarnpkg                           [包管理器]
 npm i -g node-gyp                                        [结合VS编译]
 cnpm i -g node-sass                                      [sass>css编译]
~~~

 # npm 如何安装 (npm|yarn)

~~~
# Unix风格: -S -单个字母, GNU风格: --save --英文字符，node-cli参考: commander.js,chalk.js,Lnquirer.js,Yargs.
npm init -f                                               [初始化项目package.json]
npm i -S [--save --no-save]                               [添加项目程序依赖包到dependencies]
npm i -D [--save-dev]                                     [添加项目工具依赖包到devDependencies]
~~~

 # npm 全局安装包 npm install -g

~~~
npm i -g webpack webpack-cli webpack-dev-server # 配置例子 https://github.com/teabyii/webpack-examples
npm i -g typescript    >tsc >tsserver # ts-node | io-ts  非tsconfig编译*.ts时，请在Git-Bash中执行 tsc *.ts && node main.js
npm i -g @angular/cli  >ng            # 跨平台构建工具Angular2，ng set --global warnings.packageDeprecation=false
cnpm i -g vue-cli      >vue           # 构建工具Vue2.x
cnpm i -g @vue/cli     >vue           # 构建工具Vue3.x https://cli.vuejs.org
cnpm i -g weex-toolkit >weex          # 跨平台构建工具 https://github.com/apache/incubator-weex https://alibaba.github.io
npm i -g supervisor                   # 监视代码的改动后自动重启 Node.js 服务: supervisor / nodemon / pm2
npm i -g react-native-cli             # 跨平台构建工具RN https://reactnative.cn/docs/getting-started.html
npm i -g serve http-server json-server lite-server
# > lite-server -c configs/lsconfig.js<<<{"port": 8000,"files":["./src/**/*.{html,htm,css,js}"],"server":{"baseDir":"./src"}}
npm i -g yo jspm sqlpad @compodoc/compodoc
~~~

 # npm 后端安装包 (npm|yarn) install

~~~
# web 框架
npm i -g express         # express项目构建 https://github.com/expressjs/express  http://www.expressjs.com.cn
npm i -g think-cli       # think基于koa2构建 https://github.com/thinkjs/thinkjs  https://thinkjs.org
npm i -S hapi            # hapi基于express构建 https://github.com/hapijs/hapi    https://hapijs.com
    # Bell 第三方登录插件
    # Good 监控日志相关插件
    # Boom 友好的 HTTP 错误返回插件
    # Joi 面向 Object Schema 的验证器插件
    # h2o2 代理转发插件
    # Catbox 缓存策略插件
    # hapi-auth-cookie 基于 Cookie 的用户认证插件
    # Inert 静态文件资源管理插件 https://github.com/hapijs/inert
    # tv 可交互式的 debug 控制台
    # Vision 网页模板渲染插件
    # Sequelize 数据库访问-ORM  https://github.com/danecando/hapi-sequelize
    # Lab & Code 测试插件
    # ...案例教程 https://github.com/yeshengfei/hapi-tutorial
    # ...GraphQL: http://graphql.cn/learn/ https://github.com/wesharehoodies/graphql-nodejs-hapi-api
    # 1. npm init -y           (初始app)
    # 2. yarn add hapi         (框架hapi > package.json > scripts:{"start":"nodemon app.js"} )
    # 3. yarn add knex mssql   (数据mssql)
    # 4. yarn run start        (启动app)

# orm 数据库访问
npm i -S mongoose  # for Mongodb https://mongoosejs.com/docs/index.html
npm i -S knex | npm i -S pg sqlite3 mysql mysql2 oracle mssql  # https://knexjs.org
npm i redis     # 高性能缓存数据库 Redis
npm i level     # 高性能缓存数据库Google LevelDB https://github.com/Level/level
npm i ssdb-node # SSDB 基于LevelDB https://github.com/reanote/ssdb-node

# algorithm 算法
npm i siphash # 随机性好、输出均匀、性能突出(可用于字典的高效查找)、偏向性小(防hash攻击) https://github.com/jedisct1/siphash-js

# thread 线程
npm i napajs # 多线程运行时 https://github.com/Microsoft/napajs

# utility 实用
npm i rxjs       # 响应式编程的库 https://cn.rx.js.org
npm i chalk      # 命令行输出文字颜色  https://github.com/chalk/chalk
npm i commander  # 命令行神器，能帮助我们简化很多操作  http://blog.fens.me/nodejs-commander
npm i pidusage   # 检查进程(PID) / CPU & 内存的使用 https://github.com/soyuka/pidusage
npm i proxyquire # https://github.com/thlorenz/proxyquire
yarn global add thelounge  # web IRC 客户端(Internet Relay Chat)

~~~


