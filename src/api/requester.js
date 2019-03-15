import axios from 'axios';

const baseUrl = 'http://localhost:8000/';
// const baseUrl = 'https://instakilogram-rest.herokuapp.com/';

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

    static createPost(formData) {
        return axios.post(baseUrl + 'posts', formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        });
    }

    static fetchUsers(search) {
        return axios.get(baseUrl + 'users/all?search=' + search);
    }

    static fetchUserProfile(userId) {
        return axios.get(baseUrl + 'users/profile/' + userId);
    }

    static followOrUnfollow(userId) {
        return axios.post(baseUrl + 'users/followOrUnfollow/' + userId);
    }

    static adminEditUser(userId, username) {
        return axios.post(baseUrl + 'admin/users/' + userId, {username});
    }

    static adminDeleteUser(userId) {
        return axios.delete(baseUrl + 'admin/users/' + userId);
    }

    static fetchNewsFeed() {
        return axios.get(baseUrl + 'posts/newsfeed');
    }

    static deletePost(postId) {
        return axios.delete(baseUrl + 'posts/' + postId);
    }

    static likePost(postId) {
        return axios.post(baseUrl + 'posts/like/' + postId);
    }
}

