# JQuery

### query的遍历

1.  选择器+遍历

    ```js
    $('div').each(function (i){

       // i就是索引值
       // this 表示获取遍历每一个dom对象

    });
    ```

2.  选择器+遍历

    ```js
    $('div').each(function (index,domEle){

       // index就是索引值
       // domEle 表示获取遍历每一个dom对象

    });
    ```

3.  更适用的遍历方法

    ```js
    // 1）先获取某个集合对象
    // 2）遍历集合对象的每一个元素

    var d=$("div");

    $.each(d,function (index,domEle){

      // d是要遍历的集合
      // index就是索引值
      // domEle 表示获取遍历每一个dom对象

    });
    ```

### `$.ajax` 与 `FormDate`

**html部分:**

```html
<input id="file" type="file" name="file"/>
```

**js部分:**

```js
$.ajax({
  url: '/upload',
  type: 'POST',
  cache: false,
  data: new FormData($('#uploadForm')[0]),
  processData: false,	//
  contentType: false,
  success: () => {
    // code
  }
})
```

> `processData: false`不要让ajax进行数据的处理，因为formdata已经处理了
>
> `contentType: false`不要让ajax进行数据的编码，formdata已经实现编码了
>
> 在原生ajax中不需要此操作