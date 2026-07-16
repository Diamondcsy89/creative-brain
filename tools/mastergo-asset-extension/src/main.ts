const host = globalThis.mg || globalThis.mastergo || globalThis.figma;
const handledRequestIds = new Set();

const TEMPLATE_TARGETS = [
  { key: "productName", marker: "@product-name", label: "产品名称", replaceable: true },
  { key: "title", marker: "@title", label: "主标题", replaceable: true },
  { key: "subtitle", marker: "@subtitle", label: "副标题", replaceable: true },
  { key: "cta", marker: "@cta", label: "CTA 文案", replaceable: true },
  { key: "price", marker: "@price", label: "价格", replaceable: false },
  { key: "kvHorizontal", marker: "@kv-horizontal", label: "横版 KV", replaceable: false },
  { key: "kvVertical", marker: "@kv-vertical", label: "竖版 KV", replaceable: false },
  { key: "productImage", marker: "@product-image", label: "商品图", replaceable: false }
];

try {
  if (!host) {
    throw new Error("未检测到 MasterGo 插件运行环境");
  }

  host.showUI(__html__, { width: 380, height: 620 });
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
    if (!message || !["scan-template-layers", "replace-template-text"].includes(message.type)) return;

    if (message.requestId && handledRequestIds.has(message.requestId)) {
      return;
    }

    if (message.requestId) {
      handledRequestIds.add(message.requestId);
    }

    if (message.type === "scan-template-layers") {
      const scanResult = scanTemplateLayers();
      postScanResult(scanResult);
      notify(`已找到 ${scanResult.total} 个可替换图层`);
      return;
    }

    if (message.type === "replace-template-text") {
      const replaceResult = await replaceTemplateText(message.payload);
      postReplaceResult(replaceResult);
      notify("模板文本已替换");
    }
  } catch (error) {
    const messageText = `操作失败：${getErrorMessage(error)}`;
    notify(messageText);
    postError(messageText);
  }
}

function scanTemplateLayers() {
  const nodes = getPageNodes();
  const counts = createEmptyCounts();
  const matches = [];

  for (const node of nodes) {
    const target = getTargetForNode(node);
    if (!target) continue;

    counts[target.marker] += 1;
    matches.push({ node, target });
  }

  return {
    total: matches.length,
    counts
  };
}

async function replaceTemplateText(payload) {
  const nodes = getPageNodes();
  const values = {
    "@product-name": normalizeText(payload.productName),
    "@title": normalizeText(payload.title),
    "@subtitle": normalizeText(payload.subtitle),
    "@cta": normalizeText(payload.cta)
  };

  const summary = {
    replaced: 0,
    skipped: 0,
    skippedByMarker: createEmptyCounts(),
    replacedByMarker: createEmptyCounts(),
    notes: []
  };

  for (const node of nodes) {
    const target = getTargetForNode(node);
    if (!target || !target.replaceable) continue;

    if (!isTextNode(node)) {
      summary.skipped += 1;
      summary.skippedByMarker[target.marker] += 1;
      summary.notes.push(`${target.marker}: 跳过非文本图层 "${getNodeName(node)}"`);
      continue;
    }

    const value = values[target.marker];
    if (!value) {
      summary.skipped += 1;
      summary.skippedByMarker[target.marker] += 1;
      summary.notes.push(`${target.marker}: 输入为空，已跳过 "${getNodeName(node)}"`);
      continue;
    }

    try {
      await loadNodeFont(node);
      node.characters = value;
      summary.replaced += 1;
      summary.replacedByMarker[target.marker] += 1;
    } catch (error) {
      summary.skipped += 1;
      summary.skippedByMarker[target.marker] += 1;
      summary.notes.push(`${target.marker}: 替换失败 "${getNodeName(node)}" / ${getErrorMessage(error)}`);
    }
  }

  return summary;
}

function getPageNodes() {
  if (!host.currentPage) {
    throw new Error("未检测到当前页面");
  }

  if (typeof host.currentPage.findAll === "function") {
    return host.currentPage.findAll((node) => Boolean(getTargetForNode(node)));
  }

  const result = [];
  walkNode(host.currentPage, (node) => {
    if (getTargetForNode(node)) {
      result.push(node);
    }
  });
  return result;
}

function walkNode(node, visit) {
  visit(node);

  if (!node.children) return;

  for (const child of node.children) {
    walkNode(child, visit);
  }
}

function getTargetForNode(node) {
  const name = getNodeName(node);
  return TEMPLATE_TARGETS.find((target) => name.includes(target.marker));
}

function getNodeName(node) {
  return typeof node.name === "string" ? node.name : "";
}

function isTextNode(node) {
  return node.type === "TEXT" || typeof node.characters === "string";
}

async function loadNodeFont(node) {
  if (!host.loadFontAsync) return;

  const fontName = node.fontName;
  if (!fontName || fontName === host.mixed || fontName === "mixed") {
    throw new Error("文本图层包含混合字体，请先统一字体后重试");
  }

  if (fontName.family && fontName.style) {
    await host.loadFontAsync(fontName);
  }
}

function createEmptyCounts() {
  return TEMPLATE_TARGETS.reduce((counts, target) => {
    counts[target.marker] = 0;
    return counts;
  }, {});
}

function normalizeText(value) {
  if (typeof value !== "string") return "";
  return value.trim();
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

function postScanResult(result) {
  postMessage({
    type: "scan-result",
    message: `已找到 ${result.total} 个可替换图层`,
    result
  });
}

function postReplaceResult(result) {
  postMessage({
    type: "replace-result",
    message: `已替换 ${result.replaced} 个文本图层，跳过 ${result.skipped} 个图层`,
    result
  });
}

function postStatus(message) {
  postMessage({ type: "status", message });
}

function postError(message) {
  postMessage({ type: "error", message });
}

function postMessage(message) {
  if (host && host.ui && host.ui.postMessage) {
    host.ui.postMessage(message);
  }
}

function notify(message) {
  if (host && host.notify) {
    host.notify(message);
    return;
  }
  console.log(message);
}

function getErrorMessage(error) {
  return error instanceof Error ? error.message : String(error);
}
