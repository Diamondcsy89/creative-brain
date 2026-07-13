export const packaging = {
  productName: "小米商城会员限定随行礼盒",
  subtitle: "平台审核包装设计与产品包装展示",
  version: "Pilot Review / V1.0",
  assets: {
    outerCover: "/packaging/mi-gift-box/outer-cover.jpg",
    reviewReference: "/packaging/mi-gift-box/review-reference.jpg",
    eyeMask: "/packaging/mi-gift-box/inner-eye-mask.jpg",
    neckPillow: "/packaging/mi-gift-box/inner-neck-pillow.jpg",
    xiaomiTag: "/packaging/mi-gift-box/inner-xiaomi-tag.jpg",
  },
  dimensions: [
    {
      label: "外盒正面",
      width: "30cm",
      height: "30cm",
      note: "Square front presentation",
    },
    {
      label: "外盒侧面",
      width: "30cm",
      height: "8cm",
      note: "Side depth view",
    },
  ],
  innerItems: [
    {
      name: "挂耳式睡眠眼罩",
      image: "/packaging/mi-gift-box/inner-eye-mask.jpg",
      position: "Left tray",
    },
    {
      name: "口袋充气U型枕",
      image: "/packaging/mi-gift-box/inner-neck-pillow.jpg",
      position: "Main tray",
    },
    {
      name: "Xiaomi Tag",
      image: "/packaging/mi-gift-box/inner-xiaomi-tag.jpg",
      position: "Accessory tray",
    },
  ],
  checklist: ["包装封面", "Logo", "文案", "尺寸", "材质", "印刷安全区", "内容物", "版本状态"],
  reviewNotes: [
    {
      label: "审核状态",
      value: "待平台审核",
    },
    {
      label: "修改意见",
      value: "当前为包装展示 Pilot，需确认 Logo 安全区、印刷材质与最终文案。",
    },
    {
      label: "版本记录",
      value: "V1.0 / 首页包装审核稿 / 2026-07",
    },
  ],
};
