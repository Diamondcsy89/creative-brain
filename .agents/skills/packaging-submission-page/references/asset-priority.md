# Asset Priority

Use real images first.

## Preferred Asset Names

If present, use:

- `hero-overview.jpg`: header overview / arrangement image.
- `outer-cover.jpg`: outer box front view.
- `outer-side.jpg`: outer box side view.
- `inner-tray-layout.jpg`: real inner tray layout.
- `inner-*.jpg`: inner pack front images.
- `inner-*-side.jpg`: inner pack side image.
- `inner-*-depth.jpg`: inner pack depth image.

Store images by submission slug:

- `public/packaging/[slug]/hero-overview.jpg`
- `public/packaging/[slug]/outer-cover.jpg`
- `public/packaging/[slug]/outer-side.jpg`
- `public/packaging/[slug]/inner-tray-layout.jpg`
- `public/packaging/[slug]/inner-*.jpg`

## Fallback Rules

- If a real image exists, show it.
- If a real image does not exist, use a CSS/SVG schematic or a clear placeholder.
- Schematic templates must be labeled as schematic, placeholder, or specification relationship views.
- Do not fabricate real package images.
- Do not imply a CSS/SVG schematic is a real side, depth, print, or packaging render.

## Inner Pack Thickness

When no `inner-*-side.jpg` or `inner-*-depth.jpg` exists:

- Use `ThicknessSchematic`.
- Draw front view using `widthCm × heightCm`.
- Draw side thickness using `depthCm × heightCm`.
- Include: `示意图按 width × height × depth 的真实比例绘制，仅用于规格关系展示。`
- Include or reference: `厚度示意为规格关系图，不代表真实侧面包装渲染。`
