import React from "react";
import { useCompareStore } from "../store/compareStore";
import { Link } from "react-router-dom";

export default function Compare() {
  const items = useCompareStore((s) => s.items);
  const remove = useCompareStore((s) => s.remove);
  const clear = useCompareStore((s) => s.clear);

  if (items.length === 0)
    return (
      <div className="container py-5 text-center">
        <h3>Brak produktów do porównania</h3>
        <p className="text-muted">
          Dodaj produkty do porównania, np. z listy produktów.
        </p>
        <Link to="/" className="btn btn-primary">
          Powrót do sklepu
        </Link>
      </div>
    );

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Porównanie produktów</h2>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={clear}>
            Wyczyść
          </button>
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => {
              const headers = [
                "Nazwa",
                "Cena",
                "Kategoria",
                "Dostępność",
                "Ocena",
                "Opinie",
                "Źródło",
                "Opis",
              ];
              const rows = items.map((p) =>
                [
                  '"' + (p.name || "") + '"',
                  p.price || "",
                  '"' + (p.category || "") + '"',
                  p.stock || "",
                  p.rating || "",
                  p.reviews || "",
                  '"' + (p.source || "") + '"',
                  '"' + (p.description || "") + '"',
                ].join(",")
              );
              const csv = [headers.join(","), ...rows].join("\n");
              const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "compare-export.csv";
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            }}
          >
            Eksportuj CSV
          </button>
          <Link to="/cart" className="btn btn-primary">
            Przejdź do koszyka
          </Link>
        </div>
      </div>

      <div className="row">
        {items.map((p) => (
          <div key={p.id} className="col-md-4 mb-3">
            <div className="card p-3 h-100">
              <img
                src={p.image}
                alt={p.name}
                style={{
                  height: 160,
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
              <h5 className="mt-2">{p.name}</h5>
              <small className="text-muted">{p.category}</small>
              <div className="mt-2 d-flex justify-content-between align-items-center">
                <strong>{p.price} PLN</strong>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => remove(p.id)}
                >
                  Usuń
                </button>
              </div>

              {p.rating && (
                <div className="mt-2">
                  Ocena: {p.rating} / 5 • {p.reviews || 0} opinii
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="card p-3 mt-3">
        <h6>Porównanie szybkie:</h6>
        <table className="table">
          <thead>
            <tr>
              <th></th>
              {items.map((p) => (
                <th key={p.id}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Cena</td>
              {items.map((p) => (
                <td key={p.id}>{p.price} PLN</td>
              ))}
            </tr>
            <tr>
              <td>Kategoria</td>
              {items.map((p) => (
                <td key={p.id}>{p.category}</td>
              ))}
            </tr>
            <tr>
              <td>Dostępność</td>
              {items.map((p) => (
                <td key={p.id}>{p.stock || "—"}</td>
              ))}
            </tr>
            <tr>
              <td>Ocena</td>
              {items.map((p) => (
                <td key={p.id}>{p.rating ?? "—"}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
