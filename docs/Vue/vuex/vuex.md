# Vuex 简介

### 前言

### Vuex 是什么？

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

> [阅读 vuex 源码的思维导图](https://sailor-1256168624.cos.ap-chengdu.myqcloud.com/blog/vuex.png)

![](https://cdn.nlark.com/yuque/0/2019/png/197530/1552477197680-20e263ac-7c42-407a-9b29-8b5ebb4187f4.png?x-oss-process=image/resize,w_1458)

[vuex 的文档](https://vuex.vuejs.org/zh/) 对辅助看源码有不小的帮助，不妨在看源码之前仔细地撸一遍文档。

### 带着问题去看源码

* global event bus 有何缺陷
* $store 如何注入到所有子组件
* mapState 实现
* mapGetter 如何映射
* Mutation 同步 && Action 异步
* dispatch 方法实现
* module 分割实现 && 局部状态 namespaced
* 如何调用 vue-devtools
* 内置 logger 插件实现
* hotUpdate
* 时间穿梭功能实现

### 目录

```js
├── src
│   ├── helpers.js                  辅助函数
│   ├── index.esm.js
│   ├── index.js                    入口
│   ├── mixin.js                    混入 vuexInit
│   ├── module                      class module
│   │   ├── module-collection.js
│   │   └── module.js
│   ├── plugins                     插件
│   │   ├── devtool.js
│   │   └── logger.js
│   ├── store.js                    store install
│   └── util.js                     工具函数
```

### 入口文件

vuex 的入口文件在 src/index.js

```js
import { Store, install } from './store'
import {
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
} from './helpers'
export default {
  Store,
  install,
  version: '__VERSION__',
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers
}
```

index.js 引入了 Store 、install 和一些辅助工具函数，并将引入的变量组装成一个对象向外暴露。

当我们在项目中引入 import Vuex from 'vuex' 的之后， Vuex 就是这个组装后默认导出的对象了。

当然我们也可以通过解构的方式：

```js
import { Store, install } from 'vuex'
```

### install 方法

来看一下 install 方法，在 src/store.js 。

```js
exportfunction install(_Vue) {
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  // vuexInit
  applyMixin(Vue)
}
```

install 方法首先判断变量 Vue (store.js 顶部申明的变量) 是否与传入 _Vue 全等，如果全等并且在非生产环境，抛出异常。

随后将传入的 _Vue 赋值给 Vue，这里主要是为了避免重复安装。

然后调用引入的 applyMixin 方法，并将 Vue 作为参数传入。

applyMixin 在 src/mixin.js 作为默认方法导出：

```js
exportdefaultfunction(Vue) {
  constversion=Number(Vue.version.split('.')[0])
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function(options = {}) {
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit
      _init.call(this, options)
    }
  }
  /**
   \* Vuex init hook, injected into each instances init hooks list.
   \*/
  function vuexInit() {
    const options = this.$options
    if (options.store) {
      this.$store =
        typeof options.store === 'function' ? options.store() : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

在这个默认导出的函数中，首先会取出传入参数 Vue 的 静态属性 version，根据 version 版本做不同的处理。

2.0 采用 mixin 将 vuexInit 合并到 beforeCreate 生命周期钩子。

1.0 重写 _init 方法 将 vuexInit 合并到 _init 方法中。

2 中处理都调用了 vuexInit，我们来看看 vuexInit：

```js
/** \* Vuex init hook, injected into each instances init hooks list. \*/function vuexInit() {
  const options = this.$options
  if (options.store) {
    this.$store =
      typeof options.store === 'function' ? options.store() : options.store
  } else if (options.parent && options.parent.$store) {
    this.$store = options.parent.$store
  }
}
```

在 vuexInit 方法中，首先判断 options.store，如果为真说明是 root 节点，并且一个三元表达式赋值给 this.$store，如果 store 是 function 就执行将函数返回值赋值给 this.$store ，否则将 options.store 直接赋值。

接着进入 else if，判断如果有父节点，并且父节点有 $store, 就将父节点的 $store 赋值给 this.$store ，所有的 this.$store 指向了同一个对象，这样就保证只有一个全局的 $store 变量。