import { Pool } from "pg";

let pool;

function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL belum diatur. Salin .env.example menjadi .env.local lalu isi koneksi PostgreSQL.");
  }

  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
      ssl: process.env.PGSSL === "true" ? { rejectUnauthorized: false } : undefined,
    });
    pool.on("error", (error) => {
      console.error("PostgreSQL pool error:", error.message);
    });
  }

  return pool;
}

export function query(text, values = []) {
  return getPool().query(text, values);
}
