import { createApp } from 'vue'
import { store } from './stores'
import mitt from 'mitt'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


import App from './App.vue'
import router from './router'

const app = createApp(App)
const emitter = mitt()

library.add( fas, far )

app.config.globalProperties.emitter = emitter
app.use(router)
app.use(store)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
