import AdminDashboard from "./DashboardClient";
import { requireRole } from "../../../lib/session";
export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const user = await requireRole("admin");
  return <AdminDashboard user={user} />;
}
