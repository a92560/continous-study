
## DOM事件流

Document -> HTML -> body -> div (事件捕获) （从上往下）

 https://blog.csdn.net/chenjuan1993/article/details/81347590 

div 处于目标阶段

div -> body -> HTML -> Document(事件冒泡) 

addEventListener('click', funciton(){}, true) // 事件捕获  默认为false 即为事件冒泡

事件捕获优先与事件冒泡

同时声明（事件捕获先执行，再同时声明，外层先执行）

冒泡则相反

<img :src="$withBase('/imgs/DOM_event.jpg')" alt="DOM_event">

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    .grandma {
      height: 300px;
      width: 300px;
      background: red;
      position: absolute;
    }
    
    .mother {
      height: 250px;
      width: 250px;
      background: pink;
      position: absolute;
      left: 25px;
    }
    
    .daughter {
      height: 200px;
      width: 200px;
      background: blue;
      position: absolute;
      left: 25px;
    }
    
    .baby {
      height: 150px;
      width: 150px;
      background: yellow;
      position: absolute;
      left: 25px;
    }
  </style>
</head>

<body>
  <div class="grandma">
    grandma奶奶
    <div class="mother">
      mother妈妈
      <div class="daughter">
        daughter女儿
        <div class="baby">
          baby婴儿
        </div>
      </div>
    </div>
  </div>
</body>
<script>
  var grandma = document.getElementsByClassName("grandma")[0]
  var mother = document.getElementsByClassName("mother")[0]
  var daughter = document.getElementsByClassName("daughter")[0]
  var baby = document.getElementsByClassName("baby")[0]

  function logName() {
    console.log("我是" + this.className);
  }

  baby.addEventListener("click", logName, false) // 冒泡
  mother.addEventListener("click", logName, true) // 捕获
  daughter.addEventListener("click", logName, true) // 捕获
  grandma.onclick = logName; // 冒泡
</script>

</html>
// log 
我是mother
我是daughter
我是baby
我是grandma

```

 w3c规定了，任何发生在w3c事件模型中的事件，首是进入捕获阶段，直到达到目标元素，再进入冒泡阶段。 

 绑定在被点击元素的事件是按照代码的顺序发生的，其他非绑定的元素则是通过冒泡或者捕获的触发。按照W3C的标准，先发生捕获事件，后发生冒泡事件。所以事件的整体顺序是：非目标元素捕获 -> 目标元素代码顺序 -> 非目标元素冒泡。 

绑定在被点击元素的事件是按照代码的顺序发生的，其他非绑定的元素则是通过冒泡或者捕获的触发。按照w3c的规定，先发生捕获事件，后发生冒泡事件，所以事件的整体顺序是：非目标元素捕获->目标元素代码 顺序-> 非目标元素冒泡

## 事件代理

首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差，其次，必须事先指定所有事件处理程序而导致的DOM访问次数，就会延迟整个页面的交互就绪时间

1. 优点
   1. 提高性能，大量节省内存占用
   2. 动态添加的子元素无需重新绑定事件

# 盒模型

1. 标准盒模型 content-box

   width = content的width

   一个盒子的总宽度 = width + 2 * ( border + padding  + margin)

   

2. IE盒模型

   width = content's width + 2 * (border + pading)

   一个盒子的总宽度 = width + 2 * margin



# 外边距合并

## 造成现象（两者取大的值）

```html
<style>
    #div1{
        width: 200px;
        height: 200px;
        background: red;
        margin-top: 50px;
        overflow: hidden;
    }
    #div2 {
        width: 200px;
        height: 200px;
        background: green;
        margin-top: 60px;
    }
</style>
<div id="div1">
    <div id="div2">
        
    </div>
</div>
```

## 解决方法

1. 给父元素加个overflow: hidden
2. 父元素浮动
3. 子元素浮动
4. 父元素 position: absolute;
5. 子元素定位 position: absolute
6. 父元素 + border: 1px solid red;



# BFC(Block formatting context) 块级格式化上下文

## 符合条件的

1. 根元素 html
2. float 不为none
3. position 为 absolute 和 fixed
4. display 为 inline-block table-cell table-caption flex inline-flex
5. overflow 不为 visible

## 布局规则

1. 计算BFC的高度时，浮动元素也参与计算
2. 隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之，外面的元素也不会影响到里面的元素



# 重排 重绘

1. 重绘就是一个元素的外观被改变，但没有改变布局（宽高）的情况下发生。
   1. 如visibility, outline, 背景色
2. 重排就是DOM的变化影响到了元素的几何属性（宽高），浏览器会重新计算元素的几何属性
   1. 改变窗口大小，文字大小，内容的改变
3. 回流： 当浏览器发现某个部分发现了点变化影响了布局，需要重新渲染。



# 显示隐藏

1. display: none | block;  不占空间，没有事件
2. opactity: 0 | 1; 占空间，有事件
3. visibility: hidden | visible ; 占空间 没有事件



# JS数据类型

## 基本数据类型

1. number
2. string
3. boolean
4. null
5. undefined
6. symbol
7. bigint

存储在栈内存（不会有引用关系）

## 引用数据类型

1. function
2. object

值具体存储在堆内存，然后在栈内存里面存着一个指向堆内存值得地址（会有引用关系）



判断 array 和 object

arr.constructor == Array => arr.constructor 实际上是 arr.__ proto __.constructor 然而 arr.proto 指向 Array.prototype 

obj.constructor == Object

### typeof 

	1. typeof null => "object"
 	2. typeof arr => "object"
 	3. typeof {} => "object"
 	4. typeof function test(){} => "function"



arr instanceof Array : 右边变量的prototype在不在左边变量的原型链上；

```javascript
let arr = [1, 2, 3]
console.log(arr instanceof Array) // true
console.log(arr instanceof Object) // true
// 因为Array 是 Object的子类
```

```javascript
function myInstanceOf(left, right) {
    var rightProtoValue = right.prototype;
    var leftProtoValue = left.__proto__;
    while (true) {
        if (leftProtoValue === rightProtoValue) {
            return true;
        }
        if (leftProtoValue == null) {
            return false;
        }
        leftProtoValue = leftProtoValue.__proto__;
    }
}
```



## Prototype

解释： prototype 原型对象，定义在原型对象下的所有属性和方法能被所有实例化对象共享



# 继承

## 原型链继承

将子类的原型对象指向父类的实例

1. 在将子类的原型复制给父类的实例化对象之前
2. 我们在Child.prototype添加的方法会被覆盖哦
3. 来自原型对象的所有属性都被共享了，不小心修改了父类的引用类型的数据，那么所有子类创建的实例对象都会受到影响哦
4. 创建子类时，无法向父类传参

```javascript 
function Animal(name, age) {
    this.name = name
    this.age = age
}
// 在prototype声明的方法只会创建一次，在所有实例中共享。
Animal.prototype.eat = function() {
    console.log(this.name + "is eating")
}
// 继承属性 在构造函数中 .call() 继承属性
function Cat(name, age) {
    // 自然执行, this 指向 Window
    Animal.call(this, name, age)
}
Cat.prototype.success = function () {
    console.log(`${this.name} is success`);
}
// 原型对象 = new 父类的实例化对象
Cat.prototype = new Animal()

// Cat.prototype.constructor = function Animal() 会出现这个问题
// 修正
Cat.prototype.constructor = Cat.constructor

let cat = new Cat("kitty", 5)
let animal = new Animal("animal", 66);
console.log("cat", cat)
console.log("animal", animal);


// exam
function Parent (name) {
	this.name = name;
    this.sex = 'boy';
    this.colors = ['white', 'black'];
}

function Child (name) {
    this.features = ['cute'];
}

var parent = new Parent('parent');
Child.prototype = parent;

var child1 = new Child("child1");

child1.sex = 'girl';
child1.colors.push('yellow');
child1.features.push('sunshine');

var child2 = new Child('child2');
console.log(child1); // {sex: 'girl', feature: ['cute', 'sunshine'], __proto__: Parent{}}
console.log(child2); // {feature: ['cute']}

console.log(child1.name); // parent
console.log(child2.colors); // ['white', 'black', 'yellow']

<<<<<<< HEAD
console.log(parent); // {name: 'parent', sex: 'boy', color: ['white', 'black', 'yellow']}
=======
console.log(parent); {name: 'parent', sex: 'boy', color: ['white', 'black', 'yellow']}

```

## 构造函数继承

原理： 在子类构造函数内部使用call/apply来调用父类构造函数

缺点：构造函数继承只能继承父类的实例和方法，不能继承父类原型的属性和方法

```javascript
function Parent(name, sex) {
    this.name = name;
    this.sex = sex;
    this.colors = ['white', 'black'];
};

function Child(name, sex) {
    Parent.call(this, name, sex);
}

var child1 = new Child('child1', 'boy');
child1.colors.push('blue');

var child2 = new Child('child2', 'girl');
console.log(child1);
console.log(child2);

```



## 组合继承

1. 使用原型链继承来保证子类能继承到父类原型中的属性和方法
2. 使用构造函数继承来保证子类能继承到父类的实例和方法

```javascript
function Parent(name, colors) {
    this.name = name;
    this.colors = colors;
}

Parent.prototype.features = ['cute'];
function Child(name, colors){
    this.sex = 'boy';
    Parent.apply(this, [name, colors]);
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
var child1 = new Child('child1', ['white']);

child1.colors.push('black');
child1.features.push('sunshine');


var child2 = new Child('child2', ['blue']);

console.log(child1); { name: 'child1', colors: ['white', 'black']}
console.log(child2); { name: 'child2', colors: ['blue']}
console.log(child2.prototype); Parent{ name: undefined, colors: undefined, constructor: f Child()}

console.log(child1 instanceof Child); // true
console.log(child2 instanceof Parent); // true
```

缺点：

1. 父类构造函数会被调用两次
2. 生成了两个实例，子类实例中的属性和方法会覆盖子类原型（父类实例）上的属性和方法，增加了不必要的内存



## 寄生组合式继承

```javascript
function Parent(name) {
    this.name = name;
    this.face = 'cry';
    this.colors = ['white', 'black'];
}

Parent.prototype.features = ['cute'];
Parent.prototype.getFeatures = function () {
    console.log(this.features);
}

function Child(name) {
	Parent.call(this, name);
	this.sex = 'boy';
    this.face = 'smile';
}

Child.prototype = Object.create(Parent.prototype);
Child.ptototype.construtor = Child;


var child1 = new Child('child1');
child1.colors.push('yellow');
var child2 = new Child('child2');
child2.features = ['sunshine'];
console.log(child1); { name: 'child1', sex: 'boy', face: 'smile', colors: ['white', 'black', 'yellow']}
console.log(child2); { name: 'child2', sex: 'boy', face: 'smile', colors: ['white', 'black']}

child1.getFeatures(); ['cute']
child2.getFeatures(); ['sunshine']
```



Object.create()

```javascript
// 将传入的对象作为返回对象的原型
function create(obj) {
    function F() {}
    F.prototype = obj;
    return new F();
}
// 即 return.__proto__ = obj

Function.prototype.myCall = function (context) {
    if (typeof this !== 'function') {
        return new TypeError("not function")
    }
    context = context || window;
    context.fn = this;
    let args = [].shift.call(arguments);
    let ret = 
}
```



# this指向问题

## 1. 函数执行window（普通函数调用）

```javascript
function a() {
    console.log(this)
}
a()

setInterval(() => {
    console.log(this)
})

```

## 2.谁点谁就指向谁（对象调用）

```javascript
let obj = {
    name: "zs",
    say: function() {
        console.log(this)
    }
}
obj.say()
```

## 3.事件中，this指向点击的元素

```javascript
div.onclick = function() {
    console.log(this)
}
```

## 4. 类中，this指向实例化对象

```javascript
class Person{
    
}
let person = new Person()

```

## 5. 箭头函数

```javascript
// this指向箭头函数定义时离它最近的不是箭头函数的this
function test() {
    var a = 2;
    return () => {
        console.log(a)
    }
}

function testArrow() {
    var a = 3;
    var fn = test();
    fn();
    console.log(a);
}

testArrow();

var a = 4;
function normal() {
    var a = 3;
    return () => {
        console.log(a);
    }
}

var receiveNormal = normal();
receiveNormal();
```







# 事件

## 事件捕获

从外往内

## 事件冒泡

从内往外

(默认捕获的先执行)

```javascript
div.onclick = function () {
    console.log("111")
}
div.onclick = function () {
    console.log("222")
}

// 会覆盖
div.addEventListener("click", function(e) {
    e.target // => 点击谁 谁就是事件源
    this // => 谁的事件 谁就是this
    e.currentTarget // => this
    e.stopPropagation() // 阻止冒泡
    e.cancelBubble = true // IE 阻止冒泡
    e.preventDefault() // 阻止默认行为
    e.returnValue = false // IE阻止默认行为
    e.keyCode // 键码
    console.log(111)
})

```



## 事件委托(动态创建的元素 事件无法添加进去)

```html
<button id="btn">
    click
</button>
<ul id="ul">
   	<li>1</li>
    <li>2</li>
</ul>
```

```javascript
let oBtn = document.querySelector("#btn")
let aLi = document.querySelector("li")
let oUl = document.querySelector("#ul")

for(let i = 0; i < aLi.length; i ++) {
    aLi[i].onclick = function () {
        console.log(this.innerHTML)
    }
}

oBtn.onclick = function() {
    let oLi = document.createElement("li")
    oLi.innerHTML = Math.random()
    oUl.appendChild(oLi)
}
// 事件委托

// 点击子元素的时候  通过事件冒泡 会传到父元素oUl身上 
oUl.onclick = function (e) {
    // 判断点击的时候是不是li
    if(e.target.tagName === 'LI') { // tagName 大写
        console.log(e.target.innerHTML)
    }
}
```



# 闭包

## 解释：外部函数里面声明内部函数，内部函数引用外部函数里的局部变量，当外部函数调用完以后，局部变量不被释放，可以一直使用



```html
<ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```

```javascript
let oUl = document.getElementById("ul")
let aLi = document.getElementsByTagName("li")

for(var i = 0 ; i < aLi.length; i ++) { // var 改成 let
    // for循环执行完了
    // i 已经为 3了
    aLi[i].onclick = function() {
        // 保存每次绑定事件时的i
        console.log(i)
    }
    
    (function (index) {
        aLi[index].onclick = function() {
            console.log("index", index)
        }
    })(i)
}
```

# CSS3

## 常用属性

border-radius box-shadow background-size: cover/contain

## 动画

1. transform

   1. rotate(30deg)
   2. translate()
   3. scale()
   4. skew

2. transition: width 2s ease 3s; prop duration-time kind delay-time // 属性有变化

3. @keyframes run {

   ​	0%{

   ​	}

   }

4. animation  // 直接触发

5. flex布局

   1. flex-grow: Number 占多少份
   2. justify-content: 主轴对齐方式
   3. align-items: 交叉轴对齐方式



# HTML5

1. header
2. footer
3. aside
4. nav
5. canvas

# 深克隆

```javascript
let person = {
    name: "zs",
    age: 15,
    father: {
        name: "Darren"
    }
}

var person2 = person

person2.name = "lisi"

console.log("person.name", person.name) // 'lisi'

function clone(target) {
    let result = {}
    for(let key in target) {
        // 如果target[key] 是一个对象
        if(typeof target[key] === 'object') {
            result[key] = clone(target[key])
        }else {
            result[key] = target[key]
        }
    }
    return result 
}
JSON.stringify(obj)
JSON.parse(obj) // 浅克隆
warings: [
    1.他无法实现对函数 、RegExp等特殊对象的克隆
    2.会抛弃对象的constructor,所有的构造函数会指向Object
    3.对象有循环引用,会报错
]
console.log(clone(person))

```



## 要注意的问题

1. JSON克隆不支持函数，引用，undefined，Date，RegExp等
2. 要考虑Date、RegExp、Function等特殊方式的克隆
3. 要不要克隆__proto__ 如果要克隆，浪费内存。 如果不克隆，就不是深克隆



# 存储

## cookie

1. 大小限制为4kb，可以主动设置过期时间
2. 每次http请求都会携带cookie，增加服务端压力
3. 还可以单纯在某个域名下限制cookie生效
4. 同源才能访问cookie

## session（一个标识）

1. 保存在服务端

## sessionStorage

1. 仅在当前浏览器窗口关闭前有效，不在不同的浏览器窗口共享

2. 不会放在请求头里，减少请求量

## localStorage

1. 大小限制为5M
2. 不主动清除会一直保留

$(document).ready(fn) // => 页面结构加载完  DOMContentLoaded

window.onload = fn // => 所有资源加载完

```javascript
  window.addEventListener("load", function () {   //添加load事件
       console.log("load执行");
   }, false);

   window.addEventListener("DOMContentLoaded", function () {  //添加DOMContentLoaded事件
       console.log("domContentLoad执行");
   }, false)
```

# ES6私有变量

## 约定

1. 实现

   ```javascript
   class Example{
       constructor() {
           this._private = "private"
       }
       
       getName() {
           return this._private
       }
   }
   let e = new Example()
   
   console.log(ex.getName()); // private
   console.log(ex._private); // private
   ```

2. 优点

   1. 写法简单
   2. 调试方便
   3. 兼容性好

3. 缺点

   1. 外部可以访问和修改
   2. 语言没有配合的机制， 如 for in 语句会将所有属性都枚举出来
   3. 命名冲突

## 闭包

1. 实现1

   ```javascript
   class Example{
       constructor() {
           let _private = ''
           _private = 'private';
           this.getName = function() {
               return _private
           }
       }
   }
   
   let e = new Example()
   
   console.log(ex.getName()); // private
   console.log(ex._private); // undefined
   ```

2. 优点

   1. 无命名冲突
   2. 外部无法访问和修改

3. 缺点

   1. constructor的逻辑变得复杂，代码组织不清楚
   2. 方法存在于实例上，而非原型上，子类也无法使用super调用。
   3. 构建增加一点点开销

4. 实现2

   ```javascript
   const Example = (function() {
       var _private = ''
       class Example() {
           constructor() {
               _private = 'private'
           }
           getName() {
               return _privete
           }
       }
       return Example
   })()
   
   let e = new Example()
   console.log(ex.getName()); // private
   console.log(ex._private); // undefined
   ```

5. 优点

   1. 无命名冲突
   2. 外部无法访问和修改

6. 缺点

   1. 写法有一点复杂
   2. 构建增加一点点开销

## Symbol

1. 实现

   ```javascript
   const Example = (function () {
       var _private = Symbol('private')
       
       class Example {
           constructor() {
               this[_private] = 'private'
           }
           getName() {
               return this[_private]
           }
       }
       return Example
   })()
   
   let e = new Example()
   console.log(e.getName()); //private
   console.log(e.name); // undefined
   ```

2. 优点

   1. 无命名冲突
   2. 外部无法访问和修改
   3. 无性能损失

3. 缺点

   1. 写法稍微复杂
   2. 兼容性也还良好

## 最新提案

1. 实现

   ```javascript
   class Point {
     #x;
     #y;
   
     constructor(x, y) {
       this.#x = x;
       this.#y = y;
     }
   
     equals(point) {
       return this.#x === point.#x && this.#y === point.#y;
     }
   }
   
   ```

# 继承

## 原型链继承

1. 实现

   ```javascript
   function Parent() {
       this.name = ''
    this.names = ['Linlin', 'Kevin']
   }
   
   function Child() {
       
   }
   
   Parent.prototype.getName = function() {
       console.log(this.name)
   }
   
   Child.prototype = new Parent()
   let child1 = new Child()
   child1.names.push("Darren2")
   console.log(child1.names)
   console.log(child1.getName())
   ```
   
   1. 问题
      1. 引用类型的属性被所有实例共享

## 借用构造函数继承

1. 实现

   ```javascript
   function Parent() {
       this.names = ['Kevin', 'Darren']
   }
   
   function Child() {
   	Parent.call(this)
   }
   let child1 = new Child()
   child1.names.push("Linlin")
   console.log(child1.names); ['Kevin', 'Darren', 'Linlin']
   
   let child2 = new Child()
   console.log(child2.names); ['Kevin', 'Darren']
   child2.names.push("Linlin1")
   ```

2. 优点

   1. 避免了引用类型的属性被所有实例共享
   2. 可以在Child和Parent之间传参
   3. Parent.call(this, a, b)

3. 缺点

   1. 方法都在构造函数中定义，每次创建实例都会创建一边方法。

## 组合继承

1. 实现

   ```javascript
   function Parent(name) {
       this.name = name
       this.colors = ['red', 'blue', 'green']
   }
   ```






# DNS域名解析过程

1. 检查浏览器自身缓存中有没有解析过的这个域名对应的IP地址
2. 如果浏览器缓存没有命中，c盘下的hosts文件来设置，如果你在这里指定了一个域名对应的ip地址，那么浏览器首先会使用这个ip地址
3. 如果没有命中，请求本地域名服务器来解析这个域名，在城市的某个角落。性能较好。
4. 如果LDNS没有命中，直接跳到ROOT SERVER 域名服务器请求解析。
5. 根域名服务器返回给LDNS一个所查询的主域名服务器地址
6. 此时LDNS再发送请求给上一步返回的gLTD
7. 此时请求的gLTD查找并返回这个域名对应的Name Server的地址，这个Name Server就是网站注册的域名服务器。
8. Name Server根据映射关系表找到目标ip，返回给LDNS
9. LDNS缓存这个域名和对应的ip
10. LDNS把解析的结果返回给用户



# URL的输入到浏览器解析的一系列事件

## 用户输入

1. 地址栏判断输入的是关键字还是请求的URL
2. 当浏览器刚开始加载一个地址之后，标签页上的图标便进入了加载状态，但此时图中页面显示的依然是之前打开的页面内容，因为需要等待提交文档阶段，页面内容才会被替换

## URL请求过程

1. 浏览器进程通过进程间通信把URL请求发送至网络进程，网络进程接收到URL请求之后，会在这里发起真正的URL请求

   1. 网络进程首先查找本地缓存是否缓存了该资源，如果有缓存资源，那么直接返回资源给浏览器进程。

   2. 如果没有直接进入网络请求流程。

      1. DNS解析
      2. 如果请求协议是https，建立SSL/TLS链接

   3. 建立连接之后，浏览器端将构建请求行、请求头等信息，并把和该域名相关的cookie字段等数据附加到请求头中，然后向服务器发送构建的请求信息。

   4. 服务器接收到请求之后，会根据请求信息生成响应数据（包括响应行，响应头和响应体等信息），并发给网络进程，等网络进程接收到响应行和响应头之后，就开始解析响应头的内容

      1. 重定向

         如果状态码是301/302，浏览器会跳转到新的地址继续导航，如果状态码是200，那么表示浏览器可以继续处理该请求。

      2. 响应数据处理类型

         Content-Type，Content-Type是HTTP头中一个非常重要的字段，它告诉浏览器服务器返回的响应体数据是什么类型，然后浏览器根据Content-Type的值来决定如何显示响应体的内容

         application/octet-stream（字节流类型，根据下载类型来处理）

      3. 解析完成之后发送给浏览器进程

   5. 浏览器进程接收到网络进程的响应头数据之后，发送commit navigation消息到渲染进程，发送commit navigation时会携带响应头、响应体等数据。

      1.  渲染进程接收到Commit Navigation消息之后，便开始准备接收HTML数据，接收数据的方式是直接和网络进程建立数据管道 
      2.  提交文档（Commit Navigation）
         1. 渲染进程准备好之后，浏览器进程发出"提交文档"的消息，渲染进程接收到"提交文档"的消息后，会和网络进程建立传输数据的"管道"。（文档指的是URL请求的响应体数据）
         2. 等文档数据传输完成之后，渲染进程会返回"确认提交"的消息给浏览器进程
         3. 浏览器进程在收到"确认提交"的消息后，会更新浏览器状态，包括了安全状态、地址栏的URL、前进后退的历史状态，并更新web界面

   6. 渲染阶段

## DNS解析

1. 检查浏览器自身缓存中有没有解析过的这个域名对应的IP地址
2. 如果浏览器缓存没有命中，c盘下的hosts文件来设置，如果你在这里指定了一个域名对应的ip地址，那么浏览器首先会使用这个ip地址
3. 如果没有命中，请求本地域名服务器来解析这个域名，在城市的某个角落。性能较好。
4. 如果LDNS没有命中，直接跳到ROOT SERVER 域名服务器请求解析。
5. 根域名服务器返回给LDNS一个所查询的主域名服务器地址
6. 此时LDNS再发送请求给上一步返回的gLTD
7. 此时请求的gLTD查找并返回这个域名对应的Name Server的地址，这个Name Server就是网站注册的域名服务器。
8. Name Server根据映射关系表找到目标ip，返回给LDNS
9. LDNS缓存这个域名和对应的ip
10. LDNS把解析的结果返回给用户

## DNS域名解析（1）

1. 客户端提出域名解析请求，并将该请求发送给本地的域名服务器
2. 当本地域名服务器收到请求后，就先查询本地的缓存，如果有该记录项，则本地域名服务器就直接把查询的结果返回
3. 如果本地缓存没有命中，则本地域名服务器就直接把请求发给根域名服务器，然后根域名服务器在返回给本地域名服务器所查询域（根的子域）的主域名服务器的地址
4. 本地域名服务器再向上一步的域名服务器发送请求，然后接受请求的服务器查询自己的缓存，如果没有该记录，则返回相关的下级的域名服务器的地址
5. 重复第四步，直到找到正确的记录
6. 本地域名服务器把返回的结果保存到缓存，已备下一次使用，同时还将结果返回给客户端
7. 迭代查询 ; 迭代查询的特点 : 当根域名服务器收到本地域名服务器发出的迭代查询请求报文时 , 要么给出所要查询的IP地址 , 要么告诉本地服务器 : "你下一步应当向哪一个域名服务器进行查询" ; 然后让本地服务器进行后续的查询 ; 根域名服务器通常是把自己知道的顶级域名服务器的 IP 地址告诉本地域名服务器 , 让本地域名服务器再向顶级域名服务器查询 ; 顶级域名服务器在收到本地域名服务器的查询请求后 , 要么给出所要查询的 IP 地址 , 要么告诉本地服务器下一步应当向哪一个权限域名服务器进行查询 ; 最后 , 知道了所要解析的 IP 地址或报错 , 然后把这个结果返回给发起查询的主机 ;

## 发起TCP连接

1. SYN(synchronous建立联机)
2. ACK(acknowledgement确认)
3. PSH(push传送)
4. FIN(finish结束)
5. RST(reset重置)
6. Sequence Number(顺序号码)
7. Acknowledge Number(确认号码)

- 三次握手

  1. 第一次握手，客户端发送syn包（Seq = x）到服务器，并进入SYN_SEND状态，等待服务器确认；

  2. 第二次握手，服务器收到syn包，必须确认的客户的SYN（ack = x + 1），同时自己也发送一个SYN包（Seq = y），即SYN + ACK包，此时服务器进入SYN_RECV状态。

  3. 客户端收到服务端的SYN + ACK 包，向服务器发送确认包ACK （Seq = y + 1）, 此包发送完毕，客户端和服务端进入ESTABLISHED状态，完成三次握手

  4. 为什么会采用三次握手

  5. 建立连接的过程是利用客户服务端模式，假设主机A为客户端，主机B为服务端。

     采用三次握手的原因是为了防止失效的连接请求报文端突然又传送到主机B。因而产生错误。实现的连接请求报文是指：主机A发出的请求连接请求没有收到主机B的确认，于是经过一段确认时间后，主机A又重新向主机B发送请求连接，且建立成功，顺序完成数据传输。考虑这样一种特殊情况，主机A发送第一次的请求连接并没有丢失，而是因为网络节点导致延迟达到主机B，主机B以为是主机A又发起的新连接，于是主机B同意连接，并向主机A发回确认，但是此时主机A根本不理会，主机B就一直在等待主机A发送数据，导致主机B的资源浪费。
     
  6. 第三个ACK包丢了
  
      https://www.cnblogs.com/diegodu/p/3997890.html 
  
     Server端该TCP连接的状态为SYN_RECV，并且依次等待3、6、12秒后重新发送SYN+ACK包，以便client端重新发送ACK包。
  
     Server端重发SYN+ACK包的次数，可以通过tcp_synack_retries修改。


## 浏览器缓存

1. 请求报文

   1. 请求行： GET /index.html HTTP/1.1 

      1. 主要包括请求方法，url，http协议

   2. 请求头：（key,value形式）

      1. User-Agent：产生请求的浏览器类型。

      2. Accept：客户端可识别的内容类型列表。

      3. Host：主机地址

         ​      <img src="C:\Users\Darren\Desktop\16a634c93ecabe3a.png" alt="16a634c93ecabe3a" style="zoom:300%;" />

   3. 请求正文，数据存储

2. HTTP缓存

   1. 缓存的规则

      1. 强制缓存：当缓存数据库中有客户端需要的数据，客户端直接将数据从其中拿出来使用（当前数据未失效），当缓存服务器没有需要的数据时，客户端才会向服务端请求。

      2. 协商缓存：客户端会先从缓存数据库拿到一个缓存的标识，然后向服务端验证标识是否失效，如果没有失效服务端会返回304，这样客户端可以直接去缓存数据库拿出数据。如果失效，服务端返回新的数据

      3. 强制缓存的优先级高于协商缓存，如果两种协商皆存在，且强制缓存命中目标，则协商缓存不再验证标识。

      4. 如何判断缓存是否失效。

      5. 对于强制缓存，服务器响应的header字段中会用两个字段来表明----Expires 和 Cache-Control。

         1. Expires: Expires的值为服务端返回的数据到期时间。当再次请求时的请求时间小于返回的此时间，则直接使用缓存数据。由于服务端时间和客户端时间可能有误差，这也将导致缓存命中的误差，另一方面，Expires是HTTP1.0的产物，故现在大多数使用Cache-Control替代。
         2. Cache-Control: Cache-Control 有很多属性，不同的属性代表的意义也不同
            1. private: 客户端可以缓存
            2. public： 客户端和代理服务器都可以缓存
            3. max-age=t: 缓存内容将在t秒后过期
            4. no-cache: 需要使用协商缓存来验证缓存数据
            5. no-store: 所有内容都不会缓存。

      6. 协商缓存需要进行对比判断是否可以使用缓存。浏览器第一次请求数据时，服务器会将缓存标识与数据一起响应给客户端，客户端将它们备份至缓存中，再次请求时，客户端会将缓存中的标识发给服务器，服务器根据此标识判断，若未失效，返回304状态码，浏览器拿到此状态码可以直接使用缓存数据。

         1. Last-Modified: 服务器在响应请求时，会告诉浏览器资源的最后修改时间

            1. if-Modified-Since: 浏览器再次请求服务器的时候，请求头会包含此字段，后面跟着在缓存中获得的最后修改时间，服务端收到此请求头发现有if-Modified-Since，则与被请求资源的最后修改时间进行对比，如果一致，返回304和响应文报头。
               1. 如果被修改，返回新的文件。200；OK
               2. 如果没有被修改，服务器返回304 Not Modified
            2. if-Unmodified-Since: 从某个时间段算起，是否文件没有被修改

         2. 缺点： 如果在服务器上，一个资源被修改了，但其实际内容根本没发生改变。

            会因为Last-Modified时间匹配不上而返回了整个文件给客户端。

         3. 为了解决这个问题，HTTP1.1推出了Etag，服务器响应请求时，通过此字段告诉浏览器当前资源在服务器生成的唯一标识（生成规则由服务器决定）

            1. If-None-Match: 再次请求服务器时，浏览器的请求报文头部会包含此字段，后面的值为在缓存中获取的标识，服务器收到此次报文后发现if-None-Match则与被请求资源的唯一标识进行对比。
               1. 不同：说明资源被改动过，则响应整个资源内容，返回状态码200.
               2. 相同：说明资源没有被修改过。
            2. 缺点：实际应用中由于Etag的计算是使用算法来得出的，而算法会占用服务端计算的资源，所有的服务端资源都是宝贵的，所以很少使用Etag了。

      7. 优点：

         1. 减少了冗余的数据传递，节省了宽带流量
         2. 减少了服务器的负担，大大提高了网站性能
         3. 加快了客户端加载网页的数据，这也正是HTTP缓存属于客户端缓存的原因
         
      8. 三级缓存原理
      
         1. 先查找内存，如果内存中存在，从内存中加载
      
         2. 如果内存中未查找到，选择硬盘获取，如果硬盘中有，从硬盘中加载
      
         3. 如果硬盘中未找到，那就进行网络请求
      
         4. 加载到的资源分别缓存到硬盘和内存
      
         5.  小结：一般图片会用disk cache, js文件用memory cache 
      
         6.  当退出进程时，内存中的数据会被清空，而磁盘的数据不会 
      
         7. WebKit派生资源包含的类型主要如下：
      
            Javascript脚本（CachedScript）；
      
            CSS样式文本（CachedCSSStyleSheet）；
      
            图片（CachedImage）；
      
            字体（CachedFont）；
      
            XSL样式表（CachedXSLStyleSheet）；

## SSL/TLS连接

- TLS连接https://www.cnblogs.com/Wayou/p/ssl_tls_handshake.html

  - 客户端向服务端发送随机数Random1和客户端支持的密码套件和当前SSL版本
- 服务端从客户端加密套件列表中选择一个，加密套件决定了后续加密及生成摘要的算法，生成Random2，两端的随机数会在后续生成对称密钥时使用，服务器将自己的证书下发给客户端，让客户端验证服务器的身份
  - 客户端收到证书后才CA验证其合法性
  - 验证合法后从证书取出公钥，生成随机数Random3
    - 使用公钥非对称加密生成pre_master key
  - 并将pre_master key发送服务器
  - 服务端接收到pre_master key，用自己的私钥解出Random 3
  - 此时服务端和客户端两端都有Random 1-3
    - 两端使用相同的算法生成密钥，握手结束后的数据传输都使用此密钥进行对称加密
  - 为何需要三个random
    - 因为SSL/TSL握手过程数据明文传输，多个随机数种子生成的密钥不容易暴力破解
- 客户端使用前面协商出来的密钥加密
- 服务端使用密钥解密，解密成功说明密钥一致。

## 服务器处理并返回HTTP报文

JavaScript文件的下载过程会阻塞DOM解析吗？

## 浏览器解析渲染页面 

1. 浏览器进程发出"提交文档"的信息，渲染进程接收到"提交文档"的消息后，会和网络进程建立传输数据的"管道"

   1. 提交文档过程中，网络进程边下载边提交给渲染进程

   2. 渲染进程接收到第一批数据，就开始做DOM解析了

   3. Chrome浏览器做了很多优化，预解析操作，当渲染引擎接收到字节流文件之后，会开启一个预解析线程，用来分析HTML文件中包含的JavaScript、CSS等相关文件之后，预解析线程会提前下载这些文件

      ```html
      当服务器接收到HTML页面的第一批数据时，DOM解析器就开始工作了，在解析过程中，如果遇到了JS脚本，如下所示
      <html>
          <body>
              <script>
              	document.write('--foo')
              </script>
          </body>
      </html>
      
      那么DOM解析器会先执行JavaScript脚本，执行完成之后，再继续往下解析（内嵌JavaScript脚本，暂停DOM的解析）
      
      第二种情况
      <html>
          <body>
              <script type='text/javascript' src='foo.js'>
              </script>
          </body>
      </html>
      这种情况下，当解析到JavaScript的时候，会先暂停DOM解析，并下载foo.js文件，下载完成之后执行该段js文件，然后再继续往下解析DOM，这就是JavaScript文件为什么会阻塞DOM渲染
      
      第三种情况
      <html>
          <head>
              <style type="text/css" src='theme.css'></style>
          </head>
          <body>
              <p>
                  极客时间
              </p>
              <script>
              	let e = document.getElementsByTagName('p')[0]
                  e.style.color = 'blue'
              </script>
          </body>
      </html>
      当我在JavaScript中访问了某个元素的样式，那么这时候就需要等待这个样式被下载完成才能继续往下执行，所以在这种情况下，CSS也会解析DOM的解析
      
      所以JS和CSS都有可能会阻塞DOM的解析
      
      ```

      

   4. 浏览器不能直接理解HTML数据，所以第一步需要将其转换为浏览器能够理解的DOM树结构（渲染进程将HTML内容转换为能够读懂的DOM结构）

   5. 渲染引擎将CSS样式表转换为浏览器可以理解的stylesheets。

   6. 生成DOM树后，还需要根据CSS样式表，来计算DOM树的所有节点的样式；

   7. 最后计算DOM元素的布局信息，使其都保存在布局树中

   8. 对布局树进行分层，并生成分层树

   9. 为每个图层生成绘制列表，并将其提交到合成线程

   10. 合成线程将图层分成图块，并在光栅化线程池中将图块转化成位图

   11. 合成线程发送绘制图块命令DrawQuad给浏览器进程

   12. 浏览器进程根据DrawQuad命令生成页面，并显示到显示器上

   13. 使用CSS transform来实现动画效果，这样避免重排和重绘阶段，直接在非主线程上执行合成动画操作。这样的效率是最高的。

2. 等文档数据传输完成之后，渲染进程会返回"确认提交"的消息给浏览器进程

3. 浏览器进程在收到"确认提交"的信息后，会更新浏览器界面状态，包括了安全状态、地址栏的URL、前进后退的历史状态，并更新web界面

4. 状态码

5. 响应报头

   1. Server:
   2. Connection:
   3. Accept:

6. 响应文

   1. 服务器请求的HTML,CSS,JS文件就放在这里面

      1. 解析HTML形成DOM树
      2. 解析CSS形成CSSOM树
      3. 合并DOM树和CSSOM树形成渲染树
      4. 浏览器开始渲染并绘制页面，这个过程涉及两个比较重要的概念回流和重绘。DOM结点都是以盒模型形式存在，需要浏览器去计算位置和宽度等，这个过程就是回流，等到页面的宽高，大小，颜色等属性确定下来后，浏览器开始绘制内容，这个过程就做重绘。浏览器刚打开页面一定要经过这两个过程的，但是这两个过程非常耗性能的，所以我们要尽量减少页面的回流和重绘

   2. 回流： 当Render Tree中部分或全部元素的尺寸，结构或某些属性发生改变时，浏览器重新渲染部分或全部文档的过程成为回流

      1. 会导致回流的操作
         1. 页面首次渲染
         2. 浏览器窗口大小发生改变
         3. 元素尺寸或位置发生改变
         4. 元素内容发生变化（文字数量或图片大小）
         5. 元素字体大小变化
         6. 添加或者删除可见的DOM元素
         7. 激活CSS伪类
         8. 查询某些属性或者调用某些方法
      2. 一些常用且会导致回流的方法
         1. clientWidth,clientHeight,clientTop
         2. offSetWidth
         3. scrollWidth
         4. scrollTo()

   3. 重绘

      1. 当页面中元素的样式不影响它在文档流中的位置的时候（例如：color，background-color，visibility），浏览器会将新样式赋予给元素并重新绘制它，这个过程称为重绘

   4. 优化：

      1. CSS	

         1. 尽量避免使用table布局
         2. 尽可能在DOM树的最末端改变class
         3. 避免设置多层内联样式
         4. 将动画效果应用到position为absolute或者fixed的元素上
         5. 尽量避免使用css表达式

      2. JS

         1.  不内嵌JavaScript: medium (仅对网站有效) 避免在body中间嵌入多个JavaScript代码，将JavaScript代码重新集中到外部文件中，放在或页面末尾（之前）。

            为什么：

            ​	将JavaScript嵌入代码直接放在中可能会降低页面速度，因为它在构建DOM时会加载。最好的选择是使用async 或 defer的外部文件来避免阻塞DOM渲染。另一种选择是在中放置一些脚本。大多数时候是需要在DOM进入主处理之前加载的分析代码或小脚本。

            怎么做：

            ​	确保使用async或defer加载所有script文件，并准确地在中加载代码。

         2. 非阻塞JavaScript： high 使用defer属性或使用async来异步加载JavaScript文件。
         
         3. https://www.zcfy.cc/article/building-the-dom-faster-speculative-parsing-async-defer-and-preload-x2605-mozilla-hacks-8211-the-web-developer-blog-4224.html?t=new
         
         4. https://segmentfault.com/a/1190000006778717


            ```javascript
            <!-- Defer Attribute -->
            <script defer src="foo.js">
    
            <!-- Async Attribute -->
            <script async src="foo.js">
            为什么：
    
            ​	JavaScript阻止HTML文档的正常解析，因此当解析器到达<script>标记时（特别是在内），它会停止解析并且执行脚本。如果您的脚本位于页面顶部，则强烈建议添加async和defer，但如果在标记之前加载，没有太大影响。但是，使用这些属性来避免性能问题是一种很好的做法。
    
            怎么做：
    
            ​	添加async（如果脚本不依赖于其他脚本）或defer（如果脚本依赖或依赖于异步脚本）作为script脚本标记的属性。 如果有小脚本，可以在异步脚本上方使用内联脚本。
    
            1. async : 加载脚本和渲染后续文档元素并行进行，脚本加载完成后，暂停html解析，立即解析js脚本（load事件之前执行）
    
               defer : 加载脚本和渲染后续文档元素并行进行，但脚本的执行会等到 html 解析完成后执行(DOMContentLoaded 之前)
               1. defer
               	1.1 会保证顺序执行
               2. async 
                2.1 不一定保证顺序执行
                2.2 有依赖的文件不建议使用
               3. 参考 https://segmentfault.com/a/1190000006778717
               4. 参考 https://www.zcfy.cc/article/building-the-dom-faster-speculative-parsing-async-defer-and-preload-x2605-mozilla-hacks-8211-the-web-developer-blog-4224.html?t=new
    
            2. prefetch ：其利用浏览器空闲时间来下载或预取用户在不久的将来可能访问的文档。<link href="/js/xx.js" rel="prefetch">
    
               preload : 可以指明哪些资源是在页面加载完成后即刻需要的，浏览器在主渲染机制介入前就进行预加载，这一机制使得资源可以更早的得到加载并可用，且更不易阻塞页面的初步渲染，进而提升性能。<link href="/js/xxx.js" rel="preload" as="script"> 需要 as 指定资源类型，目前可用的属性类型有如下：
    
               audio: 音频文件。
               document: 一个将要被嵌入到<frame>或<iframe>内部的HTML文档。
               embed: 一个将要被嵌入到<embed>元素内部的资源。
               fetch: 那些将要通过fetch和XHR请求来获取的资源，比如一个ArrayBuffer或JSON文件。
               font: 字体文件。
               image: 图片文件。
               object: 一个将会被嵌入到<embed>元素内的文件。
               script: JavaScript文件。
               style: 样式表。
               track: WebVTT文件。
               worker: 一个JavaScript的web worker或shared worker。
               video: 视频文件。
            ```



# HTTP

## TCP

1. 拥塞控制

   1. 数据包守恒原则

      在一个运行平稳的TCP连接中流动的数据包应该是守恒的，意思是只有旧的数据包被成功传输到对端后，新的数据报才能被加入到连接中。在TCP协议中，我们可以使用ack来作为判断数据包是否已经成功到达对端的依据。就是说发送端收到good ack（大于发送端当前已经收到的最大ack的ack）时，它就可以发送新的数据包了。这种根据ack来决定继续发送数据包的机制叫做 self locking。

   2. 慢启动

   3. 拥塞避免

   1. http特点

   2. 不安全

         1. 机密性

            是指对数据的'保密'，只能由可信的人访问，对其他人是不可见的秘密，简单来说就是不能让不相关的人看到不该看的东西。

         	2. 完整性

             指在数据传输的过程中没有被篡改，不多也不少，完完整整地保持着原状。

         	3. 身份认证

             指确认对方的真实身份，也就证明你真的是你，保证消息只能发送给可信的人。

         	4. 不可否认

             不能否认过已发生的行为，不能说话不算数。

   	3. https解决方法

          	1. 机密性由对称加密AES保证，完整性由SHA384摘要算法保证，身份认证和不可否认由RSA非对称加密保证。



# Seq(序列号),Ack(确认号),Syn(同步序列号)

# HTTP1.1

缺点

1. 队头阻塞：TCP连接上只能发送一个请求，请求的前面未完成前，后续的请求都在排队等待

2. 多个TCP连接

   虽然HTTP1.1管线化可以支持请求并发，但是浏览器很难实现，chrome，firefox等都禁用了管线化。所以1.1版本请求并发依赖于多个TCP连接，建立TCP连接成本高，还会存在启动慢的问题（域名分片技术）

3. 头部冗余，采用文本格式

   HTTP1.1版本是采用文本格式，首部未压缩，而且每一个请求都会带上cookie，user-agent等完全相同的首部

# HTTP2.0

 https://mp.weixin.qq.com/s/GICbiyJpINrHZ41u_4zT-A 

 https://http2.akamai.com/demo 

 [https://www.cnblogs.com/riwang/p/12370785.html#http2%e6%96%b0%e5%a2%9e%e9%a6%96%e9%83%a8%e5%8e%8b%e7%bc%a9header-compression%e9%87%87%e7%94%a8hpack%e7%ae%97%e6%b3%95](https://www.cnblogs.com/riwang/p/12370785.html#http2新增首部压缩header-compression采用hpack算法) 

1. 请求头压缩算法HPACK（ 通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小）

2. 新的二进制格式

3. 多路复用（信道复用）

   1. 在HTTP/2中，有两个非常重要的概念：帧（frame）和stream（流）

   2. 帧

      HTTP/2中数据传输的最小单位，因此帧不仅要细分表达HTTP/1.x的各个部分，也优化了HTTP1.x表达得不好的地方，同时还增加了HTTP1.x表达不了的方式。每一帧都包含几个字段，有length，type，flags，stream identifier、frame、payload等，其中type代表帧的类型，在HTTP/2中定义了10种不同的类型，包括HEADERS FRAME和 DATA FRAME。

   3. 流

      存在于长连接的一个虚拟通道。流可以承载双向消息，每个流都有一个唯一的整数ID。HTTP/2长连接中的数据包是不按请求-响应顺序发送的，一个完整的请求或响应（称一个数据流stream，每个数据流都有一个独一无二的编号）可能会分成非连续多次发送，

   4. 同一个TCP连接可以发送多个请求，对端可以通过帧中的标识知道属于哪个请求，通过这个技术，可以避免HTTP旧版本中的对头阻塞的问题，极大地提高性能

4. 服务端推送

# HTTPS

1. http报文传输过程中是文明的，可以通过抓包的方式看到报文内容，这就暴露了一个安全问题，易被劫持篡改。
2. 特点：
   1. 内容加密
   2. 验证身份
   3. 保护数据完整性
3. 为了解决这个问题，有了TLS，https = http + TLS
4. TLS：安全传输层协议，用于在两个通信应用程序之间提供保密性和数据完整性。该协议由两层组成，TLS记录协议和TLS握手协议
5. TLS利用非对称加密演算来对通信方做身份认证，之后交换对称密钥作为会谈密钥。
6. 因此https分为两个阶段
   1. 通过非对称加密确认对方身份是否合法，若合法则生成会话密钥（这一步是核心）
   2. 报文的在发送前，先用会话密钥进行对称加密，再传输
7. TLS握手步骤如下：
   1. 客户端请求服务器建立SSL连接，服务端并向客户端发送一个随机数randomC和CA机构颁发的证书
   2. 客户端对证书进行验证，验证通过后，生成一个随机数randomS，用公钥对randomS加密，同时用randomS生成一段签名，发送给服务端。
   3. 服务端接收到后，用私钥来对密文解密，用解密后的key生成签名，并与客户端传来的签名进行比较，检验通过后，生成一个随机数randomP，并用私钥加密，还有随机数生成的hash值，一并发给客户端。
   4. 客户端用公钥解密，并检验hash值通过后，两端利用randomC，randomS，randomP通过一定的算法生成session Key， 后续的报文将通过session Key对称加密进行传输。
8. 验证对方身份的时候使用非对称加密，通信的时候使用对称加密。
   1. 客户端向服务端发起https请求。发送的信息主要是一个随机数1和客户端支持的密码套件（支持的加密算法和TLS版本）。
      1. 密码套件决定了本次连接采用哪一种**密钥交换算法**、**签名算法**、**对称加密算法（ DES，AES ）**、**摘要算法**。
      2. 
      3. 密钥交换算法：
         1. RSA
            1. 客户端向服务器发起请求连接，服务器发送RSA密钥对应的公钥给客户端
            2. 客户端通过生成随机数生成器生成一个预备主密钥，用服务器的公钥加密并发送给服务端
            3. 服务端解密预备主密钥，加入能够正确解密，则说明服务器与客户端共同协商出一个预备主密钥
         2. DH算法
            1. 静态
            2. 临时（EDH）可以预防前向安全性
      4. 'ECDHE-RSA-AES256-GCM-SHA384'
         1. 握手时使用ECDHE算法进行密钥交换，用RSA签名和身份认证，握手后的通信使用AES对称算法，密钥长度256位，分组模式是GCM，摘要算法SHA384用于消息认证和产生随机数
   2. 服务端响应请求，发送证书和随机数2和协商出的密码套件
   3. 客户端解析证书，由客户端的TLS完成，验证步骤主要如下
      1. 首先验证公钥是否有效
      
      2. 还有颁发机构CA和过期时间
      
      3. 证书的持有者
      
      4. 签名
      
      5. 验证通过的话，客户端生成一个随机数3
      
      6. 证书验证方法：
      
         1. CRL
      
            即证书撤销名单。证书颁发者会提供一份已经失效证书的名单，供浏览器验证证书使用。当然这份名单是巨长无比的，浏览器不可能每次都TLS去下载，所以常用的方法就是浏览器会缓存这份名单，定期后台做更新。这样虽然后台更新时间存在间隔，证书失效不实时，但一般也OK
      
         2. OCSP
      
            即在线证书状态协议。除离线文件外，证书颁发者也会提供实时的查询接口，查询某个特定证书目前是否有效。实时查询的问题在于浏览器是否需要等待这个查询结束才能继续TLS握手，延迟会更大。
      
      7. 防止证书伪造
      
          https://cloud.tencent.com/developer/article/1646277 
      
          HSTS（HTTP Strict Transport Security，RFC6797） 
      
         1. CA会有意无意签发错误证书，没有正确审核申请者身份
         2. 冒充伪造域名拥有者，申请证书
         3. 域名拥有者不知晓哪些CA机构给他签发了证书
      
         解决方法
      
         1. Expect-CT
      
            为了确保浏览器能在访问到缺少CT监督的证书时采取措施，google提案增加了一个新的 Expect-CT HTTP header,该HTTP Header 用来告诉浏览器期望使用证书透明度服务。Expect-CT CT头部允许站点选择报告或强制执行证书透明度要求，这可以防止站点证书错误被忽视的情况。当站点启用 Expect-CT CT Header时，浏览器会检查该站点使用的证书是否出现在公共CT日志中，这能有效避免中间人攻击等HTTPS威胁。
   4. 客户端将随机值1，随机值2，随机值3生成预备主密钥通过证书的公钥加密，并传送给服务端
   5. 服务端用自己的私钥进行非对称解密得到客户端密钥
   6. 服务端用预备主密钥对发送内容进行对称加密发送给客户端。
   7. 客户端收到服务器发送来的密文，用预备主密钥来对其进行对称解密。得到所需要的数据。



# 前端安全

## XSS

1. 跨站脚本攻击，攻击者将一段可执行的代码注入到网页中，如链接，输入框，分为持久性和临时性的，持久性的恶意代码将被存储到数据库中，会造成持久的攻击，临时性的仅在当前被攻击页面上生效。
2. 防范方式：对与网页上获取的内容要做转义处理

## CSRF

1. 跨站请求伪造，构造一个钓鱼网站，利用站点对浏览器的信任，从而欺骗用户发起请求进行恶意操作。
2. 把用户的cookies带上，伪造用户身份进行攻击
3. 防范方式：
   1. 服务端校验Referer，但某些浏览器可能可以修改Referer



# NODE 和 ELEMENT

1. Node是一个基类，DOM中的Element，Text和Comment都继承于它
2. 分别叫它们为ELEMENT_NODE和TEXT_NODE和COMMENT_NODE，

# COOKIE

1. 解决HTTP无状态的问题
2. 无状态协议：HTTP1.x
   1. 同一个客户端连续发送两次请求给服务器，服务器识别不出这是同一个客户端发送的请求，你加入一个商品到购物车页面，但是识别不出是同一个客户端，你刷新下页面就没有了
3. SameSite:
   1. 该属性可以让Cookie在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击(CSRF)
   2. 属性值：
      1. Strict仅允许一方携带Cookie，即浏览器将只发送相同站点请求的Cookie，即当前网页URL与请求目标URL完全一致
      2. Lax允许部分第三请求携带Cookie
      3. None无论是否跨站请求伪造攻击都会携带Cookie
   3. 之前默认是None 但Chrome80之后默认是Lax
   4. 跨域和跨站
      1. [同站/跨站]和[第一方/第三方]是等价的。但是与浏览器同源策略中的[同源/跨域]是完全不同的概念
      2. 同源策略的同源是指两个URL的协议/主机名/端口一致
      3. 同源策略作为浏览器的基石，其[同源]判断是比较严格的，相对而言，Cookie中的[同站]判断就较为宽松：只要两个URL的eLTD + 1相同即可，不需要考虑协议和端口，其中，eLTD表示有效顶级域名，注册于Mozilla维护的公共后缀列表（Public Suffix List）中，例如，.com .co.uk .github.io等，其中eLTD + 1表示，有效顶级域名 + 二级域名，例如taobao.com 就表示一个 eLTD + 1
      4. www.taobao.com 和 www.baidu.com 是跨站
      5. www.a.taobao.com和www.b.taobao.com是同站
      6. a.github.io 和 b.github.io是跨站
4. 安全
   1. Cookie篡改
      1. 通过浏览器控制台或者js代码进行修改 httpOnly，不能通过js操控cookie
      2. Cookie劫持，HTTP明文传输，容易被窃取到
      3. Cookie作用域
         1. Domain
         2. Path
      4. 对Cookie数据签名，如果被篡改，服务端使用的时候通过校验签名

# new的原理

1. new的操作
   1. 创建了一个空对象
   2. 将构造函数的prototype属性赋值给新对象的__ __proto____ 属性
   3. 将构造函数的this指向新对象
   4. 执行构造函数的代码
   5. 将新对象返回

```javascript
function Cat(name) {
    this.name = name
}

var cat = (function (name) {
    var obj = {}
    obj.__proto__ = Cat.prototype
    Cat.call(obj, name)
    return obj
})('cat1')
console.log("cat", cat)

function _new(func, ...args) {
    // 1.创建实例对象
    let obj = {};
    obj.__proto__ = Func.prototype;
    // 2.把方法执行，让里面的this是实例对象
    let result = func.apply(obj, args);
    // 3. 分析返回结果
    if (result !== null && /^(object|function)$/.test(typeof result)) {
        return result
    }
    return obj;
}
```

# 手写call

```javascript
~function() {
    function change(ctx, ...args) {
        // this => func
       	ctx = ctx == undefined ? window : ctx;
        const isObject = /^(function|object)$/.test(typeof ctx);
        const isSymbol = /^(symbol|bigint)$/.test(typeof ctx);
        // 传的是基本类型值
        if (!isObject) {
            if (isSymbol) {
                ctx = Object(ctx)
            } else {
                ctx = new ctx.__proto__.constructor(ctx);
            }
            
        }
        const key = Symbol('key');
        ctx[key] = this;
        const result = ctx[key](...args);
        delete ctx[key];
        return result;
    }
}()
```



# 手写bind

```javascript
~function () {
    function bind(ctx, ...args) {
        // this => func
       	ctx = ctx == undefined ? window : ctx;
        const isObject = /^(function|object)$/.test(typeof ctx);
        const isSymbol = /^(symbol|bigint)$/.test(typeof ctx);
        // 传的是基本类型值
        if (!isObject) {
            if (isSymbol) {
                ctx = Object(ctx)
            } else {
                ctx = new ctx.__proto__.constructor(ctx);
            }
            
        }
        return (...innerArgs) => {
            this.apply(ctx, args.concat(innerArgs));
        }
    }
}()

```



# 箭头函数

1. 箭头函数的this指向箭头函数***定义时***离自己最近的不是箭头函数的this

2. ``` javascript
   function outer() {
       console.log('outer', this)
       const buy = () => {
           console.log('buy', this)
       }
       
       function innerCall() {
           console.log("innerCall", this)
           buy()
       }
   }
   ```

# 深拷贝

```javascript
/*
 * JSON.stringify
 * 1. 正则 -> 空对象
 * 2. BigInt -> 报错
 * 3. symbol/undefined/function -> 直接没了
 *
 */

function cloneDeep(obj) {
    // 验证类型
    if (obj === null) {
        return null;
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }
    let clone = new obj.__proto__.constructor;
    Object.keys(obj).forEach((it) => {
        clone[key] = cloneDeep(obj[key]);
    })
    return clone;
}
```





# 防抖和节流

1. 防抖：一个事件在n秒后执行，如果你在一个事件触发的n秒内又触发了这个事件，那我就以新的事件的事件为准，n秒后才执行。总之，要等你触发完事件n秒后不再触发事件。该事件才执行

   ```javascript
   function debounce1(func, wait, immediate = false) {
       var timeout;
       var result;
       var debounced = function() {
         var context = this
         var args = arguments
           // console.log("args", args);
         if (timeout) {
           clearTimeout(timeout)
         }
         if (immediate) {
           // 让第一次立马执行
           var callNow = !timeout
             // 然后等到停止触发 n 秒后，才可以重新触发执行。
           timeout = setTimeout(function() {
             timeout = null
           }, wait)
           if (callNow) {
             result = func.call(context, ...args)
           }
         } else {
           timeout = setTimeout(() => {
             func.call(context, ...args)
           }, wait)
         }
         return result
       }
       return debounced
     }
   
   ```
   
   2. 节流：如果你持续触发事件，每隔一段时间，只执行一次事件。
   
      根据首次是否执行以及结束时是否执行，效果有所不同，实现的方式也有所不同，我们用leading代表首次是否执行，trailing代表结束后是否再执行一次
   
      关于节流的实现，有两种主流的实现方式，一种是使用时间戳，一种是设置定时器。
   
      1. 使用时间戳
   
         ```javascript
         function throttle(func, wait) {
             var context, args;
             var previous = 0
             return function() {
               context = this
               args = arguments
               var now = +new Date()
               if (now - previous > wait) {
                 func.call(context, [...args])
                 previous = now
               }
             }
           }
         ```
   
      2.  第一种事件会立刻执行，  第一种事件停止触发后没有办法再执行事件。
   
      3. 使用定时器
   
         ```javascript
         function throttle1(func, wait) {
             var context, args;
             var timeout
             return function() {
               context = this
               args = arguments
               if (!timeout) {
                 timeout = setTimeout(function() {
                   func.call(context, [...args])
                   timeout = null
                 }, wait)
               }
             }
           }
         ```
   
      4.  第二种事件会在 n 秒后第一次执行 ，第二种事件停止触发后依然会再执行一次事件 。
   
      5. 双剑合璧
   
         ```javascript
         鼠标移入能立马执行，停止触发的时候还能执行一次
         function throttle(func, wait) {
             var context, args, result, timeout;
             var previous = 0
             var later = function() {
                 previous = +new Date()
                 timeout = null
                 func.call(context, [...args])
             }
             
             var throttled = function () {
                 var now = +new Date()
                 // 下次触发func 剩余的时间
                 var remaining = wait - ( now - previous)
                 context = this
                 args = arguments
                  // 如果没有剩余的时间了或者你改了系统时间
                 if (remaining <= 0 || remaining > wait) {
                     if (timeout) {
                         clearTimeout(timeout);
                         timeout = null;
                     }
                     previous = now;
                     func.apply(context, args);
                 } else if (!timeout) {
                     timeout = setTimeout(later, remaining);
                 }
             }
             return throttled
         }
         ```
   



# GET和POST的区别

 	1. 首先引入等觅和副作用的概念
      	1. 副作用：对服务器上的资源作改变，搜索是无副作用的，注册是副作用的
      	2. 幂等：指发送M和N次请求，服务器上的状态一致，注册10个和11个账号是不幂等的，对文章进行查询10次和11次是幂等的
	2. get主要用于无副作用，幂等的场景
	3. post主要用于副作用，不幂等的情况
	4. get请求能缓存，post不能
	5. post请求数据放在body里面，get请求数据放在url里面
	6. get请求url长度有限制，主要是看浏览器限制
	7. post支持更多的编码类型
        	1. Content-Type: application/json
                  	2. Content-Type:  application/x-*www*-form-*urlencoded* 
                	3. Content-Type: multipart/form-data



vue-router源码：

1. 首先实现一个install方法

   1. 往this挂载this.$router和this.$route

   2. Vue.mixin({

      })

   3. 注册两个全局组件
      ```html
      1. <router-view></router-view>
      2. <router-link></router-link>
      ```

   ```javascript
   // 注入 $router $route
     Object.defineProperty(Vue.prototype, '$router', {
       get () { return this.$root._router }
     })
   
     Object.defineProperty(Vue.prototype, '$route', {
       get () { return this.$root._route }
     })
     // beforeCreate mixin
     Vue.mixin({
       beforeCreate () {
         // 判断是否有 router
         if (this.$options.router) {
             // 赋值 _router
           this._router = this.$options.router
           // 初始化 init
           this._router.init(this)
           // 定义响应式的 _route 对象
           Vue.util.defineReactive(this, '_route', this._router.history.current)
         }
       }
     })
   
     // 注册组件
     Vue.component('router-view', View)
     Vue.component('router-link', Link)
   ```

   

2. 创建match匹配函数

   1. 匹配函数是由src/create-matcher.js中的createMatcher创建的

      ```javascript
      import Regexp from 'path-to-regexp'
      // ...
      import { createRouteMap } from './create-route-map'
      // ...
      
      export function createMatcher (routes: Array<RouteConfig>): Matcher {
        // 创建路由 map
        const { pathMap, nameMap } = createRouteMap(routes)
        // 匹配函数
        function match (
          raw: RawLocation,
          currentRoute?: Route,
          redirectedFrom?: Location
        ): Route {
      // ...
        }
      
        function redirect (
          record: RouteRecord,
          location: Location
        ): Route {
      // ...
        }
      
        function alias (
          record: RouteRecord,
          location: Location,
          matchAs: string
        ): Route {
      // ...
        }
      
        function _createRoute (
          record: ?RouteRecord,
          location: Location,
          redirectedFrom?: Location
        ): Route {
          if (record && record.redirect) {
            return redirect(record, redirectedFrom || location)
          }
          if (record && record.matchAs) {
            return alias(record, location, record.matchAs)
          }
          return createRoute(record, location, redirectedFrom)
        }
        // 返回
        return match
      }
      // ...
      
      ```

   2. 继续来看src/create-route-map.js中的createRouteMap函数

      1. 可以看出主要做的事情就是根据用户路由配置对象生成普通的path来对应的路由记录以及根据name来对应的路由记录的map，方便后续匹配对应

      ```vue
      /* @flow */
      
      import { assert, warn } from './util/warn'
      import { cleanPath } from './util/path'
      
      // 创建路由 map
      export function createRouteMap (routes: Array<RouteConfig>): {
        pathMap: Dictionary<RouteRecord>,
        nameMap: Dictionary<RouteRecord>
      } {
        // path 路由 map
        const pathMap: Dictionary<RouteRecord> = Object.create(null)
        // name 路由 map
        const nameMap: Dictionary<RouteRecord> = Object.create(null)
        // 遍历路由配置对象 增加 路由记录
        routes.forEach(route => {
          addRouteRecord(pathMap, nameMap, route)
        })
      
        return {
          pathMap,
          nameMap
        }
      }
      
      // 增加 路由记录 函数
      function addRouteRecord (
        pathMap: Dictionary<RouteRecord>,
        nameMap: Dictionary<RouteRecord>,
        route: RouteConfig,
        parent?: RouteRecord,
        matchAs?: string
      ) {
        // 获取 path 、name
        const { path, name } = route
        assert(path != null, `"path" is required in a route configuration.`)
        // 路由记录 对象
        const record: RouteRecord = {
          path: normalizePath(path, parent),
          components: route.components || { default: route.component },
          instances: {},
          name,
          parent,
          matchAs,
          redirect: route.redirect,
          beforeEnter: route.beforeEnter,
          meta: route.meta || {}
        }
        // 嵌套子路由 则递归增加 记录
        if (route.children) {
      // ...
          route.children.forEach(child => {
            addRouteRecord(pathMap, nameMap, child, record)
          })
        }
        // 处理别名 alias 逻辑 增加对应的 记录
        if (route.alias !== undefined) {
          if (Array.isArray(route.alias)) {
            route.alias.forEach(alias => {
              addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
            })
          } else {
            addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
          }
        }
        // 更新 path map
        pathMap[record.path] = record
        // 更新 name map
        if (name) {
          if (!nameMap[name]) {
            nameMap[name] = record
          } else {
            warn(false, `Duplicate named routes definition: { name: "${name}", path: "${record.path}" }`)
          }
        }
      }
      
      function normalizePath (path: string, parent?: RouteRecord): string {
        path = path.replace(/\/$/, '')
        if (path[0] === '/') return path
        if (parent == null) return path
        return cleanPath(`${parent.path}/${path}`)
      }
      ```

   3. #### router.init

      ```javascript
      /* @flow */
      
      import { install } from './install'
      import { createMatcher } from './create-matcher'
      import { HashHistory, getHash } from './history/hash'
      import { HTML5History, getLocation } from './history/html5'
      import { AbstractHistory } from './history/abstract'
      import { inBrowser, supportsHistory } from './util/dom'
      import { assert } from './util/warn'
      
      export default class VueRouter {
      // ...
        init (app: any /* Vue component instance */) {
      // ...
          this.app = app
      
          const history = this.history
      
          if (history instanceof HTML5History) {
            history.transitionTo(getLocation(history.base))
          } else if (history instanceof HashHistory) {
            history.transitionTo(getHash(), () => {
              window.addEventListener('hashchange', () => {
                history.onHashChange()
              })	
            })
          }
      
          history.listen(route => {
            this.app._route = route
          })
        }
      // ...
      }
      // ...
      ```




# Vue原理

1. 广度优先遍历还是深度优先遍历？为什么
   
   1. 是广度优先算法
2. virtual dom 解决的问题
   1. virtual dom是什么
   
      1. js对象
   
         ```javascript
         var virtualDom = {
             tag: 'div',
             props: {
                 attr: {
                     id: 'app'
                 }
             },
             children: [
                 {
                     tag: 'p',
                     props: {},
                     children: ['test']
                 }
             ]
         }
         ```
   
         
   
   2. virtual dom的好处
   
      1. 渲染引擎、JS引擎相互独立，但又工作在同一线程（主线程），JS代码调用DOM api，必须挂起JS引擎，转换传入参数，激活渲染引擎，DOM重绘后再转换可能有的返回值，最后激活js引擎并继续执行若有频繁的 DOM api 调用，且有的浏览器厂商不做'批量处理'优化，可能出现强制同步布局的代码
   
      2. vue 1.0 是没有引入虚拟DOM，且vue1.0的watcher级别是组件data的一个key对应一个watcher，如果对应组件的data的key更新，则整个全部更新。这也是vue1.0项目支撑不了大项目的原因
   
      3. vue2.0引入虚拟DOM，但是有人说vue2.0的watcher级别已经是一个组件对应一个watcher，但有人又说，那如果组件data的任一key更新的时候，还不是要更新整个页面，这就是vue为什么要引入virtual dom的原因，首次vue渲染，new Vue的时候，我们会执行  _init方法，对于平常我们的vue/cli项目，大概执行 _init函数的流程就是将new Vue的options合并配置，然后最后执行 $mount函数
   
      4. 执行$mount函数，然后$mount函数的作用是主要判断el是不是html/body节点，如果是编译器版本，则根据template生成render函数。第二个$mount函数主要执行mountComponent方法
   
      5. mountComponent方法主要调用beforeMount钩子，然后定义updateComponent函数，
   
         ```javascript
         const updateComponent = () => {
             vm._update(vm._render(), hydrating)
         }
         // 然后new Wathcer 为全局的一个渲染watcher
         new Watcher(vm, updateComponent, noop, {
             before() {
                 if (vm._isMounted && !vm._isDestroyed) {
                 	callHook(vm, 'beforeUpdate')
                 }
             }
         })
         ```
   
      6. new Watcher之后，执行constructor的逻辑，发现第二个函数为参数的时候，执行watcher的get方法
   
         ```javascript
         if (typeof expOrFn === 'function') {
             this.getter = expOrFn;
         } else {
             // 'a.b.c'
             
         }
         
         get() {
             pushTarget(this);
             // 执行updateComponent函数
             value = this.getter.call(vm, vm);
         }
         
         ```
   
      7. 执行 _update 方法，首先调用 _render方法，调用的时候，会收集模板的key，这个时候Watcher的targetStack里面存有一个渲染watcher，然后对应的data的key，会调用dep.depend()方法
   
         ```javascript
         class Dep{
             constructor() {
                 this.subs = [];
             }
             
             addSub(sub: Watcher) {
                 this.subs.add(sub)
             }
             
             depend() {
                 if (Dep.target) {
                     Dep.target.append(this);
                 }
             }
             
             notify() {
                 const subs = this.subs.slice();
                 for (let i = 0; l = subs.length; i < l; i ++) {
                     subs[i].update();
                 }
             }
         }
         
         class Watcher {
             addDep (dep: Dep) {
                 this.newDepIds.push(id);
                 this.newDeps.push(dep);
                 if (!this.depIds.has(id)) {
                     dep.addSub(this)
                 }
             }
             
             update() {
                 if (this.lazy) {
                     this.dirty = true;
                 } else if (this.sync) {
                     this.run();
                 } else {
                     queueWatcher(this)
                 }
             }
         }
         ```
         
      8. dep和watcher是多对多的结构，因为data里面的一个key可能对应对应两个watcher，即一个父组件的data当成props传到了子组件，当data里的这个key更新的时候，对应的两个watcher都要更新，即调用watcher.update方法
      
      9. ```javascript
         // schedule.js
         // 定义了一个queue
         // 将需要更新的watcher全部push到queue
         // flushSchedulerQueue
         // 真正执行watcher.update() 方法
         // nextTick函数 next-tick.js 在文件里定义了一个callbacks
         export function nextTick(cb, ctx) {
             let _resolve;
             callbacks.push(() => {
                 if (cb) {
                     try {
                         cb.call(ctx);
                     } catch(e) {
                         handleError(e, ctx, 'nextTick')
                     }
                 } else if (_reslove) {
                     _resolve(ctx);
                 }
             })
             if (!pending) {
                 pending = true;
                 timerFunc();
             }
         }
         ```
      
      10. 
   
3. MVVM 和 MVC的比较
   
   1. MVVM怎么实现的

# Vue生命周期



# React Shadow Dom



# 洋葱模型解决的问题



# React-redux



# ES5	ES6	ES7的区别

1. async await 和 Promise 的区别

# Babel 和 Webpack的区别



# React 和 Vue 的区别

1. 写法

   1. vue

      template -> vue-loader 转换成render函数

   2. react

      JSX -> createElement(JSX)

2. 数据流

   1. vue双向数据流

      ```javascript
      updateComponent = () => {
          vm._update(vm._render())
      }
      mountComponent -> new Watcher(vm, updateComponent)
      watcher.get() 
      pushTarget(this) => 将全局的渲染watcher放到targetStack里面 此时Dep.target = new Watcher
      updateComponent() => ininState() => 每个data下对应的key => 如果在模板中出现 => 每个key对应一个dep 且 dep下有一个subs属性，这里面存储订阅者，即一个个watcher。
      更新的过程
      对应的key变化 => 触发dep.notify() => 遍历subs执行每一个 watcher.update() 方法 => 
      schedule.js => 全局存储queue对象
      queueWatcher() 去重操作 => nextTick(flushSchedulerQueue) => 执行
      ```

   2. 单向数据流

# 函数的四种调用模式及this指向



1. ``` javascript
   // 函数调用模式
   function fn() {
       console.log(this)
   }
   fn()  // window
   ```

2.   ```javascript
   // 方法调用模式
   var obj = {
       func: function () {
           
           console.log(this)
       }
   }
   
   obj.func() // obj
   
   var func = obj.func
   func() // window
   ```

3. ```javascript
   // 上下文调用模式
   var arrayLike = {
       0: 'zs',
       1: 'ls',
       2: 'ww',
       length: 3
   }
   
   Array.prototype.push.call(arrLike, 'Darren')
    
   ```

4. ```javascript
   // 特殊的
   事件中的this 指向当前元素
   setTimeout 中的this 指向window
   ```

5.  ```javascript
   function fn() {
       const fn1 = () => {
           console.log(this)
       }
       fn1()
       return () => {
           console.log(this, 'this2')
       }
   }
   let obj = {
       name: "Darren"
   }
   fn().call(obj)
   ```






# window.onload / $(document).ready/ DOMContentLoaded

1. $(document).ready() 表示dom内容加载完毕 = window.addEventListener("DOMContentLoaded", function(){})
2. window.onload 表示页面上的所有资源（图片，音频，视频）被加载以后才会触发load事件。



# TCP/UDP对比

|              | UDP                                        | TCP                              |
| ------------ | ------------------------------------------ | -------------------------------- |
| 是否连接     | 无连接                                     | 面向连接                         |
| 是否可靠     | 不可靠传输，不可使用流量控制和拥塞控制     | 可靠传输，使用流量控制和拥塞控制 |
| 连接对象个数 | 支持一对一，一对多，多对一和多对多交互通信 | 只能是一对一通信                 |
| 传输方式     | 面向报文                                   | 面向字节流                       |
| 首部开销     | 首部开销小，仅8字节                        | 首部最小20字节，最大60字节       |
| 场景         | 适用于实时应用，（IP电话，直播，视频会议） | 文件传输                         |
| 流量控制     | 无                                         | 滑动窗口                         |
| 传输速度     | 快                                         | 慢                               |

 https://segmentfault.com/a/1190000021815671 

## TCP

1. TCP是面向连接的、可靠的流协议。流就是指不间断的数据结构，当应用程序采用TCP发送消息时，虽然可以保证发送的顺序，但还是犹如没有任何间隔的数据流发送给接收端。

   TCP是面向字节流，虽然应用程序和TCP的交互是一次一个数据块（大小不等），但TCP把应用程序看成



## TCP和UDP的区别，字节流和字符流的区别

# AMD/CMD/CommonJs/ES6 module

1. AMD

   1. AMD一开始是CommonJS规范中的一个草案，全称是Asynchronous Module Definition , 即异步模块加载机制，后来该草案的作者以RequireJS实现了AMD规范，所以一般说AMD也是指RequireJS

   2. ```javascript
      // a.js
      // define 可以传入三个参数、分别是字符串--模块名，数组--依赖模块，函数--回调函数
      define(function (){
          return 1
      })
      
      // b.js
      // 数组中声明需要加载的模块，可以是模块名，js文件路径
      require(['a'], function (a) {
          console.log(a) // 1
      })
      
      ```

   3. 特点

      1. 对于依赖的模块，AMD推崇依赖前置，提前执行，也就是说，在define方法里传入的依赖模块（数组），会在一开始就下载并执行。

2. CMD

   1. CMD是Seajs在推广过程中生产的对模块定义的规范，在Web浏览器端的模块加载器中，SeaJS与RequireJS并称，SeaJS作者为阿里的玉伯

   2. ```javascript
      // a.js
      /* 
       * define接受factory参数，factory可以为一个参数，也可以是一个对象或者字符串
       * factory为对象时、字符串时，表示模块的接口就是该对象或者字符串
       * define也接受两个以上的参数，字符串id表示模块标识，数组deps是模块依赖
      */
      
      define(function(require, exports, module) {
          var $ = require("jquery");
          
          exports.setColor = function() {
              $('body').css("color", "green")
          };
      })
      
      // b.js
      seajs.use(['a'], function(){
          $("#el").click(a.setColor)
      })
      
      ```

   3. 特点

      1. 对于依赖的模块，CMD推崇依赖就近，延迟执行，也就是说，只有到require时依赖模块才执行。

3. CommonJS

   1. CommonJS规范为CommonJS小组所提出，目的时弥补Javascript在服务器端缺少模块化机制，NodeJS、Webpack都是基于该规范来实现的。

   2. ```javascript
      // a.js 
      module.export = function() {
          console.log("hello world")
      }
      
      // b.js
      var a = require("a.js")
      a(); // hello world
      
      
      // or
      
      // a2.js
      exports.num = 1
      exports.obj = {
          name: 'DARREN'
      }
      
      // b2.js
      
      var a2 = require("a2.js")
      console.log(a2) {num:1， obj: { name: "DARREN"}}
      ```




# Event Loop

1. Javascript 有一个主线程和调用栈（执行栈），所有的任务都会被放到调用栈中等待主线程进行
2. JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的底部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。
3. Javascript单线程任务会被分为同步任务和异步任务，同步任务会在调用栈中按照顺序等待主线程一次执行，异步任务会在异步任务有了结果之后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行
4. 执行栈在执行完同步任务后，查看执行栈是否为空，如果执行栈为空，就会去检查微任务队列是否为空，如果为空，就去执行宏任务，否则就一次性执行完所有微任务。
5. 每次单个宏任务执行完之后，会检查微任务队列是否为空，如果不为空的话，会按照先入先出的规则执行完所有的微任务后，然后再执行宏任务，如此循环。

# EventLoop(1)

 https://segmentfault.com/a/1190000016278115 

1. 执行全局Script同步代码，这些同步代码有一些是同步语句，有一些是异步语句。
2. 全局Script代码执行完毕后，调用栈被清空。
3. 从微任务队列microstack queue中取出位于队首的回调任务，放入调用栈中执行，执行完之后microstack queue长度减1
4. 继续取出队首的任务，放入调用中执行，以此类推，直到把microstack queue中的所有任务都执行完毕。注意，如果在执行microstack的过程中，又产生了microstack，那么会加入到队列的末尾，也会在这个执行周期内执行；
5. microstack queue中的所有任务被执行完之后，此时microstack queue为空队列，调用栈也为空。
6. 取出macrostack queue中位于队首的任务，放入调用栈中执行
7. 执行完毕之后，调用栈为空
8. 重复3-7步骤

## 重点

	1. 一次只执行一个宏任务
 	2. 微任务队列的任务都会被依次取出并执行
 	3. UI render一般是在执行完所有的microstack之后，执行macrostack之前，由浏览器厂商决定。





## 隐式转换

1. 左右两边类型一样
   1. {} == {} false 引用值比较的是堆内存的地址
   2. [] == [] false 
   3. NaN == NaN false
2. 左右两边类型不一样
   1. null  == undefined  => true 剩余 null 、undefined和其他任何数据类型都不相等
   2. 字符串 == 对象  要把对象转换为字符串
   3. 余下的，都是需要两边转成数字再作比较



## 跨域

1. 为什么会有跨域？
   1. 浏览器同源策略，相同协议，相同主机名，相同端口号，才视为同源。
   2. 主要是为了防止CSRF攻击的，简单点说，CSRF就是攻击就是利用用户的登录态发起恶意请求
2. 简单请求
   1. 请求方法为get/head/post
   2. post请求的Content-Type并非application/x-www-urlencoded，multipart/form-data，或text/plain;
   3. 请求设置了自定义的header字段（可允许：Accept, Accept-Language，Content-Language, Content-Type）;
3. 解决办法
   1. 代理转发 proxy
   2. websocket
   3. jsonp
   4. iframe + contentWindow
   5. iframe + window.name  要求同域名
   6. 



# 表单跨域

1. enctype: 'application/x-www-form-urlencoded'、'multipart/form-data'、'text/plain';
2.  https://moxo.io/blog/2016/11/12/html-form-submit-urlencode-and-multipart-formdata/ 



# aysnc和promise的区别

1.  https://v8.js.cn/blog/fast-async/ 



# 观察者模式

观察者模式指的是一个对象（Subject）维持一系列依赖于它的对象（Observer），当有关状态发生变更时，Subject对象则通知一系列Observer对象进行更新

在观察者模式中，Subject对象拥有添加、删除和通知等一系列Observer的方法，而Observer拥有更新方法等。

在Subject对象添加了一系列Observer对象之后，Subject对象则维持着这一系列Observer对象，当有关状态发生变更时，Subject对象则会通知这一系列Observer对象进行更新

1. ```javascript
   function Subject() {
       this.observers = [];
   }
   
   Subject.prototype = {
       constructor: Subject,
       add(observer) {
           this.observes.push(observer);
       },
       remove(observer) {
           const observers = this.observers;
           if (Array.isArray(observers)) {
           	for (let i = 0; i < observers.length) {
                   if (observers[i] === observer) {
                       observers.splice(i, 1);
                   }
               }
           }
       },
       notify() {
           const observers = this.observers;
           for (let i = 0; i < observers.length; i ++) {
               observers[i].update()
           }
       }
   }
   
   
   function Observer(name) {
       this.name = name;
   }
   
   Observer.prototype = {
       constructor: Observer,
       update() {
           console.log(`my name is ${this.name}`)
       }
   }
   
   const sub = new Subject();
   let ob1 = new Observer('ob1');
   let ob2 = new Observer('ob2');
   sub.add(ob1);
   sub.add(ob2);
   sub.notify();
   
   ```



# JS运行时V8做的一系列事

1.  https://ui.dev/ultimate-guide-to-execution-contexts-hoisting-scopes-and-closures-in-javascript/?spm=ata.13261165.0.0.2d8e16798YR8lw 

2. 创建函数执行上下文，每个函数上下文都有Creation和Execution阶段。

   在Create阶段，JavaScript引擎将

   1. 创建一个全局对象
   2. 创建一个名为'this'的对象
   3. 设置变量和函数的存储空间
   4. 将任何函数声明放入内存中，为变量声明分配默认值undefined

   ```javascript
   var name = 'Darren';
   var handle = '@email.com'
   function getUser() {
       return {
           name: name,
           handle: handle,
       }
   }
   
   /*
   Global Execution Context
   Phase: Creation
   
   window: Golbal Object
   this: window
   name: undefined
   handle: undefined
   getUser: fn
   */
   ```

3. 进入Execution阶段，JavaScript引擎便开始逐条执行代码，并将实值分配给已经存在于内存中的变量，undefined在Creation阶段为变量声明分配默认值的过程称为变量提升

4. 如遇到函数执行，JavaScript引擎都会

   1. 创建一个参数对象
   2. 创建一个名为this的对象
   3. 设置变量和函数的存储空间
   4. 在将任何函数声明放入内存中，为变量声明分配默认值undefined

   ```javascript
   /*
   getUser Execution Context
   phase: Creation
   arguments: {
       length: 0,
   }
   this: window
   */  
   ```

5. 实际上，JavaScript引擎会创建所谓的'执行堆栈'（也被称为调用堆栈）。每当调用函数时，都会创建一个新的执行上下文并将其添加到执行堆栈中，每当完成Creation和Execution阶段之后，它就会从执行堆栈中弹出。如果当前执行函数的执行上下文中不存在变量，JavaScript引擎将一步一步检查每个单独的父执行上下文的过程为Scope Chain。任何子执行上下文都可以引用其父执行上下文中任何变量，反之则不行。




# 暂时性死区

当js引擎访问变量的时候，它们的声明周期包括下面几个阶段：

1. 

只要一进入当前作用域，所要使用的变量
=======
# 函数柯里化

1. 在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

2. ```javascript
   function add(a, b) {
       return a + b;
   }
   
   add(1, 2);
   
   var addCurry = curry(add);
   addCurry(1)(2);
   function curry(fn, ...args = []) {
        const len = fn.length;
        return function() {
           let args = args.slice(0);
           args = args.concat([...arguments]);
           if (args.length < len) {
               return curry.call(this, fn, args);
           }
           return fn.apply(this, args);
        }
   }
   
   ```

3. curry的这种用途可以理解为：参数复用，本质上是降低通用性，提高适用性。

4. ```javascript
   function curry(fn, length) {
       length = length || fn.length;
       let slice = Array.prototype.slice;
       return function() {
           if (arguments.length < length) {
               let combined = [fn].concat(slice.call(arguments));
               return curry(sub_curry.apply(this, combined), length - arguments.length)
           } else {
               return fn.apply(this, arguments);
           }
       }
   }
   ```

5. ```javascript
   function curry(fn, args) {
       length = fn.length;
       args = args || [];
       return function() {
           var _args = args.slice(0);
           var arg;
           var i;
           for (let i = 0; i < arguments.length; i ++) {
               arg = arguments[i]
               _arg.push(arg);
           }
           if (_args.length < length) {
               return curry.call(this, fn, _args);
           } else {
               return fn.apply(this, _args);
           }
       }
   }
   ```

6. ```javascript
   /*
   * 将函数柯里化
   * @param fn 待柯里化的原函数
   * @param len 所需的参数个数，默认为原函数的参数个数
   *
   */
   function curry(fn, len = fn.length) {
       return _curry.call(this, fn, len)
   }
   
   /*
   * 中转函数
   * @param fn 待柯里化的原函数
   * @param len 所需的参数个数
   * @param args 已接收的参数列表
   */
   
   function _curry(fn, len, ...args) {
       return function (...params) {
           let _args = [...args, ...params];
       }
   }
   ```




# 经典面试题

```javascript
var a = { n: 1 };
a.x = a = { n: 2 };
// JavaScript总是严格按照从左到右的顺序来计算表达式
// example
/*
 * 例如，在表达式 w = x + y * z 中，首先将计算子表达式w，然后计算x、y和z;然后 y的值和z的值相乘再加上x的值，最后将其赋值给表达式w所指代的变量或属性
 * JavaScript权威指南的解释是没有问题的。首先，在这个赋值表达式的右侧，x + y * z中，x 与 y * z是求和运算的两个操作数，任何运算的操作数都是严格按照从左至  ** 右计算的，因此x先被处理，然后才会尝试对y和z求乘积。这里所谓的'x先被处理'是JavaScript中的一个特异现象，即：
 * 一切都是表达式，一切都是运算
 * 两个连续赋值的表达式
 * 所以，今天标题中的这行代码，是真正的、两个连续赋值的表达式
 * a.x = a = { n: 2 };
 * 并且，按照之前的理解，a.x总是被最先计算求值的（从左至右）
 * 回顾第一讲的内容，所谓a.x 也是一个表达式，其结果也是一个 '引用'。这个表达式 'a.x'本身也要再计算它的左操作数，也就是 'a'。完整地讲，'a.x'这个表达式的
 * 语义是：
 * 计算单值表达式a，得到a的引用
 * 将右侧的名字x理解为一个标识符，并作为'.'的右操作数
 * 计算 'a.x'表达式的结果
 * 
 * 表达式 'a.x'的计算结果是一个引用，因此通过这个引用保存了一些计算过程中信息-- 例如它保存了 'a'这个对象，以备后续操作中 '可能会' 作为this来使用。所以
 * 现在，在整行代码的前三个表达式计算过程中， 'a'是作为一个引用被暂存下来。
 * 发生了 a = { n : 2 };
 * 那么现在，表达式最开始被保留在一个'结果值'中的引用a会更新吗？
 * 不会的，这是那是一个运算结果，这个结果只有引擎知道，它现在是一个引擎才理解的'引用
 * 规范对象'.只能取值或赋值
 */

var x = 1;
function func(x, y = function anonymous1() { x = 2}) {
    x = 3;
    y();
    console.log(x);
}
func(5);
console.log(x)
/* EC(G)
 * VO(G)
 *  x -> 1
 *  func -> AAAFFF00
 * 堆(AAAFFF00)
 * [[scope]]: EC(G)
 * 形参： x,y
 * `函数代码字符串`
 * 
 * 堆(AAAFFF11)
 * [[scope]]
 * 执行函数
 * EC(func)
 * AO(func)
 * 作用域链：<EC(func), EC(G)>
 * 形参赋值： x = 5 -> x = 3 -> x = 2; y = anonymous1
 * 执行函数anonymous
 * EC(anonymous)
 * AO(anonymous)
 * 作用域链：<EC(anonymous), EC(func)>
 * 形参赋值： 
 * x = 2; 如果自己没有这个变量，往上找。
 * 当前函数上下文执行完成之后不被释放的
 *
 *
 * 
 */

var x = 1;
function func(x, y = function anonymous() {x=2}) {
    var x = 3;
    y();
    console.log(x);
}
func(5);
console.log(x);

/*
 * 有一种情况也会产生块级作用域
 * 1. 函数有形参复赋值了默认值
 * 2. 函数体中单独声明了某个变量
 * 这样在函数声明的时候，会产生两个上下文
 * 第一个： 函数执行形成的函数私有上下文
 * 第二个： 函数体大括号包起来的是一个块级上下文EC（BLOCK）
 *
 */
/*
 * EC(G)
 * x = 1
 * func = AAAFFF00
 * 	EC(func)函数私有上下文
 *  [[scope]]: <EC(func), EC(G)>
 * 	形参赋值 x -> 5 ; y -> anonymous([[scope]]: EC(func))
 * 	EC(BLOCK)
 * 	在代码没有执行之前，变量提升, 我们会把EC(func)中的值也给它一份 x = 5
 *  x -> undefined
 *  y() 不是块级的，去作用链上找。 EC(func)
 *  EC(anonymous)
 *  [[scope: <EC(anonymous), EC(func)>]]
 *  x = 2 修改的是EC(func)中的2
 */

const add = (x) => x + 1;
const mul = (x) => x * 3;
const div = (x) => x / 2;
function compose (...funcs) {
    return function (...args) {
        if (funcs.length === 0) {
            return args
        }
        if (funcs.length === 1) {
            return funcs[0](...args)
        }
        let n = 0;
        return funcs.reduce((a, b) => {
            n ++;
            if (n === 1) return b(a(...args))
            return b(a)
        })
    }
}

let result = compose()(0, 1);
console.log(result);

result = compose(add)(0, 1)
console.log(result)

result = compose(add, mul, div)(0, 1);
console.log(result)

dialog.vue
showDialog() {
    this.visible = true;
}
created() {
    window.showDialog = showDialog;
}

function instanceOf(left, right) {
    if (right === null) {
        return false
    }
    const rightProto = right.prototype;
    let proto = left.__proto__;
    while (proto) {
        if (proto === rightProto) {
            return true;
        }
        if (proto == null) {
            return false;
        }
        proto = proto.__proto__;
    }
    return false;
}

class A{}
class B extends A{}
class C{}
const b = new B();
console.log(instanceOf(b, B));
console.log(instanceOf(b, A));
console.log(instanceOf(b, C));

function _new(func, ...args) {
    // 创建实例对象
    const obj = {};
    // 让实例对象的__proto__ 指向 func.prototype
    obj.__proto__ = func.prototype;
    // 或者 const obj = Object.create(func.prototype);
    // 把方法执行 让this执行实例对象
    const result = func.apply(obj, args);
    const isObject = (result !== null && /^(funciton|object)$/.test(typeof result));
    if (isObject) {
        return result
    }
    return obj;
}

function deepClone(target) {
    if (target instanceof Date) {
        return new Date(target)
    }
    if (target instanceof RegExp) {
        return new Regexp(target);
    }
    if (typeof target !== 'object') {
        return target;
    }
    if (target == null) {
        return target;
    }
    const clone = new (Object.getPrototypeOf(target).constructor);
    Object.keys(target).forEach(it => {
        clone[it] = deepClone(target[it])
    })
    return clone;
}
```

# 转正答辩

1. 你正在做的项目，你有没有看过哪些类似项目的源码

2. 哪些模块是你做的（三个实习生做同一个项目），你的主要贡献点在哪？

3. 你从中有哪些收获？遇到技术难点的时候，怎么和组内其他人交流？

4. 整个暑期实习期间，你最大的收获是什么
5.  https://blog.csdn.net/haoshidai/article/details/52577823 
6.  https://zhuanlan.zhihu.com/p/136556515 



# LeetCode

```javascript
// 自己实现toLowerCase
// A: 65 a: 97 相差32
// 获取字符的ascii码： str.charCodeAt() 将ascii码转换成字符串 将ascii码转成字符串 String.fromCharCode(ascii码)
const toLowerCase = (str) => {
    if (!str) {
        return '';
    }
    let ret = '';
    const strLen = str.length;
    for (let i = 0; i < strLen; i ++) {
        const code = str.charCodeAt(i);
        if (code >= 65 && code <= 90) {
            ret += String.fromCharCode(code + 32);
        } else {
            ret += str[i];
        }
    }
    return ret;
}
// 正则
const toLowerCase = (str) => {
    return str.replace(/[A-Z]/g, (item) => {
        return String.fromCharCode(item.charCodeAt() + 32)
    })
}
// 二分查找
// 数组为升序的
var search = (nums, target) => {
    const numsLen = nums.length;
    if (numsLen === 1) {
    	if (nums[0] === target) {
            return 0;
        }
        return -1;
    }
    if (numsLen === 0 || target > nums[numsLen - 1]) {
        return -1;
    }
    let left = 0;
    let right = numsLen - 1;
    while (right >= left) {
        let mid = parseInt(((left + right) / 2), 10);
        // 取出中位数
        // target比中位数大
        if (target > nums[mid]) {
            left = ++mid;
        }
        // target比中位数小
        if (target < nums[mid]) {
            right = --mid;
        }
        // 相等
        if (target === nums[mid]) {
            return mid;
        }
    }
    return -1;
}

// 给一非空的单词列表，返回前 k 个出现次数最多的单词。
// https://leetcode-cn.com/problems/top-k-frequent-words/
// 返回的答案应该按单词出现频率由高到低排序。如果不同的单词有相同出现频率，按字母顺序排序。
const topKFrequent = (words, k) => {
    let map = new Map();
    words.forEach((word) => {
        const num = map.get(word);
        if (num) {
            map.set(word, num + 1)
        } else {
            map.set(word, 1);
        }
    })
    let nums = [...map].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    nums = nums.map(it => it[0]);
    return nums.slice(0, k);
}
/*
 *
 * 
 * 
 */
const topKFrequent = (words, k) => {
    let arr = [];
    const obj = {};
    words.forEach((word) => {
        if (obj[word]) {
            obj[word] ++;
        } else {
            obj[word] = 1;
        }
    });
    /* obj: {
            'i': 2,
            'love': 2,
            'leetcode': 1,
            'coding': 1,
        };
    */
    let orderedWords = Object.keys(obj).sort((prev, next) => obj[next] - obj[prev]); // ['i', 'love', 'leetcode', 'coding']
    let nums = orderedWords.map(word => obj[word]); // [2, 2, 1, 1];
    new Set(nums).forEach(num => {
        let matched = orderedWords.filter(word => num === obj[word]);
        if (matched.length > 0) {
            matched.sort();
        }
        arr = arr.concat(matched);
    })
    return arr.slice(0, k);
}
```

1. 框架看法
2. 怎么学习

# Vue UpdateChildren

 https://blog.csdn.net/qq2276031/article/details/106407647 

```javascript
function patch(oldVnode, vnode) {
    if (sameVNode(oldVnode, vnode)) {
        patchVnode(oldVnode, vnode)
    } else {
        const oEl = oldVnode.el; // oldVnode对应的真实元素节点
        let parentEle = api.parentNode(oEl); // 真实元素的父节点
        createEle(vnode) // 根据Vnode生成新元素
        if (parentEle !== null) {
            api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl)); // 将新元素添加到父元素
            api.removeChild(parentEle, oldVnode.el); // 移除以前的旧元素节点
            oldVnode = null
        }
    }
    
    return vnode;
}

function sameVnode(a, b) {
    return (
    	a.key === b.key && (
        	(
            	a.tag === b.tag && // 元素的标签名  div span
                a.isComment === b.isComment // 是否为注释节点 
                isDef(a.data) === isDef(b.data) // data是否定义 data: { attr: { id: 'app'}, domProps: { disabled: false}}
            	sameInputType(a, b)
            ) || (
    			isTrue(a.AsyncPlaceholder) &&
        		a.asyncFactory === b.asyncFactory &&
        		isUndef(b.asyncPlacehoder)
    		)
        )
    )
}
```

1. 如果两个节点都是一样的，那么就深入检查它们的子节点，如果两个节点不一样那就说明vnode完全被改变了，就可以直接替换oldVnode。
2. diff是同层比较的。

```javascript
function patchVnode(oldVnode, vnode) {
    if (oldVnode === vnode) {
        return;
    }
    const elm = vnode.elm;
    const oldCh = oldVnode.children;
    const ch = vnode.children;
    // 新vnode不是文本节点
    if (inUndef(vnode.text)) {
        // 都存在children的情况
        if (isDef(oldCh) && isUndef(ch)) {
            if (oldCh !== ch) updateChildren(elm, oldCh, ch)
        } else if (isDef(ch)) {
            // oldCh 不存在 ch存在
            if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, ''); // 清空oldVnode下的文本节点
            addVnodes(elm, null, ch, 0, ch.length - 1)
        } else if (isDef(oldCh)) {
            // oldCh 存在 ch不存在
            removeVnodes(oldch, 0, oldCh.length - 1)
        } else if (isDef(oldVnode.text)) {
            // 新节点text不存在 旧节点text存在
            nodeOps.setTextContent(elm, '')
        }
    } else if (oldVnode.text !== vnode.text) {
        // 新旧节点 文本内容不同
        nodeOps.setTextContent(elm, vnode.text)
    }
}
```

## patchVnode

 1. 判断vnode是否文本节点

    不是：

    1. oldCh 和 ch都存在的情况， updateChildren(oldCh, ch)
    2. oldCh不存在 和 ch存在 的情况 ，如果oldVnode有文本节点，清空，调用addVnodes
    3. oldCh存在 和 ch不存在的情况， removeVnodes(oldCh)
    4. oldVnode是文本节点， nodeOps.setTextContent(elm, '')

    是：

    1. oldVnode.text !== vnode.text ， nodeOps.setTextContent(elm, vnode.text)



```javascript
function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    let oldStartIdx = 0
    let newStartIdx = 0
    let oldEndIdx = oldCh.length - 1
    let oldStartVnode = oldCh[0]
    let oldEndVnode = oldCh[oldEndIdx]
    let newEndIdx = newCh.length - 1
    let newStartVnode = newCh[0]
    let newEndVnode = newCh[newEndIdx]
    let oldKeyToIdx, idxInOld, vnodeToMove, refElm

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    const canMove = !removeOnly

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh)
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx] // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx]
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      } else {
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            oldCh[idxInOld] = undefined
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue)
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(oldCh, oldStartIdx, oldEndIdx)
    }
  }

```

## UpdateChildren

1. oldStartVnode、oldEndVnode、newStartVnode、newEndVnode两两做比较，有四种比较方式，当其中两个能匹配上，那么真实dom中的相应节点会移到Vnode相应的位置
   1. 



## DOM: a b c d e

## Old VNode: a b c d e f

## New VNode: b f g

- 第一步： oldStartIdx = a; oldEndIdx = f; newStartIdx = b; newEndIdx: g; 首先a和b、f和g比较；然后a和g、f和b比较。不相等的情况下
- 第二步：
  - 无key的情况，直接创建新的Node插入到oldStartIdx的位置
  - 有key的情况，取newStartIdx里的值，到oldVNode里面找，如发现相同的b，调整真实的DOM Node，将DOM Node中的b移动到oldStartIdx指针对应的Node（a）的位置，将oldVNode中的b的key值赋值为undefined





# CSS取消浮动

1. 父级加overflow: hidden
2. clear: left/right/both  margin失效
3. 内墙法：
   1. 浮动父元素新增同级兄弟元素 clear:both 。



# 面试

## TODO(自我介绍)

1. 名字/专业/大三
2. 自己做过小项目
3. 实习
   1. 技术提升还是有的，代码规范/开发流程/
   2. 怎么快速熟悉项目
      1. 断点调试
      2. 学会找问题
      3. 遇到不熟的知识点，模仿
   3. 氛围，学习动力， 找到不足，遇到场景多
   4. 项目中遇到的坑 => 源码大多数都能解决
   5. 项目中的优化 -> 优化点
4. 项目技术栈
   1. 活跃在社区
   2. 学习源码，潜移默化的影响

看的书

红宝书->犀牛书->你不知道的js->http->https->vue

对象数组key排序

 https://blog.csdn.net/weixin_34224941/article/details/91431116 

```javascript

const keys = ['price', 'postage', 'sales']; // 传入要排序的 key，优先级从高到低
const orders = [1, 1, -1];
const arr1 = multiSort(arr, keys, orders)
// arr1:
const arr = [
    {"name":"商品05","price":123,"sales":143,"postage":19},
    {"name":"商品01","price":123,"sales":123,"postage":19},
    {"name":"商品03","price":123,"sales":133,"postage":29},
    {"name":"商品02","price":124,"sales":123,"postage":0},
    {"name":"商品04","price":125,"sales":123,"postage":9}
]
function multiSort(arr, keys, orders) {
    if (!keys) { return arr;}
    if (!orders) {
        orders = Array.from( { length: key.length }, () => 1);
    }
    return [...arr].sort((prev, next) => {
        for (let i = 0; i < keys.length; i ++) {
            if (perv[keys[i]] === next[keys[i]]) continue;
            return (prev[keys[i]] - next[keys[i]]) * (orders[i] || 1);
        }
        // 全部相等
        return 0;
    })
}


```



lodash的get函数

16匹马算法

XMLHttpRequest

依赖收集

1. data所有key都会被observe

2. 但是只有在模板上出现的key才会被依赖收集

3. 执行new Vue() => 如果没有render函数 => 生成render函数 =>将render函数赋值给vm._render (renderMixin做的事情)=> mountComponent => new Watcher() => getter => vm._udpate(vm._render, hydrating) => 

   targetStack: [渲染Watcher]，访问模板中data对应的key，触发Object.defineProperty，触发dep

   .depend。dep下的subs存储了对应渲染watcher；

   下次该key更新的话，触发dep.notify();

   执行渲染watcher，对应是异步的，一般情况 lazy: true(computed watcher) sync的话，立马执行watch 对应的key的回调函数，其他的queueWatcher,

   



React Hooks解决了什么问题~

组件复用 HOC

node.repalceChild(newNode, oldNode);

## DOM

```javascript
// 给一个元素Element,找出这个元素的全部Input子元素。
function findAllInputElement (element) {}
```



# await async generator

aysnc 是 genertor的语法糖

 https://juejin.im/post/6844903902849007624 

```javascript
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator();
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }

```

执行generator函数helloWorldGenerator的话，并不执行，而是返回一个迭代器对象，下一步，必须调用遍历器对象的next方法，使得指针移向下一个状态。

yield由于generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实是提供了一种可以暂停执行的函数，yield表达式就是暂停标志。

## generator 与 协程

协程是一种程序运行的方式，可以用单线程实现，也可以用多线程实现

* 协程概念
  * 一个线程（或函数）执行到一半，可以暂停执行，将执行权交给另一个线程（或函数），等到稍后收回执行权的时候，在恢复执行。这种可以并行执行，交换执行权的线程（或函数）就称为协程
* 协程和普通线程的差异
  * 1. 普通线程是抢先式的，会争夺cpu资源，而协程是合作的，
    2. next同一时间，可以有多个普通线程在执行，而协程只有一个在执行，其他协程则处于暂停状态
  * Generator函数是ES6对协程的实现，但是不完全，Generator函数被称为'半协程'，意思是只有Generator函数的调用者，才能将程序的执行权还给Generator函数。如果是完全执行的过程，任何函数都可以让暂停的协程继续执行。



```javascript
function mockAsync(generatorFunc) {
      let _iterator = generatorFunc();

      function helpFunc(_iteratorRes) {
        if (_iteratorRes.done) {
          return;
        }
        let val = _iteratorRes.value;
        if (val instanceof Promise) {
          val.then(res => {
            console.log(res)
            console.log(_iterator.next(res))
            helpFunc(_iterator.next(res))
          }).catch(err => _iterator.throw(err))
        }
      }
      try {
        console.log(_iterator);
        helpFunc(_iterator.next());
      } catch (e) {
        _iterator.throw(e)
      }
    }

    mockAsync(function*() {
      try {

        const p1 = yield Promise.resolve(1);
        console.log('do something');
        const p2 = yield Promise.resolve(2);
        console.log('do something2');
        const p3 = yield Promise.resolve(3);
        console.log('do something3');
      } catch (e) {
        console.log(e)
      }
    })
```

# 宏任务怎么计算执行顺序

 https://juejin.im/post/6844903638238756878 

```javascript
setTimeout(() => {
    task();
}, 3000);

sleep(100000000);


```

* task()进入任务队列并注册，计时开始
* 执行sleep函数，很慢，很慢，计时仍在继续
* 3秒到了，计时事件timeout完成，task()进入Event Queue，但是sleep也太慢了吧，还没执行完，只能等着。
* sleep执行完了，task()终于从Event Queue进入主线程执行。

上述的流程走完，我们知道setTimeout这个函数，是经过指定时间，把要执行的任务加入到任务队列中，又因为是单线程任务需要一个个执行，如果前面任务执行所需要的事件大于等待的时间，那么只能等着，导致真正的延迟时间远远大于3s。



## setInterval

setInterval的实现机制跟setTimeout类似，只不过setInterval是重复执行的

对于setInterval容易产生一个误区：并不是上一次fn执行完成之后再过100ms才执行下一个fn。事实上，setInterval不管上一次fn的执行结果，而是每隔100ms就将fn放入主线程队列，而两次fn之间具体间隔多久就不一定了，跟setTimeout实际延迟时间类似，跟js执行情况有关。

```javascript
(function testSetInterval() {
    let i = 0;
    const start = Date.now();
    const timer = setInterval(() => {
        i += 1;
        i === 5 && clearInterval(timer);
        console.log(`第${i}次开始`, Date.now() - start);
        for(let i = 0; i < 100000000; i++) {}
        console.log(`第${i}次结束`, Date.now() - start);
    }, 100);
})();

第1次开始 100
第1次结束 1089
第2次开始 1091
第2次结束 1396
第3次开始 1396
第3次结束 1701
第4次开始 1701
第4次结束 2004
第5次开始 2004
第5次结束 2307
```



 如果 setTimeout 和 setInterval 都在延迟 100ms 之后执行，那么谁先注册谁就先执行回调函数。 

如果fn执行时间很长，但下一次并不是等待上一次执行完了再过100ms才执行的。实际上早已经在任务队列里等待执行了。

## 异步任务执行的时间

执行到异步任务的时候，会直接放到异步队列中吗？答案是不一定的

因为浏览器有个定时器模块，定时器到了执行时间才会把异步任务放到任务队列。

## requestAnimationFrame

定义：下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行。

```html
<div class='box'>
    
</div>
<script>
	function animationWidth() {
      var div = document.getElementById('box');
      div.style.width = parseInt(div.style.width) + 1 + 'px';
    }

    if(parseInt(div.style.width) < 200) {
        requestAnimationFrame(animationWidth)
    }
</script>
```

1. requestAnimationFrame会把每一帧中的所有DOM操作集中起来，在一次重绘/回流中完成，并且重绘或回流的时间紧紧跟着浏览器的刷新频率，每秒60帧
2. 隐藏或不可见的元素，requestAnimationFrame将不会进行重绘或回流，减少cpu使用量
3. requestAnimationFrame方法返回一个id用于取消该方法。cancelAnimationFrame

## HTTP 请求特征

 https://blog.csdn.net/qq_31332467/article/details/79217262 

从上面整个过程中我们可以总结出 HTTP 进行分组传输是具有以下特征

- 支持客户-服务器模式
- 简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有 GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于 HTTP 协议简单，使得 HTTP 服务器的程序规模小，因而通信速度很快。
- 灵活：HTTP 允许传输任意类型的数据对象。正在传输的类型由 Content-Type 加以标记。
- 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
- 无状态：HTTP 协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

#  行内元素和块元素有什么区别？ 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
      .span {
        margin: 20px;
        padding: 20px 50px;
        background: red;
      }
    </style>
</head>
<body>
  <span class="span">span</span>
  <span class="span">span</span>
  <div class="block">block</div>
</body>
</html>

```

1. 给行内元素设置宽高无效
2. 设置左右方向的margin和padding有效，上下padding在视觉上是有效的，但是padding部分是不占据空间的。

# Regexp

https://regexper.com/

1. 去除左右两边的空格

   str.replace(/^(\s)+|(\s)+$/, '');

2. 去除除左右两边空格之外的空格

   str.replace(/(\S)\s+(\b)/, '$1$2');





# 三列布局，左右两边固定宽高

## 浮动

```html
<style>
    .wrapper + div {
        
    }
</style>

<div class="wrapper">
    <div class="left">
        
    </div>
    <div class="right">
        
    </div>
    <div class="center">
        
    </div>
</div>	
```

## p ~ ul p之后出现的所有ul

 通用选择器
选择匹配的F元素，且位于匹配的E元素后的所有匹配的F元素 

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
      p ~ ul {
        background: red;
      }
    </style>
</head>
<body>
  <p>快乐生活</p>
  <ul>
      <li>生活</li>
      <li>生活</li>
      <li>生活</li>
      <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
      </ul>
  </ul>
    <ul>
        <li>2</li>
        <li>3</li>
        <li>4</li>
    </ul>
</body>
</html>

```



## div > span

 子选择器
选择匹配的F元素，且匹配的F元素所匹配的E元素的子元素 

## div span

## .a + .b

  相邻兄弟选择器
选择匹配的F元素，且匹配的F元素紧位于匹配的E元素的后面 

# ES6

## class 和 es5 的prototype区别

## 箭头函数为啥不能被new

# Error

window.addEventListener('error', function(e) {})

window.addEventListener('unhandledrejection', function(e) {})

XMLHttpRequest fetch 先执行unhandledrejection

async/await错误只执行 unhandledrejection

```javascript
generator错误
window.addEventListener('error', (e)=>{
  console.log('addEventListener')
}, true);

window.addEventListener("unhandledrejection", function(e) {
    console.log('unhandledrejection')
}, true);

// gennerator
function* F() {
  throw new Error("gennerator-throw在函数体外抛出的错误")
  yield 1;
  return "gennerator-value";
}

var f = F();

f.next();
```



# 排序算法



# cors原理



# css动画卡/JS动画卡

http://sy-tang.github.io/2014/05/14/CSS%20animations%20and%20transitions%20performance-%20looking%20inside%20the%20browser/

https://segmentfault.com/a/1190000013045035

## 主线程

1. 运行javascript
2. 计算HTML元素的CSS样式
3. 页面的布局
4. 将元素绘制到一个或多个位图中
5. 将这些位图交给合成线程

## 合成线程

1. 通过GPU将位图绘制到屏幕上
2. 通知主线程更新页面中可见或即将变成可见的部分的位图
3. 计算出页面哪部分是可见的
4. 计算出当你在滚动页面时哪部分是即将成为可见的
5. 当你在滚动页面时将相应位置的元素移动到可视区域

长时间执行JavaScript或渲染一个很大的元素会阻塞主线程，在这期间，它将无法响应用户的交互。

相反，合成线程则会尽量去响应用户的交互。当一个页面发生变化时，合成线程会以每秒60帧的间隔不断去重绘这个页面，即使这个页面不完整。

## GPU

合成线程会使用GPU将位图绘制到屏幕上

GPU的快在于：

1. 绘制位图到屏幕上
2. 一遍又一遍地绘制相同的位图
3. 将同一位图绘制到不同位置，执行旋转及缩放处理



GPU的慢在于

1. 将位图加载到内存中

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Page Title</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    .margin-transition{
      /* margin-left: 0; */
      background: rgba(0,0,255,0.3);
      transition: margin-left 1s;
    }
    .transform-transition{
      /* transform: translate(0,0); */
      background: rgba(0,255,0,0.3);
      transition: transform 1s;
    }
    .common{
      height: 300px;
      width: 300px;
    }
  </style>
</head>
<body>
<div class="margin-transition common" id="marginTransition">
  <p>transition:margin-left 1s</p>
</div>
<div class="transform-transition common" id="transformTransition">
  <p>transition:transform 1s</p>
</div>
<button id="control">见证奇迹</button>
<script>
  var btn = document.getElementById('control');
  var marginTransition = document.getElementById('marginTransition');
  var transformTransition = document.getElementById('transformTransition');
  btn.addEventListener("click",function(){
    console.log(marginTransition.style,transformTransition.style)
    marginTransition.style.marginLeft = "500px";
    // transformTransition.style.transform = "translate(500px,0)"
  })
</script>
</body>
</html>






```

## margin-left

![img](C:\Users\V_DARL~1\AppData\Local\Temp\企业微信截图_16001569656225.png)

## transform

![image-20200915160545532](C:\Users\v_darliang\AppData\Roaming\Typora\typora-user-images\image-20200915160545532.png)

# transform和transition的区别

## transition: height

现在，我们对渲染页面的软硬件都有了一些初步的了解，接下来让我们看看浏览器的主线程和合成线程是如何协同工作来执行一个css transition的



假设我们要一个元素的height 从 100px 变成 200px，就像这样

```html
div {
	height: 100px;
	transition: height 1s linear;
}
div:hover {
	height: 200px;
}
```

主线程和合成线程将按照下面的流程图来执行相应的操作。注意在橘黄色的方框的操作可能会比较耗时，在蓝色框中的操作是比较快速的

正如你所看到，在上图中有很多橘黄色方框，意味着，浏览器需要做大量的工作，也就是说这个动画可能会变得卡顿

在动画的每一帧中，浏览器需要执行布局、重绘、回流、绘制、以及将新的位图提交给GPU。我们知道，将位图加载到GPU的内存中是一个相对较慢的操作。

浏览器需要做大量的工作的原因在于每一帧中元素的内容都在不断改变。改变一个元素的高度可能导致需要同步改变它的子元素的大小，所以浏览器必须重新计算布局。布局完成后，主线程又必须重新生成该元素的位图。



## transition: transform

这对浏览器来说是个好消息 ！浏览器只需要一次生成这个元素的位图，并在动画开始的时候将它提交给GPU去处理 。之后，浏览器不需要再做任何布局、 绘制以及提交位图的操作。从而，浏览器可以充分利用 GPU 的特长去快速地将位图绘制在不同的位置、执行旋转或缩放处理。

# ES6默认参数

https://juejin.im/post/6844903839280136205

## 特定的参数中间作用域

事实上，如果一些（至少有一个）参数具有默认值，ES6会定义一个中间作用域来存储参数，并且这个作用域与函数体的作用域不共享。这是与ES5存在主要区别的一个方面

```javascript
var x = 1;
function foo(x, y = function() { x = 2 }) {
    var x = 3;
    y();
    console.log(x);
}
```

在这个例子中，我们有三个作用域：全局环境、参数环境、以及函数环境

-> 内部： { x: 3 }

-> { x: undefined, y: function(){ x = 2 }} // 参数

-> { x: 1 } 全局

## undefined 检查

还要注意另外一个有趣的事实，是否应用默认值，取决于对参数初始值（其赋值发生在一进入上下文时）的检查结果是否为值undefined。我们来证明一下

```javascript
function foo(x, y = 2) {
    console.log(x, y);
}
foo(); // undefined, 2
foo(1); // 1, 2

foo(undefined, undefined) // undefined, 2
foo(1, undefined); // 1, 2
foo('')
```

## 解构组件的默认赋值

涉及默认值的另一个地方是解构组件的默认值，本文不会涉及解构赋值的主题，不过我们会展示一些小例子。不管是在函数参数中使用解构，还是上述的使用简单默认值，处理默认值的方式都是一样的：即在需要的时候创建两个作用域

```javascript
function foo({ x, y = 5 } = {}) {
    console.log(x, y);
}
foo(); // undefined 5
foo(''); // undefined 5
foo(null);
```



# 链表和数组的区别



# 骨架屏原理



# 下拉框DOM节点过多

1. 滚动加载，出现无限滚动时，可能给dom过多页面卡死
2. 滚动加载的组件，dom过多，销毁组件的时候也会出现卡死
3. 任何滚动的元素，内部元素过多，都会出现卡顿现象

在非可视区域的dom，都暂时转存到内存中，为了防止抖动，也要实现占位功能

# 性能监控



lighthouse





# 部署经验

1. 后端node项目，git clone项目之后，egg-dev模式下，除非出错或者主动停止，否则断开服务器连接，node项目也是处于运行中。
2. 前端vue项目，git clone 打包好的vue项目之后，部署到nginx，然后因为请求也是从80端口发出，可以通过反向代理，代理从以api开头的请求，代理到nodejs项目的运行地址。
3. 数据库，直接免费云数据库。





# 错误上报

https://zhuanlan.zhihu.com/p/75577689

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
<script>
  // window.onerror = function(message, source, lineno, colno, error) {
  //   // 错误信息，源文件，行号
  //   console.log(message + '\n' + source + '\n' + lineno);
  //   // 禁止浏览器打印标准的错误信息
  //   return true;
  // }
  // console.log(a);

  // const p1 = new Promise((resolve, reject) => {
  //   resolve(1)
  // })
  // p1.then(res => {
  //   console.log(res);
  //   throw 1;
  // }).then(res => {
  //   console.log(res);
  // })
  //
  // window.addEventListener('unhandledrejection', (e) => {
  //   console.log(e);
  // })
  window.addEventListener('error', (e) => {
    console.log(e);
  })

  function* F() {
    throw new Error("gennerator-throw在函数体外抛出的错误")
    yield 1;
    return "gennerator-value";
  }

  const f = F();

  f.next();



</script>
</html>

```

## window.onerror / window.addEventListener捕获js运行时错误

## 资源加载错误时使用addEventListener去监听error事件

## 未处理的promise错误处理方式

## fetch与xhr错误的捕获

https://www.jianshu.com/p/b61caea752dd

https://juejin.im/post/6844904113134632973



# Promise

如果是通过new Promise的话，我们会传入一个构造函数，然后给这个函数传入两个参数，一个是resolve，一个是reject。然后我们构造器函数的代码是同步执行的，如果调用resolve函数，将resolve函数的参数存储起来。用作下一次then结果函数的参数。执行完构造函数的代码之后。如果调用.then。将.then的函数参数存储起来。setTimeout之后调用。模拟一个异步的效果。









 







