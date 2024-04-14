<template>
    <div class="container">
		<div class="user-interface">
			<iframe 
				allow="autoplay; fullscreen *; microphone; camera; midi; xr-spatial-tracking; gamepad; gyroscope; accelerometer; cross-origin-isolated"
				style="width: 100vw; height: 100vh; border: unset; position: fixed;"
				:src="godot_url"
				title="Game"></iframe>

			<h1 style="color: white; position: absolute;">{{ debug_name }}</h1>

			<Window :title="lg('settings')" id="settings_window" width="30vw" height="45vh" draggable>
				<template v-slot:>
					<SettingsModule />
				</template>
			</Window>

			<Window :title="lg('mailbox')" id="test_window" width="25vw" height="50vh"  draggable>
				<template v-slot:>
					<MailModule />
				</template>
			</Window>
			
			<Window :title="lg('create_village')" id="village_window" width="27vw" height="50vh" display draggable>
				<template v-slot:>
					<VillageModule />
				</template>
			</Window>

			<ToolbarModule />

			<ChatModule />
		</div>
	</div>
</template>

<script setup>
import lg from '../locales/lg.js'

import Window from '../components/Window.vue'

import SettingsModule from '../modules/SettingsModule.vue'
import ToolbarModule from '../modules/ToolbarModule.vue'

import ChatModule from '../modules/ChatModule.vue'
import VillageModule from '../modules/VillageModule.vue'
import MailModule from '../modules/MailModule.vue'

document.title = "CityProject"

import { ref, onMounted } from 'vue'

import { socket, init} from "@/api/socket/socket.js";

let debug_name = ref('')
let godot_url = ref(window.location.origin + "/godot/index.html")

init()

onMounted(() => {

	// DEBUG START
	function parseJwt (token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	}

	debug_name.value = parseJwt(document.cookie.split(';').find(row => row.startsWith('token')).split('=')[1]).character_name
	// DEBUG END
})
</script>

<style type="sass">
@import "../assets/gui.sass";
</style>