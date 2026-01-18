import { useEffect, useState } from "react";
import { notify } from "../lib/notify";
import { Link } from "react-router-dom";

export default function ImportHistory() {
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem("importHistory") || "[]")
  );
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("importHistory") || "[]"));
  }, []);

  const onDelete = (id) => {
    const remaining = history.filter((h) => h.id !== id);
    setHistory(remaining);
    localStorage.setItem("importHistory", JSON.stringify(remaining));
    notify("Wpis usunięto z historii", "info");
  };

  const onReimport = (entry) => {
    const existing = JSON.parse(
      localStorage.getItem("externalProducts") || "[]"
    );
    const itemsToAdd = entry.items.map((it) => ({
      ...it,
      id: Date.now() + Math.random() * 1000,
    }));
    localStorage.setItem(
      "externalProducts",
      JSON.stringify([...existing, ...itemsToAdd])
    );
    notify("Import ponowny zakończony", "success");
  };

  const list = history.filter((h) =>
    filter === "all" ? true : h.source === filter
  );

  const sources = Array.from(new Set(history.map((h) => h.source))).filter(
    Boolean
  );

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Historia importów</h1>
        <div>
          <Link to="/integrations" className="btn btn-outline-secondary me-2">
            Powrót do integracji
          </Link>
        </div>
      </div>

      <div className="card p-3 mb-3">
        <div className="d-flex gap-2 align-items-center">
          <label className="mb-0">Filtr:</label>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ maxWidth: 240 }}
          >
            <option value="all">Wszystkie</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {list.length === 0 ? (
        <div className="alert alert-secondary">Brak wpisów w historii.</div>
      ) : (
        <div className="list-group">
          {list.map((h) => (
            <div key={h.id} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div style={{ fontWeight: 700 }}>{h.source}</div>
                  <small className="text-muted">
                    {new Date(h.date).toLocaleString("pl-PL")} • {h.count}{" "}
                    produktów
                  </small>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onReimport(h)}
                  >
                    Importuj ponownie
                  </button>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2"
                    onClick={() => setSelected(h)}
                  >
                    Podgląd
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDelete(h.id)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
              {selected && selected.id === h.id && (
                <div className="mt-2">
                  <ul className="list-unstyled">
                    {h.items.map((it) => (
                      <li key={it.id} className="py-1">
                        {it.name} — {it.price} PLN
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
