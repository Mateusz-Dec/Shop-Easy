import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { useCartStore, usePromoDiscount } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useNavigate, Link } from "react-router-dom";
import PromoCode from "../components/PromoCode";

const toastStyles = {
  success: {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
    color: "white",
    padding: "16px 24px",
    borderRadius: "8px",
    boxShadow: "0 8px 16px rgba(76, 175, 80, 0.3)",
    zIndex: 9999,
    animation: "slideIn 0.4s ease-out",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontSize: "1rem",
    fontWeight: "600",
  },
};

const animationStyles = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default function Checkout() {
  const cart = useCartStore((s) => s.cart);
  const addOrder = useCartStore((s) => s.addOrder);
  const clearCart = useCartStore((s) => s.clearCart);
  const appliedPromo = useCartStore((s) => s.appliedPromo);
  const discount = usePromoDiscount();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);
  const subtotal = total - discount;
  const shippingCost = subtotal > 100 ? 0 : 15;
  const finalTotal = subtotal + shippingCost;

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Imię i nazwisko jest wymagane";
    if (!form.email.trim()) newErrors.email = "Email jest wymagany";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Podaj prawidłowy email";
    }
    if (!form.phone.trim()) newErrors.phone = "Numer telefonu jest wymagany";
    if (!/^\d{9,}$/.test(form.phone.replace(/\s|-/g, ""))) {
      newErrors.phone = "Podaj prawidłowy numer telefonu";
    }
    if (!form.address.trim()) newErrors.address = "Adres jest wymagany";
    if (!form.city.trim()) newErrors.city = "Miasto jest wymagane";
    if (!form.zipCode.trim()) newErrors.zipCode = "Kod pocztowy jest wymagany";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handlePay = () => {
    if (!validateForm()) return;

    setLoading(true);
    setShowToast(true);

    // create order snapshot so UI doesn't depend on cart after clearing
    const generatedId = `#${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;
    const order = {
      id: generatedId,
      total: finalTotal,
      customer: form,
      shipping: shippingCost,
      items: cart.map((i) => ({ ...i })),
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      addOrder(order);
      setOrderData(order);

      // clear cart and navigate immediately to orders to avoid empty-cart flash
      clearCart();
      setLoading(false);

      navigate("/orders", { state: { showSuccess: true, orderId: order.id } });
    }, 1500);
  };

  if (cart.length === 0)
    return (
      <div className="container py-5">
        <Link to="/" className="btn btn-outline-primary mb-4">
          <FaArrowLeft /> Powrót do sklepu
        </Link>
        <div className="alert alert-info">Twój koszyk jest pusty.</div>
      </div>
    );

  if (showSuccess) {
    return (
      <>
        <style>{animationStyles}</style>
        <div className="container py-5 text-center">
          <div
            className="bg-white"
            style={{
              borderRadius: "12px",
              padding: "3rem 2rem",
              boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
              animation: "fadeInUp 0.6s ease-out",
              maxWidth: "500px",
              margin: "0 auto",
            }}
          >
            <div
              style={{
                fontSize: "4rem",
                marginBottom: "1.5rem",
                color: "#4caf50",
                animation: "bounce 0.6s ease-out",
              }}
            >
              <FaCheckCircle />
            </div>
            <h2
              style={{
                marginBottom: "1rem",
                color: "#2c3e50",
                fontSize: "1.8rem",
              }}
            >
              Zamówienie złożone!
            </h2>
            <p
              style={{
                color: "#546e7a",
                marginBottom: "1.5rem",
                fontSize: "1.05rem",
                lineHeight: "1.6",
              }}
            >
              Dziękujemy za zakupy!
              <br />
              <small>Przekierowujemy do Twojej historii zamówień...</small>
            </p>
            <p
              style={{
                fontSize: "1.4rem",
                fontWeight: "bold",
                color: "#4caf50",
                marginBottom: "1.5rem",
              }}
            >
              {(orderData?.total ?? finalTotal).toFixed(2)} PLN
            </p>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#90a4ae",
                borderTop: "1px solid #e0e0e0",
                paddingTop: "1rem",
              }}
            >
              Numer zamówienia:{" "}
              <strong style={{ color: "#2c3e50" }}>
                {orderData?.id ??
                  `#${Math.random().toString(36).substr(2, 9).toUpperCase()}`}
              </strong>
            </div>
            <div style={{ marginTop: "1rem" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  // ensure cart is cleared and go to orders immediately
                  if (!orderData) {
                    clearCart();
                  }
                  navigate("/orders");
                }}
              >
                Przejdź do zamówień
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{animationStyles}</style>

      {loading && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            pointerEvents: "auto",
          }}
        >
          <div
            className="bg-white"
            style={{
              padding: "2rem",
              borderRadius: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
              minWidth: "260px",
              boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
              pointerEvents: "auto",
            }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            />
            <div style={{ fontWeight: 700 }}>Przetwarzanie płatności...</div>
            <div
              style={{
                color: "#707c80",
                fontSize: "0.95rem",
                textAlign: "center",
              }}
            >
              Proszę nie odświeżać ani nie zamykać strony.
            </div>
          </div>
        </div>
      )}

      <div className="container py-4">
        <Link to="/cart" className="btn btn-outline-primary mb-4">
          <FaArrowLeft /> Powrót do koszyka
        </Link>

        <div className="row g-4">
          {/* Formularz */}
          <div className="col-lg-8">
            <div
              className="bg-white"
              style={{
                borderRadius: "12px",
                padding: "2rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              }}
            >
              <h2 className="mb-4" style={{ color: "inherit" }}>
                Dane dostawy
              </h2>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label" style={{ fontWeight: "600" }}>
                    Imię i nazwisko *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Jan Kowalski"
                  />
                  {errors.name && (
                    <small
                      style={{
                        color: "#f5576c",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.name}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontWeight: "600" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="jan@example.com"
                  />
                  {errors.email && (
                    <small
                      style={{
                        color: "#f5576c",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.email}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontWeight: "600" }}>
                    Numer telefonu *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="123456789"
                  />
                  {errors.phone && (
                    <small
                      style={{
                        color: "#f5576c",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.phone}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontWeight: "600" }}>
                    Adres *
                  </label>
                  <input
                    type="text"
                    name="address"
                    className={`form-control ${
                      errors.address ? "is-invalid" : ""
                    }`}
                    value={form.address}
                    onChange={handleChange}
                    placeholder="ul. Główna 123"
                  />
                  {errors.address && (
                    <small
                      style={{
                        color: "#f5576c",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.address}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontWeight: "600" }}>
                    Miasto *
                  </label>
                  <input
                    type="text"
                    name="city"
                    className={`form-control ${
                      errors.city ? "is-invalid" : ""
                    }`}
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Warszawa"
                  />
                  {errors.city && (
                    <small
                      style={{
                        color: "#f5576c",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.city}
                    </small>
                  )}
                </div>

                <div className="col-md-6">
                  <label className="form-label" style={{ fontWeight: "600" }}>
                    Kod pocztowy *
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    className={`form-control ${
                      errors.zipCode ? "is-invalid" : ""
                    }`}
                    value={form.zipCode}
                    onChange={handleChange}
                    placeholder="00-000"
                  />
                  {errors.zipCode && (
                    <small
                      style={{
                        color: "#f5576c",
                        display: "block",
                        marginTop: "0.25rem",
                      }}
                    >
                      {errors.zipCode}
                    </small>
                  )}
                </div>
              </div>

              <button
                className="btn btn-primary w-100 mt-4"
                onClick={handlePay}
                disabled={loading || cart.length === 0}
                style={{
                  padding: "0.75rem",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                }}
              >
                {loading
                  ? "Przetwarzanie..."
                  : `Zapłać ${finalTotal.toFixed(2)} PLN`}
              </button>
            </div>
          </div>

          {/* Podsumowanie */}
          <div className="col-lg-4">
            <div
              className="bg-white"
              style={{
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                position: "sticky",
                top: "100px",
              }}
            >
              <h5
                className="mb-4 fw-bold"
                style={{
                  color: "inherit",
                }}
              >
                Podsumowanie zamówienia
              </h5>

              <PromoCode />

              <div
                style={{
                  maxHeight: "300px",
                  overflowY: "auto",
                  borderBottom: "1px solid #e0e0e0",
                  paddingBottom: "1rem",
                  marginBottom: "1rem",
                }}
              >
                {cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: "500" }}>{item.name}</div>
                      <small className="text-muted">
                        {item.qty}x {item.price} PLN
                      </small>
                    </div>
                    <div style={{ fontWeight: "600" }}>
                      {(item.price * item.qty).toFixed(2)} PLN
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span>Produkty:</span>
                  <span>{total.toFixed(2)} PLN</span>
                </div>

                {discount > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                      color: "#4caf50",
                      fontWeight: "600",
                    }}
                  >
                    <span>Rabat ({appliedPromo}):</span>
                    <span>-{discount.toFixed(2)} PLN</span>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.75rem",
                  }}
                >
                  <span>Subtotal:</span>
                  <span>{subtotal.toFixed(2)} PLN</span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    color: shippingCost > 0 ? "#f5576c" : "#4caf50",
                    fontWeight: "600",
                  }}
                >
                  <span>Dostawa:</span>
                  <span>
                    {shippingCost > 0
                      ? `${shippingCost.toFixed(2)} PLN`
                      : "Gratis"}
                  </span>
                </div>
                {shippingCost > 0 && (
                  <small
                    style={{
                      color: "#f5576c",
                      display: "block",
                      marginTop: "0.5rem",
                    }}
                  >
                    Darmowa dostawa od 100 PLN
                  </small>
                )}
              </div>

              <div
                style={{
                  borderTop: "2px solid #e0e0e0",
                  paddingTop: "1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "1.2rem",
                  fontWeight: "700",
                }}
              >
                <span>Razem:</span>
                <span style={{ color: "#4caf50" }}>
                  {finalTotal.toFixed(2)} PLN
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
