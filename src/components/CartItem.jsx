import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

export default function CartItem({ item }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartQty = useCartStore((state) => state.updateCartQty);

  return (
    <div className="list-group-item">
      <div className="d-flex flex-column flex-md-row align-items-start align-md-items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 100, height: 100, objectFit: "cover", flexShrink: 0 }}
          className="rounded"
        />
        <div className="flex-grow-1 min-width-0">
          <h6 className="fw-bold mb-1">
            {item.name}
            {item.size && (
              <span
                className="badge bg-light text-dark border ms-2"
                style={{ fontSize: "0.7em", verticalAlign: "middle" }}
              >
                {item.size}
              </span>
            )}
          </h6>
          <small className="text-muted d-block mb-2">{item.category}</small>
          <div className="text-success fw-bold">{item.price} PLN / szt.</div>
        </div>

        <div className="d-flex flex-column flex-md-row align-items-start align-md-items-center gap-2 w-100 w-md-auto">
          <div className="input-group flex-shrink-0" style={{ width: "100px" }}>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={() => updateCartQty(item.id, item.qty - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="form-control form-control-sm text-center"
              value={item.qty}
              onChange={(e) =>
                updateCartQty(item.id, Math.max(1, Number(e.target.value)))
              }
              min="1"
            />
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={() => updateCartQty(item.id, item.qty + 1)}
            >
              +
            </button>
          </div>

          <div
            className="text-center flex-shrink-0"
            style={{ minWidth: "70px" }}
          >
            <div className="fw-bold text-success fs-6">
              {(item.price * item.qty).toFixed(2)} PLN
            </div>
            <small className="text-muted">razem</small>
          </div>

          <button
            className="btn btn-sm btn-outline-danger flex-shrink-0"
            onClick={() => removeFromCart(item.id)}
            title="Usuń z koszyka"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
