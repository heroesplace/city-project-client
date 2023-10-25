import { defineStore } from 'pinia'

const SERVER_ADDRESS="localhost"

export const useAuth = defineStore('auth', {
    state: () => ({
        authenticated: false,
    }),
    getters: {
        isAuthenticated() {
            return this.authenticated
        }
    },
    actions: {
        async login(account_name, password) {
            return new Promise((resolve, reject) => {
                const options = {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        account_name: account_name,
                        password: password,
                    })
                }

                fetch(`http://${ SERVER_ADDRESS }:3000/api/account/login?=`, options)
                    .then(response => response.json())
                    .then(response => {
                        if (response.status == 200) {
                            console.log(response)

                            this.authenticated = true

                            resolve()
                        } else {
                            reject(new Error('Login failed'))
                        }
                    })
                    .catch(err => reject(err))
            })
        },
        async checkToken() {
            return new Promise((resolve, reject) => {
                const options = {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
                
                fetch(`http://${ SERVER_ADDRESS }:3000/api/account/verify-token?=`, options)
                .then(response => response.json())
                .then(response => {
                    if (response.status == 200) {
                        this.authenticated = true

                        resolve(this.authenticated)
                    } else {
                        this.authenticated = false

                        reject(new Error('Token is not valid'))
                    }
                })
                .catch(err => {
                    this.authenticated = false

                    reject(err)
                })
            })
        }
    }
})