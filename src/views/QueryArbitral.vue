<template>
  <div class="wrapper">
    <div class="queryArbitral" :class="{queryArbitralActive:headerShow}">
      <p>
        <span class="caseTitle">案件查询</span>
        <span class="searchIcon" >
            <span class="iconfont iconzhongcai_shuaxin" v-if="showReset" @click="reset()"></span>
            <span class="iconfont iconzhongcai_sousuo" @click="goIntoPage('/queryArbitral/search')"></span>
           <!-- <img src="./../assets/imgs/reset.png" v-if="showReset" @click="reset()"/> -->
          <!-- <img src="./../assets/imgs/search.png" @click="goIntoPage('/queryArbitral/search')"/> -->
        </span>
      </p>
    </div>
    <div :class="{activeFixed:headerShow}">
      <div class="caseStatus" v-if="caseStatusShow" >
        <ul>
          <li v-for="item in arbTypes" :key="item.value"  @click="tabFilter(item.value)">
              <span :class="{'activeClass': activeName == item.value}">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div class="tabFilter" v-if="filterList.length" >
        <p>申请时间
          <span class="caret-wrapper">
            <i class="sort-caret ascending" :class="{'ascendingClass': sortName === 2 }" @click="fllter(2)"></i>
            <i class="sort-caret descending" :class="{'descendingClass': sortName === 1 }" @click="fllter(1)"></i>
          </span>
        </p>
        <p>
          案件编号
            <span class="caret-wrapper">
            <i class="sort-caret ascending" :class="{'ascendingClass': caseName === 2}" @click="fllters(2)"></i>
            <i class="sort-caret descending" :class="{'descendingClass': caseName === 1}" @click="fllters(1)"></i>
          </span>
        </p>
      </div>
    </div>
    <div class="queryArbitral" style="opacity:0" v-if="headerShow">
      <p>
        <span class="caseTitle">案件查询</span>
         <span class="searchIcon" >
            <!-- <img src="./../assets/imgs/reset.png" v-if="showReset" @click="reset()"/>
             <img src="./../assets/imgs/search.png" @click="goIntoPage('/queryArbitral/search')"/> -->
            <span class="iconfont iconzhongcai_shuaxin" v-if="showReset" @click="reset()"></span>
            <span class="iconfont iconzhongcai_sousuo" @click="goIntoPage('/queryArbitral/search')"></span>
        </span>
      </p>
    </div>
    <div style="opacity:0"  v-if="headerShow">
      <div class="caseStatus" v-if="caseStatusShow" >
        <ul>
          <li v-for="item in arbTypes" :key="item.value"  @click="tabFilter(item.value)">
              <span :class="{'activeClass': activeName == item.value}">{{item.label}}</span>
          </li>
        </ul>
      </div>
      <div class="tabFilter" >
        <p>申请时间
          <span class="caret-wrapper">
            <i class="sort-caret ascending" :class="{'ascendingClass': sortName === 2 }" @click="fllter(2)"></i>
            <i class="sort-caret descending" :class="{'descendingClass': sortName === 1 }" @click="fllter(1)"></i>
          </span>
        </p>
        <p>
          案件编号
            <span class="caret-wrapper">
            <i class="sort-caret ascending" :class="{'ascendingClass': caseName === 2}" @click="fllters(2)"></i>
            <i class="sort-caret descending" :class="{'descendingClass': caseName === 1}" @click="fllters(1)"></i>
          </span>
        </p>
      </div>
    </div>
    <div v-if="filterList.length">
      <pull-refresh v-model="refreshing" @refresh="onRefresh">
        <List
          v-model="loading" :finished="finished" finished-text="没有更多了" :offset=offset @load="onLoad">
          <div class="filterCnt">
            <ul>
              <li v-for="(item,index) in filterList" :key="index" @click="intoDetail(item)">
                  <p>
                    <span>
                      <img src="./../assets/imgs/shenhe.png">
                    </span>
                    <span class="caseNum">{{item.code}}</span>
                  </p>
                  <div class="filterL">
                  <p>
                    <span class="filterTitle">申请人：</span>
                    <span class="arbProsecutorName" @click="toastTex">{{item.arbProsecutorName}}</span>
                  </p>
                  <p>
                    <span class="filterTitle">标的额：</span>
                    <span @click="toastTex">{{item.arbDisputeMoney | money}}元</span>
                  </p>
                  <p>
                    <span class="filterTitle">申请日期：</span>
                    <span @click="toastTex">{{item.createTime}}</span>
                  </p>
                </div>
                <div class="filterR">
                    <!-- <span>
                      <img src="./../assets/imgs/zhongcaifuwuqi.png"/>
                    </span> -->
                  <div class="filterRs">
                      <div class="status" v-if='item.status'>{{item.status}}</div>
                      <div class="otherStatus" v-if="item.recallStatus === '1'">
                        <span class="recall">撤回</span>
                      </div>
                      <div class="otherStatus"  v-if="item.decisionStatus&&item.decisionStatus >= 1&&item.decisionStatus < 60">
                        <span class="recall">异议</span>
                      </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </List>
      </pull-refresh>
    </div>
    <div v-if="!filterList.length" class="noData">
      <img src="./../assets/imgs/zanwu-2.png"/>
      <p>无任何记录</p>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import { PullRefresh, List } from 'vant'
import 'vant/lib/pull-refresh/style'
import 'vant/lib/list/style'
import DICT from '@/const/dict'
import { api } from '@/utils/api'
import util from '@/utils/util'
export default {
  data () {
    return {
      arbTypes: DICT.arbTypes.map((v, i) => {
        return {
          value: v.arbStatus,
          label: v.label
        }
      }),
      activeName: 0, // tabs name为空时，默认值为0
      sortName: '',
      caseName: '',
      filterList: [],
      pageNo: 1,
      pageSize: 10, // 每页多少条
      formInline: {},
      loading: false,
      finished: false,
      refreshing: false,
      offset: 100,
      caseStatusShow: true,
      showReset: false,
      headerShow: false
    }
  },
  components: { PullRefresh, List },
  methods: {
    toastTex (e) {
      if ((e.target.offsetWidth + e.target.previousSibling.offsetWidth) > e.target.parentNode.offsetWidth) {
        e.stopPropagation()
        this.$Toast({ message: e.target.innerHTML, position: 'middle' })
      }
    },
    onLoad () {
      this.pageNo++
      this.loading = true
      this.getAllArbitralInfos()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.refreshing = true
      this.pageNo = 1
      this.getAllArbitralInfos()
    },
    intoDetail (item) {
      this.$router.push({
        path: '/caseDetails',
        query: { id: item.id }
      })
      util.hideOrShowBottomUI(false)
    },
    tabFilter (val) {
      this.activeName = val
      this.filterList = []
      this.search()
    },
    fllter (val) {
      this.sortName = val
      this.filterList = []
      this.getAllArbitralInfos()
    },
    fllters (val) {
      this.caseName = val
      this.filterList = []
      this.getAllArbitralInfos()
    },
    search () { // 表单查询（搜索案件编号、案件名、申请人、被申请人。搜索字符长度不超过20个）
      this.pageNo = 1
      this.getAllArbitralInfos()
    },
    reset () {
      console.log(this.formInline)
      this.formInline = {}
      this.showReset = false
      this.caseStatusShow = true
      this.getAllArbitralInfos()
    },
    goIntoPage (url) {
      this.$router.push(url)
      util.hideOrShowBottomUI(false)
    },
    getAllArbitralInfos () {
      var arbStatusList = this.activeName !== 0 ? this.activeName.split(',') : []
      if (arbStatusList.length > 0) {
        this.formInline.arbStatusBegin = arbStatusList[0]
        this.formInline.arbStatusEnd = arbStatusList[arbStatusList.length - 1]
      } else {
        delete this.formInline.arbStatusBegin
        delete this.formInline.arbStatusEnd
      }
      const params = Object.assign({}, this.formInline, {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        sortCreateTime: this.sortName,
        sortArbNumber: this.caseName
      })
      delete params.status
      this.loading = true
      this.$Indicator.open()
      api.mockRequest({ success: true, msg: '操作成功', code: '1', data: null, list: [{ id: '759f95357ad111ea9c0e005056ae47c6', arbitralInfoId: '759f95357ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:17', updateTime: '2020-04-15 16:00', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '297075', arbProcessExplain: '1', arbProcessTask: '297099', arbTemporaryNumber: '(2020)南仲（沪）缴字第99号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '1', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '44f9305c7ad111ea9c0e005056ae47c6', arbitralInfoId: '44f9305c7ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:16', updateTime: '2020-04-10 10:16', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296875', arbProcessExplain: '1', arbProcessTask: '296899', arbTemporaryNumber: '(2020)南仲（沪）缴字第95号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '429c65bc7ad111ea9c0e005056ae47c6', arbitralInfoId: '429c65bc7ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:16', updateTime: '2020-04-10 10:16', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296825', arbProcessExplain: '1', arbProcessTask: '296849', arbTemporaryNumber: '(2020)南仲（沪）缴字第93号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '37f2403c7ad111ea9c0e005056ae47c6', arbitralInfoId: '37f2403c7ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:15', updateTime: '2020-04-10 10:16', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296675', arbProcessExplain: '1', arbProcessTask: '296699', arbTemporaryNumber: '(2020)南仲（沪）缴字第87号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '32953c6c7ad111ea9c0e005056ae47c6', arbitralInfoId: '32953c6c7ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:15', updateTime: '2020-04-10 10:15', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296550', arbProcessExplain: '1', arbProcessTask: '296574', arbTemporaryNumber: '(2020)南仲（沪）缴字第82号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '3154d6087ad111ea9c0e005056ae47c6', arbitralInfoId: '3154d6087ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:15', updateTime: '2020-04-10 10:15', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296525', arbProcessExplain: '1', arbProcessTask: '296549', arbTemporaryNumber: '(2020)南仲（沪）缴字第81号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '2f289d967ad111ea9c0e005056ae47c6', arbitralInfoId: '2f289d967ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:15', updateTime: '2020-04-10 10:15', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296500', arbProcessExplain: '1', arbProcessTask: '296524', arbTemporaryNumber: '(2020)南仲（沪）缴字第80号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '374bc2117a0911ea9c0e005056ae47c6', arbitralInfoId: '374bc2117a0911ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: 'zyf鱼鱼', createTime: '2020-04-09 10:24', updateTime: '2020-04-09 10:24', arbName: '票据返还请求权纠纷', arbDisputeMoney: 6378.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '287640', arbProcessExplain: '1', arbProcessTask: '287664', arbTemporaryNumber: '(2020)南仲（沪）缴字第7号', arbProsecutorName: 'zyf企业渠道商', createBy: null, arbProductId: '56b108ad787111ea9c0e005056ae47c6', arbProductName: '云飞的产品', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '293dcd967ad111ea9c0e005056ae47c6', arbitralInfoId: '293dcd967ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:15', updateTime: '2020-04-10 10:15', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296425', arbProcessExplain: '1', arbProcessTask: '296449', arbTemporaryNumber: '(2020)南仲（沪）缴字第77号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }, { id: '283787b47ad111ea9c0e005056ae47c6', arbitralInfoId: '283787b47ad111ea9c0e005056ae47c6', arbNumber: null, arbDefendantName: '姬云清', createTime: '2020-04-10 10:15', updateTime: '2020-04-10 10:15', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: null, arbStatus: 10, arbProcess: '296400', arbProcessExplain: '1', arbProcessTask: '296424', arbTemporaryNumber: '(2020)南仲（沪）缴字第76号', arbProsecutorName: '明浔醉', createBy: null, arbProductId: '9d2eaa47725911ea9c0e005056ae47c6', arbProductName: '产品1', uploadStatus: null, expressStatus: null, onlineStatus: null, messageStatus: null, recallStatus: '2', remark: null, defencesAttachState: null, mediateDocumentCounts: null, decisionStatus: null, decisionId: null, decisionCreateTime: '', decisionProsecutorName: null, arbitralStatus: null, decisionRemark: null, defenceRemark: null, userFundRecordId: null, userFundStatus: null, arbitralLiveStatus: '0', arbTribunalBeginTime: '', arbitralType: 0, companyCode: null, currentCompanyCode: '', awardModifyState: null, arbitralAttachmentCount: null, number: null, additionalMaterialStatus: null }], total: 168, operationalTotal: 0 }).then(res => {
        this.$Indicator.close()
        if (res.data.code === '1') {
          const tableData = res.data.list
          tableData.forEach(v => {
            v.code = v.arbNumber || v.arbTemporaryNumber
            v.status = util.getStatus(v.arbStatus)
          })
          if (this.filterList.length >= 40) {
            this.finished = true
          }
          if (this.loading) { // 上拉加载
            this.filterList = this.filterList.concat(tableData) // 上拉加载新数据添加到数组中
            this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调
              this.loading = false // 关闭上拉加载中
            })
            if (tableData.length < 10) { // 没有更多数据
              this.finished = true // 上拉加载完毕
            }
          }
          if (this.refreshing) { // 关闭下拉刷新
            this.refreshing = false // 关闭下拉刷新中
            this.filterList = tableData // 重新给数据赋值
            if (this.finished) { // 如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
              this.finished = false
            }
          }
          console.log(this.filterList)
          if (this.activeName === 0 && this.filterList.length === 0) {
            this.caseStatusShow = false
          } else {
            this.caseStatusShow = true
          }
        } else {
          this.filterList = []
        }
      })
      // api.getAllArbitralInfos(params).then(res => {
      //   this.$Indicator.close()
      //   if (res.data.code === '1') {
      //     const tableData = res.data.list
      //     tableData.forEach(v => {
      //       v.code = v.arbNumber || v.arbTemporaryNumber
      //       v.status = util.getStatus(v.arbStatus)
      //     })
      //     if (this.filterList.length >= 40) {
      //       this.finished = true
      //     }
      //     if (this.loading) { // 上拉加载
      //       this.filterList = this.filterList.concat(tableData) // 上拉加载新数据添加到数组中
      //       this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调
      //         this.loading = false // 关闭上拉加载中
      //       })
      //       if (tableData.length < 10) { // 没有更多数据
      //         this.finished = true // 上拉加载完毕
      //       }
      //     }
      //     if (this.refreshing) { // 关闭下拉刷新
      //       this.refreshing = false // 关闭下拉刷新中
      //       this.filterList = tableData // 重新给数据赋值
      //       if (this.finished) { // 如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
      //         this.finished = false
      //       }
      //     }
      //     console.log(this.filterList)
      //     if (this.activeName === 0 && this.filterList.length === 0) {
      //       this.caseStatusShow = false
      //     } else {
      //       this.caseStatusShow = true
      //     }
      //   } else {
      //     this.filterList = []
      //   }
      // })
    }
  },
  mounted () {
    this.activeName = 0
    const This = this
    window.onscroll = function () {
      var topHeight = document.documentElement.scrollTop || document.body.scrollTop// 滚动条y轴上的距离
      if (topHeight > 53) {
        This.headerShow = true
      } else {
        This.headerShow = false
      }
    }
  },
  destroyed () {
    window.onscroll = null
  },
  created () {
    util.hideOrShowBottomUI(true)
    if (this.$route.params.form) {
      this.formInline = this.$route.params.form
      this.showReset = true
    }
    this.getAllArbitralInfos()
  }
}
</script>
<style lang="stylus" scoped>
.wrapper{
  background #F0F0F0
}
.queryArbitral
  height 117px
  background-image: linear-gradient(to right, #006CFF , #00489D);
  p
    overflow hidden
    position relative
    top 66px
    height 40px
    line-height 40px
    font-size 30px
    display flex
    justify-content space-between
    padding:0 20px;
   .caseTitle
      color #ffffff
      font-weight 500
    .searchIcon
      font-size 16px
      float right
      img
         margin-right 20px
         vertical-align middle
         width:16px;
      .iconfont
        font-size:19px;
        color:#ffffff;
      .iconzhongcai_shuaxin
        margin-right:20px;
 .activeFixed
  position fixed
  left 0
  right 0
  top:64px;
  z-index:1000;
.queryArbitralActive
  position:fixed;
  left:0
  right:0;
  z-index:1000;
  height 64px
  padding-top:20px;
  p
    top:0
    font-size 18px
    justify-content center
    .searchIcon
      // display:none
      position: absolute;
      right 20px;
.caseStatus
  background #ffffff
  height 56px;
  line-height 56px
  text-align left
  padding 0 15px
  white-space nowrap
  overflow-x scroll
  overflow-y hidden
  ul
     white-space nowrap
     li
      display:inline-block;
      margin 0 8px
      border:1pt solid rgba(255,255,255,0);
      span
        color #727272
        font-size 14px
        background #F2F2F2
        padding 4px 16px
        border-radius 18px
     .activeClass
        color #ffffff
        background #1890FF
.tabFilter
  display flex
  padding 12px 0
  font-size 14px
  background-color:#f0f0f0
  p
    flex 1
.caret-wrapper
    display -webkit-inline-box
    display -ms-inline-flexbox
    display inline-flex
    -webkit-box-orient vertical
    -webkit-box-direction normal
    -ms-flex-direction column
    flex-direction column
    -webkit-box-align center
    -ms-flex-align center
    align-items center
    height: 34px
    width: 24px
    vertical-align middle
    cursor pointer
    overflow initial
    position relative
.sort-caret
    width 0
    height 0
    border 5px solid transparent
    position absolute
    left 7px
.sort-caret.ascending
    border-bottom-color #C9D3E3
    top: 5px
.descendingClass
    border-top-color: #B3BFD0 !important
.ascendingClass
  border-bottom-color  #B3BFD0 !important
.sort-caret.descending
    border-top-color #C9D3E3
    bottom 7px
.filterCnt
    ul
      overflow hidden
      padding  0 14px
      li
       background #ffffff
       margin-bottom 14px
       border-radius 5px
       padding 14px
       position relative
       p
        margin-bottom 9px
        text-align left
        font-size 15px
        font-weight 400
        img
          vertical-align middle
          margin-right 12px
          width:24px;
        .caseNum
          font-size 17px
          font-weight 600
        .filterTitle
          color #9B9B9B
          font-size 15px
       .filterR
          right 12px
          position absolute
          top 0
          text-align right
          height 100%
          .status
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: 90px;
            color #1890FF
            font-size 12px
            border 1pt solid #C5E3FF
            border-radius 10px
            padding 2px 5px
          .otherStatus
            margin 6px 0
          .recall
            display inline-block
            color #FF1818
            font-size 12px
            border 1px solid #FF1818
            border-radius 10px
            width 40px
            text-align center
.filterL
  overflow: hidden;
  width:80%;
  text-overflow:ellipsis;
  white-space: nowrap;
  p
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    // .arbProsecutorName
    //   // width 60%
    //   position relative
    //   top 5px
.noData
  color #bcbcbc
  font-size 14px
  margin-top 80px
  // min-height 600px
.filterRs
  margin 0 auto
  position relative
  top 50%
  transform: translateY(-50%)
</style>
