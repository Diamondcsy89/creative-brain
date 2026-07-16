# 小米图素延展助手

英文名：`xiaomi-asset-extension`

这是一个个人内部使用的 MasterGo 插件 MVP，用于根据固定合作方尺寸规范，在当前页面生成可编辑的多尺寸电商图素画板。

第一版只生成工作画板、规范占位和可编辑文字图层，不做复杂 AI 生成图，也不生成整张 PNG。

## 功能

- 合作方选择
- 尺寸组选择
- 项目名称输入
- 主标题输入
- 副标题输入
- CTA 文案输入
- 一键生成多尺寸可编辑画板

当前内置合作方：

- `partner-xiaomi-demo`

当前内置尺寸：

- PC Hero：`1920 × 600`
- Mobile Banner：`750 × 360`
- App Card：`690 × 320`

## 本地运行

```bash
cd tools/mastergo-asset-extension
npm install
npm run build
```

构建后会生成：

```text
dist/main.js
```

## 在 MasterGo 中加载开发插件

1. 打开 MasterGo 桌面端或支持开发插件的环境。
2. 进入插件开发 / 开发者插件入口。
3. 选择从本地 manifest 加载。
4. 选择本目录下的 `manifest.json`。
5. 运行插件：`小米图素延展助手`。

如果 MasterGo 的开发插件入口随版本变化，请以 MasterGo 当前版本的开发者插件入口为准。

## 如何修改合作方尺寸

所有合作方规范都集中在：

```text
src/presets/partner-presets.ts
```

每个尺寸配置包含：

- `id`
- `name`
- `width`
- `height`
- `safeArea`
- `kvArea`
- `productArea`
- `copyArea`
- `ctaArea`
- `exportNameTemplate`

新增合作方时，复制 `partner-xiaomi-demo` 的结构并修改尺寸即可。

## 生成图层

每个画板包含：

- 画板名称
- 背景矩形
- 安全区参考线
- KV 占位区域
- 商品图占位区域
- 主标题文字
- 副标题文字
- CTA 按钮
- 导出命名文本
- 尺寸标注文本

所有图层都是可编辑对象，方便后续在 MasterGo 中替换 KV 和商品图。

## 第一版限制

- 图片需要先手动拖入 KV / 商品图占位区域。
- 暂不做自动图片替换。
- 暂不做 AI 扩图或智能重排。
- 暂不发布到插件市场。
- 当前插件 API 以 MasterGo/Figma 类插件环境为基础，后续可按实际 MasterGo API 做适配增强。
