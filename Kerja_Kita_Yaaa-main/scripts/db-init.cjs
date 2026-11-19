const fs = require("node:fs");
const path = require("node:path");
const { Pool } = require("pg");

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diatur. Buat .env.local terlebih dahulu.");
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  try {
    const schema = fs.readFileSync(path.join(process.cwd(), "database-schema.sql"), "utf8");
    await pool.query(schema);
    console.log("Tabel users KerjaKita berhasil dibuat / diperiksa.");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Gagal menyiapkan database:", error.message);
  process.exitCode = 1;
});
