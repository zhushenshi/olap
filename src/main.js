import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/stylus/index.styl' // global css
import { Toast, Indicator, DatetimePicker } from 'mint-ui'
import 'mint-ui/lib/style.css'
import Vant from 'vant'
import 'vant/lib/index.css'
import JSEncrypt from '@/utils/jsencrypt'
import filters from './filters' // global filters
import './assets/iconfont/iconfont.css'// import iconfont
Vue.prototype.$JSEncrypt = new JSEncrypt()
Vue.prototype.PublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPfoCRJo068xVcIhYnigpb4sxMjSKlkXVZIgl0vTdkdda+Qu8n4VxiLv6P8mHPi9WLZENJQd4kSM6gvSMpm2PtkNRY7aLceTrroPd6tAjKxsa8hvClAFy97OEcpOzi+WqxL8ERSeZ62Rai3fVjIbMP4b1tXaPiUxoPGgdJ74/l/QIDAQAB'
Vue.component(DatetimePicker.name, DatetimePicker)
console.log(filters)
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$Toast = Toast
Vue.prototype.$Indicator = Indicator

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
