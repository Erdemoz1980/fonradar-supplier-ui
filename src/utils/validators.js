export const validateInvoiceNo = (value) => {
    const patt = /[A-Za-z]{3}[0-9]{13}/;
    return patt.test(value) && value.length === 16
        ? Promise.resolve()
        : Promise.reject(new Error('Lütfen geçerli bir fatura numarasi giriniz!'));
};
export const validateVkn = (value) =>
    value?.toString().length === 10 || value?.toString().length === 11
        ? Promise.resolve()
        : Promise.reject(new Error('Lütfen geçerli bir VKN / TCKN giriniz!'));
export const validateGsmNumber = (value) => {
    const patt = new RegExp('(5)[0-9][0-9][0-9]([0-9]){6}');
    return patt.test(value) && value.length < 11
        ? Promise.resolve()
        : Promise.reject(new Error('Lütfen geçerli bir telefon numaranızı giriniz!'));
};
export const validateEmail = (value) => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value?.match(validRegex)
        ? Promise.resolve()
        : Promise.reject(new Error('Lütfen geçerli bir e-posta giriniz!'));
};
