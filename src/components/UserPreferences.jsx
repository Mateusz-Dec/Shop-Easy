import React, { useState, useCallback } from "react";
import { BsGear, BsCheckCircle, BsX } from "react-icons/bs";
import { useCartStore } from "../store/cartStore";
import { notify } from "../lib/notify";

export default function UserPreferences() {
  const [showModal, setShowModal] = useState(false);
  const preferences = useCartStore((s) => s.preferences);
  const setPreference = useCartStore((s) => s.setPreference);

  const handleNotifications = useCallback(
    (enabled) => {
      setPreference("notifications", enabled);
      notify(
        enabled ? "Powiadomienia włączone" : "Powiadomienia wyłączone",
        "info",
      );
    },
    [setPreference],
  );

  return (
    <>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => setShowModal(!showModal)}
        title="Preferencje"
      >
        <BsGear /> Ustawienia
      </button>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="card p-4"
            style={{
              maxWidth: "400px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h5 className="mb-4">Preferencje</h5>

            <div className="mb-4">
              <h6>📢 Powiadomienia:</h6>
              <div className="btn-group w-100" role="group">
                <button
                  className={`btn btn-sm ${
                    preferences.notifications
                      ? "btn-success"
                      : "btn-outline-success"
                  }`}
                  onClick={() => handleNotifications(true)}
                >
                  <BsCheckCircle className="me-1" /> Włączone
                </button>
                <button
                  className={`btn btn-sm ${
                    !preferences.notifications
                      ? "btn-danger"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => handleNotifications(false)}
                >
                  <BsX className="me-1" /> Wyłączone
                </button>
              </div>
              <small className="text-muted d-block mt-2">
                Powiadomienia o promocjach i statusie zamówienia będą
                wyświetlane w górnym rogu
              </small>
            </div>

            <div className="mb-3 p-3 bg-light rounded">
              <small className="text-muted">
                Zaloguj się aby dostać dostęp do więcej opcji
              </small>
            </div>

            <button
              className="btn btn-secondary w-100"
              onClick={() => setShowModal(false)}
            >
              Zamknij
            </button>
          </div>
        </div>
      )}
    </>
  );
}
