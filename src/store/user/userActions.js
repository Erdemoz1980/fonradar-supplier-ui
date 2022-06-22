export const userActionTypes = {
    AUTO_LOGIN: 'AUTO_LOGIN',
    AUTO_LOGIN_SUCCESS: 'AUTO_LOGIN_SUCCESS',
    AUTO_LOGIN_FAILURE: 'AUTO_LOGIN_FAILURE',

    LOGIN: 'LOGIN',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',

    LOGOUT: 'LOGOUT',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAILURE: 'LOGOUT_FAILURE',

    PRE_SIGN_UP: 'PRE_SIGN_UP',
    PRE_SIGN_UP_SUCCESS: 'PRE_SIGN_UP_SUCCESS',
    PRE_SIGN_UP_FAILURE: 'PRE_SIGN_UP_FAILURE',
    PRE_SIGN_UP_RESET: 'PRE_SIGN_UP_RESET',

    SIGN_UP: 'SIGN_UP',
    SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
    SIGN_UP_FAILURE: 'SIGN_UP_FAILURE',
    SIGN_UP_RESET: 'SIGN_UP_RESET',

    RESET_PASSWORD_SEND_CODE: 'RESET_PASSWORD_SEND_CODE',
    RESET_PASSWORD_SEND_CODE_SUCCESS: 'RESET_PASSWORD_SEND_CODE_SUCCESS',
    RESET_PASSWORD_SEND_CODE_FAILURE: 'RESET_PASSWORD_SEND_CODE_FAILURE',

    RESET_PASSWORD: 'RESET_PASSWORD',
    RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
    RESET_PASSWORD_FAILURE: 'RESET_PASSWORD_FAILURE',
    RESET_PASSWORD_RESET: 'RESET_PASSWORD_RESET',

    FETCH_USER: 'FETCH_USER',
    FETCH_USER_SUCCESS: 'FETCH_USER_SUCCESS',
    FETCH_USER_FAILURE: 'FETCH_USER_FAILURE',

    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    UPDATE_USER_FAILURE: 'UPDATE_USER_FAILURE',
    UPDATE_USER_RESET: 'UPDATE_USER_RESET',

    UPDATE_USER_TAXID_PROVINCE: 'UPDATE_USER_TAXID_PROVINCE',
    UPDATE_USER_TAXID_PROVINCE_SUCCESS: 'UPDATE_USER_TAXID_PROVINCE_SUCCESS',
    UPDATE_USER_TAXID_PROVINCE_FAILURE: 'UPDATE_USER_TAXID_PROVINCE_FAILURE',
    UPDATE_USER_TAXID_PROVINCE_RESET: 'UPDATE_USER_TAXID_PROVINCE_RESET',

    SEND_CODE: 'SEND_CODE',
    SEND_CODE_SUCCESS: 'SEND_CODE_SUCCESS',
    SEND_CODE_FAILURE: 'SEND_CODE_FAILURE',

    GET_CODE: 'GET_CODE',
    GET_CODE_SUCCESS: 'GET_CODE_SUCCESS',
    GET_CODE_FAILURE: 'GET_CODE_FAILURE',

    GET_DOCTYPE: 'GET_DOCTYPE',
    GET_DOCTYPE_SUCCESS: 'GET_DOCTYPE_SUCCESS',
    GET_DOCTYPE_FAILURE: 'GET_DOCTYPE_FAILURE',

    UPLOAD_DOC: 'UPLOAD_DOC',
    UPLOAD_DOC_SUCCESS: 'UPLOAD_DOC_SUCCESS',
    UPLOAD_DOC_FAILURE: 'UPLOAD_DOC_FAILURE',
    SET_LOGGEDIN: 'SET_LOGGEDIN',
};

// LOGIN
export const autoLogin = () => ({ type: userActionTypes.AUTO_LOGIN });
export const login = (userCredentials, history) => ({
    type: userActionTypes.LOGIN,
    payload: userCredentials,
    history,
});
export const loginSuccess = () => ({ type: userActionTypes.LOGIN_SUCCESS });
export const loginFailure = () => ({ type: userActionTypes.LOGIN_FAILURE });

export const logout = () => ({ type: userActionTypes.LOGOUT });
export const logoutSuccess = () => ({ type: userActionTypes.LOGOUT_SUCCESS });
export const logoutFailure = () => ({ type: userActionTypes.LOGOUT_FAILURE });

// SIGN-UP
export const signUp = (userVals) => ({
    type: userActionTypes.SIGN_UP,
    payload: userVals,
});
export const signUpSuccess = (newUser) => ({ type: userActionTypes.SIGN_UP_SUCCESS, payload: newUser });
export const signUpFailure = () => ({ type: userActionTypes.SIGN_UP_FAILURE });
export const signUpReset = () => ({ type: userActionTypes.SIGN_UP_RESET });

export const preSignUp = (userVals) => ({
    type: userActionTypes.PRE_SIGN_UP,
    payload: userVals,
});
export const preSignUpSuccess = (newUser) => ({
    type: userActionTypes.PRE_SIGN_UP_SUCCESS,
    payload: newUser,
});
export const preSignUpFailure = () => ({ type: userActionTypes.PRE_SIGN_UP_FAILURE });
export const preSignUpReset = () => ({ type: userActionTypes.PRE_SIGN_UP_RESET });

// RESET PASSWORD
export const resetPasswordSendCode = (email) => ({
    type: userActionTypes.RESET_PASSWORD_SEND_CODE,
    payload: email,
});
export const resetPasswordSendCodeSuccess = (email) => ({
    type: userActionTypes.RESET_PASSWORD_SEND_CODE_SUCCESS,
    payload: email,
});
export const resetPasswordSendCodeFailure = () => ({
    type: userActionTypes.RESET_PASSWORD_SEND_CODE_FAILURE,
});

export const resetPassword = ({ code, password }) => ({
    type: userActionTypes.RESET_PASSWORD,
    payload: { code, password },
});
export const resetPasswordSuccess = () => ({ type: userActionTypes.RESET_PASSWORD_SUCCESS });
export const resetPasswordFailure = () => ({ type: userActionTypes.RESET_PASSWORD_FAILURE });
export const resetPasswordReset = () => ({ type: userActionTypes.RESET_PASSWORD_RESET });

// FETCH USER
export const fetchUser = () => ({ type: userActionTypes.FETCH_USER });
export const fetchUserSuccess = (user) => ({
    type: userActionTypes.FETCH_USER_SUCCESS,
    payload: user,
});
export const fetchUserFailure = () => ({
    type: userActionTypes.FETCH_USER_FAILURE,
});

// UPDATE USER
export const updateUser = (user) => ({ type: userActionTypes.UPDATE_USER, payload: user });
export const updateUserSuccess = (user) => ({
    type: userActionTypes.UPDATE_USER_SUCCESS,
    payload: user,
});
export const updateUserFailure = () => ({
    type: userActionTypes.UPDATE_USER_FAILURE,
});
export const updateUserReset = () => ({
    type: userActionTypes.UPDATE_USER_RESET,
});

export const updateUserTaxIdProvince = ({ taxId, province, taxAdministration }) => ({
    type: userActionTypes.UPDATE_USER_TAXID_PROVINCE,
    payload: { taxId, province, taxAdministration },
});
export const updateUserTaxIdProvinceSuccess = ({ taxId, province, taxAdministration }) => ({
    type: userActionTypes.UPDATE_USER_TAXID_PROVINCE_SUCCESS,
    payload: { taxId, province, taxAdministration },
});
export const updateUserTaxIdProvinceFailure = () => ({
    type: userActionTypes.UPDATE_USER_TAXID_PROVINCE_FAILURE,
});
export const updateUserTaxIdProvinceReset = () => ({
    type: userActionTypes.UPDATE_USER_TAXID_PROVINCE_RESET,
});

export const sendCode = ({ code, gsmNumber }) => ({
    type: userActionTypes.SEND_CODE,
    payload: { code, gsmNumber },
});
export const sendCodeSuccess = (code) => ({
    type: userActionTypes.SEND_CODE_SUCCESS,
    payload: code,
});
export const sendCodeFailure = () => ({
    type: userActionTypes.SEND_CODE_FAILURE,
});

export const getCode = (gsmNumber) => ({
    type: userActionTypes.GET_CODE,
    payload: gsmNumber,
});
export const getCodeSuccess = (gsmNumber) => ({
    type: userActionTypes.GET_CODE_SUCCESS,
    payload: gsmNumber,
});
export const getCodeFailure = () => ({
    type: userActionTypes.GET_CODE_FAILURE,
});

export const getDocType = () => ({
    type: userActionTypes.GET_DOCTYPE,
});
export const getDocTypeSuccess = (data) => ({
    type: userActionTypes.GET_DOCTYPE_SUCCESS,
    payload: data,
});
export const getDocTypeFailure = () => ({
    type: userActionTypes.GET_DOCTYPE_FAILURE,
});

export const uploadDoc = (data) => ({
    type: userActionTypes.UPLOAD_DOC,
    payload: data,
});
export const uploadDocSuccess = (data) => ({
    type: userActionTypes.UPLOAD_DOC_SUCCESS,
    payload: data,
});
export const uploadDocFailure = () => ({
    type: userActionTypes.UPLOAD_DOC_FAILURE,
});

export const setLoggedIn = (data) => ({
    type: userActionTypes.SET_LOGGEDIN,
    payload: data,
});
