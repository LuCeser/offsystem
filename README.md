# 编外 - 个人博客

一个软件工程师的独立博客，记录主流之外的思考与探索。采用现代设计理念，融合《纽约时报》的经典排版风格与苹果的简约设计哲学。

## 🎨 设计理念

- **简洁优雅**：采用现代极简设计风格，注重内容呈现
- **优秀排版**：精心设计的字体系统，确保最佳阅读体验
- **响应式设计**：完美适配各种设备，从手机到桌面
- **高性能**：优化的代码结构，快速加载
- **无障碍**：遵循Web无障碍标准，提升用户体验

## ✨ 特色功能

### 📝 内容管理
- 精美的文章列表页面
- 详细的文章阅读页面
- 文章分类和标签系统
- 搜索功能
- 分享功能

### 🎯 用户体验
- 平滑的滚动动画
- 悬停效果和微交互
- 移动端友好的导航菜单
- 深色模式支持（自动检测系统偏好）
- 面包屑导航

### 📱 响应式布局
- 移动优先的设计方法
- 弹性网格布局
- 适应性字体大小
- 触摸友好的交互元素

## 🛠️ 技术栈

- **HTML5**：语义化标签，现代Web标准
- **CSS3**：
  - CSS Grid 和 Flexbox 布局
  - CSS 变量和自定义属性
  - 现代动画和过渡效果
- **JavaScript**：原生JS，轻量级交互功能
- **字体**：Google Fonts (Playfair Display, Source Serif Pro, Inter)

## 📁 项目结构

```
myBlog/
├── index.html          # 首页
├── articles.html       # 文章列表页
├── article.html        # 文章详情页模板
├── about.html          # 关于页面
├── css/
│   ├── base.css        # 基础样式和变量
│   ├── typography.css  # 字体排版系统
│   ├── layout.css      # 布局样式
│   └── components.css  # 组件样式
├── js/
│   └── main.js         # 交互脚本
├── assets/
│   ├── fonts/          # 字体文件
│   └── images/         # 图片资源
├── articles/           # 文章内容
│   └── sample-article.md
└── README.md           # 项目说明
```

## 🚀 快速开始

1. 克隆或下载项目文件
2. 直接在浏览器中打开 `index.html`
3. 或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 PHP
php -S localhost:8000
```

4. 访问 `http://localhost:8000`

## 📝 自定义指南

### 修改个人信息
编辑 `about.html` 文件中的个人介绍和联系信息。

### 添加新文章
1. 复制 `article.html` 作为模板
2. 修改文章内容、标题、日期等信息
3. 在 `articles.html` 中添加文章链接

### 自定义样式
所有的样式都可以通过修改CSS变量来自定义：

```css
:root {
  --color-primary: #1a1a1a;      /* 主色调 */
  --color-accent: #0066cc;       /* 强调色 */
  --font-display: 'Playfair Display'; /* 标题字体 */
  --font-serif: 'Source Serif Pro';   /* 正文字体 */
}
```

### 添加新页面
1. 创建新的HTML文件
2. 复用现有的组件和样式
3. 在导航菜单中添加链接

## 🎯 浏览器支持

- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## 📄 许可证

MIT License - 可自由使用和修改

## 🤝 贡献

欢迎提交问题报告和功能建议！

## 🔗 相关链接

- [Google Fonts](https://fonts.google.com/) - 字体资源
- [CSS Tricks](https://css-tricks.com/) - CSS技巧和教程
- [MDN Web Docs](https://developer.mozilla.org/) - Web技术文档

---

**用心记录，分享思考** ✨