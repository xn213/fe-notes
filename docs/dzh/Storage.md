# 前端存储技术

## 前言

后端常用数据库做数据存储，譬如`MySql`、`MongoDB`，缓存技术存储数据，如`Redis`、`Memcached`；

前端存储数据目前常用的是`Cookie`、`Storage`、`IndexedDB`

## Cookie

`HTTP Cookie`（也叫`Web Cookie`或浏览器`Cookie`）是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。`Cookie`使基于无状态的`HTTP`协议记录稳定的状态信息成为了可能。

### 分类

`Cookie`总是保存在客户端中（早期`Java`中经常会将`Cookie`与`Session`作为存储技术进行比较，`Session`是将数据保存在服务器端，大量的数据存储会增加服务器的负担），按在客户端中的存储位置，可分为内存`Cookie`和硬盘`Cookie`。
内存`Cookie`由浏览器维护，保存在内存中，浏览器关闭后就消失了，其存在时间是短暂的。硬盘`Cookie`保存在硬盘里，有一个过期时间，除非用户手工清理或到了过期时间，硬盘`Cookie`不会被删除，其存在时间是长期的。所以，按存在时间，可分为非持久`Cookie`和持久`Cookie`。

### 创建Cookie

```
Set-Cookie`响应头部和`Cookie`请求头部节
服务器使用`Set-Cookie`响应头部向用户代理（一般是浏览器）发送`Cookie`信息。一个简单的`Cookie`可能像这样：`Set-Cookie: <cookie名>=<cookie值>
```

服务器通过该头部告知客户端保存`Cookie`信息

浏览器环境下获取非`HttpOnly`标记的 `cookie`

```
var cookies = document.cookie;
``` 

### Cookie的缺点

`Cookie`会被附加在每个`HTTP`请求中，所以无形中增加了流量。由于在`HTTP`请求中的`Cookie`是明文传递的，所以安全性成问题，除非用`HTTPS`。

`Cookie`的大小限制在`4KB`左右，对于复杂的存储需求来说是不够用的。

### Cookie的简单封装

设置`Cookie`时一般会将路径和过期时间一并设置，注意过期时间需要转换成`GMT`或者`UTC`

代码

```js
(function IIFE(root){
  function getCookie(cname, defaultValue){
    var value = new RegExp('(^|;| )'+cname+'=([^;]*?)(;|$)', 'g').exec(document.cookie);
    console.log('value:', value);
    if(!value) return defaultValue;
    return value[2];
  }
  function setCookie(cname, cvalue, day, path){
    day = day || 1;
    path = path || '/';
    var date = new Date();
    date.setTime(date.getTime() + day * 24 * 60 * 60 * 1000);
    document.cookie = cname+'='+cvalue+'; expires=' + date.toGMTString() + '; path='+path+'; ';
  }
  function deleteCookie(cname){
    setCookie(cname, null, -1);
  }
  root.Util = {
    getCookie: getCookie,
    setCookie: setCookie,
    deleteCookie: deleteCookie,
  }
})(window);
``` 

测试结果

![img](https://user-gold-cdn.xitu.io/2019/1/15/1684fbbfe3390d0b?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## Storage

作为 `Web Storage API`的接口，`Storage` 提供了访问特定域名下的会话存储（`session storage`）或本地存储（`local storage`）的功能，例如，可以添加、修改或删除存储的数据项。

如果你想要操作一个域名的会话存储（`session storage`），可以使用 `window.sessionStorage`如果想要操作一个域名的本地存储（`local storage`），可以使用  `window.localStorage`。

`sessionStorage`和`localStorage`的用法是一样的，区别在于`sessionStorage`会在会话关闭也就是浏览器关闭时失效，而`localStorage`是将数据存储在本地，不受关闭浏览器影响，除非手动清除数据

相关的api大家可以参考

[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FWindow%2FlocalStorage)

代码

```js
(function IIFE(){
  if(!window.localStorage){
    alert('your browser is not support localStorage!');
    return;
  }
  function getStorage(sname, defaultValue){
    //result = window.localStorage.sname
    //result = window.localStorage[sname]
    var result = window.localStorage.getItem(sname);
    return result || defaultValue;
  }
  function setStorage(sname, svalue){
    window.localStorage.setItem(sname, svalue);
  }
  function removeItem(sname){
    window.localStorage.removeItem(sname);
  }
  function getKey(keyIndex){
    return window.localStorage.key(keyIndex);
  }
  function getAllKeys(){
    var arr = [];
    for(var i=0;i<window.localStorage.length;i++){
        arr.push(window.localStorage.key(i));
    }
    return arr;
  }
  function clearStorage(){
      window.localStorage.clear();
  }
  function onStorageChange(event){
      console.log(event)
  }
  window.addEventListener('storage', onStorageChange);
  window.Util = {
    getStorage: getStorage,
    setStorage: setStorage,
    removeItem: removeItem,
    getKey: getKey,
    getAllKeys: getAllKeys,
    clearStorage: clearStorage,
  }
})();
```

测试结果

![img](https://user-gold-cdn.xitu.io/2019/1/15/1684fbf0318cda64?imageslim)

## IndexedDB

随着浏览器的功能不断增强，越来越多的网站开始考虑，将大量数据储存在客户端，这样可以减少从服务器获取数据，直接从本地获取数据。

现有的浏览器数据储存方案，都不适合储存大量数据：`Cookie`的大小不超过 `4KB`，且每次请求都会发送回服务器；`LocalStorage`在 `2.5MB` 到 `10MB` 之间（各家浏览器不同），而且不提供搜索功能，不能建立自定义的索引。所以，需要一种新的解决方案，这就是 `IndexedDB` 诞生的背景。

通俗地说，`IndexedDB`就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。`IndexedDB`允许储存大量数据，提供查找接口，还能建立索引。这些都是`LocalStorage` 所不具备的。就数据库类型而言，`IndexedDB`不属于关系型数据库（不支持 `SQL`查询语句），更接近 `NoSQL`数据库。

`IndexedDB`相关`API`可参考

[wangdoc.com/javascript/…](https://link.juejin.im/?target=https%3A%2F%2Fwangdoc.com%2Fjavascript%2Fbom%2Findexeddb.html%23indexeddb-%25E5%25AF%25B9%25E8%25B1%25A1)

代码
```js
(function IIFE(){
  if(!window.indexedDB){
    alert('your browser is not support indexedDB!');
    return;
  }
  var request = window.indexedDB.open('person', 1);
  var db;
  request.onerror = function (event) {
    console.log('数据库打开报错');
  };
  request.onsuccess = function (event) {
    db = request.result;
    console.log('数据库打开成功');
  };
  request.onupgradeneeded = function(event) {
    console.log('onupgradeneeded...');
    db = event.target.result;
    var objectStore = db.createObjectStore('person', { keyPath: 'id' });
    objectStore.createIndex('name', 'name', { unique: false });
    objectStore.createIndex('email', 'email', { unique: true });
  }
  function add(obj) {
    var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .add(obj)
        //.add({ id: 1, name: 'ccy', age: 18, email: 'test@example.com' });

    request.onsuccess = function (event) {
      console.log('数据写入成功');
    };
    request.onerror = function (event) {
      console.log('数据写入失败');
    }
  }
  function read(index) {
    var transaction = db.transaction(['person']);
    var objectStore = transaction.objectStore('person');
    var request = objectStore.get(index);
    request.onerror = function(event) {
      console.log('事务失败');
    };

    request.onsuccess = function(event) {
      if (request.result) {
        console.log('Name: ' + request.result.name);
        console.log('Age: ' + request.result.age);
        console.log('Email: ' + request.result.email);
      } else {
        console.log('未获得数据记录');
      }
    };
  }
  function readAll() {
    var objectStore = db.transaction('person').objectStore('person');
    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        console.log('Id: ' + cursor.key);
        console.log('Name: ' + cursor.value.name);
        console.log('Age: ' + cursor.value.age);
        console.log('Email: ' + cursor.value.email);
        cursor.continue();
      } else {
        console.log('没有更多数据了！');
      }
    };
  }
  function update(obj) {
    var request = db.transaction(['person'], 'readwrite')
        .objectStore('person')
        .put(obj)
        //.put({ id: 1, name: '李四', age: 35, email: 'lisi@example.com' });

    request.onsuccess = function (event) {
      console.log('数据更新成功');
    };

    request.onerror = function (event) {
      console.log('数据更新失败');
    }
  }
  function remove(index) {
    var request = db.transaction(['person'], 'readwrite')
      .objectStore('person')
      .delete(index);

    request.onsuccess = function (event) {
      console.log('数据删除成功');
    };
  }
  window.util = {
    add: add,
    read: read,
    readAll: readAll,
    update: update,
    remove: remove,
  }
})();
```

测试结果

![img](https://user-gold-cdn.xitu.io/2019/1/15/1684fc0dd85b9d08?imageslim)

## 后记

浏览器存储技术目前流行的基本就上面介绍的三种，之前出现的`webSql`由于用方言`SQLlite`导致无法统一，也就是说这是一个废弃的标准。

`localStorage`、`indexedDB`这里没有做详细的介绍，只是简单的给出示例代码做做演示，不熟悉的可以查阅相关`API`。

## 参考资料

[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FStorage)

[developer.mozilla.org/zh-CN/docs/…](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FCookies)

[zh.wikipedia.org/wiki/Cookie](https://link.juejin.im/?target=https%3A%2F%2Fzh.wikipedia.org%2Fwiki%2FCookie)

[www.ruanyifeng.com/blog/2018/0…](https://link.juejin.im/?target=http%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2018%2F07%2Findexeddb.html)

[wangdoc.com/javascript/…](https://link.juejin.im/?target=https%3A%2F%2Fwangdoc.com%2Fjavascript%2Fbom%2Findexeddb.html)

> 作者：蟹丸
>
> 链接：https://juejin.im/post/5c3d5d97e51d455243765e8a
>
> 来源：掘金