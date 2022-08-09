/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    discountInvoices: '',
};

const fundSlice = createSlice({
    name: 'fund',
    initialState,
    reducers: {
        setDiscountInvoices(state, action) {
            state.discountInvoices = action.payload;
        },
    },
});

export const { setDiscountInvoices } = fundSlice.actions;
export default fundSlice.reducer;
