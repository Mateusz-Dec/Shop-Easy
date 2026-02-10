import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useCartStore } from "../store/cartStore";

export default function Collections() {
  const [products, setProducts] = useState([]);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    fetch("/data/products.json")
      .then((r) => r.json())
      .then((data) => setProducts(data))
      .catch(() => setProducts([]));
  }, []);

  const promos = products.filter((p) => p.sale);
  const mens = products.filter((p) => p.category === "Odzież męska");

  return (
    <div className="container py-4">
      <h2>Kolekcje</h2>

      <section className="mt-4">
        <h4>Promocje</h4>
        {promos.length === 0 ? (
          <div className="text-muted">Brak produktów promocyjnych.</div>
        ) : (
          <div className="row">
            {promos.map((p) => (
              <div key={p.id} className="col-md-4 mb-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-5">
        <h4>Odzież męska</h4>
        {mens.length === 0 ? (
          <div className="text-muted">Brak produktów w tej kolekcji.</div>
        ) : (
          <div className="row">
            {mens.map((p) => (
              <div key={p.id} className="col-md-4 mb-4">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
