import React, { useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("shopeasy-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const body = document.body;
    if (isDark) {
      body.classList.add("dark");
      localStorage.setItem("shopeasy-theme", "dark");
    } else {
      body.classList.remove("dark");
      localStorage.setItem("shopeasy-theme", "light");
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="nav-link d-flex align-items-center gap-2"
      title={isDark ? "Włącz tryb jasny" : "Włącz tryb ciemny"}
      style={{
        background: "transparent",
        border: "none",
      }}
    >
      {isDark ? <BsSun size={18} /> : <BsMoonStars size={18} />}
      <span>{isDark ? "Jasny" : "Ciemny"}</span>
    </button>
  );
}
