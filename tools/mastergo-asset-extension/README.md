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
- 替换产品名图片槽位：
  - `@product-name-image-lg`
  - `@product-name-image-md`
  - `@product-name-image-sm`
- 其他图片占位图层第一版只扫描统计，不做图片替换

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
@product-name-image-lg
@product-name-image-md
@product-name-image-sm
```

命名可以作为图层名的一部分，例如：

```text
@title / PC Hero
@product-image / Mobile Banner
```

## 产品名图片槽位

产品名图片槽位不是按产品单独定尺寸，而是按图素版位定安全框。后续替换不同长宽比例的产品名图片时，应把图片等比适配进对应安全框。

推荐使用场景：

- `@product-name-image-lg`：主 KV / 大图 / 重点资源位
- `@product-name-image-md`：中等 Banner / 方图 / 常规资源位
- `@product-name-image-sm`：Push / 小卡片 / 小资源位

建议安全框：

```text
@product-name-image-lg：最大 360 × 64
@product-name-image-md：最大 260 × 46
@product-name-image-sm：最大 180 × 32
```

后续图片替换原则：

- 保持原图比例
- 不拉伸
- 不裁切
- 使用 contain 适配
- 永远不超过槽位宽高
- 如果图片较短，优先按高度适配
- 如果图片较长，则受最大宽度限制
- 等价于 max-width + max-height 的安全框适配

当前实现会在槽位同一父级下创建一个新的可见图片矩形，名称为原槽位名称 + ` / replaced-image`，并保留原槽位作为安全框，不会删除原槽位。

当前图片填充依据 `@mastergo/plugin-typings`：`mg.createImage(Uint8Array)` 返回 `Image`，图片引用使用 `image.href`，`ImagePaint` 使用 `imageRef` 字段并设置 `scaleMode: "FIT"`。

产品名图片建议提前裁掉多余透明边距，这样 contain 适配后视觉大小更稳定。替换后仍可在 MasterGo 中手动调整图片大小和位置。

文件格式：

- PNG / JPG 优先支持。
- SVG 已在 UI 中允许选择，但是否能直接创建为图片取决于当前 MasterGo 插件 API 支持情况。

图片适配规则：

```text
@kv-horizontal：cover，可裁切
@kv-vertical：cover，可裁切
@product-image：contain，完整展示
@product-name-image-lg：contain，完整展示
@product-name-image-md：contain，完整展示
@product-name-image-sm：contain，完整展示
```

扫描结果示例：

```text
@product-name: 1
@title: 1
@subtitle: 1
@cta: 1
@price: 1
@kv-horizontal: 2
@kv-vertical: 1
@product-image: 3
@product-name-image-lg: 1
@product-name-image-md: 2
@product-name-image-sm: 4
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
8. 选择产品名图片，点击「替换产品名图片」。

插件不会改变原有画板尺寸，不会重新生成画板，不会删除或移动现有图层。

文本替换会尽量保留原文本图层的字号、颜色、位置、宽度和对齐方式。如果文本图层包含混合字体，插件会尝试读取并加载已有字体段或首字符字体，再完成替换，不会因为 mixed font 直接失败。

扫描优先级：

1. 当前选中的模板容器及其所有子图层。
2. 如果没有选中图层，再尝试扫描当前页面。

## 第一版限制

- 先支持文字替换。
- 图片替换第一版优先支持产品名图片槽位。
- `@kv-horizontal`、`@kv-vertical`、`@product-image` 第一版仍只扫描统计，后续实现。
- `@price` 第一版只扫描统计，暂不替换。
- 需要设计师提前在 MasterGo 模板中给可替换图层命名。
- 暂不发布到插件市场。
