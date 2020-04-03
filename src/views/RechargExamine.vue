<template>
  <div class="wrapper">
    <Header right="确认" :rightMethod='rightMethod'>充值审核</Header>
    <div class="examineTop">
      <img src="../assets/imgs/examine@2x.png" alt="">
      <p>请提交您的审核</p>
    </div>
    <div class="examine">
      <div class="examineTitle">选择审核结果</div>
      <div class="btnBox">
        <!-- <Button round type="info" block plain  hairline class="myBtn passActiveBtn" color="#1890FF">通过</Button> -->
        <!-- <Button round type="info" block plain  hairline class="myBtn refuseActiveBtn" color="#BCBCBC">不通过</Button> -->
        <Button round type="info" block plain  hairline :class="{'myBtn':true,'passActiveBtn':passActiveBtn}" color="#1890FF" @click="review('10',reviewTextarea)">通过</Button>
        <Button round type="info" block plain  hairline :class="{'myBtn':true,'refuseActiveBtn':refuseActiveBtn}" color="#BCBCBC" @click="review('11',reviewTextarea)">不通过</Button>
      </div>
      <div class="examineTitle">录入审核意见(选填)</div>
      <div>
        <Field
          class="myTextArea"
          v-model="reviewTextarea"
          rows="3"
          autosize
          placeholder="请录入您的审核意见"
          type="textarea"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import { Button, Field } from 'vant'
import 'vant/lib/button/style'
import 'vant/lib/field/style'
import { api } from '@/utils/api'
export default {
  data () {
    return {
      reviewTextarea: '',
      arbiInfo: {},
      passOrNot: '10',
      passActiveBtn: true,
      refuseActiveBtn: false
    }
  },
  components: { Header, Button, Field },
  methods: {
    rightMethod () {
      const params = Object.assign({}, this.arbiInfo, {
        audit: this.passOrNot,
        reviewTextarea: this.reviewTextarea
      })
      // if (this.passOrNot === '11' && this.reviewTextarea === '') {
      //   this.$Toast({ message: '请输入审核意见', position: 'bottom' })
      // } else {
      this.$Indicator.open()
      api.rechargeAuditNp(params).then(res => {
        this.$Indicator.close()
        if (res.data.code === '1') {
          // this.$Toast({ message: res.data.msg, position: 'bottom' })
          this.$router.push({ name: 'examineResult' })
        } else {
          this.$Toast({ message: res.data.msg, position: 'bottom' })
          this.$router.push({ name: 'portalToDoList' })
        }
      })
      // }
    },
    review (passOrNot, reviewTextarea) {
      this.passOrNot = passOrNot
      if (this.passOrNot === '10') {
        this.passActiveBtn = true
        this.refuseActiveBtn = false
      } else {
        this.refuseActiveBtn = true
        this.passActiveBtn = false
      }
    }
  },
  created () {
    this.arbiInfo = this.$route.query.arbiInfo
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  background:#FFFFFF;
  color:#24272B;
  font-size:20px;
  .examineTop
    width:43%;
    margin:21px auto 16px;
    img
      width:100%;
    p
      line-height:28px;
      margin-top:11px;
  .examine
    text-align:left;
    font-size:15px;
    padding:0 24px;
  .examineTitle
    padding:14px 0;
  .btnBox
    display:flex;
    margin-bottom:26px;
    .myBtn
      font-size:18px;
      text-align:center
    .myBtn:first-child
      margin-right:14px;
      // color:#1890FF!important;
      // border:1pt solid #1890FF!important;
    .myBtn:nth-child(2)
      // color:#BCBCBC!important;
      // border:1pt solid #BCBCBC!important;
    .passActiveBtn
      background:#1890FF;
      box-shadow:0px 0px 10px #1890FF;
      color:#FFFFFF!important;
    .refuseActiveBtn
      background:#FF6969;
      box-shadow:0px 0px 10px #FF6969;
      color:#FFFFFF!important;
  .myTextArea
    background-color:#F8F8F9;
    padding:18px;
    border-radius:4px;
</style>
