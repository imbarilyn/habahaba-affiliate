import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/material-icons/material-icons.css'
// import  'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './css/styles.css'
import './css/bootstrap.scss'


import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSweetalert2)

app.mount('#app')
