import axios from 'axios'
import { Notify } from 'vant'
import { baseURL } from '@/utils/config'
import store from '../store'
import 'vant/lib/notify/style/index'

const myAxios = axios.create({
  baseURL: baseURL,
  timeout: 60000
})
// http请求拦截器
myAxios.interceptors.request.use(config => {
  // 加载圈
  const { adminAccessToken } = store.state.admin
  if (adminAccessToken) {
    if (localStorage.getItem('adminAccessToken') === adminAccessToken) {
      config.headers.Authorization = adminAccessToken
    } else if (localStorage.getItem('adminAccessToken')) {
      this.$Toast({ message: '权限错误', position: 'bottom' })
      return false
    }
  }
  return config
}, error => {
  this.$Toast({ message: '加载超时', position: 'bottom' })
  return Promise.reject(error)
})
// http响应拦截器
myAxios.interceptors.response.use(res => {
  return res
}, error => {
  if (error && error.response) {
    if (error.response.status === 401) { /// / token过期或被顶掉
      Notify({ type: 'primary', message: error.response.data ? error.response.data.message : '登录失效' })
      // commit('setExpireStatus', true)
      store.commit('set_admin_token', '')
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        if (window.webkit && window.webkit.messageHandlers) {
          window.webkit.messageHandlers.loginOut.postMessage([''])
        } else {}
      } else if (/android/.test(ua)) {
        if (window.object && typeof (window.object.loginOut) === 'function') {
          window.object.loginOut()
        }
      }
    } else if (error.response.status === 500) {
      Notify({ type: 'primary', message: '500服务器错误' })
    } else if (error.response.status === 504) {
      Notify({ type: 'primary', message: '连接服务器超时' })
    } else if (error.response.status === 408) {
      Notify({ type: 'primary', message: '408请求超时' })
    } else if (error.response.status === 404) {
      Notify({ type: 'primary', message: '404错误' })
    }
  }
  return Promise.reject(error)
})

export { myAxios }
