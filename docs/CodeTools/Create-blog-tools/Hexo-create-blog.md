# 使用 `hexo` 创建博客

> 基于 `hexo` + `markdown` 搭建个人博客. 容易上手搭建, 生态相对完善成熟, 问题解决方案全面
>
> 这里介绍 / 安装 / 搭建 / 修改主题 / 部署到github

## 1. 安装 `nodejs` / `hexo`

```bash
# 淘宝镜像源
npm install -g --registry=https://registry.npm.taobao.org

# 安装 hexo
cnpm i hexo-cli -g
# 验证 hexo
hexo -v
## hexo: 3.9.0
## hexo-cli: 2.0.0
## node: 10.16.0
```

## 2. hexo命令创建项目

> 创建项目文件夹 cd 进入执行如下命令:

```bash
# 初始化项目
hexo init
# 默认克隆一个landscape 主题: themes/landscape;
# 默认创建一篇文章: source/_posts/hello-world.md
# 进入项目根目录, hexo start
# ==> 简写为hexo s
hexo s
```

## 3. 创建第一篇博客

```bash
# n => new
# ./source/_posts/my-first-blog.md
hexo n '文章名: 如: my-first-blog'
hexo n 'my-first-blog'
```

### 新建页面（重要）

```bash
# 比如说新建标签页面，执行命令之后会在根目录source文件夹下创建tags文件夹
hexo new page "tags"
```

## 4. 修改主题

```bash
# 克隆主题, 放到themes目录下的<主题名文件夹>下
# 如下是 `yilia` 的主题
git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```

**重点修改配置**

```yml
# Extensions
## Plugins: https://hexo.io/plugins/
## Themes: https://hexo.io/themes/
# 主题名: ./themes/<主题名>
theme: yilia # 默认 landscape
```

```bash
# 清一下
hexo clean
# INFO  Deleted database.
# INFO  Deleted public folder.
```

## 5. 部署到 `gihub-pages`

> 用到 git 插件 hexo-deployer-git

```bash
# 项目目录安装
cnpm i --save hexo-deployer-git
```

> 项目配置文件 `_config.yml` 中修改如下配置

```yml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  # type 使用 git 部署
  type: git
  # github 地址:
  repo: https://github.com/<username>/<proname>.git
  # github 项目分支, 默认 master, 还是写一下吧
  branch: master
```

```bash
# 部署命令: hexo deploy 简称 `hexo d`
hexo d
```
