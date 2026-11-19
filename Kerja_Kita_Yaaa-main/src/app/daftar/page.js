"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "../../components/Icon";

const dashboardForRole = { applicant: "/dashboard/pelamar", company: "/dashboard/perusahaan" };

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState("applicant");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister(event) {
    event.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Konfirmasi kata sandi belum sama.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, name, email, password }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Pendaftaran gagal.");
      router.replace(dashboardForRole[result.user.role] || "/login");
      router.refresh();
    } catch (requestError) {
      setError(requestError.message || "Pendaftaran gagal. Periksa koneksi database.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page register-page">
      <section className="auth-promo">
        <Link href="/" className="brand auth-brand"><span className="brand-mark"><Icon name="briefcase" size={23} /></span><span>KerjaKita</span></Link>
        <div className="auth-promo-copy">
          <h2>Mulai perjalanan baru bersama KerjaKita.</h2>
          <ul>
            <li><Icon name="check" size={20} />Temukan peluang kerja sesuai kemampuan</li>
            <li><Icon name="check" size={20} />Buat profil dan kelola informasi akun</li>
            <li><Icon name="check" size={20} />Terhubung dengan perusahaan terpercaya</li>
          </ul>
        </div>
      </section>

      <section className="auth-content">
        <div className="auth-card register-card">
          <div className="auth-heading">
            <h1>Buat akun KerjaKita</h1>
            <p>Daftar untuk mulai mencari kerja atau merekrut kandidat.</p>
          </div>

          <form onSubmit={handleRegister} className="auth-form">
            <label>Daftar sebagai
              <select value={role} onChange={(event) => setRole(event.target.value)}>
                <option value="applicant">Pelamar</option>
                <option value="company">Perusahaan</option>
              </select>
            </label>
            <label>Nama lengkap / nama perusahaan<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Masukkan nama" minLength={2} maxLength={140} required /></label>
            <label>Email<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="nama@email.com" required /></label>
            <label>Kata sandi<input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Minimal 8 karakter" minLength={8} required /></label>
            <label>Konfirmasi kata sandi<input type="password" autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Ulangi kata sandi" minLength={8} required /></label>
            {error && <p className="auth-error" role="alert">{error}</p>}
            <button className="button button-primary button-block auth-submit" type="submit" disabled={loading}>{loading ? "Membuat akun..." : "Buat Akun"}</button>
          </form>
          <p className="auth-bottom">Sudah punya akun? <Link href="/login">Masuk</Link></p>
        </div>
      </section>
    </main>
  );
}
