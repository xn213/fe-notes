# VueJs 最佳实践

经过一段时间对[VueJs官方文档](https://cn.vuejs.org/v2/guide/)以及网上其他相关vue资源的研究，我整理了一份最佳实践和样式指南列表，方便大家写出更正确、更容易让小伙伴接受的vue代码。

以下有几点是一些功能/优化相关，其他是VueJs命名约定和元素排序相关。更多详细信息可以直接到最下方的总结中查看。

## 在组件销毁时用`$off`清除事件监听

当我们使用`$on`进行事件监听时，要记住在`destroyed()`钩子中用`$off`移除事件监听，可以有效防止内存泄漏。

## 使用短横线分隔的形式命名事件

触发/监听自定义事件时，应该始终使用短横线分隔。为什么呢？因为无论如何最后事件名都会被自动转换为短横线分隔的形式。我们不应该用驼峰命名或者首字母大写的形式给监听事件命名，而是使用一种更清晰有意义的方式来声明一个事件：短横线分隔

```js
// Emittingthis.$emit('my-event') // instead of myEvent
// Listening
v-on:my-event
```

## 不要在`created`生命周期和`watch`中调用同一个方法

如果我们需要在组件初始化以及侦听属性变化时调用同一个方法，通常的做法像下面这样

```js
watch: {
  myProperty() {
    this.doSomething();
  }
},
created() {
  this.doSomething();
},
methods: {
  doSomething() {
     console.log('doing something...');
  }
},
```

尽管上面这段代码看起来没什么问题，但`created`钩子里面执行的方法是多余的。我们可以把所需要执行的方法放到`watch`里面，避免在	`created`钩子里写重复代码，那将会在组件实例化的时候触发多一次。 比如像下面这样：

```js
watch: {
  myProperty: {
    immediate: true, // 该回调将会在侦听开始之后被立即调用
    handler() {
      this.doSomething();
    }
  }
},
methods: {
  doSomething() {
     console.log('doing something...');
  }
},

// 更好的方案
watch: {
  myProperty: {
    immediate: true,
    handler() {
      console.log('doing something...'); // 只用一次的方法没必要在methods里面声明了
    }
  }
},
```

## 不要忘记在`v-for`循环中使用`key`

最常见的做法是始终在模板循环中添加`:key`键。没有`:key`键的`v-for`循环在错误定位的时候比较麻烦，特别是动画相关

## 使用`$_`作为`mixins`的私有属性前缀

`Mixins`在代码复用上是个不错的方法，它可以将重复代码组合成一个单独的模块，然后按需引入。但是（极大可能），会出现一些问题。下面，我们重点解决属性名重复冲突的问题。

当我们将`mixin`混入组件时，也就是将`mixin`内的代码与组件自身的代码进行合并，如果碰到同名属性，会发生什么？组件优先级更高，组件属性的优先级自然更高。

如果我想让`mixin`代码的优先级更高，应该怎么办？我们无法分配优先级，但可以通过正确的命名规范来避免属性重叠或者覆盖。

为了区分`mixin`属性和组件的属性，我们通常使用`$_`作为属性前缀，为什么呢？主要有下面几个原因：  
1. 来自VueJs风格指南的建议  
2. Vue 使用 `_` 前缀来定义其自身的私有属性  
3. `$`是Vue生态系统暴露给用户的特殊实例属性

在[风格指南 — Vue.js](https://cn.vuejs.org/v2/style-guide/index.html)中，他们建议像这样给`mixin`添加属性名称：`$_myMixin_updateUser`

相对于可读性，我发现给`mixin`添加名称有时候也会产生一些混淆。但这也取决于`mixin`本身代码，特殊情况或者开发人员本身。

通过添加一个简单的`$_`，就像`$_updateUser`一样，代码更具可读性，可以轻松分辨出组件私有属性和`mixin`的属性。

## `mixin`中使用的方法或者属性应该直接在`mixin`中读取

继`mixin`上一点，还有另一点要注意的

假设我们创建了一个`mixin`，它使用了`this.language`属性，但这个属性并不是在`mixin`内部定义或获取的，那么混入了这个`mixin`的组件就必须包含这个`language`属性。

正如你已经知道的，这非常容易出错。为了提前避免错误的发生，`mixin`内使用到的属性或者方法最好只在`mixin`内部定义获取。不必担心重复获取属性的问题，因为VueJs在这点上很聪明，如果检测到重复读取属性，将会自动处理（大部分情况下是直接从Vuex里直接读取）。

## 使用首字母大写命名或者短横线分隔命名单文件组件

编辑器对首字母大写命名的集成度更好，对在常用IDE中实现自动完成/导入功能更友好。

如果我们想要避免文件系统大小写不敏感的问题，那么最好选择短横线分隔

## 给基础组件名加前缀

对于展示组件、纯组件，应该给它们加上前缀，以区别于其他的非纯组件。这可以大大提高项目可读性，提高团队协同开发体验。

## 使用首字母大写命名命名JS中的组件

在JavaScript中，类和原型构造函数有默认约定使用首字母大写命名，在Vue组件中使用首字母大写命名有相同的意义。 如果我们只通过`Vue.component`使用全局组件定义，建议使用短横线分隔命名

## 声明 `prop`名时使用驼峰命名，但在模板中应使用短横线分隔命名

遵循每种语言的惯例：JavaScript（驼峰）和HTML（短横线分割），在JS中定义`prop`时用驼峰命名，在HTML中用于短横线分割命名。

## 遵循样式指南中的组件选项顺序

这样做可能看起来有点死板，但是在整个项目中对组件的所有选项执行相同的顺序，在查找内容和创建新组件时有很大帮助。

VueJs样式指南可以查看这里[风格指南 — Vue.js](https://cn.vuejs.org/v2/style-guide/index.html)

## 不要在使用`v-for`的同一元素上使用`v-if`

这种做法堪称性能杀手，列表数据越大，这种做法对性能的影响越大

用代码来看下问题吧，看以下场景：

```html
<ul>
  <li
    v-for="game in games"
    v-if="game.isActive"
    :key="game.slug"
  >
    {{ game.title }}
  <li>
</ul>
```

类似于执行下面的代码：

```js
this.games.map(function (game) {
  if (game.isActive) {
    return game.title
  }
})
```

我们可以在这里看到，我们将不得不迭代整个`games`数组，无论`game.isActive`是否已经改变

在像Angular这样的其他框架中，这种做法不会被编译（`* ngIf`不能进入有`* ngFor`的同一元素）

## `Actions`必须有返回值

这跟`async/await`和 Vuex的 `actions`有关

看以下例子：

```js
// Store
[SOME_ACTION] () {
   // 做点什么，需要一段时间才能执行完
   console.log('Action done');
}
// Consuming action
async doSomething() {
  await dispatch(SOME_ACTION);
  console.log('Do stuff now');
}
This will output:
// Do stuff now
// Action done
```

发生这种情况是因为`await`不知道要等待什么，相反，如果我们实际上返回了`Promise.resolve（）`，则`await`将等待解析，然后再继续

```js
// Store
[SOME_ACTION] () {
   // 做点什么，需要一段时间才能执行完
   console.log('Action done');
   Promise.resolve();
}
// Consuming action
async doSomething() {
  await dispatch(SOME_ACTION);
  console.log('Do stuff now');
}
This will output:
// Action done
// Do stuff now
```

## 在`actions`和`getters`中使用选择器

创建选择器时，不单只是在应用逻辑中使用，还要在`Vuex store`中使用

直接用代码会更容易解释：

```js
// 假设我们读取以下language属性exportconstlanguage = (state) => state.userConfig.language;
// 在其中一个actions中, 需要用到language:

// 不好的例子
[GET_GAMES]({ commit, rootState }) {
   const lang = rootState.userConfig.language;
   // Do stuff...
}

// 正确的例子
[GET_GAMES]({ commit, rootState }) {
   const lang = language(rootState);
   // Do stuff...
}
```

## 总结

1.  在组件销毁时用`$off`清除事件监听
2.  使用短横线分隔的形式命名事件
3.  不要在`created`生命周期和`watch`中调用同一个方法
4.  不要忘记在`v-for`循环中使用`key`
5.  使用`$_`作为`mixins`的私有属性前缀
6.  `mixin`中使用的方法或者属性应该直接在`mixin`中读取
7.  使用首字母大写或者短横线分隔命名单文件组件
8.  给基础组件名加前缀
9.  使用首字母大写命名命名JS中的组件
10.  声明 `prop`名时使用驼峰命名，但在模板中应使用短横线分隔命名
11.  遵循样式指南中的组件选项顺序
12.  不要在使用`v-for`的同一元素上使用`v-if`
13.  `Actions`必须有返回值
14.  在`actions`和`getters`中使用选择器

### 来源

* https://vuejs-tips.github.io/cheatsheet/
* https://learn-vuejs.github.io/vue-patterns/patterns/
* https://vuejs.org/v2/style-guide/

### 感谢

这篇文章是由多个在同一项目中使用VueJs的开发人员合作完成的，遵循这份样式指南和最佳实践有助于让每个新开发人员都能尽快熟悉并上手项目代码。

> 原文地址： [Vue.js best practices ✓ – Noteworthy - The Journal Blog](https://blog.usejournal.com/vue-js-best-practices-c5da8d7af48d)  
> 原文作者： Riccardo Polacci  
> 译者： amandakelake