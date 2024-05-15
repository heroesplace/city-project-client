<template>
    SOCIAL SETTINGS

    <a class="button" id="login" href="https://discord.com/oauth2/authorize?client_id=1144418040251961367&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fdiscord&scope=identify">connecter discord</a>
</template>

<script>
import lg from '../../locales/lg.js'

export default {
    name: lg('social'),
    props: {
    },
    setup(props) {
    },
    mounted() {

    },
    methods: {

    }
}
</script>