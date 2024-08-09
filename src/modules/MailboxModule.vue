<template>
  <div class="mailbox">
    <div v-if="mailList.length > 0">
      <div v-for="item in mailList" :key="item" >
        <div v-if="item.type === 'invite'">
          <InviteMail :item="item" />
        </div>
        <p v-else-if="type === 'B'">Type B</p>
      </div>
    </div>
    <div v-else>
      <EmptyMailbox />
    </div>
  </div>
</template>

<script setup>
  import { socket } from '@/api/socket/socket.js'
  import { ref, onMounted, onUnmounted } from 'vue'

  import InviteMail from './mailbox/InviteMail.vue'
  import EmptyMailbox from './mailbox/EmptyMailbox.vue'

  const mailList = ref([])

  onMounted(() => {
    socket.on('pull_character_mailbox', (data) => {
      console.log('pull_character_mailbox')
      socket.emit('pull_character_mailbox')
    })

    socket.on('update_character_mailbox', (data) => {
      console.log('azeaz')
      mailList.value = data.mail_list
    })
  })

  onUnmounted(() => {
    socket.off('update_character_mailbox')
  })
</script>

<style type="sass">
  @import "@/assets/modules/mailbox.sass";
</style>