import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/stylus/index.styl' // global css
import './assets/iconfont/iconfont.css'// iconfont
import { Toast, Indicator } from 'mint-ui'
import filters from './filters' // global filters

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.$Toast = Toast
Vue.prototype.$Indicator = Indicator

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
