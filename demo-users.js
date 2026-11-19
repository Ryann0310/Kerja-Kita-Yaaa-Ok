// Akun demo untuk pengujian lokal (development) saja.
// Dipakai oleh login cepat. Jika database PostgreSQL belum disiapkan,
// akun ini tetap bisa dipakai karena tidak membutuhkan database.
// Seluruh fungsi di sini otomatis nonaktif pada production.

export const demoUsers = [
  { id: "demo-applicant", name: "Siti Rahma", email: "pelamar@kerjakita.test", password: "Pelamar123!", role: "applicant" },
  { id: "demo-company", name: "Nusantara Tech", email: "perusahaan@kerjakita.test", password: "Perusahaan123!", role: "company" },
  { id: "demo-admin", name: "Administrator", email: "admin@kerjakita.test", password: "Admin123!", role: "admin" },
];

export function isDemoEnabled() {
  return process.env.NODE_ENV !== "production";
}

function toPublic(user) {
  if (!user) return null;
  const { password, ...publicUser } = user;
  return { ...publicUser, created_at: null };
}

export function findDemoUserByRole(role) {
  if (!isDemoEnabled()) return null;
  return toPublic(demoUsers.find((user) => user.role === role));
}

export function findDemoUserById(id) {
  if (!isDemoEnabled()) return null;
  return toPublic(demoUsers.find((user) => user.id === id));
}

export function findDemoUserByCredentials(email, password) {
  if (!isDemoEnabled()) return null;
  return toPublic(demoUsers.find((user) => user.email === email && user.password === password));
}
