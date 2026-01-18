import React, { useState } from "react";
import { Link } from "react-router-dom";
import { notify } from "../lib/notify";
import { BsBook } from "react-icons/bs";
function mapExternalItem(item, index) {
  return {
    id: Date.now() + index,
    name: item.title || item.name || "Nowy produkt",
    price: Number(item.price || item.price_usd || 0),
    category: item.category || item.type || "Inne",
    image:
      item.image ||
      item.image_url ||
      "https://via.placeholder.com/400x300?text=No+Image",
    description: item.description || item.desc || "Brak opisu",
    rating: item.rating?.rate || item.rating || 0,
    reviews: item.rating?.count || item.reviews || 0,
    stock: Math.max(1, Math.floor(Math.random() * 15)),
  };
}

export default function Integrations() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [csvName, setCsvName] = useState("");
  const [importHistory, setImportHistory] = useState(() =>
    JSON.parse(localStorage.getItem("importHistory") || "[]")
  );
  const [cwdCsvName, setCwdCsvName] = useState("");

  const fetchDemoStore = async () => {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      const mapped = data.map((d, i) => ({
        ...mapExternalItem(d, i),
        source: "Demo Store",
      }));
      setItems(mapped);
      notify("Pobrano produkty z Demo Store", "info");
    } catch (err) {
      console.error(err);
      notify("Nie udało się pobrać z Demo Store", "warn");
    } finally {
      setLoading(false);
    }
  };

  const importToLocal = () => {
    if (!items.length) return notify("Brak produktów do importu", "warn");
    const existing = JSON.parse(
      localStorage.getItem("externalProducts") || "[]"
    );
    const merged = [
      ...existing,
      ...items.map((it) => ({ ...it, importedAt: new Date().toISOString() })),
    ];
    localStorage.setItem("externalProducts", JSON.stringify(merged));

    // save import history
    const history = JSON.parse(localStorage.getItem("importHistory") || "[]");
    const entry = {
      id: Date.now(),
      date: new Date().toISOString(),
      source: items[0]?.source || cwdCsvName || "CSV",
      count: items.length,
      items: items.map((p) => ({ id: p.id, name: p.name, price: p.price })),
    };
    localStorage.setItem("importHistory", JSON.stringify([entry, ...history]));
    setImportHistory([entry, ...history]);

    notify(`${items.length} produktów zaimportowano lokalnie`, "success");
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Integracje</h1>
        <Link to="/import-history" className="btn btn-sm btn-primary">
          <BsBook style={{ position: "relative", top: "-2px" }} /> Historia
          importów
          <span className="badge bg-white text-dark ms-2">
            {importHistory.length}
          </span>
        </Link>
      </div>

      <div className="card mb-4 p-3">
        <h5>Importer: FakeStore API (przykład)</h5>
        <p className="text-muted">
          Pobiera przykładowe produkty i mapuje do formatu ShopEasy.
        </p>
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary"
            onClick={fetchDemoStore}
            disabled={loading}
          >
            {loading ? "Pobieranie..." : "Pobierz z Demo Store"}
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={importToLocal}
            disabled={!items.length}
          >
            Importuj do lokalnych produktów
          </button>
        </div>

        <div className="mb-2 mt-4">
          <label className="form-label">CSV Importer</label>
          <input
            type="file"
            accept=".csv"
            className="form-control"
            onChange={(e) => {
              const f = e.target.files && e.target.files[0];
              if (!f) return;
              setCsvName(f.name);
              const reader = new FileReader();
              reader.onload = (ev) => {
                const text = ev.target.result;
                const lines = text.split(/\r?\n/).filter(Boolean);
                if (lines.length < 2)
                  return notify("Plik CSV nie zawiera danych", "warn");
                const headers = lines[0]
                  .split(",")
                  .map((h) => h.trim().toLowerCase());
                const rows = lines.slice(1).map((ln) => ln.split(","));
                // use robust CSV parser
                try {
                  import("../lib/csvParser.js").then(({ parseCSV }) => {
                    const rowsParsed = parseCSV(text);
                    if (!rowsParsed.length)
                      return notify(
                        "Plik CSV jest pusty lub niepoprawny",
                        "warn"
                      );
                    const headerRow = rowsParsed[0].map((h) => h.toLowerCase());
                    const dataRows = rowsParsed
                      .slice(1)
                      .filter((r) => r.some((c) => c !== ""));
                    const parsed = dataRows.map((row, idx) => {
                      const obj = {};
                      headerRow.forEach(
                        (h, i) => (obj[h] = row[i] ? row[i].trim() : "")
                      );
                      return {
                        ...mapExternalItem(obj, idx),
                        source: `CSV: ${f.name}`,
                      };
                    });
                    setItems(parsed);
                    setCsvName(f.name);
                    setCwdCsvName(f.name);
                    notify(`Pobrano ${parsed.length} produktów z CSV`, "info");
                  });
                } catch (err) {
                  console.error(err);
                  notify("Błąd parsowania CSV", "warn");
                }
              };
              reader.readAsText(f);
            }}
          />
          {csvName && (
            <small className="text-muted">Załadowano: {csvName}</small>
          )}
        </div>

        <div className="mt-3">
          <strong>Dostępne moduły:</strong>
          <ul>
            <li>Demo Store — pobierz przykładowe produkty (demo)</li>
            <li>
              CSV Importer — załaduj CSV z kolumnami: title, price, category,
              image, description
            </li>
          </ul>

          {/* <div className="card mt-3 p-3">
            <h6 className="mb-2">Propozycje rozbudowy</h6>
            <ul className="mb-0">
              <li>
                Integracje platform e‑commerce (Shopify / WooCommerce) — OAuth i
                mapowanie pól
              </li>
              <li>Harmonogram importów (cron / webhook / scheduler)</li>
              <li>
                Zaawansowane mapowanie pól i transformacje (reguły/skrypty)
              </li>
              <li>Raportowanie importów, rollback i detekcja konfliktów</li>
            </ul>
          </div> */}
        </div>
      </div>

      <h4>Podgląd zaimportowanych</h4>
      {items.length === 0 ? (
        <div className="alert alert-info">Brak pobranych produktów.</div>
      ) : (
        <div className="row">
          {items.map((p) => (
            <div key={p.id} className="col-md-4 mb-3">
              <div className="card h-100 p-2 product-card">
                <img
                  src={p.image}
                  alt={p.name}
                  style={{
                    height: 140,
                    objectFit: "cover",
                    borderRadius: 6,
                    cursor: "zoom-in",
                  }}
                  onClick={() =>
                    window.dispatchEvent(
                      new CustomEvent("shopeasy-open-image", {
                        detail: { src: p.image, alt: p.name },
                      })
                    )
                  }
                />
                <div className="p-2">
                  <h6 className="mb-1">{p.name}</h6>
                  <small className="text-muted">
                    {p.category} • {p.source}
                  </small>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <strong>{p.price} PLN</strong>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-primary me-1"
                        onClick={() => {
                          const existing = JSON.parse(
                            localStorage.getItem("externalProducts") || "[]"
                          );
                          localStorage.setItem(
                            "externalProducts",
                            JSON.stringify([...existing, p])
                          );
                          notify("Produkt dodany lokalnie", "success");
                        }}
                      >
                        Dodaj
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => {
                          try {
                            const cmp = JSON.parse(
                              localStorage.getItem("shopeasy-compare") || "[]"
                            );
                            const payload = cmp.length
                              ? JSON.parse(cmp)[1]
                              : null; // ignore internal structure; use store directly instead below
                          } catch (e) {}
                          window.dispatchEvent(
                            new CustomEvent("shopeasy-compare-add", {
                              detail: { product: p },
                            })
                          );
                          notify("Dodano do porównania", "info");
                        }}
                      >
                        Porównaj
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h4 className="mt-4">Historia importów</h4>
      {importHistory.length === 0 ? (
        <div className="alert alert-secondary">
          Brak wcześniejszych importów.
        </div>
      ) : (
        <div className="list-group mb-4">
          {importHistory.map((h) => (
            <div
              key={h.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
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
                  onClick={() => {
                    // re-import items to externalProducts
                    const existing = JSON.parse(
                      localStorage.getItem("externalProducts") || "[]"
                    );
                    const itemsToAdd = h.items.map((it) => ({
                      ...it,
                      id: Date.now() + Math.random() * 1000,
                    }));
                    localStorage.setItem(
                      "externalProducts",
                      JSON.stringify([...existing, ...itemsToAdd])
                    );
                    notify("Import ponowny zakończony", "success");
                  }}
                >
                  Importuj ponownie
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => {
                    const remaining = importHistory.filter(
                      (x) => x.id !== h.id
                    );
                    setImportHistory(remaining);
                    localStorage.setItem(
                      "importHistory",
                      JSON.stringify(remaining)
                    );
                    notify("Wpis usunięto z historii", "info");
                  }}
                >
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
