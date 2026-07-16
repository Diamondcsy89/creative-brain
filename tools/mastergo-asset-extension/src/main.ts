const host = globalThis.mg || globalThis.mastergo || globalThis.figma;
const handledRequestIds = new Set();
let activeFont = null;

try {
  if (!host) {
    throw new Error("未检测到 MasterGo 插件运行环境");
  }

  host.showUI(__html__, { width: 380, height: 560 });
  registerMessageHandlers(handlePluginMessage);
  postStatus("插件 UI 已连接");
} catch (error) {
  const messageText = `插件启动失败：${getErrorMessage(error)}`;
  notify(messageText);
  postError(messageText);
}

async function handlePluginMessage(rawMessage) {
  try {
    const message = normalizeMessage(rawMessage);
    if (!message || message.type !== "generate-asset-boards") return;

    if (message.requestId && handledRequestIds.has(message.requestId)) {
      return;
    }

    if (message.requestId) {
      handledRequestIds.add(message.requestId);
    }

    notify("收到生成指令");
    postStatus("main 已收到生成消息");

    const frames = await generateAssetBoards(message.payload);
    selectNodes(frames);
    scrollToNodes(frames);

    notify("图素画板已生成");
    postStatus(`已生成 ${frames.length} 个图素画板`);
  } catch (error) {
    const messageText = `生成失败：${getErrorMessage(error)}`;
    notify(messageText);
    postError(messageText);
  }
}

function registerMessageHandlers(handler) {
  if (!host.ui) {
    throw new Error("未检测到 UI 通信接口");
  }

  host.ui.onmessage = handler;

  if (typeof host.ui.on === "function") {
    registerOptionalHandler(() => host.ui.on("message", handler));
  }

  if (typeof host.on === "function") {
    registerOptionalHandler(() => host.on("message", handler));
  }
}

function registerOptionalHandler(register) {
  try {
    register();
  } catch (error) {
    console.log(`可选消息监听跳过：${getErrorMessage(error)}`);
  }
}

function normalizeMessage(rawMessage) {
  if (!rawMessage) return null;
  if (rawMessage.pluginMessage) return rawMessage.pluginMessage;
  if (rawMessage.data && rawMessage.data.pluginMessage) {
    return rawMessage.data.pluginMessage;
  }
  return rawMessage;
}

async function generateAssetBoards(payload) {
  await loadFontSafely();

  const partner = getPartnerPreset(payload.partnerId);
  const sizeGroup = getSizeGroup(partner, payload.sizeGroupId);
  const projectName = normalizeText(payload.projectName, "xiaomi-campaign");
  const content = {
    projectName,
    headline: normalizeText(payload.headline, "小米新品视觉主标题"),
    subheadline: normalizeText(payload.subheadline, "高效生成多尺寸电商图素工作画板"),
    cta: normalizeText(payload.cta, "立即查看")
  };

  const frames = [];
  let nextY = 0;

  for (const size of sizeGroup.sizes) {
    const frame = createAssetBoard(size, content, nextY);
    appendToCurrentPage(frame);
    frames.push(frame);
    nextY += size.height + 160;
  }

  return frames;
}

function createAssetBoard(size, content, y) {
  const frame = createFrameNode();
  frame.name = `${content.projectName} / ${size.name} / ${size.width}x${size.height}`;
  frame.x = 0;
  frame.y = y;
  resizeNode(frame, size.width, size.height);
  setFills(frame, "#F7F7F5");

  addRect(frame, {
    name: "Background / editable",
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    fill: "#FFFFFF",
    stroke: "#D8D8D8"
  });

  addRect(frame, {
    name: "Safe Area / editable guide",
    ...size.safeArea,
    fill: null,
    stroke: "#FF6900"
  });

  addPlaceholder(frame, size.kvArea, "KV Placeholder / replaceable", "KV 占位区域");
  addPlaceholder(frame, size.productArea, "Product Image Placeholder / replaceable", "商品图占位区域");

  addText(frame, {
    name: "Board Name / editable",
    x: size.safeArea.x,
    y: Math.max(16, size.safeArea.y - 36),
    fontSize: getMetaFontSize(size),
    color: "#666666",
    characters: `${size.name} · ${size.width} × ${size.height}`
  });

  addText(frame, {
    name: "Main Title / editable",
    x: size.copyArea.x,
    y: size.copyArea.y,
    width: size.copyArea.width,
    fontSize: getTitleFontSize(size),
    color: "#111111",
    characters: content.headline
  });

  addText(frame, {
    name: "Subtitle / editable",
    x: size.copyArea.x,
    y: size.copyArea.y + getTitleFontSize(size) + 22,
    width: size.copyArea.width,
    fontSize: getBodyFontSize(size),
    color: "#666666",
    characters: content.subheadline
  });

  addRect(frame, {
    name: "CTA Button Background / editable",
    ...size.ctaArea,
    fill: "#111111",
    stroke: "#111111",
    radius: 4
  });

  addText(frame, {
    name: "CTA Text / editable",
    x: size.ctaArea.x + 18,
    y: size.ctaArea.y + Math.max(10, (size.ctaArea.height - getButtonFontSize(size)) / 2 - 1),
    width: size.ctaArea.width - 36,
    fontSize: getButtonFontSize(size),
    color: "#FFFFFF",
    characters: content.cta
  });

  addText(frame, {
    name: "Export Name / editable",
    x: size.safeArea.x,
    y: size.height - Math.max(28, size.safeArea.y * 0.52),
    width: size.safeArea.width,
    fontSize: getMetaFontSize(size),
    color: "#666666",
    characters: `Export: ${formatExportName(size.exportNameTemplate, content.projectName)}`
  });

  addText(frame, {
    name: "Dimension Label / editable",
    x: Math.max(16, size.width - size.safeArea.x - 260),
    y: size.height - Math.max(28, size.safeArea.y * 0.52),
    width: 240,
    fontSize: getMetaFontSize(size),
    color: "#111111",
    characters: `Size: ${size.width} × ${size.height}px`
  });

  addDimensionTicks(frame, size);
  return frame;
}

function addPlaceholder(frame, area, name, label) {
  addRect(frame, {
    name,
    ...area,
    fill: "#F7F7F5",
    stroke: "#CFCFCF"
  });

  addText(frame, {
    name: `${name} Label / editable`,
    x: area.x + 18,
    y: area.y + 18,
    width: Math.max(80, area.width - 36),
    fontSize: Math.max(12, Math.min(20, area.height * 0.07)),
    color: "#666666",
    characters: label
  });
}

function addDimensionTicks(frame, size) {
  const tickLength = Math.max(12, Math.min(28, size.height * 0.05));
  const topY = Math.max(8, size.safeArea.y * 0.35);
  const leftX = Math.max(8, size.safeArea.x * 0.35);

  addLine(frame, "Width Guide / editable", size.safeArea.x, topY, size.safeArea.x + size.safeArea.width, topY, "#CFCFCF");
  addLine(frame, "Width Guide Left Tick / editable", size.safeArea.x, topY - tickLength / 2, size.safeArea.x, topY + tickLength / 2, "#CFCFCF");
  addLine(frame, "Width Guide Right Tick / editable", size.safeArea.x + size.safeArea.width, topY - tickLength / 2, size.safeArea.x + size.safeArea.width, topY + tickLength / 2, "#CFCFCF");
  addLine(frame, "Height Guide / editable", leftX, size.safeArea.y, leftX, size.safeArea.y + size.safeArea.height, "#CFCFCF");
  addLine(frame, "Height Guide Top Tick / editable", leftX - tickLength / 2, size.safeArea.y, leftX + tickLength / 2, size.safeArea.y, "#CFCFCF");
  addLine(frame, "Height Guide Bottom Tick / editable", leftX - tickLength / 2, size.safeArea.y + size.safeArea.height, leftX + tickLength / 2, size.safeArea.y + size.safeArea.height, "#CFCFCF");
}

function addRect(frame, config) {
  const rect = host.createRectangle();
  rect.name = config.name;
  rect.x = config.x;
  rect.y = config.y;
  resizeNode(rect, config.width, config.height);

  if (config.fill) {
    setFills(rect, config.fill);
  } else {
    rect.fills = [];
  }

  if (config.stroke) {
    rect.strokes = [{ type: "SOLID", color: hexToRgb(config.stroke) }];
    rect.strokeWeight = 1;
  }

  if (typeof config.radius === "number") {
    rect.cornerRadius = config.radius;
  }

  frame.appendChild(rect);
  return rect;
}

function addLine(frame, name, x1, y1, x2, y2, color) {
  const line = host.createRectangle();
  line.name = name;
  line.x = Math.min(x1, x2);
  line.y = Math.min(y1, y2);
  resizeNode(line, Math.max(1, Math.abs(x2 - x1)), Math.max(1, Math.abs(y2 - y1)));
  setFills(line, color);
  frame.appendChild(line);
}

function addText(frame, config) {
  const text = host.createText();
  text.name = config.name;
  text.x = config.x;
  text.y = config.y;
  if (config.width && typeof text.resize === "function") {
    text.resize(config.width, Math.max(config.fontSize * 1.4, 24));
  }
  setTextFont(text);
  text.fontSize = config.fontSize;
  setFills(text, config.color);
  text.characters = config.characters;
  frame.appendChild(text);
  return text;
}

function getPartnerPreset(partnerId) {
  const partner = PARTNER_PRESETS.find((item) => item.id === partnerId);
  if (!partner) {
    throw new Error(`未找到合作方配置：${partnerId}`);
  }
  return partner;
}

function getSizeGroup(partner, sizeGroupId) {
  const sizeGroup = partner.sizeGroups.find((item) => item.id === sizeGroupId);
  if (!sizeGroup) {
    throw new Error(`未找到尺寸组配置：${sizeGroupId}`);
  }
  return sizeGroup;
}

function normalizeText(value, fallback) {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function formatExportName(template, projectName) {
  return template.replace("{project}", slugify(projectName));
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, "-")
    .replace(/^-+|-+$/g, "") || "xiaomi-campaign";
}

function getTitleFontSize(size) {
  return Math.max(28, Math.min(72, size.height * 0.12));
}

function getBodyFontSize(size) {
  return Math.max(16, Math.min(28, size.height * 0.055));
}

function getButtonFontSize(size) {
  return Math.max(14, Math.min(20, size.ctaArea.height * 0.34));
}

function getMetaFontSize(size) {
  return Math.max(12, Math.min(18, size.height * 0.032));
}

function createFrameNode() {
  if (typeof host.createFrame === "function") {
    return host.createFrame();
  }

  if (typeof host.createArtboard === "function") {
    return host.createArtboard();
  }

  throw new Error("当前环境不支持创建画板");
}

function appendToCurrentPage(node) {
  if (!host.currentPage || typeof host.currentPage.appendChild !== "function") {
    throw new Error("未检测到当前页面，无法插入画板");
  }

  if (node.parent === host.currentPage) {
    return;
  }

  host.currentPage.appendChild(node);
}

function resizeNode(node, width, height) {
  if (typeof node.resize === "function") {
    node.resize(width, height);
    return;
  }

  node.width = width;
  node.height = height;
}

function setFills(node, hex) {
  node.fills = [{ type: "SOLID", color: hexToRgb(hex) }];
}

function setTextFont(text) {
  if (!activeFont) return;

  try {
    text.fontName = activeFont;
  } catch (error) {
    console.log(`字体设置跳过：${getErrorMessage(error)}`);
  }
}

async function loadFontSafely() {
  if (!host.loadFontAsync) return;

  const fonts = [
    { family: "Inter", style: "Bold" },
    { family: "Roboto", style: "Regular" },
    { family: "Arial", style: "Regular" },
    { family: "PingFang SC", style: "Regular" }
  ];

  for (const font of fonts) {
    try {
      await host.loadFontAsync(font);
      activeFont = font;
      return;
    } catch (error) {
      console.log(`字体加载跳过：${font.family} ${font.style} / ${getErrorMessage(error)}`);
    }
  }
}

function notify(message) {
  if (host && host.notify) {
    host.notify(message);
    return;
  }
  console.log(message);
}

function postStatus(message) {
  if (host && host.ui && host.ui.postMessage) {
    host.ui.postMessage({ type: "status", message });
  }
}

function postError(message) {
  if (host && host.ui && host.ui.postMessage) {
    host.ui.postMessage({ type: "error", message });
  }
}

function selectNodes(nodes) {
  if (host.currentPage && "selection" in host.currentPage) {
    host.currentPage.selection = nodes;
  }
}

function scrollToNodes(nodes) {
  if (host.viewport && typeof host.viewport.scrollAndZoomIntoView === "function") {
    host.viewport.scrollAndZoomIntoView(nodes);
  }
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
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
