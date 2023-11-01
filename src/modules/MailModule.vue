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
        socket.emit("reply_to_invitation", { sender: "653e767174c12ce424766570", answer: true })
    }

    const deny = () => {
        socket.emit("reply_to_invitation", { sender: "653e767174c12ce424766570", answer: deny })
    }
</script>