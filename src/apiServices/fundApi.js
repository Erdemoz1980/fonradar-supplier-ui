/* eslint-disable no-empty */
import { endpoints, apiV1 } from '../services/apis';

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

export { fetchDiscountInvoices };
