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
          <div class="tabItem">
            <van-collapse v-model="activeNames" bind:change="onChange">
              <van-collapse-item name="1" :is-link="false" :border="false">
                <template slot="title">
                  <div style="padding:15px 0 14px 0;">
                    <h3>仲裁申请书</h3>
                  </div>
                </template>
                <div v-for="(item,index) in arbitrationApplication" :key="index">
                  <div style="padding:3px 0 13px;" v-for="(file,i) in item.arbAttachmentDatas" :key="i">
                      <!-- pdf查看 -->
                    <span class="icon iconfont icon-pdf"></span>
                    <span class="fileName">{{file.attachName}}</span>
                  </div>
                </div>
              </van-collapse-item>
              <van-collapse-item name="2" :is-link="false" :border="false">
                <template slot="title">
                  <div style="padding:15px 0 14px 0;">
                    <h3>证据资料<span v-if="ismany">({{arbiInfo.arbDebtCount}}个债权)</span></h3>
                  </div>
                </template>
                <div >
                  <div class="grayBg" v-for="(evidence, index) in arbitralAttachment" :key="'k'+index">
                    <p class="bold black"> {{evidence.evidenceName}}</p>
                    <p v-if="ismany" style="margin:7px 0 7px 0;">({{evidence.arbDebtNum}})</p>
                    <p v-if="ismany" style="margin:7px 0 7px 0;">订单编号：{{evidence.arbDebtOrderNum}}</p>
                    <p class="borderBottom" style="padding-top:9px;"></p>
                    <p style="padding:14px 0 0 0;">证据标题：</p>
                    <p class="black" style="margin-top:2px;">{{evidence.evidenceTitle}}</p>
                    <p style="margin-top:16px;">证明内容：</p>
                    <p class="black" style="margin-top:2px;line-height:22px;"><b v-html="evidence.evidenceContent"></b></p>
                    <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
                    <div style="background-color:#FFFFFF;padding:2px 14px 14px 14px;">
                      <div style="margin-top:12px;" v-for="(file, ind) in evidence.arbAttachmentDatas" :key="'j'+ind">
                        <span class="icon iconfont" :class="util.getFileIcon(file.attachName)"></span>
                        <span class="fileName">{{file.attachName}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- <p class="borderBottom" style="margin-top:14px;"></p> -->
                </div>
              </van-collapse-item>
              <van-collapse-item :name="index+3" :is-link="false" :border="false" v-for="(item,index) in applyers" :key="'h'+index" >
                <template slot="title">
                  <div style="padding:15px 0 14px 0;">
                    <h3>申请人信息1</h3>
                  </div>
                </template>
                <div>
                  <div class="flexInfoBox">
                    <div class="infoItem">
                      <div>公司名称</div>
                      <div class="black mt2">互联网金融</div>
                    </div>
                    <div class="infoLine"></div>
                    <div class="infoItem">
                      <div>统一信用代码</div>
                      <div class="black mt2">9875246464654</div>
                    </div>
                  </div>
                  <div class="flexInfoBox">
                    <div class="infoItem">
                      <div>注册地址</div>
                      <div class="black mt2">上海市黄浦区南京西路1200号</div>
                    </div>
                    <div class="infoLine"></div>
                    <div class="infoItem">
                      <div>约定送达地址</div>
                      <div class="black mt2">上海市黄浦区南京西路1200号</div>
                    </div>
                  </div>
                  <div class="flexInfoBox">
                    <div class="infoItem">
                      <div>邮编</div>
                      <div class="black mt2">/</div>
                    </div>
                    <div class="infoLine"></div>
                    <div class="infoItem">
                      <div>法定代表人</div>
                      <div class="black mt2">金成日</div>
                    </div>
                  </div>
                  <div class="flexInfoBox">
                    <div class="infoItem">
                      <div>身份证号</div>
                      <div class="black mt2">3101 0920 0009 0998 90</div>
                    </div>
                    <div class="infoLine"></div>
                    <div class="infoItem">
                      <div>手机号码</div>
                      <div class="black mt2">13635347890</div>
                    </div>
                  </div>
                  <div class="margin-top:20px;">
                    <div>证件资料</div>
                    <div class="certificates">
                      <img src="../../../src/assets/imgs/chongzhi@2x.png" alt="">
                      <img src="../../../src/assets/imgs/chongzhi@2x.png" alt="">
                      <img src="../../../src/assets/imgs/chongzhi@2x.png" alt="">
                      <img src="../../../src/assets/imgs/chongzhi@2x.png" alt="">
                    </div>
                  </div>
                  <div class="black bold" style="margin-top:20px;">
                    代理人信息
                  </div>
                  <div class="flexInfoBox">
                    <div class="infoItem">
                      <div>姓名</div>
                      <div class="black mt2">金成日</div>
                    </div>
                    <div class="infoLine"></div>
                    <div class="infoItem">
                      <div>职务</div>
                      <div class="black mt2">律师</div>
                    </div>
                  </div>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
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
import DICT from '@/const/dict'

export default {
  name: 'CaseDetail',
  data () {
    return {
      id: '',
      arbiInfo: {},
      active: 0,
      activeNames: ['1'],
      companyForm: {
        coName: '', // 企业名称
        coIdnum: '', // 统一代码
        coLegalPerson: '', // 法定代表人
        coLegalPersonIdnum: '', // 法定代表人身份证
        coAdress: '', // 注册地址
        coArrivedAddress: '', // 送达地址
        coPhone: '', // 法定代表人手机号
        coJob: '', // 法定代表人职务
        coEmail: '', // 法定代表人邮箱
        coZipcode: '', // 邮编
        coLicenceAttach: '', // 营业执照
        coLicenceAttachUrl: '',
        coIdAttachFornt: '', // 身份证正面
        coIdAttachRear: '', // 身份证反面
        coIdAttachRearUrl: '',
        coIdAttachForntUrl: '',
        coIdPaperAttach: '', // 身份证明
        coIdPaperAttachUrl: ''
      },
      step: 0,
      loading: false,
      id: '', // 案件id
      tabName: '1',
      arbiInfo: {
        arbitralHearVideoResponse: []
      },
      histroyTaskInst: [],
      replyBrief: [], // 答辩书
      replyLists: [], // 答辩资料
      applyedOtherLists: [], // 被申请人身份资料
      applyOtherLists: [], // 申请人身份资料
      arbitrationApplication: [], // 仲裁申请书
      arbitralAttachment: [], //  证据资料
      dissentApplication: [], // 异议申请书
      dissentAttachment: [], //  异议证据资料
      dissentReplyApplication: [], // 异议申请书
      dissentReplyAttachment: [], //  异议证据资料
      supplementaryArrs: [], //  补充资料 申请人
      supplementaryArrb: [], //  补充资料 被申请人

      arbTypes: DICT.arbTypes.filter((item, i) => { return i !== 0 }),
      applyedArr: [],
      applyers: [],
      arbitralContractAdvancey: {},
      arbitralAgentInfos: [],
      documents: [], // 文书
      arbitralRecordResponse: {},
      showRecall: false,
      withdrawn: false,
      gridData: [{
        name: '当事人提出仲裁申请，并已“预缴仲裁费用”，在案件状态在“立案”前提出撤回仲裁申请的。',
        number: '100%'
      }, {
        name: '案件“立案”后，案件状态在“组庭”前，申请人撤回仲裁申请的。',
        number: '50%'
      }, {
        name: '案件“组庭”后，在组庭开庭通知书送达前，申请人撤回仲裁申请或仲裁庭“资料审核不通过”的。',
        number: '30%'
      }, {
        name: '组庭开庭通知书送达后， 裁决书送达前，申请人撤回仲裁申请的。',
        number: '0%'
      }],
      stopStep: -1,
      mediationDatas: [],
      remark: '',
      userInfoDialog: false,
      uploadUrl: api.uploadURL,
      fileList: [],
      mime: ['.jpeg', '.jpg', '.png', '.pdf', '.doc', '.docx', '.docm'],
      arbRecallApplyInfoResponse: {},
      show: false,
      DICT,
      arbitralMediationResponse: {
        mediationDocuments: []
      },
      conciliationEvidence: [],
      arbitralLiveInfoResponse: {},
      api: api,
      util,
      commpayInfoDialog: false,
      ismany: false,
      wsDialog: false,
      multipleSelection: [], // 案件文书选择
      arbDebtCount: 0,
      wsobj: {
        wslist: [],
        sdlc: ''
      }
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
    getLastName (filaName) {
      if (typeof filaName === 'string') {
        return filaName.substring(filaName.lastIndexOf('.')).toLowerCase()
      } else {
        return ''
      }
    },
    setAttachIcons (attaches) {
      console.log(attaches, 'attaches')
      attaches.forEach(attach => {
        if (attach.attachUrlDes) {
          const lastName = attach.attachName.substring(attach.attachName.lastIndexOf('.')).toLowerCase()
          if (/\.jpg|\.png|\.jpeg/.test(lastName) === true) {
            attach.downloadUrl = api.getImgURL(attach.attachUrlDes)
            attach.imgSrc = attach.downloadUrl
          } else { // pdf
            attach.downloadUrl = api.getPdfURL(attach.attachUrlDes)
            attach.imgSrc = util.getIcon(attach.attachName)
          }
        } else {

        }
      })
    },
    // 解决下载文件名称错误的问题
    setAttachUrl (arr) {
      if (arr instanceof Array) {
        arr.forEach((item) => {
          if (item.arbAttachmentDatas instanceof Array) {
            item.arbAttachmentDatas.forEach((file) => {
              const lastName = file.attachName.substring(file.attachName.lastIndexOf('.')).toLowerCase()
              if (/\.jpg|\.png|\.jpeg/.test(lastName) === true) {
                file.attachUrlDes = api.getImgURL(file.attachUrlDes)
              } else { // pdf
                file.attachUrlDes = api.getPdfURL(file.attachUrlDes)
              }
            })
          } else if (item.attachName || item.documentName) {
            const attachName = item.attachName || item.documentName
            const attachUrlDes = item.attachUrlDes || item.documentUrlDes
            const lastName = attachName.substring(attachName.lastIndexOf('.')).toLowerCase()
            if (/\.jpg|\.png|\.jpeg/.test(lastName) === true) {
              item.attachUrlDes = api.getImgURL(attachUrlDes)
            } else { // pdf
              item.attachUrlDes = api.getPdfURL(attachUrlDes)
            }
          }
        })
      }
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
.tabItem
  padding:2px 15px 14px 14px;
  h3
    font-size:15px;
    font-weight:bold;
    color:#000;
    line-height:21px;
  h3:before
    content: "";
    display inline-block
    width:4px;
    height:16px;
    background-color:#1890FF;
    border-radius:1px;
    vertical-align:text-top;
    margin-right:8px;
  .borderBottom
    border-bottom:1pt solid #F0F0F0
  .icon
    font-size:20px;
  .fileName
    margin-left:8px;
    color:#000000;
  .grayBg
    background-color:#F6F7F9;
    padding:15px 15px 14px 16px;
    margin-top:14px;
  .bold
    font-weight:bold;
  .black
    color:#000000;
  .flexInfoBox
    display:flex;
    position:relative;
    box-sizing:border-box;
    justify-content:space-between;
    margin-top:16px;
    .infoItem
      width:47%;
    .infoLine
      border-right:1px solid #F0F0F0;
      height:65%;
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      margin:auto;
      width:1px;
    .mt2
      margin-top:2px;
  .certificates
    img
      width 79px;
      margin-top:6px;
      margin-right:9px;
    img:nth-child(4)
      margin-right:0;
  /deep/.van-cell
    padding:0;
    color:#9B9B9B;
  /deep/.van-collapse-item__content
    font-size: 15px;
    padding:0;
    line-height:21px;
  /deep/.van-collapse-item
    border-bottom:1px solid #f0f0f0
</style>
