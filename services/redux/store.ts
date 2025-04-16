import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  Cart: cartSlice.reducer,
  Product: productSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
