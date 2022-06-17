const urls = {
    landing: '/',
    login: '/giris-yap',
    passwordReset: '/sifre-sifirla',
};

export default urls;

const breadcrumbItems = {
    [urls.landing]: { name: 'Ana sayfa', url: urls.landing },
    [urls.login]: { name: 'Üye Girişi', url: urls.login },
    [urls.passwordReset]: { name: 'Parolamı Unuttum', url: urls.passwordReset },
};

// use breadcrumbItems to create breadcrumbs
export const breadcrumbs = {
    [urls.chequeCalculator]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.chequeCalculator]],
    [urls.login]: [breadcrumbItems[urls.landing], breadcrumbItems[urls.login]],
    [urls.passwordReset]: [
        breadcrumbItems[urls.landing],
        breadcrumbItems[urls.login],
        breadcrumbItems[urls.passwordReset],
    ],
};
