import moment from 'moment';

export const acceptImageTypesCheque = 'iimage/x-png,image/gif,image/jpeg,application/pdf';
export const acceptImageTypesBill = 'image/x-png,image/gif,image/jpeg,application/pdf';

// LAYOUT
export const oneColLayout = {
    xs: 24,
    md: 12,
    lg: 11,
    xl: 10,
    xxl: 6,
};
export const oneColWideLayout = {
    xs: 24,
    md: 20,
    lg: 16,
    xl: 14,
    xxl: 12,
};

export const companyDp = [
    {
        id: 0,
        name: 'Anonim Şirketi',
    },
    {
        id: 1,
        name: 'Şahıs Şirketi',
    },
    {
        id: 2,
        name: 'Limited Şirketi',
    },
    {
        id: 3,
        name: 'Kollektif Şirketi',
    },
    {
        id: 4,
        name: 'Kooperatif Şirketi',
    },
    {
        id: 5,
        name: 'Adi Ortaklık',
    },
    {
        id: 6,
        name: 'Adi Komandit Şirketi',
    },
    {
        id: 7,
        name: 'ESH Komandit Şirketi',
    },
];

export const mapArray = (array, key) =>
    array.reduce(
        (prevs, curObject) => ({
            ...prevs,
            [curObject[key]]: curObject,
        }),
        {}
    );
export const convertObjectToArray = (object) => Object.values(object);
export const createImageUrl = (image) => URL.createObjectURL(image);

// NUMBERS
export const decimalSeperator = ','; // 0,12
export const integerSeperator = '.'; // 100.000

export const convertNumberDotSeperated = (number) => {
    if (!number) return '0';
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, integerSeperator);
};

export const convertFloatDotSeperated = (number) => {
    if (!number) return '0';
    const floatString = parseFloat(number).toFixed(2).replace('.', decimalSeperator);
    return floatString.toString().replace(/\B(?=(\d{3})+(?!\d))/g, integerSeperator);
};
export const convertCurrencyTl = (number) => `${convertFloatDotSeperated(number)} TL`;

export const convertDotSeperatedToNumberString = (dotSeperated = '') => {
    const [integer = '', decimal = ''] = dotSeperated.split(decimalSeperator);
    const number = integer.split('.').join('');

    if (decimal) return `${number}.${decimal}`;

    return number;
};
export const convertDotSeperatedToFloat = (dotSeperated = '') =>
    parseFloat(convertDotSeperatedToNumberString(dotSeperated));

export const fillPhoneNumberPlaceholders = (phoneNumberPart, length) =>
    phoneNumberPart + 'x'.repeat(length - phoneNumberPart.length);

export const getFormattedPhoneNumber = (phoneNumber = '') => {
    let formattedPhoneNumber = '+90';
    formattedPhoneNumber += fillPhoneNumberPlaceholders(phoneNumber.slice(0, 3), 3);
    formattedPhoneNumber += '-';
    formattedPhoneNumber += fillPhoneNumberPlaceholders(phoneNumber.slice(3, 6), 3);
    formattedPhoneNumber += '-';
    formattedPhoneNumber += fillPhoneNumberPlaceholders(phoneNumber.slice(6, 8), 2);
    formattedPhoneNumber += '-';
    formattedPhoneNumber += fillPhoneNumberPlaceholders(phoneNumber.slice(8, 10), 2);

    return formattedPhoneNumber;
};

// DATE
export const getIsBeforeToday = (current) => current && current <= moment().subtract(1, 'days').endOf('day');

export const getRemainingPremiumDates = (premiumExpirationDate) => {
    const expirationDate = moment(premiumExpirationDate);
    const today = moment();

    return Math.abs(today.diff(expirationDate, 'days')) + 1;
};

// FINANCIAL DATA
export function getLastQuarter(month) {
    // last year's last quarter
    if (month < 3) return -1;

    return Math.floor(month / 3);
}
export const getLastFinancialPeriodDate = () => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const lastQuarter = getLastQuarter(currentMonth);
    let financialDataYear = currentYear;

    if (lastQuarter === 4) financialDataYear -= 1;

    return { year: financialDataYear, quarter: lastQuarter };
};
export const getLastThreeYears = (year) => [...new Array(3)].map((_, idx) => year - idx);

export const urlToFile = async (url, name = 'image', extension = '.pdf') => {
    const response = await fetch(url);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], `${name}${extension}`, { type: blob.type });

    return file;
};
