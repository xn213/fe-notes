# vue.config.js

```js
// vue.config.js
const path = require('path');
const CDN = {
  CDN_PATH_1: 'https://s3.abcd.com/user/static/',
  CDN_PATH_2: 'https://s3a.abcd.com/user/static/',
  CDN_PATH_3: 'https://s3b.abcd.com/user/static/',
};
// 开发环境代理
const proxyConfig = {
  // target: 'http://10.13.213.103:2113', // 张三
  // target: "http://10.11.13.213:2113", // 李四
  // target: 'http://10.213.5.95:2113', // 王五
  // target: "http://10.9.213.195:9113", // 赵四
  target: "http://10.13.21.13:9093", // 某某某
  // target: 'https://test-abab.abcd.net', //新系统test测试环境
  // target: 'https://boe-abab.abcd.net', //新系统boe测试环境
  // target: 'https://abab.abcd.net', //新系统生产环境
};
const basePath = '/ab/',
  systemName = 'ab_cd';
process.env.VUE_APP_BASEPATH = basePath;
process.env.VUE_APP_SYSTEM = systemName;

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? CDN.CDN_PATH_1 : basePath,
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 识别文件类型 优先级别
      alias: { // 文件夹别名 方便
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        service: resolve('src/service'),
        config: resolve('src/config'),
        const: resolve('src/const'),
        utils: resolve('src/utils'),
        api: resolve('src/api'),
        mixins: resolve('src/mixins'),
        plugins: resolve('src/plugins'),
        ROUTER: resolve('src/ROUTER'),
        store: resolve('src/store'),
        components: resolve('src/components'),
        pages: resolve('src/pages'),
      },
    },
    externals: {
      slardar: 'Slardar',
    },
    devServer: {
      proxy: {
        // proxy api request to dev box
        '/api': {
          changeOrigin: true,
          ...proxyConfig,
          pathRewrite: {
            '^/api': '/'
          }
        },
        '/usercenter/api': {
          target: '目标网址,如: https://www.baidu.com',
          changeOrigin: true,
          headers: {
            origin: 'www.baidu.com',
          },
        },
      },
    },
  },
  // css: {
  //   loaderOptions: {
  //     // pass options to sass-loader
  //     less: {
  //       loader: 'less-loader',
  //       options: { javascriptEnabled: true },
  //     },
  //   },
  // },
  chainWebpack: config => {
    config.plugins.delete('prefetch');
  },
};

```