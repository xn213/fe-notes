# 使用 git commit 的信息模板来自动生成信息

首先在创建一个文件： `~/.gitmessage`, 其内容如下：

```js
[#id] title

[问题描述]
1. ...
2. ...

[问题原因]
1. ...
2. ...

[解决方案]
1. fix ...
2. enhance ...
```

接下来，打开配置文件： `~/.gitconfig`，在末尾增加两行内容：

```js
[commit]
    template = ~/.gitmessage
```

保存配置文件。

下一次，当你执行命令： `git commit` 时，就会看到信息模板了。

<br/>

> 原文发布于微信公众号 - 未闻Code（itskingname）
>
> 原文发表时间：2018-12-25
