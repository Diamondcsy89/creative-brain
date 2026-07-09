import type { ComponentType } from "react";
import {
  BreathLightButton,
  DownloadProgressButton,
  GlowOutlineButton,
  IconSlideButton,
  LiquidFillButton,
  LongPressConfirmButton,
  MagneticHoverButton,
  PressScaleButton,
  RippleFeedbackButton,
  SuccessStateButton
} from "@/components/buttons";

export type ButtonDemo = {
  id: string;
  title: string;
  description: string;
  scene: string;
  Component: ComponentType;
};

export const buttonDemos: ButtonDemo[] = [
  {
    id: "press-scale",
    title: "按压缩放按钮",
    description: "用轻微 scale 和阴影压缩模拟 iOS 原生触感。",
    scene: "主要 CTA、底部操作栏、表单提交。",
    Component: PressScaleButton
  },
  {
    id: "ripple-feedback",
    title: "涟漪反馈按钮",
    description: "克制涟漪从触点扩散，强调点击确认。",
    scene: "列表操作、支付确认、工具按钮。",
    Component: RippleFeedbackButton
  },
  {
    id: "magnetic-hover",
    title: "磁吸悬停按钮",
    description: "桌面端靠近时轻微跟随指针，移动端保持普通按压。",
    scene: "官网 App 下载、桌面 Web App 主操作。",
    Component: MagneticHoverButton
  },
  {
    id: "glow-outline",
    title: "发光描边按钮",
    description: "使用细腻流动描边，避免高饱和霓虹感。",
    scene: "Pro 功能入口、会员升级、AI 生成动作。",
    Component: GlowOutlineButton
  },
  {
    id: "liquid-fill",
    title: "液态填充按钮",
    description: "悬停或按压时柔和填充，像液面从底部抬升。",
    scene: "状态切换、收藏、开始创作。",
    Component: LiquidFillButton
  },
  {
    id: "download-progress",
    title: "下载进度按钮",
    description: "点击后展示下载进度，完成后短暂停留。",
    scene: "下载 App、离线包、素材保存。",
    Component: DownloadProgressButton
  },
  {
    id: "success-state",
    title: "成功状态按钮",
    description: "提交后切换为成功状态，减少页面跳转焦虑。",
    scene: "保存设置、创建成功、授权完成。",
    Component: SuccessStateButton
  },
  {
    id: "long-press",
    title: "长按确认按钮",
    description: "按住填满进度后才触发，适合高风险操作。",
    scene: "删除、发布、支付、重置数据。",
    Component: LongPressConfirmButton
  },
  {
    id: "icon-slide",
    title: "图标滑入按钮",
    description: "图标从右侧滑入，文字轻微让位，动作清晰不夸张。",
    scene: "进入下一步、打开详情、继续流程。",
    Component: IconSlideButton
  },
  {
    id: "breath-light",
    title: "呼吸光按钮",
    description: "低频柔光呼吸，用于等待用户注意但不打扰。",
    scene: "语音输入、AI 助手、实时监听。",
    Component: BreathLightButton
  }
];
