import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // { id, name, email }
      isAuthenticated: false,

      login: (name, email) => {
        const user = {
          id: Date.now(),
          name: name.trim(),
          email: email.trim(),
          loginAt: new Date().toISOString(),
        };
        set({
          user,
          isAuthenticated: true,
        });
        return user;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateProfile: (name, email) => {
        set((state) => ({
          user: state.user ? { ...state.user, name, email } : null,
        }));
      },
    }),
    {
      name: "shopeasy-auth",
    },
  ),
);
