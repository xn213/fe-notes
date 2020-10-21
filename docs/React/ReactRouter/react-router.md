# React Router 简介

### 前言

前端路由是一款 SPA 应用的核心概念之一，它通过监听 url 的改变，在不重载应用的情况下，渲染出不同的页面，目前主流的两种路由分别是：

1.  利用 hashchange 事件来监听 url 的 hash 变化，其兼容性较好。

2.  调用 history 的 H5 API（pushState, replaceState等）能够在不刷新页面的情况下改变 url，利用 popstate 事件可以监听到这种改变，兼容性略差，但是url风格可以与服务端基本保持一致，且可以隐性的传参，目前比较推荐用此类路由。具体原理可以参考相关文档。

[React Router](https://github.com/ReactTraining/react-router) 是 react 官方推荐的一款路由库。它遵循 react 万物皆组件的理念，声明式（你不需要知道它怎么做，而只需要告诉它怎么做）地控制路由跳转并渲染出指定的页面，而不需要去重载整个应用。

### React Router 简介

目前 React Router 已经更新至V4.x版本，本文也主要围绕此版本来做相关介绍，其他版本可参考官方文档：

* [React Router V2.x](https://github.com/ReactTraining/react-router/tree/v2.8.1/docs)

* [React Router V3.x](https://github.com/ReactTraining/react-router/tree/v3/docs)

React Router V4.x较之前版本做了较大的改动，其按单代码仓库模型（monorepo）来进行代码规划，打开它的 [github](https://github.com/ReactTraining/react-router) 查看其 packages 目录，可以发现React Router分为以下几个独立的部分：

* 核心部分 react-router

* 绑定了 DOM 操作的 react-router-dom（常用于 web 应用）

* 用在 React Native 上的 react-router-native（用于 native App）

* 用于配置静态路由的 react-router-config

monorepo 的好处就是，你只需要按照自己的需求，用 npm 安装这四个中的一个即可。本文大部分示例使用的都是 react-router-dom，它与 react-router 的区别是多了很多 DOM 类组件（如 `<Link>` `<BrowserRouter>` 等）。

### 安装与使用

你可以使用 react 官方提供的脚手架 create-react-app 来快速启动一个 react 应用，并且安装 react-router，我们这里是构建 webapp，所以使用的 react-router-dom。

```
\# 全局安装create-react-app脚手架npm install -g create-react-app
\# 建立一个react项目
create-react-app react-router-demo
\# 进入项目目录
cd react-router-demo
\# 安装react-router-dom
npm install --save react-router-dom
```

然后打开 ./src/App.js，修改其中代码为：

```js
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
/* 
 * 此处定义的组件，应为业务逻辑中的容器（smart）组件；
 * 可以通过如import Home from './containers/Home/Home'来引入；
 * 为了快速展示demo，故简单定义了一下。
 */
const Home = () => (
  <div>我是主页</div>
)
const Content = () => (
  <div>我是内容</div>
)
const Log = () => (
  <div>我是日志</div>
)
const Nav = () => (
  <div>
    <Link to='/home'>
    主页
    </Link>
    <Link to='/content'>
    内容
    </Link>
    <Link to='/log'>
    日志
    </Link>
  </div>
)
class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch> 
            <Route component={Nav} path='/' exact />
            <Route component={Home} path='/home' />
            <Route component={Content} path='/content' />
            <Route component={Log} path='/log' />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
```

至此，一个简单的 demo 就生成了。具体代码可以查看 [demo1](https://github.com/objlong/react-router-demo/tree/master/demo1)。