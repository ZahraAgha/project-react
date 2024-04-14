import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3000/products";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const response = await axios.get(apiUrl);
    return response.data;
  }
);

export const addCategory = createAsyncThunk(
  "categories/addCategory",
  async (category) => {
    const response = await axios.post(apiUrl, category);
    return response.data;
  }
);

export const editCategory = createAsyncThunk(
  "categories/editCategory",
  async ({ id, category }) => {
    // console.log("id", id);
    // console.log("ctgr", formData);
    const response = await axios.put(`${apiUrl}/${id}`, category);
    return response.data;
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id) => {
    await axios.delete(`${apiUrl}/${id}`);
    return id;
  }
);

export const CategorySlice = createSlice({
  name: "categories",
  initialState: {
    items: [],
    status: "nothing",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "Succeed";
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(addCategory.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.status = "Succeed";
        state.items.push(action.payload); //menim action'nan gelen datani elave ele arayin icine push ele
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(editCategory.pending, (state, action) => {
        state.status = "loading..";
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.status = "Succceed";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        console.log("index", index);
        console.log("action payload", action.payload);
        if (index != -1) {
          //eger index varsa musbetdise,items indexine beraber ele actionnan gelen payloadu
          state.items[index] = action.payload;
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        console.log("action", action);
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default CategorySlice.reducer;
