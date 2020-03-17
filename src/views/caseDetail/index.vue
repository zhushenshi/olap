<template>
  <div class="wrapper">
    <Header>案件详情</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">编号：{{arbiInfo.arbNumber || arbiInfo.arbTemporaryNumber}}</div>
        <div class="arbInfo">
          <span class="label">申请人：</span>
          <span>{{arbiInfo.arbProsecutorName}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">案件状态：</span>
          <span class="arbStatus" v-if="arbiInfo.arbStopStatus ==3 && arbiInfo.arbStatus==4">{{arbiInfo.status}}<i>(已撤回)</i></span>
          <span class="arbStatus" v-else-if="arbiInfo.arbStopStatus ==2">{{arbiInfo.status}}<i>(撤回中)</i></span>
          <span class="arbStatus" v-else-if="arbiInfo.arbStopStatus ==3 && arbiInfo.arbStatus==70">已<i>(撤回)</i>结案</span>
          <span class="arbStatus" v-else-if="arbiInfo.arbStopStatus ==3 && arbiInfo.arbStatus==71">已<i>(撤回)</i>归档</span>
          <span class="arbStatus" v-else>{{arbiInfo.status}}</span>

        </div>
        <div class="caseBaseInfoTable">
          <div class="caseBaseInfoItem">
            <span class="label">案由</span>
            <br>
            <span class="text">{{arbiInfo.arbName}}</span>
          </div>
          <div class="caseBaseInfoItem">
            <span class="label">申请日期</span>
            <br>
            <span class="text">{{arbiInfo.createTime}}</span>
          </div>
          <div class="caseBaseInfoItem">
            <span class="label">标的额</span>
            <br>
            <span class="text">{{arbiInfo.arbDisputeMoney}}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="caseDetail">
      <van-tabs :border="false" :ellipsis="false">
        <van-tab title="申请信息">
          <apply-info :arbiInfo="arbiInfo"></apply-info>
        </van-tab>
        <van-tab title="案件追踪">
          <case-tracking></case-tracking>
        </van-tab>
        <van-tab title="案件文书">
          <case-tracking></case-tracking>
        </van-tab>
        <van-tab title="组庭信息">内容 2</van-tab>
        <van-tab title="答辩资料">内容 2</van-tab>
        <van-tab title="补充资料">内容 2</van-tab>
        <van-tab title="调节资料">内容 2</van-tab>
        <van-tab title="撤回资料">内容 2</van-tab>
        <van-tab title="管辖权异议资料">
          <jurisdiction></jurisdiction>
        </van-tab>
      </van-tabs>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import applyInfo from './applyInfo.vue'
import caseTracking from './caseTracking.vue'
import jurisdiction from './jurisdiction.vue'
import { api } from '@/utils/api'
import util from '@/utils/util'

export default {
  name: 'CaseDetail',
  data () {
    return {
      id: '',
      arbiInfo: {}
    }
  },
  components: { Header, applyInfo, caseTracking, jurisdiction },
  methods: {
    formatData () {
      const applyedArr = []
      const applyers = []
      this.arbitralMediationResponse = this.arbiInfo.arbitralMediationResponse
      this.arbitralRecordResponse = this.arbiInfo.arbitralRecordResponse || {}
      this.arbitralRecordResponse.tribunalInfo = this.getTribunalInfo()
      this.arbitralRecordResponse.tribunalTime = this.getTribunalTime()
      console.log('=====================================')
      let sts = 0
      // if (this.arbitralRecordResponse.stopArbStatus) {   // 撤回的案件撤回时的状态
      // sts = this.arbitralRecordResponse.stopArbStatus

      if (this.arbiInfo.arbStopStatus == 3 && this.arbiInfo.arbStatus == 4) {
        sts = this.arbRecallApplyInfoResponse.applyRecallProcedure
        this.stopStep = this.arbTypes.length - 1 // 撤回成功显示流程为结案
      } else if (this.arbiInfo.arbStopStatus == 5) {
        sts = this.arbiInfo.arbitralStatus // 取管辖权异议时案件所处的状态
        this.stopStep = this.arbTypes.length - 1 // 异议成功显示流程为结案
      } else {
        sts = this.arbiInfo.arbStatus// 案件目前状态
      }

      this.arbiInfo.status = util.getStatus(this.arbiInfo.arbStatus)// 案件目前状态
      const n = Number(sts)
      this.arbiInfo.step = this.arbTypes.findIndex(item => {
        const range = item.arbStatus.split(',')
        const max = Number(range[1])
        const min = Number(range[0])
        console.log(range, max, min)
        return n < max && n >= min
      })
      if (sts == 52 || sts == 54) {
        this.arbiInfo.step++
      }
      console.log(this.arbiInfo.step)
      this.step = this.arbiInfo.step

      this.arbitralContractAdvancey = this.arbiInfo.arbitralContractAdvancey || {}
      this.arbiInfo.arbitralAttachment && this.arbiInfo.arbitralAttachment.forEach(item => {
        if (item.arbitralPtype === 2 && item.evidenceProperty === 1) {
          this.arbitrationApplication.push(item) // 仲裁申请书
        } else if (item.arbitralPtype === 2 && item.evidenceProperty === 2) {
          this.arbitralAttachment.push(item) //  证据资料
        } else if (item.arbitralPtype === 1 && item.evidenceProperty === 5) {
          this.replyLists.push(item) //  答辩资料
        } else if (item.arbitralPtype === 1 && item.evidenceProperty === 4) {
          this.replyBrief.push(item) //  答辩书
        } else if (item.evidenceProperty === 6) {
          this.conciliationEvidence.push(item)
        } else if (item.evidenceProperty === 7) {
          // item.updateProcess = '申请'
          this.dissentApplication.push(item) //  异议申请书
        } else if (item.evidenceProperty === 8) {
          // item.updateProcess = '申请'
          this.dissentAttachment.push(item) //  异议证据
        } else if (item.evidenceProperty === 9) {
          // item.updateProcess = '答辩'
          this.dissentReplyApplication.push(item) //  异议答辩申请书
        } else if (item.evidenceProperty === 10) {
          // item.updateProcess = '答辩'
          this.dissentReplyAttachment.push(item) // 补充资料
        } else if (item.evidenceProperty === 11) {
          if (item.arbitralPtype == 1) { // 被申请人
            this.supplementaryArrb.push(item)
          } else { // 申请人
            this.supplementaryArrs.push(item)
          }
        }
      })
      if (this.arbiInfo.arbStopStatus != 2 && this.arbiInfo.arbStopStatus != 3 && this.endName === 'user') {
        this.showRecall = true
      } else {
        this.showRecall = false
      }
      if (this.arbitralRecordResponse.defencesState == 1) { // 状态为2已答辩，才显示答辩数据
        this.replyLists = []
        this.replyBrief = []
      }
      this.arbiInfo.arbitralCoInfo && this.arbiInfo.arbitralCoInfo.forEach(item => {
        if (item.coType === 1) {
          applyedArr.push(item)
        } else {
          applyers.push(item)
        }
      })
      this.arbiInfo.arbitralPInfo && this.arbiInfo.arbitralPInfo.forEach(item => {
        if (item.pType === 1) {
          applyedArr.push(item)
        } else {
          applyers.push(item)
        }
      })
      applyers.forEach(item => {
        if (item.pType) { // 自然人
          if (item.sex === 1) {
            item.sex = '男'
          } else if (item.sex === 2) {
            item.sex = '女'
          } else {
            item.sex = ''
          }
        }
        if (item.arbitralAgentInfoResponse) {
          const agent = item.arbitralAgentInfoResponse
          // ['agentLawyerAttach', 'agentProxyAttach', 'agentCounselAttach', 'agentIdAttachFornt', 'agentIdAttachRear', 'agentJobAttach', 'agentContractAttach']
          const prefix = '代理人-' + agent.agentRealname
          this.applyOtherLists.push({
            attachUrlDes: agent.agentLawyerAttachDes,
            attachName: prefix + '-律师证照片' + this.getLastName(agent.agentLawyerAttach)
          }, {
            attachUrlDes: agent.agentProxyAttachDes,
            attachName: prefix + '-授权委托书' + this.getLastName(agent.agentProxyAttach)
          }, {
            attachUrlDes: agent.agentCounselAttachDes,
            attachName: prefix + '-律所所函' + this.getLastName(agent.agentCounselAttach)
          }, {
            attachUrlDes: agent.agentIdAttachForntDes,
            attachName: prefix + '-身份证正面' + this.getLastName(agent.agentIdAttachFornt)
          }, {
            attachUrlDes: agent.agentIdAttachRearDes,
            attachName: prefix + '-身份证反面' + this.getLastName(agent.agentIdAttachRear)
          }, {
            attachUrlDes: agent.agentJobAttachDes,
            attachName: prefix + '-职务证明' + this.getLastName(agent.agentJobAttach)
          }, {
            attachUrlDes: agent.agentContractAttachDes,
            attachName: prefix + '-劳动合同' + this.getLastName(agent.agentContractAttach)
          })
        }
        if (item.coLicenceAttachDes) {
          this.applyOtherLists.push({
            attachUrlDes: item.coLicenceAttachDes,
            attachName: item.coName + '-营业执照' + this.getLastName(item.coLicenceAttach)
          })
        }
        if (item.coIdPaperAttachDes) {
          this.applyOtherLists.push({
            attachUrlDes: item.coIdPaperAttachDes,
            attachName: item.coName + '-身份证明' + this.getLastName(item.coIdPaperAttach)
          })
        }
        if (item.coIdAttachForntDes) {
          this.applyOtherLists.push({
            attachUrlDes: item.coIdAttachForntDes,
            attachName: item.coName + '-身份证正面' + this.getLastName(item.coIdAttachFornt)
          })
        }
        if (item.coIdAttachRearDes) {
          this.applyOtherLists.push({
            attachUrlDes: item.coIdAttachRearDes,
            attachName: item.coName + '-身份证反面' + this.getLastName(item.coIdAttachRear)
          })
        }
        if (item.pIdAttachForntDes) {
          this.applyOtherLists.push({
            attachUrlDes: item.pIdAttachForntDes,
            attachName: item.pRealname + '-身份证正面' + this.getLastName(item.pIdAttachFornt)
          })
        }
        if (item.pIdAttachRearDes) {
          this.applyOtherLists.push({
            attachUrlDes: item.pIdAttachRearDes,
            attachName: item.pRealname + '-身份证反面' + this.getLastName(item.pIdAttachRear)
          })
        }
      })
      applyedArr.forEach(item => {
        if (item.pType) { // 自然人
          if (item.sex === 1) {
            item.sex = '男'
          } else if (item.sex === 2) {
            item.sex = '女'
          } else {
            item.sex = ''
          }
        } else {
        }
        if (item.coLicenceAttachDes) {
          this.applyedOtherLists.push({
            attachUrlDes: item.coLicenceAttachDes,
            attachName: item.coName + '-营业执照' + this.getLastName(item.coLicenceAttach)
          })
        }
        if (item.coIdPaperAttachDes) {
          this.applyedOtherLists.push({
            attachUrlDes: item.coIdPaperAttachDes,
            attachName: item.coName + '-身份证明' + this.getLastName(item.coIdPaperAttach)
          })
        }
        if (item.coIdAttachForntDes) {
          this.applyedOtherLists.push({
            attachUrlDes: item.coIdAttachForntDes,
            attachName: item.coName + '-身份证正面' + this.getLastName(item.coIdAttachFornt)
          })
        }
        if (item.coIdAttachRearDes) {
          this.applyedOtherLists.push({
            attachUrlDes: item.coIdAttachRearDes,
            attachName: item.coName + '-身份证反面' + this.getLastName(item.coIdAttachRear)
          })
        }
        if (item.pIdAttachForntDes) {
          this.applyedOtherLists.push({
            attachUrlDes: item.pIdAttachForntDes,
            attachName: item.pRealname + '-身份证正面' + this.getLastName(item.pIdAttachFornt)
          })
        }
        if (item.pIdAttachRearDes) {
          this.applyedOtherLists.push({
            attachUrlDes: item.pIdAttachRearDes,
            attachName: item.pRealname + '-身份证反面' + this.getLastName(item.pIdAttachRear)
          })
        }
      })
      this.applyedArr = applyedArr
      this.applyers = applyers

      console.log(applyedArr, 'apppppp')
      this.setAttachIcons(this.applyedOtherLists)
      this.setAttachUrl(this.arbitrationApplication)
      this.setAttachUrl(this.arbitralAttachment)
      this.setAttachUrl(this.replyBrief)
      this.setAttachUrl(this.replyLists)
      this.setAttachUrl(this.conciliationEvidence)
      if (this.arbitralMediationResponse && this.arbitralMediationResponse.mediationDocuments) { this.setAttachUrl(this.arbitralMediationResponse.mediationDocuments) }
      this.setAttachIcons(this.applyOtherLists)
      this.setAttachUrl(this.mediationDatas)
      this.setAttachUrl(this.dissentApplication)
      this.setAttachUrl(this.dissentAttachment)
      this.setAttachUrl(this.dissentReplyApplication)
      this.setAttachUrl(this.dissentReplyAttachment)
      if (this.endName === 'user') { // 查询审核不通过的备注
        if (this.arbiInfo.arbStatus == 2) {
          this.applyJudgeNoPassRemark()
        }
      }
    },
    getTribunalInfo () {
      const arr = []
      if (this.arbitralRecordResponse.tribunalType === 1) {
        arr.push('线下开庭')
      } else if (this.arbitralRecordResponse.tribunalType === 2) {
        arr.push('书面审理')
      }
      if (this.arbitralRecordResponse.arbitratorType === 1) {
        arr.push('独任')
      } else if (this.arbitralRecordResponse.arbitratorType === 2) {
        arr.push('合议')
      }
      return arr.join('-')
    },
    getTribunalTime () {
      if (this.arbitralRecordResponse.bTime) {
        const eTime = this.arbitralRecordResponse.eTime.replace(/^.*\s/, '')
        return this.arbitralRecordResponse.bTime.replace(/:00$/, '') + '~' + eTime.replace(/:00$/, '')
      } else return ''
    },
    getData () {
      api.getArbitralInfoDetail({ arbitralId: this.id }).then(res => {
        if (res.data.code === '1') {
          this.arbiInfo = res.data
          this.arbRecallApplyInfoResponse = res.data.arbRecallApplyInfoResponse
          this.arbitralLiveInfoResponse = res.data.arbitralLiveInfoResponse || {}
          if (this.arbiInfo.id) {
            this.formatData()
            // if (this.tabName !== '1') {
            //   this.handleClick({
            //     name: this.tabName
            //   }, {})
            // }
          }
        }
      })
    }
  },
  created () {
    console.log(this.$route.query.id)
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    section.casseBaseInfo
      padding:14px 0 0 0;
      background-color:#FFFFFF;
      text-align:left
      .caseBaseInfoBox
        padding:0 25px 12px 20px;
        position:relative;
        overflow:hidden;
        .arbNumber
          font-size:20px;
          font-weight:500;
          line-height:28px;
          color:#1890FF;
          .titleIcon
            vertical-align:middle;
        .arbInfo
          font-size:15px;
          font-weight:400;
          line-height:21px;
          color:#000000;
          margin-top:13px;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space:nowrap;
          .label
            color:#9B9B9B;
            margin:10px 0 0 3px;
          .arbStatus
            color: #1890FF;
            display:inline-block;
            line-height:21px;
            background: #C4E3FF;
            border-radius:18px;
            padding:0 12px 0 10px;
        .caseBaseInfoTable
          display: flex;
          margin-top:12px;
          .caseBaseInfoItem
            flex:1;
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space:nowrap;
            text-align:center;
            line-height:21px;
            .label
              color:#9B9B9B
            .text
              color:#24272B;
              line-height:29px;
    .caseDetail
      text-align:left;
      margin-top:14px;
      color:#9B9B9B;
      background:#FFFFFF;
      font-size:15px;
      line-height:21px;
/deep/.van-tabs--line .van-tabs__wrap
  height:46px;
/deep/.van-tab
  font-size:15px
  line-height:46px;
  min-width:87px;
/deep/ .van-tabs__line
  width:60px!important;
  background-color: #1890ff!important;
/deep/ .van-tab--active
  color:#1890ff;
</style>
