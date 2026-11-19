import ApplicantDashboard from "./DashboardClient";
import { requireRole } from "../../../lib/session";

export default async function ApplicantDashboardPage() {
  const user = await requireRole("applicant");
  return <ApplicantDashboard user={user} />;
}
