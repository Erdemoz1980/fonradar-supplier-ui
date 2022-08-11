/* eslint-disable no-empty */
import { endpoints, apiV1 } from '../services/apis';

const fetchDiscountInvoices = async () => {
    try {
        const data = await apiV1.get(endpoints.uploadInvoices);
        return data;
    } catch (error) {
        // console.log(error);
    }
};

const getDiscountBuyerInvoices = async (id) => {
    try {
        const data = await apiV1.get(`supplier/${id}/discountapplication`);
        return data;
    } catch (error) {
        // console.log(error);
    }
};

const fetchDiscountInvoiceById = async (id, invoiceId) => {
    try {
        const data = await apiV1.get(`discountapplication/${invoiceId}`);
        return data;
    } catch {
        return [];
    }
};

export { fetchDiscountInvoices, getDiscountBuyerInvoices, fetchDiscountInvoiceById };
