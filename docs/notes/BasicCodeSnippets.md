# 基础代码片段

## ajax

```js
var xhr = new XMLHttpRequest(); // 声明一个请求对象

// 前端设置是否带cookie
xhr.withCredentials = true;

xhr.open('GET', 'xxxx');
//xhr.open('post', 'http://www.web-hub.cn:8080/login', true);

// 如何设置请求头? xhr.setRequestHeader(header, value);
xhr.setRequestHeader('Content-Type', 'application/json');

xhr.onreadystatechange = function(){
  if(xhr.readyState === 4){  // readyState 4 代表已向服务器发送请求
    if(xhr.status === 200){ // status 200 代表服务器返回成功
      console.log(xhr.responseText); // 这是返回的文本
    } else{
      console.log("Error: "+ xhr.status); // 连接失败的时候抛出错误
    }
  }
}

xhr.send(null); 
//xhr.send('user=admin');
// get方法 send null(亦或者不传,则直接是传递 header) ,post 的 send 则是传递值
```

---

## jsonp

**原生实现**

```html
<script>
  var script = document.createElement('script');
  script.type = 'text/javascript';

  // 传参并指定回调执行函数为onBack
  script.src = 'http://www.web-hub.cn:8080/login?user=admin&callback=onBack';
  document.head.appendChild(script);

  // 回调执行函数
  function onBack(res) {
      alert(JSON.stringify(res));
  }
 </script>
```

服务端返回如下（返回时即执行全局函数）：

```js
onBack({"status": true, "user": "admin"})
```

**jquery ajax**

```js
$.ajax({
  url: 'http://www.web-hub.cn:8080/login',
  type: 'get',
  dataType: 'jsonp',  // 请求方式为jsonp
  jsonpCallback: "onBack",    // 自定义回调函数名
  data: {}
});
```

**vue.js**

```js
this.$http.jsonp('http://www.web-hub.cn:8080/login', {
  params: {},
  jsonp: 'onBack'
}).then((res) => {
  console.log(res); 
})
```

**npm包jsonp**

```bash
npm install jsonp --save
```

```js
import originJSONP from 'jsonp'   //引入jsonp

//进行封装并export
export default function jsonp(url,data,option) {
  url += (url.indexOf('?')<0? '?' : '&')+param(data)

  return new Promise((resolve,reject)=>{
    originJSONP(url,option,(err,data)=>{
      if(!err){
        resolve(data)
      }else{
        reject(err)
      }
    })
  })
}

//对data进行处理，并encodeURIComponent()进行转码。
function param(data) {
    let url = ''
    for(var k in data) {
          let value = data[k] !== undefined? data[k] : ''
          url += '&' + k + '=' + encodeURIComponent(value)
    }
    return url ? url.substring(1) : ''
}
```

---

## Promise

**Promise对象调用**

```js
let p = new Promise(function(resolve, reject){
    if(/* 异步操作成功 */){
        resolve(data)
    }else{
        reject(err)
    }
})

p.then((res)=>{
  console.log(res)
},(err)=>{
  console.log(err)
})
```

**实现一个简单的Promise示例一**

```js
function Promise(fn){
  var status = 'pending'
  function successNotify(){
      status = 'fulfilled'//状态变为fulfilled
      toDoThen.apply(undefined, arguments)//执行回调
  }
  function failNotify(){
      status = 'rejected'//状态变为rejected
      toDoThen.apply(undefined, arguments)//执行回调
  }
  function toDoThen(){
      setTimeout(()=>{ // 保证回调是异步执行的
          if(status === 'fulfilled'){
              for(let i =0; i< successArray.length;i ++)    {
                  successArray[i].apply(undefined, arguments)//执行then里面的回掉函数
              }
          }else if(status === 'rejected'){
              for(let i =0; i< failArray.length;i ++)    {
                  failArray[i].apply(undefined, arguments)//执行then里面的回掉函数
              }
          }
      })
  }
  var successArray = []
  var failArray = []
  fn.call(undefined, successNotify, failNotify)
  return {
      then: function(successFn, failFn){
          successArray.push(successFn)
          failArray.push(failFn)
          return undefined // 此处应该返回一个Promise
      }
  }
}
```

> Promise中的resolve和reject用于改变Promise的状态和传参，then中的参数必须是作为回调执行的函数。因此，当Promise改变状态之后会调用回调函数，根据状态的不同选择需要执行的回调函数。

参考 :  [面向面试题和实际使用谈promise](http://www.cnblogs.com/lunlunshiwo/p/8852984.html)

**实现一个简单的Promise示例二:**

```js
const PENDING = "pending"; //等待
const FULFILLED = "fulfilled"; //已完成
const REJECTED = "rejected"; // 已拒绝

function Promise(executor) {
    let self = this;
    self.status = PENDING;

    self.value;
    self.reason;

    function resolve(value) {
        if (self.status === PENDING) {
            self.status = FULFILLED;
            self.value = value;
        }
    }

    function reject(reason) {
        if (self.status === PENDING) {
            self.status = REJECTED;
            self.reason = reason;
        }
    }
    try { // 规范提到，执行器抛异常会reject
        executor(resolve, reject);
    } catch(e) {
        reject(e)
    }
}
// then方法实现
Promise.prototype.then = function (onFulfilled, onRjected) {
    let self = this;
    /**
     * onFulfilled 和 onRejected 都是可选参数。
     * 如果 onFulfilled 不是函数，其必须被忽略
     * 如果 onRejected 不是函数，其必须被忽略
     */
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) {
        return value;
    };
    onRjected = typeof onRjected === 'function' ? onRjected : function(reason) {
        throw reason;
    }

    if (self.status === FULFILLED) {
        onFulfilled(self.value);
    }
    if (self.status === REJECTED) {
        onRjected(self.reason);
    }
}
```
参考 :  [Javascript Promise学习过程总结](https://juejin.im/post/5aa730276fb9a028b77a7903)

---

## 闭包

```js
var fn = function() {
    var divs = document.querySelectorAll('div');
    for (var i = 0; i < 3; i++) {
        divs[i].onclick = (function(i) {
            return function() {
                    alert(i);
            };
        })(i);
    }
};
fn();
```

**或者如下的写法：**

```js
var fn = function() {
  var divs = document.querySelectorAll('div');
  for (var i = 0; i < 3; i++) {
    (function(i) {
      divs[i].onclick = function() {
        alert(i);
      };
    })(i);
  }
};
fn();
```

```js
for (var i = 0; i < 3; i++) {
  setTimeout((function(i) {
    return function() {
      console.log(i);
    };
  })(i), 0);
  console.log(i);
}
```


## 事件代理

> 事件代理（Event Delegation），又称之为事件委托。是 JavaScript 中常用绑定事件的常用技巧。“事件代理”即是把原本需要绑定的事件委托给父元素，让父元素担当事件监听的职务。**事件代理的原理是DOM元素的事件冒泡**。

* 减少事件注册,节省内存占用,提高性能
* 可以实现当新增子对象时无需再次对其绑定

```html
<div class="wrap" id="wrap">
  <div class="btn" data-type="btn" data-feat="add">添加</div>
  <div class="btn" data-type="btn" data-feat="delete">绘画</div>
  <div class="btn" data-type="btn" data-feat="delete">散步</div>
  <div class="btn" data-type="btn" data-feat="delete">静坐</div>
</div>
<script type="text/javascript">
  var n = 0
  document.getElementById('wrap').addEventListener('click', function(e) {
    var target = e.target;
    var type = target.dataset.type;
    var feat = target.dataset.feat;

    if (type == 'btn') {
      switch (feat) {
        case 'add':
          this.innerHTML += `<div class="btn" data-type="btn" data-feat="delete">静坐${n}</div>`
          n++
          return;
        case 'delete':
          target.parentNode.removeChild(target);
          return;
      }
    }

  }, false);
</script>
```

---

## 封装dom查询（面向对象）

```js
function Elem(id){
  this.elem = document.getElementById(id)
}

 Elem.prototype.html = function(val){
   var elem = this.elem
   if(val) {
     elem.innerHTML = val
     return this  //链式
   } else {
     return elem.innerHTML
   }
 }

 Elem.prototype.on = function(type,fn){
   var elem = this.elem
   elem.addEventListener(type, fn)
   return this  //链式
 }

//调用
var div = new Elem('id')
div.html('<p>hello</p>').on('click',function(){
  console.log('suceess')
})
```

---

## DOM劫持

```js
function nodeToFragment (node) {
  var flag = document.createDocumentFragment();
  var child;
  // 首先，所有表达式必然会返回一个值，赋值表达式亦不例外
  // 理解了上面这一点，就能理解 while (child = node.firstChild) 这种用法
  // 其次，appendChild 调用以后 child 会从原来 DOM 中移除
  // 所以，第二次循环时，node.firstChild 已经不再是之前的第一个子元素了
  while (child = node.firstChild) {
    flag.appendChild(child); // 将子节点劫持到文档片段中
  }
  return flag
}
```

---

## 添加calssName

```js
// 为元素添加类名
export function addClass(el, className) {
  // 先判断一下元素是否含有需要添加的类名，有则直接 return
  if(hasClass(el, className)) {
    return
  }
  // 把该元素含有的类名以空格分割
  let newClass = el.className.split(' ')
  // 把需要的类名 push 进来
  newClass.push(className)
  // 最后以空格拼接
  el.className = newClass.join(' ')
}

// 判断是否有要查看的 className，有则返回true，否则返回 false
export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')

  return reg.test(el.className)
}
```

## 自动添加游览器前缀

```js
let elementStyle = document.createElement('div').style
// 主流浏览器内核
let vendor = (() => {
  let transfromNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    ms: 'msTransform',
    O: 'OTransform',
    standard: 'transform'
  }
  for(let key in transfromNames) {
    if(elementStyle[transfromNames[key]] !== undefined) {

      return key
    }
  }

  return false
})()

// 添加样式的浏览器前缀
export function prefixStyle(style) {
  if(vendor === false) {
    return false
  }

  if(vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}
```

---

## 图片懒加载

> 定义：延迟加载也称为惰性加载，即在长网页中延迟加载图像。用户滚动到它们之前，视口外的图像不会加载。这与图像预加载相反，在长网页上使用延迟加载将使网页加载更快。在某些情况下，它还可以帮助减少服务器负载。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Lazyload 1</title>
  <style>
    img {
      display: block;
      margin-bottom: 50px;
      height: 200px;
    }
  </style>
</head>
<body>
  <img src="images/loading.gif" data-src="images/1.png">
  <img src="images/loading.gif" data-src="images/2.png">
  <img src="images/loading.gif" data-src="images/3.png">
  <img src="images/loading.gif" data-src="images/4.png">
  <img src="images/loading.gif" data-src="images/5.png">
  <img src="images/loading.gif" data-src="images/6.png">
  <img src="images/loading.gif" data-src="images/7.png">
  <img src="images/loading.gif" data-src="images/8.png">
  <img src="images/loading.gif" data-src="images/9.png">
  <img src="images/loading.gif" data-src="images/10.png">
  <img src="images/loading.gif" data-src="images/11.png">
  <img src="images/loading.gif" data-src="images/12.png">
<!--  <script>
  var num = document.getElementsByTagName('img').length;
  var img = document.getElementsByTagName("img");
  var n = 0; //存储图片加载到的位置，避免每次都从第一张图片开始遍历
  lazyload(); //页面载入完毕加载可是区域内的图片
  window.onscroll = lazyload;
  function lazyload() { //监听页面滚动事件
      var seeHeight = document.documentElement.clientHeight; //可见区域高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动条距离顶部高度
      for (var i = n; i < num; i++) {
          if (img[i].offsetTop < seeHeight + scrollTop) {
              if (img[i].getAttribute("src") == "images/loading.gif") {
                  img[i].src = img[i].getAttribute("data-src");
              }
              n = i + 1;
          }
      }
  }
</script>-->
//对比一下上下两种代码，一个变量是全局变量，一个是函数的局部作用域，
<script>
    function lazyload() {
        var images = document.getElementsByTagName('img');
        var len    = images.length;
        var n      = 0;      //存储图片加载到的位置，避免每次都从第一张图片开始遍历        
        return function() {
            var seeHeight = document.documentElement.clientHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            for(var i = n; i < len; i++) {
                if(images[i].offsetTop < seeHeight + scrollTop) {
                    if(images[i].getAttribute('src') === 'images/loading.gif') {
                      images[i].src = images[i].getAttribute('data-src');
                    }
                    n = n + 1;
                  }
              }
          }
    }

    var loadImages = lazyload();

    loadImages();          //初始化首页的页面图片

    window.addEventListener('scroll', loadImages, false);
</script>
</body>
</html>
```

**jquery图片懒加载**

```js
<script>
    var n = 0,
        imgNum = $("img").length,
        img = $('img');
    lazyload();
    $(window).scroll(lazyload);
    function lazyload(event) {
        for (var i = n; i < imgNum; i++) {
            if (img.eq(i).offset().top < parseInt($(window).height()) + parseInt($(window).scrollTop())) {
                if (img.eq(i).attr("src") == "default.jpg") {
                    var src = img.eq(i).attr("data-src");
                    img.eq(i).attr("src", src);
                    n = i + 1;
                }
            }
        }
    }
</script>
```

---

## img加载图片失败时，使用默认图片

* **img标签自带onError属性，当图片加载失败时，触发error事件：**

    `<img src="image.png" onError='this.src="http://ww.jpg"' />`

* **jQuery的error事件**

    ```js
    $('img').error(function(){
        $(this).attr('src',"http://ww.jpg");
    });
    ```

* **jQuery的one绑定**
    使用`onerror`或者`jQuery的error`事件时，如果默认图片也发生加载失败，则会形成死循环，最好的办法是使用`one`绑定事件，只执行一次

    ```js
    $("img").one("error", function(e){
         $(this).attr("src", "http://ww.jpg");
    });
    ```
---

##  图片按比例响应式缩放、裁剪

**html部分：**

```html
<div class="zoomImage" style="background-image:url(images/test1.jpg)"></div>
```

**css部分：**

```css
.zoomImage{
  width:100%;
  height:0;
  padding-bottom: 100%;
  overflow:hidden;
  //padding为百分比的时候根据他父层的宽度来进行计算
  background-position: center center;
  background-repeat: no-repeat;
  -webkit-background-size:cover;
  -moz-background-size:cover;
  //把背景图像扩展至完全覆盖背景区域
  background-size:cover;
}
```

**总结：**你所需要的比例，就是width与padding-bottom的比例
用的时候，直接把.zoomImage当成img标签来用就可以了。

参考：[如何让图片按比例响应式缩放、并自动裁剪的css技巧](http://blog.csdn.net/oulihong123/article/details/54601030)

---

## 选项卡切换

**html的结构和样式：**

```html
<style type="text/css">
        #div1 div{
            width: 200px;
            height:200px;
            border: 1px #000 solid;
            display: none;
        }
        .active{
            background: red;
        }
</style>
<body>
    <div id="div1">
        <button class="active">1</button>
        <button>2</button>
        <button>3</button>
        <div style="display: block;">111</div>
        <div>222</div>
        <div>333</div>
    </div>
</body>
```

```js
//过程式的编程思想
window.onload=function(){
    //获取元素
    var oParent=document.getElementById('div1');
    var btns=oParent.getElementsByTagName('button');
    var divs=oParent.getElementsByTagName('div');
    //通过循环给每个btn添加点击事件
    for (var i = 0; i < btns.length; i++) {
        btns[i].index=i;//存储当前btn的下标
        btns[i].onclick=function(){
            for (var i = 0; i < btns.length; i++) {
                btns[i].className='';
                divs[i].style.display='none';
            }
            this.className='active';
            divs[this.index].style.display='block';//让对应当前btn的div显示
        }
    }
}
```

```js
//面向对象
window.onload = function(){
    var t1=new Tab();
    t1.init();
};

 function Tab() {
     this.btns=oParent.getElementsByTagName('button');
    this.divs=oParent.getElementsByTagName('div');
 }

Tab.prototype.init=function(){
    var This=this;
    for (var i = 0; i < this.btns.length; i++) {
        this.btns[i].index=i;
        this.btns[i].onclick=function(){
            This.change(this);
        }
    }
}
Tab.prototype.change=function(btn) {
    for (var i = 0; i < this.btns.length; i++) {
        this.btns[i].className='';
        this.divs[i].style.display='none';
    }
    btn.className='active';
    this.divs[btn.index].style.display='block';
};
```

---

## 元素拖拽

```css
#div1{
  width: 100px;
  height: 100px;
  background: red;
  position: absolute;
}
```
```html
<body>
  <div id='div1'></div>
</body>
```

```js
//过程式的编程思想
window.onload=function(){
    var oDiv=document.getElementById('div1');

    var disX=0;
    var disY=0;

    oDiv.onmousedown=function(ev){
        var ev=ev || window.event;
        disX=ev.clientX-oDiv.offsetLeft;
        disY=ev.clientY-oDiv.offsetTop;

        document.onmousemove=function(ev){
            var ev=ev || window.event;
            oDiv.style.left=ev.clientX-disX+'px';
            oDiv.style.top=ev.clientY-disY+'px';
        };
        document.onmouseup=function(){
            document.onmousemove=null;
            document.onmouseup=null;
        }
        return false;
    }
}
```

```js
//面向对象
window.onload = function() {
  var d1 = new Drag('div1');
  d1.init();
};

function Drag(id) {
  this.oDiv = document.getElementById(id);
  this.disX = 0;
  this.disY = 0;
}
Drag.prototype.init = function() {
  var This = this;
  this.oDiv.onmousedown = function(ev) {
    var ev = ev || window.event;
    This.fnDown(ev);
    return false;
  };
};

Drag.prototype.fnDown = function(ev) {
  var This = this;
  this.disX = ev.clientX - this.oDiv.offsetLeft;
  this.disY = ev.clientY - this.oDiv.offsetTop;

  document.onmousemove = function(ev) {
    var ev = ev || window.event;
    This.fnMove(ev);
  };
  document.onmouseup = function() {
    This.fnUp();
  }
};

Drag.prototype.fnMove = function(ev) {

  this.oDiv.style.left = ev.clientX - this.disX + 'px';
  this.oDiv.style.top = ev.clientY - this.disY + 'px';
};

Drag.prototype.fnUp = function() {
  document.onmousemove = null;
  document.onmouseup = null;
};
```
---

## 函数节流（throttle）

```js
//fn 要执行的函数
//delay 延迟
//atleast  在time时间内必须执行一次
function throttle(fn, delay, atleast) {
    var timeout = null,
         startTime = new Date();
    return function() {
        var curTime = new Date();
        clearTimeout(timeout);
         // 如果达到了规定的触发时间间隔，触发 handler
        if(curTime - startTime >= atleast) {
            fn();
            startTime = curTime;
        }else {
         // 没达到触发间隔，重新设定定时器
            timeout = setTimeout(fn, delay);
        }
    }
}

// 实际想绑定在 scroll 事件上的 handler
function lazyload(event) {
  console.log('触发了')
}
```
```js
// 采用了节流函数
window.addEventListener('scroll',throttle(lazyload,500,1000));
```

---

## 函数防抖（debounce）

```js
// debounce函数用来包裹我们的事件
function debounce(fn, delay) {
  // 持久化一个定时器 timer
  let timer = null;
  return function() {
    // 如果事件被触发，清除 timer 并重新开始计时
    clearTimeout(timer);
    timer = setTimeout(function() {
      fn();
    }, delay);
  }
}

// 实际想绑定在 scroll 事件上的 handler
function lazyload(event) {
    console.log('触发了')
}
// 采用了去抖函数
window.addEventListener('scroll',debounce(lazyload,500));
```

---

## 分时函数

如果一次获得了很多数据(比如有10W数据)，然后在前端渲染的时候会卡到爆,所以在处理这么多数据的时候，我们可以选择分批进行。

```js
function timeChunk(data, fn, count = 1, wait) {
    let obj, timer;

    function start() {
        let len = Math.min(count, data.length);
        for (let i = 0; i < len; i++) {
            val = data.shift();     // 每次取出一个数据，传给fn当做值来用
            fn(val);
        }
    }

    return function() {
        timer = setInterval(function() {
            if (data.length === 0) {    // 如果数据为空了，就清空定时器
                return clearInterval(timer);
            }
            start();    
        }, wait);   // 分批执行的时间间隔
    }
}

// 测试用例
let arr = [];
for (let i = 0; i < 100000; i++) {  // 这里跑了10万数据
    arr.push(i);
}
let render = timeChunk(arr, function(n) {   // n为data.shift()取到的数据
    let div = document.createElement('div');
    div.innerHTML = n;
    document.body.appendChild(div);
}, 8, 20);

render();
```
参考：[高阶函数，你怎么那么漂亮呢！](https://juejin.im/post/5ad6b34a6fb9a028cc61bfb3#heading-7)

---

## 惰性载入函数

假如你要写一个函数，里面有一些判断语句

```js
function foo(){
    if(a != b){
        console.log('aaa')
    }else{
        console.log('bbb')
    }
}
```

如果你的a和b是不变的，那么这个函数不论执行多少次，结果都是不变的，但是每次执行还要进行if判断，这就造成了不必要的浪费。
惰性载入表示函数执行的分支只会发生一次，这里有两种解决方式。

```js
// 常见的例子
if (window.addEventListener) {
    ele.addEventListener(type, fn, false);
} else  if (window.attachEvent) {
    ele.attachEvent('on' + type, fn);
}
```

**在函数被调用时再处理函数**

```js
function foo(){
    if(a != b){
        foo = function(){
            console.log('aaa')
        }
    }else{
        foo = function(){
            console.log('bbb')
        }
    }
    return foo();
}
```
这样进入每个分支后都会对foo进行赋值，覆盖了之前的函数，之后每次调用foo就不会再执行if判断

**在声明函数时就指定适当的函数**

```js
var foo = (function foo(){
    if(a != b){
        return function(){
            console.log('aaa')
        }
    }else{
        return function(){
            console.log('bbb')
        }
    }
})();
```
参考：[JS高级技巧(简洁版)](https://juejin.im/post/5aeff683f265da0ba351f786#heading-6)

---

## 实现once函数

```js
function test(){
  alert('hello');
}
var once = function (fn) {
  var isFirst = true;
  return function () {
    if (isFirst) {
      isFirst = !isFirst;
      fn();
    }
  };
};
once(test);
once(test);
```
---

## requirejs架子

require.js的诞生，就是为了解决这两个问题：

* 实现js文件的异步加载，避免网页失去响应；
* 管理模块之间的依赖性，便于代码的编写和维护。

```js
/** 网页中引入require.js及main.js **/
<script src="js/require.js" data-main="js/main"></script>

/** main.js 入口文件/主模块 **/
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: "js/lib",
  paths: {
    "jquery": "jquery.min",  //实际路径为js/lib/jquery.min.js
    "underscore": "underscore.min",
  }
});
// 执行基本操作
require(["jquery","underscore"],function($,_){
  // some code here
});
```

引用模块的时候，我们将模块名放在[ ]中作为reqiure()的第一参数；如果我们定义的模块本身也依赖其他模块,那就需要将它们放在[]中作为define()的第一参数。

```js
// 定义math.js模块
define(function () {
    var basicNum = 0;
    var add = function (x, y) {
        return x + y;
    };
    return {
        add: add,
        basicNum :basicNum
    };
});
// 定义一个依赖underscore.js的模块
define(['underscore'],function(_){
  var classify = function(list){
    _.countBy(list,function(num){
      return num > 30 ? 'old' : 'young';
    })
  };
  return {
    classify :classify
  };
})

// 引用模块，将模块放在[]内
require(['jquery', 'math'],function($, math){
  var sum = math.add(10,20);
  $("#sum").html(sum);
});
```

**加载非规范的模块**
理论上，require.js加载的模块，必须是按照AMD规范、用define()函数定义的模块。但是实际上，虽然已经有一部分流行的函数库（比如jQuery）符合AMD规范，更多的库并不符合。那么，require.js是否能够加载非规范的模块呢？

> 这样的模块在用require()加载之前，要先用require.config()方法，定义它们的一些特征。举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。

```js
require.config({
　　　　shim: {

　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
});
```

> require.config()接受一个配置对象，这个对象除了有前面说过的paths属性之外，还有一个shim属性，专门用来配置不兼容的模块。具体来说，每个模块要定义（1）exports值（输出的变量名），表明这个模块外部调用时的名称；（2）deps数组，表明该模块的依赖性。

比如，jQuery的插件可以这样定义：

```js
shim: {
　　　　'jquery.scroll': {
　　　　　　deps: ['jquery'],
　　　　　　exports: 'jQuery.fn.scroll'
　　　　}
}
```

**require.js插件**

require.js还提供一系列插件，实现一些特定的功能。domready插件，可以让回调函数在页面DOM结构加载完成后再运行。

```js
require(['domready!'], function (doc){
　　// called once the DOM is ready
});
```

text和image插件，则是允许require.js加载文本和图片文件。

```js
define([
　　'text!review.txt',
　　'image!cat.jpg'
　],
    function(review,cat){
　　　　console.log(review);
　　　　document.body.appendChild(cat);
　　}
　);
```

类似的插件还有json和mdown，用于加载json文件和markdown文件。

参考：[require.js的用法](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

---

## 函数柯里化

> 函数柯里化指的是将能够接收多个参数的函数转化为接收单一参数的函数，并且返回接收余下参数或结果的新函数的技术。

函数柯里化的主要作用和特点就是参数复用、提前返回和延迟计算/执行。

1.  **参数复用**

**引导**

```js
// 普通函数
function add(x,y){
    return x + y;
}

add(3,4);   //5

// 实现了柯里化的函数
// 接收参数，返回新函数，把参数传给新函数使用，最后求值
let add = function(x){
    return function(y){
        return x + y;
    }
};

add(3)(4);  // 7
```

**通用的柯里化函数**

感觉currying就是返回函数的函数，在此函数闭包中定义了私有域变量。

```js
function curry(fn) {
    let slice = Array.prototype.slice,  // 将slice缓存起来
        args = slice.call(arguments, 1);   // 这里将arguments转成数组并保存

    return function() {
        // 将新旧的参数拼接起来
        let newArgs = args.concat(slice.call(arguments));    
        return fn.apply(null, newArgs); // 返回执行的fn并传递最新的参数
    }
}
if (typeof Function.prototype.bind === "undefined"){
  Function.prototype.bind = function (thisArgs){
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function (){
      let newArgs = args.concat(slice.call(arguments))
      return fn.apply(thisArgs, newArgs);
    }
  }
}
```


**ES6版的柯里化函数**

```js
function curry(fn, ...allArgs) {
    const g = (...allArgs) => allArgs.length >= fn.length ?
        fn(...allArgs) : (...args) => g(...allArgs, ...args)

    return g;
}

// 测试用例
const foo = curry((a, b, c, d) => {
    console.log(a, b, c, d);
});
foo(1)(2)(3)(4);    // 1 2 3 4
const f = foo(1)(2)(3);
f(5);               // 1 2 3 5
function trueCurrying(fn, ...args) {
    if (args.length >= fn.length) {
        return fn(...args)
    }
    return function (...args2) {
        return trueCurrying(fn, ...args, ...args2)
    }
}
// 比较多次接受的参数总数与函数定义时的入参数量，
//当接受参数的数量大于或等于被 Currying 函数的传入参数数量时，
//就返回计算结果，否则返回一个继续接受参数的函数。
//注意这点和上边的区别
```


**题目：需要写一个函数，满足**

```js
curry(fn)(1)(2)(3) //6
var fn = function(a,b,c) {
    return a+b+c;
}

function curry(fn) {
    var arr = [],
    mySlice = arr.slice
    fnLen = fn.length;

    function curring() {
        arr = arr.concat(mySlice.call(arguments));
        if(arr.length < fnLen) {
            return curring;
        }
        return fn.apply(this, arr);
    }
  return curring;
}
curry(fn)(1)(2)(3);//6
```
本小题来自：[几个让我印象深刻的面试题(一)](https://zhuanlan.zhihu.com/p/25514220)

1.  **提前返回**

```js
var addEvent = function(el, type, fn, capture) {
    if (window.addEventListener) {
        el.addEventListener(type, function(e) {
            fn.call(el, e);
        }, capture);
    } else if (window.attachEvent) {
        el.attachEvent("on" + type, function(e) {
            fn.call(el, e);
        });
    } 
};
```
上面的方法有什么问题呢？很显然，我们每次使用addEvent为元素添加事件的时候，(eg. IE6/IE7)都会走一遍if...else if ...，其实只要一次判定就可以了，怎么做？–柯里化。改为下面这样子的代码：

```js
var addEvent = (function(){
    if (window.addEventListener) {
        return function(el, sType, fn, capture) {
            el.addEventListener(sType, function(e) {
                fn.call(el, e);
            }, (capture));
        };
    } else if (window.attachEvent) {
        return function(el, sType, fn, capture) {
            el.attachEvent("on" + sType, function(e) {
                fn.call(el, e);
            });
        };
    }
})();
```

初始addEvent的执行其实值实现了部分的应用（只有一次的if...else if...判定），而剩余的参数应用都是其返回函数实现的，典型的柯里化。

**对比：惰性加载**

```js
let addEvent = function(ele, type, fn) {
    if (window.addEventListener) {
        addEvent = function(ele, type, fn) {
            ele.addEventListener(type, fn, false);
        }
    } else  if (window.attachEvent) {
        addEvent = function(ele, type, fn) {
            ele.attachEvent('on' + type, function() {
                fn.call(ele)
            });
        }
    }

    addEvent(ele, type, fn);
```

1.  **延迟计算/运行**

ES5中的bind方法

```js
if (!Function.prototype.bind) {
    Function.prototype.bind = function(context) {
        var self = this,
            args = Array.prototype.slice.call(arguments);

        return function() {
            return self.apply(context, args.slice(1));    
        }
    };
}
```
推荐阅读：[从一道面试题认识函数柯里化](https://juejin.im/post/5b8350246fb9a019c372d26d)

参考：[ES6版的柯里化函数](https://juejin.im/post/5ad6b34a6fb9a028cc61bfb3#heading-4)、[JS中的柯里化(currying)](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)

---

## 手写一个 bind 方法

**带一个参数：**

```js
Function.prototype.bind = function(context) {
    let self = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments);

    return function() {
        return self.apply(context, args.slice(1));    
    }
};
```

**带多个参数：**

```js
//ES3实现
if(!Function.prototype.bind){
    Function.prototype.bind = function(o, args){

        var self = this,
            boundArgs = arguments;//注：arguments是指sum.bind(null,1)中的参数null和1

        return function(){                 //此时返回的只是一个函数
            var args = [], i;
            for(var i=1; i< boundArgs.length; i++){  
                 args.push(boundArgs[i]);
            }
            for(var i =0; i< arguments.length; i++){
                 args.push(arguments[i]);//注：这里的arguments是指result(2)中的参数2
            }
            return self.apply(o, args);    
        }

    }

}
```

**或者**

```js
// 代码来自书籍 《javaScript 模式》
if (typeof Function.prototype.bind === "undefined"){
  Function.prototype.bind = function (thisArgs){
    var fn = this,
        slice = Array.prototype.slice,
        args = slice.call(arguments, 1);
    return function (){
      return fn.apply(thisArgs, args.concat(slice.call(arguments)));
    }
  }
}
//注：前后arguments不是一回事哦~

//调用
var sum = function(x,y){ return x+y };
var result = sum.bind(null,1);
result(2);   // 3
```

**或者**

```js
Function.prototype.bind = function(){
  var fn = this;
  var args = Array.prototye.slice.call(arguments);
  var context = args.shift();

  return function(){
    return fn.apply(context, args.concat(Array.prototype.slice.call(arguments)));
  };
```
参考：[js中的bind](https://segmentfault.com/q/1010000005056387)

其他文章:[JavaScirpt 的 bind 函数究竟做了哪些事](https://juejin.im/post/5ae2620a51882567336a7194)

---

## new 的过程

首先来看一下，函数声明的过程

```js
// 实际代码
function fn1() {}

// JavaScript 自动执行
fn1.protptype = {
    constructor: fn1,
    __proto__: Object.prototype
}

fn1.__proto__ = Function.prototype
var a = new myFunction("Li","Cherry");
//伪代码
new myFunction{
    var obj = {};
    obj.__proto__ = myFunction.prototype;
    var result = myFunction.call(obj,"Li","Cherry");
    return typeof result === 'object'? result : obj;
}
```

1.  创建一个空对象 obj;
2.  将新创建的空对象的隐式原型指向其构造函数的显示原型。
3.  使用 call 改变 this 的指向
4.  如果无返回值或者返回一个非对象值，则将 obj 返回作为新对象；如果返回值是一个新对象的话那么直接直接返回该对象。

所以我们可以看到，在 new 的过程中，我们是使用 call 改变了 this 的指向。

```js
var NEW = function(func) {
    var o = Object.create(func.prototype)
    var k = func.call(o)
    if (typeof k === 'object') {
        return k
    } else {
        return o
    }
}
```

---

## javascript里面的继承怎么实现，如何避免原型链上面的对象共享

什么是原型链

> 当一个引用类型继承另一个引用类型的属性和方法时候就会产生一个原型连。

ES5:寄生组合式继承:通过借用构造函数来继承属性和原型链来实现子继承父。

```js
function ParentClass(name) {
      this.name = name;
    }
    ParentClass.prototype.sayHello = function () {
      console.log("I'm parent!" + this.name);
    }
    function SubClass(name, age) {
      //若是要多个参数可以用apply 结合 ...解构
      ParentClass.call(this, name);
      this.age = age;
    }
    SubClass.prototype.sayChildHello = function (name) {
      console.log("I'm child " + this.name)
    }

    SubClass.prototype = Object.create(ParentClass.prototype);
    SubClass.prototype.constructor = SubClass;

    let testA = new SubClass('CRPER')

    // Object.create()的polyfill
    /*
    function pureObject(obj){
        //定义了一个临时构造函数
         function F() {}
         //将这个临时构造函数的原型指向了传入进来的对象。
         F.prototype = obj;
         //返回这个构造函数的一个实例。该实例拥有obj的所有属性和方法。
         //因为该实例的原型是obj对象。
         return new F();
    }
    */
```
或
```js
    function subClass() {
        superClass.apply(this, arguments);
        this.abc = 1;
    }

    function inherits(subClass, superClass) {
        function Inner() {}

        Inner.prototype = superClass.prototype;
        subClass.prototype = new Inner();
        subClass.prototype.constructor = subClass;
    }

    inherits(subClass, superClass);

    subClass.prototype.getTest = function() {
        console.log("hello")
    };
```

ES6: 其实就是ES5的语法糖,不过可读性很强..

```js
class ParentClass {
      constructor(name) {
        this.name = name;
      }
      sayHello() {
        console.log("I'm parent!" + this.name);
      }
    }

    class SubClass extends ParentClass {
      constructor(name) {
        super(name);
      }
      sayChildHello() {
        console.log("I'm child " + this.name)
      }
      // 重新声明父类同名方法会覆写,ES5的话就是直接操作自己的原型链上
      sayHello(){
        console.log("override parent method !,I'm sayHello Method")
      }
    }

    let testA = new SubClass('CRPER')
```

---

## 继承 JS 内置对象（Date）

写在前面，本节只记录了[如何继承Date对象...](https://juejin.im/post/5a5c2193f265da3e377bfd83)的解决方案，具体问题和解析过程请看原文

**ES5**

```js
// 需要考虑polyfill情况
Object.setPrototypeOf = Object.setPrototypeOf ||
function(obj, proto) {
    obj.__proto__ = proto;

    return obj;
};

/**
 * 用了点技巧的继承，实际上返回的是Date对象
 */
function MyDate() {
    // bind属于Function.prototype，接收的参数是：object, param1, params2...
    var dateInst = new(Function.prototype.bind.apply(Date, [Date].concat(Array.prototype.slice.call(arguments))))();

    // 更改原型指向，否则无法调用MyDate原型上的方法
    // ES6方案中，这里就是[[prototype]]这个隐式原型对象，在没有标准以前就是__proto__
    Object.setPrototypeOf(dateInst, MyDate.prototype);

    dateInst.abc = 1;

    return dateInst;
}

// 原型重新指回Date，否则根本无法算是继承
Object.setPrototypeOf(MyDate.prototype, Date.prototype);

MyDate.prototype.getTest = function getTest() {
    return this.getTime();
};

let date = new MyDate();

// 正常输出，譬如1515638988725
console.log(date.getTest());
```

**ES6**

```js
class MyDate extends Date {
    constructor() {
        super();
        this.abc = 1;
    }
    getTest() {
        return this.getTime();
    }
}

let date = new MyDate();

// 正常输出，譬如1515638988725
console.log(date.getTest());
```

注意：这里的正常输出环境是直接用ES6运行，不经过babel打包，打包后实质上是转化成ES5的，所以效果完全不一样,会报错的

---

## 简易双向数据绑定

```html
<body>
  <input type="text" id="foo">
  <p id="test"></p>
  <script>
    var user = {}

    Object.defineProperty(user, 'inputValue', {
      configurable: true,
      get: function() {
        return document.getElementById('foo').value
      },
      set: function(value) {
        document.getElementById('foo').value = value
        document.getElementById('test').innerHTML = value
      }
    })

    document.getElementById('foo').addEventListener('keyup', function() {
      document.getElementById('test').innerHTML = user.inputValue
    })
  </script>
</body>
```
---

## JavaScript实现发布-订阅模式

发布-订阅模式又叫观察者模式，它定义对象间的一种一对多的依赖关系,当一个对象的状态发生改变时,所有依赖于它的对象都将得到通知。JavaScript开发中我们一般用事件模型来代替传统的发布-订阅模式

**示例1**

```js
function Dep() {//发布者
        this.subs = [];
    }

    Dep.prototype.addSub = function (sub) {
        this.subs.push(sub);
    }

    Dep.prototype.notify = function () {
        this.subs.forEach(sub=>sub.update());
    }

    function Watcher(fn) {//订阅者
        this.fn = fn;
    }

    Watcher.prototype.update = function () {
         this.fn();
    }

    var dep = new Dep();
    dep.addSub(new Watcher(function () {
        console.log('okokok');
    }))
    dep.notify();
```
推荐阅读：[Javascript设计模式之发布-订阅模式](https://juejin.im/post/5a9108b6f265da4e7527b1a4)

**示例2**

```js
function Event(){
    this.list={},
    this.on=function(key,cb){//订阅事件
        if(!this.list[key]){
            this.list[key] = []
        }
        this.list[key].push(cb)
    },
    this.emit = function(){//触发事件
        var key = Array.prototype.shift.call(arguments)
        var e = this.list[key]
        if(!e){
            return
        }
        var args = Array.prototype.slice.call(arguments)
        for(var i = 0;i<e.length;i++){
            e[i].apply(null,args)
        }
    }
}
```

尝试一下：

```js
var a = new Event()
a.on('a',function(x){console.log(x)})
a.emit('a',1)//1
```
推荐阅读：[从单向到双向数据绑定](https://juejin.im/post/5ad1dfdc6fb9a028ba1fe9b2)

**示例3**

```js
var myBus = (function() {
    var clienlist = {},
        addlisten, trigger, remove;
    /**
     * 增加订阅者
     * @key {String} 类型
     * @fn {Function} 回掉函数
     * */
    addlisten = function(key, fn) {
        if(!clienlist[key]) {
            clienlist[key] = [];
        }
        clienlist[key].push(fn);
    };
    /**
     * 发布消息
     * */
    trigger = function() {
        var key = [].shift.call(arguments), //取出消息类型
            fns = clienlist[key]; //取出该类型的对应的消息集合
        if(!fns || fns.length === 0) {
            return false;
        }
        for(var i = 0, fn; fn = fns[i++];) {
            fn.apply(this, arguments);
        }
    };
    /**
     * 删除订阅
     * @key {String} 类型
     * @fn {Function} 回掉函数
     * */
    remove = function(key, fn) {
        var fns = clienlist[key]; //取出该类型的对应的消息集合
        if(!fns) { //如果对应的key没有订阅直接返回
            return false;
        }
        if(!fn) { //如果没有传入具体的回掉，则表示需要取消所有订阅
            fns && (fns.length = 0);
        } else {
            for(var l = fns.length - 1; l >= 0; l--) { //遍历回掉函数列表
                if(fn === fns[l]) {
                    fns.splice(l, 1); //删除订阅者的回掉
                }
            }
        }
    };
    return {
        $on: addlisten,
        $emit: trigger,
        $off: remove
    }
})();
```
推荐阅读：[写一个简单vue 中间件，$emit、$on](https://juejin.im/post/5ad213c05188255c637b64bf)

**示例4**
这个示例更像**示例2**、**示例3**的总结，我也放这里吧，多看几种写法也多少开阔一下思路或全当复习

卖烧饼的店主可以把小明、小龙的电话记录下来,等店里有烧饼了在通知小龙小明来拿这就是所谓的发布-订阅模式，代码如下：

```js
/*烧饼店*/        
var Sesamecakeshop={
    clienlist:[],//缓存列表
    addlisten:function(fn){//增加订阅者
        this.clienlist.push(fn);
    },
    trigger:function(){//发布消息
        for(var i=0,fn;fn=this.clienlist[i++];){
            fn.apply(this,arguments);
        }
    }
}

/*小明发布订阅*/
Sesamecakeshop.addlisten(function(price,taste){
    console.log("小明发布的"+price+"元，"+taste+"味道的");
});
/*小龙发布订阅*/
Sesamecakeshop.addlisten(function(price,taste){
    console.log("小龙发布的"+price+"元，"+taste+"味道的");
});        

Sesamecakeshop.trigger(10,"椒盐");
```
从代码中可以看出，只有小明，小龙预定了烧饼，烧饼店就可以发布消息告诉小龙与小明。但是有个问题不知道大家发现了没有。小明只喜欢椒盐味道的。而小龙只喜欢焦糖味道的。上面的代码就满足不了客户的需求，给客户一种感觉就是，不管我喜欢不喜欢，你都会发给我。如果发布比较多，客户就会感到厌烦，甚至会想删除订阅。下边是对代码进行改良大家可以看看。

```js
/*烧饼店*/        
var Sesamecakeshop={
    clienlist:{},/*缓存列表*/
    /**
     * 增加订阅者
     * @key {String} 类型
     * @fn {Function} 回掉函数
     * */
    addlisten:function(key,fn){
        if(!this.clienlist[key]){
            this.clienlist[key]=[];
        }
        this.clienlist[key].push(fn);
    },
    /**
     * 发布消息
     * */
    trigger:function(){
        var key=[].shift.call(arguments),//取出消息类型
            fns=this.clienlist[key];//取出该类型的对应的消息集合
        if(!fns || fns.length===0){
            return false;
        }
        for(var i=0,fn;fn=fns[i++];){
            fn.apply(this,arguments);
        }
    },
    /**
     * 删除订阅
     * @key {String} 类型
     * @fn {Function} 回掉函数
     * */
    remove:function(key,fn){
        var fns=this.clienlist[key];//取出该类型的对应的消息集合
        if(!fns){//如果对应的key没有订阅直接返回
            return false;
        }
        if(!fn){//如果没有传入具体的回掉，则表示需要取消所有订阅
            fns && (fns.length=0);
        }else{
            for(var l=fns.length-1;l>=0;l--){//遍历回掉函数列表
                if(fn===fns[l]){
                    fns.splice(l,1);//删除订阅者的回掉
                }
            }
        }
    }
}

/*小明发布订阅*/
Sesamecakeshop.addlisten("焦糖",fn1=function(price,taste){
    console.log("小明发布的"+price+"元，"+taste+"味道的");
});
/*小龙发布订阅*/
Sesamecakeshop.addlisten("椒盐",function(price,taste){
    console.log("小龙发布的"+price+"元，"+taste+"味道的");
});        

Sesamecakeshop.trigger("椒盐",10,"椒盐");

Sesamecakeshop.remove("焦糖",fn1);//注意这里是按照地址引用的。如果传入匿名函数则删除不了        

Sesamecakeshop.trigger("焦糖",40,"焦糖");
```
推荐必读：[发布-订阅模式](https://juejin.im/post/59bf4ff9f265da064b46e508)

---

## 扁平化后的数组

如：[1, [2, [ [3, 4], 5], 6]] => [1, 2, 3, 4, 5, 6]

```js
var data =  [1, [2, [ [3, 4], 5], 6]];

    function flat(data, result) {
        var i, d, len;
        for (i = 0, len = data.length; i < len; ++i) {
            d = data[i];
            if (typeof d === 'number') {
                result.push(d);
            } else {
                flat(d, result);
            }
        }
    }

    var result = [];
    flat(data, result);

    console.log(result);
```

---

## 冒泡排序

> 解析:
>
> 1.  比较相邻的两个元素，如果前一个比后一个大，则交换位置。
> 2.  第一轮的时候最后一个元素应该是最大的一个。
> 3.  按照步骤一的方法进行相邻两个元素的比较，这个时候由于最后一个元素已经是最大的了，所以最后一个元素不用比较。

js代码实现

```
function bubble_sort(arr){
  for(var i = 0;i < arr.length - 1; i++){
    for(var j = 0;j < arr.length - i - 1;j++){
      if(arr[j] > arr[j+1]){
        [arr[j], arr[j+1]] = [arr[j + 1], arr[j]]
      }
    }
  }
}

var arr = [3,1,5,7,2,4,9,6,10,8];
bubble_sort(arr);
console.log(arr);
```

---

## 快速排序

快速排序是对冒泡排序的一种改进

> 解析：
>
> 1.  第一趟排序时将数据分成两部分，一部分比另一部分的所有数据都要小。
> 2.  然后递归调用，在两边都实行快速排序。

js代码实现

```js
function quick_sort(arr){
  if(arr.length <= 1){
    return arr;
  }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];
  var right = [];
  for (var i = 0;i < arr.length; i++) {
    if(arr[i] < pivot){
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return quick_sort(left).concat([pivot],quick_sort(right));
}

var arr=[5,6,2,1,3,8,7,1,2,3,4,7];
console.log(quick_sort(arr));
```
---

## 选择排序

```
// 选择排序：大概思路是找到最小的放在第一位，找到第二小的放在第二位，以此类推 算法复杂度O(n^2)
选择demo:
function selectionSort(arr) {
    let len = arr.length;
    let minIndex;
    for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     //寻找最小的数
                minIndex = j;                 //将最小数的索引保存
            }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
return arr;
}
```
参考：[2018前端面试总结...](https://juejin.im/post/5b94d8965188255c5a0cdc02)

## 插入排序

> 解析：
>
> 1.  从第一个元素开始，该元素可以认为已经被排序
> 2.  取出下一个元素，在已经排序的元素序列中从后向前扫描
> 3.  如果该元素（已排序）大于新元素，将该元素移到下一位置
> 4.  重复步骤3，直到找到已排序的元素小于或者等于新元素的位置
> 5.  将新元素插入到下一位置中
> 6.  重复步骤2

js代码实现

```js
function insert_sort(arr){
  var i=1,
  j,key,len=arr.length;
  for(;i<len;i++){
    var j=i;
    var key=arr[j];
    while(--j>-1){
      if(arr[j]>key){
        arr[j+1]=arr[j];
      }else{
        break;
      }
    }

    arr[j+1]=key;
  }

  return arr;
}
```
或
```js
function insert_sort(arr) {
  let len = arr.length;
  let preIndex, current;
  for (let i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
    }
    arr[preIndex + 1] = current;
  }
  return arr;
}

insert_sort([2,34,54,2,5,1,7]);
```