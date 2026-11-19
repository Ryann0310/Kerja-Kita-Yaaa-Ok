"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "./Header";
import Icon from "./Icon";
import Image from "next/image";
import { typeLabels } from "../lib/demo-data";

export default function JobDetailClient({ job }) {
  const [showApply, setShowApply] = useState(false);
  const [cvType, setCvType] = useState("form");
  const [letter, setLetter] = useState("Saya sangat tertarik dengan posisi ini dan ingin bergabung dengan tim Anda.");
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitApplication = (event) => {
    event.preventDefault();
    if (cvType === "pdf" && !file) { setError("Silakan pilih file CV PDF terlebih dahulu."); return; }
    const previous = JSON.parse(localStorage.getItem("kerjakita-applications") || "[]");
    const application = { id: Date.now(), title: job.title, company: job.company, status: "Dikirim", updated: "diperbarui baru saja" };
    localStorage.setItem("kerjakita-applications", JSON.stringify([application, ...previous]));
    setError(""); setSuccess(true); setShowApply(false);
  };

  return <main className="detail-page"><Header/><div className="detail-breadcrumb"><Link href="/">Beranda</Link><span>/</span><Link href="/#lowongan">Cari Lowongan</Link><span>/</span><strong>{job.title}</strong></div><div className="detail-layout"><section className="detail-main">
   <div className="detail-hero">
  <div
    className="detail-hero-bg"
    style={{ backgroundImage: `url("${job.logo}")` }}
  />
  <div className="detail-hero-overlay" />

  <div className="detail-company-head">
    <div className="company-logo detail-logo">
      <Image
        src={job.logo}
        alt={`Logo ${job.company}`}
        width={87}
        height={87}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </div>

    <div>
      <h1>{job.title}</h1>
      <p>
        {job.company}
        <span className="verified-dot">
          <Icon name="check" size={10} />
        </span>
      </p>
    </div>
  </div>

  <div className="detail-facts">
    <div><span>Lokasi</span><strong>{job.location}</strong></div>
    <div><span>Tipe pekerjaan</span><strong>{typeLabels[job.type]}</strong></div>
    <div><span>Estimasi gaji</span><strong>{job.salary}</strong></div>
  </div>
</div><section className="detail-section"><h2>Deskripsi Pekerjaan</h2><p>{job.description} Anda akan berkolaborasi dengan tim lintas fungsi untuk menghasilkan solusi yang berdampak bagi pengguna.</p></section><section className="detail-section"><h2>Kualifikasi</h2><ul>{job.requirements.map((item) => <li key={item}>{item}</li>)}</ul></section><section className="detail-section"><h2>Tentang Perusahaan</h2><p>{job.company} berkomitmen membangun lingkungan kerja yang kolaboratif, inklusif, dan mendukung perkembangan profesional setiap anggota tim.</p></section></section><aside className="detail-side"><div className="apply-box"><span className="eyebrow">LAMARAN PEKERJAAN</span><h2>{job.title}</h2><p>{job.company} · {job.location}</p><button className="button button-primary button-block" onClick={() => setShowApply(true)}>Lamar Sekarang</button></div><div className="side-info"><h3>Informasi pekerjaan</h3><p><strong>Jenis pekerjaan</strong><span>{typeLabels[job.type]}</span></p><p><strong>Lokasi</strong><span>{job.location}</span></p><p><strong>Dipublikasikan</strong><span>{job.posted}</span></p></div></aside></div>
    {success && <div className="toast"><Icon name="check" size={17}/>Lamaran berhasil dikirim! Lihat statusnya di dashboard pelamar.</div>}
    {showApply && <div className="modal-backdrop" onClick={() => setShowApply(false)}><form className="apply-modal" onSubmit={submitApplication} onClick={(e) => e.stopPropagation()}><div className="modal-heading"><div><h2>Lamar: {job.title}</h2><p>{job.company} · {job.location}</p></div><button type="button" className="modal-close" onClick={() => setShowApply(false)}><Icon name="close"/></button></div><label className="modal-label">Pilih CV yang dikirim</label><div className="cv-choice-grid"><button type="button" className={`cv-choice ${cvType === "pdf" ? "selected" : ""}`} onClick={() => {setCvType("pdf"); setError("");}}><Icon name="file" size={22}/><strong>CV PDF</strong><span>{file ? file.name : "Belum ada file"}</span></button><button type="button" className={`cv-choice ${cvType === "form" ? "selected" : ""}`} onClick={() => {setCvType("form"); setError("");}}><Icon name="list" size={22}/><strong>CV Form</strong><span>Profil & riwayat dari form</span></button></div>{cvType === "pdf" && <label className="upload-field">Pilih CV PDF<input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files?.[0] || null)}/></label>}<label className="modal-label" htmlFor="cover-letter">Surat lamaran (opsional)</label><textarea id="cover-letter" className="cover-letter" value={letter} onChange={(e) => setLetter(e.target.value)}/>{error && <p className="form-error">{error}</p>}<div className="modal-actions"><button type="button" className="button button-outline" onClick={() => setShowApply(false)}>Batal</button><button type="submit" className="button button-primary">Kirim Lamaran</button></div></form></div>}
  </main>;
}
