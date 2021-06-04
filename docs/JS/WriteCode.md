# 前端面试中常考的源码实现 - - 续更....

> 内容速览 

 - 函数防抖 / 节流
 - 实现一个new 关键字的功能函数 _new( func, args )
 - 手动实现 `call` / `apply` / `bind`
 - 实现深拷贝函数
 - 基于 `ES5 ` / `ES6` 实现双向绑定
 - `instanceof` 原理与实现
 - 实现支持绑定、解绑和派发的事件类


## 函数防抖 / 节流
#### * 函数防抖
**定义**：多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行。
**原理**：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。

> scroll 的一个简单例子
```js
let startTime = Date.now(); //开始时间
let time = 500; //间隔时间
let timer;
window.onscroll = function throttle(){
  let currentTime = Date.now();
  if(currentTime - startTime >= time){
    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    console.log('滚动条位置：' + scrollTop);
    startTime = currentTime;
  }else{
    clearTimeout(timer);
    timer = setTimeout(function () {
        throttle()
    }, 50);
  }
}
```
防抖函数的封装使用 :
```js
/**
 * 防抖函数
 * @param method 事件触发的操作
 * @param delay 多少毫秒内连续触发事件，不会执行
 * @returns {Function}
 */
function debounce(method,delay) {
  let timer = null;
  return function () {
    let self = this,
        args = arguments;
    timer && clearTimeout(timer);
    timer = setTimeout(function () {
        method.apply(self,args);
    },delay);
  }
}

window.onscroll = debounce(function () {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log('滚动条位置：' + scrollTop);
},200)
```
#### * 函数节流
**定义**：触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用。
**原理**：对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。

> 节流函数的封装使用 :
    
```js
/**
 * 节流函数
 * @param method 事件触发的操作
 * @param mustRunDelay 间隔多少毫秒需要触发一次事件
 */
function throttle(method, mustRunDelay) {
  let timer,
      args = arguments,
      start;
  return function loop() {
    let self = this;
    let now = Date.now();
    if(!start){
      start = now;
    }
    if(timer){
      clearTimeout(timer);
    }
    if(now - start >= mustRunDelay){
      method.apply(self, args);
      start = now;
    }else {
      timer = setTimeout(function () {
        loop.apply(self, args);
      }, 50);
    }
  }
}
window.onscroll = throttle(function () {
  let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  console.log('滚动条位置：' + scrollTop);
},800)
```

## 实现`new`关键字的功能函数 _new( func, args )
```js
/**
 * 实现一个new 关键字的功能函数 _new( func, args ) 
 */ 
function _new( func, args ) {
	if(typeof func !== 'function') {
		return new Error('参数必须是一个函数')
	}
	let obj = Object.create( func.prototype )
	let res = func.call( obj, ...args )
	if(res !== null && (typeof res === 'object' || typeof res === 'String')) {
		return res
	}
	return obj
}
```

## 手动撸个call/apply/bind
#### * 实现call
来看下 `call` 的原生表现形式：
```js
function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

run.call({
  a: 'a',
  b: 'b'
}, 1, 2)
```
好了，开始手动实现我们的 ` call2` 。在实现的过程有个关键：

**如果一个函数作为一个对象的属性，那么通过对象的 `.` 运算符调用此函数，`this` 就是此对象**

```js
let obj = {
  a: 'a',
  b: 'b',
  test: function (arg1, arg2) {
    console.log(arg1, arg2)
    // this.a 就是 a; this.b 就是 b
    console.log(this.a, this.b) 
  }
}

obj.test(1, 2)
```
知道了实现关键，下面就是我们模拟的`call`：

```js
Function.prototype.call2 = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  // 默认上下文是window
  context = context || window
  // 保存默认的fn
  const { fn } = context

  // 前面讲的关键，将函数本身作为对象context的属性调用，自动绑定this
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  
  // 恢复默认的fn
  context.fn = fn
  return result
}

// 以下是测试代码
function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

test.call2({
  a: 'a',
  b: 'b'
}, 1, 2)
```
#### * 实现apply
`apply` 和 `call` 实现类似，只是传入的参数形式是数组形式，而不是逗号分隔的参数序列。

因此，借助es6提供的 `...` 运算符，就可以很方便的实现数组和参数序列的转化。
```js
Function.prototype.apply2 = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  context = context || window
  const { fn } = context

  context.fn = this
  let result
  if(Array.isArray(arguments[1])) {
    // 通过...运算符将数组转换为用逗号分隔的参数序列
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  context.fn = fn
  return result
}

/**
 * 以下是测试代码
 */

function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

test.apply2({
  a: 'a',
  b: 'b'
}, [1, 2])
```
#### * 实现 bind
bind的实现有点意思，它有两个特点：

 - 本身返回一个新的函数，所以要考虑 `new` 的情况 
 - 可以“保留”参数，内部实现了参数的拼接
 
```js
Function.prototype.bind2 = function(context) {
  if(typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const that = this
  // 保留之前的参数，为了下面的参数拼接
  const args = [...arguments].slice(1)

  return function F() {
    // 如果被new创建实例，不会被改变上下文！
    if(this instanceof F) {
      return new that(...args, ...arguments)
    }
	
    // args.concat(...arguments): 拼接之前和现在的参数
    // 注意：arguments是个类Array的Object, 用解构运算符..., 直接拿值拼接
    return that.apply(context, args.concat(...arguments))
  }
}

/**
 * 以下是测试代码
 */

function test(arg1, arg2) {
  console.log(arg1, arg2)
  console.log(this.a, this.b)
}

const test2 = test.bind2({
  a: 'a',
  b: 'b'
}, 1) // 参数 1

test2(2) // 参数 2
```
## * 实现深拷贝函数
实现一个对象的深拷贝函数，需要考虑对象的元素类型以及对应的解决方案：

 - 基础类型：这种最简单，直接赋值即可 
 - 对象类型：递归调用拷贝函数
 - 数组类型：这种最难，因为数组中的元素可能是基础类型、对象还可能数组，因此要专门做一个函数来处理数组的深拷贝

```js
/**
 * 数组的深拷贝函数
 * @param {Array} src 
 * @param {Array} target 
 */
function cloneArr(src, target) {
  for(let item of src) {
    if(Array.isArray(item)) {
      target.push(cloneArr(item, []))
    } else if (typeof item === 'object') {
      target.push(deepClone(item, {}))
    } else {
      target.push(item)
    }
  }
  return target
}

/**
 * 对象的深拷贝实现
 * @param {Object} src 
 * @param {Object} target 
 * @return {Object}
 */
function deepClone(src, target) {
  const keys = Reflect.ownKeys(src)
  let value = null

  for(let key of keys) {
    value = src[key]
    
    if(Array.isArray(value)) {
      target[key] = cloneArr(value, [])
    } else if (typeof value === 'object') {
      // 如果是对象而且不是数组, 那么递归调用深拷贝
      target[key] = deepClone(value, {})
    } else {
      target[key] = value
    }
  }

  return target
}
```
这段代码是不是比网上看到的多了很多？因为考虑很周全，请看下面的测试用例：

```js
// 这个对象a是一个囊括以上所有情况的对象
let a = {
  age: 1,
  jobs: { first: "FE" },
  schools: [
    { name: 'shenda' },
    { name: 'shiyan' }
  ],
  arr: [
    [ { value: '1' } ],
    [ { value: '2' } ],
  ]
};

let b = {}
deepClone(a, b)

a.jobs.first = 'native'
a.schools[0].name = 'SZU'
a.arr[0][0].value = '100'

console.log(a.jobs.first, b.jobs.first) // output: native FE
console.log(a.schools[0], b.schools[0]) // output: { name: 'SZU' } { name: 'shenda' }
console.log(a.arr[0][0].value, b.arr[0][0].value) // output: 100 1
console.log(Array.isArray(a.arr[0])) // output: true
```
看到测试用例，应该会有人奇怪为什么最后要输出 `Array.isArray(a.arr[0])` 。这主要是因为网上很多实现方法没有针对array做处理，直接将其当成object，**这样拷贝后虽然值没问题，但是array的元素会被转化为object**。这显然是错误的做法。

而上面所说的深拷贝函数就解决了这个问题。

## 如何深度复制一个javascript对象
ps：还有没有其他简便方法呢

我们知道`JSON`，本身提供两个方法 `JSON.stringify()` 和 `JSON.parse()`，提供了将`JSON对象`转换为`JSON结构的字符串`，以及将`JSON结构的字符串` 转换为`JSON`

> so：简便方法来了
```js
function clone(obj) {
　　let jsonStr = JSON.stringify(obj);
　　return JSON.parse(jsonStr);
}
```
<br>


## * 基于ES5/ES6实现“双向绑定”
要想实现，就要先看看什么是“双向数据绑定”，它和“单向数据绑定”有什么区别？这样才能知道要实现什么效果嘛。

**双向绑定**：视图（View）的变化能实时让数据模型（Model）发生变化，而数据的变化也能实时更新到视图层。

**单向数据绑定**：只有从数据到视图这一方向的关系。

## ES5的Object.defineProperty
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script>
      const obj = {
        value: ''
      }
      
      function onKeyUp(event) {
        obj.value = event.target.value
      }
      
      // 对 obj.value 进行拦截
      Object.defineProperty(obj, 'value', {
        get: function() {
          return value
        },
        set: function(newValue) {
          value = newValue
          document.querySelector('#value').innerHTML = newValue // 更新视图层
          document.querySelector('input').value = newValue // 数据模型改变
        }
      })
    </script>
</head>
<body>
  <p>
    值是：<span id="value"></span>
  </p>
  <input type="text" onkeyup="onKeyUp(event)">
</body>
</html>
```

## ES6的Proxy
随着，vue3.0放弃支持了IE浏览器。而且`Proxy`兼容性越来越好，能支持13种劫持操作。

因此，vue3.0选择使用`Proxy`来实现双向数据绑定，而不再使用`Object.defineProperty`。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script>
    const obj = {}

    const newObj = new Proxy(obj, {
      get: function(target, key, receiver) {
        return Reflect.get(target, key, receiver)
      },
      set: function(target, key, value, receiver) {
        if(key === 'value') {
          document.querySelector('#value').innerHTML = value
          document.querySelector('input').value = value
        }
        return Reflect.set(target, key, value, receiver)
      }
    })
    
    function onKeyUp(event) {
      newObj.value = event.target.value
    }
    
  </script>
</head>
<body>
  <p>
    值是：<span id="value"></span>
  </p>
  <input type="text" onkeyup="onKeyUp(event)">
</body>
</html>
```

## instanceof原理与实现
`instanceof`是通过原型链来进行判断的，所以只要不断地通过访问`__proto__`，就可以拿到构造函数的原型`prototype`。直到`null`停止。

```js
/**
 * 判断left是不是right类型的对象
 * @param {*} left 
 * @param {*} right 
 * @return {Boolean}
 */
function instanceof2(left, right) {
  let prototype = right.prototype;

  // 沿着left的原型链, 看看是否有何prototype相等的节点
  left = left.__proto__;
  while(1) {
    if(left === null || left === undefined) {
      return false;
    }
    if(left === prototype) {
      return true;
    }
    left = left.__proto__;
  }
}

// *2
function instanceof_2(L, R) {
  let R_P = R.prototype
  let L = L.__proto__
  while(true) {
    if(L === null || L === undefined) {
      return false
    }
    if(L === R_P ) {
      return true
    }
    L = L.__proto__
  }
}

/**
 * 测试代码
 */

console.log(instanceof2([], Array)) // output: true

function Test(){}
let test = new Test()
console.log(instanceof2(test, Test)) // output: true
```

## 实现支持绑定、解绑和派发的事件类
**实现思路**：这里涉及了“订阅/发布模式”的相关知识。参考`addEventListener(type, func)`和`removeEventListener(type, func)`的具体效果来实现即可。

```js
// 数组置空：
// arr = []; arr.length = 0; arr.splice(0, arr.length)
class Event {
  constructor() {
    this._cache = {};
  }

  // 注册事件：如果不存在此种type，创建相关数组
  on(type, callback) {
    this._cache[type] = this._cache[type] || [];
    let fns = this._cache[type];
    if (fns.indexOf(callback) === -1) {
      fns.push(callback);
    }
    return this;
  }

  // 触发事件：对于一个type中的所有事件函数，均进行触发
  trigger(type, ...data) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach(fn => {
        fn(...data);
      });
    }
    return this;
  }

  // 删除事件：删除事件类型对应的array
  off(type, callback) {
    let fns = this._cache[type];
    // 检查是否存在type的事件绑定
    if (Array.isArray(fns)) {
      if (callback) {
        // 卸载指定的回调函数
        let index = fns.indexOf(callback);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        // 全部清空
        fns = [];
      }
    }
    return this;
  }
}

// 以下是测试函数
const event = new Event();
event
  .on("test", a => {
    console.log(a);
  })
  .trigger("test", "hello");
```

## 利用 a 标签解析 URL
有时候我们需要从一个 URL 中提取域名，查询关键字，变量参数值等，一般我们会自己去解析 URL 来获取这些内容。可是你或许不知道还有更简单的方法。
即创建一个 a 标签将需要解析的 URL 赋值给 a 的 href 属性，然后我们就能很方便的拿到这些内容。代码如下：
```js
function parseURL(url) {
  var a =  document.createElement('a');
  a.href = url;
  return {
    host: a.hostname,
    port: a.port,
    query: a.search,
    params: (function(){
      var ret = {},
        seg = a.search.replace(/^\?/,'').split('&'),
        len = seg.length, i = 0, s;
      for (;i<len;i++) {
        if (!seg[i]) { continue; }
        s = seg[i].split('=');
        ret[s[0]] = s[1];
      }
      return ret;
    })(),
    hash: a.hash.replace('#','')
  };
}
```