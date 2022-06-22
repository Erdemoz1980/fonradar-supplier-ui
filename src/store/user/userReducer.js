import LocalStorageService from '../../services/LocalStorageService';
import { userActionTypes } from './userActions';

const initialState = {
    isLoggedIn: LocalStorageService.getAuthToken(),
    isLoginLoading: false,
    user: null,
    isUserLoading: false,

    isUserSubscriptionsLoading: false,

    preCreatedUser: null,
    isPreSignUpLoading: false,
    createdUser: null,
    isSignUpLoading: false,

    updatedUser: null,
    isUpdateUserLoading: false,
    updatedTaxIdProvince: null, // used in CreateFund/IdForm
    isUpdateTaxIdProvinceLoading: false,

    passwordResettingEmail: '',
    passwordResettedEmail: '',
    isResetPasswordLoading: false,
    isResetPasswordSendCodeLoading: false,

    isSendCodeLoading: false,
    sendCodeResponse: '',
    isGetCodeLoading: false,
    getCodeResponse: '',
    getDocTypeRes: '',
    isUploadDocLoading: false,
    uploadDocResponse: '',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.LOGIN:
            return { ...state, isLoginLoading: true };
        case userActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoginLoading: false,
                isLoggedIn: true,
                // user: action.payload.user,
            };
        case userActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoginLoading: false,
                isLoggedIn: false,
                user: null,
            };
        case userActionTypes.LOGOUT_SUCCESS:
            return { ...state, user: null, isLoggedIn: false };

        case userActionTypes.RESET_PASSWORD_SEND_CODE:
            return { ...state, isResetPasswordSendCodeLoading: true };
        case userActionTypes.RESET_PASSWORD_SEND_CODE_SUCCESS:
            return {
                ...state,
                isResetPasswordSendCodeLoading: false,
                passwordResettingEmail: action.payload,
            };
        case userActionTypes.RESET_PASSWORD_SEND_CODE_FAILURE:
            return { ...state, isResetPasswordSendCodeLoading: false };

        case userActionTypes.RESET_PASSWORD:
            return { ...state, isResetPasswordLoading: true };
        case userActionTypes.RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isResetPasswordLoading: false,
                passwordResettedEmail: state.passwordResettingEmail,
            };
        case userActionTypes.RESET_PASSWORD_FAILURE:
            return { ...state, isResetPasswordLoading: false };
        case userActionTypes.RESET_PASSWORD_RESET:
            return {
                ...state,
                isResetPasswordLoading: false,
                passwordResettedEmail: '',
                passwordResettingEmail: '',
            };

        case userActionTypes.PRE_SIGN_UP:
            return { ...state, isPreSignUpLoading: true };
        case userActionTypes.PRE_SIGN_UP_SUCCESS:
            return { ...state, isPreSignUpLoading: false, preCreatedUser: action.payload };
        case userActionTypes.PRE_SIGN_UP_FAILURE:
            return { ...state, isPreSignUpLoading: false };
        case userActionTypes.PRE_SIGN_UP_RESET:
            return { ...state, isPreSignUpLoading: false, preCreatedUser: null };

        case userActionTypes.SIGN_UP:
            return { ...state, isSignUpLoading: true };
        case userActionTypes.SIGN_UP_SUCCESS:
            return { ...state, isSignUpLoading: false, createdUser: action.payload };
        case userActionTypes.SIGN_UP_FAILURE:
            return { ...state, isSignUpLoading: false };
        case userActionTypes.SIGN_UP_RESET:
            return { ...state, isSignUpLoading: false, createdUser: null };

        case userActionTypes.FETCH_USER:
            return { ...state, isUserLoading: true };
        case userActionTypes.FETCH_USER_SUCCESS:
            return { ...state, isUserLoading: false, user: action.payload };
        case userActionTypes.FETCH_USER_FAILURE:
            return { ...state, isUserLoading: false, user: {} };

        case userActionTypes.UPDATE_USER:
            return { ...state, isUpdateUserLoading: true };
        case userActionTypes.UPDATE_USER_SUCCESS:
            return { ...state, isUpdateUserLoading: false, updatedUser: action.payload };
        case userActionTypes.UPDATE_USER_FAILURE:
            return { ...state, isUpdateUserLoading: false, updatedUser: null };
        case userActionTypes.UPDATE_USER_RESET:
            return { ...state, isUpdateUserLoading: false, updatedUser: null };

        case userActionTypes.UPDATE_USER_TAXID_PROVINCE:
            return { ...state, isUpdateTaxIdProvinceLoading: true };
        case userActionTypes.UPDATE_USER_TAXID_PROVINCE_SUCCESS:
            return { ...state, isUpdateTaxIdProvinceLoading: false, updatedTaxIdProvince: action.payload };
        case userActionTypes.UPDATE_USER_TAXID_PROVINCE_FAILURE:
            return { ...state, isUpdateTaxIdProvinceLoading: false, updatedTaxIdProvince: null };
        case userActionTypes.UPDATE_USER_TAXID_PROVINCE_RESET:
            return { ...state, isUpdateTaxIdProvinceLoading: false, updatedTaxIdProvince: null };

        case userActionTypes.SEND_CODE:
            return { ...state, isSendCodeLoading: true };
        case userActionTypes.SEND_CODE_SUCCESS:
            return {
                ...state,
                isSendCodeLoading: false,
                sendCodeResponse: action.payload,
            };
        case userActionTypes.SEND_CODE_FAILURE:
            return { ...state, isSendCodeLoading: false };

        case userActionTypes.GET_CODE:
            return { ...state, isGetCodeLoading: true };
        case userActionTypes.GET_CODE_SUCCESS:
            return {
                ...state,
                isGetCodeLoading: false,
                getCodeResponse: action.payload,
            };
        case userActionTypes.GET_CODE_FAILURE:
            return { ...state, isGetCodeLoading: false };

        case userActionTypes.GET_DOCTYPE:
            return { ...state };
        case userActionTypes.GET_DOCTYPE_SUCCESS:
            return {
                ...state,
                getDocTypeRes: action.payload,
            };
        case userActionTypes.GET_DOCTYPE_FAILURE:
            return { ...state };

        case userActionTypes.UPLOAD_DOC:
            return { ...state, isUploadDocLoading: true };
        case userActionTypes.UPLOAD_DOC_SUCCESS:
            return {
                ...state,
                isUploadDocLoading: false,
                uploadDocResponse: action.payload,
            };
        case userActionTypes.UPLOAD_DOC_FAILURE:
            return { ...state, isUploadDocLoading: false };

        case userActionTypes.SET_LOGGEDIN:
            return {
                ...state,
                isLoggedIn: action.payload,
            };
        default:
            return state;
    }
};
