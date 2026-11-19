"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Icon from "../components/Icon";
import { jobs, categories, typeLabels } from "../lib/demo-data";

export default function HomePage() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("Semua lokasi");
  const [category, setCategory] = useState("Semua kategori");
  const [type, setType] = useState("Semua tipe");

  const filteredJobs = useMemo(() => jobs.filter((job) => {
    const q = keyword.trim().toLowerCase();
    return (!q || `${job.title} ${job.company}`.toLowerCase().includes(q))
      && (location === "Semua lokasi" || job.location === location)
      && (category === "Semua kategori" || job.category === category)
      && (type === "Semua tipe" || job.type === type);
  }), [keyword, location, category, type]);

  const scrollToJobs = () => document.getElementById("lowongan")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main>
      <Header />
      <section className="hero-section" id="beranda">
        <div className="hero-pattern" />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">11+ lowongan aktif</span>
            <h1>Temukan pekerjaan<br /><span>yang tepat untuk Anda.</span></h1>
            <p>Jelajahi lowongan dari perusahaan terverifikasi di seluruh Indonesia. Lamar dalam hitungan detik dengan CV PDF atau CV form.</p>
            <form className="hero-search" onSubmit={(event) => { event.preventDefault(); scrollToJobs(); }}>
              <label className="search-keyword"><Icon name="search" size={20} /><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Posisi atau nama perusahaan" /></label>
              <label className="search-location"><Icon name="pin" size={18} /><select value={location} onChange={(e) => setLocation(e.target.value)}><option>Semua lokasi</option><option>Jakarta</option><option>Semarang</option><option>Bandung</option></select><Icon name="chevron" size={16} /></label>
              <button className="button button-primary search-submit" type="submit">Cari Lowongan</button>
            </form>
            <div className="hero-tags">
              {categories.map((item) => <button key={item} onClick={() => { setCategory(item); scrollToJobs(); }}>{item}</button>)}
            </div>
          </div>
          <div className="hero-visual">
            <Image src="/primary1.jpg" width={531} height={383} priority alt="Tim profesional bekerja bersama di kantor" />
            <div className="verified-card"><span>Perusahaan mitra</span><strong>Terverifikasi</strong><small>Setiap lowongan dimoderasi admin</small></div>
          </div>
        </div>
      </section>

      <section className="job-browser" id="lowongan">
        <aside className="filter-panel">
          <div className="filter-title"><Icon name="sliders" size={18} /><strong>Filter</strong></div>
          <label className="field-label">LOKASI</label>
          <div className="select-wrap"><select value={location} onChange={(e) => setLocation(e.target.value)}><option>Semua lokasi</option><option>Jakarta</option><option>Semarang</option><option>Bandung</option></select><Icon name="chevron" size={15} /></div>
          <label className="field-label">KATEGORI</label>
          <div className="select-wrap"><select value={category} onChange={(e) => setCategory(e.target.value)}><option>Semua kategori</option>{categories.map((item) => <option key={item}>{item}</option>)}</select><Icon name="chevron" size={15} /></div>
          <label className="field-label">TIPE PEKERJAAN</label>
          <div className="select-wrap"><select value={type} onChange={(e) => setType(e.target.value)}><option>Semua tipe</option><option value="FULL_TIME">Penuh Waktu</option><option value="PART_TIME">Paruh Waktu</option><option value="INTERNSHIP">Magang</option><option value="CONTRACT">Kontrak</option><option value="FREELANCE">Freelance</option></select><Icon name="chevron" size={15} /></div>
          <button className="filter-reset" onClick={() => { setLocation("Semua lokasi"); setCategory("Semua kategori"); setType("Semua tipe"); setKeyword(""); }}>Reset filter</button>
        </aside>
        <div className="job-results">
          <div className="section-heading-row"><div><h2>Lowongan Terbaru</h2><p>{filteredJobs.length} lowongan ditemukan</p></div><div className="results-search"><Icon name="search" size={17} /><input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Cari posisi atau perusahaan" /></div></div>
          <div className="job-list">
            {filteredJobs.map((job) => (
              <article className="job-row-card" key={job.id}>
                <div className="company-logo">
  <Image
    src={job.logo}
    alt={`Logo ${job.company}`}
    width={49}
    height={49}
    style={{
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit"
}}
  />
</div>
                <div className="job-row-main"><Link href={`/lowongan/${job.id}`} className="job-title-link">{job.title}</Link><div className="job-company-line">{job.company}<span className="verified-dot"><Icon name="check" size={10} /></span></div><div className="job-meta"><span><Icon name="pin" size={14} />{job.location}</span><span>{typeLabels[job.type]}</span><span>{job.salary}</span></div></div>
                <span className="job-type-pill">{typeLabels[job.type]}</span>
                <Link className="button button-outline button-small" href={`/lowongan/${job.id}`}>Lihat Detail</Link>
              </article>
            ))}
            {filteredJobs.length === 0 && <div className="empty-state"><strong>Lowongan tidak ditemukan</strong><span>Coba ubah kata kunci atau filter pencarian.</span></div>}
          </div>
        </div>
      </section>

      <section className="company-section" id="perusahaan">
        <div className="company-heading"><span className="eyebrow">KENALI PERUSAHAAN</span><h2>Perusahaan mitra KerjaKita</h2><p>Temukan tempat terbaik untuk mengembangkan kariermu.</p></div>
        <div className="company-grid">
          {[
  { name: "Nusantara Tech", logo: "/PT1.jpg" },
  { name: "Karya Digital Indo", logo: "/PT2.jpg" },
  { name: "Fintek Nusantara", logo: "/PT3.jpg" },
  { name: "Solusi Bersama", logo: "/PT4.jpg" },
].map((company) => (
  <div className="company-tile" key={company.name}>
    <div className="company-logo large">
      <Image
        src={company.logo}
        alt={`Logo ${company.name}`}
        width={55}
        height={55}
        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
      />
    </div>
    <strong>{company.name}</strong>
    <span>Perusahaan terverifikasi</span>
  </div>
))}
        </div>
      </section>
      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Icon name="briefcase" size={22} /></span><span>KerjaKita</span></div><p>Temukan peluang, bangun masa depan.</p><small>© 2026 KerjaKita. All rights reserved.</small></footer>
    </main>
  );
}
