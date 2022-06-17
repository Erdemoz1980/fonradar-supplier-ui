export const provinceActionTypes = {
    FETCH_PROVINCES: 'FETCH_PROVINCES',
    FETCH_PROVINCES_SUCCESS: 'FETCH_PROVINCES_SUCCESS',
    FETCH_PROVINCES_FAILURE: 'FETCH_PROVINCES_FAILURE',

    FETCH_DISTRICTS: 'FETCH_DISTRICTS',
    FETCH_DISTRICTS_SUCCESS: 'FETCH_DISTRICTS_SUCCESS',
    FETCH_DISTRICTS_FAILURE: 'FETCH_DISTRICTS_FAILURE',
    FETCH_DISTRICTS_RESET: 'FETCH_DISTRICTS_RESET',

    FETCH_TAX_OFFICES: 'FETCH_TAX_OFFICES',
    FETCH_TAX_OFFICES_SUCCESS: 'FETCH_TAX_OFFICES_SUCCESS',
    FETCH_TAX_OFFICES_FAILURE: 'FETCH_TAX_OFFICES_FAILURE',
    FETCH_TAX_OFFICES_RESET: 'FETCH_TAX_OFFICES_RESET',
};

export const fetchProvinces = () => ({ type: provinceActionTypes.FETCH_PROVINCES });
export const fetchProvincesSuccess = (provinces) => ({
    type: provinceActionTypes.FETCH_PROVINCES_SUCCESS,
    payload: provinces,
});
export const fetchProvincesFailure = () => ({ type: provinceActionTypes.FETCH_PROVINCES_FAILURE });

export const fetchDistricts = (provinceId) => ({
    type: provinceActionTypes.FETCH_DISTRICTS,
    payload: provinceId,
});
export const fetchDistrictsSuccess = (districts) => ({
    type: provinceActionTypes.FETCH_DISTRICTS_SUCCESS,
    payload: districts,
});
export const fetchDistrictsFailure = () => ({ type: provinceActionTypes.FETCH_DISTRICTS_FAILURE });

export const fetchTaxOffices = (provinceId) => ({
    type: provinceActionTypes.FETCH_TAX_OFFICES,
    payload: provinceId,
});
export const fetchTaxOfficesSuccess = (taxOffices) => ({
    type: provinceActionTypes.FETCH_TAX_OFFICES_SUCCESS,
    payload: taxOffices,
});
export const fetchTaxOfficesFailure = () => ({
    type: provinceActionTypes.FETCH_TAX_OFFICES_FAILURE,
});
