import axios from 'axios'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS
const protocol = import.meta.env.MODE === "production" ? "https" : "http"

export const instance = axios.create({
    baseURL: `${ protocol }://${ SERVER_ADDRESS }/api/`,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
})