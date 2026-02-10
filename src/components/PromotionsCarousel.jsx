import React, { useRef } from "react";
import ProductCard from "./ProductCard";

export default function PromotionsCarousel({ products = [], onAdd }) {
  const ref = useRef(null);

  const scroll = (dir = 1) => {
    if (!ref.current) return;
    const w = ref.current.clientWidth;
    ref.current.scrollBy({ left: dir * w * 0.8, behavior: "smooth" });
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="promotions-carousel-wrapper mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="m-0">Promocje</h4>
        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => scroll(-1)}
            aria-label="Przewiń w lewo"
          >
            ◀
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() => scroll(1)}
            aria-label="Przewiń w prawo"
          >
            ▶
          </button>
        </div>
      </div>
      <div
        className="promotions-carousel"
        ref={ref}
        role="region"
        aria-label="Lista promocji"
      >
        {products.map((p) => (
          <div className="promo-item" key={p.id} tabIndex={0}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
