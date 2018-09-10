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
~~~

 # npm 升级 & 加速器

~~~
 npm info [package-name]
 npm config ls -l                                         [检查代理等配置]
 npm i npm@latest -g                                      [建议]
 npm i --proxy=http://localhost:23547                     [建议]
 npm i --registry=https://registry.npm.taobao.org         [建议]
 # install cnpm
 npm install -g cnpm --registry=https://registry.npm.taobao.org
 npm config set registry https://registry.npm.taobao.org  [不建议]
 # install yarn from https://yarn.bootcss.com/docs/install/
 yarn config set registry https://registry.npm.taobao.org [不建议]
~~~

 # npm 全局安装包 npm i -g
~~~
npm i -g webpack webpack-cli webpack-dev-server | cnpm install node-sass -g
typescript  >tsc >tsserver /* 非tsconfig编译*.ts时，请在Git-Bash中执行 tsc *.ts && node main.js */
@angular/cli  >ng           /*  ng set --global warnings.packageDeprecation=false */
@compodoc/compodoc >compodoc
nrm	 [代理切换]
cnpm	[代理taobao]
cnpm install node-sass@4.7.2 [sass>css编译]
node-gyp [结合VS编译]
express	[web框架]
jspm
serve
sqlpad
http-server
json-server
yarn         >yarn >yarnpkg
think-cli    > https://github.com/thinkjs/thinkjs/  https://thinkjs.org/
grunt-cli    >grunt
vue-cli      >vue
uglify-js    >uglifyjs
weex-toolkit >weex
lite-server >lite-server -c configs/lsconfig.js<<<{"port": 8000,"files":["./src/**/*.{html,htm,css,js}"],"server":{"baseDir":"./src"}}
~~~

 # npm 一般安装包 (npm|yarn) install

~~~
npm init -f     [初始化项目package.json]
npm i -S [name] [添加项目程序依赖包到dependencies]
npm i -D [name] [添加项目工具依赖包到devDependencies]
~~~

