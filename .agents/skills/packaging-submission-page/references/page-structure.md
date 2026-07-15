# Page Structure

Default page order:

1. `00 Overview`
2. `01 外包装展示`
3. `02 尺寸示意图`
4. `03 内托平面布局`
5. `04 内部物料`
6. `05 提交信息`

## 00 Overview

Left side:

- Product name.
- Project type.
- Version.
- Status.
- Outer package size.
- Short submission note.

Right side:

- Prefer `hero-overview.jpg` as the overview image.
- Label it as `Overview Image`.
- Include: `效果示意图：用于说明礼盒开启后的内部摆放方式，不作为尺寸审核依据。`

## 01 外包装展示

Show real outer package images:

- Front image from `outer-cover.jpg`.
- Side image from `outer-side.jpg`.

Do not place dimension lines around these images. They are visual previews only.

Below each image, stack:

- File name.
- Usage.
- Size.
- Version.
- Status.

## 02 尺寸示意图

Use independent specification rectangles, not real image boundaries.

Include the explanation:

`本区域为尺寸比例示意，标注线对应规格矩形，不对应图片裁切边界。`

## 03 内托平面布局

Use `inner-tray-layout.jpg` when present.

If not present, show a clean placeholder:

`待补充内托平面布局图`

Add A / B / C mapping for inner items when useful. Do not generate or fake an inner tray image.

## 04 内部物料

For each inner pack:

- Show the real front image.
- Show marker such as A / B / C.
- Show name.
- Show width × height × depth.
- Add a thickness schematic if no real side/depth image exists.

## 05 提交信息

Use title:

`提交信息 / Submission Info`

Default fields:

- 当前版本
- 提交用途
- 提交内容
- 待确认项
- 下一步动作
