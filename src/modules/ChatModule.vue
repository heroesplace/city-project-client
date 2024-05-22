<template>
  <div class="chat">
    <div class="inner">
      <div class="top">
        <div
          v-for="tab in tabs"
          :key="tab"
          @click="selectTab(tab)">
          <div :class="tab + ' ' + (currentTab == tab ? 'selected' : '')">{{ tab }}</div>
        </div>
      </div>
      <div class="messages">
        <div :class="'message ' + message.channel"
          v-for="message in messageHistory.filter(m => m.channel === currentTab)"
          :key="message">
          <span class="channel">{{ message.gm ? "[GM] " : "" }}</span>
          <span class="user">{{ message.author }}</span>
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

  const newMessage = ref('')
  const tabs = ['world', 'whisper']
  const currentTab = ref('')

  const messageHistory = ref([])

  const sendMessage = () => {
    socket.emit('push_chat_message', { message: newMessage.value, channel: currentTab.value })
    newMessage.value = ''
  }

  const selectTab = (tab) => {
    currentTab.value = tab

    socket.emit('join_chat_channel', { channel: currentTab.value })
  }

  // Select default channel
  selectTab(tabs[0])

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