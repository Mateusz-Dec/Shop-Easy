# ShopEasy — prosty sklep demo

ShopEasy to demonstracyjna aplikacja sklepu zbudowana w React + Vite. Projekt pokazuje prostą architekturę SPA, lokalny store (Zustand), import produktów oraz podstawowe ścieżki zakupowe.

## Funkcjonalności (w skrócie)

- Lista produktów z filtrowaniem, sortowaniem i paginacją typu infinite-scroll
- Szczegóły produktu, oceny, zdjęcia i dostępność
- Koszyk (persist w localStorage), modyfikacja ilości, usuwanie pozycji
- Checkout z walidacją formularza, symulacją płatności i historią zamówień
- Ulubione (wishlist) i powiadomienia (toast)
- Integracje: Demo Store importer, CSV importer (import lokalny)
- Prosty mechanizm porównywania podobnych produktów (w szczegółach produktu)

---

# Spis treści

- [Funkcjonalności](#funkcjonalności)
- [Szybki start](#szybki-start)
- [Skrypty](#skrypty)
- [Struktura projektu](#struktura-projektu)
- [Dane i import](#dane-i-import)
- [Testy](#testy)
- [Rozwój i rozszerzenia](#rozwój-i-rozszerzenia)
- [Licencja i wkład](#licencja-i-wkład)

---

## Funkcjonalności ✨

- Wyświetlanie listy produktów z filtrowaniem i sortowaniem
- Szczegóły produktu z galerią, opisem, ratingiem i dostępnością
- Koszyk z persistencją w `localStorage`, modyfikacją ilości i usuwaniem pozycji
- Checkout z walidacją formularza i symulacją płatności
- Ulubione (wishlist) i powiadomienia (toast)
- Porównywanie produktów i eksport porównania jako CSV
- Import produktów z CSV oraz proste konektory (szkice) dla Shopify/WooCommerce

---

## Szybki start 🚀

1. Instalacja zależności:

```bash
npm install
```

2. Uruchomienie trybu deweloperskiego:

```bash
npm run dev
```

3. Build produkcyjny:

```bash
npm run build
npm run preview
```

---

## Skrypty (ważne) 🔧

- `npm run dev` — uruchamia serwer developerski (Vite)
- `npm run build` — buduje aplikację do produkcji
- `npm run preview` — podgląd zbudowanej wersji
- `npm test` — uruchamia testy jednostkowe (Vitest)

---

## Struktura projektu 📁

- `public/data/products.json` — przykładowe dane produktów
- `src/` — główne źródła aplikacji
  - `pages/` — strony (Home, ProductDetails, Cart, Checkout, Compare, Wishlist, Orders, Integrations...)
  - `components/` — komponenty UI (Header, Footer, ProductCard, FilterPanel, Rating, Toast, itp.)
  - `lib/` — biblioteki pomocnicze (np. `csvParser.js`)
  - `store/` — Zustand stores (`cartStore.js`, `compareStore.js`)
  - `__tests__/` — testy jednostkowe
- `vite.config.js`, `package.json`, `eslint.config.js` — konfiguracje projektu

---

## Dane i import 📥

- Produkty znajdują się w `public/data/products.json`.
- Lokalny importer CSV obsługuje pola cytowane, wykrywa separator i usuwa BOM; parser znajduje się w `src/lib/csvParser.js`.
- Historia importów jest zapisywana w `localStorage.importHistory` i dostępna na stronie historii importów.

---

## Testy ✅

Projekt zawiera testy jednostkowe (Vitest). Aby je uruchomić:

```bash
npm test
```

Testy pokrywają m.in. parser CSV i logikę porównywania.

---

## Rozwój i możliwe rozszerzenia 💡

- Pełne konektory do Shopify/WooCommerce (wymaga implementacji OAuth i mapowania pól)
- Rozszerzona walidacja CSV i obsługa różnych encodingów
- Integracja z zewnętrznym backendem i prawdziwym systemem płatności

---

## Licencja

Projekt udostępniony do celów edukacyjnych/demonstracyjnych.

---
