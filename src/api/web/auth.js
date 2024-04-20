const protocol = import.meta.env.MODE === "production" ? "https" : "http"
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export const login = async (account_name, password) => {
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

        fetch(`${ protocol }://${ SERVER_ADDRESS }/api/account/login?=`, options)
            .then(response => response.json())
            .then(response => {
                if (response.status == 200) {
                    console.log(response)

                    const token = document.cookie.split("; ").filter((cookie) => {
                        return cookie.startsWith("token=")
                    })[0].split("=")[1]

					localStorage.setItem('token', token)

                    resolve(token)
                } else {
                    reject(new Error('Login failed'))
                }
            })
            .catch(err => reject(err))
    })
}

export const register = async (account_name, character_name, email_address, password) => {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                account_name: account_name,
                character_name: character_name,
                email_address: email_address,
                password: password
            })
        }

        fetch(`${ protocol }://${ SERVER_ADDRESS }/api/account/register?=`, options)
            .then(response => response.json())
            .then(response => {
                if (response.status == 200) {
                    resolve()
                }
            })
            .catch(err => reject(err))
    })
}

export const checkToken = async () => {
    const token = localStorage.getItem('token')

    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                token: token
            })
        }
        
        fetch(`${ protocol }://${ SERVER_ADDRESS }/api/account/verify-token?=`, options)
        .then(response => response.json())
        .then(response => {
            if (response.status == 200) {
                resolve(true)
            } else {
                reject(new Error('Token is not valid'))
            }
        })
        .catch(err => {
            reject(err)
        })
    })
}

export const logout = async () => {
    localStorage.removeItem('token')
}

// Move later in a user.js file

export const jwt_parse = (token) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}