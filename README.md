# 网页连连看游戏

一个基于HTML、CSS和JavaScript实现的网页版连连看游戏。

## 游戏介绍

连连看是一款经典的益智游戏，玩家需要在规定时间内找出并连接所有相同的图标。

### 游戏规则

1. 点击两个相同的图标
2. 如果两个图标可以通过直线连接（最多两个拐角），则消除这两个图标
3. 消除所有图标即可获胜
4. 游戏有时间限制，需要在规定时间内完成

## 功能特点

- 🎮 三种难度级别：简单(6x6)、中等(8x8)、困难(10x10)
- ⏱️ 计时系统：5分钟倒计时
- 🏆 计分系统：每次成功匹配获得10分
- 🎨 精美的UI设计，响应式布局
- 🔄 重新开始功能
- 📱 移动端适配

## 技术栈

- **HTML5**: 页面结构
- **CSS3**: 样式和动画效果
- **JavaScript (ES6+)**: 游戏逻辑

## 快速开始

### 在线体验

直接访问GitHub Pages: [https://zhoukaigo.github.io/web-link-link-game/](https://zhoukaigo.github.io/web-link-link-game/)

### 本地运行

1. 克隆项目到本地：
```bash
git clone https://github.com/zhoukaigo/web-link-link-game.git
```

2. 进入项目目录：
```bash
cd web-link-link-game
```

3. 使用任意HTTP服务器打开 `index.html` 文件，例如：
```bash
# 使用Python 3
python -m http.server 8000

# 或使用Node.js http-server
npx http-server

# 或直接使用浏览器打开index.html文件
```

4. 在浏览器中访问 `http://localhost:8000`

## 游戏操作说明

1. **选择难度**: 在游戏开始前选择适合的难度级别
2. **点击图标**: 点击两个相同的图标进行匹配
3. **重新开始**: 点击"重新开始"按钮重置游戏
4. **查看得分**: 实时显示当前得分和剩余时间

## 游戏截图

![游戏界面](游戏界面截图)

## 项目结构

```
web-link-link-game/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── game.js             # 游戏逻辑
└── README.md           # 项目说明
```

## 开发说明

### 核心类

- `LinkLinkGame`: 游戏主类，包含所有游戏逻辑

### 主要方法

- `createBoard()`: 创建游戏棋盘
- `renderBoard()`: 渲染棋盘到页面
- `handleCellClick()`: 处理格子点击事件
- `canConnect()`: 检查两个格子是否可以连接
- `matchCells()`: 匹配两个格子

## 浏览器兼容性

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 许可证

MIT License

## 贡献

欢迎提交Issue和Pull Request来改进这个项目！

## 更新日志

### v1.0.0 (2024-11-24)
- 初始版本发布
- 实现基本连连看游戏功能
- 添加三种难度级别
- 实现计时和计分系统