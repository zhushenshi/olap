<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  created () {
    var ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) {
      var token = this.getCookie('token1') + this.getCookie('token2') + this.getCookie('token3')
      this.setCookie('token1', '')
      this.setCookie('token2', '')
      this.setCookie('token3', '')
      localStorage.setItem('adminAccessToken', token)
      localStorage.setItem('roleId', this.getCookie('roleId'))
    }
    // 设置 rem 函数
    function setRem () {
      // 320 默认大小16px; 320px = 20rem ;每个元素px基础上/16
      const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
      // 得到html的Dom元素
      const htmlDom = document.getElementsByTagName('html')[0]
      // 设置根元素字体大小
      htmlDom.style.fontSize = htmlWidth < 640 ? (htmlWidth / 10 + 'px') : (640 / 10 + 'px')
    }
    // 初始化
    setRem()
    // this.setCookie('abcd', '这是一个测试Cookie')
    // alert(this.getCookie('token'))
  },
  mounted () {
    this.isIPhoneXMore()
    window.backMethod = () => {
      const routeName = this.$route.name
      if (routeName !== 'Home' && routeName !== 'toDoList' && routeName !== 'QueryArbitral') {
        if (routeName === 'auditArbitralDetail' || routeName === 'examineResult') { // rechargeDetail
          this.$router.replace('/toDoList')
        } else if (routeName === 'CaseDetails') { // 案件详情
          window.caseDetailBackMethod()
        } else {
          this.$router.go(-1)
        }
        return true
      }
    }
    window.getIPhoneXMoreCallback = (res) => {
      // alert(res)//2不是
      localStorage.setItem('isliuhai', res)
    }
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
    },
    isIPhoneXMore () {
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        if (window.webkit && window.webkit.messageHandlers) {
          window.webkit.messageHandlers.isIPhoneXMore.postMessage([''])
        } else {}
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
