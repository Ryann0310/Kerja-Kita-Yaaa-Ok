# KerjaKita – Job Board

KerjaKita dibuat dengan **Next.js App Router, React, dan JavaScript**. Autentikasi menggunakan API Route Handler Next.js, PostgreSQL (`pg`), password hashing `scrypt`, dan session cookie `HttpOnly`.

## Persyaratan

- Node.js 20.6 atau lebih baru (disarankan Node.js 24).
- PostgreSQL 14 atau lebih baru.
- Database PostgreSQL bernama `kerjakita` (atau sesuaikan `DATABASE_URL`).

## Setup pertama kali

1. Ekstrak ZIP, lalu buka terminal di folder `kerjakita-next` (folder yang berisi `package.json`).
2. Install dependency:

   ```bash
   npm install
   ```

3. Buat file `.env.local` dengan menyalin `.env.example`. Isi `DATABASE_URL` sesuai koneksi PostgreSQL milikmu dan ganti `SESSION_SECRET` dengan string acak panjang (minimal 32 karakter).
4. Pastikan database `kerjakita` sudah dibuat di PostgreSQL. Jika belum, buka Query Tool pada database `postgres` di pgAdmin lalu jalankan:

   ```sql
   CREATE DATABASE kerjakita;
   ```

   Gunakan nama database yang sama dengan bagian terakhir `DATABASE_URL`, atau sesuaikan URL dengan database yang sudah kamu miliki.
5. Buat tabel:

   ```bash
   npm run db:init
   ```

6. Buat tiga akun demo untuk uji coba lokal:

   ```bash
   npm run db:seed
   ```

7. Jalankan Next.js:

   ```bash
   npm run dev
   ```

8. Buka http://localhost:3000.

> Perintah `db:init` dan `db:seed` membaca variabel dari `.env.local`. Buat file itu sebelum menjalankannya. Pada Windows PowerShell, salin `.env.example` menjadi `.env.local` melalui File Explorer atau jalankan `Copy-Item .env.example .env.local`.

## Akun demo lokal

Setelah `npm run db:seed`, gunakan akun berikut:

| Role | Email | Kata sandi |
|---|---|---|
| Pelamar | `pelamar@kerjakita.test` | `Pelamar123!` |
| Perusahaan | `perusahaan@kerjakita.test` | `Perusahaan123!` |
| Admin | `admin@kerjakita.test` | `Admin123!` |

Tombol **Login cepat sesuai role** di halaman login hanya bekerja pada mode development (`npm run dev`) dan membutuhkan akun demo di atas. Endpoint login demo otomatis dinonaktifkan pada production. Ganti kata sandi demo sebelum deployment dan jangan gunakan data demo sebagai kredensial produksi.

Pendaftaran publik hanya mengizinkan role Pelamar dan Perusahaan. Role Admin dibuat melalui proses seed / administrasi database, bukan melalui formulir pendaftaran umum.

## Fitur autentikasi

- Register Pelamar dan Perusahaan dengan validasi nama, email, dan kata sandi.
- Password disimpan sebagai hash `scrypt`, bukan teks biasa.
- Login memverifikasi email dan password di PostgreSQL.
- Session ditandatangani server dan disimpan pada cookie `HttpOnly`, `SameSite=Lax`, serta `Secure` saat production.
- Logout menghapus session cookie.
- Halaman dashboard memeriksa user dan role di server. Pelamar, Perusahaan, dan Admin hanya dapat membuka dashboard sesuai role-nya.
- Admin tidak dapat dibuat melalui pendaftaran publik.

## Halaman

- `/` – Homepage pencarian lowongan.
- `/login` – Login akun dan quick login lokal.
- `/daftar` – Register Pelamar / Perusahaan.
- `/dashboard/pelamar` – Dashboard khusus role Pelamar.
- `/dashboard/perusahaan` – Dashboard khusus role Perusahaan.
- `/dashboard/admin` – Dashboard khusus role Admin.
- `/lowongan/[id]` – Detail lowongan dan form lamaran demo.

## Catatan implementasi

Autentikasi dan tabel akun sudah terhubung ke PostgreSQL. Data lowongan, moderasi, CV, dan status seleksi pada tampilan dashboard masih berupa data demo di sisi frontend; fitur-fitur tersebut belum sepenuhnya disimpan melalui API/database. Untuk deployment, atur `DATABASE_URL` dan `SESSION_SECRET` pada environment hosting, siapkan tabel menggunakan `database-schema.sql`, dan jangan aktifkan akun demo.
