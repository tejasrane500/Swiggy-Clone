import { configureStore } from "@reduxjs/toolkit";
import toggleSlice from "./toggleSlice";
import cartSlice from "./cartSlice";
import filterSlice from "./filterSlice";
import authSlice from "./authSlice";

const Store = configureStore({
    reducer : {
        toggleSlice : toggleSlice,
        cartSlice : cartSlice,
        filterSlice : filterSlice,
        authSlice : authSlice
    }
})

export default Store;