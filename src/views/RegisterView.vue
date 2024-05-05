<template>
	<div class="box">
		<div class="title">
			<div class="game_icon">
				<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
				<path id="Wenrexa_Preparing_for_an_attack" data-name="Wenrexa Preparing for an attack" class="cls-1" d="M219.539,175.321c-1.517,7.259-7.737,15.771-16.267,24.494a43.947,43.947,0,0,0-5.86-6.17c-4.416-8.592-39.775,23.485-28.619,28.361a50.009,50.009,0,0,0,4.039,3.78C150.236,242.734,128,256,128,256s-85.314-50.89-91.539-80.679c-3.634-17.386-9.367-62.037-13.512-96.209C59.274,115.928,125.164,182.271,128.76,182.76l3.415,3.415c-2.546,1.928-4.52,3.966-5.268,6.038-2.691,7.451-4.989,12.02-18.874,21.178C88.925,226,143.532,246.034,145,235c0.894-6.72,14.091-25.491,27-38s33.8-26.846,42-25-12.81-60.562-30.465-39.34c-7.641,9.186-13.771,16.667-16.824,20.407L162,146l-0.194.13C151.893,128.759,97.489,47.707,76.58,16.657L128,0,238.158,35.685S225.765,145.532,219.539,175.321Zm-66.327.476c10.968-7.243,12.388-5.138,12.388-5.138a35.161,35.161,0,0,0,19.935-21c6.732-18.832,24.619,17.487,16.423,15.642s-24.014,13.2-36.923,25.7-25.971,28.345-25.561,35.112S107,217.8,123.033,213.391,144,190,144,190,142.243,183.041,153.212,175.8Zm2.138-15.36c-1.859,1.625-4.59,1.045-9.35,4.563s-3.663,6.841-7.149,7.77S14.385,43.165,14.385,43.165L0.109,0,51.383,18.5S157.21,158.811,155.35,160.437Zm42.062,45.208c4.416,8.592-1.342,19.088,32.824,32.789,5.8,2.327-6.472,15.627-13.213,16.324-3.546-12.079-25.074-27.875-36.23-32.752S193,197.053,197.412,205.645Z"/>
				</svg>
			</div>
			<h1>City Project</h1>
			<h2>Où chaque choix construit un monde</h2>
		</div>
		<div class="form">
			<form @submit.prevent="register">
				<div class="input_line">
					<input v-model="accountName" type="text" name="accountName" placeholder="INDENTIFIANT" required/>
				</div>
				<div class="input_line">
					<input v-model="characterName" type="text" name="characterName" placeholder="PERSONNAGE" required/>
				</div>
				<div class="input_line">
					<input v-model="emailAddress" type="email" name="emailAddress" placeholder="ADRESSE E-MAIL" required/>
				</div>
				<div class="input_line">
					<input v-model="password" type="password" name="password" placeholder="MOT DE PASSE" required/>
				</div>
				<div class="input_line">
					<input v-model="confirmPassword" type="password" name="confirmPassword" placeholder="CONFIRMATION" required/>
				</div>
				<div class="submit">
					<input type="submit" value="S'inscrire"/>
					<router-link to="/login">Se connecter ?</router-link>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import router from '../router'
import { register } from '../api/web/auth.js'

const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS
const protocol = import.meta.env.MODE === "production" ? "https" : "http"

export default {
	data() {
		return {
			accountName: "toto",
			characterName: "toto",
			emailAddress: "t@t.t",
			password: "salut",
			confirmPassword: "salut"
		}
	},
	methods: {
		async register() {
			const { accountName, characterName, emailAddress, password, confirmPassword } = this

			if (password !== confirmPassword) {
				alert("Les mots de passe ne correspondent pas")
				return
			}
			
			await register(accountName, characterName, emailAddress, password)
				.then(() => {
					router.push('/login')
				 })
				.catch(err => {
					console.error(err)
				})
		}
	}
}
</script>

<style lang="scss">
@import "../assets/form.sass";
</style>