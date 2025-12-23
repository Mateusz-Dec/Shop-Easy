import { useEffect, useState } from "react";

export default function ImageLightbox() {
  const [open, setOpen] = useState(false);
  const [src, setSrc] = useState(null);
  const [alt, setAlt] = useState("");
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onOpen = (e) => {
      const d = e.detail || {};
      setSrc(d.src);
      setAlt(d.alt || "");
      setScale(1);
      setPos({ x: 0, y: 0 });
      setOpen(true);
    };
    window.addEventListener("shopeasy-open-image", onOpen);
    return () => window.removeEventListener("shopeasy-open-image", onOpen);
  }, []);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
        padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: "95%", maxHeight: "95%", position: "relative" }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            display: "block",
            maxWidth: "100%",
            maxHeight: "80vh",
            transform: `scale(${scale}) translate(${pos.x}px, ${pos.y}px)`,
            transition: "transform 0.12s ease-out",
            cursor: scale === 1 ? "zoom-in" : "grab",
          }}
          onDoubleClick={() => setScale((s) => (s === 1 ? 2 : 1))}
          onWheel={(e) => {
            e.preventDefault();
            const delta = -e.deltaY / 500;
            setScale((s) => Math.max(1, Math.min(4, +(s + delta).toFixed(2))));
          }}
          onMouseDown={(e) => {
            if (scale <= 1) return;
            const startX = e.clientX;
            const startY = e.clientY;
            const sx = pos.x;
            const sy = pos.y;
            const onMove = (ev) => {
              setPos({
                x: sx + (ev.clientX - startX),
                y: sy + (ev.clientY - startY),
              });
            };
            const onUp = () => {
              window.removeEventListener("mousemove", onMove);
              window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
          }}
        />

        <button
          className="btn btn-sm btn-outline-light"
          style={{ position: "absolute", top: 8, right: 8 }}
          onClick={() => setOpen(false)}
        >
          Zamknij
        </button>
      </div>
    </div>
  );
}
