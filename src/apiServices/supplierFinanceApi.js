/* eslint-disable no-empty */
import { endpoints, apiV1, apiBuyerV3 } from '../services/apis';
import LocalStorageService from '../services/LocalStorageService';

const token = LocalStorageService.getAuthToken();

const fetchInvoices = async (taxNumber, _token) => {
    try {
        const data = await apiBuyerV3.get(`${endpoints.invoices}?taxId=${taxNumber}`, {
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

const uploadInvoices = async (payload, _token) => {
    try {
        const data = await apiV1.post(endpoints.uploadInvoices, payload, {
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

export { fetchInvoices, uploadInvoices };
