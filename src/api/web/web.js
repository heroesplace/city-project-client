import axios from 'axios'

export const instance = axios.create({
    baseURL: 'http://libertyr0ad.fr:3000/api/',
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
})