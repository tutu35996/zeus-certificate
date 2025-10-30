# 宙斯证书生成器 V1（黑金主题）

一个专注“证书模板 + 头像 + UID”的前端生成器，支持 6 种语言、VIP1-5 模板，画布 2048×1152，黑金风格 UI。

## 🚀 功能特点

- **语言模板**：英语、法语、罗马尼亚语、亚美尼亚语、阿拉伯语、希腊语（各自 VIP1-VIP5）
- **高分辨率**：画布 2048×1152，模板等比填充
- **头像处理**：上传后按圆形区域裁切，object-fit: cover 居中填充，位置/大小默认固定
- **UID 编辑**：输入即显；可拖拽移动；可按钮调节字号；发光金色字体（#e8d28e）
- **实时坐标**：左侧面板展示头像/UID 的当前位置与大小（基准坐标）
- **一键下载**：生成 PNG，自动带国家与 VIP 信息

## 📁 项目结构

```
Zeus Certificate/
├── index.html              # 主页面
├── assets/
│   ├── css/
│   │   └── style.css       # 黑金主题样式
│   ├── js/
│   │   └── app.js          # 主逻辑（Canvas 渲染/交互）
│   └── images/             # 其他图片资源
├── templates/              # 模板图片（按语言分类）
│   ├── english/            # 英语
│   ├── french/             # 法语
│   ├── romanian/           # 罗马尼亚语
│   ├── armenian/           # 亚美尼亚语
│   ├── arabic/             # 阿拉伯语
│   └── greek/              # 希腊语
└── README.md
```

## 🎨 模板文件命名规范

所有模板均为 PNG，命名：`<Language>_VIP1..VIP5.png`

- 英语（templates/english/）：English_VIP1.png … English_VIP5.png
- 法语（templates/french/）：French_VIP1.png … French_VIP5.png
- 罗马尼亚语（templates/romanian/）：Romanian_VIP1.png … Romanian_VIP5.png
- 亚美尼亚语（templates/armenian/）：Armenian_VIP1.png … Armenian_VIP5.png
- 阿拉伯语（templates/arabic/）：Arabic_VIP1.png … Arabic_VIP5.png
- 希腊语（templates/greek/）：Greek_VIP1.png … Greek_VIP5.png

> 放好对应图片后，页面会自动按选择的语言与 VIP 加载模板。

## 📋 使用说明

1) 打开 `index.html`（或通过本地服务器打开）
2) 左侧选择语言与 VIP 等级
3) 上传头像（支持直接粘贴）
4) 输入 UID（立即显示、可拖拽移动、按钮可调字号）
5) 点击“下载证书”保存 PNG

默认坐标（基准）
- 头像：`(74, 168, 142)`（固定位置与大小，圆形裁切、cover 填充）
- UID：`(294, 304, 36)`（可拖拽移动，字号可调）

## 🛠️ 技术要点

- 纯前端：HTML/CSS/JavaScript，无需后端
- Canvas 渲染：模板背景 + 头像（圆形 cover）+ UID（金色发光）
- 高分辨率：画布 2048×1152
- 黑金主题：全局 UI 使用 #e8d28e 金色与深色背景

## 🔧 常见问题

- 模板不显示：检查 `templates/<language>/` 下是否存在对应 `VIP*.png`
- UID 不显示：确认已输入内容；浏览器控制台是否有错误；刷新重试
- 拖拽不准确：请在缩放 100% 下调试；本项目已基于实际 canvas 像素做坐标换算

## 🚢 部署（GitHub Pages）

1) GitHub 仓库 → Settings → Pages
2) Source 选择 `Deploy from a branch`
3) Branch 选择 `main`，Folder 选 `/root`
4) 保存后等待生效，访问自动生成的页面链接

## 📄 许可证

本项目仅供学习与个人使用。
