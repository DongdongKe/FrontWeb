import axios from 'axios';

axios.defaults.timeout = 30000;
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL

//http response Interceptor
axios.interceptors.response.use(function (response) {
    const res = response.data
    if (res.responseCode === 0) {
        return res
    }
})

/**
 * Encapsulate the get method 
 * @param url
 * @param data
 * @returns {Promise}
 */
export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err)
        })
    })
}

/**
 * Encapsulate post request 
 * @param url
 * @param data
 * @returns {Promise}
 */
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data).then(response => {
            resolve(response);
        }, err => {
            reject(err)
        })
    })
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data).then(response => {
            resolve(response);
        }, err => {
            reject(err)
        })
    })
}

/**
 * Encapsulate the patch request 
 * @param url
 * @param data
 * @returns {Promise}
 */
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data).then(response => {
            resolve(response);
        }, err => {
            reject(err)
        })
    })
}

/**
 * delete
 * @param {String} url [Requested url address ]
 * @param {Object} params [Parameters carried in the request ]
 */
 export function deletefn(url, params) {
    return new Promise((resolve, reject) => {
        axios.delete(url, params).then(response => {
            resolve(response);
        }).catch(err => {
            reject(err.data)
        })
    });
}