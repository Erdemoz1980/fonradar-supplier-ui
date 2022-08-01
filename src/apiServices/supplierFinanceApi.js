/* eslint-disable no-empty */
import { endpoints, apiV1 } from '../services/apis';

const fetchInvoices = async () => {
    try {
        const { data } = await apiV1.get(endpoints.invoices);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export { fetchInvoices };
