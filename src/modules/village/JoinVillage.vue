<template>

<button @click="backToDefault">Annuler</button>

</template>

<script setup>
  const emits = defineEmits(['changeAction'])

  const backToDefault = () => {
    emits('changeAction', 'choose')
  }
</script>