#!/bin/bash

# 像素博客启动脚本

echo "🚀 启动像素博客服务器..."
echo "📍 项目目录: $(pwd)"
echo "🌐 服务器地址: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "=================================="

# 检查Python是否可用
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "❌ 错误：未找到Python环境"
    echo "请安装Python或使用其他本地服务器"
    exit 1
fi