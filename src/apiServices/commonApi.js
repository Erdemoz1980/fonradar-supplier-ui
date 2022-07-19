/* eslint-disable no-empty */
import { endpoints, apiV3 } from '../services/apis';

const fetchProvinces = async () => {
    try {
        const data = await apiV3.get(endpoints.provinces);
        return data;
    } catch (error) {}
};

const fetchDistricts = async (id) => {
    try {
        const { data } = await apiV3.get(endpoints.getDistrictsEndpoint(id));
        const { districts } = data;
        return districts;
    } catch (error) {}
};

const fetchTaxOffices = async (id) => {
    try {
        const data = await apiV3.get(endpoints.getTaxOfficesEndpoint(id));
        return data;
    } catch (error) {}
};

export { fetchProvinces, fetchDistricts, fetchTaxOffices };
