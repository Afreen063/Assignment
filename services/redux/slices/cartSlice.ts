import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image?: any;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity += 1;
      }
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        existing.quantity -= 1;
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
  extraReducers: (builder: any) => {
    //Add products
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;
