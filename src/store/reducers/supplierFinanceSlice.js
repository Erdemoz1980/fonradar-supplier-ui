/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [],
};

const supplierFinanceSlice = createSlice({
    name: 'supplierFinance',
    initialState,
    reducers: {
        setInvoices(state, action) {
            state.invoices = action.payload;
        },
    },
});

export const { setInvoices } = supplierFinanceSlice.actions;
export default supplierFinanceSlice.reducer;
