import Link from "next/link";
import Header from "./Header";
import Icon from "./Icon";

export default function DashboardShell({ role, name, headerName = name, active, items, children }) {
  const href = role === "Pelamar" ? "/dashboard/pelamar" : role === "Perusahaan" ? "/dashboard/perusahaan" : "/dashboard/admin";
  return (
    <div className="dashboard-page">
      <Header userName={headerName} roleLabel={role} dashboardHref={href} />
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <div className="sidebar-identity">
            <span>{role === "Admin" ? "PANEL ADMIN" : `DASHBOARD ${role.toUpperCase()}`}</span>
            <strong>{name}</strong>
          </div>
          <nav className="sidebar-menu">
            {items.map((item) => (
              item.onClick ? (
                <button type="button" onClick={item.onClick} key={item.label} className={`sidebar-link ${active === item.label ? "active" : ""}`}>
                  <Icon name={item.icon} size={17} />
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link href={`${href}${item.query || ""}`} key={item.label} className={`sidebar-link ${active === item.label ? "active" : ""}`}>
                  <Icon name={item.icon} size={17} />
                  <span>{item.label}</span>
                </Link>
              )
            ))}
          </nav>

        </aside>
        <main className="dashboard-content">{children}</main>
      </div>
    </div>
  );
}
