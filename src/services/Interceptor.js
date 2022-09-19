import { notification } from 'antd';
// import urls from '../routes/urls';
import LocalStorageService from './LocalStorageService';

class Interceptor {
    constructor(axiosInstance) {
        this.axiosInstance = axiosInstance;
        this.requestInterceptor = null;
        this.responseInterceptor = null;

        this.setRequestInterceptor(axiosInstance);
        this.setResponseInterceptor(axiosInstance);
    }

    setRequestInterceptor() {
        this.requestInterceptor = this.axiosInstance.interceptors.request.use(
            (config) => {
                const authToken = LocalStorageService.getAuthToken();

                if (config.isFonRadarApi) {
                    if (authToken) {
                        config.headers['x-token'] = authToken;
                        config.headers.Authorization = `Bearer ${authToken}`;
                    }

                    config.headers.common.withCredentials = false;
                    config.headers.common.Accept = 'fund/json';
                }

                return config;
            },
            (error) => Promise.reject(error)
        );
    }

    setResponseInterceptor() {
        this.responseInterceptor = this.axiosInstance.interceptors.response.use(
            (response) => {
                if (
                    response.data &&
                    response.data.message &&
                    !response.data.message.includes('ile Başarılı Bir Şekilde Oluşturuldu')
                ) {
                    notification.info({ message: response.data.message });
                }
                if (response.headers && response.headers && response.headers['x-token']) {
                    LocalStorageService.setAuthToken(response.headers['x-token']);
                }

                return response;
            },

            ({ response: error }) => {
                if (error && error.data && error.data.detail) {
                    notification.error({ message: error.data.detail });
                } else if (error && error.data && error.data.errors && error.data.errors.length > 0) {
                    notification.error({ message: 'Aynı email ile ilgili bir hesap bulunmuştur' });
                } else if (error && error.data && error.data.message) {
                    notification.error({ message: error.data.message });
                } else if (error && error.status === 401) {
                    // LocalStorageService.removeAuthToken();
                    // if (window.location.pathname !== urls.login) {
                    //     window.location = urls.login;
                    // }
                } else {
                    notification.error({ message: 'Beklenmedik bir hata oluştu!' });
                }
                return Promise.reject(error);
            }
        );
    }
}

export default Interceptor;
