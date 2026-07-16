export const PARTNER_PRESETS = [
  {
    id: "partner-xiaomi-demo",
    name: "partner-xiaomi-demo",
    displayName: "小米 Demo 合作方",
    sizeGroups: [
      {
        id: "xiaomi-demo-core",
        name: "小米 Demo 基础三图",
        sizes: [
          {
            id: "pc-hero",
            name: "PC Hero",
            width: 1920,
            height: 600,
            safeArea: { x: 120, y: 60, width: 1680, height: 480 },
            kvArea: { x: 120, y: 80, width: 760, height: 360 },
            productArea: { x: 1040, y: 70, width: 680, height: 420 },
            copyArea: { x: 160, y: 126, width: 620, height: 180 },
            ctaArea: { x: 160, y: 360, width: 180, height: 52 },
            exportNameTemplate: "{project}-pc-hero-1920x600"
          },
          {
            id: "mobile-banner",
            name: "Mobile Banner",
            width: 750,
            height: 360,
            safeArea: { x: 40, y: 32, width: 670, height: 296 },
            kvArea: { x: 48, y: 48, width: 320, height: 210 },
            productArea: { x: 420, y: 54, width: 250, height: 220 },
            copyArea: { x: 60, y: 76, width: 300, height: 112 },
            ctaArea: { x: 60, y: 224, width: 148, height: 44 },
            exportNameTemplate: "{project}-mobile-banner-750x360"
          },
          {
            id: "app-card",
            name: "App Card",
            width: 690,
            height: 320,
            safeArea: { x: 36, y: 28, width: 618, height: 264 },
            kvArea: { x: 44, y: 44, width: 288, height: 196 },
            productArea: { x: 392, y: 48, width: 220, height: 196 },
            copyArea: { x: 56, y: 68, width: 276, height: 104 },
            ctaArea: { x: 56, y: 210, width: 138, height: 42 },
            exportNameTemplate: "{project}-app-card-690x320"
          }
        ]
      }
    ]
  }
];
