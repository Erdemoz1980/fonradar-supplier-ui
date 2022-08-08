/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    invoices: [],
    invoiceResId: 0,
};

const supplierFinanceSlice = createSlice({
    name: 'supplierFinance',
    initialState,
    reducers: {
        setInvoices(state, action) {
            state.invoices = action.payload;
        },
        setInvoiceResId(state, action) {
            state.invoiceResId = action.payload;
        },
    },
});

export const { setInvoices, setInvoiceResId } = supplierFinanceSlice.actions;
export default supplierFinanceSlice.reducer;
