/* eslint-disable prettier/prettier */
import { convertObjectToArray, mapArray } from '../utils';

export const fileTypes = { pdf: 'pdf', jpeg: 'jpeg', png: 'png' };
export const FUND_TYPES = [
    { value: 1, text: 'Çek Başvurularım' },
    { value: 2, text: 'Fatura İşlemleri', isNew: true },
];
export const SUPPLIER_FINANCING_TYPES = [
    { value: 1, text: 'Fatura Yükle' },
];
// WaitingOffer = new ("TEKLIF_BEKLIYOR","Teklif Bekliyor");
// OnProcess = new ("ISLEME_ALINDI","İşleme Alındı");
// Answered = new ("CEVAP_GELDI","Cevap Geldi");
// Approved = new ("ONAYLADIM","Onayladım");
// Expired = new ("SURESI_DOLDU","Süresi Doldu");
export const chequeStatuses = [
    {
        id: 1,
        value: 'TEKLIF_BEKLIYOR',
        color: '#e7792b',
        text: 'Teklif Bekliyor',
        desc: 'basvurunuz yeni talep olarak alinmistir.',
    },
    { id: 2, value: 'CEVAP_GELDI', color: '#5ad363', text: 'Cevap Geldi' },
    {
        id: 3,
        value: 'SURESI_DOLDU',
        color: '#ff0000',
        text: 'Süresi Doldu',
        desc: 'Başvurunuzun süresi doldu. Yeni bir işlem yapabilirsiniz.',
    },
    { id: 4, value: 'ONAYLADIM', text: 'Onayladım', color: 'primaryColor' },
    {
        id: 5,
        value: 'ISLEME_ALINDI',
        color: 'purple',
        text: 'İşleme Alındı',
        desc: 'Başvurunuz finansal kurumlar tarafından incelenmeye başlandı.',
    },
];
export const chequeStatusMapById = mapArray(chequeStatuses, 'id');
export const chequeStatusMapByValue = mapArray(chequeStatuses, 'value');

export const timePeriodsMapByValue = {
    aDayAgo: { text: 'Bugün', value: 'aDayAgo' },
    aWeekAgo: { text: 'Son 1 hafta', value: 'aWeekAgo' },
    fifteenDaysAgo: { text: 'Son 15 gün', value: 'fifteenDaysAgo' },
    aMonthAgo: { text: 'Son ay', value: 'aMonthAgo' },
    sixMonthsAgo: { text: 'Son 6 ay', value: 'sixMonthsAgo' },
    aYearAgo: { text: 'Son yıl', value: 'aYearAgo' },
};
export const timePeriods = convertObjectToArray(timePeriodsMapByValue);
