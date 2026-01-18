import React from "react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <div className="container py-5">
      <Link to="/" className="btn btn-outline-secondary mb-3">
        Powrót
      </Link>
      <h1>Warunki użytkowania</h1>
      <div className="mt-4">
        <h5>1. Postanowienia ogólne</h5>
        <p>
          Niniejsze warunki użytkowania regulują korzystanie ze strony ShopEasy. Korzystając z naszej strony, akceptujesz wszystkie warunki zawarte w niniejszym dokumencie.
        </p>

        <h5>2. Konto użytkownika</h5>
        <p>
          Użytkownik odpowiada za dokładność informacji podanych podczas rejestracji. Ponadto odpowiada za zachowanie poufności swoich danych dostępowych i za wszystkie działania podejmowane na jego koncie.
        </p>

        <h5>3. Składanie zamówień</h5>
        <p>
          Wszystkie zamówienia podlegają akceptacji przez ShopEasy. Zastrzegamy sobie prawo do odrzucenia lub anulowania dowolnego zamówienia bez podania przyczyny.
        </p>

        <h5>4. Ceny i dostępność</h5>
        <p>
          Ceny produktów mogą ulegać zmianom bez wcześniejszego powiadomienia. Jesteśmy zobowiązani do utrzymania dokładnych informacji o dostępności produktów, jednak mogą one ulec zmianie w każdej chwili.
        </p>

        <h5>5. Dostarczanie produktów</h5>
        <p>
          Terminy dostawy podane są orientacyjne. ShopEasy dołoży wszelkich starań, aby dostarczyć produkty w określonym czasie, jednak nie odpowiada za opóźnienia spowodowane okolicznościami niezależnymi.
        </p>

        <h5>6. Zwroty i reklamacje</h5>
        <p>
          Produkty mogą być zwrócone w ciągu 14 dni od daty dostawy, o ile są w stanie niezużytym. Pełne informacje dotyczące procedury zwrotu dostępne są w centrum pomocy.
        </p>

        <h5>7. Ograniczenie odpowiedzialności</h5>
        <p>
          ShopEasy nie odpowiada za straty wynikające z korzystania ze strony, produktów lub usług, w tym za szkody pośrednie, przypadkowe lub wdrażające się. Całkowita odpowiedzialność nie przekracza ceny zapłaconej za zamówienie.
        </p>

        <h5>8. Zmiana warunków</h5>
        <p>
          Zastrzegamy sobie prawo do zmiany warunków użytkowania w dowolnym momencie. Korzystanie ze strony po zmianach oznacza akceptację nowych warunków.
        </p>

        <h5>9. Kontakt</h5>
        <p>
          W przypadku pytań dotyczących warunków użytkowania, prosimy o kontakt poprzez formularz kontaktowy dostępny na naszej stronie.
        </p>
      </div>
    </div>
  );
}
