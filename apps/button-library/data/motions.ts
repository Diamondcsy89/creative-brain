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
  motion: {
    interaction: string;
    hover: string;
    press: string;
    spring: string;
    duration: string;
    easing: string;
  };
  code: string;
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
    motion: {
      interaction: "Payment CTA confirmation",
      hover: "Lift -2px with soft highlight sweep",
      press: "Scale 0.965 and return to rest",
      spring: "stiffness 420 / damping 32",
      duration: "220-360ms",
      easing: "spring",
    },
    code: `<AppleWalletButton />`,
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
    motion: {
      interaction: "Media preview action",
      hover: "Play control scales to 1.08",
      press: "Button scale compresses to 0.96",
      spring: "stiffness 360 / damping 22",
      duration: "180-280ms",
      easing: "spring",
    },
    code: `<AppleMusicPlayButton />`,
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
    motion: {
      interaction: "Spatial focus target",
      hover: "Lift -4px with 1.015 scale",
      press: "Scale 0.97 and flatten depth",
      spring: "stiffness 260 / damping 24",
      duration: "260-420ms",
      easing: "spring",
    },
    code: `<VisionHoverButton />`,
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
    motion: {
      interaction: "Primary continuation CTA",
      hover: "Liquid surface rises to 38%",
      press: "Liquid surface rises to 22%",
      spring: "stiffness 150 / damping 20",
      duration: "280-420ms",
      easing: "spring",
    },
    code: `<LiquidGlassCTA />`,
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
    motion: {
      interaction: "Download conversion action",
      hover: "Subtle fill expands across the button",
      press: "Scale compresses to 0.965",
      spring: "implicit Motion spring",
      duration: "420ms",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    code: `<AppStoreDownloadButton />`,
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
    motion: {
      interaction: "Live activity status action",
      hover: "Status label expands to 44px",
      press: "Indicator scales to 0.92",
      spring: "stiffness 260 / damping 28",
      duration: "240-380ms",
      easing: "spring",
    },
    code: `<DynamicIslandActionButton />`,
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
    motion: {
      interaction: "Foundational tap feedback",
      hover: "Lift -1px",
      press: "Scale 0.94 and move down 2px",
      spring: "stiffness 520 / damping 34",
      duration: "160-260ms",
      easing: "spring",
    },
    code: `<PressScaleButton />`,
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
    motion: {
      interaction: "Tap confirmation feedback",
      hover: "Static hover surface",
      press: "Scale 0.97",
      spring: "standard Motion press",
      duration: "620ms ripple",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    code: `<RippleFeedbackButton />`,
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
    motion: {
      interaction: "Pointer-aware desktop CTA",
      hover: "Tracks cursor within local bounds",
      press: "Scale 0.96",
      spring: "stiffness 220 / damping 18 / mass 0.4",
      duration: "continuous",
      easing: "spring",
    },
    code: `<MagneticHoverButton />`,
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
    motion: {
      interaction: "Download progress state",
      hover: "Idle surface stays calm",
      press: "Starts progress fill",
      spring: "state-driven width transition",
      duration: "84ms progress ticks",
      easing: "easeOut",
    },
    code: `<DownloadProgressButton />`,
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
    motion: {
      interaction: "Save and completion feedback",
      hover: "Static primary surface",
      press: "Scale 0.96",
      spring: "standard Motion press",
      duration: "1500ms success hold",
      easing: "easeOut",
    },
    code: `<SuccessStateButton />`,
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
    motion: {
      interaction: "Hold-to-confirm safety action",
      hover: "Static safety surface",
      press: "Fills progress over hold duration",
      spring: "linear hold animation",
      duration: "1050ms hold",
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    },
    code: `<LongPressConfirmButton />`,
  },
];

export const categories: MotionCategory[] = ["Apple", "System", "Commerce", "Experimental"];

export function getMotionItem(slug: string) {
  return motionItems.find((item) => item.slug === slug);
}
