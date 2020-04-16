<template>
  <div class="wrapper">
    <div class="title">欢迎登录</div>
    <div class="tabContent clearfix">
      <div class="tab fl" :class="type==='account'?'tabActive':''" @click="type='account'">账户登录</div>
      <div class="tab fl" :class="type==='tel'?'tabActive':''" @click="type='tel'">手机号登录</div>
    </div>
    <div class="form" v-if="type==='account'">
      <div class="formItem"><Field v-model="loginForm.username" placeholder="用户名/手机号/邮箱" /></div>
      <div class="formItem"><Field v-model="loginForm.password" placeholder="密码" /></div>
      <div class="formItem">
        <img :src="captchaUrl" alt="" class="smsBtn" @click="refreshCode">
        <Field v-model="loginForm.kaptcha" placeholder="验证码"/>
      </div>
    </div>
    <div class="form" v-if="type==='tel'">
      <div class="formItem"><Field v-model="value" placeholder="输入手机号" /></div>
      <div class="formItem">
        <Button block type="primary" class="smsBtn" :color="'rgba(255,255,255,0.64)'">发送验证码</Button>
        <Field v-model="value" placeholder="验证码"/>
      </div>
    </div>
    <div class="btn">
      <Button type="primary" block color="#FFFFFF" class="myBtn" @click="login">登录</Button>
    </div>
  </div>
</template>
<script>
import JSEncrypt from '@/utils/jsencrypt'
import { api } from '@/utils/api'
import util from '@/utils/util'
import { Button, Field } from 'vant'
import 'vant/lib/button/style'
import 'vant/lib/field/style'
import MycaptchaUrl from '../assets/yzm.png'
export default {
  data () {
    return {
      type: 'account',
      value: '',
      uuid: '',
      captchaUrl: MycaptchaUrl,
      loginForm: {
        username: '',
        password: '',
        kaptcha: ''
      }

    }
  },
  components: { Button, Field },
  methods: {
    login () {
      var $JSEncrypt = new JSEncrypt()
      $JSEncrypt.setPublicKey('MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCPfoCRJo068xVcIhYnigpb4sxMjSKlkXVZIgl0vTdkdda+Qu8n4VxiLv6P8mHPi9WLZENJQd4kSM6gvSMpm2PtkNRY7aLceTrroPd6tAjKxsa8hvClAFy97OEcpOzi+WqxL8ERSeZ62Rai3fVjIbMP4b1tXaPiUxoPGgdJ74/l/QIDAQAB')
      // var loginFormPwd = $JSEncrypt.encrypt(this.loginForm.password)
      if (!this.loginForm.username) {
        this.$Toast({ message: '请填写用户名', position: 'bottom' })
      } else if (!this.loginForm.password) {
        this.$Toast({ message: '请填写密码', position: 'bottom' })
      } else if (!this.loginForm.kaptcha) {
        this.$message.error('请填写验证码')
        this.$Toast({ message: '请填写验证码', position: 'bottom' })
      } else {
        console.log(api.mockRequest())

        this.$Indicator.open()
        api.mockRequest({ success: true, msg: '登录成功', code: '100020', data: { access_token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbiIsInJvbGVJZCI6ImFkbWluaXN0cmF0b3IiLCJhdXRoU3RhdHVzIjpudWxsLCJ1c2VydHlwZSI6IjUiLCJzb3VyY2UiOiJOUFpDVyIsInVzZXJJZCI6IjEiLCJhdXRob3JpdGllcyI6WyJST0xFX2FkbWluOnNldHRpbmdzOkFyYml0cmFsQXdhcmRNYW5hZ2UiLCJST0xFX2FkbWluOm1hbmFnZTp0cmlidW5hbFdyaXR0ZW4iLCJST0xFX2FkbWluOnNldHRpbmdzOnByb2R1Y3QiLCJST0xFX2FkbWluOnNldHRpbmdzOnRpbWVMaW1pdCIsIlJPTEVfYWRtaW46bWFuYWdlOnJlcGx5IiwiUk9MRV9hZG1pbjpmaW5hbmNpYWw6cHJlY2hhcmdlIiwiUk9MRV9hZG1pbjpzZXR0aW5nczpjb250cmFjdEZvcm11bGEiLCJST0xFX2FkbWluOmF1ZGl0OmF1ZGl0QXJiaXRyYWxBd2FyZDphdWRpdEFyYml0cmFsQXdhcmRMaXN0IiwiUk9MRV9hZG1pbjphdWRpdDphdWRpdEp1cmlzZGljdGlvbjphdWRpdEp1cmlzZGljdGlvbkxpc3QiLCJST0xFX2FkbWluOmF1ZGl0OmF1ZGl0RGF0YTphdWRpdERhdGFMaXN0IiwiUk9MRV9hZG1pbjpzZXR0aW5nczppbml0UGFyYW1ldGVyIiwiUk9MRV9hZG1pbjptYW5hZ2U6bm90aWNlIiwiUk9MRV9hZG1pbjptYW5hZ2U6Y291cnRSZWNvcmQ6Y291cnRSZWNvcmRMaXN0IiwiUk9MRV9hZG1pbjpzZXR0aW5nczphcmJOdW1iZXIiLCJST0xFX2FkbWluOm1hbmFnZTp0cmlidW5hbE9mZmxpbmUiLCJST0xFX2FkbWluOnNldHRpbmdzOmFyYml0cmF0b3JNYW5hZ2UiLCJST0xFX2FkbWluOmZpbmFuY2lhbDpiaWxsIiwiUk9MRV9hZG1pbjptYW5hZ2U6dHJpYnVuYWwiLCJST0xFX2FkbWluOmFkbWluTWFuYWdlOnJvbGVNYW5hZ2UiLCJST0xFX2FkbWluOnNldHRpbmdzOnByb2NlZHVyZSIsIlJPTEVfYWRtaW46bWFuYWdlOmFkbWluTXNnIiwiUk9MRV9hZG1pbjptYW5hZ2U6cHJvb2ZyZWFkOnByb29mcmVhZExpc3QiLCJST0xFX2FkbWluOnNldHRpbmdzOmNvc3RDYWxjUnVsZSIsIm51bGwiLCJST0xFX2FkbWluOmZpbmFuY2lhbDpwcmVwYXltZW50IiwiUk9MRV9hZG1pbjptYW5hZ2U6cXVlcnlBcmJpdHJhbCIsIlJPTEVfYWRtaW46bWFuYWdlOmFyYml0cmFsQXdhcmQiLCJST0xFX2FkbWluOmFkbWluTWFuYWdlOmFkbWluTWFuYWdlTGlzdCJdLCJjbGllbnRfaWQiOiJjbGllbnRfb2xhcCIsInJlYWxuYW1lIjoi57O757uf566h55CG5ZGYIiwibGFzdExvZ2luVGltZSI6bnVsbCwiYXVkIjpbImFwaSJdLCJwaG9uZSI6IjEzNjEyMzQ1Njc4IiwibW9iaWxlU3RhdHVzIjpudWxsLCJzY29wZSI6WyJhbGwiXSwicm9sZU5hbWUiOm51bGwsInBlcm1zIjoibnVsbCxST0xFX2FkbWluOm1hbmFnZTpxdWVyeUFyYml0cmFsLG51bGwsUk9MRV9hZG1pbjphdWRpdDphdWRpdEp1cmlzZGljdGlvbjphdWRpdEp1cmlzZGljdGlvbkxpc3QsUk9MRV9hZG1pbjptYW5hZ2U6bm90aWNlLFJPTEVfYWRtaW46bWFuYWdlOnJlcGx5LG51bGwsUk9MRV9hZG1pbjptYW5hZ2U6dHJpYnVuYWwsUk9MRV9hZG1pbjptYW5hZ2U6dHJpYnVuYWxPZmZsaW5lLFJPTEVfYWRtaW46bWFuYWdlOmNvdXJ0UmVjb3JkOmNvdXJ0UmVjb3JkTGlzdCxST0xFX2FkbWluOm1hbmFnZTp0cmlidW5hbFdyaXR0ZW4sUk9MRV9hZG1pbjphdWRpdDphdWRpdERhdGE6YXVkaXREYXRhTGlzdCxudWxsLFJPTEVfYWRtaW46bWFuYWdlOnByb29mcmVhZDpwcm9vZnJlYWRMaXN0LFJPTEVfYWRtaW46YXVkaXQ6YXVkaXRBcmJpdHJhbEF3YXJkOmF1ZGl0QXJiaXRyYWxBd2FyZExpc3QsUk9MRV9hZG1pbjptYW5hZ2U6YXJiaXRyYWxBd2FyZCxudWxsLFJPTEVfYWRtaW46ZmluYW5jaWFsOmJpbGwsbnVsbCxST0xFX2FkbWluOnNldHRpbmdzOmFyYml0cmF0b3JNYW5hZ2UsUk9MRV9hZG1pbjpzZXR0aW5nczpwcm9kdWN0LFJPTEVfYWRtaW46c2V0dGluZ3M6Y29udHJhY3RGb3JtdWxhLFJPTEVfYWRtaW46c2V0dGluZ3M6QXJiaXRyYWxBd2FyZE1hbmFnZSxST0xFX2FkbWluOnNldHRpbmdzOmNvc3RDYWxjUnVsZSxST0xFX2FkbWluOnNldHRpbmdzOnRpbWVMaW1pdCxST0xFX2FkbWluOnNldHRpbmdzOmFyYk51bWJlcixST0xFX2FkbWluOnNldHRpbmdzOmluaXRQYXJhbWV0ZXIsbnVsbCxST0xFX2FkbWluOmFkbWluTWFuYWdlOmFkbWluTWFuYWdlTGlzdCxST0xFX2FkbWluOmFkbWluTWFuYWdlOnJvbGVNYW5hZ2UsUk9MRV9hZG1pbjptYW5hZ2U6YWRtaW5Nc2csUk9MRV9hZG1pbjpzZXR0aW5nczpwcm9jZWR1cmUsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLFJPTEVfYWRtaW46ZmluYW5jaWFsOnByZXBheW1lbnQsUk9MRV9hZG1pbjpmaW5hbmNpYWw6cHJlY2hhcmdlLG51bGwiLCJleHAiOjE1ODcxMTU0MDAsImp0aSI6IjI4NWJmODZmLWY2NDgtNGJiMy05MTMzLTQ0MTE5MjlhYjE3NCIsImVtYWlsIjoicm9vdEByZW5yZW4uaW8iLCJ1c2VybmFtZSI6ImFkbWluIiwiY2hhbm5lbENvZGUiOm51bGwsInN0YXR1cyI6MX0.wdlhUB6mdguNXBmOliloyYBPEDKk7VOHuUj3wfkCd8s', expires_in: '86399', roleId: 'administrator', roleName: null, usertype: '5', source: 'NPZCW', userId: '1', email: 'root@renren.io', username: 'admin', realname: '系统管理员', channelCode: null, lastLoginTime: null, authStatus: null, mobileStatus: null, status: 1, phone: '13612345678' } }).then(res => {
          this.$Indicator.close()
          console.log(res)
          if (res.data.code === '100020') { // 登录成功
            localStorage.setItem('adminAccessToken', res.data.data.access_token)
            localStorage.setItem('roleId', res.data.data.roleId)
            this.$Toast({ message: '登录成功', position: 'bottom' })
            this.$router.push({ path: '/portal/home' })
          } else {
            this.loginForm.verificationCode = ''
            this.refreshCode()
            this.$Toast({ message: res.data.msg, position: 'bottom' })
          }
        })
        // api.sysUserLogin({
        //   username: this.loginForm.username,
        //   password: loginFormPwd,
        //   kaptcha: this.loginForm.kaptcha,
        //   uuid: this.uuid
        // }).then((res) => {
        //   this.$Indicator.close()
        //   if (res.data.code === '100020') { // 登录成功
        //     // var a = res.data.data.access_token.length
        //     // this.setCookie('token1', res.data.data.access_token.slice(0, Math.floor(a / 3)))
        //     // this.setCookie('token2', res.data.data.access_token.slice(Math.floor(a / 3)), Math.floor(a / 3 * 2))
        //     // this.setCookie('token3', res.data.data.access_token.slice(Math.floor(a / 3 * 2), a))
        //     localStorage.setItem('adminAccessToken', res.data.data.access_token)
        //     localStorage.setItem('roleId', res.data.data.roleId)
        //     this.$router.push({ path: '/portal/home' })
        //   } else {
        //     this.loginForm.verificationCode = ''
        //     this.refreshCode()
        //     this.$Toast({ message: res.data.msg, position: 'bottom' })
        //   }
        // }).catch(() => {
        //   this.$Indicator.close()
        // })
      }
    },
    setCookie (name, value) {
      var time = 24 * 60 * 60 * 1000
      var exp = new Date().setHours(0, 0, 0, 0)
      var expires = new Date(exp + time)
      document.cookie = name + '=' + escape(value) + ';expires=' + expires.toGMTString() + ';path=/'
    },
    refreshCode () {
      var uuid = util.uuidfn()
      // this.captchaUrl = api.getCodeUrl(uuid)
      this.uuid = uuid
    }
  },
  created () {
    this.refreshCode()
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  background:linear-gradient(135deg,rgba(0,108,255,0.81) 0%,rgba(0,72,157,1) 100%);
  color #ffffff
  padding:68px 0 0 0
  .title
    font-size:24px;
    color:rgba(255,255,255,1);
  .tabContent
    width:190px
    margin:33px auto 39px;
    .tab
      width:95px;
      height:36px;
      font-size:14px;
      line-height:36px;
      border-radius:0px 5px 5px 0px;
      background:rgba(255,255,255,0.2);
    :first-child
      border-radius:5px 0px 0px 5px;
    .tabActive
      background:rgba(255,255,255,1);
      color:#1890FF;
  .form
    width:280px;
    margin:0 auto;
    opacity:1;
    .formItem
      margin-bottom:16px;
      position relative
      .smsBtn
        position:absolute;
        width:107px;
        right:0;
        height:100%;
        color:#1890FF!important;
        z-index:100;
        // border:1px solid rgba(255,255,255,0.64);
        border-radius:0px 5px 5px 0px;
    /deep/.van-cell{
      background-color:rgba(0,0,0,0);
      border 1pt solid rgba(255,255,255,0.5);
      border-radius:5px;
      border-radius:5px;
      font-size:16px;
      input{
        color:#ffffff;
      }
      input::placeholder{
        color:rgba(255,255,255,1);
        opacity:0.5;
      }
    }
  .btn
    margin:0 auto;
    width:280px;
    height:45px;
    // background:rgba(255,255,255,1);
    opacity:1;
    border-radius:5px;
    .myBtn
      color:#1890FF!important;
      font-size:18px;
      border-radius:5px;
      margin-top 41px;
</style>
