import { useState } from "react";
import { notify } from "../lib/notify";

export default function ConnectorWooCommerce() {
  const [url, setUrl] = useState("");
  const [consumer, setConsumer] = useState("");
  const [secret, setSecret] = useState("");

  return (
    <div className="container py-4">
      <h1>WooCommerce Connector (szkic)</h1>
      <p className="text-muted">
        Szkic integracji z WooCommerce. W pełnej wersji zaimplementuj
        autoryzację i mapowanie zasobów.
      </p>
      <div className="card p-3">
        <div className="mb-2">
          <label className="form-label">Store URL</label>
          <input
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://twoj-sklep.pl"
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Consumer Key</label>
          <input
            className="form-control"
            value={consumer}
            onChange={(e) => setConsumer(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label className="form-label">Consumer Secret</label>
          <input
            className="form-control"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={() =>
              notify("Połączenie (placeholder) — wymagane credentials.", "info")
            }
          >
            Connect (placeholder)
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={() => {
              setUrl("");
              setConsumer("");
              setSecret("");
            }}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
