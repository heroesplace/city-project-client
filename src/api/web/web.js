import axios from 'axios'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export const instance = axios.create({
    baseURL: `http://${ SERVER_ADDRESS }:3000/api/`,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
})