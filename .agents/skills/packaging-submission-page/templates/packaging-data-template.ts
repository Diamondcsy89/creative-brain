export type ReviewStatus = "Confirmed" | "Pending" | "Need Review";

export type PackageDimension = {
  id: string;
  name: string;
  marker?: string;
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

const assetBase = "/packaging/<project-slug>";

export const packaging = {
  productName: "<产品名称>",
  subtitle: "平台审核包装设计与产品包装展示",
  version: "V1.0",
  documentTitle: "Packaging Review Page",
  projectType: "Packaging Review",
  reviewPurpose: "Platform Packaging Review",
  pageStatus: "Draft for Review",
  reviewStatus: "Pending" as ReviewStatus,
  heroStatus: "Pending Review",
  outerBoxSize: "<width>cm × <height>cm × <depth>cm",
  nextAction: "根据审核反馈调整最终包装稿",
  submissionNote: "用于包装提交审核，包含外盒正侧面、内托布局与内部物料尺寸。",
  heroOverviewNote: "效果示意图：用于说明礼盒开启后的内部摆放方式，不作为尺寸审核依据。",
  sectionNotes: {
    outerPackage: "用于确认外包装正面与侧面视觉、文案和最终提交版本。",
    dimensions: "用于确认外盒与内部小包装尺寸关系。",
    dimensionSchematic: "本区域为尺寸比例示意，标注线对应规格矩形，不对应图片裁切边界。",
    innerTray: "用于确认礼盒打开后的内部摆放结构。",
    materials: "用于确认礼盒内物料包装图与尺寸。",
    thicknessSchematic: "厚度示意为规格关系图，不代表真实侧面包装渲染。",
  },
  assets: {
    heroOverview: `${assetBase}/hero-overview.jpg`,
    outerCover: `${assetBase}/outer-cover.jpg`,
    outerSide: `${assetBase}/outer-side.jpg`,
    innerTrayLayout: `${assetBase}/inner-tray-layout.jpg`,
  },
  outerDimensions: [
    {
      id: "outer-front",
      name: "外盒正面",
      widthCm: 30,
      heightCm: 30,
      image: `${assetBase}/outer-cover.jpg`,
      fileName: "outer-cover.jpg",
      note: "主包装盒正面提交图",
      usage: "外盒正面封面展示",
      status: "Confirmed",
      version: "V1.0",
    },
    {
      id: "outer-side",
      name: "外盒侧面",
      widthCm: 30,
      heightCm: 8,
      image: `${assetBase}/outer-side.jpg`,
      fileName: "outer-side.jpg",
      note: "主包装盒侧面提交图",
      usage: "外盒侧面结构展示",
      status: "Confirmed",
      version: "V1.0",
    },
  ] satisfies PackageDimension[],
  innerItems: [
    {
      id: "inner-item-a",
      name: "<内部物料 A>",
      marker: "A",
      widthCm: 24.2,
      heightCm: 15,
      depthCm: 2,
      image: `${assetBase}/inner-item-a.jpg`,
      fileName: "inner-item-a.jpg",
      position: "左侧长盒",
      note: "内部物料 A 包装图",
      usage: "内部物料包装审核",
      status: "Confirmed",
      version: "V1.0",
    },
  ] satisfies InnerPackage[],
  innerTray: {
    title: "内托平面布局图",
    image: `${assetBase}/inner-tray-layout.jpg`,
    hasImage: true,
    placeholder: "待补充内托平面布局图",
    note: "真实内托平面布局图，用于展示盒子打开后的内部排列关系。",
  },
  reviewNotes: [
    {
      label: "当前版本",
      value: "V1.0",
    },
    {
      label: "提交用途",
      value: "Platform Packaging Review",
    },
    {
      label: "提交内容",
      value: "外盒正面、外盒侧面、内托布局、内部物料",
    },
    {
      label: "待确认项",
      value: "平台审核反馈",
    },
    {
      label: "下一步动作",
      value: "根据审核反馈调整最终包装稿",
    },
  ],
};
