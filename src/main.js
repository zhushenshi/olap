import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
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
console.log(process.env.NODE_ENV)
window.getTokenCallback = function (token, roleId) {
  localStorage.setItem('adminAccessToken', token)
  localStorage.setItem('roleId', roleId)
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
var ua = navigator.userAgent.toLowerCase()
if (/iphone|ipad|ipod/.test(ua) && process.env.NODE_ENV === 'production') {
// if (/iphone|ipad|ipod/.test(ua)) { // 本地测试ios用
  if (window.webkit && window.webkit.messageHandlers) {
    window.webkit.messageHandlers.getToken.postMessage([''])
  }
} else {
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}
