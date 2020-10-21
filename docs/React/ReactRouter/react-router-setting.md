# React Router 相关配置

### `<BrowserRouter>`

`<BrowserRouter>`是基于 HTML5 history API 和 popstate 事件所封装的一个高阶组件，在不考虑过低版本（如 IE9 及以下，安卓4.1及以下等）兼容的情况下，可以说是本文优先推荐的组件。其基本属性如下：

#### basename: String

配置整个 webapp 的基准 URL，比如你的资源放在了服务器 /web 下面，那么可以统一配置 basename='/web'，此时访问home页面，实际 URL 为 '/web/home'

#### getUserConfirmation: func

导航前所要用的函数，默认是 window.confirm，目前很少用到此功能。

#### forceRefresh: bool

这个属性为true的时候，页面跳转时会强制刷新。一般在不支持HTML5 history API的时候可能会用到这个属性。

#### keyLength: number

location.key的长度，默认是6。location.key是随着页面不断变化的，详情可以见下文对location对象的介绍。

#### children: node

渲染子元素。这个实际就是 react 组件的一个特性了，而不是 BrowserRouter 这个组件独有的特性。

下面是关于 `<BrowserRouter>` 组件的示例代码，可以复制到前文 [React Router 简介](https://www.yuque.com/fe9/basic/kng36q) 中的代码事例中尝试一下，也可以参考完整版 [demo](https://github.com/objlong/react-router-demo/tree/master/demo2)[2](https://github.com/objlong/react-router-demo/tree/master/demo2)。

```js
// 导航前的函数constgetConfirmation= (message, callback) => {
constallowTransition = window.confirm(message)
  callback(allowTransition)
}
// 判断是否支持 HTML5 history API
const supportsHistory = !('pushState' in window.history)
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter
            basename='/web'
            getUserConfirmation={getConfirmation('hello world', () => {console.log('success')})}
            forceRefresh={supportsHistory} // false: 不刷新 true: 刷新
            keyLength={12} // location.key长度为12
        >
          <Switch> 
            <Route component={Nav} path='/' exact /> // 实际路径 /web
            <Route component={Home} path='/home' /> // 实际路径 /web/home
            <Route component={Content} path='/content' /> // 实际路径 /web/page
            <Route component={Log} path='/log' />  // 实际路径 /web/log
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
```

### `<HashRouter>`

`<HashRouter>`是基于 window.location.hash 和 hashchange 事件所封装的路由组件。其特点是兼容性较好。但是不支持 location.key 和location.state，也不支持 forceRefresh，keyLength。其 **basename**、**getUserConfirmation** 和 **children** 的使用方法与 `<BrowserRouter>` 一致，接下来描述其独有属性：

#### hashType: string

用于window.location.hash 的编码类型。

* "slash" - 创建的url为 #/ 或者 #/web/home

* "noslash" - 创建的url为 # 或者 #web/home

* "hashbang" - 创建的url为 #!/ 或者 #!/web/home

`<HashRouter>` 与 `<BrowserRouter>`用法类似，故不再做 demo。

#### `<Link>`

`<Link>` 是一种声明式的导航组件。用法比较简单。

#### to: string

参数为字符串时，直接跳转到指定路径。

#### to:object

参数为对象时，可以传递以下字段：

* pathname: 页面路径

* search: 页面 url 参数（window.location.search）

* hash: 页面 hash（window.location.hash）

* state: 隐性传递的一些参数

传递的字段可以在相应页面组件的props.location中取得。如 [demo3](https://github.com/objlong/react-router-demo/tree/master/demo3) 中 /src/containers/Nav/Nav.js进入内容页的导航：

```js
// demo3中 /src/containers/Nav/Nav.js 进入内容页的导航<Link to={
  {
    path: '/content',
    search: 'hello',
    hash: 'world',
    state: {
      name: '测试员1'
    }
  }
}>
```

而对应的 /src/containers/Content/Content.js 内容页对其渲染：

```js
render() {
  return (
    <div>
      <Nav />
      <div className='content'>我是{this.props.location.state.name}，我的search为：{this.props.location.search}，我的hash为：{this.props.location.hash}</div>
    </div>
  )
}
```

最终渲染结果为：**我是测试员1，我的search为：?hello，我的hash为：#world**

#### replace: bool

如果跳转的下一个页面 replace 为 true，当页面回退的时候，会回退到上一个页面，而不是当前页。比如你从 '/' 跳转至 '/content' 页面，又从 '/content' 页面跳转至 '/log'， 导航至 '/log' 页面的Link为：

```js
<Link to='/log' replace />
```

此时点击浏览器回退，会直接回退至'/'页面。

#### innerRef: function

此属性可以获取真实的 DOM 节点。如：

```js
constrefCallback= node => {
  // node在未渲染的时候是null，在渲染的时候是真实dom
  console.log(node)
}
...
<Link to='/other' innerRef={refCallback} />
```

`<Link>` 组件的具体示例，可以查看 [demo3](https://github.com/objlong/react-router-demo/tree/master/demo3)。

### `<Route>`

`<Route>` 组件可以说是一个非常重要的组件了，它的主要功能是当访问的地址与 Route 上的路径匹配时，渲染出对应的 UI 页面。因此，你应该熟练地去学习并理解它。

例如以下示例代码：

```js
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/content" component={Content}/>
  </div>
</Router>
```

当你访问 URL: / 的时候，就显示home页面，类似于：

```js
<div>
  <Home />
</div>
```

而当你访问 URL: /content的时候，则渲染出 content 页面，类似于：

```js
<div>
  <Content />
</div>
```

#### 三种渲染方法

`<Route>` 组件提供了三种渲染方法供你使用，分别是：

* `<Route component>` 通过传入组件渲染，渲染时会调用 React.createElement 来生成 React 元素，适用于**大部分**场景。

* `<Route render>` 通过传入对应的 render 函数渲染，render 函数需要返回一个 React 元素。

* `<Route children>` 与 render 类似，也是传入需要返回一个 React 元素的函数，区别是不管路径是否匹配，传入的 children 都会渲染。

_注意：三种方法不要在同一个 `<Route>` 组件内使用。_

三种渲染方法都会传入以下三个参数：

* match

* location

* history

#### component

访问地址与路由匹配时，一个组件才会被渲染，此时这个组件接受 route props(match, location, history)。

当使用 component 时，router 将通过 React.createElement 去根据给定的 component 创建一个新的 react 元素。这意味你如果给 component 一个内联函数（inline function），那么每次渲染的时候都会生成一个新的组件，这会导致已经生成的组件不会挂载（unmounting），而是又重新挂载（mounting）了一个新组件。而我们想要的结果，却是去更新那个已经存在的组件。因此当你想要使用内联函数进行行内渲染（inline render）的时候，推荐使用 render 或者 children。

```js
constLog = ({match, location, history}) => (
  <div>我是日志</div>
)
<Route component={Log} path='/log' />
```

#### render: func

render允许内联渲染和二次封装，而不会出现上文中的重复挂载问题。其间传递的参数是一样的。

```js
// 内联渲染
<Route path="/home"render={() => <div>Home</div>}/>

// 二次封装一个fadeIn路由
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <FadeIn>
      <Component {...props}/>
    </FadeIn>
  )}/>
)

<FadingRoute path="/cool" component={Something}/>
```

#### children: func

有时候你只是想改变下其他东西，比如一个导航改变下选中态，而不是重新渲染页面，此时可以选择用 children。

```js
<ul>
  <ListItemLink to="/somewhere" />
  <ListItemLink to="/somewhere-else" />
</ul>;

// 改变样式
const ListItemLink = ({ to, ...rest }) => (
  <Route
    path={to}
    children={({ match }) => (
      <li className={match ? "active" : ""}>
        <Link to={to} {...rest} />
      </li>
    )}
  />
);

// Animate动画组件总是被重新渲染，保证动画的执行。
<Route children={({ match, ...rest }) => (
  <Animate>
    {match && <Something {...rest}/>}
  </Animate>
)}/>
```

关于component，render，children 的示例代码可以看 [demo3](https://github.com/objlong/react-router-demo/tree/master/demo3) 下的 [/src/App.js](https://github.com/objlong/react-router-demo/blob/master/demo3/src/App.js)。

#### path: string | string[]

任何可以被 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 解析的 URL。

注：如果没写 path 参数且不在 `<switch>` 里面将会被全部匹配。

#### exact: bool

当 exact 为 true 的时候，路由需要准确地匹配，如“/one”无法匹配“/one/two”。反之亦然。

#### strict: bool 

当 strict 为 true 的时候，路由后面的斜杠将被严格匹配，如“/one/”无法匹配“/one”，但是可以匹配“/one/”或者“/one/two”。反之亦然。

#### sensitive: bool

当 sensitive 为 true 的时候，会对大小写敏感，如“/One”无法匹配“/one”。反之亦然。

因此，当你想要严格匹配你的路由的时候，需要把 exact 和 strict 还有 sensitive 都设置为 true。

#### `<Switch>`

用 `<Switch>` 组件包裹 `<Route>` 和 `<Redirect>` 组件，将会它们中渲染第一个匹配的。

例如：

```js
{// 导航放在外面，所有页面都会渲染}
<Route component={Nav} />
<Switch> 
  {// 放在里面的只会渲染一个}
  <Route component={Home} path='/' exact /> 
  <Route component={Content} path='/content' />
  <Route component={Log} path='/log' /> 
  <Route component={Other} path='/other' />
  <Route render={() => {
    return (
      <div>我是render</div>
      )
  }} path='/:render' />
</Switch>
```

当你访问 “/content” 的时候，若没有 `<Switch>` 则“/:render”页面也会被渲染，而加上它，则不会被渲染了。至于为什么要有此类设计，因为很多元素像是导航之类的，是所有页面共有的，则可以放在 `<Switch>` 外面匹配所有。关于它的示例代码在 [demo3](https://github.com/objlong/react-router-demo/tree/master/demo3)。

#### `<NavLink>`

`<Link>` 组件的特殊版本，说白了就是导航。

#### activeClassName: string

激活态下的 class 名，默认是 activite。

#### activeStyle: object

激活状态下的样式。

#### exact: bool

若为true，则严格匹配路由，类似 `<Route>` 的exact属性。

#### strict: bool

若为true，则严格匹配“/”，类似 `<Route>` 的strict属性

#### isActive: func

此属性可以添加额外的逻辑来确定路由是否激活，如果除了验证链接与当前 URL 匹配之外，还想执行更多操作，则可以使用这个属性。

#### `<Redirect>`

使用 `<Redirect>` 组件，将会重定向到一个新的地址，并且新地址覆盖现有地址在访问历史里的记录，就是说无法回退至现有地址。例如我们可以用这个组件来做登录跳转：

```js
{// isLogn 为 false 的时候，直接触发跳转登录页}
<Route path='/' render={() => (
  isLogin 
  ? 
  (<Home />)
  :
  (<Redirect to='/login' />)
)} exact />
```

#### to: string | object

重定向的地址，可以被 [path-to-regexp](https://github.com/pillarjs/path-to-regexp) 解析。

#### push: bool

若为 true，将会把地址推入历史记录中，而不是替换现有地址。

#### from: string

需要匹配的现有地址。官方建议放在 `<Switch>` 里面使用，保证匹配的唯一性。

#### exact: bool，strict: bool

与 `<Route>` 的相关属性类似。

### `<Prompt>`

`<Prompt>`组件用于在离开页面时，做一些提示。

#### message: string | func

离开页面时需要提示的一些信息。

#### when: bool

离开页面时是否要提示。

### React Router 三大参数对象

从上文可以看到，在很多地方都提及了 React Router 的三个参数对象：history，location，match，这三个对象可以在运行 demo 的时候打印下来看一下，下面将详细介绍这三个对象的作用和用法。

### history

[history](https://github.com/ReactTraining/history) 是 React Router 的两大重要依赖（另一个是 React）之一，它在不同的 js 环境中都实现了对会话历史的管理。

如今有以下几种方式会被用到：

* "browser history" ——用于支持 history HTML5 API 的浏览器，需要有 DOM 支持。

* "hash history"——用于旧版的浏览器，也需要有DOM支持。

* "memory history"——内存中历史记录的实现，通常用于无DOM环境，比如测试环境，或者 React Native 等。

history 对象通常有以下几种属性和方法：

* length - (number) 浏览历史堆栈中的数量

* action - (string) 跳转到当前页面执行的动作（PUSH，REPLACE 或者 POP）

* location - (object) 当前页面的 location 对象

* location.pathname - (string) URL路径

* location.search - (string) URL的字符参数

* location.hash - (string) URL中的hash

* location.state - (object) 例如在执行 push(path, state) 操作时，state会被记录到历史记录堆栈中。只适用于browser history 和 memory history

* push(path, [ state ]) - (function) 在历史堆栈中加入新的条目

* replace(path, [ state ]) - (function) 替换历史堆栈中当前的条目

* go(n) - (function) 历史堆栈中的指针向前移动n，页面发生前进操作

* goBack() - (function) 相当于go(-1)，返回上一页

* goForward() - (function) 相当于go(1)，前进一页

* block(prompt) - (function) 阻止跳转

```js
{
  action: "PUSH",
  block: ƒ block(),
  createHref: ƒ createHref(location),
  go: ƒ go(n),
  goBack: ƒ goBack(),
  goForward: ƒ goForward(),
  length: 5,
  listen: ƒ listen(listener),
  location:
  {
    hash: "#world",
    key: "7ickpi3i926",
    pathname: "/content",
    search: "?hello",
    state: {name: "测试员1"}
  },
  push: ƒ push(path, state),
  replace: ƒ replace(path, state)
}
```

**history 是易变的**

history 是易变的，因此当你需要 location 对象时，要去直接取 location 参数，比如 `<Route>` 中，而不去拿 history.location 来用。引用官方示例：

```js
classCompextendsReact.Component {
  componentDidUpdate(prevProps) {
    // 结果为 true
    const locationChanged = this.props.location !== prevProps.location;

    // 通常结果都为 false 就因为 history 的可变性
    const locationChanged =
      this.props.history.location !== prevProps.history.location;
  }
}

<Route component={Comp} />;
```

### location

location 为你展示了当前页面从哪儿来，到哪里去，以及现在是什么状态。它主要有以下几个属性：

* key - (string) 随机字符串，作为 location 的id，HashHistory 没有这个属性

* pathname - (string) 当前页面 URL

* search - (string) 当前 URL 的字符串参数

* hash - (string) 当前 URL 的 hash

* state - (object) 你要传递的 state 参数

```js
{
  key: 'ac3df4', // HashHistory 没有！
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```

location 通常会在下面场景中出现：

* Route component - this.props.location

* Route render - ({ location }) => ()

* Route children - ({ location }) => ()

* withRouter - this.props.location

history.location 也算是 location 的一种应用场景但是不要用它，因为 history 是可变的。

location 对象是在生命周期内，是不变的。因此你可以通过 location 来确定页面 URL 的改变，在动画以及拉取数据时常会用到。

```js
componentWillReceiveProps(nextProps) {
  if (nextProps.location !== this.props.location) {
    // 组件更新过程中 location 改变了，证明页面URL发生了变化
  }
}
```

location 通常可以在以下情景中使用：

* web 端的 Link 类组件

* React Native 端的 Link 类组件

* `<Redirect to={location} />`

* history.push(location)

* history.replace(location)

location 可以让你不再只是根据 URL 的字符串来做一些逻辑，可以通过它的 state 等属性，来更轻松地完成你的逻辑。

### match

match对象里面存储了 `<Route path>` 与 URL 匹配的信息，主要包含：

* params - (object)  URL 动态匹配的参数，如 URL 为 "/user/:name"，你访问 "/user/chenxin"，params为：{ name: 'chenxin' }

* isExact - (boolean) URL是否是严格匹配

* path - (string) 用来创建嵌套的 `<Route>` 的匹配字段

* url - (string) 用来创建嵌套的 `<Link>` 的匹配字段

```js
{
  isExact: true,
  params: { name: "chenxin" },
  path: "/user/:name",
  url: "/user/chenxin"
}
```

match通常在以下场景中使用：

* Route component 中 this.props.match

* <Route render={ ({ match }) => () }/>

* <Route children={ ({ match }) => () }/>

* widthRouter 中 this.props.match

* matchPath 的返回值

如上，是关于 React Router 在 web 端开发中，一些常见配置项的介绍。

_参考文献：_[React Router 官方文档](https://reacttraining.com/react-router/web/guides/quick-start)