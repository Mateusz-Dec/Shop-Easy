import { useState, useEffect } from "react";
import { BsEraser } from "react-icons/bs";

export default function FilterPanel({ onFilterChange, categories = [] }) {
  // multi-select categories (empty = all)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [search, setSearch] = useState("");
  const [onlyPromos, setOnlyPromos] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [onlyFreeShipping, setOnlyFreeShipping] = useState(false);

  // load saved filters on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem("shopeasy_filters");
      if (raw) {
        const s = JSON.parse(raw);
        setSelectedCategories(s.categories || []);
        setPriceRange(s.priceRange || [0, 500]);
        setMinRating(s.minRating || 0);
        setSortBy(s.sortBy || "rating-desc");
        setSearch(s.search || "");
        setOnlyPromos(!!s.onlyPromos);
        setOnlyInStock(!!s.onlyInStock);
        setOnlyFreeShipping(!!s.onlyFreeShipping);
      }
    } catch (err) {}
  }, []);

  // persist filters to localStorage and notify parent when changed
  useEffect(() => {
    const f = {
      categories: selectedCategories,
      priceRange,
      minRating,
      sortBy,
      search,
      onlyPromos,
      onlyInStock,
      onlyFreeShipping,
    };
    try {
      localStorage.setItem("shopeasy_filters", JSON.stringify(f));
    } catch (err) {}
    onFilterChange(f);
  }, [
    selectedCategories,
    priceRange,
    minRating,
    sortBy,
    search,
    onlyPromos,
    onlyInStock,
    onlyFreeShipping,
  ]);

  const handleCategoryToggle = (cat) => {
    // empty array = all categories (none selected)
    const next = selectedCategories.includes(cat)
      ? selectedCategories.filter((c) => c !== cat)
      : [...selectedCategories, cat];
    setSelectedCategories(next);
  };

  const handleSelectAllCategories = () => setSelectedCategories([]);

  const handlePriceChange = (e) => {
    const newPrice = [0, Number(e.target.value) || 0];
    setPriceRange(newPrice);
  };

  const handleRatingChange = (rating) => setMinRating(rating);
  const handleSortChange = (e) => setSortBy(e.target.value);

  const handleClear = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setMinRating(0);
    setSortBy("rating-desc");
    setSearch("");
    setOnlyPromos(false);
    setOnlyInStock(false);
    setOnlyFreeShipping(false);
    try {
      localStorage.removeItem("shopeasy_filters");
    } catch (err) {}
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Filtry</h5>

        {/* Kategorie */}
        <div className="mb-4">
          <h6 className="text-muted">Kategoria</h6>
          <div className="d-flex flex-column gap-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="cat_all"
                checked={selectedCategories.length === 0}
                onChange={handleSelectAllCategories}
              />
              <label className="form-check-label" htmlFor="cat_all">
                Wszystkie
              </label>
            </div>

            {categories.map((cat) => (
              <div className="form-check" key={cat}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat_${cat}`}
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                />
                <label className="form-check-label" htmlFor={`cat_${cat}`}>
                  {cat}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Wyszukaj */}
        <div className="mb-3">
          <input
            type="search"
            className="form-control"
            placeholder="Szukaj produktów..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Cena */}
        <div className="mb-4">
          <h6 className="text-muted">Cena</h6>
          <input
            type="range"
            className="form-range"
            min="0"
            max="500"
            value={priceRange[1]}
            onChange={handlePriceChange}
          />
          <small className="text-muted">Do {priceRange[1]} PLN</small>
        </div>

        {/* Ocena */}
        <div className="mb-4">
          <h6 className="text-muted">Minimalna ocena</h6>
          <div className="btn-group-vertical w-100" role="group">
            {[0, 4, 4.5].map((rating) => (
              <button
                key={rating}
                type="button"
                className={`btn btn-outline-warning text-start ${
                  minRating === rating ? "active" : ""
                }`}
                onClick={() => handleRatingChange(rating)}
              >
                {rating === 0 ? "Wszystkie" : `${rating}★+`}
              </button>
            ))}
          </div>
        </div>

        {/* Dodatkowe filtry */}
        <div className="mb-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="promo_only"
              checked={onlyPromos}
              onChange={(e) => setOnlyPromos(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="promo_only">
              Tylko promocje
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="instock_only"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="instock_only">
              Tylko dostępne
            </label>
          </div>
          <div className="form-check mt-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="freeship_only"
              checked={onlyFreeShipping}
              onChange={(e) => setOnlyFreeShipping(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="freeship_only">
              Tylko darmowa wysyłka
            </label>
          </div>
        </div>

        {/* Sortowanie */}
        <div className="mb-3">
          <h6 className="text-muted">Sortuj</h6>
          <select
            className="form-select"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="rating-desc">Ocena (najwyżej)</option>
            <option value="rating-asc">Ocena (najniżej)</option>
            <option value="price-asc">Cena (rosnąco)</option>
            <option value="price-desc">Cena (malejąco)</option>
            <option value="az">Nazwa (A → Z)</option>
            <option value="za">Nazwa (Z → A)</option>
            <option value="popular">Popularność</option>
            <option value="newest">Najnowsze</option>
          </select>
        </div>

        <div className="d-flex flex-wrap justify-content-between bg-white border-0 pt-0">
          <button
            className="btn btn-sm btn-outline-secondary"
            onClick={handleClear}
          >
            Wyczyść filtry
          </button>
          <div className="text-muted small align-self-center">
            Filtry są przechowywane lokalnie
          </div>
        </div>
      </div>
    </div>
  );
}
