import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Polityka prywatności</h1>
      <p className="text-muted">
        Krótki tekst o polityce prywatności (demo). W produkcyjnej aplikacji
        tutaj powinny znaleźć się szczegółowe informacje o przetwarzaniu danych
        osobowych.
      </p>
    </div>
  );
}
