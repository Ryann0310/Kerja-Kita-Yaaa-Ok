"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import LogoutButton from "./LogoutButton";
import Image from "next/image";

const dashboardForRole = {
  applicant: "/dashboard/pelamar",
  company: "/dashboard/perusahaan",
  admin: "/dashboard/admin",
};
const labelForRole = { applicant: "Pelamar", company: "Perusahaan", admin: "Admin" };

export default function Header({ userName, roleLabel, dashboardHref }) {
  const [sessionUser, setSessionUser] = useState(null);

  useEffect(() => {
    if (userName) return;
    let active = true;
    fetch("/api/auth/me")
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (active && result?.user) setSessionUser(result.user);
      })
      .catch(() => {});
    return () => { active = false; };
  }, [userName]);

  const currentName = userName || sessionUser?.name;
  const currentRole = roleLabel || labelForRole[sessionUser?.role];
  const currentDashboard = dashboardHref || dashboardForRole[sessionUser?.role] || "/dashboard/pelamar";

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand" aria-label="KerjaKita beranda">
  <Image
    src="/logokk.jpeg"
    alt="Logo KerjaKita"
    width={180}
    height={48}
    priority
    style={{ height: "65px", width: "auto" }}
  />
</Link>
        <nav className="main-nav">
          <Link href="/#lowongan">Cari Lowongan</Link>
          <Link href="/perusahaan">Perusahaan</Link>
        </nav>
        <div className="header-actions">
          {currentName ? (
            <>
              <div className="header-user"><strong>{currentName}</strong><span>{currentRole}</span></div>
              <Link className="button button-primary button-small" href={currentDashboard}><Icon name="grid" size={15} /> Dashboard</Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link href="/login" className="header-login">Masuk</Link>
              <Link href="/daftar" className="button button-primary button-small">Daftar</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
