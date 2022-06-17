import { put } from 'redux-saga/effects';
import { endpoints, apiV3 } from '../../services/apis';
import {
    fetchDistrictsFailure,
    fetchDistrictsSuccess,
    fetchProvincesFailure,
    fetchProvincesSuccess,
    fetchTaxOfficesSuccess,
    fetchTaxOfficesFailure,
} from './provinceActions';

export function* fetchProvincesSaga() {
    try {
        const response = yield apiV3.get(endpoints.provinces);

        yield put(fetchProvincesSuccess(response));
    } catch (error) {
        console.log(error);
        yield put(fetchProvincesFailure());
    }
}

export function* fetchDistrictsSaga({ payload }) {
    try {
        const { data } = yield apiV3.get(endpoints.getDistrictsEndpoint(payload));
        const { districts } = data;

        yield put(fetchDistrictsSuccess(districts));
    } catch (error) {
        console.log(error);
        yield put(fetchDistrictsFailure());
    }
}

export function* fetchTaxOfficesSaga({ payload }) {
    try {
        const response = yield apiV3.get(endpoints.getTaxOfficesEndpoint(payload));

        yield put(fetchTaxOfficesSuccess(response));
    } catch (error) {
        console.log(error);
        yield put(fetchTaxOfficesFailure());
    }
}
