import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages, getLocale } from './locales'

import router from './router'
import App from './App.vue'

const i18n = createI18n({
  locale: getLocale(),
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)

app.use(router)
app.use(i18n)

app.mount('#app')
