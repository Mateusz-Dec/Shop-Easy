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

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

> **Uwaga:** Treść z `ROZSZERZENIE.md` i `ZMIANY.md` została scalona do tego pliku; pozostałe pliki `.md` zostały usunięte z repozytorium.

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

## Wkład (Contributing)

Jeśli chcesz dodać funkcję lub naprawić błąd:

1. Forkuj repozytorium
2. Stwórz branch: `feature/moja-funkcja`
3. Napisz testy
4. Zrób PR z opisem zmian

---

## Licencja

Projekt udostępniony do celów edukacyjnych/demonstracyjnych.

---

_Jeśli chcesz, mogę rozszerzyć README o dodatkowe sekcje (diagram architektury, szczegóły API konektorów, przykłady użycia komponentów) — powiedz co dodać._
