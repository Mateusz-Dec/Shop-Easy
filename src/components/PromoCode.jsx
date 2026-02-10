import React, { useState } from "react";
import { FaTag, FaTimes } from "react-icons/fa";
import { BsCheckCircle } from "react-icons/bs";
import { useCartStore, PROMO_CODES } from "../store/cartStore";
import { notify } from "../lib/notify";

export default function PromoCode() {
  const [code, setCode] = useState("");
  const [showList, setShowList] = useState(false);
  const appliedPromo = useCartStore((s) => s.appliedPromo);
  const applyPromoCode = useCartStore((s) => s.applyPromoCode);
  const removePromoCode = useCartStore((s) => s.removePromoCode);

  const handleApply = (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    const result = applyPromoCode(code);
    if (result.success) {
      notify(`Kod "${code.toUpperCase()}" zastosowany!`, "success");
      setCode("");
    } else {
      notify(result.message, "warn");
    }
  };

  return (
    <div className="mb-4">
      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex align-items-center gap-2 mb-2">
          <FaTag size={18} />
          <h6 className="mb-0">Kod promocyjny</h6>
        </div>

        {appliedPromo ? (
          <div className="alert alert-success mb-0 d-flex justify-content-between align-items-center">
            <span>
              <BsCheckCircle className="me-2" style={{ display: "inline" }} />
              Kod <strong>{appliedPromo}</strong> aktywny
            </span>
            <button
              className="btn btn-sm btn-close"
              onClick={() => {
                removePromoCode();
                notify("Kod usunięty", "info");
              }}
            />
          </div>
        ) : (
          <>
            <form onSubmit={handleApply} className="mb-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Wpisz kod..."
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                />
                <button className="btn btn-primary" type="submit">
                  Zastosuj
                </button>
              </div>
            </form>

            <button
              className="btn btn-sm btn-outline-secondary w-100"
              onClick={() => setShowList(!showList)}
            >
              {showList ? "Ukryj dostępne kody" : "Pokaż dostępne kody"}
            </button>

            {showList && (
              <div className="mt-2 p-2 bg-light rounded">
                <small className="text-muted d-block mb-2">
                  <strong>Dostępne kody:</strong>
                </small>
                <div className="list-unstyled">
                  {Object.entries(PROMO_CODES).map(([k, v]) => (
                    <div key={k} className="mb-1 p-2 bg-white rounded">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center gap-3">
                          <code
                            className="text-primary fw-bold"
                            style={{ minWidth: "90px" }}
                          >
                            {k}
                          </code>
                          <span className="badge bg-success">
                            {v.type === "percent"
                              ? `${v.discount}%`
                              : `${v.discount}zł`}
                          </span>
                        </div>
                        <button
                          className="btn btn-sm btn-outline-primary py-0"
                          onClick={() => {
                            const result = applyPromoCode(k);
                            if (result.success) {
                              notify(`Kod "${k}" zastosowany!`, "success");
                              setCode("");
                            } else {
                              notify(result.message, "warn");
                            }
                          }}
                        >
                          Użyj
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
