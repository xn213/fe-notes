# Fe-Interview

> 一面（电话面）

1.  合并两个数组
2.  内存泄漏
3.  闭包
4.  面向对象理解
5.  函数式编程理解
6.  斐波那契数列？怎么优化？
7.  http和https区别
8.  https建立的过程
9.  setState什么时候是同步，什么时候是异步的
10.  从数组中找出三数之和为n

> 二面（电话面）

1.  对设计有研究吗
2.  红色适合搭配什么颜色，忌讳搭配什么颜色
3.  vue和react的区别
4.  react fiber架构的理解
5.  实现一个css框架你有什么思路吗
6.  二分查找的时间复杂度怎么求？
7.  看过算法导论吗
8.  对图有了解吗
9.  http建立连接过程，为什么不是四次或两次握手
10.  做软件管家是怎么分析需求的？最大收获是什么？现在翻盘想想有什么做的好的地方，和可以改进的地方？
11.  天擎的权限管理是怎么做的？
12.  天擎样式是怎么划分的？
13.  对未来的规划
14.  为什么想来深圳工作
15.  为什么毕业不直接来深圳工作
16.  以后对全栈有兴趣吗
17.  对c++，go有了解吗

> 三面(现场面)

1.  前端未来规划？
2.  3年之后的规划？
3.  有明确的想从事的路线吗？to B？to C？全栈？
4.  node主要用来解决什么问题？
5.  node做BFF的优点是什么？
6.  redux的设计思想，缺点是什么
7.  对项目监控这块有什么了解吗？
8.  对微服务有了解吗
9.  聊一聊docker？
10.  当时什么从事前端？
11.  整个学习历程是什么？
12.  介绍部门团队的情况

问面试官的问题：

* 现在部门采取的前后端技术栈是什么？当时项目为什么需要重构呢？是原来的架构遇到了什么问题吗？
* 如果有幸加入贵公司，我会负责什么内容？您对我的期望是什么？

> 四面（总监面）

1.  5g 时代的来临对前端有什么机遇与挑战？
2.  Html4，html5是建立在http上的，http的下一代要解决什么问题？
3.  对现在主流前端框架的看法？
4.  看你有github，你一般在github上做什么呢？
5.  github看过什么关于前端项目的源码？
6.  向什么源码提过pr？
7.  restful接口架构的优缺点？
8.  restful接口架构会导致什么安全问题，具体怎么解决？
9.  团队合作有遇到过分歧吗？最后是怎么解决的？有什么事例最后是采取你建议的解决方案？
10.  你印象中觉得腾讯工作形式是什么方式呢？
11.  为什么想从360离职？
12.  深圳到湛江需要多久？
13.  深圳到湛江高铁通了吗？

### JS合并两个数组的方法

> 1. concat | a.concat(b); (不改变原数组, 占内存)
> 2. for循环 | for(var i in b){ a.push(b[i]) } (解决了内存占用问题, low)
> 3. apply | a.push.apply(a, b); eg. a.push.apply(a, [4,5,6]) ===> a.push(4,5,6); (a.push这个方法就会遍历b数组的所有元素，达到合并的效果。)

### 内存泄漏(Memory Leak)

1. 什么是内存泄漏(Memory Leak)? 

简单地说就是申请了一块内存空间，使用完毕后没有释放掉。它的一般表现方式是程序运行时间越长，占用内存越多，最终用尽全部内存，整个系统崩溃。由程序申请的一块内存，且没有任何一个指针指向它，那么这块内存就泄露了。

2. 如何检测内存泄露

第一：良好的编码习惯，尽量在涉及内存的程序段，检测出内存泄露。当程式稳定之后，在来检测内存泄露时，无疑增加了排除的困难和复杂度。使用了内存分配的函数，一旦使用完毕,要记得要使用其相应的函数释放掉。


第二：将分配的内存的指针以链表的形式自行管理，使用完毕之后从链表中删除，程序结束时可检查改链表。

第三：Boost 中的smart pointer。

第四：一些常见的工具插件，如ccmalloc、Dmalloc、Leaky等等。

### 闭包

> 应用的两种情况即可——函数作为返回值，函数作为参数传递。

```js
// 一. 函数作为返回值
function fn(){
  var max = 10;
  return function bar(x){
    if(x > max){
      console.log(x)
    }
  }
}
var foo = fn();
foo(15);
```
```js
// 二. 函数作为参数被传递
var max = 10,
    fn = function(x){
      if(x > max){
        console.log(x);
      }
    };
(function(f){
  var max = 100;
  f(15);
})(fn);
```
> 注:  如上,fn函数作为一个参数被传递进入另一个函数, 赋值给f参数. 执行f(15)时, max变量的取值时10, 而不是100;

> > 闭包和作用域、上下文环境有着密不可分的关系

### generator

generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。-- 应是借鉴了Python的generator的概念和语法，
```js
// generator 语法
function* foo(x) {
  yield x + 1;
  yield x + 2;
  return x + 3;
}
```
`generator` 由`function*`定义（注意多出的*号），并且，除了 `return` 语句，还可以用 `yield` 返回多次。

要编写一个产生斐波那契数列的函数，可以这么写：

```js
function fib(max) {
  var t,
      a = 0,
      b = 1,
      arr = [0, 1];
  while (arr.length < max) {
    [a, b] = [b, a + b];
    arr.push(b);
  }
  return arr;
}

// 测试:
fib(5); // [0, 1, 1, 2, 3]
fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

函数只能返回一次，所以必须返回一个`Array`。但是，如果换成generator，就可以一次返回一个数，不断返回多次。用generator改写如下：

```js
function* fib(max) {
  var t,
      a = 0,
      b = 1,
      n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n ++;
  }
  return;
}
```

直接调用试试：

```js
fib(5); // fib {[[GeneratorStatus]]: "suspended", [[GeneratorReceiver]]: Window}
```

直接调用一个generator和调用函数不一样，`fib(5)`仅仅是创建了一个generator对象，还没有去执行它。

调用generator对象有两个方法，一是不断地调用generator对象的`next()`方法：

```js
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
```

`next()`方法会执行generator的代码，然后，每次遇到`yield x;`就返回一个对象`{value: x, done: true/false}`，然后“暂停”。返回的`value`就是`yield`的返回值，`done`表示这个generator是否已经执行结束了。如果`done`为`true`，则`value`就是`return`的返回值。

当执行到`done`为`true`时，这个generator对象就已经全部执行完毕，不要再继续调用`next()`了。

第二个方法是直接用`for ... of`循环迭代generator对象，这种方式不需要我们自己判断`done`：

```js
'use strict'
function* fib(max) {
  var t,
      a = 0,
      b = 1,
      n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n ++;
  }
  return;
}
```
```js
for (var x of fib(10)) {
  console.log(x); // 依次输出0, 1, 1, 2, 3, 5, 8, 13, 21, 34
}
```

`generator` 和普通函数相比，有什么用？

因为 `generator` 可以在执行过程中多次返回，所以它看上去就像一个可以记住执行状态的函数，利用这一点，写一个 `generator` 就可以实现需要用面向对象才能实现的功能。例如，用一个对象来保存状态，得这么写：

```javascript
var fib = {
  a: 0,
  b: 1,
  n: 0,
  max: 5,
  next: function () {
    var r = this.a,
        t = this.a + this.b;
    this.a = this.b;
    this.b = t;
    if (this.n < this.max) {
      this.n ++;
      return r;
    } else {
      return undefined;
    }
  }
};
```

用对象的属性来保存状态，相当繁琐。

`generator` 还有另一个巨大的好处，就是把异步回调代码变成“同步”代码。这个好处要等到后面学了 `AJAX` 以后才能体会到。

没有generator之前的黑暗时代，用AJAX时需要这么写代码：

```javascript
ajax('http://url-1', data1, function (err, result) {
  if (err) {
    return handle(err);
  }
  ajax('http://url-2', data2, function (err, result) {
    if (err) {
      return handle(err);
    }
    ajax('http://url-3', data3, function (err, result) {
      if (err) {
        return handle(err);
      }
      return success(result);
    });
  });
});
```

回调越多，代码越难看。

有了generator的美好时代，用AJAX时可以这么写：

```javascript
try {
  r1 = yield ajax('http://url-1', data1);
  r2 = yield ajax('http://url-2', data2);
  r3 = yield ajax('http://url-3', data3);
  success(r3);
}
catch (err) {
  handle(err);
}
```

看上去是同步的代码，实际执行是异步的。