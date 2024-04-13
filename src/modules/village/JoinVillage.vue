<template>

<button @click="backToDefault">Annuler</button>

</template>

<script setup>
    import { defineEmits } from "vue"

    const emits = defineEmits(['changeAction'])

    const backToDefault = () => {
        emits('changeAction', 'choose')
    }
</script>