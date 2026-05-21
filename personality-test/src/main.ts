import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './styles/global.scss'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

import { useThemeStore } from './stores/theme'
const themeStore = useThemeStore()
themeStore.initTheme()

import { useHistoryStore } from './stores/history'
const historyStore = useHistoryStore()
historyStore.loadFromStorage()

app.use(router)
app.mount('#app')
