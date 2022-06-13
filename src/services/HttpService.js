import axios from 'axios';
import Interceptor from './Interceptor';

class HttpService {
    constructor(options) {
        const { baseURL, isFonRadarApi = true } = options;
        this.axiosInstance = axios.create({ baseURL, isFonRadarApi });
        this.interceptor = new Interceptor(this.axiosInstance);
    }

    async get(url, config) {
        const { data } = await this.axiosInstance.get(url, config);
        return data;
    }

    async post(url, payload, config) {
        const { data } = await this.axiosInstance.post(url, payload, config);
        return data;
    }

    async put(url, payload, config) {
        const { data } = await this.axiosInstance.put(url, payload, config);
        return data;
    }

    async patch(url, payload, config) {
        const { data } = await this.axiosInstance.patch(url, payload, config);
        return data;
    }

    async delete(url, payload, config) {
        const { data } = await this.axiosInstance.delete(url, { ...config, data: payload });
        return data;
    }
}

export default HttpService;
