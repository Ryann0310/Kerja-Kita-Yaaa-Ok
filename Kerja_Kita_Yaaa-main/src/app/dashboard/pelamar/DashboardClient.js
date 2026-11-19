"use client";

import { useEffect, useState } from "react";
import DashboardShell from "../../../components/DashboardShell";
import Icon from "../../../components/Icon";
import { applicantApplications as initialApplications } from "../../../lib/demo-data";

const steps = ["Dikirim", "Diproses", "Wawancara", "Diterima"];

export default function ApplicantDashboard({ user }) {
  const [active, setActive] = useState("Status Seleksi");
  const [applications, setApplications] = useState(initialApplications);
  const [profileName, setProfileName] = useState(user.name);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const savedApps = JSON.parse(localStorage.getItem("kerjakita-applications") || "[]");
        if (savedApps.length) setApplications((current) => [...current, ...savedApps]);
      } catch { /* gunakan data contoh */ }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const activeStep = (status) => Math.max(0, steps.indexOf(status));
  const menu = [
    { label: "Profil", icon: "user", onClick: () => setActive("Profil") },
    { label: "CV", icon: "file", onClick: () => setActive("CV") },
    { label: "Lamaran", icon: "list", onClick: () => setActive("Lamaran") },
    { label: "Status Seleksi", icon: "list", onClick: () => setActive("Status Seleksi") },
  ];

  return (
    <DashboardShell role="Pelamar" name={profileName} headerName={user.name} active={active} items={menu}>
      {active === "Status Seleksi" && <>
        <div className="dashboard-title-row"><div><h1>Status Seleksi</h1><p>Pantau perkembangan lamaran pekerjaan Anda.</p></div></div>
        <div className="selection-list">
          {applications.map((application, index) => {
            const status = steps.includes(application.status) ? application.status : "Dikirim";
            const step = activeStep(status);
            return <article className="selection-card" key={`${application.id}-${index}`}><div className="selection-card-head"><div><h2>{application.title}</h2><p>{application.company} · {application.updated || "diperbarui baru saja"}</p></div><span className={`status-pill ${status === "Diterima" ? "success" : "neutral"}`}>{status}</span></div><div className="progress-steps">{steps.map((label, i) => <div className={`progress-step ${i <= step ? "done" : ""}`} key={label}><div className="progress-line"/><span>{label}</span></div>)}</div></article>;
          })}
        </div>
      </>}
      {active === "Profil" && <div className="panel-card profile-form"><h1>Profil Saya</h1><p className="panel-subtitle">Lengkapi informasi diri untuk membantu perusahaan mengenal Anda.</p><label>Nama lengkap<input value={profileName} onChange={(e) => setProfileName(e.target.value)} /></label><label>Email<input defaultValue={user.email} readOnly /></label><label>Nomor telepon<input defaultValue="0812-3456-7890" /></label><label>Tentang saya<textarea defaultValue="Saya tertarik mengembangkan karier di bidang teknologi." /></label><button className="button button-primary" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2500); }}>Simpan perubahan</button>{saved && <span className="inline-success"><Icon name="check" size={15}/> Profil berhasil disimpan (demo).</span>}</div>}
      {active === "CV" && <div className="panel-card"><h1>CV Saya</h1><p className="panel-subtitle">Kelola CV PDF atau gunakan data profil sebagai CV Form.</p><div className="cv-upload-box"><Icon name="file" size={30}/><strong>CV {user.name}.pdf</strong><span>CV tersimpan untuk kebutuhan lamaran (data demo)</span><label className="button button-outline">Unggah CV PDF<input type="file" accept="application/pdf" hidden onChange={(e) => setSaved(Boolean(e.target.files?.[0]))}/></label>{saved && <small className="inline-success">File dipilih. Simpanan demo diperbarui.</small>}</div></div>}
      {active === "Lamaran" && <div className="panel-card"><h1>Lamaran Saya</h1><p className="panel-subtitle">Daftar pekerjaan yang sudah Anda lamar.</p><div className="simple-table"><div className="simple-table-head"><span>Posisi</span><span>Perusahaan</span><span>Status</span></div>{applications.map((app, index) => <div className="simple-table-row" key={`${app.id}-${index}`}><strong>{app.title}</strong><span>{app.company}</span><span className="status-text">{app.status}</span></div>)}</div></div>}
    </DashboardShell>
  );
}
