import React, { useMemo, memo } from "react";
import ProductCard from "./ProductCard";
import { BsBoxSeam } from "react-icons/bs";

// Hardcoded combinations - produkty które są kupowane razem
const BUNDLE_RECOMMENDATIONS = {
  1: [2, 3, 5], // Kamera sportowa -> akcesoria
  2: [1, 4, 6],
  3: [1, 2, 7],
  4: [5, 6, 8],
  5: [1, 3, 4],
};

const BundleRecommendations = memo(function BundleRecommendations({
  currentProductId,
  allProducts,
}) {
  const recommendations = useMemo(() => {
    const bundleIds = BUNDLE_RECOMMENDATIONS[currentProductId];
    if (!bundleIds) return [];

    return bundleIds
      .map((id) => allProducts.find((p) => p.id === id))
      .filter(Boolean)
      .slice(0, 3);
  }, [currentProductId, allProducts]);

  if (recommendations.length === 0) return null;

  return (
    <div className="p-4 bg-light rounded">
      <h5 className="mb-4 d-flex align-items-center gap-2">
        <BsBoxSeam size={20} /> Produkty często kupowane razem
      </h5>
      <div className="row g-4">
        {recommendations.map((product) => (
          <div key={product.id} className="col-12 col-sm-6 col-md-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
      <small className="text-muted d-block mt-4">
        Klienci, którzy kupili ten produkt, kupili również te artykuły.
      </small>
    </div>
  );
});

export default BundleRecommendations;
