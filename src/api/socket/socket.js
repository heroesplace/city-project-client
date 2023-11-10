import { io } from "socket.io-client"

export let socket = null

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export const init = () => {
    socket = io(`ws://${ SERVER_ADDRESS }:3001`, {
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