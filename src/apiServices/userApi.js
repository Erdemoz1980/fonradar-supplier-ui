/* eslint-disable no-empty */
import { notification } from 'antd';
import moment from 'moment';
import { apiV1, endpoints, apiV2 } from '../services/apis';
import LocalStorageService from '../services/LocalStorageService';

const login = async (payload) => {
    try {
        const { email, password } = payload;
        const data = await apiV1.post(endpoints.login, { email, password });
        if (data.token) {
            LocalStorageService.setAuthToken(data.token);
        }
        return data;
    } catch (e) {
        console.log(e);
    }
};

const logout = () => {
    LocalStorageService.removeAuthToken();
};

const fetchUser = async () => {
    try {
        const { data } = await apiV1.get(endpoints.smeUsers);
        data.userProfile.isPremium = moment() < moment(data.userProfile.premiumExpirationDate);
        return data.userProfile;
    } catch (e) {}
};

const resetPasswordSendCode = async (payload) => {
    try {
        const { data } = await apiV1.post(endpoints.sendResetPasswordCode, { email: payload });
        notification.info({ message: 'Lütfen e-posta adresinizi kontrol ediniz.' });
        return data;
    } catch (e) {}
};

const resetPassword = async (payload) => {
    try {
        const { data } = await apiV1.patch(endpoints.resetPassword, payload);
        notification.success({ message: 'Şifreniz başarıyla güncellenmiştir.' });
        return data;
    } catch (e) {}
};

const preSignUp = async (payload) => {
    try {
        const gsmNumber = `0${payload.gsmNumber}`;
        const newUser = { ...payload, gsmNumber };
        await apiV1.post(endpoints.preSmeUserRegistiration, { ...payload, gsmNumber });

        return newUser;
    } catch (e) {}
};

const signUp = async (payload) => {
    try {
        const newUser = await apiV1.post(endpoints.signup, { ...payload });
        notification.success({
            message: `Kaydınız başarılı bir şekilde oluşturuldu. Alıcılarınızın yüklediği faturalardan iskonto ettirmek istediklerinizi seçebilirsiniz.`,
        });
        return newUser;
    } catch (e) {}
};

const sendCode = async (payload) => {
    try {
        const gsmNumber = `0${payload.gsmNumber}`;
        const newUser = await apiV2.post(
            endpoints.validateOTP,
            { code: payload.code, gsmNumber },
            { headers: { 'X-Platform': 'Web' } }
        );
        if (newUser.data.isOtpValid) {
            notification.success({ message: 'Üyeliğiniz aktive edilmiştir.' });
            return newUser.data;
        }
        notification.error({ message: 'Geçersiz telefon kodu girdiniz.' });
        return '';
    } catch (e) {}
};

const getCode = async (payload) => {
    try {
        const gsmNumber = `0${payload}`;
        const newUser = await apiV2.post(
            endpoints.getCode,
            { gsmNumber },
            { headers: { 'X-Platform': 'Web' } }
        );
        return newUser.data;
    } catch (e) {}
};

const getDocType = async () => {
    try {
        const newUser = await apiV1.get(endpoints.docType, { headers: { 'X-Platform': 'Web' } });
        return newUser.documentTypes;
    } catch (e) {}
};

const uploadDoc = async (payload) => {
    try {
        console.log(payload);
        const { formData } = payload;
        const newUser = await apiV1.post(
            `${endpoints.signup}/${payload.supplierId}/document/${payload.documentTypeId}/upload`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        return newUser.data;
    } catch (e) {}
};

export {
    login,
    logout,
    fetchUser,
    resetPasswordSendCode,
    resetPassword,
    preSignUp,
    signUp,
    sendCode,
    getCode,
    getDocType,
    uploadDoc,
};
