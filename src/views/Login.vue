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
export default {
  data () {
    return {
      type: 'account',
      value: '',
      uuid: '',
      captchaUrl: '',
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
      var loginFormPwd = $JSEncrypt.encrypt(this.loginForm.password)
      if (!this.loginForm.username) {
        this.$Toast({ message: '请填写用户名', position: 'bottom' })
      } else if (!this.loginForm.password) {
        this.$Toast({ message: '请填写密码', position: 'bottom' })
      } else if (!this.loginForm.kaptcha) {
        this.$message.error('请填写验证码')
        this.$Toast({ message: '请填写验证码', position: 'bottom' })
      } else {
        this.$Indicator.open()
        api.sysUserLogin({
          username: this.loginForm.username,
          password: loginFormPwd,
          kaptcha: this.loginForm.kaptcha,
          uuid: this.uuid
        }).then((res) => {
          this.$Indicator.close()
          if (res.data.code === '100020') { // 登录成功
            this.$store.commit('set_admin_token', res.data.data.access_token)
            this.$store.commit('set_admin_name', res.data.data.realname)
            this.setCookie('token', res.data.data.access_token)
            this.$router.push({ path: '/portal/home' })
            localStorage.oldpath = '/admin/home/workbench'
            localStorage.index = 0//
            localStorage.roleId = res.data.data.roleId//
          } else {
            this.loginForm.verificationCode = ''
            this.refreshCode()
            this.$Toast({ message: res.data.msg, position: 'bottom' })
          }
        }).catch(() => {
          this.$Indicator.close()
        })
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
      this.captchaUrl = api.getCodeUrl(uuid)
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
