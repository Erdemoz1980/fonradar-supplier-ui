/* eslint-disable no-empty */
import { endpoints, apiBuyerV3 } from '../services/apis';
// import LocalStorageService from '../services/LocalStorageService';

// const token = LocalStorageService.getAuthToken();

const fetchInvoices = async (taxNumber, token) => {
    try {
        const data = await apiBuyerV3.get(`${endpoints.invoices}?taxId=3881591970`, {
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
