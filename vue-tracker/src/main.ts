import { createApp } from 'vue'
import App from './App.vue'
import roteador from './router';

import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App);
app.use(roteador);
app.mount('#app');