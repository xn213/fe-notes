module.exports = {
  title: '余生的前端笔记本', // 设置网站标题
  description: '记录平凡', // 描述 首页标题下方
  dest: './dist',  // 设置输出目录
  base: '/fe-notes/', // 静态资源需处理 github.io/fe-notes/
  head: [['link', { rel: 'shortcut icon', href: 'favicon.ico' }]],
  markdown: {
    lineNumbers: true,
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
      // { text: 'test', link: '/Test/' }, // 示例
      // nav 带下拉列表的配置 示例
      // {
      //   text: '教程',
      //   items: [
      //     { text: 'React', link: '/React/' },
      //     { text: 'Vue', link: '/Vue/VueRespond' },
      //   ]
      // },
      { text: '计算机', link: '/Computer/' },
      { text: '大前端', link: '/Frontend/' },
      { text: 'Notes', link: '/Notes/' },
      { text: 'Interview', link: '/Interview/' },
      { text: 'JS', link: '/JS/' },
      { text: 'CSS', link: '/CSS/' },
      { text: 'Vue', link: '/Vue/VueBasic/VueRespond' },

      { text: 'React', link: '/React/' },
      { text: 'CodeTools', link: '/CodeTools/VSCode/VSCodeVue' },
      { text: '大杂烩', link: '/DZH/Explain' },
    ],
    sidebar: {
      '/Computer/': [
        ['/Computer/Fetch', 'Fetch'],
        {
          title: 'Computer', // 侧边栏组
          collapsable: true,
          children: [
            '/Computer/',
            '/Computer/',
            '/Computer/',
          ],
        },
        {
          title: 'Fetch',
          collapsable: true,
          children: ['/Computer/Fetch'],
        },
      ],
      '/Frontend/': [
        ['/Frontend/Fetch', 'Fetch'],
        {
          title: 'Code Style', // 侧边栏组
          collapsable: true,
          children: [
            '/Frontend/CodeStyle/页面优化',
            '/Frontend/CodeStyle/代码可读性',
            '/Frontend/CodeStyle/Annotation',
          ],
        },
        {
          title: 'HTML',
          collapsable: true,
          children: ['/Frontend/HTML/HTML', '/Frontend/HTML/HTML5'],
        },
        {
          title: 'CSS',
          collapsable: true,
          children: [
            '/Frontend/CSS/Flex',
            '/Frontend/CSS/The-Shapes-of-CSS',
            '/Frontend/CSS/CssFonts_A-Z',
            '/Frontend/CSS/Box-shadow',
            '/Frontend/CSS/CssSecrets-note',
            '/Frontend/CSS/Less&Scss@mixin',
            '/Frontend/CSS/ColorPicker',
          ],
        },
        {
          title: 'JS',
          collapsable: true,
          children: [
            '/Frontend/JS/ES6',
            '/Frontend/JS/This',
            '/Frontend/JS/JS让人疑惑的表达式及原理',
            '/Frontend/JS/EventLoop',
            '/Frontend/JS/Prototype',
            '/Frontend/JS/WriteCode',
            '/Frontend/JS/JavaScript 复杂判断的更优雅写法',
          ],
        },
        {
          title: '项目',
          collapsable: true,
          children: ['/Frontend/Repo/特殊的IE8'],
        },
      ],
      '/Notes/': [
        '/Notes/',
        '/Notes/FrontendLearning',
        '/Notes/CommonCodeSnippets',
        '/Notes/BasicCodeSnippets',
        '/Notes/Initialization',
        '/Notes/jQuery',
        '/Notes/CommonNaming',
        '/Notes/UncommonCRT',
        '/Notes/FrontendHodgepodge',
      ],
      '/Interview/': [
        ['/Interview/',],
        {
          title: 'Interview', // 侧边栏组
          collapsable: true,
          children: [
            '/Interview/',
            '/Interview/',
            '/Interview/',
          ],
        },
        {
          title: 'Fetch',
          collapsable: true,
          children: ['/Interview/'],
        },
      ],
      '/JS/': [
        ['/JS/ES6', 'ES6'],
        {
          title: 'JS', // 侧边栏组
          collapsable: true,
          children: [
            '/JS/ES6',
            '/JS/ES6',
            '/JS/ES6',
          ],
        },
        {
          title: 'javascript',
          collapsable: true,
          children: ['/JS/ES6'],
        },
      ],
      '/CSS/': [
        ['/CSS/Flex', 'Flex'],
        {
          title: 'CSS', // 侧边栏组
          collapsable: true,
          children: [
            '/CSS/Flex',
            '/CSS/Flex',
            '/CSS/Less&Scss@mixin',
            '/CSS/Flex',
          ],
        },
        {
          title: 'CSS',
          collapsable: true,
          children: ['/CSS/Flex'],
        },
      ],
      '/Vue/': [
        {
          title: 'Vue 基础',
          collapsable: true,
          children: ['/Vue/VueBasic/VueRespond', '/Vue/VueBasic/VueJsBestPratice'],
        },
        {
          title: 'VueJs 项目实践',
          collapsable: true,
          children: ['/Vue/VuePractice/vue.config.js', '/Vue/VuePractice/Axios'],
        },
        {
          title: 'Vue Component',
          collapsable: true,
          children: [
            '/Vue/Component/VueComponentByValue',
            '/Vue/Component/HowToCodeBestComponents',
            '/Vue/Component/TongYongCom-notification',
          ],
        },
        {
          title: 'Vue Router',
          collapsable: true,
          children: ['/Vue/VueRouter/vue-router'],
        },
        {
          title: 'Vuex',
          collapsable: true,
          children: [
            '/Vue/vuex/vuex',
            '/Vue/vuex/辅助工具函数的实践与解析',
            '/Vue/vuex/vuexothers',
          ],
        },
        {
          title: 'Vue 移动端',
          collapsable: true,
          children: ['/Vue/VueMobile/Vue在移动端的优化解决方案'],
        },
        {
          title: 'Vue 遇到的问题',
          collapsable: true,
          children: [
            '/Vue/VueProblems/Vue填坑之路',
            '/Vue/VueProblems/Vue遇到的问题查缺补漏',
            '/Vue/VueProblems/Vue-cli3',
          ],
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
          ],
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
          ],
        },
        {
          title: 'React Router',
          collapsable: true,
          children: ['/React/ReactRouter/react-router', '/React/ReactRouter/react-router-setting'],
        },
      ],
      '/CodeTools/': [
        {
          title: 'VSCode',
          collapsable: true,
          children: ['/CodeTools/VSCode/VSCodeVue', '/CodeTools/VSCode/VSCode'],
        },
        {
          title: 'Git',
          collapsable: true,
          children: ['/CodeTools/Git/git-commit-template', '/CodeTools/Git/git'],
        },
        {
          title: 'Chrome',
          collapsable: true,
          children: ['/CodeTools/Chrome/ChromeExtension', '/CodeTools/Chrome/ChromeDebuggerTools'],
        },
        {
          title: 'Github',
          collapsable: true,
          children: ['/CodeTools/Github/GithubEmojiList'],
        },
        {
          title: 'VuePress',
          collapsable: true,
          children: [
            '/CodeTools/Vuepress/VuePress',
            '/CodeTools/Vuepress/GithubPagesVuepressBlog',
            '/CodeTools/Vuepress/VuepressBlog',
          ],
        },
        {
          title: 'Markdown',
          collapsable: true,
          children: ['/CodeTools/Markdown/MarkdownGrammar'],
        },
      ],
      '/DZH/': [
        '/DZH/Explain',
        {
          title: '搜刮到的前端技术文章',
          collapsable: true,
          children: [
            '/DZH/Ajax',
            '/DZH/AjaxTechDetails',
            '/DZH/FrontendTools',
            '/DZH/CookieSession',
            '/DZH/Storage',
            '/DZH/BigInterview',
            '/DZH/GitDetail',
            '/DZH/HeadTags',
            '/DZH/MobileReg',
          ],
        },
        {
          title: 'Growing 成长档案',
          collapsable: true,
          children: ['/DZH/Growing/growing'],
        },
      ],
    },
  },
}
