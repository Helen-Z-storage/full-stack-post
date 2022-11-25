
import axios from 'axios'

let config = (headers) => ({
    baseURL: "http://localhost:8080/api/",
    headers: headers,
    responseType: 'json'
});

// response interceptor
axios.interceptors.response.use(res => res.data);


export function get(url, headers = {}) {
    return axios.get(url, config(headers))
}

export function post(url, data, headers = {}) {
    return axios.post(url, data, config(headers))
}

export function patch(url, data, headers = {}) {
    return axios.patch(url, data, config(headers))
}

export function del(url, headers = {}) {
    return axios.delete(url, config(headers))
}