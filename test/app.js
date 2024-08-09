import { io } from 'socket.io-client'

const token = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFyYWN0ZXJJZCI6MSwiaWF0IjoxNzIzMTM0MDY0fQ.MbYImLwfbPXlT1TGM_QVOUL8NvF7kK-z041a2vX2sgzTXuhf61FrJk9zAWS2GUxC-Rsi6wAr364qOWJrfUwNsvxTqTW86IIoVGdhq0Raz9W0rUS1MYs2rgBcWz7RcN3Yqtt3w0TIoeIz_aAgJ9f017NPJKwuhujR7Or1KYfTOb8YmPfsnBRZN9OynQIMKnLPRWxtlJO1ZsyYrgwG9KKPeOEr1RzDoNS-mih7kfOS-I8HWZ-1zDQVR6Ec3mkLBKUx7GD0nCcPtUxObh-xtomtQUGiZjfNd6tW3Jjhry8Q2SlOpsgjZDTiewlQVgSmy2slwqrbyyKkJb3sKUsaUhptvg"

export const socket = io(`ws://127.0.0.1:3000`, {
  extraHeaders: {
    authorization: `Bearer ${token}`
  }
})

socket.emit('invite_character', {
  receiver: 3,
  mode: 'chart'
})
