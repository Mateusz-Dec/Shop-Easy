import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import { useCartStore } from "../store/cartStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: "all",
    priceRange: [0, 500],
    minRating: 0,
    sortBy: "rating-desc",
  });

  // Pagination / infinite scroll
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    const base = fetch("/data/products.json").then((r) => r.json());
    const ext = Promise.resolve(
      JSON.parse(localStorage.getItem("externalProducts") || "[]")
    );
    Promise.all([base, ext])
      .then(([baseProducts, external]) => {
        // Merge external (imported) products into product list
        const merged = [...baseProducts, ...external];
        setProducts(merged);
      })
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filtrowanie po kategorii
    if (filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filtrowanie po cenie
    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Filtrowanie po ocenie
    filtered = filtered.filter((p) => (p.rating || 0) >= filters.minRating);

    // Sortowanie
    switch (filters.sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "az":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating-asc":
        filtered.sort((a, b) => (a.rating || 0) - (b.rating || 0));
        break;
      case "rating-desc":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    // reset pagination when filters change
    setPage(1);
  }, [products, filters]);

  const categories = [...new Set(products.map((p) => p.category))];

  const visibleProducts = filteredProducts.slice(0, page * pageSize);

  // Infinite scroll via IntersectionObserver
  React.useEffect(() => {
    if (!sentinelRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleProducts.length < filteredProducts.length
        ) {
          setIsFetching(true);
          setTimeout(() => {
            setPage((p) => p + 1);
            setIsFetching(false);
          }, 600);
        }
      },
      { rootMargin: "200px" }
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [filteredProducts, visibleProducts.length]);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Panel filtrów */}
        <div className="col-md-3 mb-4">
          <FilterPanel onFilterChange={setFilters} categories={categories} />
        </div>

        {/* Produkty */}
        <div className="col-md-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Produkty ({filteredProducts.length})</h2>
          </div>
          {visibleProducts.length === 0 ? (
            <div className="alert alert-info">
              Brak produktów spełniających wybrane kryteria.
            </div>
          ) : (
            <>
              <div className="row">
                {visibleProducts.map((p) => (
                  <ProductCard key={p.id} product={p} onAdd={addToCart} />
                ))}
              </div>

              <div ref={sentinelRef} style={{ height: 20 }} />

              {isFetching && (
                <div className="text-center mt-3 mb-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Ładuję...</span>
                  </div>
                </div>
              )}

              {visibleProducts.length < filteredProducts.length &&
                !isFetching && (
                  <div className="text-center text-muted mt-3">
                    Przewiń w dół, aby załadować więcej
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
