# 代码段 积累

- 目录...

## localStorage、sessionStorage ES6简单封装
```js
// storage.js
class Store {
  constructor(store) {
    // 检测是否支持localstorage
    if (!store) {
      console.log('不支持localStorage')
      return
    }
    this._store = store
  }

  /**
   * @function 设置值
   * @param {string} _k 必须参数，属性
   * @param {any} _v 非必须参数，属性值
   */
  setItem(_k, _v) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType === 'string') {
      this._store.setItem(_k, this.filterValue(_v))
    } else {
      console.log('key只能为字符串！')
    }
  }

  /**
   * @function 获取值
   * @param {string} _k 必须参数，属性
   */
  getItem(_k) {
    if (!this._store) return
    let res
    let kType = this.getType(_k)
    if (kType === 'string') {
      res = this._store.getItem(_k)
    } else {
      console.log('key只能为字符串！')
    }
    return res
  }

  /**
   * @function 移除值
   * @param {string} _k 必须参数，属性
   */
  removeItem(_k) {
    if (!this._store) return
    let kType = this.getType(_k)
    if (kType === 'string') {
      // eslint-disable-next-line no-undef
      res = this._store.removeItem(_k)
    } else {
      console.log('key只能为字符串！')
    }
  }

  /**
   * @function 移除所有
   */
  clear() {
    if (!this._store) return
    this._store.clear()
  }

  /**
   * @function 判断类型
   * @param {any} para 必须参数，判断的值
   */
  getType(para) {
    let type = typeof para
    if (type === 'number' && isNaN(para)) return 'NaN'
    if (type !== 'object') return type
    return Object.prototype.toString
      .call(para)
      .replace(/[\[\]]/g, '') // eslint-disable-line
      .split(' ')[1]
      .toLowerCase()
  }

  /**
   * @function 过滤值
   * @param {any} val 必须参数，过滤的值
   */
  filterValue(val) {
    let vType = this.getType(val)
    let nullVal = ['null', 'undefined', 'NaN']
    let stringVal = ['boolen', 'number', 'string']
    if (nullVal.indexOf(vType) >= 0) return ''
    if (stringVal.indexOf(vType) >= 0) return val
    return JSON.stringify(val)
  }
}

class LocalStorage extends Store {
  constructor (store) { // eslint-disable-line
    super(store)
  }
  WX_USER_ID = 'WX_USER_ID'
}

class SessionStorage extends Store {
  constructor (store) { // eslint-disable-line
    super(store)
  }
  WX_SSO_TITLE = 'WX_SSO_TITLE'
}

const lStorage = new LocalStorage(window.localStorage || localStorage)
const sStorage = new SessionStorage(window.sessionStorage || sessionStorage)

export { lStorage, sStorage }

// 使用 =========================================>>>>>>
import { lStorage, sStorage } from './storage.js'

lStorage.setItem(lStorage.WX_USER_ID, ['val', 'string'])
lStorage.getItem(lStorage.WX_USER_ID) // ['val', 'string'] 获取的是 setItem 设置的值,即第二个参数
```

--------------------------------------------------------------------------------------------------

## sass 颜色方法
**开发中应用**

我们可以通过这个方法来实现字体颜色根据背景色自动调整。

```js
// sass
  @function set-notification-text-color($color) {
    @if (lightness($color) > 50) {
      // 浅色背景返回深色字体
      @return #333;
    } @else {
      // 深色背景返回浅色字体
      @return #fff;
    }
  }
```

## 颜色转换方法

分享几个颜色转换的方法。

```js
rgbToHex (rgbStr) {
  const color = rgbStr.toString().match(/\d+/g);
  let hex = "#";
  for (let i = 0; i < 3; i++) {
    // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
    // 如果结果是一位数，就在前面补零。例如： A变成0A
    hex += ("0" + Number(color[i]).toString(16)).slice(-2);
  }
  return hex;
}
```

```js
hexToRgb (hex) {
  let rgb = [];
  //去除前缀 # 号
  hex = hex.substr(1);
  // 处理 "#abc" 成 "#aabbcc"
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, '$1$1');
  }
  hex.replace(/../g, function(color){
    //按16进制将字符串转换为数字
    rgb.push(parseInt(color, 0x10));
  });
  return "rgb(" + rgb.join(",") + ")";
}
```

```js
rgbToHsl (rgbStr) {
  var color = rgbStr.toString().match(/\d+/g);
  var r = color[0]/255;
  var g = color[1]/255;
  var b = color[2]/255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min){ 
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h, s, l];
}
```