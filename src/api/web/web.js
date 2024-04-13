import axios from 'axios'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export const instance = axios.create({
    baseURL: `https://${ SERVER_ADDRESS }/api/`,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
})