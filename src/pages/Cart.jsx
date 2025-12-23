import { Link } from "react-router-dom";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { useCartStore } from "../store/cartStore";
import CartItem from "../components/CartItem";

export default function Cart() {
  const { cart, clearCart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        <FaArrowLeft /> Powrót do sklepu
      </Link>

      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4">
            <h2 className="fw-bold mb-4">Twój koszyk</h2>

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

        <div className="col-md-4">
          <div className="card border-0 shadow-sm p-4 sticky-top">
            <h5 className="fw-bold mb-3">Podsumowanie</h5>

            <div className="d-flex justify-content-between mb-2">
              <span>Ilość artykułów:</span>
              <strong>{cart.length}</strong>
            </div>

            <div className="d-flex justify-content-between mb-3 border-top pt-3">
              <span className="fs-5">Razem:</span>
              <strong className="fs-5 text-success">
                {total.toFixed(2)} PLN
              </strong>
            </div>

            <Link
              to="/checkout"
              className="btn btn-success btn-lg w-100 mb-2"
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
