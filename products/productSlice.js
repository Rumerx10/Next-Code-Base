import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5000/products";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async(product)=>{
    const response = await axios.post(BASE_URL,product);
    return product;
  }
)

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async(id)=>{
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return id;
  }
)

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async(product)=>{
    const response = await axios.put(`${BASE_URL}/${product.id}`,product);
    return product;
  }
)

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers:(builder)=>{
    builder
      .addCase(fetchProducts.pending,(state)=>{
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled,(state, action)=>{
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected,(state, action)=>{
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.products = state.products.filter((product)=>product.id !== action.payload);
      })
      .addCase(createProduct.fulfilled,(state,action)=>{
        state.products.push(action.payload);
      })
      .addCase(updateProduct.fulfilled,(state,action)=>{
        state.products = state.products.map((product)=>product.id===action.payload.id? action.payload:product);
      })
  }
});

export default productSlice.reducer;
