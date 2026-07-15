import Link from "next/link";
import { submissions, type ReviewStatus } from "@/data/submissions";

const statusClassName: Record<ReviewStatus, string> = {
  Confirmed: "border-[#9BC6A6] bg-[#F4FAF5] text-[#207A3E]",
  Pending: "border-[#F2B56B] bg-[#FFF8EF] text-[#9A5200]",
  "Need Review": "border-[#FF6900] bg-[#FFF3EA] text-[#B84900]",
};

function StatusBadge({ status, label }: { status: ReviewStatus; label?: string }) {
  return <span className={`rounded-[4px] border px-2 py-1 text-xs font-semibold ${statusClassName[status]}`}>{label ?? status}</span>;
}

export default function PackagingSubmissionsIndexPage() {
  return (
    <main className="min-h-screen bg-[#F7F7F5] px-6 py-6 text-[#111111] lg:px-10">
      <div className="mx-auto max-w-[1200px]">
        <header className="mb-5 border border-[#CFCFCF] bg-white px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6900]">Submission Index</p>
          <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.035em]">Packaging Submission</h1>
              <p className="mt-3 text-sm leading-6 text-[#666666]">用于管理包装提交审核页面</p>
            </div>
            <p className="text-sm font-semibold text-[#666666]">{submissions.length} submission</p>
          </div>
        </header>

        <section className="border border-[#CFCFCF] bg-white">
          <div className="grid border-b border-[#D8D8D8] bg-[#F7F7F5] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#666666] md:grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_160px]">
            <span>Project</span>
            <span className="hidden md:block">Version</span>
            <span className="hidden md:block">Status</span>
            <span className="hidden md:block">Outer Size</span>
            <span className="hidden md:block">Action</span>
          </div>

          <div className="divide-y divide-[#D8D8D8]">
            {submissions.map((submission) => (
              <article key={submission.slug} className="grid gap-4 px-4 py-5 md:grid-cols-[1.4fr_0.7fr_0.8fr_0.9fr_160px] md:items-center">
                <div>
                  <h2 className="text-lg font-semibold text-[#111111]">{submission.productName}</h2>
                  <p className="mt-1 text-sm text-[#666666]">slug: {submission.slug}</p>
                </div>
                <p className="text-sm font-semibold text-[#111111]">{submission.version}</p>
                <StatusBadge status={submission.reviewStatus} label={submission.heroStatus} />
                <p className="text-sm font-semibold text-[#111111]">{submission.outerBoxSize}</p>
                <Link
                  href={`/submissions/${submission.slug}`}
                  className="inline-flex h-10 items-center justify-center rounded-[4px] border border-[#111111] px-4 text-sm font-semibold text-[#111111] transition-colors hover:bg-[#111111] hover:text-white"
                >
                  View Submission
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
