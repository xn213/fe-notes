## 前言

本篇主要讲述 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的一些基本知识点以及我们在生产开发中怎么去使用。为了能够更好的了解 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)，我们希望你对以下知识点有所了解，如果有相关的开发经验，那是最好不过的了。

* [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)

* [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

* [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP)


本文中对有些关键词提供了相应的链接，如果你对该关键词不够了解或想要了解更多，你可以通过点击它充实自己。文中有些知识点在  [MDN Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 上已经写的很详细，因此有略过，希望同学们在阅读本文章时能够同时对照阅读。

本文行文思路首先从[规范](https://fetch.spec.whatwg.org/)入手，目的是让大家了解的更透彻，达到知其然知其所以然。

为了更好的掌握 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)，文章中还提供了一些[示例代码](https://github.com/GoDotDotDot/fe9-fetch-demo/)供大家学习使用。在使用该示例代码前，我们希望你对 [node.js ](https://nodejs.org/) 有一些了解，如果没有的话，你可以根据示例中的友情提示完成你的这次学习体验。


读完本篇文章后你将了解到以下内容：

* 什么是 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

* [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的一些基本概念

* 如何使用 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

* [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的一些不足以及我们如何“优雅”的使用它


希望你通过读完本篇文章后，对 Fetch 有一个基本的了解。


## Fetch 简介

[Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 是一种新的用于获取资源的技术，它被用来代替我们已经吐槽了很久的技术（[XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)）。

[Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 使用起来很简单，它返回的是一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，即使你没有 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的开发经验也能快速上手。说了那么多，我们还是先睹为快吧，让我们快快下面的示例代码。

```js
fetch('https://github.com/frontend9/fe9-library', {
method: 'get'
}).then(function(response) {

}).catch(function(err) {
// Error
});
```

是不是简单的不能再简单了？好，既然我们 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 有了简单的认识之后，那我们再来了解下 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 的基本概念。

## Fetch 基本概念

在 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API) 中有四个基本概念，他们分别是 **Headers**、**Request** 、**Response** 和 **Body**。为了更好的理解 [Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)，我们需要对这些概念做一个简单的了解。

在一个完整的 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 请求中，其实就已经包含了这四个概念。请求中有请求头和请求体，响应中有响应头和响应体。所以我们有必要了解这些概念。

### Headers

为了实现头部的灵活性，能够对头部进行修改是一个非常重要的能力。Headers 属于 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 中[首部](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)的一份子，它是一个抽象的接口，利用它可以对 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 的请求头和响应头做出添加、修改和删除的操作。


下面我们先看一下它具有哪些接口：

```js
typedef (sequence<sequence<ByteString>>or record<ByteString, ByteString>) HeadersInit;

[Constructor(optional HeadersInit init),
Exposed=(Window,Worker)]
interface Headers {
void append(ByteString name, ByteString value);
void delete(ByteString name);
ByteString? get(ByteString name);
boolean has(ByteString name);
void set(ByteString name, ByteString value);
iterable<ByteString, ByteString>;
};interface Headers {
void append(ByteString name, ByteString value);
void delete(ByteString name);
ByteString? get(ByteString name);
boolean has(ByteString name);
void set(ByteString name, ByteString value);
iterable<ByteString, ByteString>;
};
// 来自 https://fetch.spec.whatwg.org/#headers-class
```

规范中定义的接口我们可以对应着 [MDN](https://developer.mozilla.org/) 进行查看，你可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Headers#%E6%96%B9%E6%B3%95)更直观的看看看看它有哪些方法供我们使用。


这里我们对 `Headers` 的构造参数做个解释。首先参数类型为 `HeadersInit`，我们再看下这个类型支持哪些类型的值。我们从规范中可以看到的定义是：

```js
typedef (sequence<sequence<ByteString>> or record<ByteString, ByteString>) HeadersInit;
```

这里我们对应到 `JavaScript` 这门语言，意思就是说这个对象可以是数组或者是键值对（即对象）。关于如何初始化这些参数，我们可以看下规范中定义的[流程](https://fetch.spec.whatwg.org/#concept-headers-fill)。


> To fill a `Headers` object (headers) with a given object (object), run these steps:
>
> 1.  If object is a [sequence](https://heycam.github.io/webidl/#idl-sequence), then [for each](https://infra.spec.whatwg.org/#list-iterate) header in object:
>
> 1.  1.  If header does not contain exactly two items, then [throw](https://heycam.github.io/webidl/#dfn-throw) a `TypeError`.
>
> 1.  2.  [Append](https://fetch.spec.whatwg.org/#concept-headers-append) header’s first item/header’s second item to headers.
>
>
> 1.  Otherwise, object is a [record](https://heycam.github.io/webidl/#idl-record), then [for each](https://infra.spec.whatwg.org/#map-iterate) key → value in object, [append](https://fetch.spec.whatwg.org/#concept-headers-append) key/value to headers.



这里我需要对这个做个说明，后面对 fetch 的用法会涉及到一点以及我们看 [polyfill](https://github.com/github/fetch) 都会有所帮助。

* 第一种：即数组，当数据每项如果不包含两项时，直接抛出错误。然后数组第一项是 `header` 名，第二项是值。，最后直接通过 `append` 方法添加。

* 第二种：即键值对（这里指对象），我们通过循环直接取到键值对，然后通过 `append` 方法添加。


#### 示例

示例代码地址：https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/views/headers.html#L17


打开浏览器输入：http://127.0.0.1:4000/headers

那么我们该如何使用它呢？首先我们需要通过 `new Headers()` 来实例化一个 Headers 对象，该对象返回的是一个空的列表。在有了对象实例后，我们就可以通过接口来完成我们想要的操作，我们来一起看看下面的示例：

```js
functionprintHeaders(headers) {
let str='';
for (let header of headers.entries()) {
str += `
<li>${header[0]}: ${header[1]}</li>
`;
console.log(header[0] + ': ' + header[1]);
}
return `<ul>
${str}
</ul>`;
}
const headers = new Headers();
// 我们打印下看看是否返回的是一个空的列表
const before = printHeaders(headers); // 发现这里没有任何输出
document.getElementById('headers-before').innerHTML = before;
// 我们添加一个请求头
headers.append('Content-Type', 'text/plain');
headers.append('Content-Type', 'text/html');
headers.set('Content-Type', ['a', 'b']);
const headers2 = new Headers({
'Content-Type': 'text/plain',
'X-Token': 'abcdefg',
});
const after = printHeaders(headers); // 输出：content-type:
```

如果你觉得每次都要 `append` 麻烦的话，你也可以通过在构造函数中传入指定的头部，例如：

```js
constheaders2 = new Headers({
'Content-Type': 'text/plain',
'X-Token': 'abcdefg'
});

printHeaders(headers2);
// 输出：
// content-type: text/plain
// x-token: abcdefg
```

这里我添加了一个自定义头部 `X-Token`，这在实际开发中很常见也很有实际意义。但是切记在 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 中需要满足相关规范，否则会产生跨域错误。

你可以通过`append` 、 `delete` 、`set` 、`get` 和`has` 方法修改请求头。这里对 `set` 和 `append` 方法做个特殊的说明：

`set`： 如果对一个已经存在的头部进行操作的话，会将新值替换掉旧值，旧值将不会存在。如果头部不存在则直接添加这个新的头部。

`append`：如果已经存在该头部，则直接将新值追加到后面，还会保留旧值。

为了方便记忆，你只需要记住 `set` 会覆盖，而 `append` 会追加。


#### Guard

Guard 是 Headers 的一个特性，他是一个守卫者。它影响着一些方法（像 `append` 、 `set` 、`delete`）是否可以改变 header 头。

它可以有以下取值：`immutable`、`request`、`request-no-cors`、`response` 或 `none`。

这里你无需关心它，只是为你让你了解有这样个东西在影响着我们设置一些 Headers。你也无法去操作它，这是代理的事情。举个简单的例子，我们无法在 Response Headers 中插入一个 `Set-Cookie`。

如果你想要了解更过的细节，具体的规范请参考 [concept-headers-guard](https://fetch.spec.whatwg.org/#concept-headers-guard) 和 [MDN Guard](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Basic_concepts#Guard)


### 注意

* 我们在给头部赋值的时候需要满足[可接受的首部字段集合](https://fetch.spec.whatwg.org/#concept-header-name)否则将会报 `TypeError` 。

### Body

Body 准确来说这里只是 [mixin](https://developer.mozilla.org/en-US/docs/Glossary/mixin)，代表着请求体或响应体，具体由 `Response` 和 `Request` 来实现。


下面我们来看看它具有哪些接口：

```js
interface mixinBody {
readonly attribute ReadableStream? body;
readonly attribute boolean bodyUsed;
[NewObject] Promise<ArrayBuffer> arrayBuffer();
[NewObject] Promise<Blob> blob();
[NewObject] Promise<FormData> formData();
[NewObject] Promise<any> json();
[NewObject] Promise<USVString> text();
};
// 来自 https://fetch.spec.whatwg.org/#body
```

规范中定义的接口我们可以对应着 [MDN](https://developer.mozilla.org/) 进行查看，你可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Body)更直观的看看它有哪些属性和方法供我们使用。

这里需要注意看这些方法返回的都是 `Promise`，记住这在基于 `fetch` 进行接口请求中很重要。记住了这个，有利于我们在后面的文章中理解 `fetch` 的用法。


#### 范例

范例将在 `Response` 中体现。



### Request

Request 表示一个请求类，需要通过实例化来生成一个请求对象。通过该对象可以描述一个 [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 请求中的请求（一般含有请求头和请求体）。既然是用来描述请求对象，那么该请求对象应该具有修改请求头（Headers）和请求体（Body）的方式。下面我们先来看下规范中 Request 具有哪些接口：

```js
typedef (Request or USVString) RequestInfo;

[Constructor(RequestInfo input, optional RequestInitinit),
Exposed=(Window,Worker)]
interface Request {
readonly attribute ByteString method;
readonly attribute USVString url;
[SameObject] readonly attribute Headers headers;

readonly attribute RequestDestination destination;
readonly attribute USVString referrer;
readonly attribute ReferrerPolicy referrerPolicy;
readonly attribute RequestMode mode;
readonly attribute RequestCredentials credentials;
readonly attribute RequestCache cache;
readonly attribute RequestRedirect redirect;
readonly attribute DOMString integrity;
readonly attribute boolean keepalive;
readonly attribute boolean isReloadNavigation;
readonly attribute boolean isHistoryNavigation;
readonly attribute AbortSignal signal;

[NewObject] Request clone();
};
Request includes Body;

dictionary RequestInit {
ByteString method;
HeadersInit headers;
BodyInit? body;
USVString referrer;
ReferrerPolicy referrerPolicy;
RequestMode mode;
RequestCredentials credentials;
RequestCache cache;
RequestRedirect redirect;
DOMString integrity;
boolean keepalive;
AbortSignal? signal;
any window; // can only be set to null
};

enum RequestDestination { "", "audio", "audioworklet", "document", "embed", "font", "image", "manifest", "object", "paintworklet", "report", "script", "sharedworker", "style",  "track", "video", "worker", "xslt" };
enum RequestMode { "navigate", "same-origin", "no-cors", "cors" };
enum RequestCredentials { "omit", "same-origin", "include" };
enum RequestCache { "default", "no-store", "reload", "no-cache", "force-cache", "only-if-cached" };
enum RequestRedirect { "follow", "error", "manual" };
// 来自 https://fetch.spec.whatwg.org/#request-class
```

规范中定义的接口我们可以对应着 [MDN](https://developer.mozilla.org/) 进行查看，你可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Request)更直观的看看它有哪些属性和方法供我们使用，这里不做一一解释。

注意这里的属性都是只读的，规范中我们可以看到构造函数的第一个参数为 `Request` 对象或字符串，我们一般采取字符串，即需要访问的资源地址（ [HTTP](https://developer.mozilla.org/zh-CN/docs/Web/HTTP) 接口地址）。第二个参数接收一个 `RequestInit` 可选对象，而这个对象是一个字典。在 `javascript` 中，我们可以理解为一个对象（{}）。`RequestInit` 里面我们可以配置初始属性，告诉 `Request` 我们这个请求的一些配置信息。


这里我们需要对以下几个属性特别注意下。

**mode** 是一个 `RequestMode` 枚举类型，可取的值有 `navigate`, `same-origin`,  `no-cors`, `cors`。它表示的是一个请求时否使用 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)，还是使用严格同源模式。当处于跨域情况下，你应当设置为 `cors`。该值的默认值在使用 `Request` 初始化时，默认为 `cors`。当使用标记启动的嵌入式资源，例如 `<link>`、 `<script>`标签（未手动修改 [crossorigin](https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_settings_attributes) 属性），默认为 `no-cors`。详细信息请参考 [whatwg](https://fetch.spec.whatwg.org/#concept-request-mode) 规范或 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/mode) 。


**credentials** 是一个 `RequestCredentials` 枚举类型，可取的值有 `omit`, `same-origin`, `include`。它表示的是请求是否在跨域情况下发送 `cookie`。看到这，如果对 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 了解的同学应该很熟悉。这和 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 中的 `withCredentials` 很相似。但是 `credentials` 有三个可选值，它的默认值为 `same-origin`。当你需要跨域传递 `cookie` 凭证信息时，请设置它为 `include`。注意这里有一个细节，当设置为 `include` 时，请确保 `Response Header` 中 `Access-Control-Allow-Origin` 不能为 `*`，需要指定源（例如：[http://127.0.0.1:4001](http://127.0.0.1:4001/)），否则会你将会在控制台看到如下错误信息。详细信息请参考 [whatwg](https://fetch.spec.whatwg.org/#concept-request-credentials-mode) 规范或 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/Request/credentials) 。


> The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.


_你可以使用文章中提供的代码中启动_ _`cors`_ __[示例代码](https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/cors.js)_，然后在浏览器中输入_ [http://127.0.0.1:4001/request，如果不出意外的话，你可以在控制台中看到上面的错误提示](http://127.0.0.1:4001/request%EF%BC%8C%E5%A6%82%E6%9E%9C%E4%B8%8D%E5%87%BA%E6%84%8F%E5%A4%96%E7%9A%84%E8%AF%9D%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E5%9C%A8%E6%8E%A7%E5%88%B6%E5%8F%B0%E4%B8%AD%E7%9C%8B%E5%88%B0%E4%B8%8A%E9%9D%A2%E7%9A%84%E9%94%99%E8%AF%AF%E6%8F%90%E7%A4%BA)

**body** 是一个 [BodyInit](https://fetch.spec.whatwg.org/#bodyinit) 类型。它可取的值有 `Blob`,`BufferSource` , `FormData` , `URLSearchParams` , `ReadableStream` , `USVString`。细心的同学不知道有没有发现，我们常见的 `json` 对象却不在其中。因此，我们如果需要传递 `json` 的话，需要调用 `JSON.stringify` 函数来帮助我们转换成字符串。

下面将给出一段示例代码。

#### 示例

示例代码地址：https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/views/request.html#L24

打开浏览器输入：http://127.0.0.1:4000/request

```js
// 客户端constheaders=new Headers({
'X-Token': 'fe9',
});
const request = new Request('/api/request', {
method: 'GET',
headers,
});
console.log(request); // Request {method: "GET", url: "http://127.0.0.1:4000/api/request", headers: Headers, destination: "", referrer: "about:client", …}
console.log(request.method); // GET
console.log(request.mode); // cors
console.log(request.credentials); // same-origin
// 如果你想打印headers信息，可以调用 printHeaders(request.headers)
```

这里我们先以 `GET` 简单请求作为示例，我们传递了一个自定义的 `Headers`，指定了请求方法 `method` 为 `GET`（默认为 `GET`）。在上面的接口规范中，我们可以通过 `Request` 对象拿到一些常用的属性，比如 `method`、`url`、`headers` 、`body` 等等只读属性。



### Response

Response 和 Request 类似，表示的是一次请求返回的响应数据。下面我们先看下规范中定义了哪些接口。

```js
[Constructor(optional BodyInit? body = null, optionalResponseInitinit), Exposed=(Window,Worker)]
interface Response {
[NewObject] static Response error();
[NewObject] static Response redirect(USVString url, optional unsigned short status = 302);

readonly attribute ResponseType type;

readonly attribute USVString url;
readonly attribute boolean redirected;
readonly attribute unsigned short status;
readonly attribute boolean ok;
readonly attribute ByteString statusText;
[SameObject] readonly attribute Headers headers;
readonly attribute Promise<Headers> trailer;

[NewObject] Response clone();
};
Response includes Body;

dictionary ResponseInit {
unsigned short status = 200;
ByteString statusText = "";
HeadersInit headers;
};

enum ResponseType { "basic", "cors", "default", "error", "opaque", "opaqueredirect" };
// 来自 https://fetch.spec.whatwg.org/#response-class
```

规范中定义的接口我们可以对应着 [MDN](https://developer.mozilla.org/) 进行查看，你可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Response)更直观的看看它有哪些属性和方法供我们使用，这里不做一一解释。

其中 `status`, `headers` 属性最为常用。通过 `status` 状态码我们可以判断出服务端请求处理的结果，像 `200`, `403` 等等常见状态码。这里举个例子，当 `status` 为 `401` 时，可以在前端进行拦截跳转到登录页面，这在现如今 `SPA`（单页面应用程序）中尤为常见。我们也可以利用 `headers` 来获取一些服务端返回给前端的信息，比如 `token`。

仔细看上面的接口的同学可以发现 `Response includes Body;` 这样的标识。在前面我们说过 `Body` 由 `Request` 和 `Response` 实现。所以 `Body` 具有的方法，在 `Response` 实例中都可以使用，而这也是非常重要的一部分，我们通过 `Body`  提供的方法（这里准确来说是由 `Response` 实现的）对服务端返回的数据进行处理。

下面我们将通过一个示例来了解下简单用法：

#### 示例

示例代码位置：https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/views/response.html#L36

```js
// 客户端constheaders= new Headers({
'X-Token': 'fe9-token-from-frontend',
});
const request = new Request('/api/response', {
method: 'GET',
headers,
});

// 这里我们先发起一个请求试一试
fetch(request)
.then(response => {
  const { status, headers } = response;
  document.getElementById('status').innerHTML = `${status}`;
  document.getElementById('headers').innerHTML = headersToString(headers);

  return response.json();
})
.then(resData => {
  const { status, data } = resData;
  if (!status) {
    window.alert('发生了一个错误！');
    return;
  }
  document.getElementById('fetch').innerHTML = data;
});
```

这里我们先忽略 `fetch` 用法，后面的章节中会进行详细介绍。我们先关注第一个 `then` 方法回调里面的东西。可以看到返回了一个 `response` 对象，这个对象就是我们的 `Response` 的实例。示例中拿了 `status` 和 `headers` ，为了方便，这里我将其放到 html 中。再看看该回调中最后一行，我们调用了一个 `response.json()` 方法（这里后端返的数据是一个 `JSON` 对象，为了方便直接调用 `json()`），该方法返回一个 `Promise`，我们将处理结果返给最后一个 `then` 回调，这样就可以获得最终处理过后的数据。



打开浏览器，输入 http://127.0.0.1:4000/response，如果你的示例代运行正常，你将会看到以下页面：


![](https://cdn.nlark.com/yuque/0/2018/png/210399/1543758546072-840daa30-27cc-4f1f-8199-29a9876dc943.png)


（查看 Response 返回的数据）

## Fetch 与 XHR 比较

Fetch 相对 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来说具有简洁、易用、声明式、天生基于 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 等特点。[XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)  使用方式复杂，接口繁多，最重要的一点个人觉得是它的回调设计，对于实现 `try...catch` 比较繁琐。

但是 Fetch 也有它的不足，相对于 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)  来说，目前它具有以下劣势：

* 不能取消（虽然 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController) 能实现，但是目前兼容性基本不能使用，可以使用 [polyfill](https://github.com/mo/abortcontroller-polyfill) ）

* 不能获取进度

* 不能设置超时（可以通过简单的封装来模拟实现）

* 兼容性目前比较差（可以使用 [polyfill](https://github.com/github/fetch) 间接使用 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 来优雅降级，这里推荐使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch) ）

在了解 Fetch 和 [XHR](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 的一些不同后，还是需要根据自身的业务需求来选择合适的技术，因为技术没有永远的好坏，只有合不合适。

下面章节我们将介绍如何“优雅”的使用 Fetch 以及如何尽量避免掉劣势。



## 如何使用Fetch

前面了解了这么多基础知识，现在终于到了介绍如何使用 Fetch 了。老规矩，我们先来看下规范定义的接口。

```js
partial interface mixin WindowOrWorkerGlobalScope {
  [NewObject] Promise<Response> fetch(RequestInfo input, optional RequestInit init);
};
```

规范中定义的接口我们可以对应着 [MDN](https://developer.mozilla.org/) 进行查看，你可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowOrWorkerGlobalScope/fetch)更直观的看看它的用法。


从规范中我们可以看到 fetch 属于 [WindowOrWorkerGlobalScope](https://html.spec.whatwg.org/multipage/webappapis.html#windoworworkerglobalscope) 的一部分，暴露在 [Window](https://html.spec.whatwg.org/multipage/window-object.html#window) 或  [WorkerGlobalScope](https://html.spec.whatwg.org/multipage/workers.html#workerglobalscope) 对象上。所以在浏览器中，你可以直接调用 fetch。


规范中定义了 fetch 返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，它最多可接收两个参数（ input 和 init ）。为了能够对它的使用方法有个更全面的了解，下面来讲一下这两个参数。


* input 参数类型为 `RequestInfo`，我们可以回到前面的 `Request` 部分，来回顾一下它的定义。

    > typedef (Request or USVString) RequestInfo;

    发现它是一个 `Request` 对象或者是一个字符串，因此你可以传 `Request` 实例或者资源地址字符串，这里一般我们推荐使用字符串。

* init 参数类型为 `RequestInit`，我们回顾前面 `Requst` 部分，它是一个字典类型。在 `JavaScript` 中你需要传递一个 `Object` 对象。

    > dictionary RequestInit {  
    > ByteString method;  
    > HeadersInit headers;  
    > BodyInit? body;  
    > USVString referrer;  
    > ReferrerPolicy referrerPolicy;  
    > RequestMode mode;  
    > RequestCredentials credentials;  
    > RequestCache cache;  
    > RequestRedirect redirect;  
    > DOMString integrity;  
    > boolean keepalive;  
    > AbortSignal? signal;  
    > any window; // can only be set to null  
    > };



在本小节之前我们都没有介绍 fetch 的使用方式，但是在其他章节中或多或少出现过它的容貌。现在，我们终于可以在这里正式介绍它的使用方式了。

fetch 它返回一个 [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，意味着我们可以通过 `then` 来获取它的返回值，这样我们可以链式调用。如果配合 `async/await` 使用，我们的代码可读性会更高。下面我们先通过一个简单的示例来熟悉下它的使用。

#### 示例

示例代码位置：https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/views/index.html#L19

```js
// 客户端constheaders= new Headers({
    'X-Token': 'fe9',
  });

  setTimeout(() => {
    fetch('/data?name=fe', {
      method: 'GET', // 默认为 GET，不写也可以
      headers,
    })
      .then(response => response.json())
      .then(resData => {
        const { status, data } = resData;
        if (!status) {
          window.alert('发生了一个错误！');
          return;
        }
        document.getElementById('fetch').innerHTML = data;
      });
  }, 1000);
```

上面的示例中，我们自定义了一个 `headers` 。为了演示方便，这里我们设定了一个定时器。在请求成功时，服务器端会返回相应的数据，我们通过 `Response` 实例的 `json` 方法来解析数据。细心的同学会发现，这里 fetch 的第一个参数我们采用的是字符串，在第二个参数我们提供了一些 `RequestInit` 配置信息，这里我们指定了请求方法（method）和自定义请求头（headers）。当然你也可以传递一个 `Request` 实例对象，下面我们也给出一个示例。



代码位置：https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/views/index.html#L39

```js
constheaders=new Headers({
    'X-Token': 'fe9',
  });  
  const request = new Request('/api/request', {
    method: 'GET',
    headers,
  });

  setTimeout(() => {
    fetch(request)
      .then(res => res.json())
      .then(res => {
        const { status, data } = res;
        if (!status) {
          alert('服务器处理失败');
          return;
        }
        document.getElementById('fetch-req').innerHTML = data;
      });
  }, 1200);
```

在浏览器中打开：[http://127.0.0.1:4000/，](http://127.0.0.1:4000/%EF%BC%8C) 如果上面的示例运行成功，你将会看到如下界面：


![](https://cdn.nlark.com/yuque/0/2018/png/210399/1544368019579-97c144b3-d81f-4ac4-a1d9-e5e38f6f1ce0.png)
 

好，在运行完示例后，相信你应该对如何使用 fetch 有个基本的掌握。在上一章节，我们讲过 fetch 有一定的缺点，下面我们针对部分缺点来尝试着处理下。

#### 解决超时



当网络出现异常，请求可能已经超时，为了使我们的程序更健壮，提供一个较好的用户 体验，我们需要提供一个超时机制。然而，fetch 并不支持，这在上一小节中我们也聊到过。庆幸的是，我们有 [Promise ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，这使得我们有机可趁。我们可以通过自定义封装来达到支持超时机制。下面我们尝试封装下。

```js
constdefaultOptions= {
  headers: {
    'Content-Type': 'application/json',
  },
};
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = { ...defaultOptions.headers, ...options.headers };
    let abortId;
    let timeout = false;
    if (options.timeout) {
      abortId = setTimeout(() => {
        timeout = true;
        reject(new Error('timeout!'));
      }, options.timeout || 6000);
    }
    fetch(url, { ...defaultOptions, ...options, headers })
      .then((res) => {
        if (timeout) throw new Error('timeout!');
        return res;
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        clearTimeout(abortId);
        resolve(res);
      })
      .catch((e) => {
        clearTimeout(abortId);
        reject(e);
      });
  });
}
```

上面的代码中，我们需要注意下。就是我们手动根据超时时间来 `reject` 并不会阻止后续的请求，由于我们并没有关闭掉此次连接，属于是伪取消。fetch 中如果后续接受到服务器的响应，依然会继续处理后续的处理。所以这里我们在 fetch 的第一个 `then` 中进行了超时判断。



#### 取消

```js
constcontroller=new AbortController();
  const signal = controller.signal;

  fetch('/data?name=fe', {
    method: 'GET',
    signal,
  })
    .then(response => response.json())
    .then(resData => {
      const { status, data } = resData;
      if (!status) {
        window.alert('发生了一个错误！');
        return;
      }
      document.getElementById('fetch-str').innerHTML = data;
    });
  controller.abort();
```

我们回过头看下 fetch 的接口，发现有一个属性 `signal`, 类型为[AbortSignal](https://dom.spec.whatwg.org/#interface-AbortSignal)，表示一个信号对象（ signal object ），它允许你通过 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController) 对象与DOM请求进行通信并在需要时将其中止。你可以通过调用  [AbortController.abort](https://dom.spec.whatwg.org/#dom-abortcontroller-abort) 方法完成取消操作。


当我们需要取消时，fetch 会 reject 一个错误（ AbortError DOMException ），中断你的后续处理逻辑。具体可以看[规范中的解释](https://dom.spec.whatwg.org/#abortcontroller-api-integration)。


由于目前 [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController) [兼容性](https://caniuse.com/#search=AbortController)极差，基本不能使用，但是社区有人帮我们提供了 polyfill（这里我不提供链接，因为目前来说还不适合生产使用，会出现下面所述的问题），我们可以通过使用它来帮助我们提前感受新技术带来的快乐。但是你可能会在原生支持 `Fetch` 但是又不支持  [AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController) 的情况下，部分浏览器可能会报如下错误：

* Chrome: "Failed to execute 'fetch' on 'Window': member signal is not of type AbortSignal."

* Firefox: "'signal' member of RequestInit does not implement interface AbortSignal."


如果出现以上问题，我们也无能为力，可能原因是浏览器内部做了严格验证，对比发现我们提供的 `signal` 类型不对。

但是我们可以通过手动 `reject` 的方式达到取消，但是这种属于伪取消，实际上连接并没有关闭。我们可以通过自定义配置，例如在 `options` 中增加配置，暴露出 `reject`，这样我们就可以在外面来取消掉。这里本人暂时不提供代码。有兴趣的同学可以尝试一下，也可以在下面的评论区评论。

前面提到过的获取进度目前我们还无法实现。


### 拦截器

示例代码位置：https://github.com/GoDotDotDot/fe9-fetch-demo/blob/master/request.js

下面我们讲一讲如何做一个简单的拦截器，这里的拦截器指对响应做拦截。假设我们需要对接口返回的状态码进行解析，例如 403 或者 401 需要跳转到登录页面，200 正常放行，其他报错。由于 fetch 返回一个  [Promise ](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)，这就使得我们可以在后续的 `then` 中做些简单的拦截。我们看一下示例代码：

```js
functionparseJSON(response) {
  const { status } = response;
  if (status === 204 || status===205) {
    returnnull;
  }

  return response.json();
}

function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  // 权限不允许则跳转到登陆页面
  if (status === 403 || status === 401) {
    window ? (window.location = '/login.html') : null;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
/**
  * @description 默认配置
  * 设置请求头为json
  */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json',
  },
  // credentials: 'include', // 跨域传递cookie
};

/**
  * Requests a URL, returning a promise
  *
  * @param  {string} url       The URL we want to request
  * @param  {object} [options] The options we want to pass to "fetch"
  *
  * @return {object}           The response data
  */
function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const headers = { ...defaultOptions.headers, ...options.headers };
    let abortId;
    let timeout = false;
    if (options.timeout) {
      abortId = setTimeout(() => {
        timeout = true;
        reject(new Error('timeout!'));
      }, options.timeout || 6000);
    }
    fetch(url, { ...defaultOptions, ...options, headers })
      .then((res) => {
        if (timeout) throw new Error('timeout!');
        return res;
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        clearTimeout(abortId);
        resolve(res);
      })
      .catch((e) => {
        clearTimeout(abortId);
        reject(e);
      });
  });
}
```

从上面的 `checkStatus` 代码中我们可以看到，我们首先检查了状态码。当状态码为 403 或 401 时，我们将页面跳转到了 login 登录页面。细心的同学还会发现，我们多了一个处理方法就是 `parseJSON`，这里由于我们的后端统一返回 json 数据，为了方便，我们就直接统一处理了 json 数据。

## 总结

本系列文章整体阐述了 fetch 的基本概念、和 XHR 的差异、如何使用 fetch 以及我们常见的解决方案。希望同学们在读完整篇文章能够对 fetch 的认识有所加深。

**建议**：在整体了解了 fetch 之后，希望同学们能够读一下 [github polyfill](https://github.com/github/fetch) 源码。在读代码的同时，可以同时参考 [Fetch 规范](https://fetch.spec.whatwg.org/)。

参考：

1.  [MDN Fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API)

1.  [Fetch 规范](https://fetch.spec.whatwg.org/)

1.  [示例代码](https://github.com/GoDotDotDot/fe9-fetch-demo/)