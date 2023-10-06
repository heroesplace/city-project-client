<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="username">
    <input v-model="password" placeholder="password" type="password">
    <input type="submit" value="log in">
  </form>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			password: ""
		}
	},
	methods: {
		async login() {
			const { username, password } = this;

			const options = {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: new URLSearchParams({
					account_name: username,
					password: password,
				})
			}

			fetch(`http://${process.env.SERVER_ADDRESS + ":" + process.env.WEB_PORT }/api/account/login?=`, options)
				.then(response => response.json())
				.then(response => console.log(response))
				.catch(err => console.error(err))
			}
		}
	}
</script>