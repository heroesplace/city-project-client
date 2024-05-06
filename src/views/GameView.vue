<template>
    <div class="container">
		<div class="user-interface">
			<GameModule />

			<Window v-if="isSettingsWindow" :title="lg('settings')" id="settings_window" width="30vw" height="45vh" draggable>
				<template v-slot:>
					<SettingsModule />
				</template>
			</Window>

			<Window v-if="isMailboxWindow" :title="lg('mailbox')" id="test_window" width="25vw" height="50vh" draggable>
				<template v-slot:>
					<MailModule />
				</template>
			</Window>
			
			<Window v-if="isVillageWindow" :title="lg('create_village')" id="village_window" width="27vw" height="50vh" draggable>
				<template v-slot:>
					<VillageModule />
				</template>
			</Window>

			<ToolbarModule :toggleWindow="toggleWindow" />

			<ChatModule />
		</div>
	</div>
    
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import Window from '@/components/Window.vue'

import SettingsModule from '@/modules/SettingsModule.vue'
import ToolbarModule from '@/modules/ToolbarModule.vue'

import ChatModule from '@/modules/ChatModule.vue'
import VillageModule from '@/modules/VillageModule.vue'
import MailModule from '@/modules/MailModule.vue'

import GameModule from '@/modules/GameModule.vue'

import lg from '@/locales/lg.js'

import { socket } from "@/api/socket/socket.js";
import { jwt_parse } from '@/api/web/auth.js'

const isVillageWindow = ref(false)
const isSettingsWindow = ref(false)
const isMailboxWindow = ref(false)

const debug_name = ref('')
const godot_url = ref(window.location.origin + "/godot/index.html")

function toggleWindow(window) {
	switch (window) {
		case 'village':
				isVillageWindow.value = !isVillageWindow.value
			break
		case 'mailbox':
				isMailboxWindow.value = !isMailboxWindow.value
			break
		case 'settings':
				isSettingsWindow.value = !isSettingsWindow.value
			break
	}
}

onMounted(() => {
	document.title = "CityProject"
	debug_name.value = jwt_parse(localStorage.getItem('token')).characterName
})

onUnmounted(() => {
	console.log("Unmounting GameView")
	socket.close()
})
</script>

<style type="sass">
@import "../assets/gui.sass";
</style>