<template>
    <input type="text" maxlength=50 placeholder="Nom du village... (50 chararactères max.)" />
    <input type="text" v-model="member_search" maxlength=50 placeholder="Rechercher un personnage..." />

    <button @click="invite(member_search)">Inviter</button>

    <div v-for="item in members_list" :key="item" >
        <div>{{ item.character }}</div>
    </div>
</template>

<script setup>
    import { ref } from "vue"
    import { socket } from "@/api/socket/socket.js"
    import { invite_character } from "@/api/web/invitations.js"
    import lg from '../../locales/lg.js'

    const member_search = ref("")
    const members_list = ref([])

    const invite = (character) => {
        if (character == "") return

        invite_character(character).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

        member_search.value = ""
    }

    socket.on("invitation_member_list", (data) => {
        members_list.value = data
    })
</script>