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

  const messageHistory = ref([])
  const newMessage = ref("")

  function sendMessage() {
    socket.emit('push_chat_message', newMessage.value)
    newMessage.value = ''
  }

  socket.on('update_chat', (message) => {
    console.log(message)
    messageHistory.value.push(message)
  })
</script>

<style type="sass">
  @import "@/assets/modules/chat.sass";
</style>