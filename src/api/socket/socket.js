import { io } from 'socket.io-client'
import { logout } from '../web/auth.js'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const protocol = import.meta.env.MODE === 'production' ? 'wss' : 'ws'

export const socket = io(`${protocol}://${SERVER_ADDRESS}`, {
  extraHeaders: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

socket.on('connect', () => {
  console.log('connected')
})

socket.on('server_alert', (al) => {
  alert(al.message)
})

socket.on('disconnect', () => {
  console.log('disconnected here')

  logout()
})
