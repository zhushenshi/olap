<template>
  <div class="wrapper">
    <Header :back="back" right="审核" :rightMethod='back'>充值审核</Header>
    <section class="casseBaseInfo">
      <div class="casseBaseInfoBox">
        <div class="arbNumber">
          <img src="../assets/imgs/chongzhi.png" class="titleIcon">
          上海指旺信息科技有限公司</div>
        <div class="arbInfo">
          <span class="label">充值金额：</span>
          <span>2000元</span>
        </div>
        <div class="arbInfo">
          <span class="label">充值时间：</span>
          <span>2020.02.02 12:00:00</span>
        </div>
        <div class="arbInfo">
          <span class="label">备注：</span>
          <span @click="toastTex">备注内容</span>
        </div>
        <div class="caseStatus">
          待审核
        </div>
      </div>
    </section>
    <section>
      <div class="title">充值凭证</div>
      <div class="imgBox">
        <img src="./../assets/imgs/fapiao.png" alt="">
      </div>
      <div class="imgBox">
        <img src="./../assets/imgs/fapiao.png" alt="">
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  data () {
    return {
    }
  },
  components: { Header },
  methods: {
    back () {
      console.log('传入的back')
    },
    toastTex (e) {
      if ((e.target.offsetWidth + e.target.previousSibling.offsetWidth) > e.target.parentNode.offsetWidth) {
        this.$Toast({ message: e.target.innerHTML, position: 'middle' })
      }
    }
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
@import "../stylus/caseBaseInfo.styl";
.wrapper
  text-align:left;
  color:#9B9B9B;
  .title
    line-height:20px;
    padding:12px 20px 0;
  .imgBox
    margin:12px 17px;
    border:1px solid #E6E6E6;
    overflow: hidden;
    border-radius:10px;
    img
      width:100%;
</style>
