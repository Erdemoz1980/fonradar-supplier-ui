import { takeLatest } from 'redux-saga/effects';
import actionTypes from './actionTypes';
import {
    loginSaga,
    logoutSaga,
    resetPasswordSendCodeSaga,
    signUpSaga,
    fetchUserSaga,
    updateUserSaga,
    resetPasswordSaga,
    updateUserTaxIdProvinceSaga,
    preSignUpSaga,
    sendCodeSaga,
    getCodeSaga,
    getDocTypeSaga,
    uploadDocSaga,
} from './user/userSagas';
import { fetchDistrictsSaga, fetchProvincesSaga, fetchTaxOfficesSaga } from './provinces/provinceSagas';

export default function* watchSagas() {
    // USER
    yield takeLatest(actionTypes.LOGIN, loginSaga);
    yield takeLatest(actionTypes.LOGOUT, logoutSaga);
    yield takeLatest(actionTypes.SIGN_UP, signUpSaga);
    yield takeLatest(actionTypes.PRE_SIGN_UP, preSignUpSaga);
    yield takeLatest([actionTypes.FETCH_USER, actionTypes.UPDATE_USER_SUCCESS], fetchUserSaga);
    yield takeLatest(actionTypes.UPDATE_USER, updateUserSaga);
    yield takeLatest(actionTypes.UPDATE_USER_TAXID_PROVINCE, updateUserTaxIdProvinceSaga);

    yield takeLatest(actionTypes.RESET_PASSWORD_SEND_CODE, resetPasswordSendCodeSaga);
    yield takeLatest(actionTypes.RESET_PASSWORD, resetPasswordSaga);
    yield takeLatest(actionTypes.SEND_CODE, sendCodeSaga);
    yield takeLatest(actionTypes.GET_CODE, getCodeSaga);
    yield takeLatest(actionTypes.GET_DOCTYPE, getDocTypeSaga);
    yield takeLatest(actionTypes.UPLOAD_DOC, uploadDocSaga);

    // PROVINCES
    yield takeLatest(actionTypes.FETCH_PROVINCES, fetchProvincesSaga);
    yield takeLatest(actionTypes.FETCH_DISTRICTS, fetchDistrictsSaga);
    yield takeLatest(actionTypes.FETCH_TAX_OFFICES, fetchTaxOfficesSaga);
}
