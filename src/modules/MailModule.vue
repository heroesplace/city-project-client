<template>
    <div v-for="item in mail_list" :key="item" >
        <div>{{ item.sender }}</div>
        <button @click='accept(item.sender)'>Accepter</button>
        <button @click='decline(item.sender)'>Refuser</button>
    </div>
</template>

<script setup>
    import { socket } from "@/api/socket/socket.js"
    import { ref, onMounted } from "vue"

    const mail_list = ref([])

    onMounted(() => {
        socket.emit("pull_character_mailbox")
    })

    socket.on("update_character_mailbox", (data) => {
        mail_list.value = data.mail_list
        console.log(data.mail_list)
    })

    const accept = (sender) => {
        socket.emit("push_invite_reply", { sender: sender, answer: true })
    }

    const decline = (sender) => {
        socket.emit("push_invite_reply", { sender: sender, answer: false })
    }
</script>