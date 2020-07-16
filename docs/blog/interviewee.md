
## DOM事件流

Document -> HTML -> body -> div (事件捕获) （从上往下）

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
    this.feature = ['cute'];
}

var parent = new Parent('parent');
Child.prototype = parent;

var child1 = new Child("child1");

child1.sex = 'girl';
child1.colors.push('yellow');
child1.features.push('sunshine');

var child2 = new Child('child2');
console.log(child1); {sex: 'girl', feature: ['cute', 'sunshine'], __proto__: Parent{}}
console.log(child2); {feature: ['cute']}

console.log(child1.name); parent
console.log(child2.colors); ['white', 'black', 'yellow']

console.log(parent); {name: 'parent', sex: 'boy', color: ['white', 'black', 'yellow']}
```

# this指向问题

## 1. 函数执行window

```javascript
function a() {
    console.log(this)
}
a()

setInterval(() => {
    console.log(this)
})

```

## 2.谁点谁就指向谁

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

  ## 发起HTTP连接

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

## 服务器处理并返回HTTP报文

## 浏览器解析渲染页面 

1. 状态码

2. 响应报头

   1. Server:
   2. Connection:
   3. Accept:

3. 响应文

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

         2.  非阻塞JavaScript： high 使用defer属性或使用async来异步加载JavaScript文件。


            ```javascript
            <!-- Defer Attribute -->
            <script defer src="foo.js">
    
            <!-- Async Attribute -->
            <script async src="foo.js">
            为什么：
    
            ​	JavaScript阻止HTML文档的正常解析，因此当解析器到达<script>标记时（特别是在内），它会停止解析并且执行脚本。如果您的脚本位于页面顶部，则强烈建议添加async和defer，但如果在标记之前加载，没有太大影响。但是，使用这些属性来避免性能问题是一种很好的做法。
    
            怎么做：
    
            ​	添加async（如果脚本不依赖于其他脚本）或defer（如果脚本依赖或依赖于异步脚本）作为script脚本标记的属性。 如果有小脚本，可以在异步脚本上方使用内联脚本。
    
            1. async : 加载脚本和渲染后续文档元素并行进行，脚本加载完成后，暂停html解析，立即解析js脚本
    
               defer : 加载脚本和渲染后续文档元素并行进行，但脚本的执行会等到 html 解析完成后执行
    
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

 	1. http特点
      	1. 无状态：协议对客户端没有状态存储，对事物处理没有"记忆"能力，比如访问一个网站需要反复进行操作
      	2. 无连接：HTTP/1.1之前，每次请求之前都要三次握手四次挥手
      	3. 客户端请求服务端响应
      	4. 简单快速，灵活
      	5. 通信使用明文



# Seq(序列号),Ack(确认号),Syn(同步序列号)

# HTTP2.0

1. 请求头压缩算法HPACK（ 通讯双方各自cache一份header fields表，既避免了重复header的传输，又减小了需要传输的大小）
2. 新的二进制格式
3. 多路复用（信道复用）
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
      1. 密码套件决定了本次连接采用哪一种**对称加密算法（ DES，AES ）**，**密钥协商算法**，HMAC算法。
      2. 密钥协商算法：
         1. RSA
            1. 客户端向服务器发起请求连接，服务器发送RSA密钥对应的公钥给客户端
            2. 客户端通过生成随机数生成器生成一个预备主密钥，用服务器的公钥加密并发送给服务端
            3. 服务端解密预备主密钥，加入能够正确解密，则说明服务器与客户端共同协商出一个预备主密钥
         2. DH算法
            1. 静态
            2. 临时（EDH）可以预防前向安全性
         3. 
   2. 服务端响应请求，发送证书和随机数2和协商出的密码套件
   3. 客户端解析证书，由客户端的TLS完成，验证步骤主要如下
      1. 首先验证公钥是否有效
      2. 还有颁发机构CA和过期时间
      3. 证书的持有者
      4. 签名
      5. 验证通过的话，客户端生成一个随机数3
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
   2. virtual dom的好处
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

   3. 