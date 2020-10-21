# 常用代码片段 CommonCodeSnippets

### 获取两个数之间的随机数

```js
//封装随机数函数
function getRandom(n,m) {
	return parseInt(Math.random()*(m - n + 1) + n);      //+1把最后一个数也能取到
}
``` 

### 获取页面滚动的高度

```js
window.onscroll = function () {
	// 兼容性处理
    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
}
``` 

### 设置rem

```js
function setHTML() {
    // 基础值
    var baseVal = 100;
    // 设计稿的宽度
    var pageWidth = 375;
    // 要适配的屏幕的宽度?
    var screenWidth = document.querySelector("html").offsetWidth;
    // 要设置的fontsize
    var fontsize = screenWidth * baseVal / pageWidth;
    // 设置到html标签的中
    document.querySelector("html").style.fontSize = fontsize + "px";
  }
``` 

### 常用正则表达式

```js
//验证邮箱 
/^\w+@([0-9a-zA-Z]+[.])+[a-z]{2,4}$/ 

//验证手机号 
/^1[3|5|8|7]\d{9}$/ 

//验证URL 
/^http:\/\/.+\./

//验证身份证号码 
/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/ 

//匹配字母、数字、中文字符 
/^([A-Za-z0-9]|[\u4e00-\u9fa5])*$/ 

//匹配中文字符
/[\u4e00-\u9fa5]/ 

//匹配双字节字符(包括汉字) 
/[^\x00-\xff]/
```

### 正则获取url中的参数

```js
// 正则获取地址栏id
//function getUrl(name) {    与下方定义函数的方式相同
getUrl: function (name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}
```

### 正则验证手机号码

```js
function checkPhone(phone) {
    if (!(/^1[34578]\d{9}$/.test(phone))) {
        return false;
    } else {
        return true;
    }
}
```

### 正则验证码邮箱

```js
function checkEmail(myemail) {　　
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
    if (myReg.test(myemail)) {　　　　
        return true;　　
    } else {　　　　
        return false;
    }
}
```

### 把对象格式的参数转成键值对，并以&分割

```js
/**
 * 把对象格式的参数转成键值对，并以&分割
 * @param arr 要转换的对象参数
 * @returns {string}
 */
function maiyaBuildParam(arr){
    var result = '';
    for(var key in arr)
    {
        result += key + "=" + encodeURIComponent(arr[key]) + "&";
    }
    result = result.substr(0,result.length-1);
    return result;
}
```

### 时间格式化

**使用方式**

```js
new Date().format('yyyy-MM-dd');  // "2017-02-18"

new Date().format('yyyy-MM-dd hh-mm-ss');  // "2017-02-18 04-41-08"
new Date().format('yyyy-MM-dd hh/mm/ss');  // "2017-02-18 04/41/18"
new Date().format('yyyy-MM-dd HH/mm/ss');  // "2017-02-18 16/42/30"

new Date().format('yyyy-MM-dd E HH/mm/ss');	//"2017-02-18 六 16/51/16"
new Date().format('yyyy-MM-dd EE HH/mm/ss');  //"2017-02-18 周六 16/51/30"

new Date().format('yyyy-MM-dd EEE HH/mm/ss');  //"2017-02-18 星期六 16/51/77"
```

**源码**

```js
Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //12小时
        "H+": this.getHours(), //24小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "日",
        "1": "一",
        "2": "二",
        "3": "三",
        "4": "四",
        "5": "五",
        "6": "六"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}
```

### 阻止默认行为

```js
// 原生js
document.getElementById('btn').addEventListener('click', function (event) {
    event = event || window.event；

    if (event.preventDefault){
        // w3c方法 阻止默认行为
        event.preventDefault();
    } else{
        // ie 阻止默认行为
        event.returnValue = false;
    }
}, false);

// =====================================================================

// jQuery
$('#btn').on('click', function (event) {
    event.preventDefault();
});
```

### 阻止冒泡

```js
// 原生js
document.getElementById('btn').addEventListener('click', function (event) {
    event = event || window.event；

    if (event.stopPropagation){
        // w3c方法 阻止冒泡
        event.stopPropagation();
    } else{
        // ie 阻止冒泡
        event.cancelBubble = true;
    }
}, false);

// ==========================================================================

// jQuery
$('#btn').on('click', function (event) {
    event.stopPropagation();
});
```

### JS读取与解析本地文本类文件

```js
// 已知file就是文件对象
var reader = new FileReader();
reader.onload = function (event) {
    // event.target.result就是文件文本内容
    // 然后你就可以为所欲为了
    // 例如如果是JSON数据可以解析
    // 如果是HTML数据，可以直接插入到页面中
    // 甚至字幕文件，各种滤镜，自定义文件格式，都可以玩弄于鼓掌之间……
};
reader.readAsText(file);
```