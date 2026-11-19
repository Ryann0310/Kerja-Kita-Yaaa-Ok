"use client";

import { useState } from "react";
import DashboardShell from "../../../components/DashboardShell";
import Icon from "../../../components/Icon";
import { moderationJobs as initialJobs } from "../../../lib/demo-data";



export default function AdminDashboard({ user }) {
  const [active, setActive] = useState("Moderasi Lowongan");
  const [filter, setFilter] = useState("Menunggu");
  const [records, setRecords] = useState(initialJobs);
  const [toast, setToast] = useState("");

  const menu = [
    { label: "Ringkasan", icon: "gauge", onClick: () => setActive("Ringkasan") },
    { label: "Moderasi Lowongan", icon: "shield", onClick: () => setActive("Moderasi Lowongan") },
    { label: "Pengguna", icon: "user", onClick: () => setActive("Pengguna") },
    { label: "Kategori", icon: "list", onClick: () => setActive("Kategori") },
    { label: "Perusahaan", icon: "building", onClick: () => setActive("Perusahaan") },
  ];
  const setStatus = (id, status) => {
    const title = records.find((job) => job.id === id)?.title;
    setRecords((current) => status === "Dihapus" ? current.filter((job) => job.id !== id) : current.map((job) => job.id === id ? { ...job, status } : job));
    setToast(status === "Dihapus" ? `Lowongan “${title}” dihapus` : `“${title}” ${status.toLowerCase()}`);
    window.setTimeout(() => setToast(""), 2800);
  };
  const shown = records.filter((job) => filter === "Semua" || job.status === filter);

  return (
    <DashboardShell role="Admin" name={user.name} headerName={user.name} active={active} items={menu}>
      {active === "Moderasi Lowongan" && <>
        <div className="dashboard-title-row"><div><h1>Moderasi Lowongan</h1><p>Tinjau dan kelola lowongan yang dikirim perusahaan.</p></div></div>
        <div className="moderation-tabs">{["Menunggu", "Disetujui", "Ditolak", "Semua"].map((tab) => <button key={tab} className={filter === tab ? "active" : ""} onClick={() => setFilter(tab)}>{tab}</button>)}</div>
        <div className="moderation-list">{shown.map((job) => <article className="moderation-card" key={job.id}><div className="moderation-info"><div className="moderation-heading"><h2>{job.title}</h2><span className={`status-pill ${job.status === "Disetujui" ? "success" : job.status === "Ditolak" ? "danger" : "warning"}`}>{job.status === "Menunggu" ? "Menunggu Moderasi" : job.status}</span></div><p>{job.company} · {job.category} · {job.location} · {job.salary}</p><small>Diajukan {job.date}</small><details><summary>Lihat detail</summary><p>Lowongan ini diajukan oleh {job.company}. Admin dapat menyetujui atau menolak publikasi setelah memeriksa kelengkapan informasi pekerjaan.</p></details></div><div className="moderation-actions">{job.status !== "Disetujui" && <button className="button button-primary button-small" onClick={() => setStatus(job.id, "Disetujui")}><Icon name="check" size={15}/> Setujui</button>}{job.status !== "Ditolak" && <button className="button button-outline button-small" onClick={() => setStatus(job.id, "Ditolak")}><Icon name="close" size={15}/> Tolak</button>}<button className="icon-action danger-text" aria-label="Hapus lowongan" onClick={() => setStatus(job.id, "Dihapus")}><Icon name="trash" size={17}/></button></div></article>)}{shown.length === 0 && <div className="empty-state"><strong>Tidak ada lowongan pada kategori ini.</strong><span>Pilih filter lain untuk melihat data.</span></div>}</div>
      </>}
      {active === "Ringkasan" && <><div className="dashboard-title-row"><div><h1>Ringkasan Admin</h1><p>Ikhtisar aktivitas platform KerjaKita.</p></div></div><div className="status-summary-grid admin-summary"><div className="summary-card"><span>Total pengguna</span><strong>248</strong></div><div className="summary-card"><span>Perusahaan</span><strong>35</strong></div><div className="summary-card"><span>Lowongan aktif</span><strong>11</strong></div><div className="summary-card"><span>Menunggu moderasi</span><strong>{records.filter((job) => job.status === "Menunggu").length}</strong></div></div><div className="panel-card"><h2>Aktivitas moderasi terbaru</h2><p className="panel-subtitle">Periksa pengajuan lowongan yang masih menunggu persetujuan.</p><button className="button button-primary" onClick={() => setActive("Moderasi Lowongan")}>Buka moderasi</button></div></>}
      {active === "Pengguna" && <div className="panel-card"><h1>Pengguna</h1><p className="panel-subtitle">Daftar pengguna yang terdaftar di KerjaKita.</p><div className="simple-table"><div className="simple-table-head"><span>Nama</span><span>Email</span><span>Peran</span></div><div className="simple-table-row"><strong>Siti Rahma</strong><span>siti@email.com</span><span>Pelamar</span></div><div className="simple-table-row"><strong>Rina Wijaya</strong><span>hr@nusantaratech.id</span><span>Perusahaan</span></div><div className="simple-table-row"><strong>Budi Santoso</strong><span>budi@email.com</span><span>Pelamar</span></div></div></div>}
      {active === "Kategori" && <div className="panel-card"><h1>Kategori Lowongan</h1><p className="panel-subtitle">Kategori pekerjaan yang tersedia pada platform.</p><div className="category-admin-list">{["Teknologi Informasi", "Desain & Kreatif", "Keuangan & Akuntansi", "Pemasaran", "Layanan Pelanggan", "Sumber Daya Manusia"].map((item) => <div key={item}><span>{item}</span><button className="button button-outline button-xs">Edit</button></div>)}</div></div>}
      {active === "Perusahaan" && <div className="panel-card"><h1>Perusahaan</h1><p className="panel-subtitle">Perusahaan yang terdaftar di KerjaKita.</p><div className="category-admin-list">{["Nusantara Tech", "Karya Digital Indo", "Fintek Nusantara", "Solusi Bersama"].map((item) => <div key={item}><span>{item}</span><span className="status-pill success">Terverifikasi</span></div>)}</div></div>}
      {toast && <div className="toast"><Icon name="check" size={17}/>{toast}</div>}
    </DashboardShell>
  );
}
