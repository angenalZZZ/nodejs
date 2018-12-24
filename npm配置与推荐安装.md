 # npm 配置

~~~
  [git] git config --global user.name "yangzhou"
        git config --global user.email "angenal@hotmail.com"
        
  [系统变量 NODE_PATH] = D:\Program\nodejs\node_global\node_modules
  [用户变量 Path] += D:\Program\nodejs\node_global
  npm set init-author-name yangzhou
  npm set init-author-email angenal@hotmail.com
  npm set init-license MIT
  npm config set cache "D:\Program\nodejs\node_cache"      [全局缓存下载目录]
  npm config set prefix "D:\Program\nodejs\node_global"    [全局模块安装目录]
  npm config set proxy http://localhost:23547              [不建议]
  npm config set https-proxy http://localhost:23547        [不建议]
  npm config set registry https://registry.npm.taobao.org  [不建议]
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
 # Unix参数风格: -S -单个字母, GNU风格: --save --英文字符，node-cli参考: commander.js,chalk.js,Lnquirer.js,Yargs...
npm init -f                                               [初始化项目package.json]
npm i -S [--save --no-save]                               [添加项目程序依赖包到dependencies]
npm i -D [--save-dev]                                     [添加项目工具依赖包到devDependencies]
~~~

 # npm 全局安装包 npm install -g
 
~~~
npm i -g webpack webpack-cli webpack-dev-server # 配置例子 https://github.com/teabyii/webpack-examples
npm i -g typescript    >tsc >tsserver # ts-node | io-ts    非tsconfig编译*.ts时，请在Git-Bash中执行 tsc *.ts && node main.js
npm i -g vue-cli       >vue           # 构建工具Vue
npm i -g @angular/cli  >ng            # 跨平台构建工具Angular2，ng set --global warnings.packageDeprecation=false
npm i -g weex-toolkit  >weex          # 跨平台构建工具weex https://github.com/apache/incubator-weex https://alibaba.github.io
npm i -g supervisor                   # 监视代码的改动后自动重启 Node.js 服务: supervisor / nodemon / pm2
npm i -g react-native-cli             # 跨平台构建工具RN https://reactnative.cn/docs/getting-started.html
npm i -g serve http-server json-server lite-server
 # > lite-server -c configs/lsconfig.js<<<{"port": 8000,"files":["./src/**/*.{html,htm,css,js}"],"server":{"baseDir":"./src"}}
npm i -g yo jspm sqlpad @compodoc/compodoc # 其他工具
~~~

 # npm 后端安装包 (npm|yarn) install

~~~
# web框架-serve
npm i -g yo generator-k  # Koa项目构建 https://github.com/minghe/generator-k
npm i -g think-cli       # think基于Koa2构建 https://github.com/thinkjs/thinkjs  https://thinkjs.org
npm i -g express         # Express项目构建 https://github.com/expressjs/express  http://www.expressjs.com.cn/resources/frameworks.html
npm i -S hapi            # hapi基于Express构建 https://github.com/hapijs/hapi  https://hapijs.com
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

# 数据库访问-ORM
npm i -S mongoose  # MongoDB https://mongoosejs.com/docs/index.html
npm i -S knex | npm i -S pg sqlite3 mysql mysql2 oracle mssql  # https://knexjs.org

# web IRC客户端(Internet Relay Chat)
yarn global add thelounge

# hash算法
npm i siphash      # 随机性好、输出均匀-性能突出（用于字典的高效查找）、偏向性小（防hash攻击） https://github.com/jedisct1/siphash-js

~~~


