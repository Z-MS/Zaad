import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Unicon from 'vue-unicons'
import { uniPlus, uniFileAlt, uniHistory, uniFolderOpen, uniClipboardNotes } from 'vue-unicons/src/icons'

Unicon.add([uniPlus, uniFileAlt, uniHistory, uniFolderOpen, uniClipboardNotes])
Vue.use(Unicon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
