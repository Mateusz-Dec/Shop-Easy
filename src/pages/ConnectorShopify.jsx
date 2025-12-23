import { useState } from "react";
import { notify } from "../lib/notify";

export default function ConnectorShopify() {
  const [store, setStore] = useState("");
  const [token, setToken] = useState("");

  return (
    <div className="container py-4">
      <h1>Shopify Connector (szkic)</h1>
      <p className="text-muted">
        To jest szkielet integracji z Shopify — dodaj swoje dane, aby dalej
        testować. Pełna implementacja wymaga OAuth i mapowania pól.
      </p>
      <div className="card p-3">
        <div className="mb-2">
          <label className="form-label">Store URL</label>
          <input
            className="form-control"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder="twoj-store.myshopify.com"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">API Key / Access Token</label>
          <input
            className="form-control"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() =>
              notify("Połączenie (placeholder) — wymagane OAuth.", "info")
            }
          >
            Connect (placeholder)
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setStore("");
              setToken("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
