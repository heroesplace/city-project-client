<template>
    <div class="menu">
        <div class="menu_button"
            v-for="item in tabs"
            :key="item"
            @click="currentTab = item"
        >
            <div>{{ item.name }}</div>
        </div>
    </div>
    <div class="content">
        <component :is="currentTab"></component>
    </div>
</template>

<script setup>
    import { shallowRef } from 'vue'

    const props = defineProps(['tabs'])

    const currentTab = shallowRef(props.tabs[0])
</script>

<style type="sass">
@import "../assets/components/navbar.sass";
</style>