const urls = {
    login: '/giris-yap',
    passwordReset: '/sifre-sifirla',
    funds: '/fonlar',
    fundDetail: '/fonlar/:id',
    supplierFinancing: '/tedarikci-finansmani',
    help: '/yardım',
};

export default urls;

const breadcrumbItems = {
    [urls.login]: { name: 'Üye Girişi', url: urls.login },
    [urls.passwordReset]: { name: 'Parolamı Unuttum', url: urls.passwordReset },
    [urls.help]: { name: 'Yardım', url: urls.help },

    [urls.funds]: { name: 'Başvurularım', url: urls.funds },
    [urls.fundDetail]: { name: 'Başvuru Detay', url: urls.fundDetail },
    [urls.supplierFinancing]: { name: 'Fatura İşlemleri', url: urls.supplierFinancing },
};

// use breadcrumbItems to create breadcrumbs
export const breadcrumbs = {
    [urls.chequeCalculator]: breadcrumbItems[urls.chequeCalculator],
    [urls.help]: breadcrumbItems[urls.help],
    [urls.login]: breadcrumbItems[urls.login],
    [urls.passwordReset]: [breadcrumbItems[urls.login], breadcrumbItems[urls.passwordReset]],
    [urls.funds]: breadcrumbItems[urls.funds],
    [urls.fundDetail]: [breadcrumbItems[urls.funds], breadcrumbItems[urls.fundDetail]],
    [urls.supplierFinancing]: breadcrumbItems[urls.supplierFinancing],
};
