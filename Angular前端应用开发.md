# Angular 前端应用开发

####   [**快速上手**](https://angular.cn/guide/quickstart)

> 第一步：[安装 Angular CLI 跨平台构建工具](https://angular.cn/guide/quickstart#step-1-install-the-angular-cli)

~~~
  npm install -g @angular/cli
  ng set --global warnings.packageDeprecation=false
~~~

> 第二步：[创建工作空间和初始化应用](https://angular.cn/guide/quickstart#step-2-create-a-workspace-and-initial-application)

~~~
  ng new my-app             # 创建一个简单的 "欢迎" 应用
  ng new my-app --routing   # 创建一个配置好 "路由" 的项目
~~~

> 第三步：[启动开发服务器](https://angular.cn/guide/quickstart#step-3-serve-the-application)

~~~
  cd my-app
  ng serve --open  # --open（或只用 -o）选项会自动打开浏览器，访问 http://localhost:4200
~~~

> 第四步：[VSCode打开项目 或 通过 Stackblitz 在线编辑](http://www.stackblitz.com/)

~~~
  cd my-app
  code .  # VSCode打开项目
~~~


####   [**Rx 响应式编程 - 交互式图表**](http://rxmarbles.com)

~~~
  # 创建 CREATION OBSERVABLES
  Observable.from([10,20,30]).delayWhen(x => timer(x))
  Observable.interval(10)
  Observable.of(1)
  Observable.timer(30, 10)
  
  # 条件 CONDITIONAL OPERATORS
  defaultIfEmpty(true)
  every(x => x < 10)
  sequenceEqual
  
  # 合并 COMBINATION OPERATORS
  combineLatest((x, y) => "" + x + y)
  concat
  merge
  race
  startWith(1)
  withLatestFrom((x, y) => "" + x + y)
  zip
  
  # 过滤 FILTERING OPERATORS
  debounceTime(10)
  debounce(x => Rx.Observable.timer(10 * x))
  distinct
  distinctUntilChanged
  elementAt(2)
  filter(x => x > 10)
  find(x => x > 10)
  findIndex(x => x > 10)
  first
  ignoreElements
  last
  sample
  skip(2)
  skipUntil
  skipWhile(x => x < 5)
  take(2)
  takeLast(1)
  takeUntil
  takeWhile(x => x < 5)
  throttle(x => Rx.Observable.timer(10 * x))
  throttleTime(25)
  
  # 计算 MATHEMATICAL OPERATORS
  count(x => x > 10)
  max
  min
  reduce((x, y) => x + y)
  
  # 转换 TRANSFORMATION OPERATORS
  buffer
  bufferCount(3, 2)
  bufferTime(30)
  bufferToggle(start$, x => Observable.timer(x))
  bufferWhen
  obs1$.concatMap(() => obs2$, (x, y) => "" + x + y)
  obs1$.concatMapTo(() => obs2$, (x, y) => "" + x + y)
  map(x => 10 * x)
  mapTo("a")
  obs1$.mergeMap(() => obs2$, (x, y) => "" + x + y, 2)
  obs1$.mergeMapTo(() => obs2$, (x, y) => "" + x + y, 2)
  pairwise
  pluck("a")
  repeat(3)
  scan((x, y) => x + y)
  obs1$.switchMap(() => obs2$, (x, y) => "" + x + y)
  obs1$.switchMapTo(() => obs2$, (x, y) => "" + x + y)
  
  # 实用 UTILITY OPERATORS
  delay(20)
  delayWhen(x => Observable.timer(20 * x))
~~~


