module.exports = {
  title: '余生的前端笔记本',  // 设置网站标题
  description: '记录着很多很正常很平凡的代码', // 描述 首页标题下方
  dest: './dist',  // 设置输出目录
  base: '/fe-notes/',
  head: [
    ["link", { rel: "shortcut icon", href: "favicon.ico" }]
  ],
  markdown: {
    lineNumbers: false
  },
  themeConfig: {
    // 假定 GitHub。也可以是一个完整的 Github 网址  // https://github.com/xn213/fe-notes
    // 如果你的文档不在仓库的根部
    docsDir: 'fe-notes',
    // 可选，默认为 master
    docsBranch: 'gh-pages',
    // 默认为 true，设置为 false 来禁用
    editLinks: false,
    sidebarDepth: 1, // 侧栏目录读取标题到 ##
    nav: [
      { text: '大前端', link: '/Frontend/' },
      { text: '笔记本', link: '/notes/' },
      { text: 'Vue', link: '/Vue/VueBasic/VueRespond' },
      { text: 'React', link: '/React/' },
      { text: 'code工具', link: '/CodeTools/VSCode/VSCodeVue' },
      { text: '大杂烩', link: '/dzh/Explain' },
      { text: '余生博客', link: 'https://xn213.github.io/FrontEndNav/' },
      // { text: 'test', link: '/Test/' },
      // nav 下拉列表的配置
      // {
      //   text: '教程',
      //   items: [
      //     { text: 'Vue', link: '/Vue/VueRespond' },
      //     { text: 'React', link: '/React/' },
      //     { text: 'Vuepress', link: '/Vuepress/GithubPagesVuepressBlog' },
      //   ]
      // },
    ],
    sidebar: {
      '/Frontend/': [
        [ '/Frontend/Fetch', 'Fetch'],
        {
          title: 'Code Style', // 侧边栏组
          collapsable: true,
          children: [
            '/Frontend/CodeStyle/页面优化',
            '/Frontend/CodeStyle/代码可读性',
            '/Frontend/CodeStyle/Annotation',
          ]
        },
        {
          title: 'HTML',
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
            '/Frontend/Css/flex',
            '/Frontend/Css/The-Shapes-of-CSS',
            '/Frontend/Css/CssFonts_A-Z',
            '/Frontend/Css/Box-shadow',
            '/Frontend/Css/CssSecrets-note',
            '/Frontend/Css/ColorPicker',
          ]
        },
        {
          title: 'Js',
          collapsable: true,
          children: [
            '/Frontend/Js/Es6',
            '/Frontend/Js/this',
            '/Frontend/Js/JS让人疑惑的表达式及原理',
            '/Frontend/Js/EventLoop',
            '/Frontend/Js/prototype',
            '/Frontend/Js/WriteCode',
            '/Frontend/Js/JavaScript 复杂判断的更优雅写法',
          ]
        },
        {
          title: '项目',
          collapsable: true,
          children: [
            '/Frontend/Repo/特殊的IE8',
          ]
        },
      ],
      '/notes/': [
        '/notes/',
        '/notes/FrontendLearning',
        '/notes/CommonCodeSnippets',
        '/notes/BasicCodeSnippets',
        '/notes/Initialization',
        '/notes/jQuery',
        '/notes/CommonNaming',
        '/notes/UncommonCRT',
        '/notes/FrontendHodgepodge',
      ],
      '/Vue/': [
        {
          title: 'Vue 基础',
          collapsable: true,
          children: [
            '/Vue/VueBasic/VueRespond',
            '/Vue/VueBasic/VueJsBestPratice',
          ]
        },
        {
          title: 'VueJs 项目实践',
          collapsable: true,
          children: [
            '/Vue/VuePractice/vue.config.js',
            '/Vue/VuePractice/Axios',
          ]
        },
        {
          title: 'Vue Component',
          collapsable: true,
          children: [
            '/Vue/Component/VueComponentByValue',
            '/Vue/Component/HowToCodeBestComponents',
            '/Vue/Component/TongYongCom-notification',
          ]
        },
        {
          title: 'Vue Router',
          collapsable: true,
          children: [
            '/Vue/VueRouter/vue-router',
          ]
        },
        {
          title: 'Vuex',
          collapsable: true,
          children: [
            '/Vue/vuex/vuex',
            '/Vue/vuex/辅助工具函数的实践与解析',
            '/Vue/vuex/vuexothers',
          ]
        },
        {
          title: 'Vue 移动端',
          collapsable: true,
          children: [
            '/Vue/VueMobile/Vue在移动端的优化解决方案',
          ]
        },
        {
          title: 'Vue 遇到的问题',
          collapsable: true,
          children: [
            '/Vue/VueProblems/Vue填坑之路',
            '/Vue/VueProblems/Vue遇到的问题查缺补漏',
            '/Vue/VueProblems/Vue-cli3',
          ]
        },
        {
          title: 'Vue 源码',
          collapsable: false,
          children: [
            '/Vue/Vue/vue-prototype',
            '/Vue/Vue/vue-global-api',
            '/Vue/Vue/vue-ins',
            '/Vue/Vue/从源码学习之Vue面试题目',
            '/Vue/Vue/Vue源码中的高级js',
            '/Vue/Vue/vue-props',
            '/Vue/Vue/shared-util',
          ]
        },
      ],
      '/React/': [
        {
          title: 'React 基础',
          collapsable: true,
          children: [
            '/React/ReactBasic/react-com-lifecycle',
            '/React/ReactBasic/ref和DOM操作',
            '/React/ReactBasic/JSX',
          ]
        },
        {
          title: 'React Router',
          collapsable: true,
          children: [
            '/React/ReactRouter/react-router',
            '/React/ReactRouter/react-router-setting',
          ]
        },
      ],
      '/CodeTools/': [
        {
          title: 'VSCode',
          collapsable: true,
          children: [
            '/CodeTools/VSCode/VSCodeVue',
            '/CodeTools/VSCode/VSCode',
          ]
        },
        {
          title: 'Git',
          collapsable: true,
          children: [
            '/CodeTools/Git/git-commit-template',
            '/CodeTools/Git/git',
          ]
        },
        {
          title: 'Chrome',
          collapsable: true,
          children: [
            '/CodeTools/Chrome/ChromeExtension',
            '/CodeTools/Chrome/ChromeDebuggerTools',
          ]
        },
        {
          title: 'Github',
          collapsable: true,
          children: [
            '/CodeTools/Github/GithubEmojiList',
          ]
        },
        {
          title: 'VuePress',
          collapsable: true,
          children: [
            '/CodeTools/Vuepress/VuePress',
            '/CodeTools/Vuepress/GithubPagesVuepressBlog',
            '/CodeTools/Vuepress/VuepressBlog',
          ]
        },
        {
          title: 'Markdown',
          collapsable: true,
          children: [
            '/CodeTools/Markdown/MarkdownGrammar',
          ]
        }
      ],
      '/dzh/': [
        '/dzh/Explain',
        {
          title: '搜刮到的前端技术文章',
          collapsable: true,
          children: [
            '/dzh/Ajax',
            '/dzh/AjaxTechDetails',
            '/dzh/FrontendTools',
            '/dzh/CookieSession',
            '/dzh/Storage',
            '/dzh/BigInterview',
            '/dzh/GitDetail',
            '/dzh/HeadTags',
            '/dzh/MobileReg',
          ]
        },
        {
          title: 'Growing 成长档案',
          collapsable: true,
          children: [
            '/dzh/Growing/growing',
          ]
        },
      ],
    },
  }
}