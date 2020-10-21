# Vue 从源码学习之 JS 骚操作

> [原文](https://juejin.im/post/5c73554cf265da2de33f2a32)本文不准备解析Vue源码的运行原理，仅单纯探寻vue中工具函数中那些值得学习的骚操作

**终极目标：从工具函数中扩展知识点**

## 1. 当前环境的一系列判断

### 1.1`inBrowser`: 检测当前宿主环境是否是浏览器

```js
// 通过判断 `window` 对象是否存在即可
export const inBrowser = typeof window !== 'undefined'
```

### 1.2 `hasProto`:检查当前环境是否可以使用对象的 `__proto__` 属性

```js
// 一个对象的 __proto__ 属性指向了其构造函数的原型
// 从一个空的对象字面量开始沿着原型链逐级检查。
export const hasProto = '__proto__' in {}
```

## 2. `user Agent` 常量的一系列操作

### 2.1 获取当浏览器的`user Agent`

```js
// toLowerCase目的是 为了后续的各种环境检测
export const UA = inBrowser && window.navigator.userAgent.toLowerCase()
```

### 2.2 IE浏览器判断

`export const isIE = UA && /msie|trident/.test(UA)`

**解析：使用正则去匹配 UA 中是否包含`'msie'`或者`'trident'`这两个字符串即可判断是否为 IE 浏览器**

![](https://user-gold-cdn.xitu.io/2019/2/25/16922d0aaf599733?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


> 来源：[Internet Explorer User Agent Strings](https://link.juejin.im/?target=http%3A%2F%2Fuseragentstring.com%2Fpages%2Fuseragentstring.php%3Fname%3DInternet%2BExplorer)

> 多关键词高亮插件：[Multi-highlight](https://link.juejin.im/?target=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fmulti-highlight%2Fpfgfgjlejbbpfmcfjhdmikihihddeeji%2Frelated)

### 2.3 `IE9`| `Edge` | `Chrome` 判断

```js
export const isIE9 = UA && UA.indexOf('msie 9.0') > 0
export const isEdge = UA && UA.indexOf('edge/') > 0
export const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
```

## 3. 字符串操作

### 3.1 `isReserved`：检测字符串是否以 $ 或者 _ 开头

```js
// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码
export function isReserved (str: string): boolean {
  const c = (str + '').charCodeAt(0)
  return c === 0x24 || c === 0x5F
}
```

**解析：** 获得该字符串第一个字符的`unicode`，然后与 `0x24` 和 `0x5F` 作比较。

若作为一个想进阶中高级的前端，`charCodeAt`方法的各种妙用还是需要知道的（面试算法题各种考）。

#### 3.1.2 `Javascript`中级算法之`charCodeAt`

> 从传递进来的字母序列中找到缺失的字母并返回它。
> 如：fearNotLetter("abce") 应该返回 "d"。

```js
function fearNotLetter(str) {
  //将字符串转为ASCII码，并存入数组
  let arr=[];
  for(let i=0; i<str.length; i++){
    arr.push(str.charCodeAt(i));
  }
  for(let j=1; j<arr.length; j++){
    let num=arr[j]-arr[j-1];
    //判断后一项减前一项是否为1，若不为1，则缺失该字符的前一项
    if(num!=1){
      //将缺失字符ASCII转为字符并返回 
      return String.fromCharCode(arr[j]-1); 
    }
  }
  return undefined;
}
fearNotLetter("abce") // "d"
```

### 3.2 `camelize`: 连字符转驼峰

```js
const camelizeRE = /-(\w)/g
export const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})
```

**解析：** 定义正则表达式：`/-(\w)/g`，用来全局匹配字符串中 中横线及连字符后的一个字符。若捕获到，则将字符以`toUpperCase`大写替换，否则以`''`替换。
如：`camelize('aa-bb') // aaBb`

### 3.3 `toString`: 将给定变量的值转换为 string 类型并返回

```js
export function toString (val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}
```

**解析：** 在`Vue`中充斥着很多这类增强型的封装，大大减少了我们代码的复杂性。但这里，我们要学习的是这种`多重三元运算符`的用法

#### 3.3.1 多重三元运算符

```js
export function toString (val: any): string {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}
```

`解析：`

```js
export function toString (val: any): string {
  return 当变量值为 null 时
    ? 返回空字符串
    : 否则，判断当变量类型为 object时
      ? 返回 JSON.stringify(val, null, 2)
      : 否则 String(val)
}
```

类似的操作在vue源码里很多。比如`mergeHook`

#### 3.3.2 `mergeHook`: 合并生命周期选项

```js
function mergeHook (
  parentVal: ?Array<Function>,
  childVal: ?Function | ?Array<Function>
): ?Array<Function> {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}
```

这里我们不关心`mergeHook`在源码中是做什么的（其实是判断父子组件有无对应名字的生命周期钩子函数，然后将其通过 `concat`合并

### 3.4 `capitalize`:首字符大写

```js
// 忽略cached
export const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})
```

**解析：**`str.charAt(0)`获取`str`的第一项，利用`toUpperCase()`转换为大写字母，`str.slice(1)` 截取除第一项的`str`部分。

### 3.5 `hyphenate`:驼峰转连字符

```js
const hyphenateRE = /\B([A-Z])/g
export const hyphenate = cached((str: string): string => {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
})
```

**解析：** 与`camelize`相反。实现方式同样是使用正则，`/\B([A-Z])/g`用来全局匹配字符串中的大写字母, 然后替换掉。

## 4. 类型判断

### 4.1 `isPrimitive`: 判断变量是否为原型类型

```js
export function isPrimitive (value: any): boolean %checks {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}
```

**解析：** 这个很简单，但我们经常忽略掉`symbol`这个类型（虽然完全没用过）。

### 4.2 `isRegExp`: 判断变量是否为正则对象。

```js
// 使用 Object.prototype.toString 与 '[object RegExp]' 做全等对比。

export function isRegExp (v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}
```

这也是最准确的类型判断方法，在`Vue`中其它类型也是一样的判断

### 4.3 `isValidArrayIndex`: 判断变量是否含有效的数组索引

```js
export function isValidArrayIndex (val: any): boolean {
  const n = parseFloat(String(val))
  // n >= 0 && Math.floor(n) === n 保证了索引是一个大于等于 0 的整数
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}
```

`isFinite`方法检测它参数的数值。如果参数是`NaN`，正无穷大或者负无穷大，会返回`false`，其他返回`true`。

> 扩展：[语法：isFinite()](https://link.juejin.im/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FJavaScript%2FReference%2FGlobal_Objects%2FisFinite)
>
> ![](data:image/svg+xml;utf8,<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1280" height="563"></svg>)
> 
>
>

### 4.4 `isObject`: 区分对象和原始值

```js
export function isObject (obj: mixed): boolean %checks {
  return obj !== null && typeof obj === 'object'
}
```

## 5.Vue中的闭包骚操作

### 5.1  `makeMap()`：判断一个变量是否包含在传入字符串里

```js
export function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}
```

1.  定义一个对象`map`
2.  将 `str` 分隔成数组并保存到 `list` 变量中
3.  遍历`list`，并以`list`中的元素作为 `map` 的 `key`，将其设置为 `true`
4.  返回一个函数，并且如果`expectsLowerCase`为`true`的话，小写`map[key]`:

我们用一个例子来说明下：

```js
let isMyName = makeMap('前端劝退师,帅比',true); 
//设定一个检测是否为我的名字的方法，第二个参数不区分大小写
isMyName('前端劝退师')  // true
isMyName('帅比')  // true
isMyName('丑逼')  // false
```

`Vue`中类似的判断非常多，也很实用。

#### 5.1.1 `isHTMLTag` | `isSVG` | `isReservedAttr`

这三个函数是通过 `makeMap` 生成的，用来检测一个属性（标签）是否为保留属性（标签）

```js
export const isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
)
export const isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
)
// web平台的保留属性有 style 和 class
export const isReservedAttr = makeMap('style,class')
```

### 5.2 `once`:只调用一次的函数

```js
export function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
```

**解析：** 以`called`作为回调标识符。调用此函数时，`called`标示符改变，下次调用就无效了。也是典型的闭包调用。

### 5.3 `cache`:创建一个缓存函数

```js
/**
 * Create a cached version of a pure function.
 */
export function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}
```

**解析：** 这里的注释已把作用解释了。

`const cache = Object.create(null)`创建纯函数是为了防止变化`（纯函数的特性：输入不变则输出不变）`。

> 在Vue中，需要转译很多相同的字符串，若每次都重新执行转译，会造成很多不必要的开销。
> `cache`这个函数可以读取缓存，如果缓存中没有就存放到缓存中，最后再读。

## 6. 多类型的全等判断

### `looseEqual`: 检查两个值是否相等

```js
export function looseEqual (a: any, b: any): boolean {
  // 当 a === b 时，返回true
  if (a === b) return true
  // 否则进入isObject判断
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  // 判断是否都为Object类型
  if (isObjectA && isObjectB) {
    try {
      // 调用 Array.isArray() 方法，再次进行判断
      // isObject 不能区分是真数组还是对象（typeof）
      const isArrayA = Array.isArray(a)
      const isArrayB = Array.isArray(b)
      // 判断是否都为数组
      if (isArrayA && isArrayB) {
        // 对比a、bs数组的长度
        return a.length === b.length && a.every((e, i) => {
          // 调用 looseEqual 进入递归
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        // 均不为数组，获取a、b对象的key集合
        const keysA = Object.keys(a)
        const keysB = Object.keys(b)
        // 对比a、b对象的key集合长度
        return keysA.length === keysB.length && keysA.every(key => {
          //长度相等，则调用 looseEqual 进入递归
          return looseEqual(a[key], b[key])
        })
      } else {
        // 如果a、b中一个是数组，一个是对象，直接返回 false
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
```

这个函数比较长，建议配合注释食用。
总之，就是

**各种类型判断+递归**

![](https://user-gold-cdn.xitu.io/2019/2/25/16923f9e58db09a0?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

此篇就先讲讲Vue中的一些工具函数类的吧，Vue源码很多值得挖掘的玩法。走过路过，点个赞憋老哥。