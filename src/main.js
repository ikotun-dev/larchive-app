import { createApp } from 'vue'
import App from './App.vue'
import "@/assets/styles/main.css";
import ToastPlugin from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-bootstrap.css';


import '@fortawesome/fontawesome-free/css/all.css';

import router from './router'

createApp(App).use(router).use(ToastPlugin).mount('#app')
