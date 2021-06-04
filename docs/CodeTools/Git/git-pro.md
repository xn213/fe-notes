# git 常用命令

1. git status 查看状态
2. git add . 添加所有到暂存
3. git commit -m '提交内容版本备注注释' 提交版本(使用-m 参数 ，附带简明提交说明信息。)
4. git pull 拉取最新内容到本地
5. git push 提交
   git push -f ...
6. git branch 查看分支
7. git branch -a 查看远程项目所有分支
8. git checkout <branchName>切换分支
9. git remote -v 查看远端仓库地址
10. git remote show origin 查看当前仓库基本信息。

11. git log 查看所有的commit提交记录
```bash
git log
git log --pretty=oneline
# oneline 将每个提交放在一行显示，这在提交数很大时非常有用。
```
1. 查看最新的commit
```bash
git show
```
2. 查看指定commit hashID的所有修改：
```bash
git show commitId
```
3. 查看某次commit中具体某个文件的修改：
```bash
git show commitId fileName
```