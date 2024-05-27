import { configureStore } from "@reduxjs/toolkit";
import merchSlice from "../slice/merch";
import productsSlice from "../slice/products";
import orderSlice from "../slice/orders";

const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
        merch: merchSlice.reducer,
        order: orderSlice.reducer,
    },
});

export default store;
