(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{388:function(t,s,a){"use strict";a.r(s);var n=a(43),r=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"ajax的全面总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ajax的全面总结"}},[t._v("#")]),t._v(" Ajax的全面总结")]),t._v(" "),a("h4",{attrs:{id:"ajax在前端开发中有着举足轻重的地位，关于ajax的使用和注意事项一直是一个重要的话题，借此机会，本文希望对ajax做一个全面的总结，彻底揭开ajax的神秘面纱。"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ajax在前端开发中有着举足轻重的地位，关于ajax的使用和注意事项一直是一个重要的话题，借此机会，本文希望对ajax做一个全面的总结，彻底揭开ajax的神秘面纱。"}},[t._v("#")]),t._v(" "),a("strong",[t._v("Ajax")]),t._v("在前端开发中有着举足轻重的地位，关于Ajax的使用和注意事项一直是一个重要的话题，借此机会，本文希望对Ajax做一个全面的总结，彻底揭开Ajax的神秘面纱。")]),t._v(" "),a("h2",{attrs:{id:"一-什么是ajax"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#一-什么是ajax"}},[t._v("#")]),t._v(" 一.什么是Ajax")]),t._v(" "),a("p",[t._v("Ajax(Asynchronous JavaScript and XML),可以理解为JavaScript执行异步网络请求。通俗的理解的话就是，如果没有Ajax技术，改变网页的一小部分（哪怕是一行文字、一张图片）都需要重新加载一次整个页面，"),a("strong",[t._v("而有了Ajax之后，就可以实现在网页不跳转不刷新的情况下，在网页后台提交数据，部分更新页面内容。")])]),t._v(" "),a("h2",{attrs:{id:"二-ajax的原生写法"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#二-ajax的原生写法"}},[t._v("#")]),t._v(" 二.Ajax的原生写法")]),t._v(" "),a("h3",{attrs:{id:"_1-xmlhttprequest对象"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-xmlhttprequest对象"}},[t._v("#")]),t._v(" 1.XMLHttpRequest对象")]),t._v(" "),a("p",[t._v("XMLHttpRequest 对象用于在后台与服务器交换数据，能够在不重新加载页面的情况下更新网页，在页面已加载后从服务器请求数据，在页面已加载后从服务器接收数据，在后台向服务器发送数据。所以"),a("strong",[t._v("XMLHttpRequest对象是Ajax技术的核心所在。")])]),t._v(" "),a("h3",{attrs:{id:"_2-实现流程"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-实现流程"}},[t._v("#")]),t._v(" 2.实现流程")]),t._v(" "),a("p",[t._v("创建 XMLHttpRequest对象——>打开请求地址，初始化数据——>发送请求数据——>监听回调函数状态——>收到服务器返回的应答结果。")]),t._v(" "),a("p",[t._v("下面用具体的代码进行解释：")]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadXMLDoc")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("url")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\nxmlhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("XMLHttpRequest"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// code for all new browsers")]),t._v("\n  xmlhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("XMLHttpRequest")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//在这里创建 XMLHttpRequest对象")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("ActiveXObject"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// code for IE5 and IE6")]),t._v("\n  xmlhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ActiveXObject")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Microsoft.XMLHTTP"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xmlhttp"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!=")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("open")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"GET"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("url"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//请求的方式和请求地址")]),t._v("\n  xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("send")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//发送请求")]),t._v("\n  xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("onreadystatechange"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("state_Change"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//监听回调函数")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Your browser does not support XMLHTTP."')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("state_Change")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//这里是回调函数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("readyState"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("4")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v("xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("status"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("==")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("200")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n     "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v('//当满足这两个条件时表示请求成功,完成响应 4 = "loaded", 200 = OK  ')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" \n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("xmlhttp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("responseText"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//拿到服务器返回的数据")]),t._v("\n        "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...our code here...在这里进行数据返回后的操作")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Problem retrieving XML data"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br"),a("span",{staticClass:"line-number"},[t._v("14")]),a("br"),a("span",{staticClass:"line-number"},[t._v("15")]),a("br"),a("span",{staticClass:"line-number"},[t._v("16")]),a("br"),a("span",{staticClass:"line-number"},[t._v("17")]),a("br"),a("span",{staticClass:"line-number"},[t._v("18")]),a("br"),a("span",{staticClass:"line-number"},[t._v("19")]),a("br"),a("span",{staticClass:"line-number"},[t._v("20")]),a("br"),a("span",{staticClass:"line-number"},[t._v("21")]),a("br"),a("span",{staticClass:"line-number"},[t._v("22")]),a("br"),a("span",{staticClass:"line-number"},[t._v("23")]),a("br"),a("span",{staticClass:"line-number"},[t._v("24")]),a("br"),a("span",{staticClass:"line-number"},[t._v("25")]),a("br"),a("span",{staticClass:"line-number"},[t._v("26")]),a("br"),a("span",{staticClass:"line-number"},[t._v("27")]),a("br"),a("span",{staticClass:"line-number"},[t._v("28")]),a("br"),a("span",{staticClass:"line-number"},[t._v("29")]),a("br"),a("span",{staticClass:"line-number"},[t._v("30")]),a("br"),a("span",{staticClass:"line-number"},[t._v("31")]),a("br"),a("span",{staticClass:"line-number"},[t._v("32")]),a("br"),a("span",{staticClass:"line-number"},[t._v("33")]),a("br"),a("span",{staticClass:"line-number"},[t._v("34")]),a("br"),a("span",{staticClass:"line-number"},[t._v("35")]),a("br"),a("span",{staticClass:"line-number"},[t._v("36")]),a("br")])]),a("h3",{attrs:{id:"_3-原生写法中的注意点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-原生写法中的注意点"}},[t._v("#")]),t._v(" 3.原生写法中的注意点")]),t._v(" "),a("p",[t._v('(1).open() 的第三个参数中使用了 "true",该参数规定请求是否异步处理，默认是异步。True 表示脚本会在 send() 方法之后继续执行，而不等待来自服务器的响应。')]),t._v(" "),a("p",[t._v("(2).关于readyState"),a("br"),t._v(" "),a("img",{attrs:{src:"https://segmentfault.com/img/bVTvhg?w=822&h=202",alt:"图片描述",title:"图片描述"}})]),t._v(" "),a("p",[t._v("(3).关于status"),a("br"),t._v('\n由服务器返回的 HTTP 状态代码，200 表示成功，而 404 表示 "Not Found" 错误。当 readyState 小于 3 的时候读取这一属性会导致一个异常。(后面会有http状态码的详细解读)')]),t._v(" "),a("h2",{attrs:{id:"三-jquery中的ajax"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#三-jquery中的ajax"}},[t._v("#")]),t._v(" 三.JQuery中的Ajax")]),t._v(" "),a("p",[t._v("JQuery对原生Ajax做了很好的封装，使用起来非常简单方便,具体的很多方法如 $.ajax，$.post， $.get， $.getJSON等能根据不同需要进行调用，写法更加简洁，但是为了兼顾各个方法在这里我以一个通用的方法 $.ajax为例做一个简单的解析,按照下面的模式写好各个参数,就能成功进行Ajax的请求了,可能在实际中使用 $.post， $.get 这两个方法使用比较多，但是"),a("strong",[t._v("理****解$.ajax 这个通用的方法能对封装原理有很好的认识。")])]),t._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[t._v("$"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ajax")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//数据的提交方式：get和post")]),t._v("\n    url"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//请求地址")]),t._v("\n    async"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//是否支持异步刷新，默认是true")]),t._v("\n    data"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//需要提交的数据")]),t._v("\n    dataType"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//服务器返回数据的类型，例如xml,String,Json等")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("success")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//请求成功后的回调函数,参数data就是服务器返回的数据")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("error")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("data")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("   "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//请求失败后的回调函数，根据需要可以不写，一般只写上面的success回调函数")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br"),a("span",{staticClass:"line-number"},[t._v("2")]),a("br"),a("span",{staticClass:"line-number"},[t._v("3")]),a("br"),a("span",{staticClass:"line-number"},[t._v("4")]),a("br"),a("span",{staticClass:"line-number"},[t._v("5")]),a("br"),a("span",{staticClass:"line-number"},[t._v("6")]),a("br"),a("span",{staticClass:"line-number"},[t._v("7")]),a("br"),a("span",{staticClass:"line-number"},[t._v("8")]),a("br"),a("span",{staticClass:"line-number"},[t._v("9")]),a("br"),a("span",{staticClass:"line-number"},[t._v("10")]),a("br"),a("span",{staticClass:"line-number"},[t._v("11")]),a("br"),a("span",{staticClass:"line-number"},[t._v("12")]),a("br"),a("span",{staticClass:"line-number"},[t._v("13")]),a("br")])]),a("h2",{attrs:{id:"四-get-or-post？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#四-get-or-post？"}},[t._v("#")]),t._v(" 四.GET or POST？")]),t._v(" "),a("p",[t._v("作为Ajax最常用的两种数据提交方式，GET和POST有着自己的特点和适用场景，"),a("strong",[t._v("正确区分GET和POST的不同并根据实际需要进行选用在开发中十分重要，简单但是关键")]),t._v("！")]),t._v(" "),a("p",[t._v("先上一张GET 和 POST的比较图，从这张图中可以看出两者之间的差别："),a("br"),t._v(" "),a("img",{attrs:{src:"https://segmentfault.com/img/bVTvFU?w=827&h=492",alt:"图片描述",title:"图片描述"}})]),t._v(" "),a("p",[a("strong",[t._v("从表格中拎出关键点：")]),a("br"),t._v("\n1.传递数据的方式不同：get是直接把请求数据放在url的后面，是可见的，post的请求数据不会显示在url中，是不可见的。"),a("br"),t._v("\n2.数据长度和数据类型的差异：get有数据长度的的限制，且数据类型只允许ASCII字符，post在这两方面都没有限制。"),a("br"),t._v("\n3.安全性的差异：get不安全，post更安全。")]),t._v(" "),a("p",[a("strong",[t._v("由此得出的两者的使用场景")]),t._v("：get使用较方便，适用于页面之间非敏感数据的简单传值，post使用较为安全，适用于向服务器发送密码、token等敏感数据。")]),t._v(" "),a("h2",{attrs:{id:"五-success和complete的区别"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#五-success和complete的区别"}},[t._v("#")]),t._v(" 五.success和complete的区别")]),t._v(" "),a("p",[t._v("JQuery封装的Ajax回调函数中，success、error、complete是最常用的三个，其中，success和error很好区别，一个是请求成功调用的，另一个是请求失败调用的，从字面上就可以理解。但是success和complete容易混淆，在这里特别做一个说明：")]),t._v(" "),a("p",[t._v("success:请求成功后回调函数。"),a("br"),t._v("\ncomplete:请求完成后回调函数 (请求成功或失败时均调用)。")]),t._v(" "),a("p",[t._v("注意到括号里面了吗，没错，"),a("strong",[t._v("区别就在于complete只要请求完成，不论是成功还是失败均会调用")]),t._v("。也就是说如果调用了success，一定会调用complete；反过来调用了complete，不一定会调用success。(状态码404、403、301、302...都会进入complete，只要不出错就会调用)")]),t._v(" "),a("h2",{attrs:{id:"六-xml-json"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#六-xml-json"}},[t._v("#")]),t._v(" 六.XML -> JSON")]),t._v(" "),a("p",[t._v('Ajax中的是 "x" 指的就是XML。'),a("br"),t._v("\nxml:可扩展标记语言，标准通用标记语言的子集，是一种用于标记电子文件使其具有结构性的标记语言。"),a("br"),t._v("\nxml作为一种数据交互格式，广泛用在计算机领域，然而，随着json的发展，json以其明显的优势已经渐渐取代了xml成为现在数据交互格式的标准，所以在这里，想强调的是，"),a("strong",[t._v("json现在是主流的数据交互格式")]),t._v('，前后端的交互标准，无论是前端提交给后台的数据，还是后台返回给前端的数据，都最好统一为json格式，各自接收到数据后再解析数据即可供后续使用。所以 "Ajax" 实际上已经发展为 "Ajaj"')]),t._v(" "),a("h2",{attrs:{id:"七-json和jsonp"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#七-json和jsonp"}},[t._v("#")]),t._v(" 七.JSON和JSONP")]),t._v(" "),a("p",[t._v("json 和 jsonp 看起来只相差了一个 “p” ，然而实际上根本不是一个东西，千万别以为是差不多的两个概念。"),a("br"),t._v("\njson：(JavaScript Object Notation, JS 对象标记) 是一种轻量级的数据交换格式。"),a("br"),t._v("\njsonp：一种借助"),a("code",[t._v("<script>")]),t._v("元素解决主流浏览器的跨域数据访问问题的方式。")]),t._v(" "),a("h2",{attrs:{id:"八-ajax跨域访问"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#八-ajax跨域访问"}},[t._v("#")]),t._v(" 八.Ajax跨域访问")]),t._v(" "),a("p",[t._v("ajax很好，但不是万能的，"),a("strong",[t._v("ajax的请求与访问同样会受到浏览器同源策略的限制")]),t._v("，不能访问不同主域中的地址。所以，为了解决这一问题，实现跨域访问，有很多种方式，上述提到的jsonp就是一种流行的方式，还有其他一些方式，我在这里就不展开说了，只是想说明ajax的使用也是有条件的，任何技术的实现都不会是没有限制的。跨域访问时一个很重要的知识点，之前专门写过一篇关于跨域访问的总结，还挺详细的，可以移步查看:")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://segmentfault.com/a/1190000008525104",target:"_blank",rel:"noopener noreferrer"}},[t._v("javascript中实现跨域的方式总结"),a("OutboundLink")],1)]),t._v(" "),a("h2",{attrs:{id:"九-再议http状态码"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#九-再议http状态码"}},[t._v("#")]),t._v(" 九.再议HTTP状态码")]),t._v(" "),a("p",[t._v('前面提到的"200"、"404"只是http状态码中常见的两个，当浏览者访问一个网页时，浏览者的浏览器会向网页所在服务器发出请求。当浏览器接收并显示网页前，此网页所在的服务器会返回一个包含HTTP状态码的信息头（server header）用以响应浏览器的请求。'),a("br"),t._v("\n需要掌握的常见http状态码大致有以下一些：")]),t._v(" "),a("p",[t._v("101：切换协议，服务器根据客户端的请求切换协议"),a("br"),t._v(" "),a("strong",[t._v("200：请求成功。一般用于GET与POST请求")]),a("br"),t._v(" "),a("strong",[t._v("301：永久重定向")]),a("br"),t._v(" "),a("strong",[t._v("302：临时重定向")]),a("br"),t._v("\n303：与301类似。使用GET和POST请求查看"),a("br"),t._v(" "),a("strong",[t._v("304：请求资源未修改，使用缓存")]),a("br"),t._v("\n307：与302类似。使用GET请求重定向"),a("br"),t._v(" "),a("strong",[t._v("404：客户端请求失败")]),a("br"),t._v("\n408：请求超时"),a("br"),t._v(" "),a("strong",[t._v("500：内部服务器错误，无法完成请求")]),a("br"),t._v("\n505:服务器不支持请求的HTTP协议的版本，无法完成处理")]),t._v(" "),a("h2",{attrs:{id:"十-不可忽视的http头文件"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#十-不可忽视的http头文件"}},[t._v("#")]),t._v(" 十.不可忽视的HTTP头文件")]),t._v(" "),a("p",[t._v("http请求中的一个重要关注点就是请求头和响应头的内容，从这两个头文件中可以看出很多东西，当我们用发送一个ajax请求的时候，如果没有达到预期的效果，那么就需要打开浏览器的调试工具，从NetWork中找到相应的ajax请求，再通过查看请求头和响应头的信息，大体会知道这次请求的结果是怎么样的，结合响应的主体内容，可以很快找到问题。所以学会看http的头文件信息是前端开发中必须掌握的一个技能，下面就来看看具体的头文件信息。")]),t._v(" "),a("p",[t._v("首先随便上一张sf中的完成一个搜索结果的http请求，可以从图中的右侧清楚看到请求头和响应头的内容，包括了很多个字段信息，这些字段信息就是我们需要掌握的知识点，下面挑出其中的重点字段进行分析。"),a("br"),t._v(" "),a("img",{attrs:{src:"https://segmentfault.com/img/bVTyHL?w=1039&h=601",alt:"图片描述",title:"图片描述"}})]),t._v(" "),a("h3",{attrs:{id:"_1-请求头信息："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-请求头信息："}},[t._v("#")]),t._v(" 1.请求头信息：")]),t._v(" "),a("p",[t._v("Accept：客户端支持的数据类型"),a("br"),t._v("\nAccept-Charset：客户端采用的编码"),a("br"),t._v("\nAccept-Encoding：客户端支持的数据压缩格式"),a("br"),t._v("\nAccept-Language：客户端的语言环境"),a("br"),t._v("\nCookie：客服端的cookie"),a("br"),t._v("\nHost：请求的服务器地址"),a("br"),t._v("\nConnection：客户端与服务连接类型"),a("br"),t._v("\nIf-Modified-Since:上一次请求资源的缓存时间，与Last-Modified对应"),a("br"),t._v("\nIf-None-Match：客户段缓存数据的唯一标识，与Etag对应"),a("br"),t._v("\nReferer:发起请求的源地址。")]),t._v(" "),a("h3",{attrs:{id:"_2-响应头信息："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-响应头信息："}},[t._v("#")]),t._v(" 2.响应头信息：")]),t._v(" "),a("p",[t._v("content-encoding：响应数据的压缩格式。"),a("br"),t._v("\ncontent-length：响应数据的长度。"),a("br"),t._v("\ncontent-language：语言环境。"),a("br"),t._v("\ncontent-type：响应数据的类型。"),a("br"),t._v("\nDate:消息发送的时间"),a("br"),t._v("\nAge:经过的时间"),a("br"),t._v("\nEtag:被请求变量的实体值,用于判断请求的资源是否发生变化"),a("br"),t._v("\nExpires：缓存的过期时间"),a("br"),t._v("\nLast-Modified：在服务器端最后被修改的时间"),a("br"),t._v("\nserver：服务器的型号")]),t._v(" "),a("h3",{attrs:{id:"_3-两者都可能出现的消息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-两者都可能出现的消息"}},[t._v("#")]),t._v(" 3.两者都可能出现的消息")]),t._v(" "),a("p",[t._v("Pragma：是否缓存(http1.0提出)"),a("br"),t._v("\nCache-Control:是否缓存(http1.1提出)")]),t._v(" "),a("h3",{attrs:{id:"_4-跟缓存相关的字段"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4-跟缓存相关的字段"}},[t._v("#")]),t._v(" 4.跟缓存相关的字段")]),t._v(" "),a("p",[t._v("(1) 强制缓存"),a("br"),t._v("\nexpire 和 cache-control")]),t._v(" "),a("p",[t._v("(2) 对比缓存"),a("br"),t._v("\nLast-Modified 和 If-Modified-Since"),a("br"),t._v("\nEtag 和 If-None-Match")]),t._v(" "),a("h2",{attrs:{id:"十一-ajax的优缺点"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#十一-ajax的优缺点"}},[t._v("#")]),t._v(" 十一.Ajax的优缺点")]),t._v(" "),a("h3",{attrs:{id:"_1-优点："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-优点："}},[t._v("#")]),t._v(" 1.优点：")]),t._v(" "),a("p",[t._v("1.页面无刷新，在页面内与服务器通信，减少用户等待时间，增强了用户体验。"),a("br"),t._v("\n2.使用异步方式与服务器通信，响应速度更快。"),a("br"),t._v("\n3.可以把一些原本服务器的工作转接到客户端，利用客户端闲置的能力来处理，减轻了服务器和带宽的负担，节约空间和宽带租用成本。"),a("br"),t._v("\n4.基于标准化的并被广泛支持的技术，不需要下载插件或者小程序。")]),t._v(" "),a("h3",{attrs:{id:"_2-缺点："}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-缺点："}},[t._v("#")]),t._v(" 2.缺点：")]),t._v(" "),a("p",[t._v("1.无法进行操作的后退，即不支持浏览器的页面后退。"),a("br"),t._v("\n2.对搜索引擎的支持比较弱。"),a("br"),t._v("\n3.可能会影响程序中的异常处理机制。"),a("br"),t._v("\n4.安全问题，对一些网站攻击，如csrf、xxs、sql注入等不能很好地防御")])])}),[],!1,null,null,null);s.default=r.exports}}]);