import HttpService from './HttpService';

const v1ApiUrls = {
    dev: 'https://test-supplier-api.fonradar.com/api/v1',
    test: 'https://test-supplier-api.fonradar.com/api/v1',
    prod: 'https://test-supplier-api.fonradar.com/api/v1',
};
const v2ApiUrls = {
    dev: 'https://test-api.fonradar.com/api/v2',
    test: 'https://test-api.fonradar.com/api/v2',
    prod: 'https://test-api.fonradar.com/api/v2',
};
const v1ApiUrls1 = {
    dev: 'https://lookup-services-fonradar.azurewebsites.net/api/v1',
    test: 'https://lookup-services-fonradar.azurewebsites.net/api/v1',
    prod: 'https://lookup-services-fonradar.azurewebsites.net/api/v1',
};

export const endpoints = {
    login: '/Supplier/login',
    getCode: 'otp/send',
    validateOTP: 'otp/validate',
    signup: '/Supplier',
    provinces: '/provinces',

    getDistrictsEndpoint: (provinceId) => `/provinces/${provinceId}/districts`,
    getTaxOfficesEndpoint: (provinceId) => `/provinces/${provinceId}/tax-administrations`,

    // extra
    fund: '/funds',
    corporations: '/corporations',
    smeUsers: '/sme-users',
    preSmeUserRegistiration: '/sme-users/pre-registration',
    sessions: '/sessions/sme-users',
    fundHistory: '/funds/sme-users',
    sendResetPasswordCode: '/sme-users/send-reset-password',
    resetPassword: '/sme-users/reset-password',
    subscriptions: '/subscriptions',
    usageInfo: '/subscriptions/usage-info/sme-users',
    createSubscription: '/subscriptions/in-app/sme-users',
    uploadImage: '/funds/images',
    playerId: '/sme-users/player-id',
    configurations: '/configurations',
    validateTaxId: '/validate-tax-id',
    banks: '/banks',
    updateTaxId: '/sme-users/tax-id',
    estimatedOffer: '/funds/estimated-offer',
    updateProvince: '/sme-users/province',
    updateRequiredInfo: '/sme-users/required-information',
    financialData: '/sme-users/financial-data',
    platforms: '/supplier-financing/platforms',
    invoicesDiscounts: '/supplier-financing/invoices/discounts',
    invoicesDiscountsCalculate: '/supplier-financing/invoices/discounts/calculate',
    smeOnboarding: '/sme-users/onboarding',
    preRegistration: '/supplier-financing/pre-registration',

    getFundDetailEndpoint: (fundId) => `/funds/${fundId}/sme-users`,
    getApproveFundEndpoint: (fundId) => `/funds/${fundId}/approves`,
    getFinancialDataDetailEndpoint: (financialDataId) => `/sme-users/financial-data/${financialDataId}`,

    zendeskRequest: '/requests',
};

const enviroment = process?.env?.REACT_APP_NODE_ENV || 'dev';

export const apiV1 = new HttpService({ baseURL: `${v1ApiUrls[enviroment]}` });
export const apiV2 = new HttpService({ baseURL: `${v2ApiUrls[enviroment]}` });
export const apiV3 = new HttpService({ baseURL: `${v1ApiUrls1[enviroment]}` });

export const zendeskApi = new HttpService({
    baseURL: 'https://fonradar.zendesk.com/api/v2',
    isFonRadarApi: false,
});

export const googleConfig = {
    clientId: '531915396144-pbv5ut3vfr0bqra8ecbkesf22jjlu0tl.apps.googleusercontent.com',
};

export const appleConfig = {
    clientId: 'app.netlify.tender-kalam-09ae07',
};
