<template>
  <div class="signup_box">
    <div class="inner">
        <div class="signup_title">
            <h1>Inscription - CityProject</h1>
        </div>
        <div class="signup_form">
            <form @submit.prevent="register">
                <div class="signup_line">
                    <div class="icon"><img src="/svg/avatar.svg" alt="" /></div>
                    <input v-model="account_name" type="text" name="username" placeholder="Identifiant" required/>
                </div>
                <div class="signup_line">
                    <div class="icon"><img src="/svg/sword.svg" alt="" /></div>
                    <input v-model="character_name" type="text" name="character" placeholder="Personnage" required/>
                </div>
                <div class="signup_line">
                    <div class="icon"><img src="/svg/mail.svg" alt="" /></div>
                    <input v-model="email_address" type="email" name="email" placeholder="Mail" required/>
                </div>
                <div class="signup_line">
                    <div class="icon"><img src="/svg/lock.svg" alt="" /></div>
                    <input v-model="password" type="password" name="password" placeholder="Mot de passe" required/>
                </div>
                <div class="signup_line">
                    <div class="icon"><img src="/svg/lock.svg" alt="" /></div>
                    <input v-model="confirm_password" type="password" name="confirm_password" placeholder="Confirmer MDP" required/>
                </div>
                <div class="submit">
                    <input type="submit" value="S'inscrire"/>
					<router-link to="/login">Déjà inscrit ?</router-link>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import router from '../router'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

export default {
	data() {
		return {
			account_name: "",
			character_name: "",
			email_address: "",
			password: "",
			confirm_password: "",
		}
	},
	methods: {
		async register() {
			const { account_name, character_name, email_address, password, confirm_password } = this

			if (password != confirm_password) {
				alert("Les mots de passe ne correspondent pas !")
				return
			}

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

			fetch(`http://${ SERVER_ADDRESS }:3000/api/account/register?=`, options)
				.then(response => response.json())
				.then(response => {
					if (response.status == 200) {
						router.push({ name: 'login' })
					}
				})
				.catch(err => console.error(err))
			}
		}
	}
</script>

<style lang="scss">
@import "../assets/register.sass";
</style>