# App Motion Button Library

这是一个面向 App 场景的高级按钮动效库，使用 React、TypeScript、Tailwind CSS 和 Motion 实现。

设计目标：

- 深色背景优先
- 移动端优先
- 动效克制、顺滑、物理感明确
- 接近 iOS / Apple / Linear 的产品质感
- 每个按钮都是独立组件，方便复制和复用

## 运行

```bash
npm install
npm run dev
```

打开 `http://localhost:3000` 预览。

## 按钮清单

### 1. PressScaleButton

适合主要 CTA、底部操作栏、表单提交。通过轻微缩放和位移模拟 iOS 原生按压反馈。

### 2. RippleFeedbackButton

适合列表操作、支付确认、工具按钮。涟漪从点击位置扩散，用于明确表达“已接收点击”。

### 3. MagneticHoverButton

适合桌面 Web App 的下载按钮、官网主操作按钮。鼠标靠近时轻微跟随，移动端仍保持普通按压。

### 4. GlowOutlineButton

适合 Pro 功能入口、AI 生成、会员升级。用细腻流动描边建立高级感，避免廉价霓虹。

### 5. LiquidFillButton

适合开始创作、状态切换、收藏动作。液态填充从底部抬升，反馈柔和但明确。

### 6. DownloadProgressButton

适合 App 下载、离线包下载、素材保存。点击后展示进度，完成后切换为 Saved 状态。

### 7. SuccessStateButton

适合保存设置、创建成功、授权完成。提交后在按钮内切换成功状态，减少跳转前的不确定感。

### 8. LongPressConfirmButton

适合删除、发布、支付、重置数据等高风险操作。必须长按填满进度后才确认。

### 9. IconSlideButton

适合下一步、打开详情、进入流程。悬停时图标从右侧滑入，文字轻微让位。

### 10. BreathLightButton

适合语音输入、AI 助手、实时监听。低频呼吸光用于吸引注意，但不打扰用户。

## 目录

```txt
app-motion-button-library/
├── app/
├── components/
│   ├── ButtonGrid.tsx
│   ├── ButtonShowcaseCard.tsx
│   └── buttons/
├── data/
├── lib/
└── README.md
```
