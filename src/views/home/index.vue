<template>
  <div class="wrapper">
    <div class="page-home">
      <home-header></home-header>
      <section>
        <div class="courtTrial" @click="enterMeetting">
          <!-- <img src="./../../assets/imgs/home/courtTrial.png" alt="" @click="$router.push('/queryArbitral')"> -->
          <img src="./../../assets/imgs/home/courtTrial.png" alt="">
        </div>
        <home-progress></home-progress>
        <home-case-num></home-case-num>
        <home-case-pay></home-case-pay>
        <home-case-percent></home-case-percent>
        <home-case-map></home-case-map>
      </section>
    </div>
  </div>
</template>
<script>
import homeHeader from './homeHeader.vue'
import homeProgress from './homeProgress.vue'
import homeCaseNum from './homeCaseNum.vue'
import homeCasePay from './homeCasePay.vue'
import homeCasePercent from './homeCasePercent.vue'
import homeCaseMap from './homeCaseMap.vue'

export default {
  name: 'Home',
  components: { homeHeader, homeProgress, homeCaseNum, homeCasePay, homeCasePercent, homeCaseMap },
  methods: {
    enterMeetting () {
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        if (window.webkit && window.webkit.messageHandlers) {
          window.webkit.messageHandlers.enterMeetting.postMessage([''])
        } else {}
      } else if (/android/.test(ua)) {
        if (window.object && typeof (window.object.enterMeetting) === 'function') {
          window.object.enterMeetting()
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
    background: #f0f0f0;
    padding-bottom:70px;
    section
    .courtTrial
      margin-top:8px;
      img
        width 96%
</style>
