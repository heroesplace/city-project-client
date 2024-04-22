import { io } from "socket.io-client"
import router from "../../router/"

export let socket

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const protocol = import.meta.env.MODE === "production" ? "wss" : "ws"

export const init = () => {
    console.log("Connecting to server")
    socket = io(`${ protocol }://${ SERVER_ADDRESS }`, {
        query: 'token=' + localStorage.getItem('token'),
        reconnection: true
    })

    socket.on("connect", () => {
        console.log("connected")
    })

    socket.on("server_alert", (al) => {
        alert(al.message)
    })

    socket.on("disconnect", () => {
        console.log("disconnected")
        router.push('/')
    })
}

export const close = () => {
    socket.close()
}