import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsCart3, BsEye } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import Rating from "./Rating";
import { useState } from "react";

export default function ProductCard({ product }) {
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const addToCart = useCartStore((state) => state.addToCart);
  const isFavorited = useCartStore((state) =>
    state.favorites.some((p) => p.id === product.id),
  );
  const [isFavorite, setIsFavorite] = useState(isFavorited);

  const handleToggleFavorite = () => {
    toggleFavorite(product);
    setIsFavorite(!isFavorite);
    try {
      window.dispatchEvent(
        new CustomEvent("shopeasy-toast", {
          detail: {
            message: isFavorite
              ? `${product.name} usunięto z ulubionych`
              : `${product.name} dodano do ulubionych`,
            type: "info",
          },
        }),
      );
    } catch (err) {}
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    try {
      window.dispatchEvent(
        new CustomEvent("shopeasy-toast", {
          detail: {
            message: `${product.name} dodano do koszyka`,
            type: "success",
          },
        }),
      );
    } catch (err) {}
  };

  return (
    <div className="card border-0 shadow-sm h-100 position-relative product-card">
      <div className="position-absolute top-0 end-0 p-2 z-3">
        <button
          className="btn btn-sm rounded-circle"
          style={{
            backgroundColor: isFavorite ? "#ff6b6b" : "#e9ecef",
            border: "none",
          }}
          onClick={handleToggleFavorite}
          title={isFavorite ? "Usuń z ulubionych" : "Dodaj do ulubionych"}
        >
          {isFavorite ? (
            <FaHeart size={16} style={{ color: "white" }} />
          ) : (
            <FaRegHeart size={16} style={{ color: "#666" }} />
          )}
        </button>
      </div>

      {/* Badges: promocja / nowość / darmowa wysyłka */}
      <div className="position-absolute top-0 start-0 p-2 z-3 d-flex flex-column align-items-start gap-1">
        {product.sale && <span className="badge bg-danger">Promocja</span>}
        {product.isNew && <span className="badge bg-success">Nowość</span>}
        {(product.sale && product.discountedPrice
          ? product.discountedPrice
          : product.price) >= 100 && (
          <span className="badge bg-warning text-dark">Darmowa wysyłka</span>
        )}
      </div>

      <img
        src={product.image}
        className="card-img-top rounded-top"
        style={{ height: "200px", objectFit: "cover", cursor: "zoom-in" }}
        alt={product.name}
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("shopeasy-open-image", {
              detail: { src: product.image, alt: product.name },
            }),
          )
        }
      />

      <div className="card-body d-flex flex-column">
        <h5 className="fw-bold mb-2">{product.name}</h5>
        <small className="text-muted mb-2">{product.category}</small>

        {product.rating && (
          <div className="mb-2">
            <Rating rating={product.rating} reviews={product.reviews} />
          </div>
        )}

        <p className="text-muted small flex-grow-1 mb-2">
          {product.description}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <div>
            {product.sale && product.discountedPrice ? (
              <div>
                <small
                  className="text-muted"
                  style={{ textDecoration: "line-through" }}
                >
                  {product.price} PLN
                </small>
                <div className="h6 mb-0 text-success fw-bold">
                  {product.discountedPrice} PLN
                </div>
              </div>
            ) : (
              <h6 className="mb-0 text-success fw-bold">{product.price} PLN</h6>
            )}
          </div>

          {product.stock > 0 ? (
            <small className="text-success">Na magazynie</small>
          ) : (
            <small className="text-danger">Brak</small>
          )}
        </div>

        <div className="d-grid gap-2 w-100 mt-3">
          <Link
            className="btn btn-primary btn-sm"
            to={`/product/${product.id}`}
          >
            Szczegóły
          </Link>
          <div className="d-flex gap-2">
            <button
              className="btn btn-outline-secondary btn-sm flex-grow-1"
              onClick={(e) => {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent("shopeasy-open-quickview", {
                    detail: { product },
                  }),
                );
              }}
              title="Szybki podgląd"
            >
              <BsEye size={14} className="me-1" /> Podgląd
            </button>
            <button
              className="btn btn-primary btn-sm flex-grow-1"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              <BsCart3 size={14} /> Dodaj
            </button>
            <button
              className="btn btn-outline-secondary btn-sm flex-grow-1"
              onClick={() => {
                window.dispatchEvent(
                  new CustomEvent("shopeasy-compare-add", {
                    detail: { product },
                  }),
                );
                try {
                  window.dispatchEvent(
                    new CustomEvent("shopeasy-toast", {
                      detail: {
                        message: "Dodano do porównania",
                        type: "info",
                      },
                    }),
                  );
                } catch (err) {}
              }}
            >
              Porównaj
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
