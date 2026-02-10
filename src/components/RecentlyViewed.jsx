import React from "react";
import ProductCard from "./ProductCard";
import { useCartStore } from "../store/cartStore";

export default function RecentlyViewed() {
  const viewedProducts = useCartStore((s) => s.viewedProducts.slice(0, 10));

  if (viewedProducts.length === 0) return null;

  return (
    <div className="mt-5 pt-5 border-top">
      <h4 className="mb-4">📌 Ostatnio oglądane produkty</h4>
      <div className="row">
        {viewedProducts.slice(0, 6).map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
