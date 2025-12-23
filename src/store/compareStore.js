import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCompareStore = create(
  persist(
    (set) => ({
      items: [],
      add: (product) =>
        set((state) => {
          if (state.items.find((p) => String(p.id) === String(product.id)))
            return state;
          return { items: [...state.items, product].slice(0, 3) };
        }),
      remove: (id) =>
        set((state) => ({
          items: state.items.filter((p) => String(p.id) !== String(id)),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "shopeasy-compare" }
  )
);
