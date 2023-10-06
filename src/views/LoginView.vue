<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Identifiant" required />
    <input v-model="password" placeholder="Mot de passe" type="password" required />

    <input type="submit" value="Se connecter">

	<router-link to="/register">Pas encore inscrit ?</router-link>
  </form>
</template>

<script>
import router from '../router'

export default {
	data() {
		return {
			username: "",
			password: ""
		}
	},
	methods: {
		async login() {
			const { username, password } = this

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

			fetch(`http://devsoleo.fr:3000/api/account/login?=`, options)
				.then(response => response.json())
				.then(response => {
					router.push({ name: 'profile' })
				})
				.catch(err => console.error(err))
			}
		}
	}
</script>