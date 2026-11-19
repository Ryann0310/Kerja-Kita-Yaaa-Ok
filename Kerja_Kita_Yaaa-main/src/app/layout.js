import "./globals.css";

export const metadata = {
  title: "KerjaKita – Temukan Pekerjaan yang Tepat",
  description: "Platform pencarian kerja dan rekrutmen KerjaKita.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
