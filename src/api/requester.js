import axios from 'axios';

const baseUrl = 'http://localhost:8000/';

export class Requester {

    static signUp(username, password) {
        return axios.post(baseUrl + 'users/register', {
            username,
            password
        });
    }

    static signIn(username, password) {
        return axios.post(baseUrl + 'users/login', {
            username,
            password
        });
    }
}
