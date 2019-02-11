
`[程序设计]`

> 分三个阶段：输入`Input`、处理`Process`、输出`Output`，对硬件和软件程序都很适用。算法是一个程序的灵魂，算法的复杂度包括时间复杂度和空间复杂度；好的算法是两者都比较低，但往往很难同时做到。

    时间复杂度不是以秒为单位，算法运行速度是从其增速的角度度量的：即输入越多，算法运行的时间改变的快慢。
        O(1)一次计算[最快]，O(logN)二分查找[对数时间&有序数组]，O(NlogN)快速排序，O(Nlog2N)归并排序，
        O(N)简单查找[线性时间]，O(N2)选择排序，O(N!)著名的旅行商问题。
    空间复杂度是指CPU寄存器、内存、磁盘读写、网络传输等输入和输出占用的空间。

`[编程定律]`

    1. 凡事可能出错，就一定出错。(墨菲定律!!!)
    2. 过早优化是万恶之源。(Knuth定律!!)
    3. 每一个决定都是一次权衡。(North定律!)
    4. 系统设计的架构受限于生产设计，反映出公司组织的沟通架构。(Conway定律!)
    5. 组织成员投入大量精力到琐碎的事情上。(车棚效应!!!)

`[中文输入]`

    1. 空格：中文输入法下按Shift+Space进入全角模式后，输入空格即可。
    2. ￥（）〔〕〈〉＆＃＠ ● ○ ⒈⒉⒊⒋⒌⒍⒎⒏⒐⒑⒒⒓⒔⒕⒖⒗⒘⒙⒚⒛ ＋－×÷ ⊙∝ √×✔✘
    3. 壹贰叁肆伍陆柒捌玖拾 微毫厘分百千万亿兆吉
    
> [awesome 超棒的开源库与应用工具](https://github.com/sindresorhus/awesome)

`[编程基础]`

  [1. JavaScript 基础](#javascript-基础) 
  
  [2. TypeScript 基础](#typescript-基础) 
  
  [3. Node.js 基础](#nodejs-基础)  & [中文Api](http://nodejs.cn/api)

`[实用程序库]`

  [30 seconds of code 代码片段集合](https://github.com/30-seconds/30-seconds-of-code) [中文翻译](http://www.css88.com/30-seconds-of-code/)
  
  [Licia 实用代码片段](https://github.com/liriliri/licia) 
  
  [Lodash 中文文档](http://www.css88.com/doc/lodash) 
  
  [Underscore 中文文档](http://www.css88.com/doc/underscore) 
  
  [Ramda 函数式编程](https://github.com/ramda/ramda) [js函数式编程术语大全](http://www.css88.com/archives/7833)
  
  [Mathjs 数学扩展库](https://github.com/josdejong/mathjs) 
  
  [Moment 日期时间操作库](https://github.com/moment/moment) [date-fns日期时间函数库](https://github.com/date-fns/date-fns) 
  
  [Sugar 对象库](https://github.com/andrewplummer/Sugar) 
  
  [Lazy 懒加载Like-Underscore](https://github.com/dtao/lazy.js) 
  
  [CollectJS 数组对象](https://github.com/ecrmnn/collect.js) 
  
  [ChanceJS 随机字符串-数字](https://github.com/chancejs/chancejs) 
  
  [ChartJS 数据可视化<canvas>](https://github.com/chartjs/Chart.js) 
    
  [Polished 样式工具集](https://github.com/styled-components/polished) 
  
  [mojs 动画-图形库](https://github.com/legomushroom/mojs) 
  
  [Voca 字符串操作库](https://github.com/panzerdp/voca) 

---


# **JavaScript 基础**

    javascript 运行有两个阶段：解析、执行。

> 原始类型: Undefined、Null、Boolean、Number、String、Symbol `es6`

1.**原始类型**又被称为**基本类型**，原始类型保存的变量和值直接保存在**栈内存**(Stack)中,且空间相互独立,通过值来访问.

2.`Number`是基于“二进制浮点数”实现,使用“双精度”格式,不能用于===比较；特殊的(NaN!==NaN)只能使用isNaN()判断。

3.`for...in`枚举对象中的属性,在ES5中引入了一个新的方法`Object.keys()`,不同之处在于,它可以将结果以数组的形式返回.

4.**类型转换**虽然很方便，但有时也跟我们预期相去甚远，如：{}+[]返回0.
![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/15517231.png)

5.**基本类型**是按值传递的，**引用类型**在传递过程中,<br>　　对象`a`先产生了一个`副本a`,这个`副本a`并不是深克隆得到的`副本a`,`副本a`地址同样指向对象`a`指向的堆内存.

> 引用类型: Object、Array、Date、Function

1.引用类型是保存在**堆内存**(Heap)中,而**栈内存**(Stack)中会有一个**堆内存地址**(Pointer),地址变量指向堆内存中`Object`真正的值.

2.数组`Array`不仅可以通过数字索引,也可以通过字符串索引,但值得注意的是,字符串索引的键值对并不算在数组的长度里.

3.在ES6中可用`Object.assign(target,...sources)` 或者Object spread`...` 对引用类型进行浅复制`一层` (后者性能更优)<br>　　`...解构赋值: 如数组、对象等` (需配置`ESLint`)　[前端`js`](https://yuchengkai.cn/docs/frontend)、[难点`js`](https://github.com/yygmind/blog)
````javascript
/* 配置ESLint > .eslintrc.yml
parserOptions:
    ecmaVersion: 9
rules:
    prefer-object-spread: error
*/
let [first, ...rest] = [1, 2, 3, 4], p1={name:`hello`}, p2={...p1}, p3=({...p1,age:1}), p4=Object.create(p3);
let [success, [...abc], person, sayHello] = [true, ['a','b','c'], {"name":"halo","sex":1}, ()=>{alert('hello')}];
 // (undefined==null) == true; (undefined===null) == false;
 // p4.e=3.14; ('name' in p4 ==true);p4.hasOwnProperty('name')==false; //in检查对象p4.e&原型,hasOwnProperty不检查原型
 // (Object.getOwnPropertyNames(window).length > Object.keys(window).length) == true;
 // Object.assign({},p1,{sex:0,name:`hi`}); > {sex:0,name:`hi`} //后面的-覆盖前面的-对象属性, ...解构时不复制继承的属性
 // Object.assign({},"abc",{name:"名字0"},{name:"名字1"}) > {0:"a",1:"b",2:"c",name:"名字1"}
````

4.**原型** 绝大部分的函数(少数内建函数除外)都有一个`prototype`属性,这个属性是原型对象用来创建新对象实例,<br>　　而所有被创建的对象都会共享原型对象
`__proto__`是大部分主流浏览器(IE除外)引擎提供的,还被Node.js支持.<br>　　获取原型`Object.getPrototypeOf`(获取变量类型)、修改原型`Object.setPrototypeOf`(修改变量类型)
````javascript
function Person(name) { this.name = name }
var p1 = new Person(`p1`), p2 = new Person(`p2`);
if(Object.getPrototypeOf(p1)===Person.prototype)
    Object.setPrototypeOf(Person.prototype,{sex:1});//修改类型Person
console.log(p1.name);console.log(p2.sex); // 此时p1,p2都有sex属性
console.log(Object.getPrototypeOf(p1)===Object.getPrototypeOf(p2))//true 变量类型都相同
var fakeDate = {}, notDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);//修改变量fakeDate的类型为Date
console.log(Object.getPrototypeOf(fakeDate)===Object.getPrototypeOf(notDate))//false 变量类型已修改
````

5.`this`是在`执行`时确定其指向的对象(箭头函数中的`this`除外[箭头函数无this])，<br>　　优先级是:`箭头`函数>`new`绑定>`显式`绑定[`bind`>`call`|`apply`]>`隐式`绑定>`默认`绑定。
````javascript
    apply、call、bind方法的共同点和语法区别：
      三者都是用来改变函数的this对象[实例]的指向的；第一个参数都是this要指向的对象，也就是想指定的上下文[实例]；
      语法a：apply([thisObj[,argArray]])
      语法c：call([thisObj[,arg1[,arg2[,arg3[,.argN]]]]])
        thisObj的取值有以下4种情况：
            （1） 不传，或者传null,undefined，this指向window对象
            （2） 传递另一个函数的函数名，this指向这个函数的引用
            （3） 传递字符串、数值、布尔值等基础类型，this指向其对应的包装对象，如 String、Number、Boolean
            （4） 传递一个对象，this指向这个对象
      语法b：bind([thisObj[,arg1[,arg2[,arg3[,.argN]]]]]): function([,arg1[,arg2[,arg3[,.argN]]]])
        bind不兼容IE6,7,8
````
6.作用域链`scope chain`,ES2015`es6`中引入let和const,创建块级作用域,阻止变量提升到整个函数(var问题)和变量重复声明.

7.模块代码规范: 模块化编程、可维护、动态加载、性能优化等。[`ES6`Module的语法](http://es6.ruanyifeng.com/#docs/module)
````javascript
    RequireJS 和 SeaJS 都是模块化框架的代表，AMD和CMD，是他们各自定义模块化的方式，大同小异，主要是代码风格和API不同。
    异步模块定义（AMD）是Asynchronous Module Definition的缩写，是 RequireJS 对模块定义的规范化产出。
    通用模块定义（CMD）是Common Module Definition的缩写，是SeaJS 对模块定义的规范化产出。
    
    `CommonJS` 每个文件就是一个模块的同步模块（后端）加载。nodejs就是服务器端广泛使用的模块化机制[global对象-多个文件分享变量]；
    通过module.exports 导出对外的变量或接口，通过 require() 来导入其他模块的输出到当前模块作用域中的对象
     【缓存加载(运行时优化)+静态绑定(导出对象)】
      定义模块: module.exports
      加载模块: var app = require('./app.js')
      入口文件: package.json > main = index.js(默认)
      模块缓存: 第一次加载某个模块时，Node会缓存该模块。以后再加载该模块，就直接从缓存取出该模块的module.exports属性。
      加载机制: 输入的是被输出的值的拷贝。也就是说，一旦输出一个值，模块内部的变化就影响不到这个值。
      
    `AMD` 为浏览器环境设计的异步模块（前端）加载，通过回调完成。RequireJS的思想是通过define方法，将代码定义为模块；通过require方法，实现代码的加载。
      定义模块: define(...) 用于定义模块，每个模块放一个文件里，如果想兼容CommonJS规范define(function(require,exports,module){... exports.*})
      独立模块: define(function(require){ require('module1') ... return { //返回任何值 } }) 可以返回任何值，不限于对象。
      非独立模块: define(['module1','module2'],function(m1,m2){ ... return { //返回对象 } }) 必须返回一个对象，供其他模块调用。
      加载模块: require(['foo','bar'], function(foo,bar){ //回调成功函数 }, function (err) { //回调错误处理 })
      配置: require.config({
                paths: { jquery:'...' //指定各个模块的位置 } //指定后可在自己的模块中使用require(['jquery'],function($){})
                shim: { "backbone": { deps: [ "underscore" ], exports: "Backbone" }, "underscore": { exports: "_" }} //加载非AMD规范的库
            })
      使用: 页面index.html中先通过引入require.min.js，再引入main.js（用于配置（require.config），以及引入其他模块）
      
    `ES6` 内置的模块化语法，我们在浏览器端无需额外引入requirejs来进行模块化
     【静态加载(编译时优化)+动态绑定(导出变量)】
      特点: 1.模块自动运行在严格模式下；
            2.在模块的顶级作用域创建的变量，不会被自动添加到共享的全局作用域，它们只会在模块顶级作用域的内部存在；
            3.模块顶级作用域的 this 值为 undefined
            4.对于需要让模块外部代码访问的内容，模块必须导出它们
      定义模块: export let name = ""; export function (); export class Rect; export { multiply }
        重命名模块: export { multiply as m }
        导出默认值: export default function () ; 或 export { multiply as default }
      加载模块: import { identifier1,identifier2 } from "./example.js"
        导入单个绑定: import {sum} from './example.js'
        导入多个绑定: import {sum,multiply} from './example.js'
        完全导入: import * as all from './example.js'
        重命名导入: import { sum as a } from './example.js'
        导入默认值: import sum from "./example.js"; import sum,{color} from "./example.js" 其中sum为括号外的：export default function sum
        导入的再导出: import {sum} from './example.js' ... export {sum} ; 或 export * from "./example.js"; //完全导出
      限制: export 与 import 都有一个重要的限制，那就是它们必须被用在其他语句或表达式的外部，而不能使用在if等代码块内部。
            原因之一是模块语法需要让 JS 能静态判断需要导出什么，正因为此，你只能在模块的顶级作用域使用 export与import。
````

8.深入理解 `js` : `ES4-ES3.1-harmony` > `ES5` > `ES6` `ECMA6` `ECMAScript6.0` > `javascript.next`
````javascript
// 类型转换 typeof
typeof 1 > "number"
typeof NaN > "number"
typeof '' > "string"
typeof undefined > "undefined"
typeof _  > "undefined"
typeof true > "boolean"
typeof Symbol() > "symbol"
typeof [] > "object"
typeof {} > "object"
typeof null > "object"
typeof console.log > "function"

// 转换对象或值, 优先调用[Symbol.toPrimitive]转换对象, 其次调用valueOf转换值, 两个方法均可重写:
let varObj = {
    [Symbol.toPrimitive](){return 2}, // 转换对象(es6)此方法调用优化级最高
    valueOf(){return 0},     // 转换值
    //toString(){return '1'} // 转换字符串
};
1 + varObj > 3
'1'+varObj > "12"

// 比较
NaN!=NaN > true
1 == '1' > true
1 == '2' > false

// 实例对象 new ：1.新生成一个对象，2.链接到原型，3.绑定this，4.返回新对象
function new () {
    // 创建一个空对象
    let obj = new Object()
    // 获得构造函数
    let con = [].shift.call(arguments) // arguments 参数、callee 当前函数的引用
    // 链接到原型[函数]
    obj.__proto__ = con.prototype      // instanceof 内部机制是通过判断对象的原型链中是不是能找到类型的 prototype
    // 绑定 this, 执行构造函数
    let res = con.apply(obj, arguments)
    // 确保 new 出来的是个对象
    return typeof res === 'object' ? res : obj
}

// 字符串格式化 format：'{0:f2}'.format(12.456) > 12.46
String.prototype.format = function(...args) {
    return this.replace(/\{(\d+)(:\w+)?\}/g, function (m, n) {
        let s = m.split(':');
        if (s.length != 2) return args[n];
        let f = s[1].substring(0, s[1].length - 1);
        return f.match(/^f\d+$/) ? args[n].toFixed(parseInt(f.substring(1))) : args[n];
    });
};

// es6 > 申明变量：let、const
// es6 > 箭头函数: 简写（一个输入参数或一个语句有输出结果）: i => {} | (a,b,c) => a+b+c; 函数内没有自身的this;
// es6 > 参数扩展: function(a, b, c, ...args){}  function(def = 1){}
// es6 > 数组扩展: map 映射; reduce 汇总; filter 过滤; forEach 遍历;
let str_map = [1,2,3].map((value, index, array) => `key-${index+1}: ${value}`).join("\n");
let avg_arr = [1,2,3].reduce((previousValue, currentValue, currentIndex, array) => {
  return currentIndex == array.length - 1 
    ? (previousValue + currentValue) / array.length
    : previousValue + currentValue;
}); // 当数组为空时,reduce第二个参数initialValue必填,否则会抛出异常.
let arr_find = [1,2,3].filter((value, index, array) => index % 2 == 1);
[1,2,3].forEach((value, index, array) => console.log(index % 2 == 1));

// es6 > Promise: 确保resolve回调只有一次;
new Promise(function (resolve, reject) { setTimeout(resolve, 1000); }).then(resolveReturn, rejectReturn);
// es6 > Promise.all: 确保p1,p2,p3, ajax1,ajax2,ajax3全部执行后再执行then
Promise.all([p1,p2,p3, ajax1,ajax2,ajax3]).then(resolvesReturn, rejectsReturn);

// es6 > Promise.race: 确保 fn 执行超时有提醒(放弃继续执行fn)
function PromiseRace(fn, delay) {
  return Promise.race([new Promise(function (resolve, reject) {
    setTimeout(function () { reject(`请求超时时间已到(${delay / 1000}秒)`); }, delay);
  }), new Promise(fn)]);
}
PromiseRace(function (resolve, reject) {
  // TODO:请求  setTimeout(resolve, 3000);
}, 2000).then(function (res) {
  // TODO:响应
}, function (err) {
  // TODO:超时  有提醒! alert(err);
});

// es6 > generator 执行生成器: function *() { #代码块1; yield; #代码块2; yield; #代码块3; return; }
let gen, ret = { value: undefined, done: false };
function *generator1(init, next1) {
  alert(init);
  let next2 = yield '代码块1.结果:' + next1;
  alert(next2);
  let next3 = yield '代码块2.结果:' + next2;
  alert(next3);
  let next4 = yield '代码块3.结果:' + next3;
  return '完成.结果：' + next4;
}
function doClick(e){
  let {x, y} = e; // 点击坐标
  if (!gen) gen = generator1('代码块1', [x, y]); // 初始化generator
  if (!ret.done) {
    console.log(ret = gen.next([x, y]));        // 执行一步generator
    // 334 91 ; {value: "代码块1.结果:334,91", done: false}
    // 455 86 ; {value: "代码块2.结果:455,86", done: false}
    // 391 11 ; {value: "代码块3.结果:391,11", done: false}
    // 449 13 ; {value: "完成.结果：449,13", done: true}
  }
}


````

---


# TypeScript 基础
 `[ 严格编码和检查，支持(es6)ES2015,ES2016,ES2017,ES2018... ]`

```javascript
// # 申明变量：var全局变量, let局部变量, const局部常量
let isDone: boolean = false;
// ECMAScript 2015 即 es6
let decimal: number = 6;
//@ts-ignore  使用JSDoc注释(修饰)下一行, @ts-ignore用来忽略错误(ts语法)
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
// # 字符串&模板 ECMAScript >= ES2015
let color: string = "blue"; color = 'red'; color = `Hello, my color is ${ color }`;
// # 数组Array
let list: number[] = [1, 2, 3];
// # 元组Tuple
let t2: [string, number]; t2 = ["hello", 10];
// # 枚举Enum
enum Color {Red, Green, Blue}
let e1: Color = Color.Green;
let e1ColorName: string = Color[2]; // Blue
// # 枚举类型 分为 数字类型 与 字符串类型，其中数字类型的枚举可以当标志使用：
export const enum ObjectFlags {
  Class            = 1 << 0,  // Class
  Interface        = 1 << 1,  // Interface
  Reference        = 1 << 2,  // Generic type reference
  Tuple            = 1 << 3,  // Synthesized generic tuple type
  Anonymous        = 1 << 4,  // Anonymous
  Mapped           = 1 << 5,  // Mapped
  Instantiated     = 1 << 6,  // Instantiated anonymous or mapped type
  ObjectLiteral    = 1 << 7,  // Originates in an object literal
  EvolvingArray    = 1 << 8,  // Evolving array type
  ObjectLiteralPatternWithComputedProperties = 1 << 9,  // Object literal pattern with computed properties
  ContainsSpread   = 1 << 10, // Object literal contains spread operation
  ReverseMapped    = 1 << 11, // Object contains a property from a reverse-mapped type
  JsxAttributes    = 1 << 12, // Jsx attributes type
  MarkerType       = 1 << 13, // Marker type used for variance probing
  JSLiteral        = 1 << 14, // Object type declared in JS - disables errors on read/write of nonexisting members
  ClassOrInterface = Class | Interface
}
enum AnimalFlags {
  None        = 0,
  HasClaws    = 1 << 0,
  CanFly      = 1 << 1,
  HasClawsOrCanFly = HasClaws | CanFly
}
interface Animal {
  flags: AnimalFlags;
  [key: string]: any;
}
function printAnimalAbilities(animal: Animal) {
  var animalFlags = animal.flags;
  if (animalFlags & AnimalFlags.HasClaws) {
    console.log('animal has claws');
  }
  if (animalFlags & AnimalFlags.CanFly) {
    console.log('animal can fly');
  }
  if (animalFlags == AnimalFlags.None) {
    console.log('nothing');
  }
}
var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly
// ## 代码中 |= 用来添加一个标志，&= 和 ~ 用来删除标志，| 用来合并标志。

// # any 不同于 Object; any 不要作为function的返回类型
let obj1: any = 1; obj1.toFixed();
// # as-syntax 语法
let n1: number = obj1 as number;
let n2: number = <number>obj1 + n1; // 强转
// # void 默认作为function的返回类型(function没有return时)
let unusable: void = undefined; // or null
// undefined and null actually have their own types and subtypes of all other types.

// # union type 联合类型, 可开启tsc配置: --strictNullChecks 检查null. 还有,严格检查'use strict';
type strings = string | null | undefined; let strs1: strings;
// # Never 无返回｜异常...
function error(message: string): never {
    throw new Error(message); // 异常
}
function infiniteLoop(loop: () => boolean): never {
    while (loop()) { } // 死循环
}
// # Object 对象
function createObject(o: object | null): any { return Object.create(o); }
let obj2 = createObject(null); // {}

// # Scoping rules 作用域规则: 块级作用域、全局作用域等.
function fScoping(shouldInitialize: boolean) {
    if (shouldInitialize) { var f = 10; } // var 会提升Context范围`提升作用域`
    return f;
}
fScoping(true);  // 10
fScoping(false); // undefined
// 0,...9 in ts or es6 with let 此时用到scoping rule 范围变量let
for (let i = 0; i < 10; i++) { setTimeout(function () { console.log(i); }, 100 * i); }
// 0,...9 in js or es5 with var 此时用到scoping function 范围构造函数(function(){})
for (var i = 0; i < 10; i++) { (function (i) { setTimeout(function () { console.log(i); }, 100 * i); })(i); }

// # Array destructuring 解构数组 (必须初始化-赋值)
let arr1 = [1, 2]; let [first, second] = arr1;
[first, second] = [second, first]; // 互换
let [first, ...rest] = [1, 2, 3, 4]; // rest [ 2, 3, 4 ]
let [, second, , fourth] = [1, 2, 3, 4]; // 按顺序解构

// # Object destructuring 解构对象 (必须初始化-赋值)
let o = { a: "foo", b: 12, c: "bar" };
// # 初始化与赋值,并且重命名a为变量name,此时变量a不存在
let { a: name, b } = o; ({ name, b } = { name: "baz", b: 101 });
let { a: myname, b: myage}: {a: string, b: number} = o; // 解构并申明变量类型
let { a, ...passthrough } = o; // 使用语法... 按顺序解构与合并
let total = a.length + passthrough.b + passthrough.c.length;

// # Default values 默认值
type C = { a: string, b?: number }
function f({ a, b = 0 }: C = { a: '' }): void { } // 双重默认值 f()==f({a:'',b:0})

// # Spread 快速赋值语法
let first = [1, 2], second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];
let defaults = { food: "spicy", price: "$100", ambiance: "noisy" };
let searchs = { ...defaults, food: "rich" }; // { food: "rich", ..}
class C {
  p = 12;
  m() { }
}
let c1 = new C();
let c2 = { ...c1 };
c2.p; // ok = 12 // c2.m(); // error!

// # Interface 接口 (只读：变量用const，属性用readonly)
interface World {
  name: string;
  ages: Readonly<number[]>; // Variables use const whereas properties use readonly
  readonly point: ReadonlyArray<number>;
  [prop: string]: any; // 可通过['属性']访问
}
let w1: World = { name: 'hello', ages: [1, 2, 3], point: [329.2832, 8673.335] };
w1['name'] = 'other'; // prop~读取name
w1.ages = [4, 5, 6]; w1.ages.push(7); // ok.写入成功
// w1.ages[0] = 1; w1.point[0] = 1; // error!索引签名仅允许读取

// # Indexable Types 索引访问
interface StringArray extends Array<string> {
  readonly [index: number]: string; // 只读索引
}
let sa1: StringArray = ['a', 'b', 'c'];
sa1.findIndex(s => s.endsWith('a'));
// sa1[0] = '1'; // error!

// # Interface 接口-扩展
interface Shape { color: string; }
interface Square extends Shape { sideLength: number; }
let square = <Square>{};
square.color = "blue"; square.sideLength = 10;

// # Class implements Interface 接口类型的实现
interface IClock { tick(); }
interface Clock { new(hour: number, minute: number): IClock; }
function newClock(ctor: Clock, hour: number, minute: number): IClock {
  return new ctor(hour, minute);
}
class DigitalClock implements IClock {
  constructor(h: number, m: number) { }
  tick() { console.log("beep beep"); }
}
class AnalogClock implements IClock {
  constructor(h: number, m: number) { }
  tick() { console.log("tick tock"); }
}
let digital = newClock(DigitalClock, 12, 17);
let analog = newClock(AnalogClock, 7, 32);

// # Hybrid Types 复杂类型
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}
function getCounter(): Counter {
  let counter = <Counter>function (start: number) { };
  counter.interval = 123;
  counter.reset = function () { };
  return counter;
}
let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;

// # Protected Types 保护类型: [public:默认], protected, private and readonly, get-set, static
abstract class Person {
  static Where: string = '地球';
  protected constructor(protected readonly name: string) { }
}
class Employee extends Person {
  constructor(readonly name: string, private department: string) { super(name); }
  get elevatorPitch() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}
let howard = new Employee("Howard", "Sales");
let SunPer: typeof Person = Person; // 类别名
SunPer.Where = '太阳';
// new Person("John"); new SunPer(''); // Error: constructor is protected or abstract
class Point { x: number; y: number; }
interface Point3d extends Point { z: number; } // Using a class as an interface
let point3d: Point3d = { x: 1, y: 2, z: 3 };

// # this 对象关联
interface UIElement {
  element: Element;
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
abstract class UIElement {
  static of: { (element: Element): UIElement } = element => {
    return <UIElement>{ element: element };
  };
}
const ui = UIElement.of(new HTMLElement());
ui.addClickListener(e => { console.log(`${ui.element.id} on ${e.type} event!`); });

// # function 复用[函数重载]
function pickCard(x: { suit: string; card: number; }[]): number; // 申明
function pickCard(x: number): { suit: string; card: number; };   // 申明
function pickCard(x): any {                                      // 实现
  if (typeof x == "object") return Math.floor(Math.random() * x.length);
  if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    const suits = ["hearts", "spades", "clubs", "diamonds"];
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// # function <T> 复用, 如：T[] <=> Array<T>
function loggingIdentity1<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// # function 类型|范型<T>
function identity<T>(arg: T): T { return arg; } // js实现,可为CDN外部js
let myIdentity1: <T>(arg: T) => T = identity;
let myIdentity2: <U>(arg: U) => U = identity; // T -> U...
let myIdentity3: { <T>(arg: T): T } = identity; // interface定义都用{}
// # interface & type 申明类型: 当要使用的功能为CDN外部js时,就可使用以下方式申明
// # 类型别名 declare [const|var..] Alias: T
// declare const $: any;
// declare function aliased(arg: string): string;
// # 类型别名 type Alias = T
type GenericIdentityFn = { <T>(arg: T): T; };
let myIdentity4: GenericIdentityFn = identity;
interface GenericIdentityFn1 { <T>(arg: T): T; }
let myIdentity5: GenericIdentityFn1 = identity;
interface GenericIdentityFn2<T> { (arg: T): T; }
let myIdentity6: GenericIdentityFn2<number> = identity;

// # factories 工厂方法: 一般用class类型构造器接口 C:{new():T;} => new C()
interface IShape { color: string; }
class Square implements IShape {
  sideLength: number;
  constructor(public readonly color: string) { } // 实现接口 { new(color: string): T; } 的类型
}
function createShape<T extends IShape>(obj: { new(color: string): T; }, color: string): T {
  return new obj(color);
}
let redSquare: Square = createShape(Square, 'red');
redSquare.sideLength = 1; // redSquare.color = 'green'; // Error!只读属性

// # enum 枚举类型
enum FileAccess {
  None,		// 默认为0，值为常量
  Read    	= 1 << 1,
  Write   	= 1 << 2,
  ReadWrite	= Read | Write
}

// # class <=> interface 类型兼容性
interface Named { name: string; }
class Person { name: string; }
let p: Named = new Person(); // ok 兼容
let s = { name: '', age: 1 };
p = s; // ok 兼容

// # function <=> function 函数兼容性(输入|输出)
let x = (a: number) => 0;
let y = (b: number, s: string) => 0;
y = x; // OK 兼容输入
// x = y; // Error
let items = [1, 2, 3];
items.forEach((item, index, array) => console.log(item));
items.forEach(item => console.log(item)); // OK 兼容输入
let a = () => ({ name: "Alice" });
let b = () => ({ name: "Alice", location: "Seattle" });
a = b; // OK 兼容输出
// b = a; // Error 缺少属性location

// # 扩展
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) { (<any>result)[id] = (<any>first)[id]; }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) { (<any>result)[id] = (<any>second)[id]; }
  }
  return result;
}

// # Union Types 连合类型
type N4 = 1 | 2 | 3 | 4;
type Easing = "ease-in" | "ease-out" | "ease-in-out";
interface Bird { fly(); layEggs(ea: Easing); }
interface Fish { swim(); layEggs(e: Easing); }
function getPet(): Fish | Bird {
  return <Bird>{ fly: () => { console.log('Bird fly'); } };
}
function isFish(pet: Fish | Bird): pet is Fish {
  return (<Fish>pet).swim !== undefined;
}
let pet = getPet();
if (isFish(pet)) { pet.swim(); }
else if (pet.fly) { pet.fly(); } // ok
// # typeof type guards 判断类型
function isNumber(x: any): x is number {
  return typeof x === "number";
}
console.log(isNumber(0)); // true

// # T & Tree & LinkedList 复杂结构
type Container<T> = { value: T };
type Tree<T> = { value: T; left: Tree<T>; right: Tree<T>; }
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person { name: string; }
let people: LinkedList<Person>;
let s = people.name;
s = people.next.name;
s = people.next.next.name;

// 映射类型
// ## 内置keyof、Partial、Readonly、Record、Pick；ThisType；Exclude、Extract、NonNullable、ReturnType、InstanceType,3.1版本支持对元组与数组的映射
// # keyof 访问属性 { [k: T1]: T2 } 一般T1为string, T2为any; keyof obj1,即keyof作为运算符返回类型T1
function prop<T, K extends keyof T>(t: T, k: K) { return t[k]; }
function props<T, K extends keyof T>(t: T, ks: K[]): T[K][] { return ks.map(k => t[k]);}
let x = { a: 1, b: 2, c: 3, d: 4 };
prop(x, "a"); // ok
console.log(props(new HTMLDivElement(), ["dir", "lang", "onclick"]));
// # keyof 获取只读属性
type propReadonly<T> = { readonly [P in keyof T]: T[P]; }
// # keyof 获取可选属性
type propPartial<T> = { [P in keyof T]?: T[P]; }
// # in keyof 筛选属性
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean }; // 判断
type NullablePerson = { [P in keyof Person]: Person[P] | null } // Person
type PartialPerson = { [P in keyof Person]?: Person[P] } // Person
type Nullable<T> = { [P in keyof T]: T[P] | null } // global
type Partial<T> = { [P in keyof T]?: T[P] } // global
//  例子：T[P] is wrapped in a Proxy<T>
type Proxy<T> = { get(): T; set(value: T): void; }
type Proxify<T> = { [P in keyof T]: Proxy<T[P]>; }
function proxify<T>(o: T): Proxify<T> { /* ... wrap proxies ... */}
let proxyProps = proxify(props);
// instanceof type guards 判断类型
console.log(new HTMLElement() instanceof HTMLDivElement); // false, 反过来true

// # in keyof 获取类型中的函数定义
type FunctionPropertyNames<T> = { [K in keyof T]: T[K] extends Function ? K : never }[keyof T];
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;
interface Part { name: string; updatePart(newName: string): void; }               // 类型Part
type Tf0 = FunctionPropertyNames<Part>;  // "updatePart"                          // 类型Part的函数名
type Tf1 = FunctionProperties<Part>;     // { updatePart(newName: string): void } // 类型Part的函数定义

// # in 映射类型 扩展 interface + class 的声明方式
type ArrayMethodName = 'filter' | 'forEach' | 'find';
type SelectArrayMethod<T> = {
 [K in ArrayMethodName]: Array<T>[K]
}
interface SomeClass extends SelectArrayMethod<number> {}
class SomeClass {
 value = [1, 2, 3];               // 映射类型
 someMethod() {
   this.forEach(/* ... */)        // ok
   this.find(/* ... */)           // ok
   this.filter(/* ... */)         // ok
   this.value                     // ok
   this.someMethod()              // ok
 }
}
const someClass = new SomeClass();
someClass.forEach(/* ... */)        // ok
someClass.find(/* ... */)           // ok
someClass.filter(/* ... */)         // ok
someClass.value                     // ok
someClass.someMethod()              // ok

// # ThisType 用来在对象中键入this
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;  // Type of 'this' in methods is D & M
}
function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx;  // Strongly typed this
      this.y += dy;  // Strongly typed this
    }
  }
});
obj.x = 10; obj.y = 20; obj.moveBy(5, 5);


// # Symbols 原始数据类型(不可变，不能比较，唯一...) Starting with ECMAScript 2015, es6
let prop1 = Symbol(1), prop2 = Symbol(1);
console.log(prop1 == prop2); // false 不能比较
let obj = { [prop1]: true, [prop2]() { return 'ok'; } }; // 当作对象的属性、方法
// console.log(obj[prop1], obj[prop2]()); // true, 'ok'

// # 类型断言 用来明确的告诉 TypeScript 值的详细类型，合理使用能减少我们的工作量。比如一个变量并没有初始值:
interface User { name: string; age: number; }
export default class Room extends Vue {
  private user = {} as User; // 类型断言
}


// # for 枚举与迭代
let list = [4, 5, 6];
for (let i in list) console.log(i); // for in(keys): "0", "1", "2",
for (let i of list) console.log(i); // for of(values): "4", "5", "6"

// # modules 模块的导出与导入 (一般定义于*.ts, *.tsx, *.d.ts等文件, es6开始引入)
// tsc default is Classic for --module AMD | System | ES2015 or Node otherwise.
// e.g. import x from "..."; import x = require("..."); tsconfig: compilerOptions.baseUrl
/// node.d.ts
declare module "url" {
  export interface Url {}
  export function parse(urlStr: string): Url;
}
export as namespace UrlLib; // global variable 当变量用,出现在不需要用import,export的代码中
/// <reference path="node.d.ts"/> // import reference file 用来导入*.d.ts, Triple-Slash Directives
import * as URL from "url"; // module "url" in node.d.ts
URL.parse("http://www.typescriptlang.org");

// # modules 特殊tsc: such as SystemJS and AMD allow non-JavaScript content to be imported.
declare module "*!text" {
  const content: string;
  export default content;
}
declare module "json!*" {
  const value: any;
  export default value;
}
// # modules 特殊tsc: import text file or json
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);

// # ~修饰器的实现,非ts稳定功能!
function version_100<T extends { new(...args: any[]): {} }>(ctor: T) {
  return class extends ctor {
    version: '1.0.0'
  };
}

```

---


# **Node.js 基础**
> [awesome-nodejs 超棒的开源库与应用工具](https://github.com/sindresorhus/awesome-nodejs)、 [rxjs - rxjs/operators - 响应式编程](https://github.com/ReactiveX/rxjs)

## 全局变量

````javascript
console.info(__filename); //当前文件
console.info(__dirname);  //当前目录
console.info(process.env);//系统环境变量

console.time(__filename);//计时开始
console.warn('我们的{0},GDP超:{1:f2}万亿.'.format('祖国',1738094.329));
console.log('<a href="http://www.es6fiddle.net">ES6 Fiddle</a>');
process.stdin.setEncoding('utf-8');
process.on('exit', () => console.timeEnd(__filename));
process.on('uncaughtException', exception => console.error(exception));
process.on('SIGINT', () => {
    console.warn('  processes receives a signal');
    process.exit(0);
});
process.stdin.on('data', (s) => process.stdout.write(s));

````

> `Buffer` 是 Node.js 中用于处理二进制数据的类, 与 IO 相关的操作 (网络/文件等) 均基于 Buffer, <br>　Buffer类是Node中的一个全局变量,这就意味着你不需要用额外的`require`将模块引入就可以使用它.

````javascript
//Buffer
var b1 = Buffer.from([0x01,0x02,0x03]);
    b1 = Buffer.from('hello', 'utf8');
var b2 = Buffer.alloc(10, 0x0);
var s1 = b1.toString('ascii');
    s1 = b1.toString('binary');
    s1 = b1.toString('base64');
    s1 = b1.toString('hex');
    s1 = b1.toString('utf8');
//Stream
const ReadableStream = require('stream').Readable;
let str = new ReadableStream();
str.push('hello '); str.push('world!');
str.push(null);//结束符EOF
// console.log(str.read().toString());//1次取出
let data = [];
str.on('data', function(chunk){//chunk is Buffer
    data.push(chunk);//push 2次
});
str.on('end', function(){
    console.log(Buffer.concat(data).toString());
});
var fss = require('fs').createWriteStream('default.html.bak',{encoding:'utf8'});
fss.write(Buffer.from('hello','utf8'));fss.end();//写入
require('fs').createReadStream('src/default.html')
.pipe(require('fs').createWriteStream('default.html.bak'),{end:true});
require('fs').unlinkSync('src/default.html.bak');//删除

const WritableStream = require('stream').Writable;
const DuplexStream = require('stream').Duplex;
const TransformStream=require('stream').Transform;

````

> **扩展**:<br>
　1. [`get-stream` - Get a stream as a string or buffer.](https://github.com/sindresorhus/get-stream)<br>
　2. [`into-stream` - Convert a buffer/string/array/object into a stream.](https://github.com/sindresorhus/into-stream)<br>
　3. [`byline` - Super-simple line-by-line Stream reader.](https://github.com/jahewson/node-byline)<br>
　4. [`multistream` - Combine multiple streams into a single stream.](https://github.com/feross/multistream)<br>


## **进程-管道-通信**

![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/38089481.jpg)

IPC进程间通信,常见的通信技术如下: 

![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/46822480.jpg)

    管道实际是用于进程间通信的一段`共享内存`，创建管道的进程称为管道服务器，连接到一个管道的进程为管道客户机。
    一个进程在向管道写入数据后，另一进程就可以从管道的另一端将其读取出来。

```javascript
//spawn方法可以启动一个子进程执行命令
const { spawn } = require('child_process');
const ls = spawn('ls', ['-l', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});

//exec方法可以启动一个子进程执行命令,并缓冲产生的数据，当子进程完成后回调函数可以将其调用.
const { exec } = require('child_process');

const ls = exec('ls -l', (error, stdout, stderr) => {
  if (error) {
    console.error(error.stack);
    console.log('Error code: ' + error.code);
  }
  console.log('Child Process STDOUT: ' + stdout);
});

//execFile方法可以执行一个外部应用，与`exec`类似，除了不衍生一个 shell。 
// 而是，指定的可执行的 file 被直接衍生为一个新进程，这使得它比 `child_process.exec()` 更高效。
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

//fork方法直接创建一个子进程，执行Node脚本，fork('./child.js') 相当于 spawn('node', ['./child.js']) 
// 与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
const n = child_process.fork('./worker.js');
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });
```

> **扩展**:<br>
　1. [`execa` - Better child_process](https://github.com/sindresorhus/execa)<br>
　2. [`fkill` - Fabulously kill processes. Cross-platform.](https://github.com/sindresorhus/fkill-cli)<br>


**node进程间通信原理**
`fork`创建进程之后，会在父子进程之间建立IPC通信,并过message与send()等方法进行通信, <br>　该通信方法基于由node的管道技术实现,而这个管道技术不同于上文提到的操作系统的*管道*, <br>　node的管道技术由libuv提供,而在不同操作系统下具体实现不同:Windows下由命名管道实现,linux下由UNIX域套接字实现.



## Events机制

`Events` 是 `Node.js` 中一个非常重要的 `core` 模块, 在 `node` 中有许多重要的 `core API` 都是依赖其建立的.  <br>　比如 `Stream` 是基于 `Events` 实现的, 而 `fs, net, http` 等模块都依赖 `Stream`, 所以 `Events` 模块的重要性可见一斑.


```javascript
//1.继承
const util = require('util');
const EventEmitter = require('events').EventEmitter;

function Music() { EventEmitter.call(this); }
util.inherits(Music, EventEmitter);  // var a = new Music(); a.on('play', playHandle); a.emit('play', '国歌');
var Person = function (name) { this.name = name; }
util.inherits(Person, EventEmitter); // var a = new Person('nodejs'); a.on('speak', speakHandle); a.emit('speak', '您好');

//2.监听与触发
// 除了常用on方法以外,还有一个同样效果的方法emitter.addListener(eventName, listener)
const myEmitter = new EventEmitter();
const connection = (id) => {
  console.log('client id: ' + id); //client id: 6
};
myEmitter.on('connection', connection); //监听名为`connection`的事件,并执行connection方法
myEmitter.emit('connection', 6); //触发名为`connection`的事件
myEmitter.once('connection', connection);//还有`once`,其作用与`on`类似,只是只触发一次回调.

//3.移除监听器
myEmitter.removeListener('connection', connection);

//4.监听新监听器 EventEmitter 实例会在一个监听器被添加到其内部监听器数组之前触发自身的 newListener 事件。
// 我们可以通过监听这个newListener事件来追踪新的监听器. 只处理一次，所以不会出现死循环.
myEmitter.once('newListener', (event, listener) => {
  if (event === 'event') {
    // 在开头插入一个新的监听器
    myEmitter.on('event', () => {
      console.log('A');
    });
  }
});
myEmitter.on('event', () => {
  console.log('B');
});
myEmitter.emit('event');//输出A,B

//5.事件中的异常处理
myEmitter.on('error', (err) => {
  console.log('有错误');
});
myEmitter.emit('error', new Error('whoops!'));

//6.监听器数量限制
// 每个事件默认可以注册最多 10 个监听器。 单个 EventEmitter 实例的限制可以使用 emitter.setMaxListeners(n) 方法改变
// 所有 EventEmitter 实例的默认值可以使用 EventEmitter.defaultMaxListeners 属性改变。

//7.在监听器中再次*触发*同一个事件会造成死循环,而且Events内部只是用克隆副本的方法避免了*监听*同一事件的死循环,
// 无法避免*触发*事件的循环,因此在使用中要避免这种情况.

//8.事件循环&定时器
setImmediate(() => console.log(1));
setTimeout(() => console.log(2));
Promise.resolve().then(() => console.log(3));
process.nextTick(() => console.log(4));
(() => console.log(5))();
# 输出: 5,4,3,2,1
# nodejs 的事件循环有六个阶段： 本次循环（process.nextTick、Promise.）-> 下次循环（setTimeout、setInterval）
#   timers: setTimeout、setInterval...
#   pending callbacks: 上一轮残留的IO回调
#   idle, prepare: 内部使用
#   poll: 授受新的IO事件，处理其他阶段未处理的回调，node在合适的情况会停留在该阶段
#   check: setImmediate 的回调
#   close callbacks: 关闭的回调
# 流程： timers > nextTick > mircotask > check > nextTick > mircotask > timers

```


## Http服务

#### Http访问

`静态资源访问服务`

````javascript
/* code start */
const fs = require("fs");
const path = require("path");
const http = require("http");
const url = require("url");
const util = require("util");
/**
 * Http 静态资源访问服务
 */
class HttpServ_UseStaticFiles {
    /**
     * Http 静态资源访问服务 constructor
     * @param {any} httpHostname 主机名 localhost
     * @param {any} httpPort 端口 3000
     */
    constructor(httpHostname, httpPort, rootPath, defaultEncoding) {
        var self = this, fsstat = util.promisify(fs.stat);// check file
        this.encoding = defaultEncoding||'utf8';
        this.cwd = rootPath||process.cwd();// path.dirname(process.argv[1]);
        this.httpHostname = httpHostname||'localhost'; this.httpPort = httpPort||3000;
        this.httpServ = http.createServer((request, response) => {
            var urlObj = url.parse(request.url), reqFilePath = path.join(self.cwd, urlObj.pathname);
            console.log(`${urlObj.href} < ${reqFilePath}`);
            fsstat(reqFilePath).then(stats => {
                var headers = {};// {'Content-Type': 'text/html; charset=utf-8', 'X-UA-Compatible': 'IE=EDGE'};
                response.writeHead(200, headers);
                if (stats.isFile()) return fs.createReadStream(reqFilePath,self.encoding).pipe(response,{end:true});
                else if (stats.isDirectory()) response.write('deny access, because it is directory.');
                else response.write('deny access.');
                response.end();
            }).catch(err => {
                response.writeHead(404);
                response.end();
            });
        });
    }
    /**
     * 开始 HttpServe
     */
    start() {
        var self = this;
        console.log(`HttpServe Use Static Files - Hosting environment: ${process.argv0}`);
        console.log(`HttpServe Content root path: ${self.cwd}`);
        self.httpServ.listen(self.httpPort, self.httpHostname, () => {
            var addr = self.httpServ.address();
            console.log(`HttpServe Now listening on: http://${addr.address}:${addr.port}`);
            //console.log(`Application started. Press Ctrl+C to shut down.`);
        });
    }
    /**
     * 停止 HttpServe
     */
    stop() {
        if (this.httpServ.listening) this.httpServ.close(() => {
            console.log(`Http Serve Is Stopped.`);
        });
    }
}
// go
new HttpServ_UseStaticFiles().start();
/* code end */
````

#### 安全加密

`常用md5,sha...; 对称加密[一个密钥(加密解密)]aes,des,IDEA...; 非对称加密[公钥(加密)+私钥(解密)]rsa,dsa,DH...`

````javascript
const crypto = require('crypto');
/* 1.哈希算法 > md5、sha1、sha256、sha512 */
const md5 = crypto.createHash("md5");
const sha1 = crypto.createHash("sha1");
/* 2.随机哈希算法 > Hmac算法也是一种哈希算法，它可以利用MD5或SHA1等哈希算法。不同的是，Hmac还需要一个密钥
   只要密钥发生了变化，那么同样的输入数据也会得到不同的签名，因此，可以把Hmac理解为用随机数“增强”的哈希算法*/
const sha256 = crypto.createHmac("sha256", "1234567890");
const sha512 = crypto.createHmac("sha512", "1234567890");
/* 3.对称加密算法 > AES是一种常用的对称加密算法，加解密都用同一个密钥
   AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等，
   AES除了密钥外还可以指定IV（Initial Vector），不同的系统只要IV不同，
   用相同的密钥加密相同的数据得到的加密结果也是不同的。
   加密结果通常有两种表示方法：hex和base64，这些功能Nodejs全部都支持，
   但是在应用中要注意，如果加解密双方一方用Nodejs，另一方用Java、PHP等其它语言，需要仔细测试。
   如果无法正确解密，要确认双方是否遵循同样的AES算法，字符串密钥和IV是否相同，
   加密后的数据是否统一为hex或base64格式。 */
function Aes(algorithm, password) {
    return { encrypt : (textUtf8) => {
            var _ = crypto.createCipher(algorithm, password);
            var s = _.update(textUtf8, "utf8", "hex"); s += _.final("hex");
            return s;
        }, decrypt : (decryptedHex) => {
            var _ = crypto.createDecipher(algorithm, password);
            var s = _.update(decryptedHex, "hex", "utf8"); s = _.final("utf8");
            return s;
        }
    }
}
/* 4.非对称加密算法 > 密钥交换协议: DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。
   DH算法基于数学原理每次输出都不一样，因为是随机的。*/
function DH_A(prime_length, prime_encoding, generator_encoding, keys_encoding) {
    var _ = crypto.createDiffieHellman(prime_length);
    if (!prime_encoding) prime_encoding = "hex";
    if (!generator_encoding) generator_encoding = prime_encoding;
    if (!keys_encoding) keys_encoding = prime_encoding;
    return {
        keys : _.generateKeys(keys_encoding), keys_encoding : keys_encoding,
        prime : _.getPrime(prime_encoding), prime_encoding : prime_encoding,
        generator : _.getGenerator(generator_encoding), generator_encoding : generator_encoding,
        computeSecret: (b) => { return _.computeSecret(b.keys, b.keys_encoding, b.keys_encoding) }
    }
}
function DH_B(a) {
    var _ = crypto.createDiffieHellman(a.prime, a.prime_encoding, a.generator, a.generator_encoding);
    return {
        keys : _.generateKeys(a.keys_encoding), keys_encoding: a.keys_encoding,
        computeSecret: () => { return _.computeSecret(a.keys, a.keys_encoding, a.keys_encoding) }
    }
}

/* 被加密 明文 */
// const str = `12345678`;

/* 加密： 哈希算法 */
// md5.update(str, "utf8"); console.log(`md5: ${str} | ${md5.digest('hex')}`);
// sha1.update(str); console.log(`sha1: ${str} | ${sha1.digest("hex")}`);
// sha256.update(str); console.log(`sha256: ${str} | ${sha256.digest("hex")}`);
// sha512.update(str); console.log(`sha512: ${str} | ${sha512.digest("hex")}`);

/* 加密： 对称加密算法 */
// const aes = new Aes('aes192','123456abc');
// var aes1 = aes.encrypt(str), aes2 = aes.decrypt(aes1);
// console.log(`aes: ${str} | ${aes1} | ${aes2}`);

/* 加密： 密钥交换协议 */
// const dh_a = new DH_A(512), dh_b = new DH_B(dh_a);
// console.log(dh_a.computeSecret(dh_b), dh_b.computeSecret());

// ### 加密压缩文件 ###
// var crypto = require('crypto');
var fs = require('fs');
var zlib = require('zlib');

var algorithm = 'aes-256-cbc';
var password = Buffer.from(process.env.password || 'my-password', 'utf8');
var encryptoStream = crypto.createCipher(algorithm, password);

var gzip = zlib.createGzip();
var writeStream = fs.createWriteStream(__dirname + '/output.gz');
var readStream = fs.createReadStream(__dirname + '/input.txt');

readStream.pipe(encryptoStream).pipe(gzip).pipe(writeStream)
.on('finish', function () { console.log('加密完成'); });

// ### 解密压缩文件 ###
var decryptStream2 = crypto.createDecipher(algorithm, password);
var gzip2 = zlib.createGunzip();
var readStream2 = fs.createReadStream(__dirname + '/output.gz');

readStream2.pipe(gzip2).pipe(decryptStream2)
.on('finish', function () { console.log('解密完成'); }).pipe(process.stdout);

````

> **扩展**:<br>
　1. [`unique-random` - 生成连续唯一的随机数](https://github.com/sindresorhus/unique-random)<br>
　2. [`mathjs` - 扩展数学公式](https://github.com/josdejong/mathjs)<br>
　3. [`algebra` - 代数结构](https://github.com/fibo/algebra)<br>
　4. [`Moment.js` - 日期转换](https://github.com/moment/moment)、[`date-fns` - 日期转换](https://github.com/date-fns/date-fns)<br>
　5. [`joi` - 验证请求数据输入](https://github.com/hapijs/joi)<br>
　6. [`pretty-bytes` - Convert bytes to a human readable string: 1337 → 1.34 kB.](https://github.com/sindresorhus/pretty-bytes)<br>
　7. [`pretty-ms` - Convert milliseconds to a human readable string: 1337000000 → 15d 11h 23m 20s.](https://github.com/sindresorhus/pretty-ms)<br>
　8. [`kue` - Redis-backed priority job queue.](https://github.com/Automattic/kue)<br>
　9. [`其他`...](https://github.com/sindresorhus/awesome-nodejs)
 
---
---
