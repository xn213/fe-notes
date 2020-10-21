# JSX 基本语法(使用 JSX 描述 UI 信息)

## JSX 前言

你一定听说过一句话：_React 中一切皆为组件_。  
在这之前，我们通过直接写 `HTML` 描述渲染内容，现在在 React 中，我们通过写 `JSX` 来描述渲染内容。

### 基本语法

我们写一个组件

```js
constList = () => (
  <ul>
    <li>小胖子1</li>
    <li>小胖子2</li>
    <li>小胖子3</li>
  </ul>
);
```

我们写了一个箭头函数，与以往不同的是，箭头函数返回一段 JSX。现在我们就可以把 List 称作一个 React 组件。

注意：

* 返回的 JSX 必须由一个标签包裹(React 16 引入了[Fragment](https://reactjs.org/docs/fragments.html)，此处不再拓展)。例如 `const List = () => <div>test</div><div>test</div>`就会报错

* 标签必须闭合。

* 组件名首字母大写，用于区分 DOM 元素与组件元素。

### 使用表达式

我们说`JSX` 看起来像 `HTML`，却比 `HTML` 灵活，归功于可以在 `JSX` 内插入 JavaScript 表达式(表达式使用 `{}` 包裹)。

```js
constApp = () => {
  const color = 'blue';
  return (
    <div>{color}</div>
  );
};
```

当然不仅是变量，`{}` 内可以放任何 JavaScript 表达式，例如：

```js
constApp = () => {
  const color = 'blue';
  return (
    <div>
      <div>{color}</div>
      <div>{1 + 1}</div>
      <div>{new Date().getTime()}</div>
      <div>{(() => 'react')()}</div>
    </div>
  );
};
```

### 元素属性

除了标签的内容可以用表达式，标签的属性同样可以使用表达式，但是有两个例外 —— class 和 for，因为这两个属性均为 JavaScript 的关键词，我们可以这样转换：

* class 改为 className

* for 改为 htmlFor

例如：

```js
constApp = () => {
  const color = 'blue';
  return (
    <div className={color}>hello</div>
  );
};
```

#### Boolean 属性

一些常用的属性例如 disabled checked 等，我们可以省略值来表示为 true。  
`<input disabled />` 就等同于 `<input disabled={true} />`

#### 使用 ES6 rest

我们可以直接将一个 JavaScript 对象里的属性作为元素的属性合并，使用 ES6 的 rest 特性。

```js
constApp = () => {
  const props = {
    className: 'app',
    id: 'app',
    'data-root': 'root',
  };
  return (
    <div {...props}>hello</div>
  );
};
```

渲染的 DOM ：  

_
![](https://i.loli.net/2018/12/11/5c0fa401e0384.png)

### 最后

我们已经了解了 JSX 的灵活特性，接下来我们将使用 JSX 创建组件并加以使用，了解 React 的强大之处。



## 使用 JSX 描述 UI 信息

### 一个 React 组件

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <span>Hello, World.</span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
```

这是一个非常简单的 React 组件，`App` 组件继承了 `Component`,而它的 `render` 方法返回了一个“`HTML`”，这个方法看起来就像一段“`HTML`”嵌入在 JavaScript 代码内部。很显然，这段代码直接在浏览器环境下是无法运行的，这并不是一段正常的 JavaScript 代码。


它就是 `JSX`

### 什么是 JSX


`JSX` 是一种类似 `XML` 语法的语法扩展，可以被编译成“合法”的 JavaScript 代码。

那么如何用一段“合法”的 JavaScript 代码来描述这段 `JSX` 呢？

那么让我们把一个 DOM 抽象成一个 JavaScript 对象，用对象的属性来描述这个 DOM 的结构，比如标签名、属性、子 DOM 等等。

我们尝试用 JavaScript 对象来描述第一个例子中的 `JSX`。


```js
{
  tag: 'div',
  attrs: {
    className: 'App',
  },
  children: [
    {
      tag: 'span',
      text: 'Hello, World.'
    }
  ]
}
```

那么我们第一个例子中的代码，在编译后就会变成这样一段“合法”的 JavaScript 代码。

```js
importReact, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render() {
    return (
      React.createElement(
        'div',
        { className: 'App' },
        React.createElement(
          'span',
          null,
          'Hello, World.'
        )
      )
    );
  }
}

ReactDOM.render(React.createElement(App), document.getElementById('root'))
```


`createElement` 这个函数会将入参进行处理，最终返回一个以 JavaScript 对象为基础的结构描述我们最终想要得到的 `DOM` 对象。最终，通过 `ReactDOM.render` 方法，将所得到的 JavaScript 对象转换成真正的 `DOM`。



### [](https://www.yuque.com/fe9/basic/se6xlv#9415a826)[](https://www.yuque.com/fe9/basic/se6xlv#8gmbms)最后


到此，我们知道了，我们所写的 `JSX`，其实最终都会被编译成为 JavaScript 对象，正是因为这层的抽象，所以使跨平台成为了可能，对于所有拥有 JavaScript 运行环境的平台，我们都可以执行它。  
此外，因为将它抽象成了 JavaScript 对象，所以我们也可以更方便地进行 diff/patch（React中的比对算法，用于比对后更新`DOM`结构）。而不是当数据产生变化的时候，我们直接去比对处理 `DOM`，这也很大程度上优化了它的性能。
