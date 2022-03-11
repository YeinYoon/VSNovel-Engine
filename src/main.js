import { createApp } from 'vue'
import App from './App.vue'
import Router from './router.js'
import Store from './store.js';


let app = createApp(App);

app.use(Router).use(Store).mount('#app')