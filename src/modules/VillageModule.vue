<template>
    <div style="height: 100%;" v-if="action == 'create'">
        <NewVillage @changeAction="action = $event" />
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
    import { ref, onMounted, onUnmounted } from "vue"
    
    import NewVillage from "./village/NewVillage.vue"
    import JoinVillage from "./village/JoinVillage.vue"

    const action = ref("choose")

    onMounted(() => {
        console.log("Village mounted")
    })

    onUnmounted(() => {
        console.log("Village unmounted")
    })
</script>