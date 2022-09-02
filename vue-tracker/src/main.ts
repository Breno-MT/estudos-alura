import { createApp } from 'vue'
import App from './App.vue'
import roteador from './router';
import { key, store } from './store';

import '@fortawesome/fontawesome-free/css/all.css'

const app = createApp(App);
app.use(roteador);
app.use(store, key);
app.mount('#app');