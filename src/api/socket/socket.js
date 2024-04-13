import { io } from "socket.io-client"

export let socket

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export const init = () => {
    socket = io(`wss://${ SERVER_ADDRESS }`, {
        auth: {
            token: document.cookie.split('=')[1]
        }
    })

    socket.on("connect", () => {
        console.log("connected")
    })

    socket.on("server_alert", (al) => {
        alert(al.message)
    })
}