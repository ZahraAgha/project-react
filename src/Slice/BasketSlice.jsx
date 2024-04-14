import { createSlice } from "@reduxjs/toolkit";

export const BasketSlice = createSlice({
  name: "basket",
  initialState: {
    items: [],
  },
  reducers: {
    addBasket: (state, action) => {
      const storage = JSON.parse(localStorage.getItem("basket")) || []; //storage baxiriq ilk , storage localdan gelir,basket varsa gelib basketde axtarmalidir
      state.items = storage;
      const existingIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items[existingIndex].count += 1;
        localStorage.setItem("basket", JSON.stringify(state.items));
      } else {
        const newItem = {
          ...action.payload,
          count: 1,
        };
        state.items.push(newItem);
        localStorage.setItem("basket", JSON.stringify(state.items));
      }
    },
    removeItem: (state, action) => {
      const storage = JSON.parse(localStorage.getItem("basket")) || []; //get bunu getir sonra
      state.items = storage; //sonra buna menimset

      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        if (state.items[index].count > 1) {
          state.items[index].count -= 1; //eyer azaldisa
          localStorage.setItem("basket", JSON.stringify(state.items)); //
        } else {
          state.items = state.items.filter(
            (item) => item.id !== action.payload.id
          );
          localStorage.setItem("basket", JSON.stringify(state.items));
        }
      }
    },
  },
});

export const { addBasket, removeItem } = BasketSlice.actions;

export default BasketSlice.reducer;
