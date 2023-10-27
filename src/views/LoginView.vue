<template>
	<div class="login_box">
        <div class="inner">
            <div class="login_title">
                <h1>Connexion - CityProject</h1>
            </div>
            <div class="login_form">
                <form @submit.prevent="login">
                    <div class="login_line">
                        <div class="icon"><img src="/svg/avatar.svg" alt="" /></div>
						<input v-model="account_name" type="text" name="account_name" placeholder="Identifiant" required />
                    </div>
                    <div class="login_line">
                        <div class="icon"><img src="/svg/lock.svg" alt="" /></div>
    					<input v-model="password" type="password" placeholder="Mot de passe" required />
                    </div>
                    <div class="submit">
                        <input type="submit" value="Se connecter" />
						<router-link to="/register">Pas encore inscrit ?</router-link>
                    </div>
                </form>
            </div>
        </div>        
    </div>
</template>

<script>
import router from '../router'
import { useAuth } from '@/stores/auth'

export default {
	data() {
		return {
			account_name: "",
			password: ""
		}
	},
	methods: {
		async login() {
			const { account_name, password } = this

			const { login } = useAuth()

			await login(account_name, password)
				.then(() => {
					router.push('/game')
				 })
				.catch(err => {
					console.error(err)

					alert("Identifiant ou mot de passe incorrect")
				})
		}
	}
}
</script>

<style lang="scss">
@import "../assets/login.sass";
</style>