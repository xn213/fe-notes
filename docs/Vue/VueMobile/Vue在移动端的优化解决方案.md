# vue 在移动端体验上的优化解决方案

[原文](https://juejin.im/post/5cdd2457f265da034e7eb2f9?utm_source=gold_browser_extension)
去年年底自己搭了一个vue在移动端的开发框架，感觉体验不是很好。上个星期又要做移动端的项目了。所以我花了两天时间对之前的那个开发框架做了以下优化

* 自定义vuex-plugins-loading
* 路由切换动画 + keep alive 动态管理缓存组件
* better-scroll与vue的最佳实践(better-scroll的vue化)
* 自定义指令（vue-finger:包括点击，长按，双击，拖拽移动，多点触控，滑动，旋转，缩放手势）
* 移动端适配方案
* 如何分情况处理页面置顶
* 路由懒加载

## 自定义 vuex-plugins-loading

如果每个页面在数据加载完成前，展示loading。你首先想到的是每个页面设置状态，show和hide状态。但是这样冗余代码太多了，而且自己写的都烦。我之前的react的项目中用到了dva，其中有dva-loading库，之前就有研究过，所以我就用他的思想，自己写一个vuex-loading。  
**实现思路：vuex中注册一个管理loading的module,通过绑定异步的action，将每个action的loading存在vuex中，这样我在每个页面只需要在vuex的store中拿相对应的action loading就能达到此目的**  

```js
## 核心代码
store.subscribeAction({
  before: action => {
    if (shouldEffect(action, includes, excludes)) {
      store.commit({ type: namespace + '/SHOW', payload: action.type })
    }
  },
  after: action => {
    if (shouldEffect(action, includes, excludes)) {
      store.commit({ type: namespace + '/HIDE', payload: action.type })
    }
  }
})
```

使用之前大家可以先了解一下[subscribeAction](https://link.juejin.im/?target=https%3A%2F%2Fvuex.vuejs.org%2Fzh%2Fapi%2F%23subscribeaction)  
想安装此插件，[请点击这里](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FdaughterRui%2Fvuex-plugins-loading)，记得给个star哟  
**注意: 使用上述代码,vuex必需为3.1.0版本。因为subscribeAction在3.1.0才新增的**  

## 路由切换动画 + keep alive 动态管理缓存组件

之前采用的是全局设置路由切换动画，但是体验效果不是很好，特别是返回列表页，页面会引起回弹，页面切换时会有暂时的空白。  

**未改造前的，也是参考别人的做法**

```bash
## app.vue
<transition :name="transitionName"> 
  <keep-alive :include="data">
      <router-view></router-view>
  </keep-alive>
</transition>

computed: {
  // 数据存放在vuex里面
  ...mapState({
    data: state => {
      return state.global.data
    }
  })
},
methods: {
  // 设置Keep_alive路由
  setKeep_alive (to) {
    if (to.meta.keepAlive) {
      this.$store.dispatch({
        type: 'global/setData',
        payload: to.name
      })
    }
  }
},
watch: {
  '$route' (to, from) {
    // 此时从from页面跳转到to页面
    this.setKeep_alive(to)
    const routeDeep = ['/', '/list', '/detail', '/reservation', '/addCars']
    const toDepth = routeDeep.indexOf(to.path)
    const fromDepth = routeDeep.indexOf(from.path)
    if (!from.name) {
      this.transitionName = 'fold'
      return
    }
    this.transitionName = toDepth > fromDepth ? 'fold-left' : 'fold-right'
  }
},
```

```js
## router.js
scrollBehavior (to, from, savedPosition) {
  // keep-alive 返回缓存页面后记录浏览位置
  if (savedPosition && to.meta.keepAlive) {
    return savedPosition
  }
  // 异步滚动操作
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ x: 0, y: 1 })
    }, 0)
  })
},
```

> 两个问题  
>
> 1.  列表页滑动到一定位置后跳转到详情页，返回列表页页面回弹  
>
>     原因：原生滚动条的位置是不变的，使用scrollBehavior，根据上述代码可知滚动条会有一个闪烁的过程先置顶，然后滚动到上次保留的位置。
>
> 2.  页面切换时会有暂时的空白,过渡不正常。

**改造后**  

```bash
## app.vue
<keep-alive :include="data">
  <router-view></router-view>
</keep-alive>
computed: {
    // 数据存放在vuex里面
    ...mapState({
      data: state => {
        return state.global.data
      }
    })
  },
  methods: {
    // 设置Keep_alive路由
    setKeep_alive (to) {
      if (to.meta.keepAlive) {
        this.$store.dispatch({
          type: 'global/setData',
          payload: to.name
        })
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 此时从from页面跳转到to页面
      this.setKeep_alive(to)
    }
  },
```

```html
# list.vue
<Scroll
  ref="scroll"
  class="scroll-home"
  :scrollbar="scrollbar"
  :probeType="3"
  :pullDownRefresh="pullDownRefresh"
  :pullUpLoad="true"
  @pullingDown="onRefresh"
  @scroll="scroll"
  @pullingUp="onLoad"
>
 <div class="contantView">
 </div>
</Scroll>
```

1.采用better-scroll后,第一个问题可以直接解决。而且不用设置scrollBehavior，不懂可以去看[better-scroll](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fustbhuangyi%2Fbetter-scroll)  

2.给页面CSS添加设置“position:absolute;”，此时页面脱离文档流，不占空间，这样就不会把下一页挤下去，完成平滑过渡。使用better-scroll给页面CSS添加设置“position:fixed;”。

> 如果页面布局里面有用到flex布局，一定要给flex组件加一个position为absolute或者fixed的div。

> 上述代码中已有keep alive 动态管理缓存路由的思路。

## better-scroll与vue的最佳实践

之前在一篇文章上看到BetterScroll可能是目前最好用的移动端滚动插件,所以这次就想试试，滴滴开源的cube-ui组件库里面大多数用到的滑动组件都是基于better-scroll，体验了一下感觉还挺好。为什么没有用cube了？因为个人感觉主题颜色有点丑。所以自己就打算基于better-scroll封装一个vue版本的scroll组件。不说那么多了，立马上图：  

<figure>![](https://user-gold-cdn.xitu.io/2019/5/17/16ac6042b3db597a?imageslim)
<figcaption></figcaption></figure>

> 想用better-scroll还有另外一个原因，我想自定义上下拉的动画。  

想看demo及源码[请点击这里](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FdaughterRui%2Fvue-scroll)。记得给个star哟

## 自定义指令 vue-finger

包括点击，长按，双击，拖拽移动，多点触控，滑动，旋转，缩放手势  

这一块我这边是基于[别人的demo改造的](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fgggso%2Fvue-finger)，在这些指令里面你可以做很多在移动端手势方面想做的事情。后续我会继续迭代这些指令，制定出体验接近原生的组件，大家要关注我的[github](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FdaughterRui)哟

## 移动端适配方案

```js
// rem.js
const baseSize = 32
// 设置 rem 函数
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = document.documentElement.clientWidth / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}

// main.js
import './rem'
```

还有最后还有一步。对于经常写样式的同学，px转rem是不是感觉很烦。
我这边处理的方式是，在项目根目录新建一个postcss.config.js文件。这样你只需按照设计稿的样式，正常写px就好。运行项目时会自动帮你转成rem。

```js
module.exports = {
  plugins: {
    'autoprefixer': {
      browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
      rootValue: 16,
      propList: ['*']
    }
  }
}
```

## 如何分情况处理页面置顶

上文有讲到vue-router里面[scrollBehavior](https://link.juejin.im/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fadvanced%2Fscroll-behavior.html%23%25E5%25BC%2582%25E6%25AD%25A5%25E6%25BB%259A%25E5%258A%25A8)这个方法。

```js
// router.js
scrollBehavior (to, from, savedPosition) {
  // keep-alive 返回缓存页面后记录浏览位置
  if (savedPosition && to.meta.keepAlive) {
    return savedPosition
  }
  // 异步滚动操作
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ x: 0, y: 1 })
    }, 0)
  })
},
```

但是感觉添加页面转场动画后。页面会有回弹。所以我就放弃它了。不添加动画的可以考虑。  
我这边用到了better-scroll后就不用担心这个问题。看完better-scroll文档介绍，你就会发现better-scroll就是为移动端运用而生的。

## 路由懒加载

当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
这是路由懒加载就很重要了。看过[官方文档](https://link.juejin.im/?target=https%3A%2F%2Frouter.vuejs.org%2Fzh%2Fguide%2Fadvanced%2Flazy-loading.html)大家应该都会用了，这里我就不介绍了。

```js
// 路由懒加载
const _import_ = file => () => import('./views/' + file + '.vue')

routes: [
    {
      path: '/',
      name: 'home',
      component: _import_('Home/Home'),
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
]
```

终于写完了，以上这些就是我在移动端体验优化的实战。希望能帮到大家。