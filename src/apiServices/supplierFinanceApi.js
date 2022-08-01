/* eslint-disable no-empty */
import { endpoints, apiV1 } from '../services/apis';
import LocalStorageService from '../services/LocalStorageService';

const token = LocalStorageService.getAuthToken();

const fetchInvoices = async (taxNumber) => {
    try {
        const data = await apiV1.get(`${endpoints.invoices}?taxNumber=${taxNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: 'application/json',
            },
        });
        return data;
    } catch (error) {
        // console.log(error);
    }
};

export { fetchInvoices };
