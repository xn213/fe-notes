# Vue 从源码学习之 Vue选项Props

### 正文：吃下这条鱼 - `props`初始化

`initProps` 是如何运行的：

![](https://user-gold-cdn.xitu.io/2019/3/13/16976d623365cad7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 1.`normalizeProps`: `initProps` 之前的规范化数据

`normalizeProps`的代码有点长，这里只列举经过规范化后的`prop`类型和结果

### 1.1 字符串

```js
props: ["data"]
// 规范化后
props: {
  data:{
    type: null
  }
}
```

### 1.2 对象

```js
props: {
  data1: {
    type: String,
    default: ''
  }
  data2: Number,
}
// 规范化后
props: {
  data1: {
    type: String,
    default: ''
  },
  data2: {
    type: Number
  },
}
```

### 2.`initProps`: 处理`props`

![](https://user-gold-cdn.xitu.io/2019/3/14/16977ffc8d0638c2?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

**源码分析如下：**

```js
function initProps (vm: Component, propsOptions: Object) {
  const propsData = vm.$options.propsData || {}
  const props = vm._props = {}
  const keys = vm.$options._propKeys = []
  const isRoot = !vm.$parent
  if (!isRoot) {
    toggleObserving(false)
  }
  for (const key in propsOptions) {
    keys.push(key)
    const value = validateProp(key, propsOptions, propsData, vm)
    if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop direct....`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
    if (!(key in vm)) {
      proxy(vm, `_props`, key)
    }
  }
  toggleObserving(true)
}
```

### 2.1 常量定义

```js
const propsData = vm.$options.propsData || {}
 const props = vm._props = {}
 const keys = vm.$options._propKeys = []
 const isRoot = !vm.$parent
```

* `propsData`: 存储着传递进来的 `props` 的值
* `props: 引用`vm._props`，并初始化为{}
* `keys`: 在 `vm.$options` 上添加 `_propKeys` 属性
* `isRoot`: 判断是否存在`vm.$parent`,若无则为根节点

### 2.2 条件判断及循环

```js
if (!isRoot) {
  toggleObserving(false)
}
for (const key in propsOptions) {
  // 省略...
}
toggleObserving(true)
```

* `!isRoot`：若当前实例非根节点，关闭`toggleObserving`
* `toggleObserving`: 可以理解为数据观测的开关
* `for...in` : 遍历`propsOptions`

### 2.2.1: 遍历`propsOptions`做什么

```js
for (const key in propsOptions) {
  keys.push(key)
  const value = validateProp(key, propsOptions, propsData, vm)
  if (process.env.NODE_ENV !== 'production') {
      const hyphenatedKey = hyphenate(key)
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
          vm
        )
      }
      defineReactive(props, key, value, () => {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            `Avoid mutating a prop directly since the value will be ` +
            `overwri  tten whenever the parent component re-renders. ` +
            `Instead, use a data or computed property based on the prop's ` +
            `value. Prop being mutated: "${key}"`,
            vm
          )
        }
      })
    } else {
      defineReactive(props, key, value)
    }
}
```

**划重点：**

* `propsOptions` 即`opts.props`
* `key` 就是每个 `prop` 的名字

**此时进入循环：**

```js
keys.push(key)
const value = validateProp(key, propsOptions, propsData, vm)
```

* 将 `key` 添加到 `vm.$options._propKeys`
* `value`: 用`validateProp`校验是否为预期的类型值，然后返回相应 prop 值(或default值)

### 2.2.2: 接着进入 `if...else`:

这里注释一下：

```js
if (process.env.NODE_ENV !== 'production') {
  // 驼峰转连字符
  const hyphenatedKey = hyphenate(key)
  // 校验prop是否为内置的属性
  // 内置属性：key,ref,slot,slot-scope,is
  if (isReservedAttribute(hyphenatedKey) ||
      config.isReservedAttr(hyphenatedKey)) {
    warn(
      `"${hyphenatedKey}" is a reserved attribute and cannot be used as component prop.`,
      vm
    )
  }
  defineReactive(props, key, value, () => {
    // 子组件直接修改属性时 弹出警告
    if (!isRoot && !isUpdatingChildComponent) {
      warn(
        `Avoid mutating a prop directly since the value will be ` +
        `overwri  tten whenever the parent component re-renders. ` +
        `Instead, use a data or computed property based on the prop's ` +
        `value. Prop being mutated: "${key}"`,
        vm
      )
    }
  })
} else {
  defineReactive(props, key, value)
}
```

**最后简化：**

```js
if (process.env.NODE_ENV !== 'production') {
  // 驼峰转连字符
  // 校验prop是否为内置的属性
  // 内置属性：key,ref,slot,slot-scope,is
  // 若是内置，弹出警告
  defineReactive(props, key, value, () => {
  // 子组件直接修改属性时 弹出警告
} else {
  defineReactive(props, key, value)
}
```

> 工具函数：
> [「从源码中学习」Vue源码中的JS骚操作](/Vue源码中的高级js)

### 2.2.3: `defineReactive`: 最终处理

```js
defineReactive(props, key, value)
```

`defineReactive`是老熟人了，但这里要注意一点：
先前`toggleObserving(false)`,关闭了观测的开关，所以`defineReactive`中调用 `observe`, 是一个无效调用。

此时到这里，可以得出一个结论

`props` 是通过 `defineReactive`定义的，此时虽然是响应式数据，但没有进行深度定义。

**即，父组件传给子组件props后，子组件不必再重复观测`props`**

### 2.2.4 toggleObserving(true)`: 最后打开观测开关

```js
toggleObserving(true)
```

重新打开观测开关，避免影响后续代码执行。

![](https://user-gold-cdn.xitu.io/2019/3/14/16977d4ba9139b0a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

### 感悟：相比分析源码，理解后写成博客更难。用文字讲清楚一件事可比敲代码难多了