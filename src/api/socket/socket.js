import { io } from "socket.io-client"

export let socket = null

export const init = () => {
    socket = io("ws://localhost:3001", {
        auth: {
            token: document.cookie.split('=')[1]
        }
    })

    socket.on("connect", () => {
        console.log("connected")
    })
}