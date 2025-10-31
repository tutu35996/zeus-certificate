// 宙斯证书生成器 V1 - 主要JavaScript逻辑

class CertificateGenerator {
  constructor() {
    this.canvas = document.getElementById('certificateCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.uidInput = document.getElementById('uidInput');
    this.avatarUpload = document.getElementById('avatarUpload');
    this.coordsDisplay = document.getElementById('coordsDisplay');
    this.loadingOverlay = document.getElementById('loadingOverlay');
    this.errorOverlay = document.getElementById('errorOverlay');
    this.retryBtn = document.getElementById('retryBtn');
    
    // 模板配置（精简为6种语言，并新增阿拉伯语/希腊语占位路径）
    this.templates = {
      french: {
        1: "templates/french/French_VIP1.png",
        2: "templates/french/French_VIP2.png",
        3: "templates/french/French_VIP3.png",
        4: "templates/french/French_VIP4.png",
        5: "templates/french/French_VIP5.png"
      },
      romanian: {
        1: "templates/romanian/Romanian_VIP1.png",
        2: "templates/romanian/Romanian_VIP2.png",
        3: "templates/romanian/Romanian_VIP3.png",
        4: "templates/romanian/Romanian_VIP4.png",
        5: "templates/romanian/Romanian_VIP5.png"
      },
      english: {
        1: "templates/english/English_VIP1.png",
        2: "templates/english/English_VIP2.png",
        3: "templates/english/English_VIP3.png",
        4: "templates/english/English_VIP4.png",
        5: "templates/english/English_VIP5.png"
      },
      german: {
        1: "templates/german/German_VIP1.png",
        2: "templates/german/German_VIP2.png",
        3: "templates/german/German_VIP3.png",
        4: "templates/german/German_VIP4.png",
        5: "templates/german/German_VIP5.png"
      },
      armenian: {
        1: "templates/armenian/Armenian_VIP1.png",
        2: "templates/armenian/Armenian_VIP2.png",
        3: "templates/armenian/Armenian_VIP3.png",
        4: "templates/armenian/Armenian_VIP4.png",
        5: "templates/armenian/Armenian_VIP5.png"
      },
      arabic: {
        1: "templates/arabic/Arabic_VIP1.png",
        2: "templates/arabic/Arabic_VIP2.png",
        3: "templates/arabic/Arabic_VIP3.png",
        4: "templates/arabic/Arabic_VIP4.png",
        5: "templates/arabic/Arabic_VIP5.png"
      },
      greek: {
        1: "templates/greek/Greek_VIP1.png",
        2: "templates/greek/Greek_VIP2.png",
        3: "templates/greek/Greek_VIP3.png",
        4: "templates/greek/Greek_VIP4.png",
        5: "templates/greek/Greek_VIP5.png"
      }
    };
    
    // 当前状态
    this.template = new Image();
    this.currentCountry = 'english';
    this.currentVip = 1;
    this.avatar = null;
    
    // 基准尺寸（基于旧版1280x800），实际渲染时按画布缩放
    this.baseWidth = 1280;
    this.baseHeight = 800;
    // 位置和大小（按基准存储），头像初始化和模板切换都固定为(74,168,142)
    this.avatarX = 74;
    this.avatarY = 168;
    this.avatarSize = 142;
    // UID 默认值改为 (294, 304, 36)
    this.uidX = 294;
    this.uidY = 304;
    this.uidSize = 36;
    
    // 拖拽状态
    this.dragging = null;
    this.offsetX = 0;
    this.offsetY = 0;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    // 初始显示加载动画
    this.showLoading();
    this.loadTemplate();
  }
  
  // 将鼠标事件坐标转换为canvas像素坐标
  getMouseCanvasPos(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    return { x, y };
  }
  
  setupEventListeners() {
    // 国家标题点击事件（手风琴效果）
    document.querySelectorAll('.country-title').forEach(title => {
      title.addEventListener('click', () => {
        this.toggleCountry(title);
      });
    });
    
    // 模板选择事件
    document.querySelectorAll('.vip-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectTemplate(btn);
      });
    });
    
    // 头像上传
    this.avatarUpload.addEventListener('change', (e) => {
      this.handleAvatarUpload(e);
    });
    
    // 粘贴上传头像
    document.addEventListener('paste', (e) => {
      this.handlePasteUpload(e);
    });
    
    // 拖拽事件 只允许uid拖动，禁止avatar拖动
    this.canvas.addEventListener('mousedown', (e) => {
      const { x: mouseX, y: mouseY } = this.getMouseCanvasPos(e);
      const sx = this.canvas.width / this.baseWidth;
      const sy = this.canvas.height / this.baseHeight;
      const uidSize = this.uidSize * sy;
      const uidX = this.uidX * sx;
      const uidY = this.uidY * sy;
      this.ctx.font = `${uidSize}px sans-serif`;
      const uidWidth = this.ctx.measureText(this.uidInput.value).width || 50;
      const uidHit = mouseX > uidX-30 && mouseX < uidX+uidWidth+30 && mouseY > uidY-uidSize && mouseY < uidY+20;
      if (uidHit) {
        this.dragging = 'uid';
        this.dragOffsetX = (mouseX - uidX) / sx;
        this.dragOffsetY = (mouseY - uidY) / sy;
      }
      this.offsetX = mouseX;
      this.offsetY = mouseY;
    });
    this.canvas.addEventListener('mousemove', (e) => this.duringDrag(e));
    this.canvas.addEventListener('mouseup', () => this.stopDrag());
    
    // 大小调整按钮（头像&UID）
    document.getElementById('uidBigger').onclick = () => { this.uidSize += 2; this.drawAll(); };
    document.getElementById('uidSmaller').onclick = () => { this.uidSize -= 2; this.drawAll(); };
    
    // 移除头像缩放按钮绑定（按钮已不存在，避免空元素报错）
    // const ab = document.getElementById('avatarBigger');
    // const as = document.getElementById('avatarSmaller');
    // if (ab) ab.onclick = () => { this.avatarSize += 10; this.updateAvatarInfo(); this.drawAll(); };
    // if (as) as.onclick = () => { this.avatarSize = Math.max(20, this.avatarSize - 10); this.updateAvatarInfo(); this.drawAll(); };
    
    // 下载功能
    document.getElementById('downloadBtn').onclick = () => this.downloadCertificate();
    
    // 重试按钮
    if (this.retryBtn) {
      this.retryBtn.addEventListener('click', () => {
        this.loadTemplate();
      });
    }
    
    // 输入监听
    this.uidInput.addEventListener('input', () => this.drawAll());
    this.uidInput.addEventListener('keyup', () => this.drawAll());
    this.uidInput.addEventListener('change', () => this.drawAll());
    this.uidInput.addEventListener('compositionend', () => this.drawAll());
    this.uidInput.addEventListener('paste', () => setTimeout(() => this.drawAll(), 0));
    
    // 默认选择第一个模板并展开第一个国家
    document.addEventListener('DOMContentLoaded', () => {
      // 默认展开“英语”
      const englishTitle = document.querySelector('.country-title[data-country="english"]');
      if (englishTitle) {
        const vipGrid = document.querySelector('.vip-grid[data-country="english"]');
        if (vipGrid) {
          vipGrid.classList.add('expanded');
          englishTitle.classList.remove('collapsed');
        }
      }
      // 默认选中英语VIP1按钮
      const englishVip1Btn = document.querySelector('.vip-btn[data-country="english"][data-vip="1"]');
      if (englishVip1Btn) {
        englishVip1Btn.classList.add('active');
      }
    });
  }
  
  toggleCountry(clickedTitle) {
    const country = clickedTitle.dataset.country;
    const vipGrid = document.querySelector(`.vip-grid[data-country="${country}"]`);
    const isExpanded = vipGrid.classList.contains('expanded');
    
    // 关闭所有其他国家
    document.querySelectorAll('.vip-grid').forEach(grid => {
      grid.classList.remove('expanded');
    });
    document.querySelectorAll('.country-title').forEach(title => {
      title.classList.add('collapsed');
    });
    
    // 如果点击的是当前展开的国家，则关闭；否则展开
    if (!isExpanded) {
      vipGrid.classList.add('expanded');
      clickedTitle.classList.remove('collapsed');
    }
  }
  
  selectTemplate(btn) {
    // 移除所有活动状态
    document.querySelectorAll('.vip-btn').forEach(b => b.classList.remove('active'));
    
    // 添加当前活动状态
    btn.classList.add('active');
    
    // 更新当前选择
    this.currentCountry = btn.dataset.country;
    this.currentVip = parseInt(btn.dataset.vip);
    // 固定头像状态
    this.avatarX = 74;
    this.avatarY = 168;
    this.avatarSize = 142;
    // 重置 UID 为给定默认
    this.uidX = 294;
    this.uidY = 304;
    this.uidSize = 36;
    this.loadTemplate();
  }
  
  loadTemplate() {
    // 隐藏错误提示，显示加载动画
    this.hideError();
    this.showLoading();
    
    const templatePath = this.templates[this.currentCountry][this.currentVip];
    this.template.src = templatePath;
    
    this.template.onload = () => {
      this.hideLoading();
      this.drawAll();
    };
    
    this.template.onerror = () => {
      console.warn(`模板文件 ${templatePath} 未找到`);
      this.hideLoading();
      this.showError();
    };
  }
  
  showLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.remove('hidden');
    }
  }
  
  hideLoading() {
    if (this.loadingOverlay) {
      this.loadingOverlay.classList.add('hidden');
    }
  }
  
  showError() {
    if (this.errorOverlay) {
      this.errorOverlay.classList.remove('hidden');
    }
  }
  
  hideError() {
    if (this.errorOverlay) {
      this.errorOverlay.classList.add('hidden');
    }
  }
  
  handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (file) {
      this.loadAvatarFromFile(file);
    }
  }
  
  handlePasteUpload(e) {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        this.loadAvatarFromFile(file);
        e.preventDefault();
        break;
      }
    }
  }
  
  loadAvatarFromFile(file) {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.avatar = new Image();
        this.avatar.onload = () => this.drawAll();
        this.avatar.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
  
  // 绘制与坐标面板外，增加头像面板下方信息的同步更新
  drawAll() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // 计算缩放
    const sx = this.canvas.width / this.baseWidth;
    const sy = this.canvas.height / this.baseHeight;
    // 绘制模板拉伸至画布尺寸
    this.ctx.drawImage(this.template, 0, 0, this.canvas.width, this.canvas.height);

    //--- 绘制头像 ---//
    if (this.avatar) {
      const avatarX = this.avatarX * sx;
      const avatarY = this.avatarY * sy;
      const avatarSize = this.avatarSize * sy;
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
      this.ctx.closePath();
      this.ctx.clip();
      // 使用 cover 策略裁剪并绘制头像，避免变形
      const imgW = this.avatar.width;
      const imgH = this.avatar.height;
      const scale = Math.max(avatarSize / imgW, avatarSize / imgH);
      const srcW = avatarSize / scale;
      const srcH = avatarSize / scale;
      const srcX = (imgW - srcW) / 2;
      const srcY = (imgH - srcH) / 2;
      this.ctx.drawImage(this.avatar, srcX, srcY, srcW, srcH, avatarX, avatarY, avatarSize, avatarSize);
      this.ctx.restore();
      // 此处删除头像旁size像素标注
    }

    // 绘制 UID
    const uidSize = this.uidSize * sy;
    const uidX = this.uidX * sx;
    const uidY = this.uidY * sy;
    this.ctx.save();
    this.ctx.globalAlpha = 1; // 确保不被之前的透明设置影响
    this.ctx.textAlign = 'left';
    this.ctx.textBaseline = 'alphabetic';
    this.ctx.font = `${uidSize}px sans-serif`;
    // 去掉UID拖拽判定区的半透明矩形显示
    // ---- 正常绘制文本 ---- //
    // 发光字体：#e8d28e，无偏移，较强阴影
    this.ctx.fillStyle = "#e8d28e";
    this.ctx.shadowColor = "#e8d28e";
    this.ctx.shadowOffsetX = 0;
    this.ctx.shadowOffsetY = 0;
    this.ctx.shadowBlur = 20;
    this.ctx.fillText(this.uidInput.value, uidX, uidY);
    this.ctx.restore();
 
    // 去除 UID 右侧 px 标注
    // 更新坐标显示面板
    this.updateCoordsDisplay();
  }
  
  updateCoordsDisplay() {
    // 显示基准坐标，保持与配置值一致（不乘缩放）
    this.coordsDisplay.textContent = 
      `UID: (${Math.round(this.uidX)}, ${Math.round(this.uidY)}, ${Math.round(this.uidSize)}) | 头像: (${Math.round(this.avatarX)}, ${Math.round(this.avatarY)}, ${Math.round(this.avatarSize)})`;
  }

  updateAvatarInfo() {
    // 实时数据显示在设置面板下方div
    const el = document.getElementById('avatarInfoDisplay');
    if (el) {
      el.textContent = `头像: (${Math.round(this.avatarX)}, ${Math.round(this.avatarY)}, ${Math.round(this.avatarSize)})`;
    }
  }
  
  startDrag(e) {
    const { x: mouseX, y: mouseY } = this.getMouseCanvasPos(e);
    const sx = this.canvas.width / this.baseWidth;
    const sy = this.canvas.height / this.baseHeight;
    // 头像精确点击，采用“是否在圆内判定”
    const avatarX = this.avatarX * sx;
    const avatarY = this.avatarY * sy;
    const avatarSize = this.avatarSize * sy;
    const avatarCenterX = avatarX + avatarSize/2;
    const avatarCenterY = avatarY + avatarSize/2;
    const avatarR = avatarSize/2;
    const avatarHit = (Math.pow(mouseX - avatarCenterX,2) + Math.pow(mouseY - avatarCenterY,2)) <= Math.pow(avatarR,2);
    // UID区域按检测矩形
    const uidSize = this.uidSize * sy;
    const uidX = this.uidX * sx;
    const uidY = this.uidY * sy;
    this.ctx.font = `${uidSize}px sans-serif`;
    const uidWidth = this.ctx.measureText(this.uidInput.value).width || 50;
    const uidHit = mouseX > uidX-30 && mouseX < uidX+uidWidth+30 && mouseY > uidY-uidSize && mouseY < uidY+20;
    if (avatarHit) {
      this.dragging = 'avatar';
      this.dragOffsetX = (mouseX - avatarX) / sx;
      this.dragOffsetY = (mouseY - avatarY) / sy;
    } else if (uidHit) {
      this.dragging = 'uid';
      this.dragOffsetX = (mouseX - uidX) / sx;
      this.dragOffsetY = (mouseY - uidY) / sy;
    }
    this.offsetX = mouseX;
    this.offsetY = mouseY;
  }
  duringDrag(e) {
    if (!this.dragging) return;
    const { x: mouseX, y: mouseY } = this.getMouseCanvasPos(e);
    const sx = this.canvas.width / this.baseWidth;
    const sy = this.canvas.height / this.baseHeight;
    // 仅允许uid移动
    if (this.dragging === 'uid') {
      this.uidX = mouseX / sx - this.dragOffsetX;
      this.uidY = mouseY / sy - this.dragOffsetY;
    }
    this.offsetX = mouseX;
    this.offsetY = mouseY;
    this.updateAvatarInfo();
    this.drawAll();
  }
  
  stopDrag() { this.dragging = null; }
  
  downloadCertificate() {
    const link = document.createElement('a');
    link.download = `宙斯证书生成器_V1_${this.currentCountry.toUpperCase()}_VIP${this.currentVip}.png`;
    link.href = this.canvas.toDataURL('image/png');
    link.click();
  }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
  new CertificateGenerator();
});
