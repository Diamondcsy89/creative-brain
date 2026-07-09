import { ButtonGrid } from "@/components/ButtonGrid";

export default function Home() {
  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <header className="relative overflow-hidden rounded-[32px] border border-white/[0.08] bg-white/[0.045] px-5 py-7 shadow-soft-button backdrop-blur-xl sm:px-8 sm:py-10 lg:px-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/42">Creative Brain / App Motion</p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] text-white sm:text-5xl lg:text-6xl">
              App 动效按钮库
            </h1>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/58 sm:text-base">
              10 个适合移动 App 和高端产品界面的按钮微交互。动效保持克制、物理、清晰，适合沉淀进设计系统或作为真实产品组件的起点。
            </p>
          </div>
          <div className="mt-8 grid gap-3 text-xs text-white/45 sm:grid-cols-4">
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-2">React</span>
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-2">TypeScript</span>
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-2">Tailwind CSS</span>
            <span className="rounded-full border border-white/[0.08] bg-black/20 px-3 py-2">Motion</span>
          </div>
        </header>

        <ButtonGrid />
      </div>
    </main>
  );
}
