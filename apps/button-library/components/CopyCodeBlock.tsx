"use client";

import { useState } from "react";

type CopyCodeBlockProps = {
  code: string;
};

export function CopyCodeBlock({ code }: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/28">
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
        <span className="text-xs text-white/34">tsx</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-full border border-white/[0.08] px-3 py-1.5 text-xs font-medium text-white/56 transition hover:border-white/[0.18] hover:text-white"
        >
          {copied ? "Copied" : "Copy Code"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-6 text-white/56">
        <code>{code}</code>
      </pre>
    </div>
  );
}
