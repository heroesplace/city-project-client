<template>
    <input type="text" v-model="name" maxlength=50 placeholder="Nom du village... (50 chararactères max.)" />
    <input type="text" v-model="members_search" maxlength=50 placeholder="Rechercher un personnage..." />
</template>

<script setup>
    import { socket } from "@/api/socket/socket.js";

    socket.emit("send_invitation", { "receiver": "zgurt" });
</script>