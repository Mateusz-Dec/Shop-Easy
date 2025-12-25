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
        Jesteśmy internetowym sklepem oferującym praktyczne akcesoria i
        elektronikę użytkową. W naszym asortymencie znajdziesz słuchawki,
        powerbanki, torby, gadżety do domu i inne przydatne produkty — starannie
        wybrane pod kątem jakości i funkcjonalności.
      </p>
      <h5 className="mt-4">Co oferujemy</h5>
      <p className="text-muted">
        Szybką wysyłkę, bezpieczne płatności i prosty proces zwrotu. Stawiamy na
        dobrą obsługę klienta i regularne promocje — wszystko po to, by zakupy
        były wygodne i satysfakcjonujące.
      </p>
    </div>
  );
}
