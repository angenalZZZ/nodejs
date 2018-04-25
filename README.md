# nodejs 学习的地方


    javascript 运行有两个阶段：解析、执行。

#### **JavaScript基础类型**

> 原始类型: Undefined、Null、Boolean、Number、String、Symbol

1.**原始类型**又被称为**基本类型**，原始类型保存的变量和值直接保存在**栈内存**(Stack)中,且空间相互独立,通过值来访问.

2.`Number`是基于“二进制浮点数”实现的,使用的是“双精度”格式,不能用于===比较；特殊的(NaN!==NaN)只能使用isNaN()判断。

3.`for...in`枚举对象中的属性,在ES5中引入了一个新的方法`Object.key()`,不同之处在于,它可以将结果以数组的形式返回

4.**类型转换**虽然很方便，但有时也跟我们预期相去甚远，如：{}+[]返回0
![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/15517231.png)

5.**基本类型**是按值传递的，**引用类型**在传递过程中,对象`a`先产生了一个`副本a`,这个`副本a`并不是深克隆得到的`副本a`,`副本a`地址同样指向对象`a`指向的堆内存.

> 引用类型: Object、Array、Date、Function

1.引用类型是保存在**堆内存**中,而**栈内存**(Heap)中会有一个**堆内存地址**,通过这个地址变量被指向堆内存中`Object`真正的值,因此引用类型是按照引用访问的.

2.数组`Array`不仅可以通过数字索引,也可以通过字符串索引,但值得注意的是,字符串索引的键值对并不算在数组的长度里.

3.在ES6中我们可以用`Object.assign` 或者 `...`对引用类型进行浅复制.
````javascript
var p1 = {name:`hello`},
   p2 = {...p1}, p3 = ({...p1,age:1}),
   p4 = Object.assign({sex:0},p1);
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
5.`this`是在`执行`时确定其指向的对象(箭头函数中的`this`除外)，优先级是:`箭头`函数>`new`绑定>`显式`绑定[`bind`>`call`|`apply`]>`隐式`绑定>`默认`绑定。

6.作用域链`scope chain`,在ES2015中引入了let,通过let可以创建块级作用域.阻止了变量提升.

---

#### **node.js**

---
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

#### **查看进程**

![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/38089481.jpg)

IPC进程间通信,常见的通信技术如下: 

![](https://github.com/angenalZZZ/nodejs/raw/master/screenshots/46822480.jpg)

    管道实际是用于进程间通信的一段**共享内存**，创建管道的进程称为管道服务器，连接到一个管道的进程为管道客户机。
    *一个进程在向管道写入数据后，另一进程就可以从管道的另一端将其读取出来*。


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
`fork`创建进程之后，会在父子进程之间建立IPC通信,并过message与send()等方法进行通信,这通信方法基于由node的管道技术实现,而这个管道技术不同于上文提到的操作系统的*管道*,node的管道技术由libuv提供,而在不同操作系统下具体实现不同:Windows下由命名管道实现,*nix下由UNIX域套接字实现.

----

# Node中Events


