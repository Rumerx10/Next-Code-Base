import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import booksReducer from './../features/books/bookSlice';
import productReducer from "../features/products/productSlice";

const store = configureStore({
  reducer:{
    counter: counterReducer,
    books: booksReducer,
    products: productReducer,
  }
})

export default store;