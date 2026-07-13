export type MotionCategory = "Apple" | "System" | "Commerce" | "Experimental";

export type MotionItem = {
  slug: string;
  title: string;
  category: MotionCategory;
  tags: string[];
  description: string;
  platform: string;
  motionType: string;
  componentName: string;
};

export const motionItems: MotionItem[] = [
  {
    slug: "apple-wallet",
    title: "Apple Wallet Button",
    category: "Apple",
    tags: ["wallet", "payment", "ios"],
    description: "A compact payment-style CTA with subtle lift, soft compression, and restrained highlight movement.",
    platform: "iOS",
    motionType: "Hover lift / press compression",
    componentName: "AppleWalletButton",
  },
  {
    slug: "apple-music-play",
    title: "Apple Music Play Button",
    category: "Apple",
    tags: ["music", "play", "media"],
    description: "A tactile media action with a soft icon pulse and physical press response.",
    platform: "iOS / iPadOS",
    motionType: "Icon pulse / scale press",
    componentName: "AppleMusicPlayButton",
  },
  {
    slug: "vision-hover",
    title: "Vision Hover Button",
    category: "Apple",
    tags: ["vision", "spatial", "hover"],
    description: "A spatial interface inspired hover state with calm depth, focus, and controlled brightness.",
    platform: "visionOS",
    motionType: "Spatial hover / depth shift",
    componentName: "VisionHoverButton",
  },
  {
    slug: "liquid-glass-cta",
    title: "Liquid Glass CTA",
    category: "Apple",
    tags: ["glass", "cta", "fluid"],
    description: "A refined liquid surface CTA with restrained sheen and springy press behavior.",
    platform: "iOS",
    motionType: "Surface sheen / spring press",
    componentName: "LiquidGlassCTA",
  },
  {
    slug: "app-store-download",
    title: "App Store Download Button",
    category: "Commerce",
    tags: ["download", "store", "conversion"],
    description: "A store-style download action with quiet progress affordance and premium purchase intent.",
    platform: "iOS / Web",
    motionType: "Hover reveal / press confirm",
    componentName: "AppStoreDownloadButton",
  },
  {
    slug: "dynamic-island-action",
    title: "Dynamic Island Action Button",
    category: "Experimental",
    tags: ["island", "status", "live activity"],
    description: "A compact live-activity inspired action that expands with a small status preview.",
    platform: "iOS",
    motionType: "Morph expansion / status reveal",
    componentName: "DynamicIslandActionButton",
  },
  {
    slug: "press-scale",
    title: "Press Scale Button",
    category: "System",
    tags: ["feedback", "tap", "native"],
    description: "A foundational tap interaction using subtle scale and shadow compression.",
    platform: "iOS / Android",
    motionType: "Press scale",
    componentName: "PressScaleButton",
  },
  {
    slug: "ripple-feedback",
    title: "Ripple Feedback Button",
    category: "System",
    tags: ["tap", "feedback", "utility"],
    description: "A controlled ripple response that confirms touch without overpowering the interface.",
    platform: "Mobile",
    motionType: "Pointer ripple",
    componentName: "RippleFeedbackButton",
  },
  {
    slug: "magnetic-hover",
    title: "Magnetic Hover Button",
    category: "Experimental",
    tags: ["desktop", "hover", "magnetic"],
    description: "A pointer-aware hover behavior for web apps and polished desktop product surfaces.",
    platform: "Web",
    motionType: "Pointer magnetism",
    componentName: "MagneticHoverButton",
  },
  {
    slug: "download-progress",
    title: "Download Progress Button",
    category: "Commerce",
    tags: ["download", "progress", "save"],
    description: "A compact progress state for install, save, and offline download moments.",
    platform: "Web / iOS",
    motionType: "Progress fill / state swap",
    componentName: "DownloadProgressButton",
  },
  {
    slug: "success-state",
    title: "Success State Button",
    category: "System",
    tags: ["success", "save", "confirm"],
    description: "A state transition that keeps completion feedback inside the original button.",
    platform: "Mobile / Web",
    motionType: "Content transition",
    componentName: "SuccessStateButton",
  },
  {
    slug: "long-press-confirm",
    title: "Long Press Confirm Button",
    category: "System",
    tags: ["confirm", "safety", "destructive"],
    description: "A hold-to-confirm interaction for sensitive product actions and irreversible flows.",
    platform: "Mobile",
    motionType: "Hold progress",
    componentName: "LongPressConfirmButton",
  },
];

export const categories: MotionCategory[] = ["Apple", "System", "Commerce", "Experimental"];

export function getMotionItem(slug: string) {
  return motionItems.find((item) => item.slug === slug);
}
