# 宙斯证书生成器 V1

一个功能强大的多语言证书生成工具，支持9种语言和5个VIP等级的证书模板。

## 🚀 功能特点

- **多语言支持**: 支持9种语言的证书模板
- **VIP等级**: 每个语言都有VIP1-VIP5五个等级
- **实时预览**: 拖拽调整位置和大小
- **现代化界面**: 响应式设计，支持移动端
- **一键下载**: 自动生成带模板信息的文件名

## 📁 项目结构

```
DCG v2.0/
├── index.html              # 主页面
├── assets/                 # 资源文件夹
│   ├── css/
│   │   └── style.css       # 样式文件
│   ├── js/
│   │   └── app.js          # 主要JavaScript逻辑
│   └── images/             # 其他图片资源
├── templates/              # 模板文件夹
│   ├── english/            # 英语模板
│   ├── armenian/           # 亚美尼亚语模板
│   ├── hungarian/          # 匈牙利语模板
│   ├── spanish/            # 西班牙语模板
│   ├── ukrainian/          # 乌克兰语模板
│   ├── french/             # 法语模板
│   ├── russian/            # 俄语模板
│   ├── bulgarian/          # 保加利亚语模板
│   └── romanian/           # 罗马尼亚语模板
└── README.md               # 说明文档
```

## 🎨 模板文件命名规范

### 英语模板 (templates/english/)
- `English_VIP1.png`
- `English_VIP2.png`
- `English_VIP3.png`
- `English_VIP4.png`
- `English_VIP5.png`

### 亚美尼亚语模板 (templates/armenian/)
- `Armenian_VIP1.png`
- `Armenian_VIP2.png`
- `Armenian_VIP3.png`
- `Armenian_VIP4.png`
- `Armenian_VIP5.png`

### 匈牙利语模板 (templates/hungarian/)
- `Hungarian_VIP1.png`
- `Hungarian_VIP2.png`
- `Hungarian_VIP3.png`
- `Hungarian_VIP4.png`
- `Hungarian_VIP5.png`

### 西班牙语模板 (templates/spanish/)
- `Spanish_VIP1.png`
- `Spanish_VIP2.png`
- `Spanish_VIP3.png`
- `Spanish_VIP4.png`
- `Spanish_VIP5.png`

### 乌克兰语模板 (templates/ukrainian/)
- `Ukrainian_VIP1.png`
- `Ukrainian_VIP2.png`
- `Ukrainian_VIP3.png`
- `Ukrainian_VIP4.png`
- `Ukrainian_VIP5.png`

### 法语模板 (templates/french/)
- `French_VIP1.png`
- `French_VIP2.png`
- `French_VIP3.png`
- `French_VIP4.png`
- `French_VIP5.png`

### 俄语模板 (templates/russian/)
- `Russian_VIP1.png`
- `Russian_VIP2.png`
- `Russian_VIP3.png`
- `Russian_VIP4.png`
- `Russian_VIP5.png`

### 保加利亚语模板 (templates/bulgarian/)
- `Bulgarian_VIP1.png`
- `Bulgarian_VIP2.png`
- `Bulgarian_VIP3.png`
- `Bulgarian_VIP4.png`
- `Bulgarian_VIP5.png`

### 罗马尼亚语模板 (templates/romanian/)
- `Romanian_VIP1.png`
- `Romanian_VIP2.png`
- `Romanian_VIP3.png`
- `Romanian_VIP4.png`
- `Romanian_VIP5.png`

## 📋 使用说明

### 1. 准备模板文件
- 将你的证书模板图片按照上述命名规范放入对应的文件夹
- 图片格式建议使用PNG格式，尺寸为1280x800像素
- 如果某个模板文件不存在，系统会显示默认模板

### 2. 打开应用
- 直接在浏览器中打开 `index.html` 文件
- 或者使用本地服务器运行（推荐）

### 3. 生成证书
1. **选择模板**: 点击左侧面板选择语言和VIP等级
2. **上传头像**: 点击"上传头像"按钮选择头像图片
3. **输入信息**: 填写姓名和UID
4. **调整位置**: 拖拽头像、姓名、UID到合适位置
5. **调整大小**: 使用放大/缩小按钮调整字体和头像大小
6. **下载证书**: 点击"下载证书"按钮保存图片

## 🛠️ 技术特点

- **纯前端实现**: 无需服务器，直接在浏览器中运行
- **Canvas绘图**: 使用HTML5 Canvas进行图像处理
- **响应式设计**: 支持桌面和移动设备
- **模块化代码**: 使用ES6类组织代码结构
- **错误处理**: 自动处理缺失的模板文件

## 🎯 自定义配置

### 调整默认位置和大小
在 `assets/js/app.js` 文件中修改以下参数：

```javascript
// 位置和大小参数
this.avatarX = 77;        // 头像X坐标
this.avatarY = 188;       // 头像Y坐标
this.avatarSize = 240;    // 头像大小
this.nameX = 405;         // 姓名X坐标
this.nameY = 199;         // 姓名Y坐标
this.nameSize = 72;       // 姓名字体大小
this.uidX = 140;          // UID X坐标
this.uidY = 481;          // UID Y坐标
this.uidSize = 40;        // UID字体大小
```

### 添加新语言
1. 在 `templates` 对象中添加新的语言配置
2. 创建对应的文件夹和模板文件
3. 在HTML中添加新的国家选择区域

## 📞 支持

如有问题或建议，请检查：
1. 模板文件是否按照命名规范放置
2. 浏览器控制台是否有错误信息
3. 图片文件是否损坏

## 📄 许可证

本项目仅供学习和个人使用。
