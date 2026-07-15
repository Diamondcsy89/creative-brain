import { notFound } from "next/navigation";
import { SubmissionDetail } from "@/components/SubmissionDetail";
import { getSubmissionBySlug, submissions } from "@/data/submissions";

export function generateStaticParams() {
  return submissions.map((submission) => ({
    slug: submission.slug,
  }));
}

export default async function PackagingSubmissionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const submission = getSubmissionBySlug(slug);

  if (!submission) {
    notFound();
  }

  return <SubmissionDetail submission={submission} />;
}
