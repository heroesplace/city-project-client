<template>
  <NavBar :tabs="settingsList" />
</template>

<script setup>
  import GeneralSettings from './settings/GeneralSettings.vue'
  import AudioSettings from './settings/AudioSettings.vue'
  import ControlSettings from './settings/ControlSettings.vue'
  import GameplaySettings from './settings/GameplaySettings.vue'
  import InterfaceSettings from './settings/InterfaceSettings.vue'
  import SocialSettings from './settings/SocialSettings.vue'
  import VideoSettings from './settings/VideoSettings.vue'

  import NavBar from '@/components/NavBar.vue'

  const settingsList = [
    GeneralSettings,
    AudioSettings,
    ControlSettings,
    GameplaySettings,
    InterfaceSettings,
    SocialSettings,
    VideoSettings
  ]
</script>

<style type="sass">
  @import "@/assets/modules/settings.sass";
</style>