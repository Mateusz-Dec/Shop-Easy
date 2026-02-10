import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const freeShippingThreshold = 100;
  const progress = Math.min((total / freeShippingThreshold) * 100, 100);
  const missingAmount = freeShippingThreshold - total;

  return (
    <div className="container-fluid">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft /> Powrót do sklepu
      </Link>

      <div className="row">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="fw-bold mb-4">Twój koszyk</h2>

            {cart.length > 0 && (
              <div className="mb-4 p-3 bg-light rounded">
                {total >= freeShippingThreshold ? (
                  <div className="text-success fw-bold d-flex align-items-center gap-2">
                    <BsCheckCircle /> Świetnie! Masz darmową dostawę.
                  </div>
                ) : (
                  <div className="mb-2">
                    Brakuje Ci{" "}
                    <strong className="text-primary">
                      {missingAmount.toFixed(2)} PLN
                    </strong>{" "}
                    do darmowej dostawy!
                  </div>
                )}
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className={`progress-bar ${total >= freeShippingThreshold ? "bg-success" : "bg-primary"}`}
                    role="progressbar"
                    style={{
                      width: `${progress}%`,
                      transition: "width 0.5s ease",
                    }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
              </div>
            )}

            {cart.length === 0 ? (
              <div className="alert alert-info text-center">
                <p>Koszyk jest pusty.</p>
                <Link to="/" className="btn btn-primary">
                  Zacznij kupowanie
                </Link>
              </div>
            ) : (
              <div className="list-group">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-3">Podsumowanie</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Ilość artykułów:</span>
              <strong>{cart.length}</strong>
            </div>

            <div className="d-flex justify-content-between mb-3 border-top pt-3">
              <span className="fs-6 fs-lg-5">Razem:</span>
              <strong className="fs-6 fs-lg-5 text-success">
                {total.toFixed(2)} PLN
              </strong>
            </div>

            <Link
              to="/checkout"
              className="btn btn-success w-100 mb-2"
              disabled={cart.length === 0}
            >
              Przejdź do kasy
            </Link>

            {cart.length > 0 && (
              <button
                className="btn btn-outline-danger w-100"
                onClick={clearCart}
              >
                <FaTrash /> Wyczyść koszyk
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
