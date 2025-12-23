import React from "react";
import { Link } from "react-router-dom";

export default function Cookies() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Polityka cookies</h1>
      <p className="text-muted">
        Ta strona korzysta z plików cookie w celach demonstracyjnych. W
        rzeczywistym sklepie opisz tutaj jakich cookie używasz i jak je
        wyłączyć.
      </p>
    </div>
  );
}
