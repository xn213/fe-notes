# 前端学习

> 知识遗忘点
> 存在问题点
> 练习卡壳点

## `HTML`篇

### 行内元素？块级元素？ 空 (void) 元素？

* 行内元素：`a`、`b`、`span`、`img`、`input`、`strong`、`select`、`label`、`em`、`button`、`textarea`

* 块级元素：`div`、`ul`、`li`、`dl`、`dt`、`dd`、`p`、`h1-h6`、`blockquote`

* 空元素：即系没有内容的 HTML 元素，例如：`br`、`meta`、`hr`、`link`、`input`、`img`

---

### a标签,页面内锚点

**`a`标签不能嵌套`a`标签**

**页面锚点**

```html
<a href="#jump">我跳！</a>
...
<div id="jump">跳到这里来！</div>
```

---

### `<head>`标签中的奥秘

1.  `<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>`
    * **IE=edge告诉IE使用最新的引擎渲染网页，chrome=1则可以激活Chrome Frame。**

        > * `http-equiv`相当于http的文件头作用，它可以向浏览器传回一些有用的信息，以帮助正确地显示网页内容，与之对应的属性值为`content`，`content`中的内容其实就是各个参数的变量值。
        > * `X-UA-Compatible`是IE8以上版本的一个专有
        >
        >     <meta>属性，IE8以下的浏览器是不识别的,它告诉浏览器（IE8+）采用何种版本渲染网页。
        >
        > * `IE=Edge`告诉浏览器使用最新的引擎渲染网页，而chrome=1则告诉浏览器激活Chrome
        >     Frame（谷歌浏览器内嵌框架”，是Google推出的一款免费的IE专用插件。用户可以通过IE的用户界
        >     面，以Chrome内核的渲染方式浏览网页。）

2.  `<meta name="renderer" content="webkit"/>`

    **在双核浏览器中，让Webkit内核优先渲染。**

---

### 表格问题

1.  表格中的格子合并

    > `rowspan`：跨行合并
    >
    > `colspan`：跨列合并
    >
    > \**合并的顺序 先上 后下   先左  后右 **
    * 先确定是跨行还是跨列合并

    * 根据 先上 后下   先左  后右的原则找到目标单元格 (rowspan 是写到目标单元格上的)

    * 删除单元格   删除的个数  =  合并的个数  - 1

2.  易忘属性

    |    属性名  |  含义  | 常用属性值      |
    |:-------------:|:------------:|:------:|
    | `cellspacing` |  设置单元格与单元格边框之间的空白间距  | 像素值`px`（默认为`2px`）|
    | `cellpadding` |  设置单元格内容与单元格边框之间的空白间距 | 像素值`px`（默认为`1px`）|
    |   `align`     |  设置表格在网页中的水平对齐方式    | left，center，right |

---

### `src` 与 `href` 的区别

* `href` 是指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。
* `src` 是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 `src` 资源时会将其指向的资源下载并应用到文档内，例如`js`脚本，`img` 图片和 `frame` 等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将`js` 脚本放在底部而不是头部。

---

## `CSS`篇

### `CSS`中的尺寸单位

**绝对单位**

* **`px`**: Pixel 像素
* **`pt`**: Points 磅
* **`pc`**: Picas 派卡
* **`in`**: Inches 英寸
* **`mm`**: Millimeter 毫米
* **`cm`**: Centimeter 厘米
* **`q `**: Quarter millimeters 1/4毫米

**相对单位**

* **`%`**: 百分比
* **`em`**: Element meter 根据文档字体计算尺寸

    * 简单说,相对父级元素的字体大小计算

* **`rem`**: Root element meter 根据根文档（ body/html ）字体计算尺寸

    * 简单说,相对根节点元素即`html`的字体大小计算

* **`ex`**: 文档字符“x”的高度
* **`ch`**: 文档数字“0”的的宽度
* **`vh`**: View height 可视范围高度
* **`vw`**: View width 可视范围宽度
* **`vmin`**: View min 可视范围的宽度或高度中较小的那个尺寸
* **`vmax`**: View max 可视范围的宽度或高度中较大的那个尺寸

**运算**

* **`calc`**: 四则运算

---

### a标签上的伪类选择器**顺序**

从上到下不能变：`link visited hover active` // 爱恨原则 love hate

---

### 水平/垂直居中问题

1.  **水平居中**

    **a) `inline-block` + `text-align`**

    ```css
    .parent{
        text-align: center;
    }
    .child{
        display: inline-block;
    }
    ```

    tips：此方案兼容性较好，可兼容至`IE8`，对于`IE567`并不支持`inline-block`，需要使用`css hack`进行兼容

    **b) `table`+ `margin`**

    ```css
    .child{
        display: table;
        margin: 0 auto;
    }
    ```
 

    tips：此方案兼容至`IE8`，可以使用`<table/>`代替`css`写法，兼容性良好

    **c) `absolute` + `transform`**

    ```css
    .parent{
        position: relative;
        height:1.5em;
    }
    .child{
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }
    ```

    tips：此方案兼容至`IE9`，因为transform兼容性限制，如果`.child`为定宽元素，可以使用以下写法，兼容性极佳

    ```css
    .parent{
        position: relative;
        height:1.5em;
    }
    .child{
        position: absolute;
        width:100px;
        left: 50%;
        margin-left:-50px;
    }
    ```


    **d) `flex` + `justify-content`**

    ```css
    .parent{
        display: flex;
        justify-content: center;
    }
    .child{
        margin: 0 auto;
    }
    ```
 

    tips：`flex`是一个强大的`css`，生而为布局，它可以轻松的满足各种居中、对其、平分的布局要求，但由于现浏览器兼容性问题，此方案很少被使用，但是值得期待浏览器兼容性良好但那一天！

2.  **垂直居中**

    **a) `table-cell` + `vertial-align`**

    ```css
    .parent{
    	display: table-cell;
    	vertical-align: middle;
    }
    ```
 

    tips：可替换成`<table />`布局，兼容性良好

    **b) `absolute` + `transform`**

    ```css
    .parent{
    	position: relative;
    }
    .child{
    	position: absolute;
    	top: 50%;
    	transform: translateY(-50%);
    }
    ```

    tips：存在`css3`兼容问题，定宽兼容性良好

    **c) `flex` + `align-items`**

    ```css
    .parent{
    	display: flex;
    	align-items: center;
    }
    ```
    tips：高版本浏览器兼容，低版本不适用

3.  水平垂直居中

    **a) `inline-block` + `table-cell` + `text-align` + `vertical-align`**

    ```css
    .parent{
    	text-align: center;
    	display: table-cell;
    	vertical-align: middle;
    }
    .child{
    	display: inline-block;
    }
    ```
 

    tips：兼容至`IE8`

    **b) `absolute` + `transform`**

    ```css
    .parent{
    	position: relative;
    }
    .child{
    	position: absolute;
    	left: 50%;
    	top: 50%;
    	transform: translate(-50%,-50%);
    }
    ```

    tips：兼容性稍差，兼容IE10以上

    **c) `flex`**

    ```css
    .parent{
    	display: flex;
    	justify-content: center;
    	align-items: center;
    }
    ```
 
    tips：兼容差

---

### 清除浮动

* **方法1：**

    > 给父级div定义 高度原理：给父级DIV定义固定高度（height），能解决父级DIV 无法获取高度得问题。优点：代码简洁缺点：高度被固定死了，是适合内容固定不变的模块。（不推荐使用）

* **方法二：**

    > 使用空元素，如`<div class="clear"></div> (.clear{clear:both})`原理：添加一对空的DIV标签，利用`css`的`clear:both`属性清除浮动，让父级DIV能够获取高度。优点：浏览器支持好缺点：多出了很多空的DIV标签，如果页面中浮动模块多的话，就会出现很多的空置DIV了，这样感觉视乎不是太令人满意。（不推荐使用）

* **方法三：**

    > 让父级div 也一并浮起来这样做可以初步解决当前的浮动问题。但是也让父级浮动起来了，又会产生新的浮动问题。 不推荐使用

* **方法四：**

    > 父级div定义 `display:table`原理：将div属性强制变成表格优点：不解缺点：会产生新的未知问题。（不推荐使用）

* **方法五：**

    > 父元素设置 `overflow：hidden、auto；`原理：这个方法的关键在于触发了`BFC`。在`IE6`中还需要触发`hasLayout（zoom：1）`优点：代码简介，不存在结构和语义化问题缺点：无法显示需要溢出的元素（亦不太推荐使用）

* **方法六：**

    > 父级div定义 伪类:after 和 zoom

    ```css
    /*清除浮动*/
    .clearfix::after {
        visibility: hidden;
        clear: both;
        display: block;
        content: ".";
        height: 0;
        line-height: 0;
    }

    .clearfix {
        *zoom: 1
    }
    ```


**父级用了定位,将会实现清除浮动效果,但不推荐**

---

### 处理垂直(margin)塌陷/合并问题

1.  产生的条件：网页中垂直方向的相邻的外边距会产生外边距的重叠

2.  产生的问题：

    > 兄弟元素之间相邻的外边距会取最大值（而不是求和）
    >
    > 父子元素之间的垂直外边距相邻了，子元素的外边距设置值会传给父元素。

3.  解决方法:
    * 在父类标签设置overflow：hidden；属性

        ```css
        div.father{
            ...
        	overflow: hidden;
        }
        ```

    * 给父类标签设置border属性

        ```css
        border: 1px solid #000000;
        /*不需要边框的时候可以将背景颜色设为透明或者与背景颜色相同的颜色*/
        ```

---

### 浮动子元素高度不一致,导致内容错位

当N个元素浮动后，其中的元素高度差会导致错位的问题

_**解决办法**_

* 最简单,最不推荐的方法,给元素固定`height`

* 给父元素设置`font-size:0;` 浮动子元素重置所需的`font-size`,再定义`display:inline-block; vertical-align:top;`

    ```css
    ul{
    	margin:0;
        padding:0;
    	list-style-type:none;
    	font-size:0;
    }
    ul li{
    	width:160px;
        display:inline-block;
        vertical-align:top;
    	font-size:12px;
    }
    ```


* 给换行后的第一个浮动元素添加`clear:left ;`  如：

    ```html
    <style>
    	ul li{
    		float:left;
    		width:160px;
    	}
    	.cl{
    		clear:left;
    	}
    </style>

    <li>1</li>
    <li>2</li> 
    <li>3</li> 
    <li class="cl">4</li>
    <li>5</li> 
    <li>6</li>
    ```
---

### 使用省略号替代溢出文本

**单行文本**

```css
    white-space : nowrap;       /*让文本在一行显示*/
	overflow : hidden;			/*隐藏溢出文本*/
	text-overflow : ellipsis;   /*使用省略号替代 */ 			
	/*  三行缺一不可  */
```



**两行文本**

```css
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
```


---

### 隐藏元素的几种方式及区别

* display:none

    > 元素在页面上将彻底消失，元素本来占有的空间就会被其他元素占有，也就是说它会导致浏览器的重排和重绘。
    > 不会触发其点击事件

* visibility:hidden

    > 和 display:none 的区别在于，元素在页面消失后，其占据的空间依旧会保留着，所以它只会导致浏览器重绘而不会重排。
    > 无法触发其点击事件
    > 适用于那些元素隐藏后不希望页面布局会发生变化的场景

* opacity:0

    > 将元素的透明度设置为 0 后，在我们用户眼中，元素也是隐藏的，这算是一种隐藏元素的方法。
    > 和 visibility:hidden 的一个共同点是元素隐藏后依旧占据着空间，但我们都知道，设置透明度为 0 后，元素只是隐身了，它依旧存在页面中。
    > 可以触发点击事件

* 设置 height，width 等盒模型属性为 0

    > 简单说就是将元素的 margin，border，padding，height 和 width 等影响元素盒模型的属性设置成 0，如果元素内有子元素或内容，还应该设置其 overflow:hidden 来隐藏其子元素，这算是一种奇技淫巧。
    > 如果元素设置了 border，padding 等属性不为 0，很显然，页面上还是能看到这个元素的，触发元素的点击事件完全没有问题。如果全部属性都设置为 0，很显然，这个元素相当于消失了，即无法触发点击事件。

* 其他脑洞方法

    > 设置元素的 position 与 left，top，bottom，right 等，将元素移出至屏幕外
    > 设置元素的 position 与 z-index，将 z-index 设置成尽量小的负数

---

### 图片在页面的应用

**1. 图片水平垂直居中的方式**

---

### flex布局

> * 子元素其中的一个有固定宽度,其它子元素设置`flex:1`将平分剩下的行内空间

---

## `JavaScript`篇

### 数据类型注意点

1.  **简单数据类型与复杂数据类型的区别**

    > 简单数据类型:
    >
    > * 数据存放在栈空间
    > * 直接把数据赋值给变量
    >
    > 复杂数据类型:
    >
    > * 数据存放在堆空间
    > * 把数据内存地址赋值给变量

2.  **查看变量/对象的数据类型**

    > `typeof 变量`   返回变量数据类型
    >
    > * * NaN 的数据类型是 number
    > * 数组(Array)的数据类型是 object
    > * 日期(Date)的数据类型为 object
    > * null 的数据类型是 object
    > * 未定义变量的数据类型为 undefined
    >
    > **constructor** 属性返回所有 JavaScript 变量的构造函数。
    > 
    > function isArray(myArray) {
    >   return myArray.constructor.toString().indexOf("Array") > -1;
    > }
    > 

---

### `forEach`，`for in`，`for of`循环的用法

一、**一般的遍历数组的方法:**

```js
var array = [1,2,3,4,5,6,7];  
    for (var i = 0; i < array.length; i) {  
        console.log(i,array[i]);  
    }
```



二、**用for in的方遍历数组**

```js
for(let index in array) {  
        console.log(index,array[index]);  
    };
```

三、**forEach**

```js
array.forEach(v=>{  
    console.log(v);  
});
array.forEach（function(v){  
    console.log(v);  
});
```


四、**用for in不仅可以对数组,也可以对enumerable对象操作**

```js
var A = {a:1,b:2,c:3,d:"hello world"};  
for(let k in A) {  
    console.log(k,A[k]);  
}
```



五、**在ES6中,增加了一个for of循环,使用起来很简单**

```js
for(let v of array) {  
    console.log(v);  
};  

  let s = "helloabc"; 

  for(let c of s) {  

  console.log(c); 

 }
```
总结来说:`for in`总是得到对象的key或数组,字符串的下标,

而`for of`和`forEach`一样,是直接得到值 结果
`for of` 不能用于新出来的`Map`,`Set`上面

```js
var set = new Set();  
    set.add("a").add("b").add("d").add("c");  
    var map = new Map();  
    map.set("a",1).set("b",2).set(999,3);  
    for (let v of set) {  
        console.log(v);  
    }  
    console.log("--------------------");  
    for(let [k,v] of map) {  
        console.log(k,v);  
    }
```


_**javascript遍历对象详细总结**_

1.原生javascript遍历

（1）for循环遍历

```js
let array1 = ['a','b','c'];
for (let i = 0;i < array1.length;i++){
  console.log(array1[i]);  // a  b  c 
}
```

（2）JavaScript 提供了 foreach()  map() 两个可遍历 Array对象 的方

```js
forEach和map用法类似，都可以**遍历到数组的每个元素**，而且参数一致；
```

```js
Array.forEach(function(value , index , array){ //value为遍历的当前元素，index为当前索引，array为正在操作的数组
  //do something
},thisArg)      //thisArg为执行回调时的this值
```

**不同点：**

`forEach()` 方法对数组的每个元素执行一次提供的函数。总是返回`undefined`；

`map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。返回值是一个新的数组；

例子如下：

```js
var array1 = [1,2,3,4,5];

var x = array1.forEach(function(value,index){

    console.log(value);   //可遍历到所有数组元素

    return value + 10
});
console.log(x);   //undefined    无论怎样，总返回undefined

var y = array1.map(function(value,index){

    console.log(value);   //可遍历到所有数组元素

    return value + 10
});
console.log(y);   //[11, 12, 13, 14, 15]   返回一个新的数组
```


对于类似数组的结构，可**先转换为数组**，再进行遍历

```js
let divList = document.querySelectorAll('div');   //divList不是数组，而是nodeList

//进行转换后再遍历
[].slice.call(divList).forEach(function(element,index){
  element.classList.add('test')
})


Array.prototype.slice.call(divList).forEach(function(element,index){
  element.classList.remove('test')
})

[...divList].forEach(function(element,index){   //<strong>ES6写法</strong>
  //do something
})
```


（3）for ··· in ···     /      for ··· of ···

`for...in` 语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。每次迭代时，分配的是**属性名**

补充 : 因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。 因此当迭代那些访问次序重要的 arrays 时用整数索引去进行 `for`循环 (或者使用 `Array.prototype.forEach()`或 `for...of` 循环) 。

```js
let array2 = ['a','b','c']
let obj1 = {
  name : 'lei',
  age : '16'
}

for(variable  in array2){   //variable  为 index
  console.log(variable )   //0 1 2
}

for(variable  in obj1){   //variable 为属性名
  console.log(variable)   //name age
}
```

ES6新增了 遍历器(Iterator)机制，为不同的数据结构提供统一的访问机制。只要部署了Iterator的数据结构都可以使用 for ··· of ··· 完成遍历操作  ( Iterator详解 ：  http://es6.ruanyifeng.com/#docs/iterator )，每次迭代分配的是 **属性值**

原生具备 Iterator 接口的数据结构如下：

Array   Map Set String TypedArray 函数的arguments对象 NodeList对象

```js
let array2 = ['a','b','c']
let obj1 = {
  name : 'lei',
  age : '16'
}

for(variable  of array2){   //<strong>variable  为 value</strong>
  console.log(variable )   //'a','b','c'
}

for(variable  of obj1){  //<strong>普通对象不能这样用</strong>
  console.log(variable)   // 报错 ： main.js:11Uncaught TypeError: obj1[Symbol.iterator] is not a function
}

let divList = document.querySelectorAll('div');
for(element of divlist){
  //可遍历所有的div节点
  //do something 
}
```

如何让普通对象可以用for of 进行遍历呢？  http://es6.ruanyifeng.com/#docs/iterator  一书中有详细说明了！

除了迭代时分配的一个是属性名、一个是属性值外，for in 和 for of 还有其他不同    (MDN文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

for...in循环会遍历一个object所有的可枚举属性。

for...of会遍历具有iterator接口的数据结构

`for...in` 遍历（当前对象及其原型上的）每一个属性名称,而 `for...of遍历（当前对象上的）每一个属性值`

```js
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

let iterable = [3, 5, 7];
iterable.foo = "hello";

for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}

for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

---

### `JS`预解析

1.  函数提升要比变量提升的优先级要高一些，且不会被变量声明覆盖，但是会被变量赋值之后覆盖。

2.  预解析提升按照顺序顺序来，谁在前面先提升谁，  变量提升，只会提升变量的申明，不提升变量的赋值，然后继续按照顺序提升其他变量和函数，所有的提升完了，再正常去执行其他代码

---

### `javascript:;`与`javascript:void(0)`

**`javascript:void(0)`**

> `javascript:void(0)`中最关键的是 void 关键字，
>
> void 是 JavaScript 中非常重要的关键字，该操作符指定要计算一个表达式但是不返回值。

如果你要定义一个死链接请使用`javascript:void(0)` 。

**注意：**

`void()`仅仅是代表不返回任何值，但是括号内的表达式还是要运行

---

\###`this`指针

1.  指向问题

    > 普通函数中的this指向window
    >
    > 事件绑定事件中,this指向事件源
    >
    > 构造函数中,this指向要生成的对象

2.  函数的调用方式决定了 `this` 指向的不同：

    调用方式   | 非严格模式   | 备注               
    ------ | ------- | -----------------
    普通函数调用 | window  | 严格模式下是 undefined 
    构造函数调用 | 实例对象    | 原型方法中 this 也是实例对象
    对象方法调用 | 该方法所属对象 | 紧挨着的对象           
    事件绑定方法 | 绑定事件对象  |                  
    定时器函数  | window  |                  

3.  **this 指向<调用>该<函数>的那个<对象>**

---

### `call` / `apply` / `bind`

1.  **call**

语法:	`函数.call(借用的对象, 参数1, 参数2, 参数3);`

```js
function fn(a,b,c) {
	this[0] = a + b + c;
    console.log(this);
}
    fn.call([],1,2,3);
```

价值:改变函数内`this`指向,直接指向传进去的第一个参数

1.  **apply**

语法:	`函数.apply(借用的对象, [参数1, 参数2, 参数3]);`

```js
function fn(a,b,c) {
    this.push(a + b + c);
    console.log(this);
}
var arr = [];
fn.apply(arr, [1, 2, 3]);
```

应用场景:

* 数组

_**`call`和`apply`区别:**_

* `call` 可以传入任意个数的实参
* `apply` 最多只能传入两个参数,第二个参数用数组格式
* `call` 能实现的 `apply` 都能实现, `apply` 能实现的 `call`未必可以

1.  **bind**

语法:`函数.bind(借用的对象, 参数1, 参数2, 参数3);`

```js
function fn(a,b,c) {
        this.push(a + b + c);
        console.log(this);
    }
    var arr = [];
    // var res = fn.bind(arr, 1, 2, 3);
    // res();
    window.setInterval(fn.bind(arr,1,2,3),1000);
```

应用场景:

* 定时器的<回调函数>,改变this指向后,再由定时器定时执行
* 事件处理函数,改变this指向后,再由用户触发

_**`call`和 `bind` 的区别:**_

* `call`会直接调用这个函数
* `bind`能改变`this`的指向,仍然是个函数,没有调用
* `bind`需要手动调用

---

### BOM

#### Window 子对象

Window的子对象主要有如下几个：

1.  JavaScript `document` 对象
2.  JavaScript `frames` 对象
3.  JavaScript `history` 对象
4.  JavaScript `location` 对象
5.  JavaScript `navigator` 对象
6.  JavaScript `screen` 对象

---

### 自调用函数(沙箱函数)

1.  在`for`循环中运用问题

2.  沙箱写法:

    ```js
    // 前面分号,可写可不写,防止前面的代码没有用分号结束
    	;(function () {}) ();		//写法1
        ;(function () {} ());		//写法2
    ```
    
---

### 闭包

个人理解:其实就是函数内存在内嵌函数,外层函数给变量,返回内嵌函数(内嵌函数作用是修改数据)

1.  语法:

    ```js
    // 外层函数,全局函数
    function Fn(){
    	var count = 0;		//局部变量
      return function () {		// 返回函数
        count++;
        console.log(count);
      }
    }
    Fn();
    Fn();
    Fn();
    // 此时count = 3
    ```
---

### 事件

1.  关于`focus` / `blur`事件 (获得焦点/失去焦点事件)

    > 输入框,密码框(能输入的框)才有聚焦和失焦的说法

2.  事件冒泡与事件捕获

    事件传递有两种方式：冒泡与捕获。

    在冒泡中，内部元素的事件会先被触发，然后再触发外部元素.

    在捕获中，外部元素的事件会先被触发，然后才会触发内部元素的事件.

    `addEventListener()`方法可以指定 `"useCapture"`参数来设置传递类型：

    ```js
    addEventListener(event, function, useCapture);
    ```


    默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

    > DOM事件流同时支持两种事件模型：捕获型事件和冒泡型事件，捕获型事件首先发生。
    >
    > 捕获型事件和冒泡型事件会触及DOM中的所有对象，从document对象开始，也在document对象结束。

---

### 递归

1.  结构:

    * 函数调用自己(递进)
    * 回归的条件

---

### 定时器问题

1.  当封装的函数里面存在定时器,调用该函数且需要新建定时器,切记不要与函数内发定时器重名
2.  轮播图中,index索引值问题
3.  把定时器赋给元素

---

### 对象

1.  获取对象的属性的方法:
    * `对象.属性名`
    * `对象["属性名"]`       用中括号,属性名需要用引号包裹起来

2.  对象的创建(构造函数法)

    > <属性> : 写到构造函数内部;
    >
    > <方法> : 写到构造函数的原型(`prototype`);

3.  **函数也是对象,所有函数都是 `Function` 的实例**

4.  **Date实例对象注意点**
    * **使用`.dir()`在控制台强制用对象形式输出**

    ```js
    var now = new Date();

    // 在控制台强制用对象形式输出
    console.dir(now);
    ```
 
    * **`JS`中月份是从0开始的，所以记得手动加1**

    ```js
    // JS中月份是从0开始的，所以记得手动加1
    var month = now.getMonth() + 1;
    ```
    * **星期从星期天开始，星期天是0**

    ```js
    // 星期从星期天开始，星期天是0
    var day = now.getDay();
    ```


---

### 继承

1.  **构造函数的继承**
    * 属性的继承

        ```js
        //通过.call()借用构造函数方式继承属性
        Person.call(this,name,age,sex);		//this指向当前Student构造函数对象
        ```
    * 方法的继承

        ```js
        //通过原型链方式继承方法
        Student.prototype = new Person();
        Student.prototype.constructor = Student;	//修正构造器指向
        ```
---

### 构造函数(构造器)

1.  **通过`构造函数.prototype.方法名`  ,添加方法,可以实现方法共享**

    `prototype` 原型

    > 好处:
    >
    > * 方法只构建了一次,节省内存空间
    >
    > * 构造函数创建的对象都能共享该方法(并有关联性)
    >

2.  **调用构造函数前加`new`**

---

### 原型

```js
prototype		设置(基于构造函数)
Person.prototype.sayHi;	

__proto__		访问(通过构造函数创建的对象访问)
p1.__proto__.sayHi;
```

1.  `__proto__`  是对象的私有属性,一般不修改
2.  可以用`prototype`给构造函数添加方法

---

### 正则表达式

_**正则表达式（英语：Regular Expression，在代码中常简写为regex、regexp或RE）**_

**修饰符**

修饰符 | 描述                          
--- | ----------------------------
i   | 执行对大小写不敏感的匹配。(忽略大小写)        
g   | 执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
m   | 执行多行匹配。                     

```
/**
  *   正则表达式的作用：
  *       1. 匹配替换(替换敏感词，替换文章部分内容)
  *       2. 验证表单
  *
  *
  *   校验规则方法：
  *
  *       语法：
  *           规则.test(字符串)
  *       返回值：布尔类型
  *           true        包含规则，匹配成功
  *           false       匹配失败
  *
  *   规则分3部分学习：
  *       1. 匹配字符类型
  *           \s          匹配空白字符
  *           \S          匹配非空白字符
  *           \d          匹配数字字符    等价于：[0-9]
  *           \D          匹配非数字字符   等价于：[^0-9]
  *           \w          匹配大小写英文字母，数字，下划线 [A-Za-z0-9_]
  *           \W          匹配非大小写英文字母，数字，下划线 [^A-Za-z0-9_]
  *
  *       2. 匹配个数
  *           {n}         匹配 n个
  *           {n,m}       匹配 n个 到 m个
  *           {n,}        匹配 n个 到 无穷大个(至少n个)
  *
  *           个数便捷写法：
  *               ?       {0,1}       0次到1次 (最多出现一次或不出现)
  *               *       {0,}        0次到无穷大 (可出现任意次或不出现)
  *               +       {1,}        1次到无穷大 (至少出现一次)
  *
  *       3. 功能符号
  *           ^           开始
  *           $           结束
  *           []          匹配范围    如：[1-9] 匹配 1到9 的一个数字
  *           [^]         非范围内
  *           |           或
  *           ()          编组
  *           .           匹配除'\n'之外的任何单个字符(慎用，几乎能匹配全部)
  */
```

**常用API:**

* `search()`

    > 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串，并返回子字符串的起始位置。

    ```js
    var str = "Visit w3cschool"; 
    var n = str.search(/w3cschool/i);
    //输出结果为6
    ```

* `replace()`

    > 用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子字符串。

    ```js
    var str = "Visit Microsoft!"; 
    var res = str.replace(/microsoft/i, "w3cschool");
    //输出结果为Visit w3cschool!
    ```

* `test()`

    > 方法用于检测一个字符串是否匹配某个模式，如果字符串中含有匹配的文本，则返回 true，否则返回 false。

    ```js
    /e/.test("The best things in life are free!");
    //返回true
    ```


* `exec()`

    > 方法用于检索字符串中的正则表达式的匹配。该函数返回一个数组，其中存放匹配的结果。如果未找到匹配，则返回值为 null。

    ```js
    /e/.exec("The best things in life are free!");
    //字符串中含有e则返回e
    ```
    
---

### 原生`JS`事件委派

```js
// 父盒子通过点击事件生成新元素,通过原生JS对新元素进行事件委派
box.onmousemove = function (e) {        
    // console.log(e.target)  拿到点击中的那个dom元素  (包括新生元素)   
    // console.log(e.target.nodeName)  获取点击中的那个dom元素的标签名字        
    if (e.target.nodeName == "LI") {            
        var lis = document.querySelectorAll("#box ul li");    //能获取到新生的li标签      
        for (var i = 0; i < lis.length; i++) {                
            lis[i].className = "";            
        }            
        e.target.className = "on";            
        e.target.onmouseout = function () {     //这里也可以给当前元素添加点击事件           
            this.className = "";            //这里的this指向事件源e.target
        }        
    }    
}
```


**注意:**

* 事件委托只是在父元素上有事件，子级元素上根本没有事件

* 设置给子级元素的“事件处理函数”，实际上是在父元素上的事件中调用执行的

* 可以通过`event.target`指向符合的元素(相当于"发生事件的"那个元素)

* `event.target`在JQuery中通用适用,但得到的是DOM对象不是JQ对象

---

### `JS`错误处理

throw、try 和 catch

---

### `json`

> * `JSON` 英文全称 **J**ava**S**cript **O**bject **N**otation
> * `JSON`是一种轻量级的数据交换格式。

**语法规则**

* 数据为 键/值 对。

* 数据由逗号分隔。

* 大括号保存对象

* 方括号保存数组

    ```json
    {"employees":[ 
        {"firstName":"John", "lastName":"Doe"}, 
        {"firstName":"Anna", "lastName":"Smith"}, 
        {"firstName":"Peter", "lastName":"Jones"} 
    ]} 
    //就像在 JavaScript 中, 数组可以包含对象
    ```
---