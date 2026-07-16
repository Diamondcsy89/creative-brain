import { PARTNER_PRESETS } from "./presets/partner-presets";

const host = typeof mastergo !== "undefined" ? mastergo : figma;
const DEFAULT_FONT = { family: "Inter", style: "Regular" };
const BOLD_FONT = { family: "Inter", style: "Bold" };

host.showUI(__html__, { width: 380, height: 520 });

host.ui.onmessage = async (message) => {
  if (message.type === "get-presets") {
    host.ui.postMessage({ type: "presets", presets: PARTNER_PRESETS });
    return;
  }

  if (message.type === "generate") {
    await generateBoards(message.payload);
    host.notify("已生成多尺寸图素画板");
  }
};

async function generateBoards(payload) {
  await loadFonts();

  const partner = PARTNER_PRESETS.find((item) => item.id === payload.partnerId) || PARTNER_PRESETS[0];
  const sizeGroup = partner.sizeGroups.find((item) => item.id === payload.sizeGroupId) || partner.sizeGroups[0];
  const projectName = payload.projectName || "xiaomi-campaign";
  const generatedFrames = [];

  sizeGroup.sizes.forEach((size, index) => {
    const frame = createBoard({
      size,
      index,
      projectName,
      title: payload.title || "主标题占位",
      subtitle: payload.subtitle || "副标题占位",
      cta: payload.cta || "立即查看"
    });

    host.currentPage.appendChild(frame);
    generatedFrames.push(frame);
  });

  if (host.viewport && host.viewport.scrollAndZoomIntoView) {
    host.viewport.scrollAndZoomIntoView(generatedFrames);
  }
}

async function loadFonts() {
  if (!host.loadFontAsync) return;
  await Promise.all([
    host.loadFontAsync(DEFAULT_FONT),
    host.loadFontAsync(BOLD_FONT)
  ]);
}

function createBoard({ size, index, projectName, title, subtitle, cta }) {
  const frame = host.createFrame();
  frame.name = `${size.name} / ${size.width}×${size.height}`;
  frame.resize(size.width, size.height);
  frame.x = index * (size.width + 160);
  frame.y = 0;
  frame.fills = [{ type: "SOLID", color: hexToRgb("#F7F7F5") }];

  addRect(frame, "Background / base", 0, 0, size.width, size.height, "#F7F7F5", "#D8D8D8");
  addRect(frame, "Safe Area / editable guide", size.safeArea.x, size.safeArea.y, size.safeArea.width, size.safeArea.height, "#FFFFFF", "#FF6900", 0.12);
  addRect(frame, "KV Placeholder / replace visual", size.kvArea.x, size.kvArea.y, size.kvArea.width, size.kvArea.height, "#EFEFEF", "#999999", 0.38);
  addRect(frame, "Product Placeholder / replace product image", size.productArea.x, size.productArea.y, size.productArea.width, size.productArea.height, "#FFFFFF", "#111111", 0.24);

  addLabel(frame, "Board Name", 28, 24, `${size.name}  ${size.width}×${size.height}`, 22, "#111111", BOLD_FONT);
  addLabel(frame, "KV Area Label", size.kvArea.x + 18, size.kvArea.y + 18, "KV PLACEHOLDER", 18, "#666666", BOLD_FONT);
  addLabel(frame, "Product Area Label", size.productArea.x + 18, size.productArea.y + 18, "PRODUCT IMAGE", 18, "#111111", BOLD_FONT);

  addCopy(frame, size.copyArea, title, subtitle);
  addCta(frame, size.ctaArea, cta);

  const exportName = size.exportNameTemplate.replace("{project}", normalizeName(projectName));
  addLabel(frame, "Export Name", 28, size.height - 46, `Export: ${exportName}`, 18, "#666666", DEFAULT_FONT);
  addLabel(frame, "Dimension Note", size.width - 260, size.height - 46, `${size.width} × ${size.height}px`, 18, "#111111", BOLD_FONT);

  return frame;
}

function addCopy(parent, area, title, subtitle) {
  addLabel(parent, "Main Title / editable", area.x, area.y, title, 48, "#111111", BOLD_FONT, area.width);
  addLabel(parent, "Subtitle / editable", area.x, area.y + 72, subtitle, 24, "#555555", DEFAULT_FONT, area.width);
}

function addCta(parent, area, cta) {
  addRect(parent, "CTA Button / editable", area.x, area.y, area.width, area.height, "#111111", "#111111");
  addLabel(parent, "CTA Text / editable", area.x + 20, area.y + Math.max(area.height / 2 - 10, 8), cta, 18, "#FFFFFF", BOLD_FONT, area.width - 40);
}

function addRect(parent, name, x, y, width, height, fill, stroke, opacity = 1) {
  const rect = host.createRectangle();
  rect.name = name;
  rect.x = x;
  rect.y = y;
  rect.resize(width, height);
  rect.fills = [{ type: "SOLID", color: hexToRgb(fill), opacity }];
  rect.strokes = [{ type: "SOLID", color: hexToRgb(stroke) }];
  rect.strokeWeight = 1;
  parent.appendChild(rect);
  return rect;
}

function addLabel(parent, name, x, y, text, fontSize, color, fontName, width) {
  const label = host.createText();
  label.name = name;
  label.x = x;
  label.y = y;
  label.fontName = fontName;
  label.fontSize = fontSize;
  label.fills = [{ type: "SOLID", color: hexToRgb(color) }];
  label.characters = text;
  if (width) {
    label.resize(width, Math.max(fontSize * 1.4, 24));
  }
  parent.appendChild(label);
  return label;
}

function normalizeName(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "") || "xiaomi-campaign";
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = parseInt(normalized, 16);
  return {
    r: ((value >> 16) & 255) / 255,
    g: ((value >> 8) & 255) / 255,
    b: (value & 255) / 255
  };
}
