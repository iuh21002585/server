import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import api from "../../utils/apiCaller";

export const fetchAllOrders = createAsyncThunk(
    "/orders/fetchAllOrders",
    async (params, thunkAPI) => {
        const res = await api.get("/v1/orders");
        return res.data;
    }
);

export const createOrder = createAsyncThunk(
    "orders/createOrder",
    async (params, thunkAPI) => {
        const res = await api.post("v1/orders", params);
        return res.data;
    }
);


const ordersSlice = createSlice({
    name: "orders",
    initialState: [],
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllOrders.fulfilled, (state, action) => {
            state.push(...action.payload);
        });
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.push(action.payload);
        });
    },
});

export default ordersSlice;
