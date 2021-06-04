(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{366:function(e,t,s){"use strict";s.r(t);var n=s(43),a=Object(n.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"css3中flex弹性布局的灵活运用"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css3中flex弹性布局的灵活运用"}},[e._v("#")]),e._v(" CSS3中Flex弹性布局的灵活运用")]),e._v(" "),s("h2",{attrs:{id:"前言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#前言"}},[e._v("#")]),e._v(" 前言")]),e._v(" "),s("p",[e._v("Flex（Flexible Box），意为”弹性布局”。“弹性”，顾名思义，就是具有弹簧的特性啦，能够自由的伸缩（有点自适应的意思啦）。")]),e._v(" "),s("p",[s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603141528.png",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("其实Flex并不是最近才出现的，而是早在十年前它就被提出。2009年，W3C提出了一种新的方案—-Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。")]),e._v(" "),s("p",[s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603141517.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("h2",{attrs:{id:"flex布局如何使用？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flex布局如何使用？"}},[e._v("#")]),e._v(" Flex布局如何使用？")]),e._v(" "),s("p",[e._v("任何一个容器都可以指定为Flex布局")]),e._v(" "),s("div",{staticClass:"language-prism line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v(".box{\n  display: flex;\n}\n```预览\n\n行内元素也可以使用Flex布局\n\n```prism\n.box{\n  display: inline-flex;\n}\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br"),s("span",{staticClass:"line-number"},[e._v("4")]),s("br"),s("span",{staticClass:"line-number"},[e._v("5")]),s("br"),s("span",{staticClass:"line-number"},[e._v("6")]),s("br"),s("span",{staticClass:"line-number"},[e._v("7")]),s("br"),s("span",{staticClass:"line-number"},[e._v("8")]),s("br"),s("span",{staticClass:"line-number"},[e._v("9")]),s("br"),s("span",{staticClass:"line-number"},[e._v("10")]),s("br"),s("span",{staticClass:"line-number"},[e._v("11")]),s("br")])]),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603142516.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("h2",{attrs:{id:"flex概念知识"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flex概念知识"}},[e._v("#")]),e._v(" Flex概念知识")]),e._v(" "),s("p",[e._v("采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。")]),e._v(" "),s("p",[s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603141529.png",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[s("strong",[e._v("容器默认存在两根轴：")])]),e._v(" "),s("p",[e._v("水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。"),s("br"),e._v("\n项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。")]),e._v(" "),s("p",[e._v("是不是感觉又学到了？概念的东西了解就好了，这个不用记忆，不会跟上学背课文一样，还考试了。")]),e._v(" "),s("h2",{attrs:{id:"flex容器属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#flex容器属性"}},[e._v("#")]),e._v(" Flex容器属性")]),e._v(" "),s("p",[s("strong",[e._v("一、flex-direction：决定项目（item）的排列方向")]),s("br"),e._v("\nflex-direction有四个值："),s("br"),e._v("\n1、row（默认值）：主轴为水平方向，起点在左端。"),s("br"),e._v("\n2、row-reverse：主轴为水平方向，起点在右端。"),s("br"),e._v("\n3、column：主轴为垂直方向，起点在上沿。"),s("br"),e._v("\n4、column-reverse：主轴为垂直方向，起点在下沿。")]),e._v(" "),s("p",[e._v("上方那个示例图，我们稍稍变阵一下，主轴设置为垂直方向，就会出现下图布局。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603144014.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("还可以设置主轴为垂直方向，起点在下沿。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603144211.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("是不是觉得以后布局就用他（Flex）了？")]),e._v(" "),s("p",[s("strong",[e._v("二、flex-wrap")]),s("br"),e._v("\n默认情况下，item都排在一条线（又称”轴线”）上。"),s("code",[e._v("flex-wrap")]),e._v("属性定义了，如果一条轴线排不下，item的换行方式。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603144213.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("flex-wrap有三个值："),s("br"),e._v("\n1、nowrap（默认）：不换行"),s("br"),e._v("\n2、wrap：换行，第一行在上方。"),s("br"),e._v("\n3、wrap-reverse：换行，第一行在下方。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603154441.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[s("strong",[e._v("三、flex-flow")]),s("br"),e._v("\nflex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。")]),e._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[e._v(".box {\n  flex-flow: <flex-direction> <flex-wrap>;\n}\n")])]),e._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[e._v("1")]),s("br"),s("span",{staticClass:"line-number"},[e._v("2")]),s("br"),s("span",{staticClass:"line-number"},[e._v("3")]),s("br")])]),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603154732.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[s("strong",[e._v("四、justify-content：定义了item在主轴上的对齐方式")]),s("br"),e._v("\njustify-content有五个值："),s("br"),e._v("\n1、flex-start（默认值）：左对齐"),s("br"),e._v("\n2、flex-end：右对齐"),s("br"),e._v("\n3、center： 居中"),s("br"),e._v("\n4、space-between：两端对齐，项目之间的间隔都相等。"),s("br"),e._v("\n5、space-around：每个item两侧的间隔相等。所以，item之间的间隔比item与边框的间隔大一倍。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603155550.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[s("strong",[e._v("五、align-items：Item在交叉轴上如何对齐")]),s("br"),e._v("\n1、flex-start：交叉轴的起点对齐。"),s("br"),e._v("\n2、flex-end：交叉轴的终点对齐。"),s("br"),e._v("\n3、center：交叉轴的中点对齐。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603175411.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("4、baseline: 项目的第一行文字的基线对齐。")]),e._v(" "),s("p",[s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603175454.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("5、stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。")]),e._v(" "),s("p",[s("strong",[e._v("六、align-content：多根轴线的对齐方式")]),s("br"),e._v("\n多根轴线如何出现？宽度超出，换行后就会有多根轴线了。")]),e._v(" "),s("p",[e._v("1、flex-start：与交叉轴的起点对齐。"),s("br"),e._v("\n2、flex-end：与交叉轴的终点对齐。"),s("br"),e._v("\n3、center：与交叉轴的中点对齐。"),s("br"),e._v("\n4、space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。"),s("br"),e._v("\n5、space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。"),s("br"),e._v("\n6、stretch（默认值）：轴线占满整个交叉轴。")]),e._v(" "),s("p",[e._v("对比一下添加"),s("code",[e._v("align-content")]),e._v("和没有"),s("code",[e._v("align-content")]),e._v("的区别："),s("br"),e._v("\n示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603164729.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("h2",{attrs:{id:"项目-item-的属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#项目-item-的属性"}},[e._v("#")]),e._v(" 项目(Item)的属性")]),e._v(" "),s("p",[s("strong",[e._v("一、order")]),s("br"),e._v("\nItem的排列顺序。数值越小，排列越靠前，默认为0。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603165622.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("赋予item，一个排序值，根据这个值进行排序。没有设置值的默认是0。")]),e._v(" "),s("p",[s("strong",[e._v("二、flex-grow")]),s("br"),e._v("\n定义Item的放大比例，默认为0，即如果存在剩余空间，也不放大。"),s("strong",[e._v("意思就是将100%宽/高按什么比例分。")]),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603170810.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("举例：如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。（看上图示例）")]),e._v(" "),s("p",[s("strong",[e._v("三、flex-shrink")]),s("br"),e._v("\n定义了Item的缩小比例，默认为1，即如果空间不足，该Item将缩小")]),e._v(" "),s("p",[s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603171831.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("看上图：3个item的宽度和:100+200+200=500px，超出了box（400px）的宽度（超出了100px的宽），这时候item1/item2都设置了flex-shrink为0，而item3设置了flex-shrink为1，所以，宽度不够时，item3将收缩，这里item3实际的宽度就是100px。")]),e._v(" "),s("p",[e._v("再看下图：")]),e._v(" "),s("p",[s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603172239.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("item1/item3设置flex-shrink为1，而item2的flex-shrink为0，也就是说，此时宽度超出后，将由item1、item3来等比缩小宽度，item2保持原有宽度。")]),e._v(" "),s("p",[s("strong",[e._v("四、flex-basis")]),s("br"),e._v(" "),s("code",[e._v("flex-basis")]),e._v("属性定义了在分配多余空间之前，Item占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即Item的本来大小。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603174420.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("这个属性可以直接设置宽高代替，如上图注释部分。")]),e._v(" "),s("p",[s("strong",[e._v("五、flex")]),s("br"),e._v("\nflex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。")]),e._v(" "),s("p",[e._v("所以最前面的几个示例，都直接写的flex，其实flex就flex-grow, flex-shrink 和 flex-basis的简写。")]),e._v(" "),s("p",[s("strong",[e._v("六、align-self")]),s("br"),e._v(" "),s("code",[e._v("align-self")]),e._v("属性允许单个Item有与其他Item不一样的对齐方式，可覆盖"),s("code",[e._v("align-items")]),e._v("属性。默认值为auto，表示继承父元素的"),s("code",[e._v("align-items")]),e._v("属性，如果没有父元素，则等同于stretch。")]),e._v(" "),s("p",[e._v("示例："),s("br"),e._v(" "),s("img",{attrs:{src:"http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603175657.jpg",alt:"CSS3中Flex弹性布局该如何灵活运用？"}})]),e._v(" "),s("p",[e._v("这样，就会把容器的"),s("code",[e._v("align-items")]),e._v("，覆盖掉。")]),e._v(" "),s("h2",{attrs:{id:"总结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),s("p",[e._v("看完上面内容，是不是发现"),s("code",[e._v("Flex")]),e._v("基本上可以搞定大部分的前端布局？确实是这样，它就是这么强大，这也是他广受大家喜爱的一个重要原因，如果不考虑低版本浏览器兼容问题，我相信，float大家应该用的越来越少了。")])])}),[],!1,null,null,null);t.default=a.exports}}]);