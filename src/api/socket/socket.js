import { io } from "socket.io-client"

export let socket = null

export const init = () => {
    socket = io("ws://libertyr0ad.fr:3001", {
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