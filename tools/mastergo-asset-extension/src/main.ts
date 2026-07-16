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
  { key: "productImage", marker: "@product-image", label: "商品图", replaceable: false },
  { key: "productNameImageLg", marker: "@product-name-image-lg", label: "产品名图片大槽位", replaceable: false },
  { key: "productNameImageMd", marker: "@product-name-image-md", label: "产品名图片中槽位", replaceable: false },
  { key: "productNameImageSm", marker: "@product-name-image-sm", label: "产品名图片小槽位", replaceable: false }
];
const TEMPLATE_MATCH_TARGETS = [...TEMPLATE_TARGETS].sort((a, b) => b.marker.length - a.marker.length);
const PRODUCT_NAME_IMAGE_KEYS = new Set(["productNameImageLg", "productNameImageMd", "productNameImageSm"]);

try {
  if (!host) {
    throw new Error("未检测到 MasterGo 插件运行环境");
  }

  host.showUI(__html__, { width: 380, height: 720 });
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
    if (!message || !["scan-template-layers", "replace-template-text", "replace-product-name-image"].includes(message.type)) return;

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
      return;
    }

    if (message.type === "replace-product-name-image") {
      const imageResult = await replaceProductNameImages(message.payload);
      postImageReplaceResult(imageResult);
      notify("产品名图片已替换");
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

async function replaceProductNameImages(payload) {
  const bytes = getImageBytes(payload);
  const imageType = normalizeImageType(payload.imageType || payload.mimeType, payload.fileName);
  postStatus(`main 已收到图片数据：${payload.fileName || "未命名文件"} / ${bytes.length} bytes`);
  postStatus(`main 规范化 imageType：${imageType}`);
  postStatus("正在创建 MasterGo 图片资源");
  const imageResource = await createImageResource(bytes, payload, imageType);
  postStatus("图片创建成功");
  postStatus(`image href: ${imageResource.href || imageResource.ref}`);
  const slots = getTemplateNodes().filter((node) => {
    const target = getTargetForNode(node);
    return target && PRODUCT_NAME_IMAGE_KEYS.has(target.key);
  });

  const summary = {
    found: slots.length,
    replaced: 0,
    skipped: 0,
    skippedByMarker: createEmptyCounts(),
    replacedByMarker: createEmptyCounts(),
    notes: []
  };

  for (const slot of slots) {
    const target = getTargetForNode(slot);

    try {
      const placedImage = createVisibleReplacementImage(slot, imageResource, payload);
      summary.replaced += 1;
      summary.replacedByMarker[target.marker] += 1;
      summary.notes.push(`${target.marker}: ${getNodeName(slot)} ${formatSize(placedImage.slot)} -> ${formatSize(placedImage.image)}`);
    } catch (error) {
      summary.skipped += 1;
      summary.skippedByMarker[target.marker] += 1;
      summary.notes.push(`${target.marker}: 替换失败 "${getNodeName(slot)}" / ${getErrorMessage(error)}`);
    }
  }

  return summary;
}

function getImageBytes(payload) {
  if (!payload) {
    throw new Error("请先选择一张产品名图片");
  }

  if (payload.bytes && payload.bytes.length > 0) {
    return new Uint8Array(payload.bytes);
  }

  if (payload.base64) {
    return decodeBase64ToBytes(payload.base64);
  }

  throw new Error(`未收到有效图片数据：file=${payload.fileName || "unknown"} mime=${payload.mimeType || "unknown"}`);
}

function decodeBase64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return bytes;
}

async function createImageResource(bytes, payload, imageType) {
  const attempts = [];
  const base64 = payload.base64 || encodeBytesToBase64(bytes);
  const dataUrl = `data:${payload.mimeType || "image/png"};base64,${base64}`;
  const byteInputs = [
    { label: "Uint8Array", value: bytes },
    { label: "ObjectTypeDataUint8Array", value: { type: imageType, data: bytes } },
    { label: "ObjectTypeDataArrayBuffer", value: { type: imageType, data: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) } },
    { label: "ObjectTypeBytesUint8Array", value: { type: imageType, bytes } },
    { label: "ObjectTypeBase64", value: { type: imageType, base64 } },
    { label: "ArrayBuffer", value: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) },
    { label: "NumberArray", value: Array.from(bytes) },
    { label: "Base64", value: base64 },
    { label: "DataURL", value: dataUrl },
    { label: "ObjectData", value: { data: bytes, fileName: payload.fileName, mimeType: payload.mimeType, type: imageType } },
    { label: "ObjectBytes", value: { bytes, fileName: payload.fileName, mimeType: payload.mimeType, type: imageType } },
    { label: "ObjectBase64", value: { base64, fileName: payload.fileName, mimeType: payload.mimeType, type: imageType } }
  ];

  const createImageMethods = [
    { name: "createImage", fn: host.createImage },
    { name: "createImageAsync", fn: host.createImageAsync },
    { name: "createImageFromBytes", fn: host.createImageFromBytes }
  ].filter((method) => typeof method.fn === "function");

  if (createImageMethods.length === 0) {
    throw new Error("当前 MasterGo API 未提供 createImage / createImageAsync / createImageFromBytes");
  }

  for (const method of createImageMethods) {
    for (const input of byteInputs) {
      try {
        const image = await method.fn.call(host, input.value);
        const description = describeImageResult(image);
        const imageRef = await extractImageRef(image);
        attempts.push(`${method.name}(${input.label}) => ${description}`);
        postStatus(`图片创建返回值：${method.name}(${input.label}) => ${description}`);

        if (imageRef) {
          return {
            ref: imageRef,
            href: getImageHref(image),
            raw: image,
            debug: attempts
          };
        }
      } catch (error) {
        const message = `${method.name}(${input.label}) failed: ${getErrorMessage(error)}`;
        attempts.push(message);
        postStatus(`图片创建尝试失败：${message}`);
      }
    }
  }

  throw new Error([
    "图片创建失败，未获得 MasterGo 图片引用 href/ref/hash",
    `文件：${payload.fileName || "unknown"}`,
    `原始类型：${payload.mimeType || "unknown"}`,
    `规范化类型：${imageType}`,
    `字节数：${bytes.length}`,
    `尝试记录：${attempts.join(" | ")}`
  ].join("；"));
}

function normalizeImageType(mimeType, fileName) {
  const normalizedMime = String(mimeType || "").trim().toLowerCase();
  const normalizedName = String(fileName || "").trim().toLowerCase();
  const extension = normalizedName.includes(".") ? normalizedName.split(".").pop() : "";
  const rawType = normalizedMime || extension;
  const typeMap = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpeg",
    "image/gif": "gif",
    "image/webp": "webp",
    png: "png",
    jpg: "jpeg",
    jpeg: "jpeg",
    gif: "gif",
    webp: "webp"
  };
  const imageType = typeMap[rawType] || typeMap[extension];

  if (!imageType) {
    throw new Error(`不支持的图片类型：mime=${mimeType || "unknown"} file=${fileName || "unknown"}，当前支持 png/jpeg/gif/webp`);
  }

  return imageType;
}

function encodeBytesToBase64(bytes) {
  let binary = "";
  const chunkSize = 8192;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.slice(index, index + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }

  return btoa(binary);
}

async function extractImageRef(image) {
  if (!image) return "";
  if (typeof image === "string") return image;
  const directFields = ["href", "imageHref", "imageURL", "imageUrl", "imageRef", "ref", "imageHash", "hash", "image_hash", "id", "imageId", "imageID", "resourceId", "resourceID", "key", "value"];

  for (const field of directFields) {
    const value = safeReadProperty(image, field);
    if (isUsableHashValue(value)) return String(value);
  }

  if (image.data) {
    return extractImageRef(image.data);
  }

  const getHash = safeReadProperty(image, "getHash");
  if (typeof getHash === "function") {
    const value = await getHash.call(image);
    if (isUsableHashValue(value)) return String(value);
  }

  const getHashAsync = safeReadProperty(image, "getHashAsync");
  if (typeof getHashAsync === "function") {
    const value = await getHashAsync.call(image);
    if (isUsableHashValue(value)) return String(value);
  }

  const toJSON = safeReadProperty(image, "toJSON");
  if (typeof toJSON === "function") {
    const value = toJSON.call(image);
    return extractImageRef(value);
  }

  return "";
}

function getImageHref(image) {
  if (!image || typeof image !== "object") return "";
  const value = safeReadProperty(image, "href");
  return isUsableHashValue(value) ? String(value) : "";
}

function safeReadProperty(source, property) {
  try {
    return source[property];
  } catch (error) {
    return undefined;
  }
}

function isUsableHashValue(value) {
  return typeof value === "string" && value.length > 0 || typeof value === "number" && Number.isFinite(value);
}

function describeImageResult(image) {
  if (!image) return "empty result";
  if (typeof image === "string") return `string:${image.slice(0, 12)}`;
  if (typeof image !== "object") return `${typeof image}:${String(image)}`;
  const keys = getDebugKeys(image);
  const values = keys.slice(0, 12).map((key) => `${key}:${describeDebugValue(safeReadProperty(image, key))}`);
  return `object keys:${keys.length > 0 ? keys.join(",") : "none"} values:${values.join(",") || "none"}`;
}

function getDebugKeys(source) {
  const keys = new Set();

  for (const key of Object.keys(source)) {
    keys.add(key);
  }

  try {
    for (const key of Object.getOwnPropertyNames(source)) {
      keys.add(key);
    }
  } catch (error) {
    console.log(`读取图片返回值属性跳过：${getErrorMessage(error)}`);
  }

  try {
    const prototype = Object.getPrototypeOf(source);
    if (prototype) {
      for (const key of Object.getOwnPropertyNames(prototype)) {
        if (key !== "constructor") keys.add(key);
      }
    }
  } catch (error) {
    console.log(`读取图片返回值原型属性跳过：${getErrorMessage(error)}`);
  }

  return Array.from(keys);
}

function describeDebugValue(value) {
  if (typeof value === "function") return "function";
  if (typeof value === "string") return value.slice(0, 20);
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  if (!value) return String(value);
  if (Array.isArray(value)) return `array(${value.length})`;
  return typeof value;
}

function createContainImagePaints(imageResource) {
  return [createImageFill(imageResource, "FIT")];
}

function createImageFill(imageResource, mode) {
  const imageRef = imageResource.href || imageResource.ref;
  if (!imageRef) {
    throw new Error("图片资源缺少 href，无法创建 MasterGo ImagePaint");
  }

  return {
    type: "IMAGE",
    imageRef,
    scaleMode: mode,
    isVisible: true,
    alpha: 1,
    filters: {},
    colorStyleId: ""
  };
}

function createVisibleReplacementImage(slot, imageResource, payload) {
  if (typeof host.createRectangle !== "function") {
    throw new Error("当前 API 不支持创建图片矩形");
  }

  if (!slot.parent || typeof slot.parent.appendChild !== "function") {
    throw new Error("无法在槽位父级创建图片节点");
  }

  const slotBounds = getNodeBounds(slot);
  const imageSize = getUploadedImageSize(payload);
  const fitted = containRect(slotBounds, imageSize);
  removeExistingReplacementImages(slot, `${getNodeName(slot)} / replaced-image`);

  const imageNode = host.createRectangle();
  imageNode.name = `${getNodeName(slot)} / replaced-image`;
  imageNode.x = fitted.x;
  imageNode.y = fitted.y;
  resizeNode(imageNode, fitted.width, fitted.height);

  const paintAttempts = createContainImagePaints(imageResource);
  let filled = false;
  for (const paint of paintAttempts) {
    try {
      imageNode.fills = [paint];
      filled = true;
      postStatus("已创建图片填充");
      break;
    } catch (error) {
      console.log(`图片节点填充失败，尝试下一种 paint：${getErrorMessage(error)}`);
    }
  }

  if (!filled) {
    createImageFillSmokeTest(slot, imageResource);
    throw new Error("已创建图片节点，但无法设置图片填充");
  }

  slot.parent.appendChild(imageNode);
  bringNodeToFront(imageNode);
  postStatus(`已创建可见 replaced-image 图层：${imageNode.name}`);

  return {
    node: imageNode,
    slot: slotBounds,
    image: fitted
  };
}

function createImageFillSmokeTest(slot, imageResource) {
  try {
    if (typeof host.createRectangle !== "function") {
      postStatus("最小测试失败：当前 API 不支持 createRectangle");
      return;
    }

    const parent = slot.parent || getCurrentPage();
    if (!parent || typeof parent.appendChild !== "function") {
      postStatus("最小测试失败：无法找到可插入测试矩形的父级");
      return;
    }

    const slotBounds = getNodeBounds(slot);
    const testNode = host.createRectangle();
    testNode.name = "MasterGo image fill smoke test";
    testNode.x = slotBounds.x;
    testNode.y = slotBounds.y + slotBounds.height + 16;
    resizeNode(testNode, 300, 120);
    testNode.fills = [createImageFill(imageResource, "FIT")];
    parent.appendChild(testNode);
    bringNodeToFront(testNode);
    postStatus("最小测试成功：已创建 300×120 图片填充矩形");
  } catch (error) {
    postStatus(`最小测试失败：${getErrorMessage(error)}`);
  }
}

function getNodeBounds(node) {
  const width = typeof node.width === "number" ? node.width : 0;
  const height = typeof node.height === "number" ? node.height : 0;

  if (width <= 0 || height <= 0) {
    throw new Error("槽位缺少有效宽高，无法放置图片");
  }

  return {
    x: typeof node.x === "number" ? node.x : 0,
    y: typeof node.y === "number" ? node.y : 0,
    width,
    height
  };
}

function getUploadedImageSize(payload) {
  const width = Number(payload.width);
  const height = Number(payload.height);

  if (width > 0 && height > 0) {
    return { width, height };
  }

  return { width: 1, height: 1 };
}

function containRect(slotBounds, imageSize) {
  const scale = Math.min(slotBounds.width / imageSize.width, slotBounds.height / imageSize.height);
  const width = imageSize.width * scale;
  const height = imageSize.height * scale;

  return {
    x: slotBounds.x + (slotBounds.width - width) / 2,
    y: slotBounds.y + (slotBounds.height - height) / 2,
    width,
    height
  };
}

function removeExistingReplacementImages(slot, replacementName) {
  const parent = slot.parent;
  if (!parent || !parent.children) return;

  const nodes = Array.from(parent.children).filter((node) => getNodeName(node) === replacementName);
  for (const node of nodes) {
    try {
      if (typeof node.remove === "function") {
        node.remove();
      }
    } catch (error) {
      console.log(`移除旧 replaced-image 跳过：${getErrorMessage(error)}`);
    }
  }
}

function bringNodeToFront(node) {
  try {
    if (typeof node.bringToFront === "function") {
      node.bringToFront();
    }
  } catch (error) {
    console.log(`置顶 replaced-image 跳过：${getErrorMessage(error)}`);
  }
}

function formatSize(bounds) {
  return `${round(bounds.width)}x${round(bounds.height)}`;
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function resizeNode(node, width, height) {
  if (typeof node.resize === "function") {
    node.resize(width, height);
    return;
  }

  node.width = width;
  node.height = height;
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
  return TEMPLATE_MATCH_TARGETS.find((target) => name.includes(target.marker));
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

function postImageReplaceResult(result) {
  postMessage({
    type: "image-replace-result",
    message: `找到 ${result.found} 个产品名图片槽位，已创建 ${result.replaced} 个 replaced-image 图层，跳过 ${result.skipped} 个`,
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
