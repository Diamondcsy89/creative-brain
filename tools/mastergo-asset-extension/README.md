# 小米图素替换助手

英文名：`xiaomi-asset-replace-helper`

这是一个个人内部使用的 MasterGo 插件 MVP，用于在已有 MasterGo 模板文件中，根据固定图层命名扫描并批量替换活动文案。

当前版本不再以生成新画板为核心，而是面向真实模板工作流：设计师提前在模板中命名可替换图层，插件负责扫描当前页面并替换文本内容。

## 功能

- 打开插件 UI 面板
- 输入活动名称、产品名称、主标题、副标题、CTA 文案
- 扫描当前页面中的模板命名图层
- 统计各类可替换图层数量
- 批量替换文本图层：
  - `@product-name`
  - `@title`
  - `@subtitle`
  - `@cta`
- 图片占位图层第一版只扫描统计，不做图片替换

## 模板命名规则

请在 MasterGo 模板中提前给可替换图层命名：

```text
@product-name
@title
@subtitle
@cta
@price
@kv-horizontal
@kv-vertical
@product-image
```

命名可以作为图层名的一部分，例如：

```text
@title / PC Hero
@product-image / Mobile Banner
```

## 本地运行

```bash
cd tools/mastergo-asset-extension
npm install
npm run build
```

构建后会生成：

```text
dist/main.js
dist/ui.html
```

## 在 MasterGo 中加载开发插件

1. 打开 MasterGo 桌面端或支持开发插件的环境。
2. 进入插件开发 / 开发者插件入口。
3. 选择从本地 manifest 加载。
4. 选择本目录下的 `manifest.json`。
5. 运行插件：`小米图素替换助手`。

如果 MasterGo 的开发插件入口随版本变化，请以 MasterGo 当前版本的开发者插件入口为准。

## 使用流程

1. 打开已有 MasterGo 模板文件。
2. 确认模板中的可替换文本、KV 占位、商品图占位已经按命名规则命名。
3. 优先选中一个模板容器、Frame、Group 或画板。
4. 打开插件，点击「扫描模板图层」。
5. 确认扫描结果中的数量符合预期。
6. 填写产品名称、主标题、副标题、CTA 文案。
7. 点击「替换文本内容」。

插件不会改变原有画板尺寸，不会重新生成画板，不会删除或移动现有图层。

文本替换会尽量保留原文本图层的字号、颜色、位置、宽度和对齐方式。如果文本图层包含混合字体，插件会尝试读取并加载已有字体段或首字符字体，再完成替换，不会因为 mixed font 直接失败。

扫描优先级：

1. 当前选中的模板容器及其所有子图层。
2. 如果没有选中图层，再尝试扫描当前页面。

## 第一版限制

- 先支持文字替换。
- 图片替换后续实现。
- `@price` 第一版只扫描统计，暂不替换。
- 需要设计师提前在 MasterGo 模板中给可替换图层命名。
- 暂不发布到插件市场。
