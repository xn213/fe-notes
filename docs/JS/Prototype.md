# 原型与原型链

在 JavaScript 中，你可能会经常看到原型、原型链、`prototype`、`__proto__` 等高深莫测的词汇，它们到底是什么，在 JavaScript 中起着什么作用，让我们一起来揭开这层神秘的面纱。


---
# 彻底终结原型链吧

文章极短，没有图！

## 1.概念

### __proto__

* _对象特有_
* 指向上层（创建自己的那个构造函数）的pototype
* 因此对象可以从 prototype 中继承属性和方法

### prototype

* _函数特有_
* 用于存储要共享的属性和方法

### constructor

* _函数特有，定义在prototype里面_
* 通过new创建实例时，该实例便继承了prototype的属性和方法

## 2. 既是函数也是对象

### Object：既是对象，也是构造函数

* 作为对象：`Object.__proto__`  = `Function.prototype`

* 作为函数：`Object.prototype`是原型链的顶端，`Object.prototype.__proto__`  = null

### Function：既是对象，也是构造函数

* 作为对象：`Function.__proto__` = `Function.prototype`

* 作为函数：`Function.prototype`用于共享，而`Function.prototype.__proto__`继承自`Object.prototype`

### Array（Date...）：既是对象，也是构造函数

* 作为对象：`Array.__proto__` = `Function.prototype`
* 作为函数：`Array.prototype`用于共享，`Array.prototype.__proto__`继承自`Object.prototype`

### 普通对象Person：既是对象，也是构造函数

* 作为对象：`Person.__proto__` = `Function.prototype`
* 作为函数：`Person.prototype`用于共享，`Person.prototype.__proto__`继承自`Object.prototype`

## 总结

1.  原型链顶端是`Object.prototype`

2.  构造函数创建的对象（Object、Function、Array、普通对象等）都是Function的实例，它们的`__proto__`均指向`Function.prototype`

3.  除了Object，所有对象（或叫构造函数）的`prototype`，均继承自`Object.prototype`

希望这篇简短的文章可以帮助你彻底理解原型链，如果觉得文章有用，点赞鼓励一下吧~
---


JavaScript 也是一门面向对象的语言，很神奇的是，在 ES6 之前，JavaScript 中没有 class 语法。接触过大学课程的都知道，c++ 也是面向对象的，典型的面向对象语言都是通过类来创建实例对象。

```js
// c++ 通过类创建对象class Cat {
public:
  string color
}

Cat \*cat = new Cat()
```

那 JavaScript 是如何解决这个问题的呢？这就需要引入构造函数了。


### 构造函数

在 c++ 中，我们可以知道，类是事物的抽象，通过类可以生成一个个实例化的具体对象，类提供着生成对象的“模板”。在 JavaScript 中构造函数（constructor）就起着“模板”的作用，通过构造函数，我们可以生成实例化的对象。

```js
functionCat() {
this.color = 'orange'
}

var cat = new Cat()
console.log(cat.color)     // orange
```


在上面的代码中，Cat 就是构造函数，使用 new 关键字来调用构造函数生成实例对象，我们约定构造函数的函数名要大写，在构造函数的内部可以使用 this 关键字来添加属性。



### prototype



了解完了构造函数，我们来看一下与函数相关的 `prototype` 关键字。每个函数都有一个 `prototype` 属性，它其实是个对象，我们可以通过代码来看一下。

```js
functionCat() {
  this.color = 'orange'
}

console.log(Cat.prototype)
```


打开 chrome 浏览器的开发者工具，在 console 栏输入上面的代码，你可以看到 `Cat.prototype` 的值：


![](https://cdn.nlark.com/yuque/0/2018/png/199663/1544770142082-b906f445-80a1-4a05-a2b1-50200f85ece4.png)


（`Cat.prototype` 在控制台的输出结果）


## `__proto__`

在 JavaScript 中，每个实例对象都有一个私有属性 [[Prototype]]，该属性指向了这个实例对象的原型，你可以通过 ES6 的 `Object.getPrototypeOf()` 来访问该属性，许多浏览器也对 [[Prototype]] 进行了实现，也就是我们经常见到的 `__proto__，没错，__proto__` 指向了实例对象的原型，它也是一个对象。

```js
functionCat() {
`this.color = 'orange'
}

var cat = new Cat()
console.log(cat.__proto__)
console.log(Object.getPrototypeOf(cat) === cat.__proto__)  // true
```

![](https://cdn.nlark.com/yuque/0/2018/png/199663/1544770142082-b906f445-80a1-4a05-a2b1-50200f85ece4.png)

（`cat.__proto__` 在控制台的输出结果）

细心的你可能会发现，实例对象的 `__proto__` 与创建该实例对象的构造函数的 `prototype` 是相等的，是的没错，构造函数的 `prototype` 指向调用该构造函数而创建的实例对象的原型，我们可以通过代码来看一下。

```js
functionCat() {
this.color = 'orange'
}

var cat = new Cat()

console.log(cat.__proto__ === Cat.prototype)   // true
```


有关构造函数的 `prototype` 和实例对象的 `__proto__` 的关系，我们可以用张图来体现一下。




![](https://cdn.nlark.com/yuque/0/2018/png/199663/1544775448476-01dd1286-18c5-46a9-8821-338a1b347392.png)


（构造函数的 `prototype` 和实例对象的 `__proto__` 关系图）



## constructor



在上文的 Cat.prototype 打印截图中，相信你已经看到了 constructor 这个字段，字段的内容是一个函数，函数名和构造函数竟然一样。可以说，每个原型对象都有一个 constructor 属性，指向相关联的构造函数，所以构造函数和构造函数的 prototype 是可以相互指向的。

```js
functionCat() {
  this.color = 'orange'
}

console.log(Cat.prototype.constructor === Cat)    // true
```

![](https://cdn.nlark.com/yuque/0/2018/png/199663/1544775326033-e24180a5-3066-45e9-a2b7-4dfb765e33de.png)

（实例原型的 constructor 属性指向相关构造函数）



## 原型链



在上文我们理解了原型，原型链肯定是与原型有关了，是一个个原型链接起来的么？我们先通过下面的代码来观察一下。

```js
functionCat() {
this.color = 'orange'
}

Cat.prototype.age = 4

var cat = new Cat()

console.log(cat.color)    // orange
console.log(cat.age)      // 4
```

在构造函数中，我并没有设置有关 age 的属性，只是把 age 设置在了实例原型上，然后我们通过实例对象也能访问到 age 属性。在 JavaScript 中，如果想访问某个属性，首先会在实例对象（cat）的内部寻找，如果没找到，就会在该对象的原型（cat.__proto__，即 Cat.prototype）上找，我们知道，对象的原型也是对象，它也有原型，如果在对象的原型上也没有找到目标属性，则会在对象的原型的原型（Cat.prototype.__proto__）上寻找，以此内推，直到找到这个属性或者到达了最顶层。在原型上一层一层寻找，这便就是原型链了。


那么原型链的最顶层是什么呢？我们可以在控制台测试看看。

```js
functionCat() {
this.color = 'orange'
}

var cat = new Cat()

console.log(Cat.prototype.__ptoto__)
```

我们在控制台输出了实例对象原型的原型：

![](https://cdn.nlark.com/yuque/0/2018/png/199663/1544804543079-894a738b-520f-435f-ba9f-58830c695e40.png)


（构造函数 Cat 实例原型的原型）

输出了一大堆东西，好像看不出个所以然，比较直观的是，它是个对象，第一行的 constructor 是一个 Object 函数。我们在上文提过，每个原型对象都有一个 constructor 属性，指向相关联的构造函数，比如 `Cat.prototype.constructor === Cat`，在上面的截图中，我们可以猜测，xx.prototype.constructor === Object，可以知道 xx 就是构造函数 Object。

上面的输出内容其实就是 Object.prototype，我们用代码验证一下。

```js
functionCat() {
this.color = 'orange'
}

console.log(Cat.prototype.__ptoto__ === Object.prototype)    // true
```


如果再往上寻找呢？Object.prototype 的原型会是什么？

```js
console.log(Object.prototype.__proto__)   // null
```


它就是 null，null 没有原型，所以 Object.prototype 就是原型链的最顶端。

可以说，JavaScript 中的所有对象都来自 Object，Object 位于原型链的最顶端，几乎所有 JavaScript 的实例对象都是基于 Object。

我们可以将图片更新一下：

![](https://cdn.nlark.com/yuque/0/2018/png/199663/1544807307596-1e74bf82-9587-458b-bcff-62dfd57b0c87.png)


（原型链）



## 关于继承



JavaScript 的继承是基于原型链的，在原型链的任何位置设置属性，都能被对象访问到，原型的作用也是在此，它可以包含所有实例共享的属性和方法，就像该属性本来就在实例对象上一样，与其说是继承，不如说原型链建立了一个链条，可以顺藤摸瓜，实例对象可以访问这根链条上的属性和方法。

```js
functionCat() {
this.color= 'orange'
this.age = 4
}

Cat.prototype.getColor = function() {
console.log(this.color)
}

Object.prototype.getAge = function() {
console.log(this.age)
}

var cat = new Cat()

cat.getColor()       // orange
cat.getAge()
```

基于原型链的继承其实随处可见，只是我们没有意识到。当你随手新建一个数组，是否想过它怎么会有 splice、indexOf 等方法，新建一个函数怎么可以直接使用 call 和 bind？其实数组都继承于 Array.prototype，函数都继承于 Function.prototype，它们分别包含了数组和函数的基本方法，尝试去控制台打印出 Array.prototype 和 Function.prototype，上面的疑问便可得到解答。
```js
vara= ['hello', 'world']
function f() {}

console.log(a.__proto__ === Array.prototype)      // true
console.log(f.__proto__ === Function.prototype)   // true
```


## 小结

本节我们学习了原型和原型链及与它们相关的一些关键词的含义。JavaScript 对象（除了 null）在创建的时候就会关联一个对象，这个对象就是原型，每一个对象都会从原型上继承属性，原型也是对象，所以原型也有原型对象，层层往上，直到 Object.prototype，这就是原型链。对象都会有一个 `__proto__`  属性来访问自己的原型，同时这个原型就是生成该对象的构造函数的 prototype 属性值。每个原型对象都有一个 constructor 属性，指向相关联的构造函数。在本节中，你需要掌握：

* 与原型相关的 `prototype` 和 `__proto__`  分别是什么；

* construct 指向了哪里；

* 原型链和继承。



参考链接：

* [JavaScript 深入之原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)


* [继承与原型链](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)