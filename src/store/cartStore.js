import { create } from "zustand";
import { persist } from "zustand/middleware";

// Promocyjne kody
export const PROMO_CODES = {
  WELCOME10: { discount: 10, type: "percent", valid: true },
  SUMMER20: { discount: 20, type: "percent", valid: true },
  SAVE50: { discount: 50, type: "fixed", valid: true },
  STUDENT15: { discount: 15, type: "percent", valid: true },
  FRIDAY30: { discount: 30, type: "percent", valid: true },
};

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      favorites: [],
      orders: [],
      viewedProducts: [], // Historia przeglądania
      appliedPromo: null, // Aktywny kod promocyjny
      preferences: {
        notifications: true,
        currency: "PLN",
      },

      // Koszyk
      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, qty: p.qty + 1 } : p,
              ),
            };
          }
          return { cart: [...state.cart, { ...product, qty: 1 }] };
        }),

      updateCartQty: (id, qty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, qty: Math.max(1, qty) } : item,
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

      // Ulubione
      toggleFavorite: (product) =>
        set((state) => {
          const exists = state.favorites.find((p) => p.id === product.id);
          if (exists) {
            return {
              favorites: state.favorites.filter((p) => p.id !== product.id),
            };
          }
          return { favorites: [...state.favorites, product] };
        }),

      isFavorite: (id) => (state) => state.favorites.some((p) => p.id === id),

      // Zamówienia
      addOrder: (orderData) =>
        set((state) => ({
          orders: [
            ...state.orders,
            {
              id: orderData.id ?? Date.now(),
              date: orderData.createdAt ?? new Date().toISOString(),
              items: orderData.items ?? state.cart,
              total: orderData.total ?? 0,
              ...orderData,
            },
          ],
        })),

      // Historia przeglądania
      addViewedProduct: (product) =>
        set((state) => {
          const filtered = state.viewedProducts.filter(
            (p) => p.id !== product.id,
          );
          return {
            viewedProducts: [
              { ...product, viewedAt: new Date().toISOString() },
              ...filtered,
            ].slice(0, 15), // Max 15 produktów
          };
        }),

      // Kody promocyjne
      applyPromoCode: (code) => {
        const promo = PROMO_CODES[code.toUpperCase()];
        if (promo && promo.valid) {
          set({ appliedPromo: code.toUpperCase() });
          return { success: true, discount: promo };
        }
        return { success: false, message: "Nieprawidłowy kod promocyjny" };
      },

      removePromoCode: () => set({ appliedPromo: null }),

      // Preferencje użytkownika
      setPreference: (key, value) =>
        set((state) => ({
          preferences: { ...state.preferences, [key]: value },
        })),
    }),
    {
      name: "shopeasy-store",
    },
  ),
);

// Computed selector dla rabatu (bez infinite loop)
export const usePromoDiscount = () => {
  return useCartStore((state) => {
    if (!state.appliedPromo) return 0;
    const promo = PROMO_CODES[state.appliedPromo];
    if (!promo) return 0;

    const subtotal = state.cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0,
    );
    return promo.type === "percent"
      ? (subtotal * promo.discount) / 100
      : promo.discount;
  });
};
