export type PackageDimension = {
  id: string;
  name: string;
  widthCm: number;
  heightCm: number;
  depthCm?: number;
  image?: string;
  note: string;
};

export type InnerPackage = PackageDimension & {
  position: string;
};

const assetBase = "/packaging/mi-gift-box";

export const packaging = {
  productName: "小米商城会员限定随行礼盒",
  subtitle: "平台审核包装设计与产品包装展示",
  version: "Packaging Review Page / V1.1",
  reviewStatus: "待平台审核",
  assets: {
    outerCover: `${assetBase}/outer-cover.jpg`,
    outerSide: `${assetBase}/outer-side.jpg`,
    reviewReference: `${assetBase}/review-reference.jpg`,
    eyeMask: `${assetBase}/inner-eye-mask.jpg`,
    neckPillow: `${assetBase}/inner-neck-pillow.jpg`,
    xiaomiTag: `${assetBase}/inner-xiaomi-tag.jpg`,
  },
  outerDimensions: [
    {
      id: "outer-front",
      name: "外盒正面",
      widthCm: 30,
      heightCm: 30,
      image: `${assetBase}/outer-cover.jpg`,
      note: "主包装盒正面审核图",
    },
    {
      id: "outer-side",
      name: "外盒侧面",
      widthCm: 30,
      heightCm: 8,
      image: `${assetBase}/outer-side.jpg`,
      note: "主包装盒真实侧面图",
    },
  ] satisfies PackageDimension[],
  innerItems: [
    {
      id: "inner-eye-mask",
      name: "挂耳式睡眠眼罩",
      widthCm: 24.2,
      heightCm: 15,
      depthCm: 2,
      image: `${assetBase}/inner-eye-mask.jpg`,
      position: "左侧长盒",
      note: "扁平长盒，置于内托左侧主分区",
    },
    {
      id: "inner-neck-pillow",
      name: "口袋充气U型枕",
      widthCm: 15,
      heightCm: 7.5,
      depthCm: 6,
      image: `${assetBase}/inner-neck-pillow.jpg`,
      position: "中部厚盒",
      note: "厚度最高，置于内托中部承重分区",
    },
    {
      id: "inner-xiaomi-tag",
      name: "Xiaomi Tag",
      widthCm: 7.5,
      heightCm: 7.5,
      depthCm: 2,
      image: `${assetBase}/inner-xiaomi-tag.jpg`,
      position: "右侧小盒",
      note: "小方盒，置于右侧配件分区",
    },
  ] satisfies InnerPackage[],
  checklist: ["包装封面", "Logo", "文案", "尺寸", "材质", "印刷安全区", "内容物", "版本状态"],
  reviewNotes: [
    {
      label: "审核状态",
      value: "待平台审核",
    },
    {
      label: "修改意见",
      value: "已补充真实侧面图与内部小盒尺寸，下一步可进入视觉版式细化与印刷安全区复核。",
    },
    {
      label: "版本记录",
      value: "V1.1 / 新增真实侧面图与完整尺寸数据 / 2026-07",
    },
  ],
};
