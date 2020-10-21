# 通用组件 notification 信息提示弹框

```
|-- notification ===> component folder
    |-- index.js
    |-- func-notification.js
    |-- function.js
    |-- notification.vue
```
```js
// main.js
import Vue from 'vue'
import Notification from 'components/notification'

Vue.use(Notification)
```


```js
// index.js
import Notification from './notification.vue'
import notify from './function'
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  Vue.prototype.$notify = notify
}
```

```js
// func-notification.js
import Notification from './notification'

export default {
  extends: Notification,
  computed: {
    style(){
      return {
        position: 'fixed',
        right: '20px',
        top: `${this.verticalOffset}px`,
      }
    }
  },
  mounted(){
    this.createTimer()
  },
  methods: {
    createTimer(){
      if(this.autoClose){
        this.timer = setTimeout(() => {
          this.visible = false
        },this.autoClose)
      }
    },
    clearTimer(){
      if(this.timer) {
        clearTimeout(this.timer)
      }
    },
    afterEnter(){
      // debugger // eslint-disable-line
      this.height = this.$el.offsetHeight
    }
  },
  beforeDestory(){
    this.clearTimer()
  },
  data(){
    return {
      verticalOffset: 0,
      autoClose: 3000,
      height: 0,
      visible: false
    }
  }
}
```

```js
// function.js
import Vue from 'vue'
import Component from './func-notification'

const NotificationConstructor = Vue.extend(Component)

const instances = []
let seed = 1

const removeInstance = (instance) => {
  if(!instance) return
  const len = instances.length
  const index  = instances.findIndex(inst => instance.id === inst.id)

  instances.splice(index, 1)
  
  if(len <= 1) return
  const removeHeight = instance.vm.height
  for(let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removeHeight - 16
  }
}

const notify = (options) => {
  if(Vue.prototype.$isServer) return

  const {
    autoClose,
    ...rest
  } = options
  
  const instance  = new NotificationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${seed++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  instance.vm.visible = true

  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })
  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed',() => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el) // 删除dom节点
    instance.vm.$destroy() // 只会销毁这个dom对象,并不会也不能从document中删除dom节点
  })
  instance.vm.$on('close', () => {
    instance.vm.visible = false
  })
  return instance.vm
}

export default notify
```

```html
// notification.vue
<template>
  <transition name="fade"
    @after-leave='afterLeave'
    @after-enter='afterEnter'
  >
    <div class="notification"
      :style="style"
      v-show="visible"
      @mouseenter='clearTimer'
      @mouseleave='createTimer'
    >
      <span class="content">{{content}}</span>
      <a class="btn" @click="handleClose">{{btn}}</a>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Notification',
  props: {
    content: {
      type: String,
      required: true
    },
    btn: {
      type: String,
      default: '关闭'
    }
  },
  data(){
    return {
      visible: true
    }
  },
  computed: {
    style(){
      return {}
    }
  },
  methods: {
    handleClose(e) {
      e.preventDefault()
      this.$emit('close')
    },
    afterLeave(){
      this.$emit('closed')
    },
    afterEnter(){},
    clearTimer(){},
    createTimer(){}
  }
}
</script>

<style lang="scss" scoped>
@import '@/themes/global.scss';
.notification {
  display: flex;
  align-items: center;
  background: #303030;
  color: rgba(255,255,255,1);
  padding: 20px;
  position: fixed;
  min-width: 280px;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,.2), 0px 6px 10px 0px rgba(0,0,0,.2);
  flex-wrap: wrap;
  transition: all .3s;

  .content {
    padding: 0;
  }
  .btn {
    color: #ff4081;
    padding-left: 24px;
    margin-left: auto;
    cursor: pointer;
  }
}
</style>
```