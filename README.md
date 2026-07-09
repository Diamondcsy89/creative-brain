# Creative Brain

这是我的 Creative Brain，用于长期沉淀设计参考、Prompt、组件、动效、项目经验，以及可运行的创意工程原型。

Creative Brain 2.0 已升级为 monorepo：知识库、可运行应用、可复用包和实验区分层管理。

## Structure

```txt
Creative-Brain/
├── apps/
│   └── button-library/
├── packages/
│   ├── motion/
│   └── ui/
├── knowledge/
│   ├── 00_Inbox/
│   ├── 01_Assets/
│   ├── 02_Brands/
│   ├── 03_Projects/
│   ├── 04_Research/
│   └── 06_AI/
├── 05_Playground/
├── AGENTS.md
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

## Areas

- `apps/`：可运行的 Next.js / React 产品原型和展示应用
- `apps/button-library/`：App 动效按钮库，包含 10 个高级按钮微交互
- `packages/ui/`：预留给可复用 UI 组件
- `packages/motion/`：预留给可复用 Motion 动效 primitives
- `knowledge/`：长期知识库，沉淀设计参考、Prompt、品牌分析、研究和项目经验
- `05_Playground/`：临时实验区，用于未沉淀为正式 app/package 的创意试验

## Commands

```bash
pnpm install
pnpm --filter button-library dev
pnpm --filter button-library typecheck
pnpm --filter button-library build
```

## Knowledge Rule

新增素材时，请优先补充对应的 `.md` 说明文件，让每一份灵感都能被再次找到、理解和复用。

每个素材说明文件应包含：

- 用途
- 关键词
- 风格
- Prompt
- 适用场景
- 可复用方式
