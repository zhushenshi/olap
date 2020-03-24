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
import './assets/iconfont/iconfont.css'
import * as Quill from 'quill' // 引入编辑器
import Spacing from './myQuill/spacing.js'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.snow.css'// import iconfont
Vue.prototype.$JSEncrypt = new JSEncrypt()
Vue.prototype.PublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPfoCRJo068xVcIhYnigpb4sxMjSKlkXVZIgl0vTdkdda+Qu8n4VxiLv6P8mHPi9WLZENJQd4kSM6gvSMpm2PtkNRY7aLceTrroPd6tAjKxsa8hvClAFy97OEcpOzi+WqxL8ERSeZ62Rai3fVjIbMP4b1tXaPiUxoPGgdJ74/l/QIDAQAB'
Vue.component(DatetimePicker.name, DatetimePicker)
console.log(filters)
const fonts = ['SimSun', 'SimHei', 'FangSong', 'Microsoft-YaHei']
const fontsizes = ['erhao', 'xiaoer', 'sanhao', 'xiaosan']
const Font = Quill.import('formats/font')
const Size = Quill.import('formats/size')
Font.whitelist = fonts // 将字体加入到白名单

Size.whitelist = fontsizes
Quill.register(Font, true)
Quill.register(Size, true)
Quill.register('formats/spacing', Spacing, true)
Vue.use(VueQuillEditor)
Vue.prototype.GLOBAL = {
  fonts: fonts,
  fontsizes: fontsizes
}
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
