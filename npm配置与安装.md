 # npm 配置

~~~
  [git] git config --global user.name "yangzhou"
        git config --global user.email "angenal@hotmail.com"
  [系统变量 NODE_PATH] = D:\Program\nodejs\node_global\node_modules
  [用户变量 Path] += D:\Program\nodejs\node_global
  npm config set cache "D:\Program\nodejs\node_cache"
  npm config set prefix "D:\Program\nodejs\node_global"
~~~

 # npm 升级 & 加速器

~~~
 npm config ls -l                                         [检查代理等配置]
 npm i npm@latest -g			                             [建议]
 npm i --proxy=http://localhost:23547		                [建议]
 npm i --registry=https://registry.npm.taobao.org 	      [建议]
 npm config set registry https://registry.npm.taobao.org  [不建议]
 yarn config set registry https://registry.npm.taobao.org [不建议]
~~~

 # npm 全局安装包 npm i -g
~~~
npm i -g webpack webpack-cli webpack-dev-server | cnpm install node-sass -g
typescript  >tsc >tsserver /* 非tsconfig编译*.ts时，请在Git-Bash中执行 tsc *.ts && node main.js */
@angular/cli  >ng           /*  ng set --global warnings.packageDeprecation=false */
@compodoc/compodoc >compodoc
yarn         >yarn >yarnpkg
node-gyp [结合VS编译]
nrm	[代理切换]
cnpm	[代理taobao]
express	[web框架]
jspm
serve
sqlpad
json-server
grunt-cli   >grunt
vue-cli      >vue
uglify-js    >uglifyjs
weex-toolkit >weex
lite-server >lite-server -c configs/lsconfig.js<<<{"port": 8000,"files":["./src/**/*.{html,htm,css,js}"],"server":{"baseDir":"./src"}}
~~~
