# 代码注释的艺术

<img src='https://user-gold-cdn.xitu.io/2019/5/23/16ae4b504ab978e1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1' width='32%' height='32%' />


### 前言

[原文](https://juejin.im/post/5ce694c1f265da1b6e657c84)
可能现在不管大家去面试还是在公司上班都会涉及到代码可读性，或者是代码规范。优秀的代码注释可以提高代码可读性，当然优秀的命名规范也可以啦。我们这里就讨论一下代码注释。代码注释可能就相当于产品使用说明书，当别人看到你的代码的时候，知道你的代码是干嘛的，是怎么使用的。我们所熟悉的可能就是 `//` 是单行注释，`/***/` 是多行注释，下面我们就来聊一聊代码注释!

### 文件注释

关于文件注释可能很多同学都没有用过，但大家都多多少少有看过文件注释。

比如我们熟悉的jQuery/vuejs/reactjs的文件注释：

```js
// jQuery的文件注释
/*!
 * jQuery JavaScript Library v1.11.3
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:19Z
 */

// vuejs的文件注释
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */

// reactjs的文件注释
/** @license React v16.8.6
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
```

在这里我们可以大概了解到版权或者作者，又或者开源协议等信息。

在日常工作中我们也经常看到这样的文件注释：

```js
/*
 * @Description: Description
 * @Author: js-say
 * @Date: 2019-05-23 17:57:10
 * @LastEditTime: 2019-05-23 17:57:10
 * @LastEditors: js-say
 */
```

这样的注释包括了描述、作者、创建时间、更新时间等。这样大家一眼就能知道这个文件大概实现了什么功能，开始是谁写的，最后维护的是谁。文件注释其实可以看自己公司要求和规范来写！使用 `vs-code` 的话有一个插件可以快捷生成文件注释，当然方法注释也是可以的。这里就只给插件名字啦，具体怎么使用大家可以自己研究一下！

插件：[koroFileHeader](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2FOBKoro1%2Fkoro1FileHeader)

其实文件注释也有一些规范的：

```js
/**
 * @file 对文件的描述，用于文件的头部
 * @author <name> [<emailAddress>] 代码的作者,在姓名后面用尖括号加上邮箱会被自动转成 mailto: 的链接
 * @copyright <some copyright text> 与@file结合使用，说明版权相关的信息
 * @license <identifier> 说明许可证相关的信息
 * @version 版本号
 */
```

大致一个文件注释可以是这样子的，还可以有很多比如 `@desc` 描述之类的，大家可以参考 [jsDoc](https://link.juejin.im/?target=https%3A%2F%2Fjsdoc.app%2F)

### 代码块注释

代码块注释，也可以说是方法注释，可以提现出方法的用处，已经所需参数，返回值等；大大提高代码的可读性！

下面就是一个简单的方法注释：

```js
/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function Book(title, author) {
  // ...
}
```

下面我就举几个例子：

**`class` 的注释**：

```js
/** Class representing a point. */
class Point {
    /**
     * Create a point.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     */
    constructor(x, y) {
        // ...
    }

    /**
     * Get the x value.
     * @return {number} The x value.
     */
    getX() {
        // ...
    }

    /**
     * Get the y value.
     * @return {number} The y value.
     */
    getY() {
        // ...
    }

    /**
     * Convert a string containing two comma-separated numbers into a point.
     * @param {string} str - The string containing two comma-separated numbers.
     * @return {Point} A Point object.
     */
    static fromString(str) {
        // ...
    }
}
```

**`class` 继承**

```js
/**
 * Class representing a dot.
 * @extends Point
 */
class Dot extends Point {
    /**
     * Create a dot.
     * @param {number} x - The x value.
     * @param {number} y - The y value.
     * @param {number} width - The width of the dot, in pixels.
     */
    constructor(x, y, width) {
        // ...
    }

    /**
     * Get the dot's width.
     * @return {number} The dot's width, in pixels.
     */
    getWidth() {
        // ...
    }
}
```

**`module` 注释**

```js
/** @module color/mixer */

/** The name of the module. */
export const name = 'mixer';

/** The most recent blended color. */
export var lastColor = null;

/**
 * Blend two colors together.
 * @param {string} color1 - The first color, in hexadecimal format.
 * @param {string} color2 - The second color, in hexadecimal format.
 * @return {string} The blended color.
 */
export function blend(color1, color2) {}

// convert color to array of RGB values (0-255)
function rgbify(color) {}

export {
    /**
     * Get the red, green, and blue values of a color.
     * @function
     * @param {string} color - A color, in hexadecimal format.
     * @returns {Array.<number>} An array of the red, green, and blue values,
     * each ranging from 0 to 255.
     */
    rgbify as toRgb
}
```

通过上面几个例子是不是很快的知道各代码的作用是什么，需要的参数是什么，这样子一来代码就可以很容易的被同事或者说下一个接手维护的人看懂！对于方法描述，参数描述就可以看团队公司来定是写成英语还是中文了。

下面是一些常用的注释标签

```js
/**
 * @author  作者，方便定位    
 * @class（同义词：@constructor）标记类和构造函数    
 * @constant @const常量标记    
 * @description（同义词：@desc） 对内容进行描述    
 * @module 模块名称    
 * @enum 枚举类型标记    
 * @global 全局对象标记    
 * @param 函数参数标记    
 * @returns（同义词：@return）函数返回标记    
 * @this this指向标记    
 * @see 参考链接    
 * @memberof 标记模块间的从属关系    
 * @event 在模板中标记可以被触发的事件，与@fire配合使用
 * @alias 将成员视为具有不同的名称。
 * @Async 表示函数是异步的。
 * @augments（同义词：@extends）指示符号从父符号继承并添加到父符号。
 * @borrows 此对象使用来自另一个对象的内容。
 * @callback 回调函数。
 * @copyright 版权信息。
 * @default （同义词: @defaultvalue） 默认值。
 * @example 示例。
 */
```

还有很多，大家可以去 [jsDoc](https://link.juejin.im/?target=https%3A%2F%2Fjsdoc.app%2F) 看相应的一些规范。

### 行注释

行注释的话，应该不用做太多的解释，直接用  `//` 注释相关信息就OK啦。当然 `// TODO` 习惯用这个得话也是非常不从的哟！

### 有趣的注释(无关主题，纯属娱乐，这条可以无视)

```js
/**
 *                    _ooOoo_
 *                   o8888888o
 *                   88" . "88
 *                   (| -_- |)
 *                    O\ = /O
 *                ____/`---'\____
 *              .   ' \\| |// `.
 *               / \\||| : |||// \
 *             / _||||| -:- |||||- \
 *               | | \\\ - /// | |
 *             | \_| ''\---/'' | |
 *              \ .-\__ `-` ___/-. /
 *           ___`. .' /--.--\ `. . __
 *        ."" '< `.___\_<|>_/___.' >'"".
 *       | | : `- \`.;`\ _ /`;.`/ - ` : | |
 *         \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 *                    `=---='
 *
 * .............................................
 *          佛祖保佑             永无BUG
 */

/**
 *  佛曰:
 *          写字楼里写字间，写字间里程序员；
 *          程序人员写程序，又拿程序换酒钱。
 *          酒醒只在网上坐，酒醉还来网下眠；
 *          酒醉酒醒日复日，网上网下年复年。
 *          但愿老死电脑间，不愿鞠躬老板前；
 *          奔驰宝马贵者趣，公交自行程序员。
 *          别人笑我忒疯癫，我笑自己命太贱；
 *          不见满街漂亮妹，哪个归得程序员？
 */

/**
 * _ooOoo_
 * o8888888o
 * 88" . "88
 * (| -_- |)
 *  O\ = /O
 * ___/`---'\____
 * .   ' \\| |// `.
 * / \\||| : |||// \
 * / _||||| -:- |||||- \
 * | | \\\ - /// | |
 * | \_| ''\---/'' | |
 * \ .-\__ `-` ___/-. /
 * ___`. .' /--.--\ `. . __
 * ."" '< `.___\_<|>_/___.' >'"".
 * | | : `- \`.;`\ _ /`;.`/ - ` : | |
 * \ \ `-. \_ __\ /__ _/ .-` / /
 * ======`-.____`-.___\_____/___.-`____.-'======
 * `=---='
 * .............................................
 *           佛曰：bug泛滥，我已瘫痪！
 */

/***
 *      ┌─┐       ┌─┐ + +
 *   ┌──┘ ┴───────┘ ┴──┐++
 *   │                 │
 *   │       ───       │++ + + +
 *   ███████───███████ │+
 *   │                 │+
 *   │       ─┴─       │
 *   │                 │
 *   └───┐         ┌───┘
 *       │         │
 *       │         │   + +
 *       │         │
 *       │         └──────────────┐
 *       │                        │
 *       │                        ├─┐
 *       │                        ┌─┘
 *       │                        │
 *       └─┐  ┐  ┌───────┬──┐  ┌──┘  + + + +
 *         │ ─┤ ─┤       │ ─┤ ─┤
 *         └──┴──┘       └──┴──┘  + + + +
 *                神兽保佑
 *               代码无BUG!
 */

/***
 *                  ___====-_  _-====___
 *            _--^^^#####//      \\#####^^^--_
 *         _-^##########// (    ) \\##########^-_
 *        -############//  |\^^/|  \\############-
 *      _/############//   (@::@)   \\############\_
 *     /#############((     \\//     ))#############\
 *    -###############\\    (oo)    //###############-
 *   -#################\\  / VV \  //#################-
 *  -###################\\/      \//###################-
 * _#/|##########/\######(   /\   )######/\##########|\#_
 * |/ |#/\#/\#/\/  \#/\##\  |  |  /##/\#/  \/\#/\#/\#| \|
 * `  |/  V  V  `   V  \#\| |  | |/#/  V   '  V  V  \|  '
 *    `   `  `      `   / | |  | | \   '      '  '   '
 *                     (  | |  | |  )
 *                    __\ | |  | | /__
 *                   (vvv(VVV)(VVV)vvv)                
 *                        神兽保佑
 *                       代码无BUG!
 */

/***
 *
 *
 *                                                    __----~~~~~~~~~~~------___
 *                                   .  .   ~~//====......          __--~ ~~
 *                   -.            \_|//     |||\\  ~~~~~~::::... /~
 *                ___-==_       _-~o~  \/    |||  \\            _/~~-
 *        __---~~~.==~||\=_    -_--~/_-~|-   |\\   \\        _/~
 *    _-~~     .=~    |  \\-_    '-~7  /-   /  ||    \      /
 *  .~       .~       |   \\ -_    /  /-   /   ||      \   /
 * /  ____  /         |     \\ ~-_/  /|- _/   .||       \ /
 * |~~    ~~|--~~~~--_ \     ~==-/   | \~--===~~        .\
 *          '         ~-|      /|    |-~\~~       __--~~
 *                      |-~~-_/ |    |   ~\_   _-~            /\
 *                           /  \     \__   \/~                \__
 *                       _--~ _/ | .-~~____--~-/                  ~~==.
 *                      ((->/~   '.|||' -_|    ~~-/ ,              . _||
 *                                 -_     ~\      ~~---l__i__i__i--~~_/
 *                                 _-~-__   ~)  \--______________--~~
 *                               //.-~~~-~_--~- |-------~~~~~~~~
 *                                      //.-~~~--\
 *                               神兽保佑
 *                              代码无BUG!
 */
```