import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";

export default function QuickView() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((s) => s.addToCart);

  useEffect(() => {
    const handler = (e) => {
      setProduct(e.detail.product);
      setOpen(true);
    };
    window.addEventListener("shopeasy-open-quickview", handler);

    const esc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", esc);

    return () => {
      window.removeEventListener("shopeasy-open-quickview", handler);
      window.removeEventListener("keydown", esc);
    };
  }, []);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product);
    try {
      window.dispatchEvent(
        new CustomEvent("shopeasy-toast", {
          detail: {
            message: `${product.name} dodano do koszyka`,
            type: "success",
          },
        })
      );
    } catch (err) {}
  };

  if (!open || !product) return null;

  const price =
    product.sale && product.discountedPrice
      ? product.discountedPrice
      : product.price;

  return (
    <div className="quickview-overlay" onClick={() => setOpen(false)}>
      <div
        className="quickview-card card shadow-sm p-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-7 p-3 d-flex flex-column">
            <h5 className="mb-1">{product.name}</h5>
            <div className="mb-2 text-muted small">
              {product.category} • {product.rating}★ ({product.reviews})
            </div>
            <div className="mb-3">
              {product.sale && product.discountedPrice ? (
                <div>
                  <small
                    className="text-muted"
                    style={{ textDecoration: "line-through" }}
                  >
                    {product.price} PLN
                  </small>
                  <div className="h5 text-success">
                    {product.discountedPrice} PLN
                  </div>
                </div>
              ) : (
                <div className="h5 text-success">{price} PLN</div>
              )}
            </div>

            <p className="text-muted flex-grow-1">{product.description}</p>

            <div className="d-flex gap-2">
              <button className="btn btn-primary" onClick={handleAdd}>
                <BsCart3 /> Dodaj do koszyka
              </button>

              <Link
                to={`/product/${product.id}`}
                className="btn btn-outline-primary"
                onClick={() => setOpen(false)}
              >
                Zobacz szczegóły
              </Link>

              <button
                className="btn btn-outline-secondary ms-auto"
                onClick={() => setOpen(false)}
              >
                Zamknij
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
