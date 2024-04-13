<template>
    <div style="height: 100%;" v-if="action == 'create'">
        <NewVillage  @changeAction="action = $event" />
    </div>
    <div style="height: 100%;" v-else-if="action == 'join'">
        <JoinVillage @changeAction="action = $event" />
    </div>
    <div style="height: 100%;" v-else>
        <button @click="action = 'create'">Créer un village</button>
        ou
        <button @click="action = 'join'">Rejoindre un village</button>
    </div>
</template>

<script setup>
    import { ref, onMounted  } from "vue"
    import { socket } from "@/api/socket/socket.js"
    
    import NewVillage from "./village/NewVillage.vue"
    import JoinVillage from "./village/JoinVillage.vue"

    const action = ref("choose")

    onMounted(() => {
        socket.emit("pull_has_invite")
    })

    socket.on('update_has_invite', (has_invite) => {
        action.value = has_invite ? 'create' : 'choose'
    })
</script>