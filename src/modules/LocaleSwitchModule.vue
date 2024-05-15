<template>
  <div class="locale-switch">
    <select v-model="$i18n.locale" @change='setLocale($event.target.value)'>
      <option v-for="(lang, i) in langs" :key="`locale-switch-${i}`" :value="lang">
        {{ lang }}
      </option>
    </select>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { setLocale, getSupportedLocales } from '@/locales'

  const langs = ref(getSupportedLocales())
</script>