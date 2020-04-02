<template>
  <div>
    <header class="myHeader" :class="{myHeaderActive:!headerShow}">
        <div class="headerTopBox" :class="{headerTopBoxDefault:!headerShow, headerTopBoxActive:headerShow}">
          <div class="title">工作台</div>
          <div class="avatar" @click="popPersonalCenter">
            <img src="./../../assets/imgs/home/avatar.png" alt="">
          </div>
        </div>
        <div class="home-info clearfix">
          <div class="home-info-title">仲裁总额(元)</div>
          <div class="home-info-money">{{moneyinfo.arbitralTotalAmount|money}}</div>
          <div>
            <div class="fl half home-num">{{moneyinfo.arbTotalCount}}</div>
            <div class="fl half home-num">{{moneyinfo.disputeTotalAmount|money}}</div>
          </div>
          <div>
            <div class="fl half home-label">案件总数(个)</div>
            <div class="fr half home-label">案件标的总额(元)</div>
          </div>
        </div>
    </header>
  </div>
</template>
<script>
import { api } from '@/utils/api'

export default {
  data () {
    return {
      moneyinfo: {
        disputeTotalAmount: 0,
        arbitralTotalAmount: 0,
        arbTotalCount: 0
      },
      headerShow: false
    }
  },
  created () {
    api.getArbIndexHeadInfo({ arbStatus: 2 }).then(res => {
      if (res.data.code === '1') {
        this.moneyinfo = res.data
      }
    })
  },
  mounted () {
    const This = this
    window.onscroll = function () {
      var a = document.documentElement.scrollTop || document.body.scrollTop// 滚动条y轴上的距离
      var b = document.documentElement.clientHeight || document.body.clientHeight// 可视区域的高度
      var c = document.documentElement.scrollHeight || document.body.scrollHeight// 可视化的高度与溢出的距离（总高度）
      console.log(a, b, c)
      if (a > 63) {
        This.headerShow = true
      } else if (This.headerShow && a < 23) {
        This.headerShow = false
      }
    }
  },
  methods: {
    popPersonalCenter () {
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        if (window.webkit && window.webkit.messageHandlers) {
          window.webkit.messageHandlers.popPersonalCenter.postMessage([''])
        } else {}
      } else if (/android/.test(ua)) {
        if (window.object && typeof (window.object.popPersonalCenter) === 'function') {
          window.object.popPersonalCenter()
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .myHeaderActive
    background:url('./../../assets/imgs/home/homeTop.png') top no-repeat;
  header.myHeader
    background-repeat:no-repeat;
    // background:url('./../../assets/imgs/home/homeTop.png') top no-repeat;
    background-size: contain;
    text-align:center;
    padding:63pX 0 0;
    .headerTopBox
      .title
        font-size:30px;
        line-height:42px;
        height:42px;
        font-weight:500;
        color:#ffffff;
      .avatar
        height:37px;
        width:37px;
        position relative
        top:2px;
        img
          width:100%;
    .headerTopBoxActive
      background:url('./../../assets/imgs/home/homeTop.png') top no-repeat;
      text-align:center;
      padding:20px 14px 0;
      position:fixed;
      left:0;
      right:0;
      top:0;
      .title
        font-size:18px;
      .avatar
        display:none;
    .headerTopBoxDefault
      display:flex;
      text-align:left;
      justify-content:space-between;
      padding:0 14px;
    .home-info
      margin:14px 14px 0 14px;
      box-shadow:0px 3px 6px rgba(0,0,0,0.16);
      border-radius:5px;
      background-color:#FFFFFF;
      padding-top:23px;
    .home-info-title
      font-weight:400;
      line-height:20px;
      color:#9B9B9B;
    .home-info-money
      line-height:26px;
      height:30px;
      font-size:30px;
      font-weight:bold;
      color:rgba(24,144,255,1);
      margin-top:7px;
    .home-num
      height:20px;
      font-size:20px;
      font-weight:bold;
      line-height:24px;
      color:#4A4A4A;
      margin-top:26px;
    .home-label
      height:20px;
      font-size:14px;
      font-weight:400;
      line-height:20px;
      color:#9B9B9B;
      margin:3px 0 23px;
</style>
