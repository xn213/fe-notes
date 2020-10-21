# less & scss 中的 @mixin 用法

```scss
// 使用
// 先引入
@import '~@/assets/mixin.scss';

.popup-txt {
  width: 100%;
  height: 100px;
  font-size: 14px;
  box-sizing: border-box;
  padding-top: 24px;
  // 要使用的地方通过 @include 引入样式
  @include border-bottom-1px(#eeeeee);
}

```
```scss
// 背景图片
@mixin bgImage($path) {
  background-image: url($path + '@2x.png');
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    background-image: url($path + '@3x.png');
  }
}

// 居中布局
@mixin center() {
  justify-content: center;
  align-content: center;
}

// 不换行
@mixin no-wrap() {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@mixin top-line($c: #c7c7c7) {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 1px;
  border-top: 1px solid $c;
  color: $c;
  transform-origin: 0 0;
  transform: scaleY(0.5);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    transform: scaleY(0.333333333);
  }
}

@mixin bottom-line($c: #E6E6E6) {
  content: ' ';
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid $c;
  color: $c;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    transform: scaleY(0.333333333);
  }
}

@mixin left-line($c: #c7c7c7) {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-left: 1px solid $c;
  color: $c;
  transform-origin: 0 0;
  transform: scaleX(0.5);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    transform: scaleX(0.333333333);
  }
}

@mixin right-line($c: #c7c7c7) {
  content: ' ';
  position: absolute;
  right: 0;
  top: 0;
  width: 1px;
  bottom: 0;
  border-right: 1px solid $c;
  color: $c;
  transform-origin: 100% 0;
  transform: scaleX(0.5);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    transform: scaleX(0.333333333);
  }
}

@mixin line($c: #c7c7c7, $border-radius: 0) {
  content: ' ';
  position: absolute;
  left: 0;
  top: 0;
  width: 200%;
  height: 200%;
  border: 1px solid $c;
  color: $c;
  transform-origin: left top;
  @if ($border-radius != 0) {
    border-radius: $border-radius * 2;
  }
  transform: scale(0.5);
  @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
    @if ($border-radius != 0) {
      border-radius: $border-radius * 3;
    }
    width: 300%;
    height: 300%;
    transform: scale(0.333333333);
  }
}

// 一像素上边框
@mixin border-top-1px($color: #c7c7c7) {
  position: relative;
  &:before {
    @include top-line();
  }
}

// 一像素下边框
@mixin border-bottom-1px($color: #c7c7c7) {
  position: relative;
  &:after {
    @include bottom-line();
  }
}

// 一像素上下边框
@mixin border-top-bottom-1px($color: #c7c7c7) {
  position: relative;
  &:before {
    @include top-line();
  }
  &:after {
    @include bottom-line();
  }
}

// 一像素左边框
@mixin border-left-1px($color: #c7c7c7) {
  position: relative;
  &:before {
    @include left-line();
  }
}

// 一像素右边框
@mixin border-right-1px($color: #c7c7c7) {
  position: relative;
  &:before {
    @include right-line();
  }
}

// 一像素边框
@mixin border-1px($color: #c7c7c7, $position: relative, $border-radius: 0) {
  position: $position;
  &:after {
    @include line($color, $border-radius);
  }
}
```