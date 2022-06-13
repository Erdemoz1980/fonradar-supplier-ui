class LocalStorageService {
    constructor() {
        this.authTokenKey = 'fon-radar-auth';
    }

    getAuthToken() {
        return localStorage.getItem(this.authTokenKey);
    }

    setAuthToken(token) {
        localStorage.setItem(this.authTokenKey, `${token}`);
    }

    removeAuthToken() {
        localStorage.removeItem(this.authTokenKey);
    }
}

export default new LocalStorageService();
