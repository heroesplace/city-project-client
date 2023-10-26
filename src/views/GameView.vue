<template>
    <div class="container">
		<canvas width="496" height="272" id="background"></canvas>
		<canvas width="496" height="272" id="entities"></canvas>
		<canvas width="496" height="272" id="player"></canvas>

		<div class="user-interface">
			<Window :title="lg('settings')" id="settings_window" draggable display>
				<template v-slot:content>
					<SettingsModule />
				</template>
			</Window>

			<ToolbarModule />

			<ChatModule />
		</div>
	</div>
</template>

<script setup>
import { keydownHandler } from '../game/events.js'

import lg from '../locales/lg.js'

import Window from '../components/Window.vue'

import SettingsModule from '../modules/SettingsModule.vue'
import ToolbarModule from '../modules/ToolbarModule.vue'
import ChatModule from '../modules/ChatModule.vue'

document.title = "CityProject"

/*
let account_name = ref('')

const options = {
	method: 'GET',
	credentials: "include",
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	}
}

fetch(`http://localhost:3000/api/account/profile?=`, options)
.then(response => response.json())
.then(response => {
	console.log(response)
	account_name.value = response.username
})
.catch(err => console.error(err))*/

// Events handling

// Graphics
import { onMounted } from 'vue'

import GraphicsEngine from '../game/engine.js'
import MapGrid from '../game/engine/grid.js'
import Sprite from '../game/engine/sprite.js'

import { socket, init} from "@/api/socket/socket.js";

init()

onMounted(() => {
	document.addEventListener("keydown", (event) => keydownHandler(event, socket))

	const engine = new GraphicsEngine(socket, document.querySelectorAll('canvas'))

	const map_grid = new MapGrid(engine)

	socket.on('map_part', (data) => {
		console.log("i", data) 
		map_grid.drawMap(data.map_part)
	})

	const player_sprite = new Sprite(engine)
	player_sprite.draw()
})
</script>

<style type="sass">
@import "../assets/gui.sass";
</style>