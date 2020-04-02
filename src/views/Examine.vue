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
        <!-- <Button round type="info" block plain  hairline class="myBtn passActiveBtn" color="#1890FF">通过</Button> -->
        <!-- <Button round type="info" block plain  hairline class="myBtn refuseActiveBtn" color="#BCBCBC">不通过</Button> -->
        <Button round type="info" block plain  hairline :class="{'myBtn':true,'passActiveBtn':passActiveBtn}" color="#1890FF" @click="review('1',reviewTextarea)">通过</Button>
        <Button round type="info" block plain  hairline :class="{'myBtn':true,'refuseActiveBtn':refuseActiveBtn}" color="#BCBCBC" @click="review('2',reviewTextarea)">不通过</Button>
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
import { Button, Field } from 'vant'
import 'vant/lib/button/style'
import 'vant/lib/field/style'
import Header from '@/components/Header.vue'
import { api } from '@/utils/api'
export default {
  data () {
    return {
      reviewTextarea: '',
      arbiInfo: {},
      passOrNot: '1',
      passActiveBtn: false,
      refuseActiveBtn: false
    }
  },
  components: { Header, Button, Field },
  methods: {
    rightMethod () {
      let promise = null
      if (this.passOrNot === '1') {
        promise = api.secondReviewArbitralAwardPass
      } else {
        promise = api.secondReviewArbitralAwardNoPass
      }
      if (this.passOrNot === '2' && this.reviewTextarea === '') {
        this.$Toast({ message: '请输入意见', position: 'bottom' })
      } else {
        this.$Indicator.open()
        this.save().then(res => {
          if (res.data.code === '1') {
            this.$Indicator.close()
            return promise({
              processCommonRequest: {
                arbitralInfoId: this.arbiInfo.id, // 案件id
                processTaskId: this.arbiInfo.arbProcessTask // 案件流程id
              },
              passOpinion: this.reviewTextarea
            })
          } else {
            this.$Toast({ message: '裁决书保存失败', position: 'bottom' })
          }
        }).then((res) => {
          this.$Indicator.close()
          if (res.data.code === '1') {
            this.$router.push({ name: 'examineResult' })
            this.$Toast({ message: res.data.msg, position: 'bottom' })
          } else {
            this.$Toast({ message: res.data.msg, position: 'bottom' })
            this.$router.push({ name: 'portalToDoList' })
          }
        }).catch(ex => { console.log(ex) })
      }
    },
    getParams () {
      const htmlString = this.arbiInfo.arbitralRecordResponse.arbitralAwardContext
      if (htmlString.indexOf('ql-editor') > -1) {
        // eslint-disable-next-line
        this.arbitralAwardContext = htmlString.match(/<div class=\'ql-editor\'>([\s\S]*?)<\/div>/)[1].replace(/(&#160;){4,}/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      } else if (htmlString.indexOf('<body>') > -1) {
        // eslint-disable-next-line
        this.arbitralAwardContext = htmlString.match(/<body>([\s\S]*?)<\/body>/)[1]
      } else {
        this.arbitralAwardContext = htmlString
      }
      let paramString = this.arbitralAwardContext
      // eslint-disable-next-line
      paramString = paramString.replace(/<br>/g, '<br \/>').replace(/&nbsp;/g, '&#160;').replace(/(?=[^>]*(?=<))\s/g, '&#160;')
      paramString = paramString.replace(/〇/g, '<span class="ql-font-SimSun">〇</span>')
      if (htmlString.indexOf('ql-editor') > -1) {
        // eslint-disable-next-line
        paramString = htmlString.replace(/<div class=\'ql-editor\'>([\s\S]*?)<\/div>/, `<div class='ql-editor'>${paramString}</div>`)
      } else if (htmlString.indexOf('<body>') > -1) {
        paramString = htmlString.replace(/<body>([\s\S]*?)<\/body>/, `<body>${paramString}</body>`)
      }
      return paramString
    },
    save () {
      const paramString = this.getParams()
      return api.saveArbitralAwardContext({
        arbitralAwardContext: paramString,
        arbitralInfoId: this.arbiInfo.id // 案件id
      })
    },
    review (passOrNot, reviewTextarea) {
      this.passOrNot = passOrNot
      if (this.passOrNot === '1') {
        this.passActiveBtn = true
        this.refuseActiveBtn = false
      } else {
        this.refuseActiveBtn = true
        this.passActiveBtn = false
      }
    }
  },
  created () {
    this.arbiInfo = this.$route.params.arbiInfo
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
