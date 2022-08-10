/* eslint-disable no-empty */
import { endpoints, apiV1 } from '../services/apis';
import LocalStorageService from '../services/LocalStorageService';

const token = LocalStorageService.getAuthToken();

const fetchDiscountInvoices = async (_token) => {
    try {
        const data = await apiV1.get(endpoints.uploadInvoices, {
            headers: {
                Authorization: `Bearer ${_token}`,
                accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        // console.log(error);
    }
};

const getDiscountBuyerInvoices = async (id, _token) => {
    try {
        const data = await apiV1.get(`supplier/${id}/discountapplication`, {
            headers: {
                Authorization: `Bearer ${token || _token}`,
                accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        // console.log(error);
    }
};
export { fetchDiscountInvoices, getDiscountBuyerInvoices };
