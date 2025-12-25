import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import Rating from "../components/Rating";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Wishlist() {
  const favorites = useCartStore((state) => state.favorites);
  const toggleFavorite = useCartStore((state) => state.toggleFavorite);
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="container">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft /> Powrót do sklepu
      </Link>

      <h1 className="mb-4">Moje ulubione ({favorites.length})</h1>

      {favorites.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>Nie masz jeszcze żadnych ulubionych produktów.</p>
          <Link to="/" className="btn btn-primary">
            Przeglądaj produkty
          </Link>
        </div>
      ) : (
        <div className="row">
          {favorites.map((product) => (
            <div key={product.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.name}</h5>
                  <small className="text-muted mb-2">{product.category}</small>
                  {product.rating && (
                    <Rating rating={product.rating} reviews={product.reviews} />
                  )}
                  <p className="card-text text-muted flex-grow-1">
                    {product.description}
                  </p>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <h6 className="mb-0 text-success">{product.price} PLN</h6>
                    <div className="btn-group" role="group">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => {
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
                          } catch (e) {}
                        }}
                      >
                        <BsCart3 /> Koszyk
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                          toggleFavorite(product);
                          try {
                            window.dispatchEvent(
                              new CustomEvent("shopeasy-toast", {
                                detail: {
                                  message: `${product.name} usunięto z ulubionych`,
                                  type: "info",
                                },
                              })
                            );
                          } catch (e) {}
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
