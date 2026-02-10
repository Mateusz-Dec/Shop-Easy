import React, { useEffect, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import FilterPanel from "../components/FilterPanel";
import PromotionsCarousel from "../components/PromotionsCarousel";
import { useCartStore } from "../store/cartStore";
import { BsClockHistory } from "react-icons/bs";
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

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
      );
      const difference = endOfDay - now;

      if (difference > 0) {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const sentinelRef = useRef(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    const base = fetch("/data/products.json").then((r) => r.json());
    const ext = Promise.resolve(
      JSON.parse(localStorage.getItem("externalProducts") || "[]"),
    );
    Promise.all([base, ext])
      .then(([baseProducts, external]) => {
        const merged = [...baseProducts, ...external];
        setProducts(merged);
      })
      .catch(() => setProducts([]));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (filters.categories && filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category),
      );
    }

    filtered = filtered.filter((p) => {
      const price = p.sale && p.discountedPrice ? p.discountedPrice : p.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    filtered = filtered.filter((p) => (p.rating || 0) >= filters.minRating);

    if (filters.search && filters.search.trim().length > 0) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          (p.category || "").toLowerCase().includes(q),
      );
    }

    if (filters.onlyPromos) {
      filtered = filtered.filter((p) => p.sale === true);
    }

    if (filters.onlyInStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    if (filters.onlyFreeShipping) {
      filtered = filtered.filter((p) => {
        const price = p.sale && p.discountedPrice ? p.discountedPrice : p.price;
        return price >= 100;
      });
    }

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
      case "popular":
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
    setPage(1);
  }, [products, filters]);

  const categories = [...new Set(products.map((p) => p.category))].filter(
    Boolean,
  );

  const visibleProducts = filteredProducts.slice(0, page * pageSize);

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
      { rootMargin: "200px" },
    );
    obs.observe(sentinelRef.current);
    return () => obs.disconnect();
  }, [filteredProducts, visibleProducts.length]);

  return (
    <div className="container-fluid">
      <div className="promo-banner mb-4 p-3 rounded d-flex justify-content-between align-items-center">
        <div>
          <strong>🔥 Promocje tygodnia:</strong> Sprawdź wybrane produkty w
          obniżonych cenach i darmową wysyłką przy zamówieniach powyżej 100 PLN.
        </div>
        <div>
          <a className="btn btn-outline-primary" href="/collections">
            Zobacz kolekcje
          </a>
        </div>
      </div>

      <div
        className="alert alert-warning border-0 shadow-sm d-flex align-items-center justify-content-between mb-4"
        style={{
          background: "linear-gradient(90deg, #fff3e0 0%, #ffe0b2 100%)",
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <div className="bg-white p-2 rounded-circle shadow-sm text-warning">
            <BsClockHistory size={24} />
          </div>
          <div>
            <h5 className="mb-0 fw-bold text-dark">Oferta Dnia!</h5>
            <small className="text-dark">
              Dodatkowe -20% na wybrane produkty kończy się za:
            </small>
          </div>
        </div>
        <div className="d-flex gap-2 fw-bold fs-4 text-dark font-monospace">
          <span>{String(timeLeft.hours).padStart(2, "0")}</span>:
          <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:
          <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 mb-4">
          <FilterPanel onFilterChange={setFilters} categories={categories} />
        </div>

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
                  <div key={p.id} className="col-md-4 mb-4">
                    <ProductCard product={p} />
                  </div>
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
