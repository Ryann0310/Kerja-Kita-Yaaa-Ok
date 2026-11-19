const { randomBytes, scrypt: scryptCallback } = require("node:crypto");
const { promisify } = require("node:util");
const { Pool } = require("pg");
const scrypt = promisify(scryptCallback);

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = await scrypt(password, salt, 64);
  return `scrypt:${salt}:${Buffer.from(key).toString("hex")}`;
}

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diatur. Buat .env.local terlebih dahulu.");
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const demoUsers = [
    { name: "Siti Rahma", email: "pelamar@kerjakita.test", password: "Pelamar123!", role: "applicant" },
    { name: "Nusantara Tech", email: "perusahaan@kerjakita.test", password: "Perusahaan123!", role: "company" },
    { name: "Administrator", email: "admin@kerjakita.test", password: "Admin123!", role: "admin" },
  ];

  try {
    for (const user of demoUsers) {
      const passwordHash = await hashPassword(user.password);
      await pool.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (email) DO UPDATE SET
           name = EXCLUDED.name,
           password_hash = EXCLUDED.password_hash,
           role = EXCLUDED.role,
           updated_at = NOW()`,
        [user.name, user.email, passwordHash, user.role],
      );
    }
    console.log("Akun demo berhasil dibuat / diperbarui:");
    console.log("Pelamar     : pelamar@kerjakita.test / Pelamar123!");
    console.log("Perusahaan  : perusahaan@kerjakita.test / Perusahaan123!");
    console.log("Admin       : admin@kerjakita.test / Admin123!");
    console.log("Ganti password demo sebelum aplikasi digunakan secara publik.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Gagal membuat akun demo:", error.message);
  process.exitCode = 1;
});
