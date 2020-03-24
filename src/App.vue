<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    // var token
    // if (token === null) {
    //   token = localStorage.getItem('token')
    //   if (token === null) {
    //     window.location.reload()
    //   }
    // }
    // alert(this.getCookie('token'))
    // localStorage.setItem('adminAccessToken', this.getCookie('token'))
    if (localStorage.getItem('adminAccessToken')) {
      this.$store.commit('set_admin_token', localStorage.getItem('adminAccessToken'))
      this.$store.commit('set_admin_name', localStorage.getItem('adminName'))
    }
    // this.setCookie('abcd', '这是一个测试Cookie')
    // alert(this.getCookie('token'))
  },
  methods: {
    setCookie (name, value) {
      var time = 24 * 60 * 60 * 1000
      var exp = new Date().setHours(0, 0, 0, 0)
      var expires = new Date(exp + time)
      document.cookie = name + '=' + escape(value) + ';expires=' + expires.toGMTString() + ';path=/'
    },
    getCookie (name) {
      var reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      var arr = document.cookie.match(reg)
      if (arr) {
        return unescape(arr[2])
      } else {
        return null
      }
    }
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin: 0 auto;
  height:100%;
</style>
