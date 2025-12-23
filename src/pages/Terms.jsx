import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Warunki użytkowania</h1>
      <p className="text-muted">
        Przykładowe warunki użytkowania. W wersji produkcyjnej umieść tutaj
        szczegóły dotyczące korzystania ze sklepu, zwrotów i odpowiedzialności.
      </p>
    </div>
  );
}
