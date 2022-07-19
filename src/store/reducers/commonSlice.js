/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    provinces: [],
    districts: [],
    taxOffices: [],
    selectedProvinceIdForDistricts: null,
    selectedProvinceIdForTaxOffices: null,
};

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setProvinces(state, action) {
            state.provinces = action.payload;
        },
        setDistricts(state, action) {
            state.districts = action.payload;
        },
        setTaxOffices(state, action) {
            state.taxOffices = action.payload;
        },
    },
});

export const { setProvinces, setDistricts, setTaxOffices } = commonSlice.actions;
export default commonSlice.reducer;
