import Vue from 'vue'
import axios from 'axios'
import { Notify } from 'vant'
import { baseURL } from '@/utils/config'
import 'vant/lib/notify/style/index'

const myAxios = axios.create({
  baseURL: baseURL,
  timeout: 60000
})
// http请求拦截器
myAxios.interceptors.request.use(config => {
  // 加载圈
  if (localStorage.getItem('adminAccessToken')) {
    config.headers.Authorization = localStorage.getItem('adminAccessToken')
  }
  return config
}, error => {
  Vue.prototype.$Toast({ message: '加载超时', position: 'bottom' })
  return Promise.reject(error)
})
// http响应拦截器
myAxios.interceptors.response.use(res => {
  return res
}, error => {
  console.log(error)
  Vue.prototype.$Indicator.close()
  if (error && error.response) {
    Vue.prototype.$Toast({ message: error.response.status, position: 'bottom' })
    if (error.response.status === 401) { /// / token过期或被顶掉
      Notify({ type: 'primary', message: error.response.data ? error.response.data.message : '登录失效' })
      localStorage.setItem('adminAccessToken', '')
      var setCookie = function (name, value) {
        var time = 24 * 60 * 60 * 1000
        var exp = new Date().setHours(0, 0, 0, 0)
        var expires = new Date(exp + time)
        document.cookie = name + '=' + escape(value) + ';expires=' + expires.toGMTString() + ';path=/'
      }
      setCookie('token', '')
      setTimeout(() => {
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
      }, 1500)
    } else if (error.response.status === 500) {
      Notify({ type: 'primary', message: '500服务器错误' })
    } else if (error.response.status === 504) {
      Notify({ type: 'primary', message: '连接服务器超时' })
    } else if (error.response.status === 408) {
      Notify({ type: 'primary', message: '408请求超时' })
    } else if (error.response.status === 404) {
      Notify({ type: 'primary', message: '404错误' })
    } else {
      Vue.prototype.$Toast({ message: '接口返回错误', position: 'bottom' })
    }
  }
  return Promise.reject(error)
})

export { myAxios }
