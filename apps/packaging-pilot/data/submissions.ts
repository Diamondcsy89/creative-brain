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

export type ReviewStatus = "Confirmed" | "Pending" | "Need Review";

export type PackagingSubmission = {
  slug: string;
  productName: string;
  subtitle: string;
  version: string;
  documentTitle: string;
  projectType: string;
  reviewPurpose: string;
  pageStatus: string;
  reviewStatus: ReviewStatus;
  heroStatus: string;
  outerBoxSize: string;
  nextAction: string;
  submissionNote: string;
  heroOverviewNote: string;
  sectionNotes: {
    outerPackage: string;
    dimensions: string;
    dimensionSchematic: string;
    innerTray: string;
    materials: string;
    thicknessSchematic: string;
  };
  assets: {
    heroOverview: string;
    outerCover: string;
    outerSide: string;
    innerTrayLayout: string;
    reviewReference: string;
    eyeMask: string;
    neckPillow: string;
    xiaomiTag: string;
  };
  outerDimensions: PackageDimension[];
  innerItems: InnerPackage[];
  safetyZone: {
    label: string;
    marginCm: number;
    note: string;
    status: ReviewStatus;
  };
  innerTray: {
    title: string;
    image: string;
    hasImage: boolean;
    placeholder: string;
    note: string;
  };
  reviewNotes: Array<{
    label: string;
    value: string;
  }>;
};

const miGiftBoxAssetBase = "/packaging/mi-gift-box";

export const submissions = [
  {
    slug: "mi-gift-box",
    productName: "小米商城会员限定随行礼盒",
    subtitle: "平台审核包装设计与产品包装展示",
    version: "V1.6",
    documentTitle: "Packaging Review Page",
    projectType: "Packaging Review",
    reviewPurpose: "Platform Packaging Review",
    pageStatus: "Draft for Review",
    reviewStatus: "Pending",
    heroStatus: "Pending Review",
    outerBoxSize: "30cm × 30cm × 8cm",
    nextAction: "等待平台审核反馈",
    submissionNote: "用于小米商城会员限定随行礼盒包装提交审核，包含外盒正侧面、内托布局与内部物料尺寸。",
    heroOverviewNote: "效果示意图：用于说明礼盒开启后的内部摆放方式，不作为尺寸审核依据。",
    sectionNotes: {
      outerPackage: "用于确认外包装正面与侧面视觉、文案和最终提交版本。",
      dimensions: "用于确认外盒与内部小包装尺寸关系。",
      dimensionSchematic: "本区域为尺寸比例示意，标注线对应规格矩形，不对应图片裁切边界。",
      innerTray: "用于确认礼盒打开后的内部摆放结构。",
      materials: "用于确认随行礼盒内三件物料包装图与尺寸。",
      thicknessSchematic: "厚度示意为规格关系图，不代表真实侧面包装渲染。",
    },
    assets: {
      heroOverview: `${miGiftBoxAssetBase}/hero-overview.jpg`,
      outerCover: `${miGiftBoxAssetBase}/outer-cover.jpg`,
      outerSide: `${miGiftBoxAssetBase}/outer-side.jpg`,
      innerTrayLayout: `${miGiftBoxAssetBase}/inner-tray-layout.jpg`,
      reviewReference: `${miGiftBoxAssetBase}/review-reference.jpg`,
      eyeMask: `${miGiftBoxAssetBase}/inner-eye-mask.jpg`,
      neckPillow: `${miGiftBoxAssetBase}/inner-neck-pillow.jpg`,
      xiaomiTag: `${miGiftBoxAssetBase}/inner-xiaomi-tag.jpg`,
    },
    outerDimensions: [
      {
        id: "outer-front",
        name: "外盒正面",
        widthCm: 30,
        heightCm: 30,
        image: `${miGiftBoxAssetBase}/outer-cover.jpg`,
        fileName: "outer-cover.jpg",
        note: "主包装盒正面审核图",
        usage: "外盒正面封面展示",
        status: "Confirmed",
        version: "V1.6",
      },
      {
        id: "outer-side",
        name: "外盒侧面",
        widthCm: 30,
        heightCm: 8,
        image: `${miGiftBoxAssetBase}/outer-side.jpg`,
        fileName: "outer-side.jpg",
        note: "主包装盒真实侧面图",
        usage: "外盒侧面结构展示",
        status: "Confirmed",
        version: "V1.6",
      },
    ],
    innerItems: [
      {
        id: "inner-eye-mask",
        name: "挂耳式睡眠眼罩",
        marker: "A",
        widthCm: 24.2,
        heightCm: 15,
        depthCm: 2,
        image: `${miGiftBoxAssetBase}/inner-eye-mask.jpg`,
        fileName: "inner-eye-mask.jpg",
        position: "左侧长盒",
        note: "扁平长盒，置于内托左侧主分区",
        usage: "内部物料包装审核",
        status: "Confirmed",
        version: "V1.6",
      },
      {
        id: "inner-neck-pillow",
        name: "口袋充气U型枕",
        marker: "B",
        widthCm: 15,
        heightCm: 7.5,
        depthCm: 6,
        image: `${miGiftBoxAssetBase}/inner-neck-pillow.jpg`,
        fileName: "inner-neck-pillow.jpg",
        position: "中部厚盒",
        note: "厚度最高，置于内托中部承重分区",
        usage: "内部物料包装审核",
        status: "Confirmed",
        version: "V1.6",
      },
      {
        id: "inner-xiaomi-tag",
        name: "Xiaomi Tag",
        marker: "C",
        widthCm: 7.5,
        heightCm: 7.5,
        depthCm: 2,
        image: `${miGiftBoxAssetBase}/inner-xiaomi-tag.jpg`,
        fileName: "inner-xiaomi-tag.jpg",
        position: "右侧小盒",
        note: "小方盒，置于右侧配件分区",
        usage: "内部物料包装审核",
        status: "Confirmed",
        version: "V1.6",
      },
    ],
    safetyZone: {
      label: "内托安全区",
      marginCm: 1.2,
      note: "四周预留包装取放和印刷审核边距",
      status: "Need Review",
    },
    innerTray: {
      title: "内托平面布局图",
      image: `${miGiftBoxAssetBase}/inner-tray-layout.jpg`,
      hasImage: true,
      placeholder: "待补充内托平面布局图",
      note: "真实内托平面布局图，用于展示盒子打开后的内部排列关系。",
    },
    reviewNotes: [
      {
        label: "当前版本",
        value: "V1.6",
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
  },
] satisfies PackagingSubmission[];

export function getSubmissionBySlug(slug: string) {
  return submissions.find((submission) => submission.slug === slug);
}

