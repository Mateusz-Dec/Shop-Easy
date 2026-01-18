import React from "react";
import { Link } from "react-router-dom";

export default function Cookies() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Polityka cookies</h1>
      <div className="mt-4">
        <h5>1. Czym są pliki cookie?</h5>
        <p>
          Pliki cookie to małe pliki tekstowe przechowywane na urządzeniu użytkownika. Pomagają nam w personalizacji doświadczenia użytkownika i analizie ruchu na stronie.
        </p>

        <h5>2. Typy używanych cookie</h5>
        <p>
          <strong>Cookies niezbędne:</strong> Wymagane do prawidłowego działania strony, takie jak dane sesji i informacje o koszyku.
        </p>
        <p>
          <strong>Cookies analityczne:</strong> Pomagają nam zrozumieć, jak użytkownicy korzystają z naszej strony.
        </p>
        <p>
          <strong>Cookies preferencji:</strong> Pamiętają Twoje ustawienia, takie jak wybór tematu (jasny/ciemny).
        </p>

        <h5>3. Kontrola cookie</h5>
        <p>
          Większość przeglądarek internetowych pozwala na kontrolę plików cookie. Możesz je akceptować, odrzucać lub usuwać. Jednak wyłączenie niektórych cookie może wpłynąć na funkcjonalność strony.
        </p>

        <h5>4. Przechowywanie danych</h5>
        <p>
          Używamy localStorage do przechowywania informacji o Twoim koszyku, ulubionych produktach i preferencjach. Te dane przechowywane są lokalnie na Twoim urządzeniu.
        </p>

        <h5>5. Kontakt</h5>
        <p>
          Jeśli masz pytania dotyczące naszej polityki cookies, skontaktuj się z nami poprzez formularz kontaktowy dostępny na naszej stronie.
        </p>
      </div>
    </div>
  );
}
