# Vue 填坑之路


## 1. vue中引入json数据

必须创建服务才可以在vue中直接使用json数据；

可参考[vue请求本地数据](https://arieltlm.github.io/my-blog/frontEnd/vue/two.html)

下面就本次使用再清晰理一遍：

**方法一：**

在webpack.dev.conf.js中（vue-cli实现的vue项目框架已经加上理express），直接引入json文件，然后在devServer中加上get或者post请求，然后就可以在vue中正常请求此服务上产生的数据了：

![WX20180723-110139.png](http://upload-images.jianshu.io/upload_images/6230931-ef6fd991c18bc0d1.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```js
var beijingData = require('../beijing.json')

before(app) {
  app.get('/api/beijingData', (req, res) => {
    res.json({
      errno: 0,
      data: beijingData
    })//接口返回json数据，上面配置的数据seller就赋值给data请求后调用
  })
}
```

**方法二：**

平时我习惯mock.js产生假数据，所以可以用mock的服务来处理json,同样的在vue中就可以正常请求到了。

![WX20180723-110606.png](http://upload-images.jianshu.io/upload_images/6230931-f6504d1819b7b841.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

```js
var Mock = require('mockjs');
var beijingdata = require('./beijing.json');
var beijingdata1 = require('./beijing2.json');

Mock.mock('/sinotans/order/leftChart', 'get', function (options) {
  return {
    message: 'success',
    data: { orderNum: beijingdata, goodsAmount: beijingdata1 },
    statusCode: 200
  };
});
```

## 2. vue router-link上添加点击事件。

需要添加`.native`

```html
<ul v-if="isShow">
  <router-link :to="headNavLink[index]"
    v-for="(item,index) in headNavList"
    :key="index"
    tag="li"
    @click.native="activeChange(index)">
    <div class="nav-icon"></div>
    <span class="nav-font">{{item}}</span>
  </router-link>
</ul>
```

## 3. vue中 watch对象或者数组

[vue 实战问题－watch 数组或者对象](https://www.cnblogs.com/hity-tt/p/6677753.html)

**数组和对象都需要深层次监测：**

```js
data () {
  return {
    orderTotal: {
      businessSel: '1',
      companySel: '全部',
      projectSel: '全部',
      customerSel: '全部',
      flowFrom: '全部',
      flowTo: '全部'
    },
  }
},
watch: {
  orderTotal: {
    handler(newValue, oldValue) {
      console.log(newValue)
      const businessSelectedw = newValue.businessSel;
      const companySelectedw = newValue.companySel;
      const customerSelectedw = newValue.customerSel;
      const projectSelectedw = newValue.projectSel;
      // 监听 
      if (companySelectedw === '全部') {
          this.projectDisabled = true;
          this.customerDisabled = true;
      } else {
          this.projectDisabled = false;
          this.customerDisabled = false;
      }
      // 监听 
      if ((customerSelectedw !== '全部' && Number(businessSelectedw) === 2) || (projectSelectedw !== '全部' && Number(businessSelectedw) === 1)) {
          this.flowShowFlag = true;
      } else {
          this.flowShowFlag = false;
      }
    },
    deep: true
  }
},
```

**如果想监测具体的属性变化，如pokerHistory变化时，才执行handler函数，则可以利用计算属性computed做中间层。**

```js
data() {
  return {
    bet: {
      pokerState: 53,
    pokerHistory: 'local'
    }   
  }
},
computed: {
  pokerHistory() {
    return this.bet.pokerHistory
  }
},
watch: {
  pokerHistory(newValue, oldValue) {
    console.log(newValue)
  }
}
```

## 4. vue-router多重包含的重定向问题

问题描述：
![WX20180723-124014@2x.png](http://upload-images.jianshu.io/upload_images/6230931-f01e65a6f0b1ba35.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

我的页面结构是这样的。当时的问题是：在点击四个子页面的时候，内容页一那一层的`.router-link-active`就没了。后来发现是因为我的内容页和子页面写在同一级别上了（怎么说才对呢————就是我的页面一进入内容页一后我需要直接展示子页面一，而我的内容页一和子页面一的路由写成了一样的，这样就导致子页面和内容页一在同一个里面了。所以就点击子页面时，`.router-link-active`就只有一个了。在内容页一二上没有了）。解决办法就是内容页一给一个路由，然后重定向到子页面一上。

同时在的子页面二点击按钮处还分为了子页面21和子页面22

```js
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/index"
    },
    {
      path: "/index",
      component: home
    },
    {
      path: "/pages1",
      redirect: "/pages/childPage1",
    },
    {
      path: "/pages1",
      name: "visualization",
      component: visual,
      children: [
        {
          path: "/visual/childPage1",
          name: "orderNumAnaly",
          component: orderNumAnaly
        },
        {
          path: "/visual/childPage2",
          redirect: "/visual/KPI/log",
        },
        {
          path: "/visual/childPage2/childPage21",
          name: "KPILog",
          component: effectKPILog
        },
        {
          path: "/visual/childPage2/childPage22",
          name: "effectKPIWater",
          component: effectKPIWater
        },
        {
          path: "/visual/childPage3",
          name: "transWrongAnaly",
          component: transWrongAnaly
        },
        {
          path: "/visual/childPage4",
          name: "visualAbility",
          component: visualAbility
        }
      ]
    },
    {
      path: "/pages2",
      name: "lot",
      component: lot
    }
  ]
});
```

## 5. amcharts 插件在vue中使用

amcharts必须全局引用，必须在main.js中引用：

[官网上的说明](http://www.amcharts.com/kbase/using-amcharts-vue-js-webpack/)

```js
/* eslint-disable */
import AmCharts from 'amcharts3';
import AmSerial from 'amcharts3/amcharts/serial';
import AmPieChart from 'amcharts3/amcharts/pie';
/* eslint-enable */
```

[Using amCharts with Vue.js and Webpack](http://www.amcharts.com/kbase/using-amcharts-vue-js-webpack/)

文章最后面说的图标无法显示的问题，如下添加即可：

![WX20180723-124840.png](http://upload-images.jianshu.io/upload_images/6230931-8e4a256d4a9a1347.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

## 6. vue中父组件向路由页传递值

一开始没明白过来`router-view`上面也可以如同平常组件那样传递props值。所以走了很多弯路。
在此标记：

```html
<router-view :companyOptions="companyOp"></router-view>
```

## 7. props传过来的值作为初始值，后续怎么改变

> 需求是不需要改变父组件的，只是在父组件中统一请求到了初始值，每个组件中的初始值相同，但后续会不同。

哎呀这次真的被自己坑了：

一开始的思路是知道props不能直接改变的，那就用computed写一个新变量来接收它，然后在方法中改变它，报错没有setter，设置setter不起作用，要不就报错不能修改props，懵了；

问了同事后，才发现简单问题想复杂了。实际上一开始只需要拿到就行了。

```js
data () {
  return {
    op: this.propsValue
  }
},
props: ['propsValue'],
methods: {
  changeOp () {
    this.op = '12334';
  }
}
```

## 8. 画图实现的对象上的绑定方法操作本页面数据

问题：
画图的代码在另一个js中封装，本vue中引入js，请求之后调用函数生成myChart对象，即图表对象。此时需要在其上绑定事件。

由于请求是异步执行，所以要考虑保证绑定事件在画图之后。

**思路一**：
如果在本.vue中等待其后绑定，那么就要使画图代码中return 出去

```js
//setChart.js
import echarts from "echarts";

export default function(data, id) {
  let myChart = echarts.init(document.getElementById(id));
  let option = {};
  myChart.setOption(option);
  window.onresize = myChart.resize;
  return myChart;
};
```

在.vue页面：

```js
import myChart from '@/charts/setChart';

mounted () {
  this.utils.MlTools.reqCharts('/sinotans/order/rightChart', 'myChartInit', this.proDym, this) // 发起请求画图
},

methods: {
  myChartInit () {
    let data = this.proDym;
    let _this = this;
    myChart(data, "RightChart").on('click', function (params) {
      if (params.componentType === 'series') {
        // 点击到了 markPoint 上
        if (params.seriesIndex === 1 || params.seriesIndex === 0) {
          _this.tabActive = 1;
          _this.busCarrier.projectSel = _this.proDym.projectSel;
          _this.busCarrier.carrierSel = '全部';
        }
      }
    });
  },
}
```

**思路二**：传入回调函数

```js
//setChart.js
import echarts from "echarts";

export default function(data, id, callback) {
    let myChart = echarts.init(document.getElementById(id));
    let option = {};
    myChart.setOption(option);
    window.onresize = myChart.resize;
    myChart.on('click', function(params){
         if (params.componentType === 'series') {
            callback();
         }
    })
};
```

在.vue中：

```js
import myChart from '@/charts/setChart';

mounted () {
  this.utils.MlTools.reqCharts('/sinotans/order/rightChart', 'myChartInit', this.proDym, this)//发起请求画图
},

methods: {
  myChartInit () {
    let data = this.proDym;
    myChart(data, "RightChart", this.changeToShip)
  },
  changeToShip () {
    this.tabActive = 1;
    this.busCarrier.projectSel = this.proDym.projectSel;
    this.busCarrier.carrierSel = '全部';
  }
}
```

## 9. 后台接收不到数据之content-type

form的enctype属性为编码方式，常用有两种：application/x-www-form-urlencoded和multipart/form-data，默认为application/x-www-form-urlencoded。

当action为get时候，浏览器用x-www-form-urlencoded的编码方式把form数据转换成一个字串（name1=value1&name2=value2...），然后把这个字串追加到url后面，用?分割，加载这个新的url。

当action为post时候，浏览器把form数据封装到http body中，然后发送到server。 如果没有type=file的控件，用默认的application/x-www-form-urlencoded就可以了。 但是如果有type=file的话，就要用到multipart/form-data了。

当action为post且Content-Type类型是multipart/form-data，浏览器会把整个表单以控件为单位分割，并为每个部分加上Content-Disposition(form-data或者file),Content-Type(默认为text/plain),name(控件name)等信息，并加上分割符(boundary)。

> 原生AJAX的POST请求如果不指定请求头Request Header，默认使用的Content-Type是text/plain;charset=UTF-8，参数出现在Request payload块。

> 一般json数据格式的话，浏览器处就显示的是`Content-Type:application/json;chartset=UTF-8`

**vue中的axios**传参方式是request payload,参数格式是json，而并非用的是form传参，所以在后台用接收form数据的方式接收参数就接收不到了。

**解决办法：**

安装 qs   : `npm install qs --save`

```js
import qs from "qs";
axios({
   method: "post",
   url: param.url,
   dataType: "json",
   data: qs.stringify(param.data),
   headers: {
    "Content-Type": "application/x-www-form-urlencoded"
   },
}).then(res => {

}, err => {

});
```

## 10. axios 实现某些请求的拦截, 不是全局统一拦截

生成实例：

```js
static reqCharts(urls, d, datas, _this, loading) {
  let instance = axios.create();
    // 添加请求拦截器
  instance.interceptors.request.use(function(config) {
    // 在发送请求之前做些什么
    _this[loading] = true;
    return config;
  }, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 添加响应拦截器
  instance.interceptors.response.use(function(response) {
    // 对响应数据做点什么
    _this[loading] = false;
    return response;
  }, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  return new Promise((resolve, reject) => {
    instance
      .post(urls, datas)
      .then(function(res) {
          // 处理res
      })
      .catch (function(err) {
          console.log(err.response)
      })
    })
}
```

## 11. axios设置请求超时，mock服务下需要设置，否则不起作用。

## 12. vue起服务自动用ip

在config/index.js中，添加：

```js
const ip = require('ip').address();
....
host: ip
```