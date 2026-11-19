export const jobs = [
  {
    id: "1",
    title: "Frontend Developer (React)",
    company: "Nusantara Tech",
    location: "Jakarta",
    type: "FULL_TIME",
    salary: "Rp8.000.000 – Rp12.000.000",
    category: "Teknologi Informasi",
    logo: "/PT1.jpg",
    description: "Membangun antarmuka web yang responsif, mudah digunakan, dan berkualitas tinggi bersama tim produk dan engineering.",
    posted: "1 hari yang lalu",
    requirements: ["Menguasai React dan JavaScript", "Memahami HTML, CSS, dan REST API", "Mampu bekerja sama dalam tim"],
  },
  {
    id: "2",
    title: "Backend Engineer (Python)",
    company: "Nusantara Tech",
    location: "Jakarta",
    type: "FULL_TIME",
    salary: "Rp9.000.000 – Rp14.000.000",
    category: "Teknologi Informasi",
    logo: "/PT1.jpg",
    description: "Mengembangkan API, mengelola basis data, dan memastikan layanan backend berjalan aman serta andal.",
    posted: "2 jam yang lalu",
    requirements: ["Menguasai Python dan framework backend", "Memahami PostgreSQL dan API", "Terbiasa menggunakan Git"],
  },
  {
    id: "3",
    title: "UI/UX Designer",
    company: "Karya Digital Indo",
    location: "Semarang",
    type: "FULL_TIME",
    salary: "Rp6.000.000 – Rp9.000.000",
    category: "Desain & Kreatif",
    logo: "/PT2.jpg",
    description: "Merancang pengalaman digital yang intuitif melalui riset pengguna, wireframe, dan prototipe.",
    posted: "1 hari yang lalu",
    requirements: ["Memahami Figma", "Memiliki portofolio desain", "Memahami prinsip UI dan UX"],
  },
  {
    id: "4",
    title: "Digital Marketing Manager",
    company: "Fintek Nusantara",
    location: "Jakarta",
    type: "FULL_TIME",
    salary: "Rp14.000.000 – Rp21.000.000",
    category: "Pemasaran",
    logo: "/PT3.jpg",
    description: "Memimpin strategi pemasaran digital, mengelola kampanye, dan menganalisis performa kanal pemasaran.",
    posted: "2 hari yang lalu",
    requirements: ["Pengalaman digital marketing", "Menguasai analisis kampanye", "Mampu memimpin tim"],
  },
  {
    id: "5",
    title: "Customer Service",
    company: "Solusi Bersama",
    location: "Semarang",
    type: "FULL_TIME",
    salary: "Rp4.500.000 – Rp6.000.000",
    category: "Layanan Pelanggan",
    logo: "/PT4.jpg",
    description: "Membantu pelanggan memperoleh solusi dan pengalaman layanan yang menyenangkan.",
    posted: "3 hari yang lalu",
    requirements: ["Komunikatif dan responsif", "Mampu mengoperasikan komputer", "Berorientasi pada pelanggan"],
  },
  {
    id: "6",
    title: "Staff Human Resources",
    company: "Karya Digital Indo",
    location: "Bandung",
    type: "CONTRACT",
    salary: "Rp5.000.000 – Rp7.000.000",
    category: "Sumber Daya Manusia",
    logo: "/PT2.jpg",
    description: "Mendukung proses rekrutmen, administrasi karyawan, dan pengembangan sumber daya manusia.",
    posted: "4 hari yang lalu",
    requirements: ["Memahami administrasi SDM", "Teliti dan terorganisir", "Mampu berkomunikasi dengan baik"],
  },
];

export const companies = [
  { id: "nusantara-tech", name: "Nusantara Tech", logo: "/PT1.jpg", industry: "Teknologi Informasi", location: "Jakarta", description: "Perusahaan teknologi yang mengembangkan solusi digital untuk bisnis di Indonesia." },
  { id: "karya-digital-indo", name: "Karya Digital Indo", logo: "/PT2.jpg", industry: "Desain & Kreatif", location: "Semarang", description: "Studio kreatif digital yang fokus pada desain produk, branding, dan pengalaman pengguna." },
  { id: "fintek-nusantara", name: "Fintek Nusantara", logo: "/PT3.jpg", industry: "Keuangan & Teknologi", location: "Jakarta", description: "Penyedia layanan teknologi finansial untuk UMKM dan konsumen ritel." },
  { id: "solusi-bersama", name: "Solusi Bersama", logo: "/PT4.jpg", industry: "Layanan Pelanggan", location: "Semarang", description: "Penyedia layanan kontak pelanggan dan dukungan operasional untuk berbagai industri." },
];

export const categories = [
  "Desain & Kreatif",
  "Keuangan & Akuntansi",
  "Layanan Pelanggan",
  "Pemasaran",
  "Sumber Daya Manusia",
  "Teknologi Informasi",
];

export const applicantApplications = [
  { id: 1, title: "Backend Engineer (Python)", company: "Nusantara Tech", status: "Dikirim", updated: "diperbarui kurang dari 1 menit yang lalu" },
  { id: 2, title: "Frontend Developer (React)", company: "Nusantara Tech", status: "Dikirim", updated: "diperbarui 3 menit yang lalu" },
  { id: 3, title: "UI/UX Designer", company: "Karya Digital Indo", status: "Diterima", updated: "diperbarui 1 hari yang lalu" },
];

export const applicants = [
  { id: 1, name: "Siti Rahma", email: "siti@email.com", title: "Backend Engineer (Python)", date: "16 Nov 2026", status: "Diproses" },
  { id: 2, name: "Siti Rahma", email: "siti@email.com", title: "Frontend Developer (React)", date: "16 Nov 2026", status: "Dikirim" },
  { id: 3, name: "Budi Santoso", email: "budi@email.com", title: "Frontend Developer (React)", date: "15 Nov 2026", status: "Wawancara" },
  { id: 4, name: "Budi Santoso", email: "budi@email.com", title: "Backend Engineer (Python)", date: "14 Nov 2026", status: "Diproses" },
];

export const moderationJobs = [
  { id: 1, title: "Digital Marketing Manager", company: "Fintek Nusantara", category: "Pemasaran", location: "Jakarta", salary: "Rp14.000.000 – Rp21.000.000", date: "16 Nov 2026", status: "Menunggu" },
  { id: 2, title: "Magang QA Tester", company: "Nusantara Tech", category: "Teknologi Informasi", location: "Semarang", salary: "Rp2.000.000 – Rp3.000.000", date: "15 Nov 2026", status: "Disetujui" },
  { id: 3, title: "UI/UX Designer", company: "Karya Digital Indo", category: "Desain & Kreatif", location: "Bandung", salary: "Rp6.000.000 – Rp9.000.000", date: "14 Nov 2026", status: "Disetujui" },
];

export const typeLabels = {
  FULL_TIME: "Penuh Waktu",
  PART_TIME: "Paruh Waktu",
  INTERNSHIP: "Magang",
  CONTRACT: "Kontrak",
  FREELANCE: "Freelance",
};
