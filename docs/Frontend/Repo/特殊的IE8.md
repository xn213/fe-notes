# 特殊的 IE8

## 1.foreach

```js
if (typeof Array.prototype.forEach != 'function') {
  //IE8不支持,此时我们需要自己定义一个类似forEach功能的函数。
  Array.prototype.forEach = function(callback){
    for (var i = 0; i < this.length; i++){
      callback.apply(this, [this[i], i, this]);
    }
  };
}
```

## 2. rem

## 3. calc

## 4. document.addEventListener 和 document.attachEvent（绑定函数）

## 5. bootstrap中的.form-control的width:auto，不支持

## 6. 只IE8支持的样式书写方式

```css
/*IE8*/
@media \0screen {
  body {font-size: 14px;}
  h3{font-weight:600;}
}
```

## 7. 有一种情况下的布局，必须加上position:relative；才能用？？？

## 8. td 边框丢失

## 9. IE8支持first-child，但是不支持last-child

## 10. IE8下Jquery获取select选中的值的问题

我们一般使用jquery获取select时，一般这么用：

```js
<select id='a'>
  <option selected='selected' value='1'>
</select>
​
var selectedValue = $("#a").val();
```

在非IE8下，`selectedValue`的值为“1”，`typeof selectedValue` 为`“string”`。

在IE8下，`selectedValue`的值为[“1”]，`typeof selectedValue` 为 `“objectg”`。

如果直接将`selectedValue` post发送到后台，后台接收时会报错，因为在传输过程中，IE8下`selectedValue`当成了数组，后台无法识别。

```js
selectedValue  = typeof selectedValue == "object" ? selectedValue[0] : selectedValue;
```

这样`selectedValue`为字符串了。
另外这样会引发其他的问题：

```js
var a = selectedValue.trim();
```

这段代码在IE8下无法执行，可能的原因也是由于上述所致。
使用如下代码就确保可以运行：

##  11. IE8中对select的option不写value 回显有问题

## 12. IE8下载拿不到文件名字，所以总是下载成html格式的，改后端一句代码即可

```js
httpHeaders.setContentDispositionFormData("attachment", URLEncoder.encode(file.getName(), Charset.forName("utf8").name()));
```

## 13. IE上input 上传文件 type=file 必须鼠标点击才可触发change事件，而js去触发的无法触发change事件。

要实现按钮代替input type=file的样式来实现上传文件功能，解决方法如下：
使用透明度为0的input type=file来覆盖button，使得点击button时相当于点击了input type=file。
注意： form重置时必须用此句：

```js
$('#uploadForms')[0].reset();
  获取文件名：
var $flieValue = $('#identifyFiles').val();
  //获取文件格式（后缀名）
  var fileType = ($flieValue.substring($flieValue.lastIndexOf(".")+1,$flieValue.length)).toLowerCase();
```

上传：

```js
<div class="uploadDiv">
  <button type="button" class="templateUpload btn btn-primary">导入文件</button>
  <form action="" id="uploadForms" enctype="multipart/form-data" class="upLoads">
    <input type='file' name='file' class="uploadsInput" id='identifyFiles'>
  </form>
</div>
var options = {
  url: "/namls/account/level/batch",
  type: "POST",
​
  success:function(datas) {
    if(JSON.parse(datas).error){
      $dialog.alert(JSON.parse(datas).msg,'warning',60000);
    }else if(JSON.parse(datas).success){
      $dialog.alert(JSON.parse(datas).bodyData,'success',60000);
    }
    if($('#tableGrid tr td').length>1){
      rendTable();
    }
    $('#uploadForms')[0].reset();
  },
  resetForm:true,
  error:function(){
    $dialog.alert('出错了','error',60000);
  }
};
​
$(document).off('change','#identifyFiles').on('change','#identifyFiles',function(event){
  var $flieValue = $('#identifyFiles').val();
  //获取文件格式（后缀名）
  var fileType = ($flieValue.substring($flieValue.lastIndexOf(".")+1,$flieValue.length)).toLowerCase();
  if(fileType == "csv"){
    $('#uploadForms').ajaxSubmit(options);
  }else{
    $dialog.alert('上传文件格式应该为.csv','warning',60000);
    $('#uploadForms')[0].reset();
  }
});
```

## 14. event；

```js
var e = event||window.event;
```

## 15. juqery对浏览器的兼容性

jQuery 1.9及以下的版本支持IE的所有版本
1.9以上版本不再支持IE9以下版本

## 16. background-size IE11才支持

## 17. css3的opacity

```js
/* older safari/Chrome browsers */  
-webkit-opacity: 0.5;  
/* Netscape and Older than Firefox 0.9 */  
-moz-opacity: 0.5;  
/* Safari 1.x (pre WebKit!) 老式khtml内核的Safari浏览器*/  
-khtml-opacity: 0.5;  
/* IE9 + etc...modern browsers */  
opacity: .5;  
/* IE 4-9 */  
filter:alpha(opacity=50);  
/*This works in IE 8 & 9 too*/  
-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";  
/*IE4-IE9*/  
filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=50);
```

## 18. jquery.fullpage对IE8的兼容有问题

弹出2646行对象不支持此方法，是Object.keys(obj)，此方法的作用如下图所示，将对象中的key拿出来放进一个数组中。

对于fullpage.js的我们就采用加入一段代码解决此问题：

```js
var DONT_ENUM =  "propertyIsEnumerable,isPrototypeOf,hasOwnProperty,toLocaleString,toString,valueOf,constructor".split(","),
    hasOwn = ({}).hasOwnProperty;
    for (var i in {
        toString: 1
    }){
        DONT_ENUM = false;
    }
​
​
Object.keys = Object.keys || function(obj){//ecma262v5 15.2.3.14
    var result = [];
    for(var key in obj ) if(hasOwn.call(obj,key)){
        result.push(key) ;
    }
    if(DONT_ENUM && obj){
        for(var i = 0 ;key = DONT_ENUM[i++]; ){
            if(hasOwn.call(obj,key)){
                result.push(key);
            }
        }
    }
    return result;
};
```

## 19-mock-js%E4%B8%8D%E5%85%BC%E5%AE%B9ie8) 19. mock.js不兼容IE8