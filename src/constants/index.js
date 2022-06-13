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

export const chequeStatuses = [
    {
        id: 1,
        value: 'pending',
        color: '#e7792b',
        text: 'Yeni Talep',
        desc: 'basvurunuz yeni talep olarak alinmistir.',
    },
    { id: 2, value: 'availableOffer', color: '#5ad363', text: 'Cevap Geldi' },
    {
        id: 3,
        value: 'expired',
        color: '#ff0000',
        text: 'Süresi Doldu',
        desc: 'Başvurunuzun süresi doldu. Yeni bir işlem yapabilirsiniz.',
    },
    { id: 4, value: 'approved', text: 'Onayladım', color: 'primaryColor' },
    {
        id: 5,
        value: 'waitingForOffer',
        color: 'purple',
        text: 'İşleme Alındı',
        desc: 'Başvurunuz finansal kurumlar tarafından incelenmeye başlandı.',
    },
    {
        id: 6,
        value: 'rejectForOffer',
        color: 'red',
        text: 'Alıcı Tarafindan Reddedildi',
        desc: 'basvurunuz alıcı tarafindan reddedildi.',
    },
    {
        id: 7,
        value: 'applied',
        color: '#e7792b',
        text: 'Teklif Bekliyor',
        desc: 'Başvurunuza henüz finansal kurumlardan teklif gelmedi, gelen teklif detaylarını anında ileteceğiz.',
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
