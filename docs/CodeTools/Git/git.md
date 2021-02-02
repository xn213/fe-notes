# Git初识

## 命令行相关

### bash常见命令

```shell
pwd (Print Working Directory) 查看当前目录

cd (Change Directory) 切换目录，如 cd /etc

ls (List) 查看当前目录下内容，如 ls

mkdir (Make Directory) 创建目录，如 mkdir blog

touch 创建文件，如 touch index.html

cat 查看文件全部内容，如 catindex.html

rm (remove) 删除文件(空文件夹)，如 rm index.html、rm Blog
rm -rf blog  强制删除文件夹,非空文件夹也可以删除

rmdir (Remove Directory) 删除文件夹，只能删除空文件夹，不常用

mv (move) 移动文件或重命名，如 mv index.html ./demo/index.html

cp (copy) 复制文件，cp index.html ./demo/index.html

head 查看文件前几行，如 head -5 index.html

history 查看操作历史

whoami 查看当前用户
```

### 常用git命令

注解                            | 命令
------------------------------- | -------------------------
git reset HEAD XXX              | 从暂存区移出
git diff                        | 查看编辑过的文件和 版本库的区别
git config user.name xxx        | 配置当前仓库的用户名
git config user.email xxx       | 配置当前仓库的邮箱
git init                        | 初始化 git 仓库
git add xxx                     | 添加到暂存区
git commit -m "备注"             | 提交到本地仓库
git commit -m "备注" -a          | git add  和 git commit 的综合
git remote -v                    | 查看远程仓库地址
git remote add 远程仓库名  远程仓库地址    | 添加远程仓库地址
git remote rm 远程仓库名             | 删除远程仓库
git remote set-url 远程仓库名 远程仓库地址 | 修改远程仓库地址
git push 远程仓库地址 master          | 提交到远程仓库
git push 远程仓库地址 master -u       | 提交到远程仓库 (以后 git push 即可)
git clone 远程仓库地址                | 克隆仓库
git pull                        | 拉取更新
ssh-keygen -t rsa -C "邮箱地址"     | 生成 ssh证书
cat ~/.ssh/id_rsa.pub           | 查看ssh证书
git reset --hard "commit Id"    | 还原到某版本
git reset --hared HEAD^         | 还原到上一个版本
git log                         | 查看版本历史
git reflog                      | 查看更强大的版本历史
git checkout 文件名                | 还原文件到上一个版本
git branch 分支名                  | 创建分支
git checkout 分支名                | 切换到分支
git merge 分支名                   | 合并分支
git branch                        | 查看分支
git branch -d 分支名               | 删除分支
git push origin --delete 分支名    | 删除远程分支
git branch -r                      | 查看远端分支
git branch -a                      | 查看所有分支

### vi编辑器

> vi编辑器是Linux和Unix上最基本的文本编辑器。由于不需要图形界面，vi是效率很高的文本编辑器
>
> vi编辑器提供了3种模式，分别是**命令模式、插入模式、末行模式** 每种模式有不同的功能

```bash
a) 打开/创建文件， vi 文件路径
b) 末行模式 :w保存，:w filenme另存为
c) 末行模式 :q退出
d) 末行模式 :wq保存并退出
e) 末行模式 :e! 撤销更改，返回到上一次保存的状态
f) 末行模式 :q! 不保存强制退出

================================================================

h) 命令模式 ZZ（大写）保存并退出
i) 命令模式 u辙销操作，可多次使用
j) 命令模式 dd删除当前行
k) 命令模式 yy复制当前行
l) 命令模式 p 粘贴内容
o) 命令模式 i进入编辑模式，当前光标处插入
p) 命令模式 a进入编辑模式，当前光标后插入
q) 命令模式 A进入编辑模式，光标移动到行尾
r) 命令模式 o进入编辑模式，当前行下面插入新行
s) 命令模式 O进入编辑模式，当前行上面插入新行
```

---

## Git基础/常规

**Git**是一款免费、开源的**分布式版本控制系统**，用于敏捷高效地处理任何或小或大的项目。

### 1.全局配置

```bash
# 配置 用户名
git config --global  user.name  xxx

# 配置 邮箱
git config --global  user.email  xxx

# 查看用户名
git config   user.name
```

### 2.创建版本库

在项目目录, 输入命令初始化项目版本仓库

```bash
git init
```

成功后,目录多了个**`.git`的隐藏文件夹**. 该文件夹便是实现存放版本记录的地方。

### 3.添加暂存区

至此我们的代码 和 git 仓库 还没有直接的联系  查看 git 仓库状态  输入 `git status`可以查看git状态

```bash
git status
```

我们可以 随时的  输入  `git status` 来查看当前仓库的状态，以此获得相关提示。

我们把添加跟踪的步骤，叫做 添加到 **暂存区**

输入  `git add .` 对所有文件进行跟踪

```bash
git add .
```

### 4.提交本地仓库

暂存区的意思 只是暂时存储文件，当需要把对文件的操作 **永久存储下来时**，需要在把暂存区中的文件提交到到本地仓库。

```bash
输入以下命令进行提交，同时 还需要备注 信息 如 `初始化项目` 等。
```

```bash
git commit -m "初始化项目"
```

---

## 增加修改删除文件

每当**增加 / 修改 / 删除**文件时,可以通过`git status`查看当前git状态

```bash
git status
```

将增加修改删除的文件添加到**暂存区**,

删除了文件，也可以了解为是对项目 进行了一次升级改造

输入    `git add ./`   请注意 当添加删除操作时  使用 `git add *` 是无效的。

```bash
git add .    #该命名通用
git add *
git add ./
```

提交到本地仓库,**(将暂存区中的文件提交到 本地仓库 实现 版本 记录)**

```bash
git commit -m "完成了xx功能"     #描述信息必须写
```

当bash反馈为`working directory clean`则是我们最应该想看到的

---

## 忽略文件`.gitignore`

有时候有些文件,是不需要添加到版本控制中,属于私人文件或者是项目运行产生的文件,此时可以创建**忽略文件清单**

### 创建忽略文件

使用命令行在当前项目创建,(注意,此类型文件是不能用过右键创建的)

```bash
touch .gitignore
```

编辑创建的`.gitignore`文件,直接写入要忽略的文件名

```bash
#忽略该文件
私人文件.txt
```

此时再次查看git状态,则看不到`私人文件.txt`状态了

### 忽略文件语法

* 语法大部分和正则类似

* 空行或是以#开头的行即注释行将被忽略；

    ```bash
    # 这种是注释
    ```

* 以斜杠 “/” 结尾表示目录；

    ```bash
    css/
    ```

* 以星号 “*” 通配多个字符；

    ```bash
    *.js
    ```

* 以问号 “?” 通配单个字符

* 以方括号 “[ ]” 包含单个字符的匹配列表；

* 以叹号 “!” 表示不忽略(跟踪)匹配到的文件或目录；

* 可以在前面添加斜杠 “/” 来避免递归

    ```bash
    # 忽略根目录下的 css 文件夹
    /css
    # 忽略所有的css文件夹
    css/
    ```

---

## 推送到远程仓库

获取远程仓库地址, 如`github` 有**HTTPS与SSH**两种方式

**HTTPS地址**

* 把远程仓库 记录在一个 变量   `origin` 上  该名字可自定义

    ```bash
    git remote add origin https://github.com/xn213/gitTest.git
    ```

* 在推送到远程仓库之前，先确保 本地仓库已经 执行过 commit 了，这样 才会保证 本地仓库 和远程仓库一致。

* 第一次开始推送

    ```bash
    git push -u origin master
    ```

* 提示输入用户名 ，直接输入即可 如 `xn213`  然后按下回车

* 提示输入密码, 输入正确密码, 回车即可

* 同时，刷新一下 **github** 页面  看到远程仓库上 显示出 仓库的信息了。

## 从远程仓库克隆

得到远程仓库地址,如

```bash
https://github.com/xn213/gitTest.git
```

输入命令行

```bash
git clone https://github.com/xn213/gitTest.git
```

> `git clone` 是克隆，只需要执行一次

## 从远程仓库获取更新

把需要上传的文件先添加提交到本地仓库

然后获取远程仓库的最新版本,通过`git pull`命令, 更新通过HTTPS地址是不需要填写用户密码,只有提交才需要

```bash
git pull
```

再次通过`git status` 查看git仓库状态, 如有冲突,请手动处理冲突

最后通过`git push`本地仓库版本

> `git pull` 是 更新，后期反复使用

---

## 配置SSH

我们把文件从本地仓库推送到远程仓库的方式有两种

* HTTPS 每次都要手动输入 用户名和密码
* SSH 配置证书后，不用手动输入用户名和密码

### 配置证书

在git bash 命令行中输入

```bash
ssh-keygen -t rsa -C "邮箱地址"  #建议邮箱与github邮箱相同
```

然后一直按回车。直到本地 证书生成成功

输入命令 打印密钥

```bash
cat ~/.ssh/id_rsa.pub
```

复制生成的本地秘钥,找到github的ssh新建粘贴即可

输入以下命令,可查看ssh是否配置成功

```bash
ssh -T git@github.com
```

### 将提交方式 HTTPS 改为 SSH

复制远程仓库SSH地址,如

```bash
git@github.com:xn213/gitTest.git
```

修改 **origin** 地址

如果之前已经将 地址 存入 **origin**  变量了 。查看 origin

```bash
git remote -v
```

此时，将origin的地址 改为 **ssh** 地址即可

```bash
git remote set-url origin git@github.com:xn213/gitTest.git
```

重新查看 `git remote -v` 发现修改成功

---

## 版本回退

### 回退到上一个版本

在项目文件夹内bash

```bash
git checkout  需要回退的文件名或者文件夹

# 回退index.html到上一个版本
git checkout index.html

# 还原文件夹 styles 文件夹
git checkout styles

# 还原当前目录的所有文件
git checkout ./
```

### 查看版本历史

```bash
git log
```

### 还原到某一个版本

```bash
# 先通过 git log 查看git的版本, 通过备注信息寻找自己需要回退的版本,记录其版本号
# 如版本号为 3db7762c593251f1a78e518fdd3ed6d6cad626bc

# 开始还原(版本号字段最少需要6个以上)
git reset -–hard 3db7762c593251f1a78e518fdd3ed6d6cad626bc
```

当版本回退后, 再次`git log`,会发现当前回退的版本之后的版本日志消失了

此时, 输入`git reflog`, 可以查看到丢失的版本日志

```bash
git reflog
```

还原到最新版本,

```bash
# 如版本号为 5038cc9c593251f
git reset -–hard 5038cc9
```

此时,再次`git log`会发现丢失的版本号回来了.

---

## 分支

在使用git的时候，一直在 git的主分支`master`也是默认分支下进行工作的。也可以手动开启另外的分支进行开发。

```bash
开启新的的分支时可以理解为复制了一个相同的副本.内容完全一样

分支的作用是提供了一种方便、高效的管理项目的手段。
```

### 开启新分支

在完成1.0版本发布后（commit之后），开启新分支 dev（dev为分支名）

```bash
git branch dev
```

查看当前仓库下的分支

```bash
git branch
```

### 切换分支

需要手动切换分支到dev上，

```bash
git checkout dev
```

在dev分支上, 开发新功能同样需要git的基本流程, 与主分支master互不影响

```bash
git add .
git commit -m "dev下开发新功能1.1"
```

### 合并分支

新功能开发完毕，需要将分支`dev`的代码合并到主分支`master`上

1. 切换回主分支 `master`

    ```bash
    git checkout master
    ```

2. 合并分支 `dev`

    ```bash
    git merge dev
    ```

## 删除分支

既然 分支dev的功能已经完成，我们可以将其删除。

```bash
git branch -d dev
```

---

## 冲突

* 在文件进行合并时容易产生
* 冲突的解决方法，只能是用户决定

出现冲突需要手动修改冲突代码,自己选择去留,解决冲突后, 再次提交到本地仓库,再推送到远程仓库

## 拓展

[Pro Git](https://progit.bootcss.com/)

[猴子都能看懂的git](https://backlog.com/git-tutorial/cn)

[十分钟掌握bash 命令](https://www.cnblogs.com/savorboard/p/bash-guide.html)
