/* eslint-disable no-empty */
import { notification } from 'antd';
import { endpoints, apiV1 } from '../services/apis';
import LocalStorageService from '../services/LocalStorageService';

const token = LocalStorageService.getAuthToken();

const fetchInvoices = async (taxNumber, _token) => {
    try {
        const data = await apiV1.get(`${endpoints.invoices}?taxNumber=3881591970`, {
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
        const data = await apiV1.post(
            endpoints.uploadInvoices,
            {
                supplierId: payload.supplierId,
                invoices: payload.invoices,
                financialCorparationIds: payload.financialCorparationIds,
            },
            {
                headers: {
                    Authorization: `Bearer ${token || _token}`,
                    accept: 'application/json',
                },
            }
        );
        notification.success({
            message: 'Başvurunuz oluşturuldu.Gelen tekliflere Başvurularım sayfasından ulaşabilirsiniz.',
        });
        return data;
    } catch (error) {
        // console.log(error);
    }
};

export { fetchInvoices, uploadInvoices };
