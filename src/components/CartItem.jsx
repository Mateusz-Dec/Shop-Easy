import React from "react";
import { FaTrash } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";

export default function CartItem({ item }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateCartQty = useCartStore((state) => state.updateCartQty);

  return (
    <div className="list-group-item">
      <div className="d-flex align-items-center gap-3">
        <img
          src={item.image}
          alt={item.name}
          style={{ width: 100, height: 100, objectFit: "cover" }}
          className="rounded"
        />
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-1">{item.name}</h6>
          <small className="text-muted d-block mb-2">{item.category}</small>
          <div className="text-success fw-bold">{item.price} PLN / szt.</div>
        </div>

        <div className="d-flex align-items-center gap-2">
          <div className="input-group" style={{ width: "120px" }}>
            <button
              className="btn btn-sm btn-outline-secondary"
              type="button"
              onClick={() => updateCartQty(item.id, item.qty - 1)}
            >
              -
            </button>
            <input
              type="number"
              className="form-control text-center"
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

          <div className="text-center" style={{ minWidth: "80px" }}>
            <div className="fw-bold text-success">
              {(item.price * item.qty).toFixed(2)} PLN
            </div>
            <small className="text-muted">razem</small>
          </div>

          <button
            className="btn btn-sm btn-outline-danger"
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
