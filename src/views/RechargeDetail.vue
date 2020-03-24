<template>
  <div class="wrapper">
    <Header :right="rightTitle" :rightMethod="rightMethod">充值审核</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">
          <img src="./../assets/imgs/name.png" class="arbNumberImg"/>
          {{arbiInfo.applicant}}</div>
        <div class="arbInfo">
          <span class="label">充值金额：</span>
          <span>{{arbiInfo.money}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">充值时间：</span>
          <span>{{arbiInfo.createTime}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">备注：</span>
          <span>{{arbiInfo.advice}}</span>
        </div>
        <div class="caseStatus" v-if="arbiInfo.result=='0'">
          待审核
        </div>
        <div class="caseStatus" v-else>
          已审核
        </div>
      </div>
    </section>
    <section class="rechargeTitle">
        <p>充值凭证</p>
        <img v-for="(item,index) in arbiInfo.attachments" :key="index" :src="api.getImgURL(item.fileUrl)" alt="充值凭证" :preview="index+item.fileUrl" preview-text="充值凭证" height="100%" />
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import { api } from '@/utils/api'

export default {
  data () {
    return {
      rightTitle: '',
      arbiInfo: {},
      api
    }
  },
  components: { Header },
  methods: {
    rightMethod () {
      this.$router.push({ path: '/toDoList/RechargExamine', query: { arbiInfo: this.arbiInfo } })
    }

  },
  created () {
    this.arbiInfo = JSON.parse(this.$route.query.rechargeData)
    console.log(this.arbiInfo.attachments)
    if (this.arbiInfo.result === '0') {
      this.rightTitle = '审核'
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../stylus/caseBaseInfo.styl";
.wrapper
  .caseDetail
    text-align:left;
    padding:14px 0 0 0;
    color:#727272;
    .inline-ul
      li
        text-align:center;
        margin: 0 15px;
      li.active
        color:#000000;
        font-weight:500;
      li:after
        height: 3px;
        width:23px;
.rechargeTitle
  font-size 14px
  color #9B9B9B
  margin 15px 18px
  text-align left
  img
    margin 10px 0
    width 100%
.arbNumberImg
  vertical-align middle
  width 25px
</style>
