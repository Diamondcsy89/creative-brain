export type PackageDimension = {
  id: string;
  name: string;
  widthCm: number;
  heightCm: number;
  depthCm?: number;
  image?: string;
  fileName?: string;
  note: string;
  usage: string;
  status: ReviewStatus;
  version: string;
};

export type InnerPackage = PackageDimension & {
  position: string;
};

export type ReviewStatus = "Confirmed" | "Pending" | "Need Review";

const assetBase = "/packaging/mi-gift-box";

export const packaging = {
  productName: "小米商城会员限定随行礼盒",
  subtitle: "平台审核包装设计与产品包装展示",
  version: "V1.2",
  documentTitle: "Packaging Review Page",
  projectType: "Packaging Review",
  reviewPurpose: "Platform Packaging Review",
  pageStatus: "Draft for Review",
  reviewStatus: "Pending" as ReviewStatus,
  heroStatus: "Pending Review",
  outerBoxSize: "30cm × 30cm × 8cm",
  nextAction: "等待平台审核反馈",
  submissionNote: "用于小米商城会员限定随行礼盒包装提交审核，当前页面仅保留包装正侧面、内部物料、内托图占位和版本备注。",
  assets: {
    outerCover: `${assetBase}/outer-cover.jpg`,
    outerSide: `${assetBase}/outer-side.jpg`,
    innerTrayLayout: `${assetBase}/inner-tray-layout.jpg`,
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
      fileName: "outer-cover.jpg",
      note: "主包装盒正面审核图",
      usage: "外盒正面封面展示",
      status: "Confirmed",
      version: "V1.2",
    },
    {
      id: "outer-side",
      name: "外盒侧面",
      widthCm: 30,
      heightCm: 8,
      image: `${assetBase}/outer-side.jpg`,
      fileName: "outer-side.jpg",
      note: "主包装盒真实侧面图",
      usage: "外盒侧面结构展示",
      status: "Confirmed",
      version: "V1.2",
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
      fileName: "inner-eye-mask.jpg",
      position: "左侧长盒",
      note: "扁平长盒，置于内托左侧主分区",
      usage: "内部物料包装审核",
      status: "Confirmed",
      version: "V1.2",
    },
    {
      id: "inner-neck-pillow",
      name: "口袋充气U型枕",
      widthCm: 15,
      heightCm: 7.5,
      depthCm: 6,
      image: `${assetBase}/inner-neck-pillow.jpg`,
      fileName: "inner-neck-pillow.jpg",
      position: "中部厚盒",
      note: "厚度最高，置于内托中部承重分区",
      usage: "内部物料包装审核",
      status: "Confirmed",
      version: "V1.2",
    },
    {
      id: "inner-xiaomi-tag",
      name: "Xiaomi Tag",
      widthCm: 7.5,
      heightCm: 7.5,
      depthCm: 2,
      image: `${assetBase}/inner-xiaomi-tag.jpg`,
      fileName: "inner-xiaomi-tag.jpg",
      position: "右侧小盒",
      note: "小方盒，置于右侧配件分区",
      usage: "内部物料包装审核",
      status: "Confirmed",
      version: "V1.2",
    },
  ] satisfies InnerPackage[],
  safetyZone: {
    label: "内托安全区",
    marginCm: 1.2,
    note: "四周预留包装取放和印刷审核边距",
    status: "Need Review" as ReviewStatus,
  },
  innerTray: {
    title: "内托平面布局图",
    image: `${assetBase}/inner-tray-layout.jpg`,
    hasImage: false,
    placeholder: "待补充内托平面布局图",
    note: "补充真实内托图后，页面将用于展示盒子打开后的内部排列关系。",
  },
  reviewNotes: [
    {
      label: "当前版本",
      value: "V1.2",
    },
    {
      label: "审核用途",
      value: "Platform Packaging Review",
    },
    {
      label: "页面状态",
      value: "Draft for Review",
    },
    {
      label: "下一步动作",
      value: "等待平台审核反馈",
    },
  ],
};
