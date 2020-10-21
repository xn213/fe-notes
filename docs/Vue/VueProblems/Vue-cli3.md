# 「Vue实践」项目升级vue-cli3的正确姿势

## 一. 原以为升级vue-cli3的路线是这样的：

* 创建vue-cli3项目，按原有项目的配置选好各项配置

![选好各项配置](https://user-gold-cdn.xitu.io/2019/1/25/168832663fef4c33?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


* 迁移目录

```
src->src
static->public
```

* 对比新旧 `package.json`，然后`yarn install`，完毕。


### 然鹅... 运行项目，报错`You are using the runtime-only build of Vue......`：

![报错](https://user-gold-cdn.xitu.io/2019/1/25/16883346f5f31786?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


然后去查了下旧项目的相关字眼文件：

![](https://user-gold-cdn.xitu.io/2019/1/25/1688333b9883f139?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

噢，原来是vue-cli3的webpack相关文件都得自己写。于是乎根据官网的指引，在根目录创建了`vue.config.js`

此时粗略配置：

```js
chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
  }
```

## 二. 此时勉强能跑起来，但后续遇到了这些坑：

### `#1` public 静态资源不加载

```
 const CopyWebpackPlugin = require('copy-webpack-plugin')
 // ....
 // 确保静态资源
 config.resolve.extensions = ['.js', '.vue', '.json', '.css']
 config.plugins.push(
  new CopyWebpackPlugin([{ from: 'public/', to: 'public' }]),
)
```

### `#2` Chrome 查看样式时无法找到源文件

![](https://user-gold-cdn.xitu.io/2019/1/25/16883671ac2a98aa?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


原因：`vue-cli3` 里默认关闭 `sourceMap`，样式都会被打包到首页。
解决: 需要自己配置打开

```js
// 让样式找到源
  css: {
    sourceMap: true
  },
```

### `#3` 生产环境的`debuger`和`console`无法通过 `uglifyjs-webpack-plugin` 和 `uglify-es` 剔除

原因：不支持`es6`, 需要配置`babel`(`uglify-es`按配置填会显示不存在选项)

解决：插件[terser](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fterser-js%2Fterser%23output-options)

```js
const TerserPlugin = require('terser-webpack-plugin')
if (process.env.NODE_ENV === 'production') {
  // 为生产环境修改配置...
  new TerserPlugin({
    cache: true,
    parallel: true,
    sourceMap: true, // Must be set to true if using source-maps in production
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  })
} else {
  // 为开发环境修改配置...
}
```

### `#4` 无法在`config`目录下配置不同环境的`API_URL`，用于跨域请求

原因：[vue-cli3 中需要遵循变量规则，使用`VUE_APP`前缀](https://link.juejin.im/?target=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F51764070%2Fconfigure-environment-specific-variables-using-vue-cli)

官方规则：[在客户端侧代码中使用环境变量](https://link.juejin.im/?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2Fmode-and-env.html%23%25E5%259C%25A8%25E5%25AE%25A2%25E6%2588%25B7%25E7%25AB%25AF%25E4%25BE%25A7%25E4%25BB%25A3%25E7%25A0%2581%25E4%25B8%25AD%25E4%25BD%25BF%25E7%2594%25A8%25E7%258E%25AF%25E5%25A2%2583%25E5%258F%2598%25E9%2587%258F)

解决：于是你需要创建如下几个文件：

![](https://user-gold-cdn.xitu.io/2019/1/25/16883a6f636e0b42?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



> `.local`也可以加在指定模式的环境文件上，比如 `.env.development.local`将会在 `development` 模式下被载入，且被 git 忽略。

文件内容：

```js
// env.development.local
NODE_ENV = development
VUE_APP_URL = http://xxx.x.xxx/
```

### `#5` vue-cli代理转发控制台反复打印`"WebSocket connection to'ws://localhost..."`

![](https://user-gold-cdn.xitu.io/2019/1/25/16883b1a471e21c4?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


解决方法：

`vue.config.js`中配置`devServer.proxy`的`ws`为`false`

结合上述两步，相对应的`vue.config.js`，需要这么写：

```js
const env = process.env.NODE_ENV
let target = process.env.VUE_APP_URL

const devProxy = ['/api', '/']  // 代理
// 生成代理配置对象
let proxyObj = {};
devProxy.forEach((value, index) => {
  proxyObj[value] = {
    ws: false,
    target: target,
    // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    changeOrigin: true,
    pathRewrite: {
      [`^${value}`]: value
    }
  };
})
// ....
devServer: {
  open: true,
  host: 'localhost',
  port: 8080,
  proxy: proxyObj
}
```

## 最后贴上我的`vue.config.js`：

```js
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const path = require('path')
const env = process.env.NODE_ENV
let target = process.env.VUE_APP_URL

const devProxy = ['/api', '/']  // 代理

// 生成代理配置对象
let proxyObj = {};
devProxy.forEach((value, index) => {
  proxyObj[value] = {
    ws: false,
    target: target,
    // 开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
    changeOrigin: true,
    pathRewrite: {
      [`^${value}`]: value
    }
  };
})

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: '/',
  // 让样式找到源
  css: {
    sourceMap: true
  },
  configureWebpack: config => {
    // 确保静态资源
    config.resolve.extensions = ['.js', '.vue', '.json', '.css']
    config.plugins.push(
      new CopyWebpackPlugin([{ from: 'public/', to: 'public' }]),
    )
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        }
      })
    } else {
      // 为开发环境修改配置...
    }

  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = false
        return options
      })
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8080,
    proxy: proxyObj
  }
}
```

## 三. Eslint相关报错及配置

![](https://user-gold-cdn.xitu.io/2019/1/25/16883d48702ec988?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



```js
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'generator-star-spacing': 'off',
    'object-curly-spacing': 'off',
    // 最常出现的错误
    'no-unused-vars': 'off',
    // 最常出现的错误
    "vue/no-use-v-if-with-v-for": ["error", {
      "allowUsingIterationVar": true
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
```

### 最后的最后，跑个项目

`yarn serve`

![](https://user-gold-cdn.xitu.io/2019/1/25/16883c41699c2b80?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

`yarn build`

![](https://user-gold-cdn.xitu.io/2019/1/25/16883c445508a579?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)