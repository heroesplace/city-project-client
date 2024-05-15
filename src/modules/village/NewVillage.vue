<template>
    <div class='new_village'>
        <div class='invitation_form'>
            <div>
                <h3>{{ $t('village.create.invite.name') }}</h3>
                <input type='text' @keyup.enter='invite' v-model='characterSearch' maxlength=50 :placeholder="$t('village.create.invite.search')" />

                <button @click='invite'>{{ $t('village.create.invite.submit') }}</button>
            </div>
            <div class='invitation_list'>
                <div class='invited_member'>
                    <span>{{ characterName }}</span>
                    <span>
                        <img alt='Leader' src='/png/crown_a.png' />
                    </span>
                </div>

                <div class='invited_member' v-for='item in invitedCharacters' :key='item'>
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
            <h3>{{ $t('village.create.name') }}</h3>
            <input type='text' @keyup.enter='createVillage' v-model='villageName' maxlength=50 :placeholder="$t('village.create.newVillageName')" />
            <button @click='createVillage'>{{ $t('village.create.submit') }}</button>
            <span class="or">{{ $t('global.or') }}</span>
            <button @click='cancel'>{{ $t('global.cancel') }}</button>
        </div>
    </div>
</template>

<script setup>
	import { ref, onMounted, onUnmounted } from 'vue'
	import { socket } from '@/api/socket/socket.js'

	import { jwt_parse } from '@/api/web/auth.js'

	const characterSearch = ref('')
	const invitedCharacters = ref([])
	const characterName = jwt_parse(localStorage.getItem('token')).characterName
	const emits = defineEmits(['changeAction'])

	const villageName = ref('')

	const invite = () => {
		if (characterSearch.value == '') return

		socket.emit('invite_add_character', characterSearch.value)

		characterSearch.value = ''
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
			invitedCharacters.value = data.characters
		})
	})

	onUnmounted(() => {
		console.log('[vue] NewVillage unmounted')

		socket.off('invite_pull_characters')
	})
</script>