# Dimension Rules

All dimensions must come from centralized data, normally `data/packaging.ts`.

## Core Principles

- Real package images are visual previews only.
- Do not attach dimension lines to real package images.
- Dimension labels must annotate independent specification rectangles.
- Specification rectangles must be drawn from real data proportions.
- Do not change proportions for visual convenience.
- If a proportion makes a shape small, scale the container consistently while preserving the internal aspect ratio.

## Dimension Schematic

For front-facing schematics:

- Use `widthCm × heightCm`.
- `aspect-ratio = widthCm / heightCm`.

Examples:

- Outer front: `30 / 30`, square.
- Outer side: `30 / 8`, horizontal rectangle.
- Eye mask: `24.2 / 15`.
- Neck pillow: `15 / 7.5`.
- Xiaomi Tag: `7.5 / 7.5`, square.

## Thickness Schematic

For side thickness schematics:

- Use `depthCm × heightCm`.
- `aspect-ratio = depthCm / heightCm`.

Examples:

- Eye mask: `2 / 15`, very narrow vertical rectangle.
- Neck pillow: `6 / 7.5`, wider side rectangle.
- Xiaomi Tag: `2 / 7.5`, narrow vertical rectangle.

## Required Notes

For dimension schematic sections, include:

`本区域为尺寸比例示意，标注线对应规格矩形，不对应图片裁切边界。`

For thickness schematic sections, include:

`示意图按 width × height × depth 的真实比例绘制，仅用于规格关系展示。`

and when relevant:

`厚度示意为规格关系图，不代表真实侧面包装渲染。`
