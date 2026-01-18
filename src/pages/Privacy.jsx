import React from "react";
import { Link } from "react-router-dom";

export default function Privacy() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Polityka prywatności</h1>
      <div className="mt-4">
        <h5>1. Informacje ogólne</h5>
        <p>
          ShopEasy szanuje prywatność swoich użytkowników. Niniejsza polityka prywatności opisuje, w jaki sposób zbieramy, wykorzystujemy i chronimy Twoje dane osobowe.
        </p>

        <h5>2. Zbieranie danych</h5>
        <p>
          Zbieramy dane niezbędne do realizacji zamówień, takie jak imię, adres e-mail, numer telefonu i adres dostawy. Dane zbierane są również w celu poprawy jakości naszych usług i personalizacji doświadczenia użytkownika.
        </p>

        <h5>3. Wykorzystanie danych</h5>
        <p>
          Twoje dane osobowe wykorzystujemy wyłącznie w celach związanych z obsługą zamówień, komunikacją z Tobą oraz doskonaleniem naszych usług. Nie sprzedajemy ani nie udostępniamy Twoich danych osobowych trzecim stronom bez Twojej zgody.
        </p>

        <h5>4. Bezpieczeństwo danych</h5>
        <p>
          Stosujemy odpowiednie środki techniczne i organizacyjne w celu ochrony Twoich danych osobowych przed nieautoryzowanym dostępem, zmianą lub zniszczeniem.
        </p>

        <h5>5. Prawa użytkownika</h5>
        <p>
          Masz prawo dostępu do swoich danych osobowych, żądania ich poprawy lub usunięcia. W celu skorzystania z tych praw prosimy o kontakt na adres e-mail podany w stopce strony.
        </p>

        <h5>6. Zmiany w polityce</h5>
        <p>
          Zastrzegamy sobie prawo do wprowadzania zmian w polityce prywatności. O znaczących zmianach poinformujemy Cię poprzez umieszczenie powiadomienia na naszej stronie.
        </p>
      </div>
    </div>
  );
}
