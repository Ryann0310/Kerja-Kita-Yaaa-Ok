"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardShell from "../../../components/DashboardShell";
import Icon from "../../../components/Icon";
import { applicants as initialApplicants, jobs } from "../../../lib/demo-data";

const statusOptions = ["Dikirim", "Diproses", "Wawancara", "Diterima", "Ditolak"];

export default function CompanyDashboard({ user }) {
  const [active, setActive] = useState("Pelamar");
  const [selectedJob, setSelectedJob] = useState("Semua lowongan");
  const [rows, setRows] = useState(initialApplicants);
  const [toast, setToast] = useState("");
  const [cvViewer, setCvViewer] = useState(null);

  const menu = [
    { label: "Profil Perusahaan", icon: "building", onClick: () => setActive("Profil Perusahaan") },
    { label: "Lowongan", icon: "briefcase", onClick: () => setActive("Lowongan") },
    { label: "Pelamar", icon: "user", onClick: () => setActive("Pelamar") },
    { label: "Status Seleksi", icon: "list", onClick: () => setActive("Status Seleksi") },
  ];
  const visibleRows = rows.filter((row) => selectedJob === "Semua lowongan" || row.title === selectedJob);
  const updateStatus = (id, status) => {
    setRows((current) => current.map((row) => row.id === id ? { ...row, status } : row));
    const applicant = rows.find((row) => row.id === id);
    setToast(`Status ${applicant?.name || "pelamar"} — ${status}`);
    window.setTimeout(() => setToast(""), 2800);
  };

  return (
    <DashboardShell role="Perusahaan" name={user.name} headerName={user.name} active={active} items={menu}>
      {active === "Pelamar" && <>
        <div className="dashboard-title-row"><div><h1>Pelamar</h1><p>Kelola kandidat yang melamar lowongan perusahaan Anda.</p></div></div>
        <div className="toolbar-row"><div className="select-wrap compact"><select value={selectedJob} onChange={(e) => setSelectedJob(e.target.value)}><option>Semua lowongan</option>{[...new Set(rows.map((row) => row.title))].map((title) => <option key={title}>{title}</option>)}</select><Icon name="chevron" size={15}/></div><span className="muted-count">{visibleRows.length} pelamar</span></div>
        <div className="applicant-table-wrap"><table className="applicant-table"><thead><tr><th>Pelamar</th><th>Posisi</th><th>Tanggal</th><th>CV</th><th>Status Seleksi</th></tr></thead><tbody>{visibleRows.map((row) => <tr key={row.id}><td><strong>{row.name}</strong><small>{row.email}</small></td><td>{row.title}</td><td>{row.date}</td><td><button className="button button-outline button-xs" onClick={() => setCvViewer(row)}><Icon name="file" size={14}/> Lihat CV</button></td><td><div className="select-wrap table-select"><select value={row.status} onChange={(e) => updateStatus(row.id, e.target.value)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select><Icon name="chevron" size={14}/></div></td></tr>)}</tbody></table></div>
      </>}
      {active === "Profil Perusahaan" && <div className="panel-card profile-form"><h1>Profil Perusahaan</h1><p className="panel-subtitle">Kelola informasi yang ditampilkan kepada pencari kerja.</p><label>Nama perusahaan<input defaultValue="Nusantara Tech"/></label><label>Bidang industri<input defaultValue="Teknologi Informasi"/></label><label>Lokasi<input defaultValue="Jakarta, Indonesia"/></label><label>Deskripsi<textarea defaultValue="Nusantara Tech adalah perusahaan teknologi yang mengembangkan solusi digital untuk bisnis di Indonesia."/></label><button className="button button-primary" onClick={() => {setToast("Profil perusahaan berhasil disimpan (demo)"); window.setTimeout(() => setToast(""), 2500);}}>Simpan perubahan</button></div>}
      {active === "Lowongan" && <><div className="dashboard-title-row"><div><h1>Lowongan</h1><p>Daftar lowongan yang dikelola Nusantara Tech.</p></div><button className="button button-primary" onClick={() => setToast("Form tambah lowongan demo dibuka") }><Icon name="plus" size={16}/> Tambah Lowongan</button></div><div className="company-job-list">{jobs.filter((job) => job.company === "Nusantara Tech").map((job) => <div className="company-job-card" key={job.id}><div><strong>{job.title}</strong><span>{job.location} · {job.salary}</span></div><span className="status-pill success">Aktif</span><Link className="button button-outline button-small" href={`/lowongan/${job.id}`}>Lihat</Link></div>)}</div></>}
      {active === "Status Seleksi" && <><div className="dashboard-title-row"><div><h1>Status Seleksi</h1><p>Ringkasan tahapan seleksi kandidat.</p></div></div><div className="status-summary-grid">{statusOptions.slice(0,4).map((status) => <div className="summary-card" key={status}><span>{status}</span><strong>{rows.filter((row) => row.status === status).length}</strong></div>)}</div><div className="applicant-table-wrap"><table className="applicant-table"><thead><tr><th>Pelamar</th><th>Posisi</th><th>Status</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id}><td><strong>{row.name}</strong><small>{row.email}</small></td><td>{row.title}</td><td>{row.status}</td></tr>)}</tbody></table></div></>}
      {toast && <div className="toast"><Icon name="check" size={17}/>{toast}</div>}
      {cvViewer && <div className="modal-backdrop" onClick={() => setCvViewer(null)}><div className="cv-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setCvViewer(null)}><Icon name="close"/></button><div className="cv-modal-icon"><Icon name="file" size={28}/></div><h2>CV {cvViewer.name}</h2><p>{cvViewer.email}</p><div className="cv-placeholder"><strong>Curriculum Vitae</strong><span>{cvViewer.name}</span><span>Pengalaman dan riwayat pendidikan kandidat</span><small>Pratinjau CV contoh untuk demonstrasi antarmuka.</small></div><button className="button button-primary modal-full" onClick={() => setCvViewer(null)}>Tutup</button></div></div>}
    </DashboardShell>
  );
}
