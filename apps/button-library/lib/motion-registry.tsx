import type { ComponentType } from "react";
import {
  AppleMusicPlayButton,
  AppleWalletButton,
  AppStoreDownloadButton,
  DownloadProgressButton,
  DynamicIslandActionButton,
  LiquidGlassCTA,
  LongPressConfirmButton,
  MagneticHoverButton,
  PressScaleButton,
  RippleFeedbackButton,
  SuccessStateButton,
  VisionHoverButton,
} from "@/components/buttons";

export const motionRegistry: Record<string, ComponentType> = {
  AppleWalletButton,
  AppleMusicPlayButton,
  VisionHoverButton,
  LiquidGlassCTA,
  AppStoreDownloadButton,
  DynamicIslandActionButton,
  PressScaleButton,
  RippleFeedbackButton,
  MagneticHoverButton,
  DownloadProgressButton,
  SuccessStateButton,
  LongPressConfirmButton,
};

export function getMotionComponent(componentName: string) {
  return motionRegistry[componentName] ?? PressScaleButton;
}
