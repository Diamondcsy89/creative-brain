const productEntries = [
  {
    eyebrow: "AI Design",
    title: "Design intelligence for product teams",
    description:
      "Shape visual systems, prompts, interface directions, and product narratives with an AI-native creative workflow.",
  },
  {
    eyebrow: "App Motion",
    title: "Interaction studies that feel native",
    description:
      "Explore refined mobile micro-interactions, tactile button states, transitions, and motion behaviors for real apps.",
  },
  {
    eyebrow: "Creative Engineering",
    title: "Prototype ideas at product speed",
    description:
      "Move from concept to polished Next.js experiences with reusable components, clear systems, and production-minded craft.",
  },
];

const labEntries = [
  "Prompt systems for commercial product imagery",
  "Premium app interaction patterns",
  "AI-assisted brand and launch prototypes",
  "Reusable creative engineering playbooks",
];

function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-10">
      <a href="#" className="flex items-center gap-3" aria-label="Csyformiq home">
        <span className="grid size-8 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-[11px] font-semibold text-white">
          Cf
        </span>
        <span className="text-sm font-medium tracking-wide text-white/88">Csyformiq</span>
      </a>
      <nav className="hidden items-center gap-7 text-sm text-white/48 sm:flex">
        <a className="transition hover:text-white" href="#products">
          Products
        </a>
        <a className="transition hover:text-white" href="#motion">
          Motion
        </a>
        <a className="transition hover:text-white" href="#brain">
          Brain
        </a>
        <a className="transition hover:text-white" href="#lab">
          Lab
        </a>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.08fr_0.92fr] lg:px-10">
      <div className="max-w-4xl">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/42">
          AI Design / App Motion / Creative Engineering
        </p>
        <h1 className="mt-7 max-w-5xl text-5xl font-semibold leading-[0.96] tracking-[-0.04em] text-white sm:text-7xl lg:text-8xl">
          Future product craft for AI-native teams.
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-white/58 sm:text-lg">
          Csyformiq designs and prototypes future-facing digital products, motion systems, and creative tools with the precision of software and the taste of a design studio.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#products"
            className="inline-flex h-12 items-center justify-center rounded-full bg-white px-5 text-sm font-medium text-black transition hover:bg-white/88"
          >
            Explore systems
          </a>
          <a
            href="#brain"
            className="inline-flex h-12 items-center justify-center rounded-full border border-white/12 px-5 text-sm font-medium text-white/80 transition hover:border-white/24 hover:bg-white/[0.04] hover:text-white"
          >
            Open Creative Brain
          </a>
        </div>
      </div>

      <div className="relative min-h-[420px] overflow-hidden rounded-[32px] border border-white/[0.08] bg-[#111111] p-5 shadow-[0_40px_120px_rgba(0,0,0,0.45)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.1),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.06),transparent_32%)]" />
        <div className="relative flex h-full flex-col justify-between rounded-[24px] border border-white/[0.08] bg-black/30 p-5">
          <div className="flex items-center justify-between text-xs text-white/38">
            <span>Prototype OS</span>
            <span>v2.0</span>
          </div>
          <div className="space-y-3">
            {["Vision", "Motion", "Interface", "Launch"].map((item, index) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-white/[0.045] px-4 py-3"
              >
                <span className="text-sm text-white/72">{item}</span>
                <span className="text-xs text-white/34">0{index + 1}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="h-24 rounded-2xl bg-white/[0.08]" />
            <div className="h-24 rounded-2xl bg-[#e7ded1]" />
            <div className="h-24 rounded-2xl bg-white/[0.05]" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductEntryGrid() {
  return (
    <section id="products" className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/34">Product entries</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
            One company, four creative engines.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-white/44">
          Built for founders, designers, and product teams who need taste, speed, and technical execution in one loop.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {productEntries.map((entry) => (
          <article
            key={entry.title}
            className="min-h-64 rounded-[28px] border border-white/[0.08] bg-white/[0.045] p-6 transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.065]"
          >
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/36">{entry.eyebrow}</p>
            <h3 className="mt-8 max-w-sm text-2xl font-semibold tracking-[-0.025em] text-white">{entry.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/50">{entry.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeatureEntrances() {
  return (
    <section className="mx-auto grid w-full max-w-7xl gap-4 px-5 py-10 sm:px-8 lg:grid-cols-3 lg:px-10">
      <a
        id="motion"
        href="/"
        className="group min-h-80 rounded-[30px] border border-white/[0.08] bg-[#f0ebe2] p-6 text-black transition duration-300 hover:scale-[1.01]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/45">Motion Library</p>
        <h3 className="mt-24 text-3xl font-semibold tracking-[-0.035em]">Buttons, transitions, and app-native interaction studies.</h3>
        <p className="mt-5 text-sm leading-6 text-black/58">A growing library of refined motion patterns for mobile products and AI interfaces.</p>
      </a>

      <a
        id="brain"
        href="/"
        className="group min-h-80 rounded-[30px] border border-white/[0.08] bg-white/[0.045] p-6 transition duration-300 hover:border-white/[0.14] hover:bg-white/[0.065]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/36">Creative Brain</p>
        <h3 className="mt-24 text-3xl font-semibold tracking-[-0.035em] text-white">
          A living archive for design references, prompts, systems, and project memory.
        </h3>
        <p className="mt-5 text-sm leading-6 text-white/48">Structured knowledge for repeatable creative engineering work.</p>
      </a>

      <a
        id="lab"
        href="/"
        className="group min-h-80 rounded-[30px] border border-white/[0.08] bg-[#121212] p-6 transition duration-300 hover:border-white/[0.14] hover:bg-[#151515]"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/36">Lab / Experiments</p>
        <h3 className="mt-24 text-3xl font-semibold tracking-[-0.035em] text-white">
          Small prototypes that test new product behaviors before they become systems.
        </h3>
        <ul className="mt-5 space-y-2 text-sm text-white/46">
          {labEntries.map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </a>
    </section>
  );
}

function BrandIntro() {
  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10">
      <div className="border-y border-white/[0.08] py-12 sm:py-16">
        <p className="max-w-4xl text-2xl font-medium leading-snug tracking-[-0.03em] text-white sm:text-4xl">
          Csyformiq operates between design studio and product lab, turning AI-era ideas into interfaces, motion systems, and prototypes that are calm enough to ship and sharp enough to remember.
        </p>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 pb-8 pt-2 text-sm text-white/36 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
      <span>Csyformiq</span>
      <span>AI design, motion systems, and product prototypes.</span>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070707] text-white">
      <SiteHeader />
      <HeroSection />
      <ProductEntryGrid />
      <FeatureEntrances />
      <BrandIntro />
      <SiteFooter />
    </main>
  );
}
