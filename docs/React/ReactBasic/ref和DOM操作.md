# ref 和 DOM 操作

在上一篇我们了解到可以在 componentDidMount 或 componentDidUpdate 函数中通过ref属性来访问已经挂载的 DOM 节点或组件实例。ref 属性既可以在组件上使用,也可以在 DOM 节点上使用。

## ref的三种用法。

* 回调函数
* React.createRef()
* 字符串(已废弃)

## 回调函数用法

回调函数就是在 DOM 节点或组件上挂载函数，从而获取到 DOM 节点或组件实例。回调函数在组件被加载或卸载时会立即执行，加载时入参是 DOM 节点或组件实例，卸载时入参时 null。

1.  在 HTML 元素上设置 ref 属性

```js
classTextInputextendsReact.Component {
  focusTextInput = () => {
    // 通过this.textInput 访问DOM节点
    this.textInput.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={(textInput) => this.textInput = textInput} /> 
        <button onClick={this.focusTextInput}>focus</button>
      </div>
    );
  }
}
```

1.  在组件上设置 ref 属性，可以获取组件实例。

```js
classAutoFocusTextInputextendsReact.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 通过this.focusInput 获取改组件实例
    this.focusInput.focusTextInput();
  }

  render() {
    return (
      <TextInput ref={(focusInput) => this.focusInput = focusInput} />
    );
  }
}
```

1.  在组件传递回调形式的 refs,在父组件把 refs回调函数 inputRef 传递给子组件，子组件从 props 中取到相同的回调函数传递给 input。此时父组件中的 inputRef 取到的是 input 元素的 DOM 节点。 

```js
functionTextInput(props) {
  return (
    <div>
      <input ref={props.inputref} />
    </div>
  );
}

class AutoFocusInput extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // 通过this.focusInput 获取input元素的DOM节点
    this.focusInput.focus();
  }

  render() {
    return (
      <TextInput inputref={(focusInput) => this.focusInput = focusInput} />
    );
  }
}
```

## React.creatRef()用法

使用 React.createRef() 来创建Refs,并通过 ref 属性关联到具体的 DOM 节点。React 会在组件挂载时给 current 属性传入 DOM 元素，并在组件卸载时传入 null 值。最终通过 ref 的 current 属性来访问 DOM 节点。

1.在 HTML 元素上使用

```js
classTextInputextends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
  }

  focusTextInput = () => {
    // 通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.textInput}/>
        <button onClick={this.focusTextInput}>focus</button>
      </div>
    );
  }
}
```

2.在组件上使用时通过 ref 的 current 属性获取的是组件实例。(不能在函数组件上使用，因为它们没有实例)

```js
classAutoFocusInputextendsReact.Component {
  constructor(props) {
    super(props);
    this.focusInput = React.createRef();
  }

  componentDidMount() {
    // 通过 "current" 来访问组件实例
    this.focusInput.current.focusTextInput();
  }

  render() {
    return (
      <TextInput ref={this.focusInput} />
    );
  }
}
```

## 字符串用法(不推荐使用)

1.  在 HTML 元素上上设置ref属性,可以获取真实DOM节点

```js
<input type="text" ref='textInput' />      // this.refs.textInput访问DOM节点
```

2.  在组件上设置ref属性，可以获取组件实例

```js
<TextInput ref='focusInput' />     // this.refs.focusInput 访问该组件实例
```

> 官方提示：勿过度使用refs,避免使用 refs 来做任何可以通过声明式实现来完成的事情