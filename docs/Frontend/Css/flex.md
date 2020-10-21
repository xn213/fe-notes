# CSS3中Flex弹性布局的灵活运用

## 前言

Flex（Flexible Box），意为”弹性布局”。“弹性”，顾名思义，就是具有弹簧的特性啦，能够自由的伸缩（有点自适应的意思啦）。

![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603141528.png)

其实Flex并不是最近才出现的，而是早在十年前它就被提出。2009年，W3C提出了一种新的方案—-Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603141517.jpg)

## Flex布局如何使用？

任何一个容器都可以指定为Flex布局

```prism
.box{
  display: flex;
}
```预览

行内元素也可以使用Flex布局

```prism
.box{
  display: inline-flex;
}
```

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603142516.jpg)

## Flex概念知识

采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。

![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603141529.png)

**容器默认存在两根轴：**

水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。  
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

是不是感觉又学到了？概念的东西了解就好了，这个不用记忆，不会跟上学背课文一样，还考试了。

## Flex容器属性

**一、flex-direction：决定项目（item）的排列方向**  
flex-direction有四个值：  
1、row（默认值）：主轴为水平方向，起点在左端。  
2、row-reverse：主轴为水平方向，起点在右端。  
3、column：主轴为垂直方向，起点在上沿。  
4、column-reverse：主轴为垂直方向，起点在下沿。

上方那个示例图，我们稍稍变阵一下，主轴设置为垂直方向，就会出现下图布局。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603144014.jpg)

还可以设置主轴为垂直方向，起点在下沿。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603144211.jpg)

是不是觉得以后布局就用他（Flex）了？

**二、flex-wrap**  
默认情况下，item都排在一条线（又称”轴线”）上。`flex-wrap`属性定义了，如果一条轴线排不下，item的换行方式。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603144213.jpg)

flex-wrap有三个值：  
1、nowrap（默认）：不换行  
2、wrap：换行，第一行在上方。  
3、wrap-reverse：换行，第一行在下方。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603154441.jpg)

**三、flex-flow**  
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

```
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603154732.jpg)

**四、justify-content：定义了item在主轴上的对齐方式**  
justify-content有五个值：  
1、flex-start（默认值）：左对齐  
2、flex-end：右对齐  
3、center： 居中  
4、space-between：两端对齐，项目之间的间隔都相等。  
5、space-around：每个item两侧的间隔相等。所以，item之间的间隔比item与边框的间隔大一倍。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603155550.jpg)

**五、align-items：Item在交叉轴上如何对齐**  
1、flex-start：交叉轴的起点对齐。  
2、flex-end：交叉轴的终点对齐。  
3、center：交叉轴的中点对齐。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603175411.jpg)

4、baseline: 项目的第一行文字的基线对齐。

![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603175454.jpg)

5、stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

**六、align-content：多根轴线的对齐方式**  
多根轴线如何出现？宽度超出，换行后就会有多根轴线了。

1、flex-start：与交叉轴的起点对齐。  
2、flex-end：与交叉轴的终点对齐。  
3、center：与交叉轴的中点对齐。  
4、space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。  
5、space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。  
6、stretch（默认值）：轴线占满整个交叉轴。

对比一下添加`align-content`和没有`align-content`的区别：  
示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603164729.jpg)

## 项目(Item)的属性

**一、order**  
Item的排列顺序。数值越小，排列越靠前，默认为0。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603165622.jpg)

赋予item，一个排序值，根据这个值进行排序。没有设置值的默认是0。

**二、flex-grow**  
定义Item的放大比例，默认为0，即如果存在剩余空间，也不放大。**意思就是将100%宽/高按什么比例分。**  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603170810.jpg)

举例：如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。（看上图示例）

**三、flex-shrink**  
定义了Item的缩小比例，默认为1，即如果空间不足，该Item将缩小

![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603171831.jpg)

看上图：3个item的宽度和:100+200+200=500px，超出了box（400px）的宽度（超出了100px的宽），这时候item1/item2都设置了flex-shrink为0，而item3设置了flex-shrink为1，所以，宽度不够时，item3将收缩，这里item3实际的宽度就是100px。

再看下图：

![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603172239.jpg)

item1/item3设置flex-shrink为1，而item2的flex-shrink为0，也就是说，此时宽度超出后，将由item1、item3来等比缩小宽度，item2保持原有宽度。

**四、flex-basis**  
`flex-basis`属性定义了在分配多余空间之前，Item占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即Item的本来大小。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603174420.jpg)

这个属性可以直接设置宽高代替，如上图注释部分。

**五、flex**  
flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

所以最前面的几个示例，都直接写的flex，其实flex就flex-grow, flex-shrink 和 flex-basis的简写。

**六、align-self**  
`align-self`属性允许单个Item有与其他Item不一样的对齐方式，可覆盖`align-items`属性。默认值为auto，表示继承父元素的`align-items`属性，如果没有父元素，则等同于stretch。

示例：  
![CSS3中Flex弹性布局该如何灵活运用？](http://cdn.javanx.cn/wp-content/themes/lensnews2.2/images/post/20190603175657.jpg)

这样，就会把容器的`align-items`，覆盖掉。

## 总结

看完上面内容，是不是发现`Flex`基本上可以搞定大部分的前端布局？确实是这样，它就是这么强大，这也是他广受大家喜爱的一个重要原因，如果不考虑低版本浏览器兼容问题，我相信，float大家应该用的越来越少了。