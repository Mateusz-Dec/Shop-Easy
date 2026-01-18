import { Link, useLocation } from "react-router-dom";
import { FaArrowLeft, FaBox } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

export default function Orders() {
  const orders = useCartStore((state) => state.orders);
  const location = useLocation();
  const [justOrdered, setJustOrdered] = useState(false);
  const [highlightId, setHighlightId] = useState(null);

  useEffect(() => {
    if (location.state && location.state.showSuccess) {
      setJustOrdered(true);
      setHighlightId(location.state.orderId ?? null);
      try {
        window.dispatchEvent(
          new CustomEvent("shopeasy-toast", {
            detail: {
              message: "Płatność zakończona pomyślnie",
              type: "success",
            },
          })
        );
      } catch (err) {}

      const t = setTimeout(() => setJustOrdered(false), 2500);
      return () => clearTimeout(t);
    }
  }, [location.state]);

  return (
    <div className="container-fluid">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft /> Powrót do sklepu
      </Link>

      <h1 className="mb-4">Historia zamówień</h1>

      {justOrdered && (
        <div className="mb-4">
          <div className="alert alert-success d-flex align-items-center justify-content-between">
            <div>
              <strong>✓ Twoje zamówienie zostało złożone.</strong>
              <div className="small text-muted">
                Możesz zobaczyć szczegóły poniżej.
              </div>
            </div>
            <Link to="/orders" className="btn btn-sm btn-outline-light" />
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          <p>Nie masz jeszcze żadnych zamówień.</p>
          <Link to="/" className="btn btn-primary">
            Zacznij kupowanie
          </Link>
        </div>
      ) : (
        <div className="list-group">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`list-group-item ${
                highlightId === order.id
                  ? "border border-3 border-primary shadow-sm"
                  : ""
              }`}
            >
              <div className="d-flex w-100 justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">
                    <FaBox /> Zamówienie #{order.id}
                  </h5>
                  <p className="mb-1 text-muted">
                    Data: {new Date(order.date).toLocaleDateString("pl-PL")}
                  </p>
                  <small className="text-muted">
                    {order.items.length} artykuł(ów)
                  </small>
                </div>
                <h6 className="text-success">{order.total.toFixed(2)} PLN</h6>
              </div>
              <div className="mt-2">
                {order.items.slice(0, 2).map((item) => (
                  <small key={item.id} className="d-block text-muted">
                    • {item.name} x{item.qty}
                  </small>
                ))}
                {order.items.length > 2 && (
                  <small className="text-muted">
                    + {order.items.length - 2} więcej...
                  </small>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
