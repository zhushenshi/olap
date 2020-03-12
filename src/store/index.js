import Vue from 'vue'
import Vuex from 'vuex'
// import { Message, MessageBox } from 'element-ui'
// import { Dialog, Toast, Loading, Notify } from 'vant'
// import router from '@/router'
Vue.use(Vuex)

const admin = {
  state: {
    adminAccessToken: '',
    adminName: ''
  },
  mutations: {
    set_admin_token (state, token) {
      state.adminAccessToken = token
      localStorage.setItem('adminAccessToken', token)
    },
    set_admin_name (state, name) {
      state.adminName = name
      localStorage.setItem('adminName', name)
    }
  }
}

export default new Vuex.Store({
  modules: {
    admin: admin
  },
  state: {
    unreadNumber: 0,
    isExpire: false // 登录是否过期
  },
  mutations: {
    setUnreadNumber (state, number) {
      let n = Number.parseInt(number)
      if (n < 0) n = 0
      state.unreadNumber = n
    },
    setExpireStatus (state, status) {
      state.isExpire = status
    }
  },
  actions: {
  }
})
