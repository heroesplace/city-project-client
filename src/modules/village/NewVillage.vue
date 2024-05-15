<template>
    <div class='new_village'>
        <div class='invitation_form'>
            <div>
                <h3>Inviter un joueur</h3>
                <input type='text' @keyup.enter='invite' v-model='memberSearch' maxlength=50 placeholder='Rechercher un personnage...' />

                <button @click='invite'>Inviter</button>
            </div>
            <div class='invitation_list'>
                <div class='invited_member'>
                    <span>{{ characterName }}</span>
                    <span>
                        <img alt='Leader' src='/png/crown_a.png' />
                    </span>
                </div>

                <div class='invited_member' v-for='item in membersList' :key='item'>
                    <span>{{ item.name }}</span>
                    <span v-if='item.status == 0'>
                        <img alt='Pending invitation' src='/png/hourglass.png' />
                    </span>
                    <span v-else-if='item.status == 1'>
                        <img alt='Pending invitation' src='/png/suit_hearts.png' />
                    </span>
                    <span v-else-if='item.status == 2'>
                        <img alt='Pending invitation' src='/png/suit_hearts_broken.png' />
                    </span>
                </div>
            </div>
        </div>
        <div>
            <h3>Créer un village</h3>
            <input type='text' @keyup.enter='createVillage' v-model='villageName' maxlength=50 placeholder='Nom du village...' />
            <button @click='createVillage'>Créer</button>
            <span class="or">ou</span>
            <button @click='cancel'>Annuler</button>
        </div>
    </div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { socket } from '@/api/socket/socket.js'

	import { jwt_parse } from '@/api/web/auth.js'

	const memberSearch = ref('')
	const membersList = ref([])
	const characterName = jwt_parse(localStorage.getItem('token')).characterName
	const emits = defineEmits(['changeAction'])

	const villageName = ref('')

	const invite = () => {
		if (memberSearch.value == '') return

		socket.emit('invite_add_character', memberSearch.value)

		memberSearch.value = ''
	}

	const cancel = () => {
		if (!confirm('Voulez-vous vraiment annuler la création du village ?')) return

		socket.emit('invite_cancel')

		emits('changeAction', 'choose')
	}

	const createVillage = () => {
		socket.emit('village_create', { name: villageName.value })

		villageName.value = ''
	}

	onMounted(() => {
		socket.emit('invite_pull_characters')
		console.log('[vue] NewVillage mounted')

		socket.on('invite_pull_characters', (data) => {
			membersList.value = data.members_list
		})
	})

	onUnmounted(() => {
		console.log('[vue] NewVillage unmounted')

		socket.off('invite_pull_characters')
	})
</script>