// cart.slice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import type { Draft } from "immer";

export const CART_PERSISTENT_STATE = "cartData";

export interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clean: (state: Draft<CartState>) => {
      state.items = [];
    },
    delete: (state: Draft<CartState>, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    remove: (state: Draft<CartState>, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) return;

      if (existed.count === 1) {
        state.items = state.items.filter((i) => i.id !== action.payload);
      } else {
        state.items = state.items.map((i) =>
          i.id === action.payload ? { ...i, count: i.count - 1 } : i
        );
      }
    },
    add: (state: Draft<CartState>, action: PayloadAction<number>) => {
      const existed = state.items.find((i) => i.id === action.payload);
      if (!existed) {
        state.items.push({ id: action.payload, count: 1 });
        return;
      }
      state.items = state.items.map((i) =>
        i.id === action.payload ? { ...i, count: i.count + 1 } : i
      );
    },
  },
});

// Properly typed action exports
export const { clean, delete: deleteItem, remove, add } = cartSlice.actions;
export default cartSlice.reducer;
