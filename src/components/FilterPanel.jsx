import { useState } from "react";

export default function FilterPanel({ onFilterChange, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating-desc");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilterChange({ category, priceRange, minRating, sortBy });
  };

  const handlePriceChange = (e) => {
    const newPrice = [0, parseInt(e.target.value)];
    setPriceRange(newPrice);
    onFilterChange({
      category: selectedCategory,
      priceRange: newPrice,
      minRating,
      sortBy,
    });
  };

  const handleRatingChange = (rating) => {
    setMinRating(rating);
    onFilterChange({
      category: selectedCategory,
      priceRange,
      minRating: rating,
      sortBy,
    });
  };

  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortBy(val);
    onFilterChange({
      category: selectedCategory,
      priceRange,
      minRating,
      sortBy: val,
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-3">Filtry</h5>

        {/* Kategorie */}
        <div className="mb-4">
          <h6 className="text-muted">Kategoria</h6>
          <div className="btn-group-vertical w-100" role="group">
            <button
              type="button"
              className={`btn btn-outline-primary text-start ${
                selectedCategory === "all" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              Wszystkie
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`btn btn-outline-primary text-start ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
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
            <option value="newest">Najnowsze</option>
          </select>
        </div>
      </div>
    </div>
  );
}
