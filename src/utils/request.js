import axios from 'axios'
import { Toast, Notify } from 'vant'
import Router from '../router/index'
import { baseURL } from '@/utils/config'
import store from '../store'

const myAxios = axios.create({
  baseURL: baseURL,
  timeout: 60000
})
// http请求拦截器
myAxios.interceptors.request.use(config => {
  // 加载圈
  console.log(store.state.admin)
  const { adminAccessToken } = store.state.admin
  if (adminAccessToken) {
    if (localStorage.getItem('adminAccessToken') === adminAccessToken) {
      config.headers.Authorization = adminAccessToken
    } else if (localStorage.getItem('adminAccessToken')) {
      Toast({ message: '权限错误', position: 'bottom' })
      return false
    }
  }
  return config
}, error => {
  // 加载圈消失
  Toast({ message: '加载超时', position: 'bottom' })
  return Promise.reject(error)
})
// http响应拦截器
myAxios.interceptors.response.use(res => {
  // 加载圈消失
  return res
}, error => {
  // 加载圈消失
  if (error && error.response) {
    if (error.response.status === 401) { /// / token过期或被顶掉
      Notify({ type: 'primary', message: error.response.data ? error.response.data.message : '登录失效' })
      // commit('setExpireStatus', true)
      // commit('set_admin_token', '')
      Router.replace({
        path: '/login'
      })
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
