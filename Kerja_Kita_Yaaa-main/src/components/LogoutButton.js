"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "./Icon";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      router.replace("/login");
      router.refresh();
      setLoading(false);
    }
  }

  return (
    <button type="button" className="icon-link logout-button" onClick={handleLogout} disabled={loading} aria-label="Keluar" title="Keluar">
      <Icon name="logout" size={18} />
    </button>
  );
}
