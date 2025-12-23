import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>O nas</h1>
      <p className="text-muted">
        ShopEasy to prosty sklep demo stworzony jako przykład projektu. Naszym
        celem jest pokazanie jak zbudować przyjemny interfejs, prostą integrację
        z importami produktów oraz wygodne doświadczenie zakupowe.
      </p>
      <h5 className="mt-4">Nasza misja</h5>
      <p className="text-muted">
        Dostarczać przejrzyste, responsywne i proste rozwiązania e-commerce,
        które można rozbudowywać i integrować z zewnętrznymi systemami.
      </p>
    </div>
  );
}
