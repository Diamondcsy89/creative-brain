# 小米图素替换助手

英文名：`xiaomi-asset-replace-helper`

这是一个个人内部使用的 MasterGo 插件 MVP，用于在已有 MasterGo 模板文件中，根据固定图层命名扫描并批量替换活动文案。

当前版本不再以生成新画板为核心，而是面向真实模板工作流：设计师提前在模板中命名可替换图层，插件负责扫描当前页面并替换文本内容。

## 功能

- 打开插件 UI 面板
- 输入活动名称、产品名称、主标题、副标题、CTA 文案
- 扫描当前页面中的模板命名图层
- 统计各类可替换图层数量
- 替换 KV 图片：
  - `@kvh`：横版 KV，cover 适配
  - `@kvv`：竖版 KV，cover 适配
- 批量替换文本图层：
  - `@name`
  - `@title`
  - `@sub`
  - `@cta`
- 替换产品名图片槽位：
  - `@pnh-lg` / `@pnh-md` / `@pnh-sm`
  - `@pnv-lg` / `@pnv-md` / `@pnv-sm`
  - 旧命名继续兼容
- 商品图 `@prod` 第一版只扫描统计，后续实现

## 模板命名规则

请在 MasterGo 模板中提前给可替换图层命名：

```text
@name
@title
@sub
@cta
@price
@kvh
@kvv
@prod
@pnh-lg
@pnh-md
@pnh-sm
@pnv-lg
@pnv-md
@pnv-sm
@target
```

命名可以作为图层名的一部分，例如：

```text
@title / PC Hero
@prod / Mobile Banner
```

命名对照表：

| 旧命名 | 新命名 |
| --- | --- |
| `@product-name` | `@name` |
| `@subtitle` | `@sub` |
| `@kv-horizontal` | `@kvh` |
| `@kv-vertical` | `@kvv` |
| `@product-image` | `@prod` |
| `@product-name-image-horizontal-lg` | `@pnh-lg` |
| `@product-name-image-horizontal-md` | `@pnh-md` |
| `@product-name-image-horizontal-sm` | `@pnh-sm` |
| `@product-name-image-vertical-lg` | `@pnv-lg` |
| `@product-name-image-vertical-md` | `@pnv-md` |
| `@product-name-image-vertical-sm` | `@pnv-sm` |
| `@product-name-image-lg` | 继续兼容 |
| `@product-name-image-md` | 继续兼容 |
| `@product-name-image-sm` | 继续兼容 |
| `current-image` | `@target` |

## 图片槽位

KV：

- `@kvh` = 横版 KV，cover 适配，铺满替换区域，允许居中裁切。
- `@kvv` = 竖版 KV，cover 适配，铺满替换区域，允许居中裁切。

产品名图片：

- `@pnh-lg` / `@pnh-md` / `@pnh-sm` = 横版产品名，contain 适配，左对齐。
- `@pnv-lg` / `@pnv-md` / `@pnv-sm` = 竖版产品名，contain 适配，居中对齐。

商品图：

- `@prod` = 商品图，后续实现，contain 适配。

替换基准：

- `@target` = 插件真正替换的位置和尺寸。
- 如果没有 `@target`，插件会兼容寻找旧的 `current-image`。

## 产品名图片槽位

产品名图片槽位不是按产品单独定尺寸，而是按图素版位定安全框。后续替换不同长宽比例的产品名图片时，应把图片等比适配进对应安全框。

推荐使用场景：

- `@pnh-lg`：横版主 KV / 大图 / 重点资源位，替换后左对齐
- `@pnh-md`：横版中等 Banner / 常规资源位，替换后左对齐
- `@pnh-sm`：横版小卡片 / 小资源位，替换后左对齐
- `@pnv-lg`：竖版主 KV / 大图 / 重点资源位，替换后居中对齐
- `@pnv-md`：竖版中等 Banner / 方图 / 常规资源位，替换后居中对齐
- `@pnv-sm`：竖版 Push / 小卡片 / 小资源位，替换后居中对齐
- `@product-name-image-lg` / `md` / `sm`：旧命名兼容，默认按居中对齐处理

建议安全框：

```text
@product-name-image-lg：最大 360 × 64
@product-name-image-md：最大 260 × 46
@product-name-image-sm：最大 180 × 32
```

对齐规则：

- horizontal 槽位：contain 缩放，左对齐，垂直居中。
- vertical 槽位：contain 缩放，水平居中，垂直居中。
- 旧命名槽位：contain 缩放，默认居中对齐。

后续图片替换原则：

- 保持原图比例
- 不拉伸
- 不裁切
- 使用 contain 适配
- 永远不超过槽位宽高
- 如果图片较短，优先按高度适配
- 如果图片较长，则受最大宽度限制
- 等价于 max-width + max-height 的安全框适配

图片替换会优先递归查找槽位内部的 `@target`，如果没有 `@target`，再兼容寻找旧的 `current-image`。这个基准图层是唯一替换基准。KV 会基于基准图层创建 cover 适配的 `replaced-image`；竖版产品名和旧命名槽位会优先直接替换基准图层本身的图片填充；横版产品名为了保证左对齐，会基于基准图层创建 contain 适配的 `replaced-image`。

插件会在同一个槽位内清理旧的 `/ replaced-image`，避免重复点击后多层叠加。新图层会基于 `@target` / `current-image` 的 x、y、width、height 放置，不使用页面绝对坐标撑大父级组。

当前图片填充依据 `@mastergo/plugin-typings`：`mg.createImage(Uint8Array)` 返回 `Image`，图片引用使用 `image.href`，`ImagePaint` 使用 `imageRef` 字段。产品名图片使用 `scaleMode: "FIT"`，KV 使用 `scaleMode: "FILL"`。

推荐槽位结构：

```text
@kvh
  └── @target

@kvv
  └── @target

@pnh-lg
  └── @target

@pnv-md
  └── @target

@prod
  └── @target
```

替换时插件会保留槽位容器，先清理旧的自动生成 `replaced-image`，再优先替换 `@target`。如果只能使用备用图层，则隐藏旧的 `@target` / `current-image` 并插入新的 `replaced-image`。

产品名图片建议提前裁掉多余透明边距，这样 contain 适配后视觉大小更稳定。替换后仍可在 MasterGo 中手动调整图片大小和位置。

文件格式：

- PNG / JPG 优先支持。
- SVG 已在 UI 中允许选择，但是否能直接创建为图片取决于当前 MasterGo 插件 API 支持情况。

图片适配规则：

```text
@kvh：cover，可裁切
@kvv：cover，可裁切
@prod：contain，完整展示
@pnh-lg：contain，完整展示，左对齐
@pnh-md：contain，完整展示，左对齐
@pnh-sm：contain，完整展示，左对齐
@pnv-lg：contain，完整展示，居中对齐
@pnv-md：contain，完整展示，居中对齐
@pnv-sm：contain，完整展示，居中对齐
@product-name-image-lg：contain，完整展示，居中对齐
@product-name-image-md：contain，完整展示，居中对齐
@product-name-image-sm：contain，完整展示，居中对齐
```

扫描结果示例：

```text
@name: 1
@title: 1
@sub: 1
@cta: 1
@price: 1
@kvh: 2
@kvv: 1
@prod: 3
@pnh-lg: 1
@pnh-md: 2
@pnh-sm: 1
@pnv-lg: 1
@pnv-md: 2
@pnv-sm: 1
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
9. 选择横版 / 竖版 KV 图片，点击「替换 KV 图片」。

插件不会改变原有画板尺寸，不会重新生成画板，不会删除或移动现有图层。

文本替换会尽量保留原文本图层的字号、颜色、位置、宽度和对齐方式。如果文本图层包含混合字体，插件会尝试读取并加载已有字体段或首字符字体，再完成替换，不会因为 mixed font 直接失败。

扫描优先级：

1. 当前选中的模板容器及其所有子图层。
2. 如果没有选中图层，再尝试扫描当前页面。

## 第一版限制

- 先支持文字替换。
- 图片替换支持 KV 和产品名图片槽位。
- `@prod` 第一版仍只扫描统计，旧命名 `@product-image` 继续兼容。
- `@price` 第一版只扫描统计，暂不替换。
- 需要设计师提前在 MasterGo 模板中给可替换图层命名。
- 暂不发布到插件市场。
