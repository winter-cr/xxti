import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import { useThemeStore } from './stores/theme'
import { useHistoryStore } from './stores/history'
import './styles/global.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

useThemeStore(pinia).initTheme()
useHistoryStore(pinia).loadFromStorage()

app.mount('#app')
