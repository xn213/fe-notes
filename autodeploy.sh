#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件/dist && 使用 gh-pages 部署到config.js中设置的对应仓库 gh-papes 分支下
npm run deploy:build