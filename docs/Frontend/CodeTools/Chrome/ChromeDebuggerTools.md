# Chrome 调试工具技巧


[你不知道的Chrome调试工具技巧](https://juejin.im/post/5c09a80151882521c81168a2)
作者翻译的特别棒，共有24天的内容，下面是在看过程的一点点总结，希望自己在后面能多去浏览几次[原文](https://juejin.im/post/5c09a80151882521c81168a2)。

## 1. $

### 1). $0

在 Chrome 的 Elements 面板中，`$0`是当前我们选中的html节点的引用。`$1`是上一次的，`$2`是上上一次...`$4`是上上上一次的。

![WX20190319-111216.png](https://i.loli.net/2019/03/19/5c905e1c1b7e4.png)

可试用——`$1.appendChild($0)`

### 2). $, $$

如果你没有在 App 中定义过 $ 变量 (例如 jQuery )的话，它在 console 中就是对这一大串函数 document.querySelector 的别名。
如果是 $$ 就更加厉害了，还能节省更多的时间，因为它不仅执行 document.QuerySelectorAll 并且它返回的是：一个节点的 数组 ，而不是一个 Node list

$$('div')即Array.from(document.querySelectorAll('div'))

### 3). $_

代表上次的计算结果

### 4). $i

在chrome中安装插件[Console Importer](https://link.juejin.im/?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fconsole-importer%2Fhgajpakhafplebkdljleajgbpdmplhie%2Frelated)，可快速在console中引入npm库。$i('moment'),$i('Immutable')

## 2-copy-%E5%92%8C-save) 2.copy 和 save

### 1-copy) 1).copy

`copy(data)`

`copy($_)`

`copy($0)`

### 2).Store as global

console里的数据变量，可以变成全局变量，来用。自动创建名称`temp1`，`temp2`...
![WX20190319-142801@2x.png](https://i.loli.net/2019/03/19/5c908bffaf3e9.png)

### 3).保存(Stack trace)堆栈跟踪

出错信息可以在前方小三角处点击右键 save as。。。然后来发给别人一起看

### 4).copy html片段

选中html元素，cmd+c,cmd+v即复制粘贴完成

## 3.console

### 1).console.assert

语法：
`console.assert(assertion, obj1[,obj2,...,objN])`

![WX20190319-143743.png](https://i.loli.net/2019/03/19/5c908e41e0e54.png)

其可以替代if来方便做一些事情，在第一个参数为假的时候，后面的执行

### 2).console.table

数组或者对象都可以打印成表格的形式，可缩放，可排序，可传入第二个参数来制定表头

![WX20190319-144151@2x.png](https://i.loli.net/2019/03/19/5c908f3a49d79.png)

### 3).console.dir

打印一个 DOM 节点,想要查看这个节点所关联到的真实的 JavaScript 对象呢？并且想要查看他的属性等等

![WX20190319-144355.png](https://i.loli.net/2019/03/19/5c908fb792bf3.png)

### 4).console.log设置不同的样式显示

```js
function test1(name){
    console.log('%c'+name, 'color:red;background-color:pink;font-size:20px;')
}
function test11() {
    test1('zhang')
}
```

![WX20190319-182515@2x.png](https://i.loli.net/2019/03/19/5c90c3bf749ae.png)

### 5).更清晰的打印出来多个变量

```js
const name="Tom";
const age = 7;
const id = 12;
const user = {
    name: 'zhang',
    age:111
};

console.log(name,age,id,user);

console.log({name,age,id,user});

console.table({name,age,id,user});
```

![WX20190319-184325@2x.png](https://i.loli.net/2019/03/19/5c90c7dce1b3d.png)

## 4. the Elements panel（元素面板）

### 1).通过 'h' 来隐藏

可以按下 'h' 来隐藏在元素面板中被你选中的元素(页面上这块元素就暂时消失了，但是仍占位）。再次按下 'h' 使它出现

### 2). 拖动 & 放置 元素

在Elements中，可以直接拖动某个元素进行换位置，在页面中查看不同位置的显示效果

### \3).上下移动dom

可以使用`[ctrl] + [⬆] / [ctrl] + [⬇] ( [⌘] + [⬆] / [⌘] + [⬇] on Mac)`将选中的dom节点上移或者下移。

### \4).取消刚才的操作

使用 `[ctrl] + [z] ([⌘] + [z] on Mac)`撤销我们的任何改动。 使用`[ctrl] + [shift] + [z]` 重新编辑我们的任何修改。

## 5. command菜单

### 1). Command (命令) 菜单

cmd+shift+p（或者右上角三点出点Run command）即可调出来command菜单。
![WX20190319-152926@2x.png](https://i.loli.net/2019/03/19/5c909a5f42b0b.png)

### 2). command命令截图

可以对某个元素直接进行截图。

选中此元素，然后cmd+shift+p打开command菜单，然后输入screen，使用Capture node screenshot，即可保存为图片。这便可以实现插件实现的截取长页面的方法。

### 3).layout实现横或者纵向布局

cmd+shift+p打开command菜单，然后搜索layout得到两种外观选项，分别是样式的位置和dom在一排还是在其下方的区别

### 4).切换主题

cmd+shift+p打开command菜单,然后搜索theme，可以切换dark或者light主题，虽然说dark很漂亮。但是真的用习惯了light。

## 6.Color picker（颜色选择器）

### 1). 文本和背景的对比色

![WX20190319-162357.png](https://i.loli.net/2019/03/19/5c90a72c17976.png)

点击contrast ratio的小三角然后在上面的颜色中就会出现一条线，线上面的颜色表明此文本颜色与背景对比不好，线下面的颜色表明此文本颜色与背景色对比好，同时会显示禁止符号和绿色的对号

## 7.给 console 计时

### 1). 显示时间戳

cmd+shift+p打开command菜单，搜索time，点击show timeStamps/hide timeStamps，可以在console中显示的内容前面显示出时间

### 2). console.time()

* console.time() — 开启一个计时器
* console.timeEnd() — 结束计时并且将结果在 console 中打印出来

如果想一次记录多件事，可以往这些函数中传入不同的标签值。(例如:console.time('loading'), console.timeEnd('loading'))

## 8.style editors（样式编辑器)

### 1). shadow editor

在box-shadow或者text-shadow前面如同点击color picker的地方有一个图标点开后，可以调整shadow值。同时在页面上可看到效果。great！
![WX20190319-173457@2x.png](https://i.loli.net/2019/03/19/5c90b7e238a45.png)

### 2). Timing function editor 定时函数编辑器

animation中的贝塞尔变化函数也可以编辑
![WX20190319-173640@2x.png](https://i.loli.net/2019/03/19/5c90b834d5210.png)

### 3). 插入样式规则的按钮

鼠标放在样式最后三个点处，就会出现五个按钮，添加字体阴影、阴影、颜色、背景色以及添加一个写样式的入口
![WX20190319-174131.png](https://i.loli.net/2019/03/19/5c90b951f3b94.png)

## 9.断点设置技巧（超有用）

### 1). js条件断点

在source中添加断点时，右键可以添加Add confitional breakpoint条件断点。或者对已经设置好的一个断点右键选edit breakpoint。输入一个执行结果为boolean的表达式，即可；（可以设置在第11次循环时断点）

### 2). (js)The ninja（忍者） console.log

写代码时没有给代码中添加console.log。或者是在断点执行到这里，需要每次去console中打印出变量来查看，那么可以利用条件断点来添加 console.log / console.table / console.time。执行完后，可以在右边breakpoints下方 右键移除所有断点。

![WX20190319-174726@2x.png](https://i.loli.net/2019/03/19/5c90bab96b208.png)

### 3). DOM 断点

可以查看某个元素是在什么时候修改的，监听到节点被添加或者移除，或属性被改变；

![WX20190319-183155@2x.png](https://i.loli.net/2019/03/19/5c90c5951c1f5.png)

担心你添加了断点的元素被隐藏在一些折叠起来的父级元素中 - 他们会在 Element 中用高亮展示出来。
![WX20190319-183215@2x.png](https://i.loli.net/2019/03/19/5c90c595d6dd9.png)

### 4).MutationObserver （变化观察者）

监测XHR/fetch 断点。

可以不设置url时，对所有的请求打断点。或者写url的一部分，对此请求打断点
![WX20190319-183227@2x.png](https://i.loli.net/2019/03/19/5c90c59778c75.png)

## 10. 对象&方法

### 1). queryObjects function 对象查询方法

定义了对象后，然后实例化对象后，queryObjects(Person)可以列表出这几个实例化的对象。

### 2). monitor functions 镜像函数

可以监测1函数。在执行2函数中，如果2调用了1，就会打印出来2调用了1，并传入了什么参数。

```js
function test1(name){
  console.log(name)
}
function test11() {
  test1('zhang')
}
function test121() {
  test1('li')
}
```

![WX20190319-175602@2x.png](https://i.loli.net/2019/03/19/5c90bcbd6d2cd.png)

### 3).monitorEvents函数

可以监测元素上的事件

![WX20190319-182041@2x.png](https://i.loli.net/2019/03/19/5c90c298eddf8.png)

## 11.快捷键

* h 隐藏元素
* ctrl + /many things really/ 来移动或者复制粘贴元素
* ctrl + shift + P 来控制 控制面板 的显示和隐藏
* ctrl + shift + D来切换控制台在下方还是右方
* ctrl+[,ctrl+]来在elements、console、source等之间依次切换
* 按下 ctrl + 1 到 ctrl + 9 转到编号 1...9 的面板(所以 ctrl + 1 转到元素面板，ctrl + 4 转到 网络信息面板等等)[默认未开启，需在settings中开启；同时如果在页面中，这组操作会切换浏览器标签页）
* 还有数值增加减少的
    ![WX20190319-181841@2x.png](https://i.loli.net/2019/03/19/5c90c21de0359.png)

## 13 小技巧

### 1).replay XHR requests (重新发送 XHR 的请求)

![WX20190319-182734@2x.png](https://i.loli.net/2019/03/19/5c90c4225416f.png)

### 2). 在元素面板中展开所有的子节点

右击节点后的 expand recursively 命令

![WX20190319-182955@2x.png](https://i.loli.net/2019/03/19/5c90c4b612719.png)

## 14-drawer) 14. Drawer

下面的console等出现隐藏的快捷键——esc

* coverage可以检查代码哪些运行了（绿色），哪些没运行（红色）
* change 可以显示你更改前后的代码
  （在styles中更改了css后，ctrl+shift+p 搜change，点击drawer change就可以看到这个样式修改前后的内容）

## 15. Workspace的黑魔法

--这节所说的托文件进去直接编辑，我测试不可行

## 16. Snippets(代码块)

创建这样一个 Snippet 进入到 Sources 面板，在导航栏里面选中 Snippets 这栏，点击 “New snippet(新建一个代码块)” ,输入你的代码，保存，大功告成！你可以通过右击菜单或者 [ctrl] + [enter] 快捷键来运行它了。

![WX20190321-114535@2x.png](https://i.loli.net/2019/03/21/5c93092df1348.png)

> 只能在本页面使用这些保存的snippets

一旦设置了一组很棒的代码块，你甚至不必访问 Sources 来运行它们。最快的方式，就像我们本周已经多次发现的那样，就是使用 Command Menu。如果输入 ! 在它的输入框中，就可以根据名字来选择你的代码块

## 17.network

* 可显示隐藏overview
* initiator 列显示了是哪个脚本的哪一行触发了请求，可点击查看
* 过滤器输入可以接受你输入的字符串或正则表达式，仅显示匹配的请求；可以使用它来过滤很多属性。
    例如 method 或者 mime-type
* 可自定义请求表；例如：Status, Type, Initiator, Size 和 Time 。但是你同样可以添加更多(例如 我经常添加 Method )

## 18.tips

### 1). 直接在回调中使用 console.log

不完全确定要将什么传递给回调函数。在这种情况下，我会在里面添加一个 console.log 来检查。

在回调方法的内部使用 console.log 或者 直接使用 consolelog 来作为回调方法。这不仅可以减少输入，而且可能回调接收多于1个参数，在第一个解决方案中你可能会错过
![WX20190321-115807@2x.png](https://i.loli.net/2019/03/21/5c930bd777a63.png)

### 2).使用实时表达式

DevTools 在 Console 面板中引入了一个非常漂亮的附加功能，这是一个名为 Live expression 的工具

只需按下 "眼睛" 符号，你就可以在那里定义任何 JavaScript 表达式。 它会不断更新，所以表达的结果将永远，存在
![WX20190321-115906@2x.png](https://i.loli.net/2019/03/21/5c930c11be020.png)

> 感谢[dendoink](https://juejin.im/user/585a2f52128fe10069ba1b95)翻译了这篇[你不知道的Chrome调试工具技巧](https://juejin.im/post/5c09a80151882521c81168a2)，并且翻译的这么棒！