import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
  salePrice?: number;
}

interface WishlistStore {
  items: WishlistItem[];

  addItem: (item: WishlistItem) => void;
  removeItem: (productId: string) => void;
  toggleItem: (item: WishlistItem) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const exists = state.items.some(
            (i) => i.productId === item.productId,
          );
          if (exists) {
            return state;
          }
          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
      },

      toggleItem: (item) => {
        const { items } = get();
        const exists = items.some((i) => i.productId === item.productId);
        if (exists) {
          set({ items: items.filter((i) => i.productId !== item.productId) });
        } else {
          set({ items: [...items, item] });
        }
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.productId === productId);
      },

      clearWishlist: () => {
        set({ items: [] });
      },
    }),
    {
      name: "ane-doo-wishlist",
    },
  ),
);
