 # npm 配置

~~~
  [git] git config --global user.name "yangzhou"
        git config --global user.email "angenal@hotmail.com"
        npm set init-author-name yangzhou
        npm set init-author-email angenal@hotmail.com
        npm set init-license MIT        
  [系统变量 NODE_PATH] = D:\Program\nodejs\node_global\node_modules
  [用户变量 Path] += D:\Program\nodejs\node_global
  npm config set cache "D:\Program\nodejs\node_cache"   [写权限]
  npm config set prefix "D:\Program\nodejs\node_global" [写权限]
  npm config set registry https://registry.npm.taobao.org  [不建议]
  yarn config set registry https://registry.npm.taobao.org [不建议]
~~~

 # npm 升级 & 加速器

~~~
 npm info [package-name]
 npm config ls -l                                         [检查代理等配置]
 npm i npm@latest -g                                      [建议]
 npm i --proxy=http://localhost:23547                     [建议]
 npm i --registry=https://registry.npm.taobao.org         [建议]
 # install cnpm
 npm i -g cnpm --registry=https://registry.npm.taobao.org [代理taobao]
 npm i -g nrm	 [代理切换]
 # install yarn from https://yarn.bootcss.com/docs/install/
 npm i -g yarn > yarn | yarnpkg
 npm i -g node-gyp [结合VS编译]
~~~

 # npm 如何安装 (npm|yarn) install

~~~
npm init -f     [初始化项目package.json]
npm i -S [package name] [添加项目程序依赖包到dependencies]
npm i -D [package name] [添加项目工具依赖包到devDependencies]
~~~

 # npm 全局安装包 npm i -g
 
~~~
npm i -g webpack webpack-cli webpack-dev-server | cnpm i -g node-sass [sass>css编译]
npm i -g typescript    >tsc >tsserver /* 非tsconfig编译*.ts时，请在Git-Bash中执行 tsc *.ts && node main.js */
npm i -g @angular/cli  >ng           /*  ng set --global warnings.packageDeprecation=false */
npm i -g @compodoc/compodoc
npm i -g serve http-server json-server
npm i -g jspm sqlpad
grunt-cli    > grunt
uglify-js    > uglifyjs
vue-cli      > vue
weex-toolkit > weex
think-cli    > https://github.com/thinkjs/thinkjs/  https://thinkjs.org/
lite-server  > lite-server -c configs/lsconfig.js<<<{"port": 8000,"files":["./src/**/*.{html,htm,css,js}"],"server":{"baseDir":"./src"}}
~~~

 # npm 后端安装包 (npm|yarn) install

~~~
# typescript | ts-node | io-ts

# web框架-serve
npm i -g express

# 数据库访问
npm i -S knex | npm i -S pg sqlite3 mysql mysql2 oracle mssql  # https://knexjs.org
npm i -S mongoose  # MongoDB https://mongoosejs.com/docs/index.html

~~~


