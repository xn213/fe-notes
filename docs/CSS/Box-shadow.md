# CSS3 box-shadow 盒阴影图形生成技术

## 2113 心形
```html
<div class='heart'></div>
```
```css
  .heart{
    position: relative;
    width: 100px;
    height: 90px;
  }
  .heart::before,
  .heart::after{
    position: absolute;
    content: "";
    left: 50px;
    top: 0;
    width: 50px;
    height: 80px;
    background: #fc2e5a;
    border-radius: 50px 50px 0 0;
    transform-origin: 0 100%;
    transform: rotate(-45deg);
  }
  .heart:after{
    left: 0;
    transform-origin :100% 100%;
    transform: rotate(45deg);
  }
```

## 21-2.像素心

![像素心](../img/pxheart.png)

```html
  <div class='pxheart'></div>
```
```css
.pxheart {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 105px;
  height: 105px;
  margin: -52.5px 0 0 -52.5px;
}
.pxheart::before {
  content: '';
  display: block;
  transition: all 400ms;
  width: 15px;
  height: 15px;
  margin: -15px 0 0 -15px;
  box-shadow: 30px 15px #8e1a19, 45px 15px #ac0500, 75px 15px #f73f0c, 90px 15px #fa5f27, 15px 30px #740100, 30px 30px #8e0500, 45px 30px #8e1918, 60px 30px #ca1300, 75px 30px #f34f2b, 90px 30px #df351f, 105px 30px #f77c2a, 15px 45px #4b0000, 30px 45px #690100, 45px 45px #8e0f0b, 60px 45px #bf1000, 75px 45px #f84010, 90px 45px #f04222, 105px 45px #fa5724, 15px 60px #451312, 30px 60px #5a0100, 45px 60px #840e0c, 60px 60px #a51d1a, 75px 60px #ed2805, 90px 60px #d9321e, 105px 60px #f44622, 30px 75px #3b0000, 45px 75px #5d1a1b, 60px 75px #8e1a19, 75px 75px #a80700, 90px 75px #b90a00, 45px 90px #3d0000, 60px 90px #551415, 75px 90px #670100, 60px 105px #340000;
  animation: pulse 1.2s steps(1) infinite;
}
```


## 13.箭头

![箭头](https://user-gold-cdn.xitu.io/2019/4/22/16a42c3779e8749d?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)


```css
#curvedarrow {
  position: relative;
  width: 0;
  height: 0;
  border-top: 9px solid transparent;
  border-right: 9px solid red;
  transform: rotate(10deg);
}
#curvedarrow:after {
  content: "";
  position: absolute;
  border: 0 solid transparent;
  border-top: 3px solid red;
  border-radius: 20px 0 0 0;
  top: -12px;
  left: -9px;
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
}
```

```css
/* box-shadow 像素绘制图形技术 */
.icon-up::before {
  content: '';
  position: absolute;
  margin: 5px 0 0 9px;
  /* margin-top: 2px; */
  height: 4px;
  border-left: 1px solid #bdbdbd;
  box-shadow: 1px 1px #bdbdbd, 2px 2px #bdbdbd, 3px 3px #bdbdbd, 4px 4px #bdbdbd, 5px 5px #bdbdbd,
    -1px 1px #bdbdbd, -2px 2px #bdbdbd, -3px 3px #bdbdbd, -4px 4px #bdbdbd, -5px 5px #bdbdbd;
}

.icon-down::before {
  content: '';
  position: absolute;
  margin: 10px 0 0 9px;
  /* margin-top: 2px; */
  height: 4px;
  border-left: 1px solid #bdbdbd;
  box-shadow: 1px -1px #bdbdbd, 2px -2px #bdbdbd, 3px -3px #bdbdbd, 4px -4px #bdbdbd, 5px -5px #bdbdbd,
    -1px -1px #bdbdbd, -2px -2px #bdbdbd, -3px -3px #bdbdbd, -4px -4px #bdbdbd, -5px -5px #bdbdbd;
}

.icon-cross::before {
  content: '';
  position: absolute;
  /* margin: 5px 0 0 9px; */
  width: 2px;
  height: 2px;
  /* border-left: 1px solid #bdbdbd; */
  box-shadow: 11px 8px #626262, 11px 9px #626262, 11px 10px #626262, 11px 11px #626262, 11px 12px #626262, 11px 13px #626262, 11px 14px #626262, 4px 15px #626262, 5px 15px #626262, 6px 15px #626262, 7px 15px #626262, 8px 15px #626262, 9px 15px #626262, 10px 15px #626262, 11px 15px #626262, 12px 15px #626262, 13px 15px #626262, 14px 15px #626262, 15px 15px #626262, 16px 15px #626262, 17px 15px #626262, 18px 15px #626262, 11px 16px #626262, 11px 17px #626262, 11px 18px #626262, 11px 19px #626262, 11px 20px #626262, 11px 21px #626262, 11px 22px #626262;
}
```
