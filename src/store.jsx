import BasketSlice from "./Slice/BasketSlice";
import CategorySlice from "./Slice/CategorySlice";
import { configureStore } from "@reduxjs/toolkit";

export const Store = configureStore({
  reducer: {
    categories: CategorySlice,
    basket: BasketSlice,
  },
});
