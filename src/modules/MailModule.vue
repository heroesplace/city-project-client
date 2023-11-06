<template>
    <button @click="accept()">Accepter</button>
    
    <div>
        <span>Invitation de hachneyhev</span>
        <button @click="accept()">Accepter</button>
        <button @click="deny()">Refuser</button>
    </div>
</template>

<script setup>
    import { socket } from "@/api/socket/socket.js";

    const accept = () => {
        socket.emit("reply_to_invitation", { sender: "654951af36141d20cbe9a1e6", answer: true })
    }

    const deny = () => {
        socket.emit("reply_to_invitation", { sender: "654951af36141d20cbe9a1e6", answer: false })
    }
</script>