<template>
    <div class="chat">
        <div class="inner">
            <div class="top">
                <div class="world">Monde</div>
                <!--<div class="duchy">Duché</div>
                <div class="kingdom">Royaume</div>
                <div class="empire">Empire</div>
                <div class="village">Village</div>
                <div class="dm">DM</div>-->
            </div>
            <div class="messages">
                <div class="message" 
                    v-for="message in messages_history"
                    :key="message">
                    <span class="channel"></span>
                    <span class="user admin">{{ message.author }}</span>
                    <span class="colon"> : </span>
                    <span class="content">{{ message.content }}</span>
                </div>
            </div>
            <form class="input" @submit.prevent="sendMessage">
                <input type="text" v-model="new_message" maxlength=500 placeholder="Envoyer un message... (500 chararactères max.)" />
            </form>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { socket } from "@/api/socket/socket.js";

    const messages_history = ref([])
    const new_message = ref('')

    function sendMessage() {
        socket.emit('push_chat_message', new_message.value)
        new_message.value = ""
    }

    socket.on('update_chat', (message) => {
        console.log(message)
        messages_history.value.push(message)
    })
</script>

<style type="sass">
@import "../assets/modules/chat.sass";
</style>