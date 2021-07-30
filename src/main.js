import { createApp } from 'vue'
import App from './App.vue'

//import router
import router from './router'

//import vuex
import vuex from 'vuex'

//import Bootstrap, Popper, jQuery
import 'bootstrap/dist/css/bootstrap.css'
import 'jquery/dist/jquery.min'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min'

// import vuex
import store from './store/auth'

const app = createApp(App)
app.use(router)
app.use(vuex)
app.use(store)

app.mount('#app')
