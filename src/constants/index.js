/* eslint-disable prettier/prettier */
import { convertObjectToArray, mapArray } from '../utils';

export const fileTypes = { pdf: 'pdf', jpeg: 'jpeg', png: 'png' };

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
    { id: 2, value: 'CEVAP_GELDI', color: '#1251a5', text: 'Cevap Geldi' },
    {
        id: 3,
        value: 'SURESI_DOLDU',
        color: '#e34230',
        text: 'Süresi Doldu',
        desc: 'Başvurunuzun süresi doldu. Yeni bir işlem yapabilirsiniz.',
    },
    { id: 4, value: 'TEKLIFI_ONAYLADIM', text: 'Teklifi Onayladım', color: '#0ee373' },
    {
        id: 5,
        value: 'ISLEME_ALINDI',
        color: '#1970e3',
        text: 'İşleme Alındı',
        desc: '',
    },
    {
      id: 6,
      value: 'KURUMLAR_INCELIYOR',
      color: 'purple',
      text: 'Kurumlar İnceliyor',
      desc: 'Başvurunuz finansal kurumlar tarafından incelenmeye başlandı.',
    },
    {
      id: 6,
      value: 'TEMLIKNAME_YUKLENDI',
      color: '#006e03',
      text: 'Temlikname Yükledim',
      desc: 'Temliknameniz yüklendi ve finans kurumuna iletildi. İmzalı ve kaşeli bir kopyayı da şubeye iletmeniz gerekmektedir.',
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
