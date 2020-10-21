# 初始化相关

## 项目目录通用结构

```
- 项目
  |- js
  |- lib
  |- pages
  |- static
  |- styles
  | index.html
```

---

## HTML页面初始化

_**PC端**_

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- 标准的理想视口 -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1,minimum-scale=1,user-scalable=no">

  <!-- 控制IE渲染内核的选择。ie=edge确保ie为最新版本,chrome=1针对装了chrome frame插件的IE浏览器起作用，以防万一写上。 -->
  <meta http-equiv="X-UA-Compatible" content="ie=edge, chrome=1">

  <title>网站标题</title>
  <meta name="Author" content="网页作者" />
  <meta name="Copyright" content="网站版权" /> 
  <meta name="keywords" content="网站关键字" />
  <meta name="description" content="网站描述" />
  <link rel="Shortcut Icon" href="网站.ico图标路径" />
  <link rel="stylesheet" href="css样式文件路径">
</head>
<body>

</body>
<script src="javascript脚本文件路径"></script>
</html>
```

---

## CSS重置样式

_**定制自己的  reset.css**_

```css
@charset "utf-8"; 

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header,
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input{
  margin: 0;
  padding: 0;
  /* 怪异盒子模型,看需求加 */
  box-sizing: border-box;
}

/* 让非ie浏览器默认也显示垂直滚动条，防止因滚动条引起的闪烁 */
html { overflow-y: scroll; }

body{
  font-size: 16px;
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  line-height: 1;
}

blockquote, q {
  quotes: none;
}

/* 表格重置看需求加 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

a{
  text-decoration: none;
  /* 转化为块级容器,看需求加 */
  display: block;
  /* 继承父级颜色 */
  color: inherit; 
   /* 去除a标签在移动端的默认蓝色区域 */
  -webkit-tap-highlight-color: transparent;
}
a:hover{
  color: inherit; 
  text-decoration: underline; 
}

img{
   /* 去掉图片默认的3px */
  border: 0;
  /* 转化为块级容器,看需求加 */
  display: block;
  width: 100%;
  vertical-align: middle;
}

input{
  /* 去除默认外轮廓线跟边框线 */
  border: none;
  outline: none;
}

ul,li,ol{
  list-style: none;
}

/*清除浮动*/
.clearfix::after {
  content: ".";
  visibility: hidden;
  clear: both;
  display: block;
  height: 0;
  line-height: 0;
}
.clearfix {
  *zoom: 1;
}
```

_**另外也可以通过引入 Normalize.css进行css初始化**_

---

## JS兼容文件

_**IE8及以下不兼容H5语义化标签,加载 html5shiv.js**_

```
<!--[if lt IE 9]>
	<script src="html5shiv.js"></script>
<![endif]-->
```

_**IE8及以下不兼容CSS3 Media,加载 response.js**_

```html
<!--[if lt IE 9]>
	<script src="respond.js"></script>
<![endif]-->
```

> 注:response.js无法解析CSS @import命令。

_**让IE6~8支持CSS3伪类和属性选择器,加载 selectivizr.js**_

```html
<!--[if (gte IE 6)&(lte IE 8)]>
	<script type="text/javascript" src="selectivizr.js"></script>
<![endif]-->
```

_**处理移动端点击延迟300ms左右的事件(点透事件),加载 fastclick.js**_

```html
<!-- 在head内引入fastclick.js  -->
<script src="./fastclick.js"></script>
``` 

初始化

```js
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		FastClick.attach(document.body);
	}, false);
}
```

---

## webpack