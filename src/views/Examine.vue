<template>
  <div class="wrapper">
    <Header right="确认" :rightMethod='rightMethod'>审核裁决书</Header>
    <div class="examineTop">
      <img src="../assets/imgs/examine@2x.png" alt="">
      <p>请提交您的审核</p>
    </div>
    <div class="examine">
      <div class="examineTitle">选择审核结果</div>
      <div class="btnBox">
        <!-- <van-button round type="info" block plain  hairline class="myBtn passActiveBtn" color="#1890FF">通过</van-button> -->
        <!-- <van-button round type="info" block plain  hairline class="myBtn refuseActiveBtn" color="#BCBCBC">不通过</van-button> -->
        <van-button round type="info" block plain  hairline :class="{'myBtn':true,passActiveBtn:false}" color="#1890FF">通过</van-button>
        <van-button round type="info" block plain  hairline :class="{'myBtn':true,refuseActiveBtn:false}" color="#BCBCBC">不通过</van-button>
      </div>
      <div class="examineTitle">录入审核意见(选填)</div>
      <div>
        <van-field
          class="myTextArea"
          v-model="message"
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
export default {
  data () {
    return {
      message: ''
    }
  },
  components: { Header },
  methods: {
    rightMethod () {

    }
  },
  created () {
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
