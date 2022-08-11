/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    discountInvoices: '',
    discountInvoice: '',
};

const fundSlice = createSlice({
    name: 'fund',
    initialState,
    reducers: {
        setDiscountInvoices(state, action) {
            state.discountInvoices = action.payload;
        },
        setDiscountInvoice(state, action) {
            state.discountInvoice = action.payload;
        },
    },
});

export const { setDiscountInvoices, setDiscountInvoice } = fundSlice.actions;
export default fundSlice.reducer;
