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
  const nodes = getTemplateNodes();
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
  const nodes = getTemplateNodes();
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
      await prepareTextNodeForReplacement(node);
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

function getTemplateNodes() {
  const roots = getScanRoots();
  const result = [];

  for (const root of roots) {
    walkNode(root, (node) => {
      if (getTargetForNode(node)) {
        result.push(node);
      }
    });
  }

  return result;
}

function getScanRoots() {
  const selectedNodes = getSelectedNodes();
  if (selectedNodes.length > 0) {
    return selectedNodes;
  }

  const currentPage = getCurrentPage();
  if (currentPage) {
    return [currentPage];
  }

  throw new Error("请先选中一个模板容器，或打开一个包含模板图层的页面");
}

function getSelectedNodes() {
  const candidates = [
    () => getCurrentPage() && getCurrentPage().selection,
    () => host.selection,
    () => (typeof host.getSelection === "function" ? host.getSelection() : null),
    () => host.editor && host.editor.selection,
    () => host.document && host.document.selection
  ];

  for (const getCandidate of candidates) {
    const nodes = readCandidateNodes(getCandidate);
    if (nodes.length > 0) {
      return nodes;
    }
  }

  return [];
}

function getCurrentPage() {
  const candidates = [
    () => host.currentPage,
    () => host.document && host.document.currentPage,
    () => host.root && host.root.currentPage
  ];

  for (const getCandidate of candidates) {
    try {
      const page = getCandidate();
      if (page) return page;
    } catch (error) {
      console.log(`读取当前页面跳过：${getErrorMessage(error)}`);
    }
  }

  return null;
}

function readCandidateNodes(getCandidate) {
  try {
    const value = getCandidate();
    if (!value) return [];
    if (Array.isArray(value)) return value.filter(Boolean);
    if (typeof value.length === "number") return Array.from(value).filter(Boolean);
    return [value];
  } catch (error) {
    console.log(`读取选中图层跳过：${getErrorMessage(error)}`);
    return [];
  }
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

async function prepareTextNodeForReplacement(node) {
  if (!host.loadFontAsync) return;

  const fonts = collectTextFonts(node);
  for (const font of fonts) {
    await loadFontSafely(font);
  }
}

function collectTextFonts(node) {
  const fonts = [];

  const fontName = node.fontName;
  if (isFontName(fontName)) {
    fonts.push(fontName);
  }

  if (typeof node.getStyledTextSegments === "function") {
    try {
      const segments = node.getStyledTextSegments(["fontName"]);
      for (const segment of segments) {
        if (isFontName(segment.fontName)) {
          fonts.push(segment.fontName);
        }
      }
    } catch (error) {
      console.log(`读取文本样式段跳过：${getErrorMessage(error)}`);
    }
  }

  const firstCharacterFont = getFirstCharacterFont(node);
  if (isFontName(firstCharacterFont)) {
    fonts.push(firstCharacterFont);
  }

  return dedupeFonts(fonts);
}

function getFirstCharacterFont(node) {
  if (typeof node.getRangeFontName !== "function") return null;

  try {
    const characters = typeof node.characters === "string" ? node.characters : "";
    if (characters.length === 0) return null;
    return node.getRangeFontName(0, 1);
  } catch (error) {
    console.log(`读取首字符字体跳过：${getErrorMessage(error)}`);
    return null;
  }
}

async function loadFontSafely(font) {
  try {
    await host.loadFontAsync(font);
  } catch (error) {
    console.log(`字体加载跳过：${font.family} ${font.style} / ${getErrorMessage(error)}`);
  }
}

function isFontName(font) {
  return Boolean(font && font !== host.mixed && font !== "mixed" && font.family && font.style);
}

function dedupeFonts(fonts) {
  const seen = new Set();
  const result = [];

  for (const font of fonts) {
    const id = `${font.family}/${font.style}`;
    if (seen.has(id)) continue;
    seen.add(id);
    result.push(font);
  }

  return result;
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
    message: `已替换 ${result.replaced} 个文本图层，已跳过 ${result.skipped} 个文本图层`,
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
