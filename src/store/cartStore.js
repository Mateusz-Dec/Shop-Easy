import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      orders: [],

      addToCart: (product) =>
        set((state) => {
          const existing = state.cart.find((p) => p.id === product.id);
          if (existing) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id ? { ...p, qty: p.qty + 1 } : p
              ),
            };
          }
          return { cart: [...state.cart, { ...product, qty: 1 }] };
        }),

      updateCartQty: (id, qty) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id ? { ...item, qty: Math.max(1, qty) } : item
          ),
        })),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      clearCart: () => set({ cart: [] }),

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
    }),
    {
      name: "shopeasy-store",
    }
  )
);
