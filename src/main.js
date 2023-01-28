import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
const app = createApp(App)
.use(PrimeVue)
.use(ToastService)
.use(store)
.use(router)
app.mount('#app')
