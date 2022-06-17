import { provinceActionTypes } from './provinceActions';

const initialState = {
    provinces: [],
    isProvincesLoading: false,

    districts: [],
    selectedProvinceIdForDistricts: null,
    isDistrictsLoading: false,

    taxOffices: [],
    selectedProvinceIdForTaxOffices: null,
    isTaxOfficesLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case provinceActionTypes.FETCH_PROVINCES:
            return { ...state, isProvincesLoading: true };
        case provinceActionTypes.FETCH_PROVINCES_SUCCESS:
            return { ...state, isProvincesLoading: false, provinces: action.payload };
        case provinceActionTypes.FETCH_PROVINCES_FAILURE:
            return { ...state, isProvincesLoading: false };

        case provinceActionTypes.FETCH_DISTRICTS:
            return { ...state, isDistrictsLoading: true, selectedProvinceIdForDistricts: action.payload };
        case provinceActionTypes.FETCH_DISTRICTS_SUCCESS:
            return { ...state, isDistrictsLoading: false, districts: action.payload };
        case provinceActionTypes.FETCH_DISTRICTS_FAILURE:
        case provinceActionTypes.FETCH_DISTRICTS_RESET:
            return {
                ...state,
                isDistrictsLoading: false,
                districts: [],
                selectedProvinceIdForDistricts: null,
            };

        case provinceActionTypes.FETCH_TAX_OFFICES:
            return {
                ...state,
                isTaxOfficesLoading: true,
                selectedProvinceIdForTaxOffices: action.payload,
            };
        case provinceActionTypes.FETCH_TAX_OFFICES_SUCCESS:
            return { ...state, isTaxOfficesLoading: false, taxOffices: action.payload };
        case provinceActionTypes.FETCH_TAX_OFFICES_FAILURE:
        case provinceActionTypes.FETCH_TAX_OFFICES_RESET:
            return {
                ...state,
                isTaxOfficesLoading: false,
                taxOffices: [],
                selectedProvinceIdForTaxOffices: null,
            };

        default:
            return state;
    }
};
