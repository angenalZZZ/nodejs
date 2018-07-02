    “编程定律”：
    1. 凡事可能出错，就一定出错。(墨菲定律!!!)
    2. 过早优化是万恶之源。(Knuth定律!!)
    3. 每一个决定都是一次权衡。(North定律!)
    4. 系统设计的架构受限于生产设计，反映出公司组织的沟通架构。(Conway定律!)
    5. 组织成员投入大量精力到琐碎的事情上。(车棚效应!!!)

# **JavaScript 基础**

    javascript 运行有两个阶段：解析、执行。

> 原始类型: Undefined、Null、Boolean、Number、String、Symbol `es6`

1.**原始类型**又被称为**基本类型**，原始类型保存的变量和值直接保存在**栈内存**(Stack)中,且空间相互独立,通过值来访问.

2.`Number`是基于“二进制浮点数”实现的,使用的是“双精度”格式,不能用于===比较；特殊的(NaN!==NaN)只能使用isNaN()判断。

3.`for...in`枚举对象中的属性,在ES5中引入了一个新的方法`Object.keys()`,不同之处在于,它可以将结果以数组的形式返回

4.**类型转换**虽然很方便，但有时也跟我们预期相去甚远，如：{}+[]返回0
![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/15517231.png)

5.**基本类型**是按值传递的，**引用类型**在传递过程中,对象`a`先产生了一个`副本a`,这个`副本a`并不是深克隆得到的`副本a`,`副本a`地址同样指向对象`a`指向的堆内存.

> 引用类型: Object、Array、Date、Function

1.引用类型是保存在**堆内存**中,而**栈内存**(Heap)中会有一个**堆内存地址**,通过这个地址变量被指向堆内存中`Object`真正的值,因此引用类型是按照引用访问的.

2.数组`Array`不仅可以通过数字索引,也可以通过字符串索引,但值得注意的是,字符串索引的键值对并不算在数组的长度里.

3.在ES6中我们可以用`Object.assign` 或者 `...`对引用类型进行浅复制.
````javascript
var p1 = {name:`hello`}, p2 = {...p1}, p3 = ({...p1,age:1}), p4 = Object.assign({sex:0},p1);
````

4.**原型** 绝大部分的函数(少数内建函数除外)都有一个`prototype`属性,这个属性是原型对象用来创建新对象实例,而所有被创建的对象都会共享原型对象
`__proto__`是大部分主流浏览器(IE除外)引擎提供的,还被Node.js支持.
获取原型`Object.getPrototypeOf`、修改原型`Object.setPrototypeOf`
````javascript
function Person(name) { this.name = name }
var p1 = new Person(`p1`), p2 = new Person(`p2`);
if(Object.getPrototypeOf(p1)===Person.prototype)
    Object.setPrototypeOf(Person.prototype,{sex:1});
console.log(p1.name);console.log(p2.sex);
console.log(Object.getPrototypeOf(p1)===Object.getPrototypeOf(p2))//true
````

`扩展String`
````javascript
String.prototype.format = function(...args) {
    return this.replace(/\{(\d+)(:\w+)?\}/g, function (m, n) {
        let s = m.split(':');
        if (s.length == 2) {
            let f = s[1].substring(0, s[1].length - 1);
            if (f.match(/^f\d+$/)) {
                return args[n].toFixed(parseInt(f.substring(1)));
            }
        }
        return args[n];
    });
};
````

5.`this`是在`执行`时确定其指向的对象(箭头函数中的`this`除外)，优先级是:`箭头`函数>`new`绑定>`显式`绑定[`bind`>`call`|`apply`]>`隐式`绑定>`默认`绑定。
````javascript
    apply、call、bind方法的共同点和区别：
    apply、call、bind 三者都是用来改变函数的this对象的指向的；
    apply、call、bind 三者第一个参数都是this要指向的对象，也就是想指定的上下文；
    语法：apply([thisObj[,argArray]])
    语法：call([thisObj[,arg1[,arg2[,arg3[,.argN]]]]])
        thisObj的取值有以下4种情况：
            （1） 不传，或者传null,undefined，this指向window对象
            （2） 传递另一个函数的函数名，this指向这个函数的引用
            （3） 传递字符串、数值、布尔值等基础类型，this指向其对应的包装对象，如 String、Number、Boolean
            （4） 传递一个对象，this指向这个对象
    语法：bind([thisObj[,arg1[,arg2[,arg3[,.argN]]]]]): function([,arg1[,arg2[,arg3[,.argN]]]])
        !!不兼容IE6,7,8
````
6.作用域链`scope chain`,在ES2015中引入了let,通过let可以创建块级作用域.阻止了变量提升.

7.Web模块加载框架: 模块化编程、可维护、动态加载、性能优化等。
````javascript
    RequireJS 和 SeaJS 都是模块化框架的代表，AMD和CMD，是他们各自定义模块化的方式，大同小异，主要是代码风格和API不同。
    异步模块定义（AMD）是Asynchronous Module Definition的缩写，是 RequireJS 对模块定义的规范化产出。
    通用模块定义（CMD）是Common Module Definition的缩写，是SeaJS 对模块定义的规范化产出。
````

---


# TypeScript 基础

```javascript
// 申明变量：var全局变量, let局部变量, const常量
// Basic Types...
let isDone: boolean = false;
// ECMAScript 2015 即 es6
let decimal: number = 6;
//@ts-ignore  使用JSDoc注释下一行,@ts-ignore用来忽略错误
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
// 字符串
let color: string = "blue"; color = 'red'; color = `Hello, my color is ${ color }`;
// 数组Array
let list: number[] = [1, 2, 3];
// 元组Tuple
let t2: [string, number]; t2 = ["hello", 10];
// 枚举Enum
enum Color {Red, Green, Blue}
let e1: Color = Color.Green;
let e1ColorName: string = Color[2]; // Blue
// any 不同于 Object; any 不要作为function的返回类型
let obj1: any = 1; obj1.toFixed();
// as-syntax 语法
let n1: number = obj1 as number;
let n2: number = <number>obj1 + n1; // 强转
// void 一般作为function的返回类型
let unusable: void = undefined; // or null
// undefined and null actually have their own types and subtypes of all other types.
// union type, note: ts config --strictNullChecks turned off.严格检查,像'use strict';
type strings = string | null | undefined; let strs1: strings;
// Never 无返回｜异常...
function error(message: string): never {
    throw new Error(message); // 异常
}
function infiniteLoop(loop: () => boolean): never {
    while (loop()) { } // 死循环
}
// Object 对象
function createObject(o: object | null): any { return Object.create(o); }
let obj2 = createObject(null); // {}

// Scoping rules 作用域
function fScoping(shouldInitialize: boolean) {
    if (shouldInitialize) { var f = 10; }
    return f;
}
fScoping(true);  // 10
fScoping(false); // undefined
// 0,...9 in ts or es6 with let
for (let i = 0; i < 10; i++) { setTimeout(function () { console.log(i); }, 100 * i); }
// 0,...9 in js or es5 with var
for (var i = 0; i < 10; i++) { (function (i) { setTimeout(function () { console.log(i); }, 100 * i); })(i); }

// Array destructuring 解构数组
let arr1 = [1, 2]; let [first, second] = arr1;
[first, second] = [second, first]; // 互换
let [first, ...rest] = [1, 2, 3, 4]; // rest [ 2, 3, 4 ]
let [, second, , fourth] = [1, 2, 3, 4];

// Object destructuring 解构对象
let o = { a: "foo", b: 12, c: "bar" };
// 初始化与赋值,并且重命名a为变量name,此时变量a不存在
let { a: name, b } = o; ({ name, b } = { name: "baz", b: 101 });
let { a: myname, b: myage}: {a: string, b: number} = o; // declare types
let { a, ...passthrough } = o; // using the syntax ...
let total = passthrough.b + passthrough.c.length;

// Default values 默认值
type C = { a: string, b?: number }
function f({ a, b = 0 }: C = { a: '' }): void { }

// Spread 快速赋值语法
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

// Interface 接口 (只读：变量用const，属性用readonly)
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

// Indexable Types 索引访问
interface StringArray extends Array<string> {
  readonly [index: number]: string; // 只读索引
}
let sa1: StringArray = ['a', 'b', 'c'];
sa1.findIndex(s => s.endsWith('a'));
// sa1[0] = '1'; // error!

// Interface 接口-扩展
interface Shape { color: string; }
interface Square extends Shape { sideLength: number; }
let square = <Square>{};
square.color = "blue"; square.sideLength = 10;

// Class implements Interface 接口类型的实现
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

// Hybrid Types 复杂类型
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

// Protected Types 保护类型: [public:默认], protected, private and readonly, get-set, static
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

// this 对象关联
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}
class Handler {
  info: string;
  static new(): Handler { return new Handler(); }
  onClickGood = (e: Event) => { this.info = `${e.type} event!`; }
}
const uiElement = <UIElement>{};
uiElement.addClickListener(Handler.new().onClickGood);

// function 复用
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

// function <T> 复用, 如：T[] <=> Array<T>
function loggingIdentity1<T>(arg: T[]): T[] {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}
function loggingIdentity2<T>(arg: Array<T>): Array<T> {
  console.log(arg.length);  // Array has a .length, so no more error
  return arg;
}

// function 类型|范型<T>
function identity<T>(arg: T): T { return arg; } // js实现,可为CDN外部js
let myIdentity1: <T>(arg: T) => T = identity;
let myIdentity2: <U>(arg: U) => U = identity; // T -> U...
let myIdentity3: { <T>(arg: T): T } = identity; // interface定义都用{}
// interface & type 申明类型: 当要使用的功能为CDN外部js时,就可使用以下方式申明
// 类型别名 declare [const|var..] Alias: T
// declare const $: any;
// declare function aliased(arg: string): string;
// 类型别名 type Alias = T
type GenericIdentityFn = { <T>(arg: T): T; };
let myIdentity4: GenericIdentityFn = identity;
interface GenericIdentityFn1 { <T>(arg: T): T; }
let myIdentity5: GenericIdentityFn1 = identity;
interface GenericIdentityFn2<T> { (arg: T): T; }
let myIdentity6: GenericIdentityFn2<number> = identity;

// factories 工厂方法: 一般用class类型构造器接口 C:{new():T;} => new C()
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

// enum 枚举类型
enum FileAccess {
  None,		// 默认为0，值为常量
  Read    	= 1 << 1,
  Write   	= 1 << 2,
  ReadWrite	= Read | Write
}

// class <=> interface 类型兼容性
interface Named { name: string; }
class Person { name: string; }
let p: Named = new Person(); // ok 兼容
let s = { name: '', age: 1 };
p = s; // ok 兼容

// function <=> function 函数兼容性(输入|输出)
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

// 扩展
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{};
  for (let id in first) { (<any>result)[id] = (<any>first)[id]; }
  for (let id in second) {
    if (!result.hasOwnProperty(id)) { (<any>result)[id] = (<any>second)[id]; }
  }
  return result;
}

// Union Types 连合类型
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
// typeof type guards 判断类型
function isNumber(x: any): x is number {
  return typeof x === "number";
}
console.log(isNumber(0)); // true

// T & Tree & LinkedList 复杂结构
type Container<T> = { value: T };
type Tree<T> = { value: T; left: Tree<T>; right: Tree<T>; }
type LinkedList<T> = T & { next: LinkedList<T> };
interface Person { name: string; }
let people: LinkedList<Person>;
let s = people.name;
s = people.next.name;
s = people.next.next.name;

// keyof 访问属性 { [k: T1]: T2 } 一般T1为string, T2为any; keyof obj1,即keyof作为运算符返回类型T1
function prop<T, K extends keyof T>(t: T, k: K) { return t[k]; }
function props<T, K extends keyof T>(t: T, ks: K[]): T[K][] { return ks.map(k => t[k]);}
let x = { a: 1, b: 2, c: 3, d: 4 };
prop(x, "a"); // ok
console.log(props(new HTMLDivElement(), ["dir", "lang", "onclick"]));
// keyof 获取只读属性
type propReadonly<T> = { readonly [P in keyof T]: T[P]; }
// keyof 获取可选属性
type propPartial<T> = { [P in keyof T]?: T[P]; }
// in keyof 筛选属性
type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean }; // 判断
type NullablePerson = { [P in keyof Person]: Person[P] | null } // Person
type PartialPerson = { [P in keyof Person]?: Person[P] } // Person
type Nullable<T> = { [P in keyof T]: T[P] | null } // global
type Partial<T> = { [P in keyof T]?: T[P] } // global
// 例子：T[P] is wrapped in a Proxy<T>
type Proxy<T> = { get(): T; set(value: T): void; }
type Proxify<T> = { [P in keyof T]: Proxy<T[P]>; }
function proxify<T>(o: T): Proxify<T> { /* ... wrap proxies ... */}
let proxyProps = proxify(props);
// instanceof type guards 判断类型
console.log(new HTMLElement() instanceof HTMLDivElement); // false, 反过来true

// Symbols 原始数据类型(不可变，不能比较，唯一...) Starting with ECMAScript 2015, es6
let prop1 = Symbol(1), prop2 = Symbol(1);
console.log(prop1 == prop2); // false 不能比较
let obj = { [prop1]: true, [prop2]() { return 'ok'; } }; // 当作对象的属性、方法
console.log(obj.prop1, obj.prop2); // true, 'ok'

// for 枚举与迭代
let list = [4, 5, 6];
for (let i in list) console.log(i); // for in(keys): "0", "1", "2",
for (let i of list) console.log(i); // for of(values): "4", "5", "6"

// modules 模块的导出与导入 (一般定义于*.ts, *.tsx, *.d.ts等文件, es6开始引入)
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

// modules 特殊tsc: such as SystemJS and AMD allow non-JavaScript content to be imported.
declare module "*!text" {
  const content: string;
  export default content;
}
declare module "json!*" {
  const value: any;
  export default value;
}
// modules 特殊tsc: import text file or json
import fileContent from "./xyz.txt!text";
import data from "json!http://example.com/data.json";
console.log(data, fileContent);

//~修饰器的实现,非ts稳定功能!
function version_100<T extends { new(...args: any[]): {} }>(ctor: T) {
  return class extends ctor {
    version: '1.0.0'
  };
}

```

---


# **Node.js 基础**


## 全局变量

````javascript
console.info(__filename) //当前文件

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
//process.stdin.on('data', (s) => process.stdout.write(s));

````

> `Buffer` 是 Node.js 中用于处理二进制数据的类, 与 IO 相关的操作 (网络/文件等) 均基于 Buffer,Buffer类是Node中的一个全局变量,这就意味着你不需要用额外的`require`将模块引入就可以使用它.

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

//execFile方法可以执行一个外部应用，与`exec`类似，除了不衍生一个 shell。 而是，指定的可执行的 file 被直接衍生为一个新进程，这使得它比 `child_process.exec()` 更高效。
const { execFile } = require('child_process');
const child = execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
});

//fork方法直接创建一个子进程，执行Node脚本，fork('./child.js') 相当于 spawn('node', ['./child.js']) 。与spawn方法不同的是，fork会在父进程与子进程之间，建立一个通信管道，用于进程之间的通信。
const n = child_process.fork('./worker.js');
n.on('message', function(m) {
  console.log('PARENT got message:', m);
});
n.send({ hello: 'world' });
```

**node进程间通信原理**
`fork`创建进程之后，会在父子进程之间建立IPC通信,并过message与send()等方法进行通信,这通信方法基于由node的管道技术实现,而这个管道技术不同于上文提到的操作系统的*管道*,node的管道技术由libuv提供,而在不同操作系统下具体实现不同:Windows下由命名管道实现,linux下由UNIX域套接字实现.



## Events机制

`Events` 是 `Node.js` 中一个非常重要的 `core` 模块, 在 `node` 中有许多重要的 `core API` 都是依赖其建立的. 比如 `Stream` 是基于 `Events` 实现的, 而 `fs, net, http` 等模块都依赖 `Stream`, 所以 `Events` 模块的重要性可见一斑.


```javascript
//1.继承
const util = require('util');
const EventEmitter = require('events').EventEmitter;

function Music() {
    EventEmitter.call(this);
}

util.inherits(Music, EventEmitter);

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

//4.监听新监听器 EventEmitter 实例会在一个监听器被添加到其内部监听器数组之前触发自身的 newListener 事件。我们可以通过监听这个newListener事件来追踪新的监听器.
// 只处理一次，所以不会无限循环
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

//5.监听器数量限制
// 每个事件默认可以注册最多 10 个监听器。 单个 EventEmitter 实例的限制可以使用 emitter.setMaxListeners(n) 方法改变。 所有 EventEmitter 实例的默认值可以使用 EventEmitter.defaultMaxListeners 属性改变。

//在监听器中再次*触发*同一个事件会造成死循环,而且Events内部只是用克隆副本的方法避免了*监听*同一事件的死循环,无法避免*触发*事件的循环,因此在使用中要避免这种情况.
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

`md5,sha,aes,DH...`

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
/* 4.密钥交换协议 > DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。
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
const str = `12345678`;

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

````
---
---
