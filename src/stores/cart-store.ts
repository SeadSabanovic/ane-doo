import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: string;
  name: string;
  slug: string;
  image: string;
  size: string;
  color: string;
  quantity: number;
  purchaseType: "retail" | "wholesale";
  pricing: {
    retailPrice: number;
    wholesalePrice: number;
    wholesaleMinQuantity: number;
  };
}

interface CartStore {
  items: CartItem[];

  addItem: (item: CartItem) => void;
  removeItem: (
    productId: string,
    size: string,
    color: string,
    purchaseType: "retail" | "wholesale"
  ) => void;
  updateQuantity: (
    productId: string,
    size: string,
    color: string,
    purchaseType: "retail" | "wholesale",
    quantity: number
  ) => void;
  clearCart: () => void;

  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const getItemKey = (
  productId: string,
  size: string,
  color: string,
  purchaseType: "retail" | "wholesale"
) => `${productId}-${size}-${color}-${purchaseType}`;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              i.color === item.color &&
              i.purchaseType === item.purchaseType
          );

          if (existingIndex !== -1) {
            const updatedItems = [...state.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + item.quantity,
            };
            return { items: updatedItems };
          }

          return { items: [...state.items, item] };
        });
      },

      removeItem: (productId, size, color, purchaseType) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(
                item.productId === productId &&
                item.size === size &&
                item.color === color &&
                item.purchaseType === purchaseType
              )
          ),
        }));
      },

      updateQuantity: (productId, size, color, purchaseType, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) =>
                  !(
                    item.productId === productId &&
                    item.size === size &&
                    item.color === color &&
                    item.purchaseType === purchaseType
                  )
              ),
            };
          }

          return {
            items: state.items.map((item) =>
              item.productId === productId &&
              item.size === size &&
              item.color === color &&
              item.purchaseType === purchaseType
                ? { ...item, quantity }
                : item
            ),
          };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          if (item.purchaseType === "wholesale") {
            return total + item.quantity * item.pricing.wholesaleMinQuantity;
          }
          return total + item.quantity;
        }, 0);
      },

      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          if (item.purchaseType === "wholesale") {
            return (
              total +
              item.quantity *
                item.pricing.wholesaleMinQuantity *
                item.pricing.wholesalePrice
            );
          }
          return total + item.quantity * item.pricing.retailPrice;
        }, 0);
      },
    }),
    {
      name: "ane-doo-cart",
    }
  )
);
