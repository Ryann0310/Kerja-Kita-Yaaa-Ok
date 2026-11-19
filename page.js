import Link from "next/link";
import Image from "next/image";
import Header from "../../components/Header";
import Icon from "../../components/Icon";
import { companies, jobs } from "../../lib/demo-data";

export const metadata = {
  title: "Perusahaan Mitra – KerjaKita",
  description: "Kenali perusahaan mitra KerjaKita dan lihat lowongan yang sedang dibuka.",
};

export default function CompaniesPage() {
  return (
    <main>
      <Header />
      <section className="companies-hero">
        <span className="eyebrow">KENALI PERUSAHAAN</span>
        <h1>Perusahaan mitra KerjaKita</h1>
        <p>Temukan tempat terbaik untuk mengembangkan kariermu.</p>
      </section>

      <section className="companies-list">
        {companies.map((company) => {
          const openJobs = jobs.filter((job) => job.company === company.name);
          return (
            <article className="company-card" key={company.id} id={company.id}>
              <div className="company-card-head">
                <div className="company-logo large">
                  <Image src={company.logo} alt={`Logo ${company.name}`} width={55} height={55} style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
                </div>
                <div>
                  <h2>{company.name}<span className="verified-dot"><Icon name="check" size={10} /></span></h2>
                  <p className="company-card-meta"><span><Icon name="building" size={14} />{company.industry}</span><span><Icon name="pin" size={14} />{company.location}</span></p>
                </div>
                <span className="status-pill success">{openJobs.length} lowongan</span>
              </div>
              <p className="company-card-desc">{company.description}</p>
              {openJobs.length > 0 && (
                <ul className="company-card-jobs">
                  {openJobs.map((job) => (
                    <li key={job.id}>
                      <Link href={`/lowongan/${job.id}`}>{job.title}</Link>
                      <span>{job.location} · {job.salary}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </section>

      <footer className="site-footer"><div className="brand"><span className="brand-mark"><Icon name="briefcase" size={22} /></span><span>KerjaKita</span></div><p>Temukan peluang, bangun masa depan.</p><small>© 2026 KerjaKita. All rights reserved.</small></footer>
    </main>
  );
}
