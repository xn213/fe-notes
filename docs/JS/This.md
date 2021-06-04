# 关于 this 的解释说明

我们经常在 JavaScript 中看到 this 关键字，它其实是一个对象，它可以是全局对象、当前对象，或者任意对象，函数的调用方式决定了 this 的值。接下来我们来看看不同的调用方式对 this 值的影响。

### 全局对象

在全局环境中，this 指向全局对象，在浏览器中，它就是 window 对象。下面的示例中，无论是否是在严格模式下，this 都是指向全局对象。

```js
var x = 1
console.log(this.x)               // 1
console.log(this.x === x)         // true
console.log(this === window)      // true
```

如果函数是在全局环境中被调用，在非严格模式下，函数中 this 也指向全局对象；如果是在严格模式下，this 将会是 undefined。ES5 为了使 JavaScript 运行在更有限制性的环境而添加了[严格模式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Strict_mode)，严格模式为了消除安全隐患，禁止了 this 关键字指向全局对象。


```js
var x = 1
function demo() {
  console.log(this.x)
}

demo()        // 1
```

```js
"use strict" // 使用严格模式
var x = 1

function demo() {
  console.log(this.x)
}

demo()        // 报错 "Cannot read property 'x' of undefined"，因为此时 this 是 undefined
```

## 作为对象的方法调用

当函数作为某个对象的方法调用时，this 指向该对象。值得注意的是，如果将函数赋值给某个变量，并没有立即执行，this 的值就要根据函数执行时所在的环境对象进行判断。

```js
var x = 1
var obj = {
  x: 2,
  getX: function() {
    console.log(this.x)
  }
}

obj.getX()     // 2
var a = obj.getX
a()            // 1
```

在上面的例子中，直接运行 obj.getX() ，调用该函数的对象是 obj，所以 this 指向 obj，得到 this.x 的值是 2；之后我们将 getX 方法首先赋值给变量 a，a 运行在全局环境中，所以此时 this 指向全局变量，得到 this.x 为 1。

我们再来看一个例子，如果函数被多个对象嵌套调用，this 会指向什么。

```js
var x = 1
var obj = {
  x: 2,
  y: {
    x: 3,
    getX: function() {
      console.log(this.x)
    }
  }
}

obj.y.getX()      // 3
```

为什么结果是 3 而不是 2 呢，虽然 obj 是函数调用的发起者，但是 this 始终会指向直接调用函数的上一级对象，即 y。

对象可以嵌套，函数也可以，如果函数嵌套，this 会有变化吗？我们通过代码来探讨一下。

```js
var obj= {
  y: function() {
    console.log(this === obj)
    getX()
    function getX() {
      console.log(this === obj)
      console.log(this)
    }
  }
}

obj.y()  
// true
// false
// 全局对象
```

在函数 y 中，this 指向了调用它的对象 obj，这是没有问题的。但是在嵌套函数 getX 中，this 并不指向 obj。嵌套的函数不会从调用它的函数中继承 this，当嵌套函数作为函数调用时，其 this 值在非严格模式下指向全局对象，在严格模式是 undefined。


## 作为构造函数调用

我们可以使用 new 关键字，通过构造函数生成一个实例对象。此时，this 便指向这个新对象。

```js
var x = 1
function Demo() {
  this.x = 2
}

var a = new Demo()
console.log(a.x)    // 2
```

值得一提的是，如果构造函数返回了一个对象，this 便会指向返回的对象，如果构造函数返回了非引用类型（string，number，boolean，null，undefined），this 仍然指向实例化的新对象。

```js
var x = 1
function Demo() {
  this.x = 2
  return {
    x: 3
  }
}

var a = new Demo()
console.log(a.x)      // 3
```

```js
var x = 1
function Demo() {
  this.x = 2
  return 3
}

var a = new Demo()
console.log(a.x)      // 2
```

## 使用 call 和 apply

如果你想改变 this 的指向，可以使用 call 或 apply 方法，它们都可以改变函数的调用对象。将一个对象作为第一个参数传给 call 或 apply，this 便会绑定到这个对象。如果第一个参数不传或者传 null 、undefined，默认 this 指向全局对象（非严格模式）或 undefined（严格模式）。

```js
var x =1;
var obj = {
  x: 2
}
function getX() {
  console.log(this.x)
}

getX.call(obj)      // 2
getX.apply(obj)     // 2

getX.call()         // 1
getX.apply(null)    // 1
getX.call(undefined)    // 1
```

使用 call 和 apply 时，如果给 this 传的不是对象，JavaScript 会使用相关构造函数将其转化为对象，比如传 number 类型，会进行 `new Number()` 操作，传 string 类型，会进行 `new String()` 操作。

```js
functiondemo() {
  console.log(Object.prototype.toString.call(this))
}

demo.call('hello')      // [object String]
demo.apply(5)           // [object Number]
```

call 和 apply 的区别在于，call 的第二个及后续参数是一个参数列表，apply 的第二个参数是数组。参数列表和参数数组都将作为函数的参数进行执行。

```js
var x =1
var obj = {
  x: 2
}

function getSum(y, z) {
  console.log(this.x + y + z)
}

getSum.call(obj, 3, 4)       // 9
getSum.apply(obj, [3, 4])    // 9
```

### bind 方法

bind 方法会创建一个新函数，新函数的 this 会永久的指向 bind 传入的第一个参数。我们来看下面的列子。

```js
var x =1
var obj_1 = {
  x: 2
}
var obj_2 = {
  x: 3
}

function getX() {
  console.log(this.x)
}

var a = getX.bind(obj_1)
var b = a.bind(obj_2)

getX()           // 1
a()              // 2
b()              // 2
a.call(obj_2)    // 2
```

在上面的例子中，虽然我们尝试给函数 a 重新指定 this 的指向，但是它依旧指向第一次 bind 传入的对象，即使是使用 call 或 apply 方法也不能改变这一事实。

## 箭头函数

ES6 新增了箭头函数，箭头函数不仅更加整洁，还对 this 的指向进行了改进。箭头函数会从作用域链的上一层继承 this。

在前面函数嵌套函数的例子中，被嵌套的函数不会继承上层函数的 this，如果使用箭头函数，会发生什么变化呢？

```js
var obj= {
  y: function() {
    console.log(this === obj)
    var getX = () => {
      console.log(this === obj)
    }
    getX()
  }
}

obj.y() 
// true
// true
```

和普通函数不一样，箭头函数中的 this 指向了 obj，这是因为它从上一层的函数中继承了 this，你可以理解为箭头函数修正了 this 的指向。我们再来看个例子。

```js
var x =1
var obj = {
  x: 2,
  y: function() {
    var getX = () => {
      console.log(this.x)
    }
    return getX()
  }
}

obj.y()            // 2
var a = obj.y
a()               // 1
```

如果理解了前文，这里也是很容易理解的。obj.y() 在运行时，调用它的对象是 obj，所以 y 中的 this 指向 obj，y 中的箭头函数 getX 继承了 y 中的 this，所以结果是 2。如果我们先将 y 赋值给全局作用域中的变量 a，a 在运行时，y 中的 this 便指向了全局对象，所以得到的结果是 1（非严格模式）。

同 bind 一样，箭头函数也很“顽固”，我们无法通过 call 和 apply 来改变 this 的指向。

```js
var x = 1
var obj = {
  x: 2
}

var a = () => {
  console.log(this.x)
}

a.call(obj)       // 1
a.apply(obj)      // 1
```

## 小结

本篇文章介绍了 this 指向的几种情况，不同的运行环境和调用方式都会对 this 产生影响。this 是 JavaScript 中非常重要的关键字，理解它能让我们更熟练地使用这门语言，也能避免踩坑。总的来说，函数 this 的指向取决于当前调用该函数的对象，也就是执行时的对象。在这一节中，你需要掌握：

* this 指向全局对象的情况；


* 严格模式和非严格模式下 this 的区别；


* 函数作为对象的方法调用时 this 指向的几种情况；


* 作为构造函数时 this 的指向，以及是否 return 的区别；


* 使用 call 和 apply 改变调用函数的对象；


* bind 创建的函数中 this 的指向；


* 箭头函数中的 this 指向。
