import { submissions } from "./submissions";

export type {
  InnerPackage,
  PackageDimension,
  PackagingSubmission,
  ReviewStatus,
} from "./submissions";
export { getSubmissionBySlug, submissions } from "./submissions";
export const packaging = submissions[0];
