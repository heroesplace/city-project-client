<template>
  <div v-if="action == 'create'">
    <NewVillage @changeAction="action = $event" />
  </div>
  <div v-else-if="action == 'join'">
    <JoinVillage @changeAction="action = $event" />
  </div>
  <div v-else-if="action == 'exists'">
    <ManageVillage />
  </div>
  <div v-else>
    <button @click="action = 'create'">{{ $t('village.create.name') }}</button>
    <span class="or">{{ $t('global.or') }}</span>
    <button @click="action = 'join'">{{ $t('village.join.name') }}</button>
  </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue'
  import { socket } from '@/api/socket/socket.js'

  import NewVillage from './village/NewVillage.vue'
  import JoinVillage from './village/JoinVillage.vue'
  import ManageVillage from './village/ManageVillage.vue'

  const action = ref('')

  onMounted(() => {
    console.log('[vue] Village mounted')

    socket.emit('character_is_villager')

    socket.on('character_is_villager', (res) => {
      if (res.is_villager) action.value = 'exists'
    })
  })

  onUnmounted(() => {
      console.log('[vue] Village unmounted')
  })
</script>

<style type="sass">
  @import "@/assets/modules/village.sass";
</style>