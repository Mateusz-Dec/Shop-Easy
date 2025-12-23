import React, { useEffect, useState } from "react";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const typeIcon = {
  success: <FaCheckCircle />,
  info: <FaInfoCircle />,
  warn: <FaExclamationTriangle />,
};

export default function Toast() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    function onToast(e) {
      const id = Date.now() + Math.random();
      const payload = { id, ...e.detail };
      setToasts((t) => [...t, payload]);
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, 3000);
    }

    window.addEventListener("shopeasy-toast", onToast);
    return () => window.removeEventListener("shopeasy-toast", onToast);
  }, []);

  if (!toasts.length) return null;

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}>
      {toasts.map((t) => (
        <div
          key={t.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background:
              t.type === "success"
                ? "#4caf50"
                : t.type === "info"
                ? "#2196f3"
                : "#ff9800",
            color: "white",
            padding: "12px 18px",
            borderRadius: 8,
            boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
            marginBottom: 12,
            minWidth: 220,
            fontWeight: 600,
          }}
        >
          <div style={{ fontSize: 18 }}>
            {typeIcon[t.type] || typeIcon.success}
          </div>
          <div style={{ fontSize: 14 }}>{t.message}</div>
        </div>
      ))}
    </div>
  );
}
