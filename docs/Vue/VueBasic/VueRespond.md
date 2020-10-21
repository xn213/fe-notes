# Vue 响应式核心原理

## 高级抽象

```js
onStateChanged(() => {
	view = render(state)
})
```

将整个响应式系统抽象为一个`onStateChanged`方法，view自动根据state的变化而变化

那么如何实现`onStateChanged`呢？

先看下手动触发更新是怎么写的

```js
let update;

const onStateChanged = _update => {
  update = _update;
}

const setState = newState => {
  state = newState;
  update();
}
```

每次更新时传入`newState`： `{a: 1}`， 手动触发setState

```js
onStateChanged(() => {
	view = render(state)
})

setState({ a: 1})
```

用过react的同学会发现，这就是整个react的工作核心。

那么，如果我不想手动`setState`，只想改变状态`state.a = 2`，然后view自动更新，如何做到`autorun`呢？

我们都知道NG是采用脏检测的方式（这里不展开叙述）

而vue是通过ES5的`object.defineProperty()`方法把数据对象变成响应式的可观察对象（observable），把所有属性转为`getters`和`setters`，这些 `getter/setter`对用户来说是不可见的，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化，这段话暂时不理解没关系，我们后面再回来理解。

```js
autorun(() => {
  console.log(state.count)
})
```

这里是整个vue追踪变化的核心

下面我们尝试来自己实现一个最简单的响应式系统，主要分三块

* 将数据对象转成`getter/setter`
* 实现依赖追踪`dependency-tracking`
* 实现`mini-observer`

## 将数据对象转成`getter/setter`

* takes an Object as the argument
* converts the Object's properties in-place into getter/setters using  
    [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
* The converted object should retain original behavior, but at the same time  

    log all the get/set operations.

```js
functionconvert (obj) {
	// 取出obj的每个key进行循环将整个obj所有属性都变成getter/setter
  Object.keys(obj).forEach(key => {
	  // 这里其实是个闭包，需要取得初始值，不然初始化可能会拿到underfined
    let internalValue = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log(`getting key "${key}": ${internalValue}`);
        return internalValue;
      },
      set(newValue) {
        console.log(`setting key "${key}" to: ${newValue}`);
        internalValue = newValue;
      }
    })
  })
}
```

实现效果如下

```js
constobj= { foo: 123 }
convert(obj)

obj.foo // 'getting key "foo": 123'
obj.foo = 234 // 'setting key "foo" to 234'
obj.foo // 'getting key "foo": 234'
```

## 实现依赖追踪`dependency-tracking`

* Create a `Dep` class with two methods: `depend` and `notify`.
* Create an `autorun` function that takes an updater function.
* Inside the updater function, you can explicitly depend on an instance of `Dep` by calling `dep.depend()`
* Later, you can trigger the updater function to run again by calling `dep.notify()`.

先看我们要实现的效果

```js
constdep = new Dep()

autorun(() => {
  dep.depend()
  console.log('updated')
})
// should log: "updated"

dep.notify()
// should log: "updated"
```

`Dep`是一个`class`, 它有两个方法： `depend`和`notify`，顾名思义，一个是收集依赖，一个通知更新

无论何时调用`dep.notify()`， 传给`autorun`的方法应该再次 自动执行

```js
// 订阅者Dep 主要作用是存放watcher观察者对象// 这里为了简化概念，没有引入watcher，直接用变量替代// 下面重点讲到的activeUpdate 类似于Dep.target = this;class Dep {
  constructor() {
    // Set类数组，成员唯一不重复
    this.subscribes = new Set();
  }

  // 依赖收集，其实就是收集watcher
  depend() {
    if (activeUpdate) {
      this.subscribes.add(activeUpdate)
    }
  }

  // 通知所有watcher对象更新视图
  notify() {
    this.subscribes.forEach(sub => sub());
  }
}
```

接下来看下`autorun`的实现

```js
let activeUpdate = null

function autorun (update) {
  const wrappedUpdate = () => {
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  }
  wrappedUpdate()
}
```

这里需要好好理解一下  
`activeUpdate`是一个`autorun`之外的变量  
每当`autorun`执行，`activeUpdate = wrappedUpdate`代表的是`autorun`内正在执行的整个模块，如下图  
[![315e9212-b588-45f6-8080-c024a8058490](https://user-images.githubusercontent.com/25027560/50844572-f86dfc80-13a5-11e9-9821-8aec26820f97.png)](https://user-images.githubusercontent.com/25027560/50844572-f86dfc80-13a5-11e9-9821-8aec26820f97.png)

在依赖收集

```js
depend() {
	// 将整个`autorun`内正在执行的整个模块，也就是watcher存放到订阅列表中
	if (activeUpdate) {
	  this.subscribes.add(activeUpdate)
	}
}
```

## mini-observer

结合上面两个模块

```js
class Dep {
      constructor () {
        this.subscribers = new Set()
      }

      depend () {
        if (activeUpdate) {
          this.subscribers.add(activeUpdate)
        }
      }

      notify () {
        this.subscribers.forEach(sub => sub())
      }
    }

    function observe (obj) {
      // 遍历对象所有属性，并全部转为getter/setters
      Object.keys(obj).forEach(key => {
        let internalValue = obj[key]

        // 每个属性都有一个订阅实例
        const dep = new Dep()

        Object.defineProperty(obj, key, {
          // getter 负责依赖收集
          get () {
            dep.depend()
            return internalValue
          },

          // setter 负责通知更新
          set (newVal) {
            const changed = internalValue !== newVal
            internalValue = newVal
            // 触发计算，视图更新
            if (changed) {
              dep.notify()
            }
          }
        })
      })
      return obj
    }

    let activeUpdate = null

    function autorun (update) {
      const wrappedUpdate = () => {
        activeUpdate = wrappedUpdate
        update()
        activeUpdate = null
      }
      wrappedUpdate()
    }
```

可以测试一下如下代码

```js
conststate = {
  count: 0
}

observe(state)

autorun(() => {
  console.log(state.count)
})
// "count is: 0"

state.count++
// "count is: 1"
```