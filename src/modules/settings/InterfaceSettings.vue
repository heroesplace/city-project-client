<template>
    INTERFACE SETTINGS

    <input type="checkbox" id="fullscreen-button" @click="toggleFullscreen()" />
</template>

<script>

export default {
    name: 'settings.interface',
    props: {
    },
    setup(props) {
    },
    mounted() {
       
    },
    methods: {
        toggleFullscreen() {
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            document.documentElement.requestFullscreen();
          }
        }
    }
}

document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    document.querySelector('input[type=checkbox]#fullscreen-button').checked = false;
  }
})
</script>