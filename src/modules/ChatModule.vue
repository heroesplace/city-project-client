<template>
  <div class="chat">
    <div class="inner">
      <div class="top">
        <div class="world">Monde</div>
      </div>
      <div class="messages">
        <div class="message" 
          v-for="message in messageHistory"
          :key="message">
          <span class="channel"></span>
          <span class="user admin">{{ message.author }}</span>
          <span class="colon"> : </span>
          <span class="content">{{ message.content }}</span>
        </div>
      </div>
      <form class="input" @submit.prevent="sendMessage">
        <input type="text" v-model="newMessage" maxlength=500 placeholder="Envoyer un message..." />
      </form>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { socket } from '@/api/socket/socket.js'
  import { useI18n } from 'vue-i18n'
  const { t } = useI18n()

  const messageHistory = ref([])
  const newMessage = ref("")

  function sendMessage() {
    socket.emit('push_chat_message', { message: newMessage.value, channel: 1 })
    newMessage.value = ''
  }

  socket.on('update_chat_message', (message) => {
    messageHistory.value.push(message)
  })

  socket.on('update_chat_command', (message) => {
    let content = ''

    if (message === 'UNKNOWN_COMMAND' || message === 'HELP_COMMAND') content = t('chat.' + message)

    messageHistory.value.push({ author: t('chat.systemName'), content })
  })

  socket.on('clear_chat', () => {
    messageHistory.value = []
  })
</script>

<style type="sass">
  @import "@/assets/modules/chat.sass";
</style>