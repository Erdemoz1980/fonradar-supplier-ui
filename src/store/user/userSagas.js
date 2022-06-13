import { notification } from 'antd';
import { put } from 'redux-saga/effects';
import moment from 'moment';
// import firebase from '../../services/firebase';
import { apiV1, endpoints } from '../../services/apis';
import LocalStorageService from '../../services/LocalStorageService';
import {
    loginSuccess,
    loginFailure,
    logoutSuccess,
    logoutFailure,
    resetPasswordSendCodeSuccess,
    resetPasswordSendCodeFailure,
    signUpSuccess,
    signUpFailure,
    signUpReset,
    fetchUserSuccess,
    fetchUserFailure,
    updateUserSuccess,
    updateUserFailure,
    updateUserReset,
    resetPasswordSuccess,
    resetPasswordFailure,
    resetPasswordReset,
    updateUserTaxIdProvinceSuccess,
    updateUserTaxIdProvinceFailure,
    updateUserTaxIdProvinceReset,
    preSignUpSuccess,
    // preSignUpReset,
    preSignUpFailure,
    sendCodeSuccess,
    sendCodeFailure,
    getCodeSuccess,
    getCodeFailure,
} from './userActions';
import urls from '../../routes/urls';

// const normalizeGsmNumber = (gsmNumber = '') => {
//     const prefix1 = '+90';
//     const prefix2 = '05';

//     if (gsmNumber.startsWith(prefix1)) {
//         return gsmNumber.slice(prefix1.length);
//     }
//     if (gsmNumber.startsWith(prefix2)) {
//         return gsmNumber.slice(prefix2.length - 1); // include 5
//     }
//     return gsmNumber;
// };

export function* loginSaga({ payload, history }) {
    try {
        const { email, password } = payload;

        yield apiV1.post(endpoints.sessions, { email, password });

        yield put(loginSuccess());

        if (history) {
            history.push(urls.funds);
        }
    } catch (error) {
        console.log(error);
        yield put(loginFailure());
    }
}

export function* logoutSaga() {
    try {
        LocalStorageService.removeAuthToken();

        yield put(logoutSuccess());

        // should be able to display financialData notification
        // yield put(fetchFinancialDataReset());
    } catch (error) {
        yield put(logoutFailure());
    }
}

export function* fetchUserSaga() {
    try {
        const { data } = yield apiV1.get(endpoints.smeUsers);

        // data.userProfile.normalizedGsmNumber = normalizeGsmNumber(data.userProfile.gsmNumber);
        data.userProfile.isPremium = moment() < moment(data.userProfile.premiumExpirationDate);

        yield put(fetchUserSuccess(data.userProfile));
    } catch (error) {
        console.log(error);
        yield put(fetchUserFailure());
    }
}

export function* updateUserSaga({ payload }) {
    try {
        let userData = { ...payload };
        if (payload.gsmNumber) {
            const gsmNumber = `0${payload.gsmNumber}`;
            userData = { ...payload, gsmNumber };
        }
        if (userData !== {}) {
            const { data } = yield apiV1.patch(endpoints.smeUsers, userData);

            yield put(updateUserSuccess(data));
            notification.success({ message: 'Hesabınız başarıyla güncellendi.' });

            yield put(updateUserReset());
        }
    } catch (error) {
        console.log(error);
        yield put(updateUserFailure());
    }
}

export function* updateUserTaxIdProvinceSaga({ payload }) {
    try {
        yield apiV1.patch(endpoints.updateRequiredInfo, payload);

        yield put(updateUserTaxIdProvinceSuccess(payload));

        yield put(updateUserTaxIdProvinceReset());
    } catch (error) {
        console.log(error);
        yield put(updateUserTaxIdProvinceFailure());
    }
}

export function* resetPasswordSendCodeSaga({ payload }) {
    try {
        yield apiV1.post(endpoints.sendResetPasswordCode, { email: payload });

        notification.info({ message: 'Lütfen e-posta adresinizi kontrol ediniz.' });
        yield put(resetPasswordSendCodeSuccess(payload));
    } catch (error) {
        yield put(resetPasswordSendCodeFailure());
    }
}
export function* resetPasswordSaga({ payload }) {
    try {
        yield apiV1.patch(endpoints.resetPassword, payload);

        notification.success({ message: 'Şifreniz başarıyla güncellenmiştir.' });
        yield put(resetPasswordSuccess());
        yield put(resetPasswordReset());
    } catch (error) {
        yield put(resetPasswordFailure());
    }
}

export function* preSignUpSaga({ payload }) {
    try {
        const gsmNumber = `0${payload.gsmNumber}`;
        const newUser = { ...payload, gsmNumber };
        yield apiV1.post(endpoints.preSmeUserRegistiration, { ...payload, gsmNumber });

        yield put(preSignUpSuccess(newUser));
    } catch (error) {
        console.log(error);
        yield put(preSignUpFailure());
    }
}

export function* signUpSaga({ payload }) {
    try {
        // const gsmNumber = `0${payload.gsmNumber}`;
        const newUser = yield apiV1.post(
            endpoints.smeUsers,
            { ...payload },
            { headers: { 'X-Platform': 'Web' } }
        );

        notification.success({ message: 'Kaydınız başarıyla tamamlandı.' });
        yield put(signUpSuccess(newUser));
        yield put(signUpReset());
        // yield put(preSignUpReset());

        // firebase.analytics().logEvent('register_success', { platform: 'web', email: payload.email });
    } catch (error) {
        console.log(error);
        yield put(signUpFailure());
    }
}

export function* sendCodeSaga({ payload }) {
    try {
        // const gsmNumber = `0${payload.gsmNumber}`;
        const newUser = yield apiV1.post(
            endpoints.validateOTP,
            { code: payload },
            { headers: { 'X-Platform': 'Web' } }
        );
        if (newUser.data.isOtpValid) {
            notification.success({ message: 'Üyeliğiniz aktive edilmiştir.' });
            yield put(sendCodeSuccess(newUser.data));
        } else {
            notification.error({ message: 'Geçersiz telefon kodu girdiniz.' });
            yield put(sendCodeFailure());
        }
    } catch (error) {
        console.log(error);
        yield put(sendCodeFailure());
    }
}

export function* getCodeSaga({ payload }) {
    try {
        const gsmNumber = `0${payload}`;
        const newUser = yield apiV1.patch(
            endpoints.updateGsmNumber,
            { gsmNumber },
            { headers: { 'X-Platform': 'Web' } }
        );
        yield put(getCodeSuccess(newUser.data));
    } catch (error) {
        console.log(error);
        yield put(getCodeFailure());
    }
}
