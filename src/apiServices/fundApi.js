/* eslint-disable no-empty */
import { notification } from 'antd';
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

const fetchDiscountInvoiceById = async (invoiceId) => {
    try {
        const data = await apiV1.get(`discountapplication/${invoiceId}`);
        return data;
    } catch {
        return [];
    }
};

const fetchInvoiceOffer = async (id) => {
    try {
        const data = await apiV1.get(`discountapplication/${id}/offer`);
        return data;
    } catch {
        return [];
    }
};

const acceptInvoiceOffer = async (supplierId, disId, financeId, payload) => {
    try {
        const data = await apiV1.patch(
            `supplier/${supplierId}/discountapplication/${disId}/financialinstitution/${financeId}/accept`,
            payload
        );
        notification.success({
            message:
                'Onayınız finans kurumuna bildirildi. İşlemi tamamlamak için sizin için ürettiğimiz temliknameyi bastırıp kaşeli ve imzalı olarak en yakın şubeye götürebilirsiniz',
        });
        return data;
    } catch {
        return [];
    }
};

const getInvoicesAssigned = async (invoiceId) => {
    try {
        const data = await apiV1.get(`supplier/${invoiceId}/invoice/assigned`);
        return data;
    } catch {
        return [];
    }
};

export {
    fetchDiscountInvoices,
    getDiscountBuyerInvoices,
    fetchDiscountInvoiceById,
    fetchInvoiceOffer,
    acceptInvoiceOffer,
    getInvoicesAssigned,
};
