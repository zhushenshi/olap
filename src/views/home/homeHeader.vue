<template>
  <div>
    <header>
        <div class="headerTopBox">
          <div class="title">工作台</div>
          <div class="avatar">
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
      }
    }
  },
  created () {
    api.getArbIndexHeadInfo({ arbStatus: 2 }).then(res => {
      if (res.data.code === '1') {
        this.moneyinfo = res.data
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
  header
    background-repeat:no-repeat;
    background:url('./../../assets/imgs/home/homeTop.png') top no-repeat;
    background-size: contain;
    text-align:center;
    padding:63px 14px 0;
    .headerTopBox
      display:flex;
      text-align:left;
      justify-content:space-between;
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
    .home-info
      margin-top:14px;
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
