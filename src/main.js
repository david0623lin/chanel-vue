import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import i18n from "@/language/index"

const pinia = createPinia();
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia 持久化
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
