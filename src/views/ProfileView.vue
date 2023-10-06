<template>
	{{ account_name }}
</template>

<script setup>
import { ref } from 'vue'

let account_name = ref('')

const options = {
	method: 'GET',
	credentials: "include",
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
}

fetch(`http://${process.env.SERVER_ADDRESS + ":" + process.env.WEB_PORT }/api/account/profile?=`, options)
.then(response => response.json())
.then(response => {
	console.log(response)
	account_name.value = response.username
})
.catch(err => console.error(err))
</script>