# GithubPages + Vuepress 静态Blog速成教程

## 前言

[[toc]]

我相信每一个程序员入门时，都经历过搭建一个个人博客这样的阶段。确实这是一个好的练手项目，而搭建博客难度也可高可低，取决于个人目标。本文提供了一个选择，可基于 `GitHub` 的 `GitHub Pages` 功能 和 `Vuepress` 框架快速地搭建免费的markdown博客：

* 对于文档编写者来说，能更专注于写文章
* 对于文档开发者来说，一切皆Vue组件，能方便地自定义主题

> Vuepress官网：[https://vuepress.vuejs.org/zh/](https://vuepress.vuejs.org/zh/)

## 基本工具

1. node.js以及npm包管理工具： [https://nodejs.org/en/](https://nodejs.org/en/)
2. git工具：[https://git-scm.com/downloads](https://git-scm.com/downloads)

## 构建基本项目结构

1. 新建一个名为 `blog-demo` 的文件夹，命令行进入到该文件夹目录，输入命令：

```bash
# 按默认配置初始化一个项目，此时会在当前目录下生成 package.json 文件
npm init -y
```

1. 将 `VuePress` 作为一个本地依赖安装

```bash
npm install -D vuepress
```

1. 在 `package.json` 里的 `scripts` 中添加如下代码，不需要修改其它代码

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

1. 在项目根目录下，新建 `docs` 文件夹

```bash
mkdir docs
```

1. 新建一个 `markdown` 文件

```bash
echo '# Hello VuePress!' > docs/README.md
```

1. 输入命令启动项目，在浏览器中访问 `http://localhost:8080/` 即可预览效果

```bash
npm run docs:dev
```

## 基本配置

现在我们已经构建出了最基本的项目结构，并且可以在浏览器中预览到 `docs` 目录下的 `README.md` 文件的效果，该文件即是我们网站的首页，如图所示：

![](https://upload-images.jianshu.io/upload_images/2917277-1d660f2741cbe837?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

基本效果

然而如果没有任何配置，用户将无法在网站上自由导航。因此，为了更好地自定义我们的网站，我们接着在 `docs` 目录下新建 `.vuepress` 文件夹，执行命令如下：

```bash
# 新建 .vuepress 文件夹
mkdir docs\.vuepress
```

接着在 `.vuepress` 文件夹下新建 `config.js` 文件,这里的 `config.js` 便是一个 `Vuepress` 网站必要的配置文件，在其中添加如下代码：

```java
module.exports = {
  base: '/blog-demo/',
  title: 'blog-demo',
  description: 'Vuepress blog demo'
}
```

其中配置项的含义为：

* base：站点的基础路径，它的值应当总是以斜杠开始，并以斜杠结束。这里设置为 `/blog-demo/` ，我们再次在本地运行项目，访问路径就需要变更为 `http://localhost:8080/blog-demo/`
* title：网站的标题
* description：网站的描述

## 默认主题配置

`Vuepress` 提供了一个默认主题，让我们不必自己去从零实现复杂的 `markdown` 文件渲染、目录结构等，直接按照规则去使用它即可。如果你想自定义自己的主题，请查看官方文档：[Vuepress-开发主题](https://vuepress.vuejs.org/zh/theme/writing-a-theme.html)。

#### 首页

默认主题提供了一个首页的布局，想要使用它，需要在你的根级 `README.md` 以格式 [YAML front matter](https://vuepress.vuejs.org/zh/guide/markdown.html#front-matter) 指定 home: true。因此，将我们最初创建的 `README.md` 修改一下：

```bash
---
home: true
heroImage: /vue-logo.png
heroText: blog-demo
tagline: 博客示例
actionText: 快速上手 →
actionLink: /
features:
- title: 简洁至上
  details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
- title: Vue驱动
  details: 享受 Vue + webpack 的开发体验，在 Markdown 中使用 Vue 组件，同时可以使用 Vue 来开发自定义主题。
- title: 高性能
  details: VuePress 为每个页面预渲染生成静态的 HTML，同时在页面被加载的时候，将作为 SPA 运行。
---
```

* heroImage: 首页图片，图片放置在 `.vupress/public` 文件夹下，若没有该文件夹则自己创建一个，保存一张你想要的首页图片，并在此处引用。
* 其它参数请参考官方文档：[Vuepress-默认主题首页](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E9%A6%96%E9%A1%B5)

#### 导航栏

导航栏可能包含你的页面标题、搜索框、 导航栏链接、多语言切换、仓库链接，它们均取决于你的配置。在 `.vupress/config.js` 文件添加一些导航栏链接：

```java
module.exports = {
    themeConfig: {
      // 你的GitHub仓库，请正确填写
      repo: 'https://github.com/xxxxxxx/blog-demo',
      // 自定义仓库链接文字。
      repoLabel: 'My GitHub',
      nav: [
        { text: 'Home', link: '/' },
        { text: 'FirstBlog', link: '/blog/FirstBlog.md' }
      ]
    }
}
```

接着，我们在 `docs` 目录下新建 `blog` 文件夹，在 `blog` 目录下创建 `/blog/FirstBlog.md` 作为我们第一篇博客的内容：

```bash
# 我的第一篇博客
My First Blog
```

我们再在项目根目录，即 `blog-demo` 下，输入命令 `npm run docs:dev` ，浏览器中访问 `http://localhost:8080/blog-demo/` 查看页面效果，点击页面右上角的`FirstBlog` 可以看到我们第一篇博客：

![](https://upload-images.jianshu.io/upload_images/2917277-e14e78cc9598a581?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

本地效果预览

#### 侧边栏

最后我们配置侧边栏，让用户体验更好一些，在 `.vupress/config.js` 文件添加一些代码：

```java
module.exports = {
  themeConfig: {
    sidebar: [
      ['/', '首页'],
      ['/blog/FirstBlog.md', '我的第一篇博客']
    ]
  }
}
```

## 本地预览

至此我们已经完成了一个最简单的博客，再次运行项目，点击首页的按钮 `快速上手` ，我们可以看到：

![](https://upload-images.jianshu.io/upload_images/2917277-b069b0a0c75a4c37?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

我的第一篇博客

---

## **在 VuePress 中注册组件**

在 VuePress 中编写 Vue 代码，和我们通常的编写[单文件](https://cn.vuejs.org/v2/guide/single-file-components.html#ad)的方式一致，有些时候我们有可能需要使用 Vue 的 UI 组件库。例如 [Element](http://element.eleme.io/)，[Mint](http://mint-ui.github.io/docs/#/!/zh-cn)等，通常我们在项目中使用这些 UI 组件库的时候，我们都会在 main.js 或 botostrap.js 文件中统一注册。好在 VuePress 中也支持这种功能，我们可以通过创建一个 .vuepress/enhanceApp.js 文件来做一些应用级别的配置，这个文件 exprot default 一个钩子函数，在这个钩子中你可以做一些特殊处理，例如添加全局路由钩子，注册外部组件库。

```bash
// .vuepress/enhanceApp.js
// 全局注册 Element 组件库
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

export default ({
 Vue,
 options,
 router
}) => {
 Vue.use(Element)
}
```

在 Vue 正常开发中，有些时候我们可能会需要做一些自定义的组件，在 VuePress 中我们可以在` .vuepress/components `目录中编写我们的自定义组件，VuePress 在编译时遍历该目录中所有的 `*.vue`文件，并见它们注册为全局组件。

```bash
// 注册一个自定义组件
// docs/.vuepress/components/hello.vue
<template>
 <div class="cpt-hello">Hello VuePress Demo</div>
</template>
```

这样我们在 Markdown 文件编写 Vue 代码的时候就不需要注册注册这些组件，边可以直接在 Markdown 中使用了。

```bash
// docs/.vuepress/vue/README.md
<template>
 <div class="test-demo">
  {{ msg }}
  <my-hello></my-hello>
  <el-button>button</el-button>
 </div>
</template>

<script>
export default {
 data () {
  return {
   msg: 'Hello VuePress!'
  }
 }
}
</script>
```

## **部署到 Github pages**  (-1)

当我们将文档写好后就到了我们最关心的地方了，怎么将打包后的代码推送到远程仓库的 `gh-pages` 分支上，网上应该有很多文章描述怎么做，但是很多方法比较麻烦，还好有工具 `gh-pages` 已经为我们解决了这个麻烦了。

```bash
// 1.下载 gh-pages 包
npm install -D gh-pages

// 2. 在 package.json 文件上添加脚本命令
"scripts": {
 "docs:dev": "vuepress dev docs",
 "docs:build": "vuepress build docs",
 // 上面我修改了 VuePress 的输出目录，所以您如果没有修改 .vuepress/config.js
 // 的 dest 属性，应该将这里的 dist 改为 .vuepress/dist
 "deploy": "gh-pages -d dist",
 "deploy:build": "npm run docs:build && gh-pages -d dist"
}

// 3. 打包并推送到 gh-pages 分支
// 注意: 使用配置了 远端仓库的 git 进行打包部署
//       使用cmd可能报错: Failed to get remote.origin.url (task must either be run in a git repository with a configured origin remote or must be configured with the "repo" option).

npm run deploy:build

// 4.打开你的 Github pages, 地址是 https://<yourname>.github.io/<repo>
```

[https://xn213.github.io/fe-notes](https://xn213.github.io/fe-notes)同与点击(余生的前端笔记本)

---

## 我的 config.js 配置, 及添加一键部署文件 deploy.sh

```js
/**
 *
 * !!注意!!: .sh 文件部署到 github 需要 git 已配置好 github 账号,
 *           且 git 已打开当前目录在当前目录下!
 */
module.exports = {
  title: '余生的前端笔记本',  // 设置网站标题
  description: '记录着很多很正常很平凡的代码', // 描述 首页标题下方
  dest: './dist',  // 设置输出目录
  base: '/fe-notes/',
  themeConfig: {
    // 假定 GitHub。也可以是一个完整的 Github 网址  // https://github.com/xn213/fe-notes
    repo: 'https://github.com/xn213/fe-notes',
    // 如果你的文档不在仓库的根部
    docsDir: 'fe-notes',
    // 可选，默认为 master
    docsBranch: 'gh-pages',
    // 默认为 true，设置为 false 来禁用
    editLinks: false,
    nav: [
      { text: '大前端', link: '/Frontend/' },
      { text: '笔记本', link: '/notes/' },
      { text: 'Vue', link: '/course/Vue/' },
      { text: 'React', link: '/course/React/' },
      { text: 'code工具', link: '/CodeTools/VSCode/VSCodeVue' },
      { text: '大杂烩', link: '/dzh/Explain' },
      { text: '余生博客', link: 'https://xn213.github.io/FrontEndNav/' },
      // { text: 'test', link: '/Test/' },
      // nav 下拉列表的配置
      // {
      //   text: '教程',
      //   items: [
      //     { text: 'Vue', link: '/course/Vue/VueRespond' },
      //     { text: 'React', link: '/course/React/' },
      //     { text: 'Vuepress', link: '/course/Vuepress/GithubPagesVuepressBlog' },
      //   ]
      // },
    ],
    sidebar: {
      '/Frontend/': [
        '/Frontend/代码可读性',
        '/Frontend/页面优化',
        '/Frontend/Fetch',
        {
          title: 'HTML', // 侧边栏组
          collapsable: true,
          children: [
            '/Frontend/HTML/HTML',
            '/Frontend/HTML/HTML5',
          ]
        },
        {
          title: 'Css',
          collapsable: true,
          children: [
            '/Frontend/Css/The-Shapes-of-CSS',
            '/Frontend/Css/CssFonts_A-Z',
          ]
        },
        {
          title: 'Js',
          collapsable: true,
          children: [
            '/Frontend/Js/this',
            '/Frontend/Js/EventLoop',
            '/Frontend/Js/prototype',
            '/Frontend/Js/WriteCode',
          ]
        },
      ],
    },
    sidebarDepth: 1 // sidebar目录 读取标题到 ##
  }
}
```

``` bash
当然也可以新建文件deploy.sh 进行一键打包部署
//deploy.sh
# 确保脚本抛出遇到的错误
set -e
# 生成静态文件/dist && 使用 gh-pages 部署到config.js中设置的对应仓库 gh-papes 分支下
npm run deploy:build
```

---

## 部署 (-2)

最后一步，我们需要将代码部署到GitHub Pages，具体请参照文档：[Vupress-部署](https://vuepress.vuejs.org/zh/guide/deploy.html#github-pages)。

1、首先确定你的项目是否满足以下条件：

* 文档放置在项目的 docs 目录中
* 使用的是默认的构建输出位置
* VuePress 以本地依赖的形式被安装到你的项目中，在根目录的 `package.json`文件中有如下两段代码：

```cpp
// 配置npm scripts
"scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
 }

// VuePress 以本地依赖的形式被安装
"devDependencies": {
    "vuepress": "^0.14.8"
}
```

2、在github上创建一个名为 `blog-demo` 的仓库，并将你的代码提交到github上。如果你对git不熟悉，请先阅读：[Git教程-廖雪峰的官方网站](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)

3、在 `docs/.vuepress/config.js` 文件中设置正确的 base。

如果打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 base 设置为 `/<REPO>/`，此处我设置为 `/blog-demo/` 。

4、在项目根目录中，创建一个如下的 deploy.sh 脚本文件，请自行修改github仓库地址

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

5、双击 `deploy.sh` 运行脚本，会自动在我们的 `GitHub` 仓库中，创建一个名为 `gh-pages` 的分支，而我们要部署到 `GitHub Pages` 的正是这个分支。

![](https://upload-images.jianshu.io/upload_images/2917277-628f5af566791ba6?imageMogr2/auto-orient/strip%7CimageView2/2/w/316/format/webp)

分支提交

6、这是最后一步了，在 `GitHub` 项目点击 `Setting` 按钮，找到 `GitHub Pages` - `Source`，选择 `gh-pages` 分支，点击 `Save` 按钮后，静静地等待它部署完成即可。

* 部署效果预览：<https://olewahhh.github.io/blog-demo/>
* GitHub仓库地址：<https://github.com/olewaHHH/blog-demo>

![](https://upload-images.jianshu.io/upload_images/2917277-d9c58bf677fea5be.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1000/format/webp)

Setting

![](https://upload-images.jianshu.io/upload_images/2917277-50bb68a41bd57756?imageMogr2/auto-orient/strip%7CimageView2/2/w/759/format/webp)

---

**总结**

相比较 Hexo 而言 VuePress 上手更加容易，功能也更强大，例如在 VuePress 可以注册自定义组件，而且 VuePress 中编写 Vue 和平时一样学习成本几乎为零。所以如果您正在开源一款 Vue 相关的库或是其他项目，您都可以使用 VuePress 作为您的文档编辑工具。虽然并没有完全将 VuePress 内容讲完，学完该篇文章相信你可以对 VuePress 有个大概的了解，您至少可以快速搭建一个博客，如果您想对 VuePress 有更多了解，请参考[Vuepress 中文 API](https://vuepress.vuejs.org/zh/)。
