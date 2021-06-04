# 使用 `hugo` 创建博客

`hugo` 基于 `go` 语言, 相对于 `hexo` 步骤简单, 不易出错; `hexo` 需要安装很多依赖

## 一. 安装 `hugo`

1. OS : `brew install hugo`
2. win : [下载 Hugo https://github.com/gohugoio/hugo/releases](https://github.com/gohugoio/hugo/releases) 下载 32/64 位

> 查看版本命令 `hugo version`
> window 需配置环境变量;(<del>在安装路径下 打开命令行 输入也可以查看版本</del>)
> 
> > 配置环境变量: 系统>高级系统设置>环境变量>系统变量>新建:变量名随意不冲突就行如 `HUGO`,变量值为 hugo.exe 所在的路径文件夹(**不需写hugo.exe**)确定,然后找到PATH编辑, 在变量值最后加上`;%刚才写的变量名%`,如: `;%HUGO%` , 注意前后分号;

## 二. 创建

1. 命令: `hugo new site <项目名>`
2. 快到你不敢相信 秒建

## 三. 主题

1. [hugo 主题库 https://themes.gohugo.io](https://themes.gohugo.io)

2. 项目目录下, 下载主题:
`git clone https://github.com/vaga/hugo-theme-m10c.git themes/m10c`

## 四. 启动

1. 命令:

  ```bash
  # -t 指定主题: m10c
  hugo server -t m10c --buildDrafts
  # Web Server is available at http://localhost:1313
  ```

## 五. 写博客

1. 命令:

  ```bash
  # 项目目录下执行命令, 会在 content/post/first-blog.md
  hugo new post/first-blog.md
  ```

## 六. 部署到 github

1. 命令: 

   ```bash
   # 首先打包, 生成 public
   # --themes=m10c 指定主题 --baseUrl="部署地址" --buildDrafts build
   hexo --themes=m10c --baseUrl="https://xn213.github.io/blog-by-hugo"

   # 进入 public  使用 git push 到 github
   git init
   git add .
   git commit -m '第一次提交 hugo 创建的博客'
   # 本地关联远端
   git remote add origin https://github.com/xn213/blog-by-hugo.git
   git push -u origin master
   ```