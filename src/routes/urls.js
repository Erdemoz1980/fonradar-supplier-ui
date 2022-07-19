const urls = {
    landing: '/',
    login: '/giris-yap',
    passwordReset: '/sifre-sifirla',
    funds: '/fonlar',
    fundDetail: '/fonlar/:id',
    supplierFinancing: '/tedarikci-finansmani',
    help: '/yardım',
};

export default urls;

const breadcrumbItems = {
    [urls.landing]: { name: 'Ana sayfa', url: urls.landing },
    [urls.login]: { name: 'Üye Girişi', url: urls.login },
    [urls.passwordReset]: { name: 'Parolamı Unuttum', url: urls.passwordReset },
    [urls.help]: { name: 'Yardım', url: urls.help },

    [urls.funds]: { name: 'Başvurularım', url: urls.funds },
    [urls.fundDetail]: { name: 'Başvuru Detay', url: urls.fundDetail },
    [urls.supplierFinancing]: { name: 'Fatura İşlemleri', url: urls.supplierFinancing },
};

// use breadcrumbItems to create breadcrumbs
export const breadcrumbs = {
    [urls.chequeCalculator]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.chequeCalculator]],
    [urls.help]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.help]],
    [urls.login]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.login]],
    [urls.passwordReset]: [
        breadcrumbItems[urls.landing],
        breadcrumbItems[urls.login],
        breadcrumbItems[urls.passwordReset],
    ],
    [urls.funds]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.funds]],
    [urls.fundDetail]: [
        breadcrumbItems[urls.landing],
        breadcrumbItems[urls.funds],
        breadcrumbItems[urls.fundDetail],
    ],
    [urls.supplierFinancing]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.supplierFinancing]],
};
