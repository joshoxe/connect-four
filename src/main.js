import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap';
import './assets/main.scss'
import 'animate.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VueForceNextTick from "vue-force-next-tick";

const app = createApp(App)

app.use(createPinia());
app.use(router);
app.use(VueForceNextTick);
app.provide('forceNextTick', app.config.globalProperties.$forceNextTick);

app.mount('#app')
