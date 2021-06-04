(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{415:function(t,s,a){"use strict";a.r(s);var n=a(43),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"event-loop"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#event-loop"}},[t._v("#")]),t._v(" Event Loop")]),t._v(" "),a("p",[t._v("Event Loop 也叫做“事件循环”，它其实与 JavaScript 的运行机制有关，乍一看云里雾里，不用着急，读完本文你便会知晓它的含义，这一切都要从 JavaScript 的初始设计说起。")]),t._v(" "),a("h2",{attrs:{id:"单线程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#单线程"}},[t._v("#")]),t._v(" 单线程")]),t._v(" "),a("p",[t._v("进程和线程是操作系统中的概念，在操作系统中，一个任务就是一个进程，比如你在电脑上打开了一个浏览器来观看视频，便是打开了一个浏览器进程，此时又想记录视频中的重要信息，于是你打开了备忘录，这便是一个备忘录进程，系统会为每个进程分配它所需要的地址空间，数据，代码等系统资源。如果把一个进程看做一个小的车间，车间里有很多工人，有的负责操作机器，有的负责搬运材料，每个工人可以看做一个线程，线程可以共享进程的资源。可以说，线程是进程的最小单位，一个进程可以包含多个线程。")]),t._v(" "),a("p",[t._v("JavaScript 在设计之初便是单线程，程序运行时，只有一个线程存在，在特定的时候只能有特定的代码被执行。这和 JavaScript 的用途有关，它是一门浏览器脚本语言，通常是用来操作 DOM 的，如果是多线程，一个线程进行了删除 DOM 操作，另一个添加 DOM，此时该如何处理？所以 JavaScript 在设计之初便是单线程的。")]),t._v(" "),a("p",[t._v("虽然 HTML5 增加了 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers",target:"_blank",rel:"noopener noreferrer"}},[t._v("Web Work"),a("OutboundLink")],1),t._v(" 可用来另开一个线程，但是该线程仍受主线程的控制，所以 JavaScript 的本质依然是单线程。")]),t._v(" "),a("h2",{attrs:{id:"执行栈和任务队列"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#执行栈和任务队列"}},[t._v("#")]),t._v(" 执行栈和任务队列")]),t._v(" "),a("p",[t._v("单线程的 JavaScript 一段一段地执行，前面的执行完了，再执行后面的，试想一个，如果前一个任务需要执行很久，比如接口请求、I/O 操作，此时后面的任务只能干巴巴地等待么？干等不仅浪费了资源，而且页面的交互程度也很差。JavaScript 意识到了这个问题，他们将任务分成了同步任务和异步任务，对于二者有不同的处理。")]),t._v(" "),a("p",[t._v("JavaScript 在运行时会将变量存放在堆（heap）和栈（stack）中，堆中通常存放着一些对象，而变量及对象的指针则存放在栈中。JavaScript 在执行时，同步任务会排好队，在主线程上按照顺序执行，前面的执行完了再执行后面的，排队的地方叫"),a("strong",[t._v("执行栈（execution context stack")]),t._v("）。JavaScript 对异步任务不会停下来等待，而是将其挂起，继续执行执行栈中的同步任务，当异步任务有返回结果时，异步任务会加入与执行栈不一样的队列，即"),a("strong",[t._v("任务队列（task queue")]),t._v("），所以任务队列中存放的是异步任务执行完成后的结果，通常是回调函数。")]),t._v(" "),a("p",[t._v("当执行栈的同步任务已经执行完成，此时主线程闲下来，它便会去查看任务队列是否有任务，如果有，主线程会将最先进入任务队列的任务加入到执行栈中执行，执行栈中的任务执行完了之后，主线程便又去任务队列中查看是否有任务可执行。主线程去任务队列读取任务到执行栈中去执行，这个过程是循环往复的，这便是 "),a("strong",[t._v("Event Loop")]),t._v("，事件循环。")]),t._v(" "),a("p",[t._v("网上有张流传甚广的图对这一过程进行了总结，在图中我们可以看到，JavaScript 在运行时产生了堆和栈，ajax、setTimeout 等异步任务被挂起，异步任务的返回结果加入任务队列，主线程会循环往复地读取任务队列中的任务，加入执行栈中执行。")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://cdn.nlark.com/yuque/0/2018/png/199663/1545211211638-b99a1c9d-b710-47d2-8404-04c984ef4da5.png",alt:""}})]),t._v(" "),a("p",[t._v("（JavaScript 运行机制，图片来源于网络）")]),t._v(" "),a("p",[t._v("为了更好的理解 JavaScript 的执行机制，我们来看个小例子。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("300")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[t._v("输出的结果是 1，3，2。setTimeout 是一个定时器，延迟 300 毫秒执行，所以 300 毫秒后，打印 2 的回调函数才会进入任务队列，等到执行栈中的代码执行完成后，也就是打印出 1 和 3 后，打印出 2 的回调函数才进入执行栈执行。")]),t._v(" "),a("p",[t._v("如果将 setTimeout 的第二个参数设置为 0，它表示主线程空闲之后尽早执行它的回调，HTML5 规定 setTimeout 的第二个参数不得小于 4 毫秒。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\nconsole"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  2,1")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br")])]),a("p",[t._v("对于 setTimeout 还有一个需要注意的是，它的延迟时间并不是等待多少毫秒后就一定会执行，始终是要等待主线程已经空闲了才会去读取它，如果执行栈中的任务需要很长时间才能执行完，那任务队列中的任务只能等待。我们可以通过一个例子来体验一下。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("varenterTime"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("time")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" temp "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),t._v(" time"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" exeTime "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Date"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("now")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("exeTime "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v(" enterTime"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("300")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sleep")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 睡眠 1 秒")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br")])]),a("p",[t._v("我们定义了一个 sleep 函数，设置了 1 秒的执行时间，所以 setTimeout 要等待的时间肯定大于 1 秒，而不是 300 毫秒后就执行了。上述代码的执行结果是 1000 左右，值不固定，可以复制代码到控制台执行看看。")]),t._v(" "),a("h2",{attrs:{id:"宏任务与微任务"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#宏任务与微任务"}},[t._v("#")]),t._v(" 宏任务与微任务")]),t._v(" "),a("p",[t._v("异步任务有更深一层的划分，它们是"),a("strong",[t._v("宏任务（macro task）"),a("strong",[t._v("和")]),t._v("微任务（micro task")]),t._v("），二者的执行顺序也有差别。在上面我们讲到异步任务的结果会进入任务队列中，对于不同的事件类型，宏任务会加入宏任务队列，微任务会加入微任务队列。")]),t._v(" "),a("p",[t._v("常见的宏任务有 script（整体代码），setTimeout，setInterval；常见的微任务有 new Promise、process.nextTick（node.js 环境）。")]),t._v(" "),a("p",[t._v("在执行栈空的时候，主线程会从任务队列中取任务来执行，其过程如下：")]),t._v(" "),a("p",[t._v("1.选择最先进入队列的宏任务执行（最开始是 script 整体代码）")]),t._v(" "),a("p",[t._v("2.检查是否存在微任务，如果存在，执行微任务队列中得所以任务，直至清空微任务队列")]),t._v(" "),a("p",[t._v("3.重复以上步骤")]),t._v(" "),a("p",[t._v("我们来通过代码体验一下宏任务与微任务的执行顺序。")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("num")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("num"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("300")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Promise")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("num")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("num"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setTimeout")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("7")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("400")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br")])]),a("p",[t._v("我们一步步来分析上面的执行顺序，这段代码作为宏任务进入主线程开始执行，首先打印出 1，然后遇到了 setTimeout，主程序将它挂起，300 毫秒后它的回调函数进入宏任务队列，我们记做 setTimeout1。随后遇到了 new Promise，resolve 部分是同步执行的，所以会打印出 5，then 中的回调函数进入微任务队列，我们暂时记做 promise1。最后是 setTimeout，同理在 400 毫秒后加入了宏任务队列，我们记做 setTimeout2。此时任务队列的情况如下：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("col 1")]),t._v(" "),a("th",[t._v("col 2")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("宏任务")]),t._v(" "),a("td",[t._v("微任务")])]),t._v(" "),a("tr",[a("td",[t._v("setTimeout1")]),t._v(" "),a("td",[t._v("promise1")])]),t._v(" "),a("tr",[a("td",[t._v("setTimeout2")]),t._v(" "),a("td")])])]),t._v(" "),a("p",[t._v("此时已经执行完一个宏任务（script 整体代码），接着主线程查看微任务队列，发现存在微任务，于是把 promise1 执行了，打印出 6。此时微任务队列已经空了，任务队列的情况如下：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("col 1")]),t._v(" "),a("th",[t._v("col 2")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("宏任务")]),t._v(" "),a("td",[t._v("微任务")])]),t._v(" "),a("tr",[a("td",[t._v("setTimeout1")]),t._v(" "),a("td")]),t._v(" "),a("tr",[a("td",[t._v("setTimeout2")]),t._v(" "),a("td")])])]),t._v(" "),a("p",[t._v("以上便是一次循环。")]),t._v(" "),a("p",[t._v("接着主线程又开始查看宏任务队列，将 setTimeout1 的回调函数加入任务栈开始执行，于是首先打印出 2，之后是 3，再将 then 中的回调函数加入微任务队列，我们记做 promise2。此时任务队列的情况如下：")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("col 1")]),t._v(" "),a("th",[t._v("col 2")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("宏任务")]),t._v(" "),a("td",[t._v("微任务")])]),t._v(" "),a("tr",[a("td",[t._v("setTimeout2")]),t._v(" "),a("td",[t._v("promise2")])])])]),t._v(" "),a("p",[t._v("此时执行栈也空了，于是将微任务 promise2 加入执行栈，打印出 4。此时微任务已经执行完，这便完成了第二次循环。然后再查看宏任务队列，于是执行 setTimeout2，打印出 7。所以代码中的输出顺序是 1，5，6，2，3，4，7。需要注意的是，主线程对微任务的读取是逐个读取，直到微任务队列为空。对宏任务队列的读取在一次循环中只读取一个。")]),t._v(" "),a("h2",{attrs:{id:"小结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),a("p",[t._v("在本节中，我们了解了 JavaScript 的运行机制，它是单线程的。JavaScript 中的任务可分为同步任务和异步任务，同步任务总是先进入执行栈中执行，异步任务会被挂起，直到有结果返回时，异步任务会进入任务队列中等待主线程读取执行。当执行栈为空时，主线程便会循环往复地读取任务队列中的事件，进入执行栈执行，这个过程叫 Event Loop。主线程对任务队列的读取也有先后之分，首先会读取宏任务，最开始是 script 整体代码，执行完一个宏任务后，会去查找微任务，将微任务队列的事件都执行完，这个过程也是循环往复的。在本节中，你需要掌握：")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("JavaScript 是单线程的本质；")])]),t._v(" "),a("li",[a("p",[t._v("执行栈和任务队列是什么；")])]),t._v(" "),a("li",[a("p",[t._v("什么是 Event Loop；")])]),t._v(" "),a("li",[a("p",[t._v("宏任务和微任务的区别。")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);