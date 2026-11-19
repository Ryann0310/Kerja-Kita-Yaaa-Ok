"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "../../components/Icon";

const dashboardForRole = {
  applicant: "/dashboard/pelamar",
  company: "/dashboard/perusahaan",
  admin: "/dashboard/admin",
};

const demoRoles = [
  { role: "applicant", label: "Login Pelamar", icon: "user" },
  { role: "company", label: "Login Perusahaan", icon: "building" },
  { role: "admin", label: "Login Admin", icon: "shield" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Tidak dapat masuk.");
      router.replace(dashboardForRole[result.user.role] || "/");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || "Terjadi kesalahan. Periksa koneksi database.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDemoLogin(role) {
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/demo-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Login demo gagal.");
      router.replace(dashboardForRole[result.user.role] || "/");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || "Login demo gagal. Pastikan database sudah di-seed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="auth-promo">
        <Link href="/" className="brand auth-brand"><span className="brand-mark"><Icon name="briefcase" size={23} /></span><span>KerjaKita</span></Link>
        <div className="auth-promo-copy">
          <h2>Langkah pertama menuju karier impian Anda.</h2>
          <ul>
            <li><Icon name="check" size={20} />Ribuan lowongan dari perusahaan terverifikasi</li>
            <li><Icon name="check" size={20} />Lamar dengan CV PDF atau CV form dalam hitungan detik</li>
            <li><Icon name="check" size={20} />Pantau status seleksi secara real-time</li>
          </ul>
        </div>
      </section>

      <section className="auth-content">
        <div className="auth-card">
          <div className="auth-heading">
            <h1>Masuk ke akun Anda</h1>
            <p>Gunakan email dan kata sandi yang terdaftar.</p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            <label>Email<input type="email" autoComplete="email" placeholder="nama@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
            <label>Kata sandi<input type="password" autoComplete="current-password" placeholder="Masukkan kata sandi" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="button button-primary button-block auth-submit" type="submit" disabled={loading}>{loading ? "Memproses..." : "Masuk"}</button>
          </form>

          <div className="demo-login-box">
            <p>LOGIN CEPAT SESUAI ROLE</p>
            <div className="demo-login-grid">
              {demoRoles.map((item) => (
                <button key={item.role} type="button" disabled={loading} onClick={() => handleDemoLogin(item.role)}>
                  <Icon name={item.icon} size={23} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
            <small>Hanya untuk pengujian lokal setelah menjalankan <code>npm run db:seed</code>.</small>
          </div>

          <p className="auth-bottom">Belum punya akun? <Link href="/daftar">Daftar sekarang</Link></p>
        </div>
      </section>
    </main>
  );
}
