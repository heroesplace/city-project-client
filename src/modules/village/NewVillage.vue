<template>
    <input type="text" maxlength=50 placeholder="Nom du village... (50 chararactères max.)" />
    <input type="text" v-model="member_search" maxlength=50 placeholder="Rechercher un personnage..." />

    <button @click="invite(member_search)">Inviter</button>

    <div v-for="item in members_list" :key="item" >
        <div>{{ item.character_name + " " + item.status }}</div>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue"
    import { socket } from "@/api/socket/socket.js"
    import { invite_character } from "@/api/web/invitations.js"
    import lg from '../../locales/lg.js'

    const member_search = ref("")
    const members_list = ref([])

    const invite = (character) => {
        if (character == "") return

        invite_character(character).then((res) => {
            console.log(res)
            
            socket.emit("pull_invite_members")
        }).catch((err) => {
            console.log(lg(err.response.data.code))
        })

        member_search.value = ""
    }

    onMounted(() => {
        socket.emit("pull_invite_members")
    })

    socket.on("update_invite_members", (data) => {
        members_list.value = data.members_list
        console.log(data.members_list)
    })
</script>