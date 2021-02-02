# vue/react项目中不可忽视的自动化部署方案

![](http://c.biancheng.net/uploads/allimg/190422/1-1Z4221K20V94.gif)

本文主要介绍shell脚本的一些基本用法以及在前端项目中的应用。将围绕以下几点来展开：

1. shell基本用法（变量，循环，传参，运算符，流程控制等）
2. 使用shell脚本自动将项目打包部署到git服务器
3. 使用nodeJs编写命令行工具

### 1. shell基本介绍及用法

> Shell 是一个用 C 语言编写的程序，它是用户使用 Linux 的桥梁，业界所说的 shell 通常都是指 shell 脚本，Shell 编程跟 java、php 编程一样，只要有一个能编写代码的文本编辑器和一个能解释执行的脚本解释器就可以了。Linux 的 Shell 种类众多，在这里我们介绍一种常用且开源免费的shell——bash。

1. Shell 变量

  变量声明如下：

```js
time=10
```

注：变量名和等号之间不能有空格，变量名命名规则如下：

* 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
* 中间不能有空格，可以使用下划线（_）。
* 不能使用标点符号。
* 不能使用bash里的关键字（可用help命令查看保留关键字）

我们可以通过如下方式使用变量：

```sh
name="xn213"
echo $name
# 或者这样
echo ${name}
```

我们能使用如下方式删除变量：

```sh
unset name
```

关于shell变量的更多用法，可以参考linux官网，这里就不过多介绍了。

1. Shell 传递参数

> 我们可以在执行 Shell 脚本时，向脚本传递参数，脚本内获取参数的格式为：$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推,其中 $0 为执行的文件名

使用如下：

```sh
echo "文件名：$0";
echo "参数一：$1";
echo "参数二：$2";
echo "参数三：$3";
# 输出
文件名：./test.sh
参数一：1
参数二：2
参数三：3
```

1. Shell 数组

Bash Shell 只支持一维数组，数组元素的下标由0开始。Shell 数组用括号来表示，元素用"空格"符号分割开，例如：

```sh
names=(name1 ... namen)
```

我们可以通过如下方式读取数组：

```sh
${names[0]}
```

我们可以使用@ 或 * 可以获取数组中的所有元素，例如：

```sh
echo "数组的元素为: ${nsmes[*]}"
# 输出为
数组的元素为: A B C D
```

1. Shell 基本运算符

Shell支持多种运算符，如下：

* 算数运算符
* 关系运算符
* 布尔运算符
* 字符串运算符
* 文件测试运算符

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，这里我们使用expr。它是一款表达式计算工具，使用它能完成表达式的求值操作。
例如：

```sh
#!/bin/bash

total=`expr 2 + 2`
echo "两数之和为 : $total"
```

注：这里我们使用反引号``。由于命令行工具这块用的比较少，如果感兴趣，大家可以去官网了解学习。

1. Shell echo命令

Shell 的 echo 指令与 PHP 的 echo 指令类似，都是用于字符串的输出，这里我们着重介绍与用户交互的输入输出。

```sh
#!/bin/sh
read name
echo "hello $name"
```

read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量。当我们执行脚本后，输入一个自定义名称，按下回车将输出 'hello xxx',我们是不是想到了vue脚手架中的一些命令呢，是的，我们可以用这个方法去实现自己的脚手架配置或者自动生成项目模版。

我们也可以用echo将显示结果定向至文件：

```sh
echo "It is mine" > test.js
```

执行 这个文件后将为我们创建一个test.js文件，并将输出内容写入test.js。

1. Shell test 命令

test 命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试。

数值测试：

* -eq 等于则为真
* -ne 不等于则为真
* -gt 大于则为真
* -ge 大于等于则为真
* -lt 小于则为真
* -le 小于等于则为真

使用方式如下：

```sh
name1=1
name2=1
if test $[name1] -eq $[name2]
then
  echo '相等！'
else
  echo '不相等！'
fi
```

运行脚本后将输出'相等!'。

字符串测试：

* = 等于则为真
* != 不相等则为真
* -z 字符串 字符串的长度为零则为真
* -n 字符串 字符串的长度不为零则为真

例如：

```sh
name1="xu"
name2="xu"
if test $name1 = $name2
then
  echo '两个字符串相等!'
else
  echo '两个字符串不相等!'
fi
```

1. Shell 流程控制

流程控制我们主要介绍if else， if else-if else和for循环。

* if else

```sh
if 条件1
then
  命令操作1
else
  命令操作2
fi
```

* if else-if else

```sh
a=1000
b=2000
if [ $a == $b ]
then
  echo "a 等于 b"
elif [ $a -gt $b ]
then
  echo "a 大于 b"
elif [ $a -lt $b ]
then
  echo "a 小于 b"
else
  echo "无"
fi
```

* for 循环

```js
# 一般格式
for var in a1 a2 ... aN
do
  命令1
  命令2
  ...
  命令N
done
```

在了解完如上知识点后，我们来看看这些能做些什么。

### 2. 使用shell脚本自动将项目打包部署到git服务器

1. 一个git提交的例子

```sh
#!/bin/bash
git add .
git commit -m 'xj--'$1
git push

# 提交时只需要执行 bash git.sh '参数内容'即可完成提交操作
```

首先，我们在项目根目录下新建一个git.sh文件，输入以上脚本，保存，然后我们后面要提交代码时，只需要执行 bash git.sh '你的注释'，就可以将代码提交到服务器上了，是不是简化了我们提交的步骤呢

1. vue项目部署

我在[一张图教你快速玩转vue-cli3](https://juejin.im/post/5d1782eaf265da1ba91592fc)这篇文章中教大家了如何独立配置项目，文章末尾有写到部署的方式，如下：

```sh
#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build

# cd 到构建输出的目录
cd dist

git init
git add -A
git commit -m 'deploy'

git push -f git@bitbucket.org:<USERNAME>/<USERNAME>.bitbucket.io.git master

cd -
```

在学完shell脚本后，是不是觉得豁然开朗了呢。如果有更复杂的需求，我们可以用同样的方式去部署。

### 3.使用nodeJs编写命令行工具

我们这里使用commander来搭建node命令行，接下来我会给出最基本的用法，下一篇文章将专门来给大家讲解如何搭建一个高可用的node命令行工具，在此之前，大家可以自由摸索，也许会有更好的方式。

```sh
// 1.构建项目目录
mkdir xxx
cd xxx
npm init

// 2.安装commander模块
npm install commander --save

// 3.新建bin/[你自定义的命令行文件名]
#!/usr/bin/env node

var program = require('commander');

program.version('0.0.1');

program
  .command('help')
  .description('显示使用帮助')
  .action(function() {
    program.outputHelp();
  });

program
  .command('create [dir]')
  .description('创建一个空博客')
  .action(function(dir) {
    console.log('create %s', dir);
  });

program
  .command('preview [dir]')
  .description('实时预览')
  .action(function(dir) {
    console.log('preview %s', dir);
  });

program
  .command('build [dir]')
  .description('生成整站静态HTML')
  .option('-o, --output <dir>', '生成的静态HTML存放目录')
  .action(function(dir) {
      console.log('创建 %s, 输出 %s', dir, options.output);
  });

// 开始解析命令
program.parse(process.argv);

// 4.在package.json目录下执行关联操作
npm link

// 5.测试,输入相关命令即可执行对应操作
xxx help
```
