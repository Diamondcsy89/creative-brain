const host = globalThis.mg || globalThis.mastergo || globalThis.figma;

try {
  if (!host) {
    throw new Error("未检测到 MasterGo 插件运行环境");
  }

  host.showUI(__html__, { width: 320, height: 220 });

  host.ui.onmessage = async (message) => {
    try {
      if (message.type === "generate-test-board") {
        notify("收到生成指令");
        postStatus("收到生成指令");
        const frame = await generateTestBoard();
        selectNode(frame);
        notify("测试画板已生成");
        postStatus("测试画板已生成");
      }
    } catch (error) {
      const messageText = `生成失败：${getErrorMessage(error)}`;
      notify(messageText);
      postError(messageText);
    }
  };
} catch (error) {
  const messageText = `插件启动失败：${getErrorMessage(error)}`;
  notify(messageText);
  postError(messageText);
}

async function generateTestBoard() {
  await loadFont();

  const frame = host.createFrame();
  frame.name = "MasterGo Plugin Test Board";
  frame.resize(750, 360);
  frame.fills = [{ type: "SOLID", color: hexToRgb("#F7F7F5") }];

  const border = host.createRectangle();
  border.name = "Background / editable";
  border.x = 0;
  border.y = 0;
  border.resize(750, 360);
  border.fills = [{ type: "SOLID", color: hexToRgb("#FFFFFF") }];
  border.strokes = [{ type: "SOLID", color: hexToRgb("#CFCFCF") }];
  border.strokeWeight = 1;
  frame.appendChild(border);

  const accent = host.createRectangle();
  accent.name = "Xiaomi Orange Accent / editable";
  accent.x = 48;
  accent.y = 52;
  accent.resize(48, 4);
  accent.fills = [{ type: "SOLID", color: hexToRgb("#FF6900") }];
  frame.appendChild(accent);

  const text = host.createText();
  text.name = "Test Result Text / editable";
  text.x = 48;
  text.y = 132;
  text.fontName = { family: "Inter", style: "Bold" };
  text.fontSize = 36;
  text.fills = [{ type: "SOLID", color: hexToRgb("#111111") }];
  text.characters = "MasterGo 插件测试成功";
  frame.appendChild(text);

  host.currentPage.appendChild(frame);

  if (host.viewport && host.viewport.scrollAndZoomIntoView) {
    host.viewport.scrollAndZoomIntoView([frame]);
  }

  return frame;
}

async function loadFont() {
  if (!host.loadFontAsync) return;
  await host.loadFontAsync({ family: "Inter", style: "Bold" });
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

function selectNode(node) {
  if (host.currentPage) {
    host.currentPage.selection = [node];
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
