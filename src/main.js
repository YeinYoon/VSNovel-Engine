import { createApp } from 'vue'
import App from './App.vue'
import Router from './router.js'
import Store from './store.js'
import VueQuillEditor from 'vue-quill-editor'
import VueHtml2Canvas from 'vue-html2canvas'


let app = createApp(App);

app.use(Router).use(Store).use(VueQuillEditor).use(VueHtml2Canvas).mount('#app')