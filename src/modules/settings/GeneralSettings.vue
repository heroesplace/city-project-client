<template>
    {{$t('settings.general')}}

    <LocaleSwitchModule />
</template>

<script setup>
    import LocaleSwitchModule from '@/modules/LocaleSwitchModule.vue'

    defineOptions({
        name: 'settings.general'
    })
</script>