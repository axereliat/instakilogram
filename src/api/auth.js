export class Auth {
    static saveData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('isAdmin', data.isAdmin);
    }

    static isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }

    static isAdmin() {
        return localStorage.getItem('isAdmin') !== null;
    }

    static getUsername() {
        return localStorage.getItem('username');
    }

    static getUserId() {
        return localStorage.getItem('userId');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static logout() {
        localStorage.clear();
    }
}
