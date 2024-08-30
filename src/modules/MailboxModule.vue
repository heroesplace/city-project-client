<template>
  <div class="mailbox">
    <div v-if="mailList.length > 0">
      <div v-for="item in mailList" :key="item" >
        <div v-if="item.category === 'chart'">
          <ChartMail :item="item" />
        </div>
        <p v-else-if="category === 'B'">Type B</p>
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

  import ChartMail from './mail/ChartMail.vue'
  import EmptyMailbox from './mail/EmptyMail.vue'

  const mailList = ref([])

  onMounted(() => {
    socket.emit('pull_mails')

    socket.on('ask_pull_mails', () => socket.emit('pull_mails'))

    socket.on('pull_mails', (data) => {
      console.log('new mails', data)
      mailList.value = data.mails
    })
  })

  onUnmounted(() => {
    socket.off('ask_pull_mails')
    socket.off('pull_mails')
  })
</script>

<style type="sass">
  @import "@/assets/modules/mailbox.sass";
</style>