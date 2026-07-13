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

export type ChecklistItem = {
  item: string;
  content: string;
  status: ReviewStatus;
  note: string;
};

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
  checklist: [
    {
      item: "外包装封面",
      content: "正面主视觉、产品名称、会员限定信息完整可见",
      status: "Confirmed",
      note: "已使用 outer-cover.jpg",
    },
    {
      item: "小米 Logo",
      content: "Logo 位置、比例与品牌识别清晰度",
      status: "Need Review",
      note: "等待平台品牌规范复核",
    },
    {
      item: "产品名称文案",
      content: "小米商城会员限定随行礼盒",
      status: "Confirmed",
      note: "页面与包装名称一致",
    },
    {
      item: "外盒正面尺寸",
      content: "宽 30cm × 高 30cm",
      status: "Confirmed",
      note: "已纳入工程标注",
    },
    {
      item: "外盒侧面尺寸",
      content: "宽 30cm × 高 8cm",
      status: "Confirmed",
      note: "已补充真实侧面图",
    },
    {
      item: "内盒结构",
      content: "三件套分区、边距与安全区",
      status: "Need Review",
      note: "V1.2 已重做比例化内托",
    },
    {
      item: "内部三件套",
      content: "眼罩、U 型枕、Xiaomi Tag 尺寸与位置",
      status: "Confirmed",
      note: "尺寸已集中在数据文件",
    },
    {
      item: "印刷安全区",
      content: "外盒与内托区域安全边距",
      status: "Need Review",
      note: "需平台输出最终印刷规范",
    },
    {
      item: "版本信息",
      content: "Packaging Review Page V1.2",
      status: "Confirmed",
      note: "当前为审核草稿",
    },
  ] satisfies ChecklistItem[],
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
