# WebParticleEffect Web页面背景粒子特效

-----

![image](https://github.com/user-attachments/assets/3d6a44fb-6ca3-4f20-8a71-57176c0f2409)

一个基于HTML5 Canvas的轻量级动态粒子背景库，可为网页创建优雅的互动粒子效果。支持鼠标互动、响应式布局和主题适配。

## ✨ 特性功能
- 🌌 自动生成彩色动态粒子网络
- 🖱️ 鼠标接近粒子吸引效果
- 📱 移动端优化显示（自动减少粒子数量）
- 🎨 支持亮/暗主题自动适配
- ⚙️ 高度可配置参数（颜色、速度、密度等）
- 🚀 高性能动画渲染（requestAnimationFrame优化）

## 🛠️ 快速开始

### 1. 引入HTML代码
```html
<canvas id="particleCanvas"></canvas>  //可自行设置层级以及窗体大小
```

### 2. 引入JS文件
```html
<script src="你的存放路径/BGeffects.js"></script>
```

### 2. 引入css文件
```html
<link href="你的存放路径/BGeffects.css" rel="stylesheet" />
```

## ⚙️ 配置选项
```javascript
// 在BGeffects.js中修改配置
new ParticleBackground({
    baseDensity: 35,        // 粒子密度基数
    maxParticles: 150,      // 最大粒子数量
    particleSpeed: 0.4,     // 粒子运动速度
    lineMaxDistance: 120,   // 粒子连线最大距离(px)
    lineOpacity: 0.4,       // 连线透明度
    mouseRadius: 180,       // 鼠标影响半径
    maxConnections: 4,      // 单个粒子最大连接数
    mobileFactor: 1.8       // 移动端粒子数量系数
});
```

## 🎨 主题适配
通过修改`data-theme`属性自动切换配色：
```javascript
document.documentElement.setAttribute('data-theme', 'dark'); // 或 'light'
```

## 🌐 浏览器支持
| ![Chrome](https://img.icons8.com/color/48/chrome--v1.png) | ![Firefox](https://img.icons8.com/color/48/firefox.png) | ![Safari](https://img.icons8.com/color/48/safari.png) |
|-----------------------------------------------------------|--------------------------------------------------------|-------------------------------------------------------|
| Chrome 75+                                                | Firefox 60+                                            | Safari 13+                                           |

## 📜 开源协议
本项目基于 [MIT License](LICENSE) 开源。

---
