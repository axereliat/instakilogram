import axios from 'axios';

const baseUrl = 'http://localhost:8000/';

export class Requester {

    static signUp(formData) {
        return axios.post(baseUrl + 'users/register', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }

    static signIn(username, password) {
        return axios.post(baseUrl + 'users/login', {
            username,
            password
        });
    }
}
