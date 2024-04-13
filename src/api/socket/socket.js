import { io } from "socket.io-client"

export let socket

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const protocol = import.meta.env.MODE === "production" ? "wss" : "ws"

console.log("prot", protocol)

export const init = () => {
    socket = io(`${ protocol }://${ SERVER_ADDRESS }`, {
        withCredentials: true
    })

    socket.on("connect", () => {
        console.log("connected")
    })

    socket.on("server_alert", (al) => {
        alert(al.message)
    })
}