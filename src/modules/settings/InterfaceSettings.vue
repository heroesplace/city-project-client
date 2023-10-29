<template>
    INTERFACE SETTINGS

    <button @click="setFullscreen()">Fullscreen</button>
</template>

<script>
import lg from '../../locales/lg.js'

export default {
    name: lg('interface'),
    props: {
    },
    setup(props) {
    },
    mounted() {
       
    },
    methods: {
        setFullscreen() {
            document.documentElement.requestFullscreen()
        }
    }
}
</script>