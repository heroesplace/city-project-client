<template>
    <div style="height: 100%;" v-if="action == 'create'">
        <NewVillage @changeAction="action = $event" />
    </div>
    <div style="height: 100%;" v-else-if="action == 'join'">
        <JoinVillage @changeAction="action = $event" />
    </div>
    <div style="height: 100%;" v-else-if="action == 'exists'">
        MON SUPER VILLAGE
    </div>
    <div style="height: 100%;" v-else>
        <button @click="action = 'create'">Créer un village</button>
        ou
        <button @click="action = 'join'">Rejoindre un village</button>
    </div>
</template>

<script setup>
    import { ref, onMounted, onUnmounted } from "vue"
    import { socket } from "@/api/socket/socket.js"
    
    import NewVillage from "./village/NewVillage.vue"
    import JoinVillage from "./village/JoinVillage.vue"

    const action = ref("choose")

    onMounted(() => {
        console.log("Village mounted")

        socket.emit('chracter_is_villager')

        socket.on('chracter_is_villager', (res) => {
            if (res.is_villager) action.value = 'exists'
        })
    })

    onUnmounted(() => {
        console.log("Village unmounted")
    })
</script>