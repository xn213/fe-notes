(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{461:function(t,s,a){"use strict";a.r(s);var n=a(43),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"vuejs-最佳实践"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vuejs-最佳实践"}},[t._v("#")]),t._v(" VueJs 最佳实践")]),t._v(" "),a("p",[t._v("经过一段时间对"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/",target:"_blank",rel:"noopener noreferrer"}},[t._v("VueJs官方文档"),a("OutboundLink")],1),t._v("以及网上其他相关vue资源的研究，我整理了一份最佳实践和样式指南列表，方便大家写出更正确、更容易让小伙伴接受的vue代码。")]),t._v(" "),a("p",[t._v("以下有几点是一些功能/优化相关，其他是VueJs命名约定和元素排序相关。更多详细信息可以直接到最下方的总结中查看。")]),t._v(" "),a("h2",{attrs:{id:"在组件销毁时用-off清除事件监听"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在组件销毁时用-off清除事件监听"}},[t._v("#")]),t._v(" 在组件销毁时用"),a("code",[t._v("$off")]),t._v("清除事件监听")]),t._v(" "),a("p",[t._v("当我们使用"),a("code",[t._v("$on")]),t._v("进行事件监听时，要记住在"),a("code",[t._v("destroyed()")]),t._v("钩子中用"),a("code",[t._v("$off")]),t._v("移除事件监听，可以有效防止内存泄漏。")]),t._v(" "),a("h2",{attrs:{id:"使用短横线分隔的形式命名事件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用短横线分隔的形式命名事件"}},[t._v("#")]),t._v(" 使用短横线分隔的形式命名事件")]),t._v(" "),a("p",[t._v("触发/监听自定义事件时，应该始终使用短横线分隔。为什么呢？因为无论如何最后事件名都会被自动转换为短横线分隔的形式。我们不应该用驼峰命名或者首字母大写的形式给监听事件命名，而是使用一种更清晰有意义的方式来声明一个事件：短横线分隔")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Emittingthis.$emit('my-event') // instead of myEvent")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Listening")]),t._v("\nv"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("on"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("my"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("event\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br")])]),a("h2",{attrs:{id:"不要在created生命周期和watch中调用同一个方法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不要在created生命周期和watch中调用同一个方法"}},[t._v("#")]),t._v(" 不要在"),a("code",[t._v("created")]),t._v("生命周期和"),a("code",[t._v("watch")]),t._v("中调用同一个方法")]),t._v(" "),a("p",[t._v("如果我们需要在组件初始化以及侦听属性变化时调用同一个方法，通常的做法像下面这样")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("watch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("myProperty")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("created")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nmethods"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'doing something...'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("p",[t._v("尽管上面这段代码看起来没什么问题，但"),a("code",[t._v("created")]),t._v("钩子里面执行的方法是多余的。我们可以把所需要执行的方法放到"),a("code",[t._v("watch")]),t._v("里面，避免在\t"),a("code",[t._v("created")]),t._v("钩子里写重复代码，那将会在组件实例化的时候触发多一次。 比如像下面这样：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("watch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  myProperty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    immediate"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 该回调将会在侦听开始之后被立即调用")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\nmethods"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n     console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'doing something...'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 更好的方案")]),t._v("\nwatch"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  myProperty"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    immediate"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("handler")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'doing something...'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 只用一次的方法没必要在methods里面声明了")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br")])]),a("h2",{attrs:{id:"不要忘记在v-for循环中使用key"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不要忘记在v-for循环中使用key"}},[t._v("#")]),t._v(" 不要忘记在"),a("code",[t._v("v-for")]),t._v("循环中使用"),a("code",[t._v("key")])]),t._v(" "),a("p",[t._v("最常见的做法是始终在模板循环中添加"),a("code",[t._v(":key")]),t._v("键。没有"),a("code",[t._v(":key")]),t._v("键的"),a("code",[t._v("v-for")]),t._v("循环在错误定位的时候比较麻烦，特别是动画相关")]),t._v(" "),a("h2",{attrs:{id:"使用-作为mixins的私有属性前缀"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用-作为mixins的私有属性前缀"}},[t._v("#")]),t._v(" 使用"),a("code",[t._v("$_")]),t._v("作为"),a("code",[t._v("mixins")]),t._v("的私有属性前缀")]),t._v(" "),a("p",[a("code",[t._v("Mixins")]),t._v("在代码复用上是个不错的方法，它可以将重复代码组合成一个单独的模块，然后按需引入。但是（极大可能），会出现一些问题。下面，我们重点解决属性名重复冲突的问题。")]),t._v(" "),a("p",[t._v("当我们将"),a("code",[t._v("mixin")]),t._v("混入组件时，也就是将"),a("code",[t._v("mixin")]),t._v("内的代码与组件自身的代码进行合并，如果碰到同名属性，会发生什么？组件优先级更高，组件属性的优先级自然更高。")]),t._v(" "),a("p",[t._v("如果我想让"),a("code",[t._v("mixin")]),t._v("代码的优先级更高，应该怎么办？我们无法分配优先级，但可以通过正确的命名规范来避免属性重叠或者覆盖。")]),t._v(" "),a("p",[t._v("为了区分"),a("code",[t._v("mixin")]),t._v("属性和组件的属性，我们通常使用"),a("code",[t._v("$_")]),t._v("作为属性前缀，为什么呢？主要有下面几个原因：")]),t._v(" "),a("ol",[a("li",[t._v("来自VueJs风格指南的建议")]),t._v(" "),a("li",[t._v("Vue 使用 "),a("code",[t._v("_")]),t._v(" 前缀来定义其自身的私有属性")]),t._v(" "),a("li",[a("code",[t._v("$")]),t._v("是Vue生态系统暴露给用户的特殊实例属性")])]),t._v(" "),a("p",[t._v("在"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/style-guide/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("风格指南 — Vue.js"),a("OutboundLink")],1),t._v("中，他们建议像这样给"),a("code",[t._v("mixin")]),t._v("添加属性名称："),a("code",[t._v("$_myMixin_updateUser")])]),t._v(" "),a("p",[t._v("相对于可读性，我发现给"),a("code",[t._v("mixin")]),t._v("添加名称有时候也会产生一些混淆。但这也取决于"),a("code",[t._v("mixin")]),t._v("本身代码，特殊情况或者开发人员本身。")]),t._v(" "),a("p",[t._v("通过添加一个简单的"),a("code",[t._v("$_")]),t._v("，就像"),a("code",[t._v("$_updateUser")]),t._v("一样，代码更具可读性，可以轻松分辨出组件私有属性和"),a("code",[t._v("mixin")]),t._v("的属性。")]),t._v(" "),a("h2",{attrs:{id:"mixin中使用的方法或者属性应该直接在mixin中读取"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mixin中使用的方法或者属性应该直接在mixin中读取"}},[t._v("#")]),t._v(" "),a("code",[t._v("mixin")]),t._v("中使用的方法或者属性应该直接在"),a("code",[t._v("mixin")]),t._v("中读取")]),t._v(" "),a("p",[t._v("继"),a("code",[t._v("mixin")]),t._v("上一点，还有另一点要注意的")]),t._v(" "),a("p",[t._v("假设我们创建了一个"),a("code",[t._v("mixin")]),t._v("，它使用了"),a("code",[t._v("this.language")]),t._v("属性，但这个属性并不是在"),a("code",[t._v("mixin")]),t._v("内部定义或获取的，那么混入了这个"),a("code",[t._v("mixin")]),t._v("的组件就必须包含这个"),a("code",[t._v("language")]),t._v("属性。")]),t._v(" "),a("p",[t._v("正如你已经知道的，这非常容易出错。为了提前避免错误的发生，"),a("code",[t._v("mixin")]),t._v("内使用到的属性或者方法最好只在"),a("code",[t._v("mixin")]),t._v("内部定义获取。不必担心重复获取属性的问题，因为VueJs在这点上很聪明，如果检测到重复读取属性，将会自动处理（大部分情况下是直接从Vuex里直接读取）。")]),t._v(" "),a("h2",{attrs:{id:"使用首字母大写命名或者短横线分隔命名单文件组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用首字母大写命名或者短横线分隔命名单文件组件"}},[t._v("#")]),t._v(" 使用首字母大写命名或者短横线分隔命名单文件组件")]),t._v(" "),a("p",[t._v("编辑器对首字母大写命名的集成度更好，对在常用IDE中实现自动完成/导入功能更友好。")]),t._v(" "),a("p",[t._v("如果我们想要避免文件系统大小写不敏感的问题，那么最好选择短横线分隔")]),t._v(" "),a("h2",{attrs:{id:"给基础组件名加前缀"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#给基础组件名加前缀"}},[t._v("#")]),t._v(" 给基础组件名加前缀")]),t._v(" "),a("p",[t._v("对于展示组件、纯组件，应该给它们加上前缀，以区别于其他的非纯组件。这可以大大提高项目可读性，提高团队协同开发体验。")]),t._v(" "),a("h2",{attrs:{id:"使用首字母大写命名命名js中的组件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用首字母大写命名命名js中的组件"}},[t._v("#")]),t._v(" 使用首字母大写命名命名JS中的组件")]),t._v(" "),a("p",[t._v("在JavaScript中，类和原型构造函数有默认约定使用首字母大写命名，在Vue组件中使用首字母大写命名有相同的意义。 如果我们只通过"),a("code",[t._v("Vue.component")]),t._v("使用全局组件定义，建议使用短横线分隔命名")]),t._v(" "),a("h2",{attrs:{id:"声明-prop名时使用驼峰命名，但在模板中应使用短横线分隔命名"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#声明-prop名时使用驼峰命名，但在模板中应使用短横线分隔命名"}},[t._v("#")]),t._v(" 声明 "),a("code",[t._v("prop")]),t._v("名时使用驼峰命名，但在模板中应使用短横线分隔命名")]),t._v(" "),a("p",[t._v("遵循每种语言的惯例：JavaScript（驼峰）和HTML（短横线分割），在JS中定义"),a("code",[t._v("prop")]),t._v("时用驼峰命名，在HTML中用于短横线分割命名。")]),t._v(" "),a("h2",{attrs:{id:"遵循样式指南中的组件选项顺序"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#遵循样式指南中的组件选项顺序"}},[t._v("#")]),t._v(" 遵循样式指南中的组件选项顺序")]),t._v(" "),a("p",[t._v("这样做可能看起来有点死板，但是在整个项目中对组件的所有选项执行相同的顺序，在查找内容和创建新组件时有很大帮助。")]),t._v(" "),a("p",[t._v("VueJs样式指南可以查看这里"),a("a",{attrs:{href:"https://cn.vuejs.org/v2/style-guide/index.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("风格指南 — Vue.js"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"不要在使用v-for的同一元素上使用v-if"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#不要在使用v-for的同一元素上使用v-if"}},[t._v("#")]),t._v(" 不要在使用"),a("code",[t._v("v-for")]),t._v("的同一元素上使用"),a("code",[t._v("v-if")])]),t._v(" "),a("p",[t._v("这种做法堪称性能杀手，列表数据越大，这种做法对性能的影响越大")]),t._v(" "),a("p",[t._v("用代码来看下问题吧，看以下场景：")]),t._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("ul")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("li")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-for")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("game in games"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("v-if")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("game.isActive"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v(":key")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("game.slug"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n    {{ game.title }}\n  "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("li")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("ul")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br")])]),a("p",[t._v("类似于执行下面的代码：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("games"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("map")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("game")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("game"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("isActive"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" game"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("title\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br")])]),a("p",[t._v("我们可以在这里看到，我们将不得不迭代整个"),a("code",[t._v("games")]),t._v("数组，无论"),a("code",[t._v("game.isActive")]),t._v("是否已经改变")]),t._v(" "),a("p",[t._v("在像Angular这样的其他框架中，这种做法不会被编译（"),a("code",[t._v("* ngIf")]),t._v("不能进入有"),a("code",[t._v("* ngFor")]),t._v("的同一元素）")]),t._v(" "),a("h2",{attrs:{id:"actions必须有返回值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#actions必须有返回值"}},[t._v("#")]),t._v(" "),a("code",[t._v("Actions")]),t._v("必须有返回值")]),t._v(" "),a("p",[t._v("这跟"),a("code",[t._v("async/await")]),t._v("和 Vuex的 "),a("code",[t._v("actions")]),t._v("有关")]),t._v(" "),a("p",[t._v("看以下例子：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Store")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SOME_ACTION")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 做点什么，需要一段时间才能执行完")]),t._v("\n   console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Action done'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Consuming action")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SOME_ACTION")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Do stuff now'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nThis will output"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do stuff now")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Action done")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("p",[t._v("发生这种情况是因为"),a("code",[t._v("await")]),t._v("不知道要等待什么，相反，如果我们实际上返回了"),a("code",[t._v("Promise.resolve（）")]),t._v("，则"),a("code",[t._v("await")]),t._v("将等待解析，然后再继续")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Store")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SOME_ACTION")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 做点什么，需要一段时间才能执行完")]),t._v("\n   console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Action done'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   Promise"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("resolve")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Consuming action")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("async")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("doSomething")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("await")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("dispatch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("SOME_ACTION")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'Do stuff now'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\nThis will output"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Action done")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do stuff now")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])]),a("h2",{attrs:{id:"在actions和getters中使用选择器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#在actions和getters中使用选择器"}},[t._v("#")]),t._v(" 在"),a("code",[t._v("actions")]),t._v("和"),a("code",[t._v("getters")]),t._v("中使用选择器")]),t._v(" "),a("p",[t._v("创建选择器时，不单只是在应用逻辑中使用，还要在"),a("code",[t._v("Vuex store")]),t._v("中使用")]),t._v(" "),a("p",[t._v("直接用代码会更容易解释：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 假设我们读取以下language属性exportconstlanguage = (state) => state.userConfig.language;")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 在其中一个actions中, 需要用到language:")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 不好的例子")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("GET_GAMES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" commit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rootState "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" lang "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" rootState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("userConfig"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("language"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do stuff...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 正确的例子")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("GET_GAMES")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" commit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" rootState "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" lang "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("language")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("rootState"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Do stuff...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br")])]),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[t._v("#")]),t._v(" 总结")]),t._v(" "),a("ol",[a("li",[t._v("在组件销毁时用"),a("code",[t._v("$off")]),t._v("清除事件监听")]),t._v(" "),a("li",[t._v("使用短横线分隔的形式命名事件")]),t._v(" "),a("li",[t._v("不要在"),a("code",[t._v("created")]),t._v("生命周期和"),a("code",[t._v("watch")]),t._v("中调用同一个方法")]),t._v(" "),a("li",[t._v("不要忘记在"),a("code",[t._v("v-for")]),t._v("循环中使用"),a("code",[t._v("key")])]),t._v(" "),a("li",[t._v("使用"),a("code",[t._v("$_")]),t._v("作为"),a("code",[t._v("mixins")]),t._v("的私有属性前缀")]),t._v(" "),a("li",[a("code",[t._v("mixin")]),t._v("中使用的方法或者属性应该直接在"),a("code",[t._v("mixin")]),t._v("中读取")]),t._v(" "),a("li",[t._v("使用首字母大写或者短横线分隔命名单文件组件")]),t._v(" "),a("li",[t._v("给基础组件名加前缀")]),t._v(" "),a("li",[t._v("使用首字母大写命名命名JS中的组件")]),t._v(" "),a("li",[t._v("声明 "),a("code",[t._v("prop")]),t._v("名时使用驼峰命名，但在模板中应使用短横线分隔命名")]),t._v(" "),a("li",[t._v("遵循样式指南中的组件选项顺序")]),t._v(" "),a("li",[t._v("不要在使用"),a("code",[t._v("v-for")]),t._v("的同一元素上使用"),a("code",[t._v("v-if")])]),t._v(" "),a("li",[a("code",[t._v("Actions")]),t._v("必须有返回值")]),t._v(" "),a("li",[t._v("在"),a("code",[t._v("actions")]),t._v("和"),a("code",[t._v("getters")]),t._v("中使用选择器")])]),t._v(" "),a("h3",{attrs:{id:"来源"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#来源"}},[t._v("#")]),t._v(" 来源")]),t._v(" "),a("ul",[a("li",[t._v("https://vuejs-tips.github.io/cheatsheet/")]),t._v(" "),a("li",[t._v("https://learn-vuejs.github.io/vue-patterns/patterns/")]),t._v(" "),a("li",[t._v("https://vuejs.org/v2/style-guide/")])]),t._v(" "),a("h3",{attrs:{id:"感谢"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#感谢"}},[t._v("#")]),t._v(" 感谢")]),t._v(" "),a("p",[t._v("这篇文章是由多个在同一项目中使用VueJs的开发人员合作完成的，遵循这份样式指南和最佳实践有助于让每个新开发人员都能尽快熟悉并上手项目代码。")]),t._v(" "),a("blockquote",[a("p",[t._v("原文地址： "),a("a",{attrs:{href:"https://blog.usejournal.com/vue-js-best-practices-c5da8d7af48d",target:"_blank",rel:"noopener noreferrer"}},[t._v("Vue.js best practices ✓ – Noteworthy - The Journal Blog"),a("OutboundLink")],1),a("br"),t._v("\n原文作者： Riccardo Polacci"),a("br"),t._v("\n译者： amandakelake")])])])}),[],!1,null,null,null);s.default=e.exports}}]);