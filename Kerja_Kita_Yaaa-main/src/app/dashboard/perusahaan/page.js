import CompanyDashboard from "./DashboardClient";
import { requireRole } from "../../../lib/session";

export default async function CompanyDashboardPage() {
  const user = await requireRole("company");
  return <CompanyDashboard user={user} />;
}
