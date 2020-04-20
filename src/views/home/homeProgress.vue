<template>
  <div>
    <div class="caseRecordTitle content">以下为当年统计数据</div>
    <div class="caseRecord">
      <div class="caseRecordBox">
        <div class="fl caseRecordItem">
          <p class="caseText">申请案件总数</p>
          <p class="caseNum">{{applyTotalCount}}</p>
          <div class="caseChartBox">
            <SvgLine :values='listarr' :width='297' :height="53"></SvgLine>
          </div>
          <p class="casePs">*本统计以当年数据统计</p>
          <p class="caseMonthNum">月申请数 <span class="one">{{monthCount}}</span></p>
        </div>
        <div class="fl caseRecordItem">
          <p class="caseText">正常结案总数占比</p>
          <p class="caseNum">{{datainfo.closeCountProportion}}</p>
          <div class="caseChartBox">
            <van-progress  pivot-text=""  color="#1890FF"  :percentage="datainfo.closeCountProportion&&parseInt(datainfo.closeCountProportion)" stroke-width="16"/>
          </div>
          <p class="casePs">*本统计以当年数据统计</p>
          <div class="caseMonthNum clearfix">
            <div class="fl halfDiv">
              月同比
              <span class="icon iconfont" :class="{'iconzhongcai_sanjiao-shang':getAddorRe(datainfo.monthToYearProportion)==3,'iconzhongcai_sanjiao-xia':getAddorRe(datainfo.monthToYearProportion)==2}"></span>
              <span class="percent">{{datainfo.monthToYearProportion=='--'?datainfo.monthToYearProportion:(''+datainfo.monthToYearProportion).replace('-','')}}</span></div>
            <div class="fl halfDiv">
              周环比
              <span class="icon iconfont" :class="{'iconzhongcai_sanjiao-shang':getAddorRe(datainfo.chainRatioProportion)==3,'iconzhongcai_sanjiao-xia':getAddorRe(datainfo.chainRatioProportion)==2}"></span>
              <span class="percent">{{datainfo.chainRatioProportion=='--'?datainfo.chainRatioProportion:(''+datainfo.chainRatioProportion).replace('-','')}}</span></div>
          </div>
        </div>
        <div class="fl caseRecordItem">
          <p class="caseText">标的总额</p>
          <p class="caseNum">{{datainfo.disputeMoneyTotal|money}}</p>
          <div class="caseChartBox">
            <div class="fl halfDiv">
              月同比
              <span class="icon iconfont" :class="{'iconzhongcai_sanjiao-shang':getAddorRe(datainfo.disputeMonthProportion)==3,'iconzhongcai_sanjiao-xia':getAddorRe(datainfo.disputeMonthProportion)==2}"></span>
              <span>{{datainfo.disputeMonthProportion=='--'?datainfo.disputeMonthProportion:(''+datainfo.disputeMonthProportion).replace('-','')}}</span>
            </div>
            <div class="fl halfDiv">
              周环比
              <span class="icon iconfont" :class="{'iconzhongcai_sanjiao-shang':getAddorRe(datainfo.disputeRatioProportion)==3,'iconzhongcai_sanjiao-xia':getAddorRe(datainfo.disputeRatioProportion)==2}"></span>
              <span>{{datainfo.disputeRatioProportion=='--'?datainfo.disputeRatioProportion:(''+datainfo.disputeRatioProportion).replace('-','')}}</span>
            </div>
          </div>
          <p class="casePs">*本统计以当年数据统计</p>
          <div class="caseMonthNum clearfix">
            <div> 日均标的额<span class="money">¥{{datainfo.dayAverage|money}}</span></div>
          </div>
        </div>
        <div class="fl caseRecordItem">
          <p class="caseText">仲裁费总额</p>
          <p class="caseNum">{{datainfo.arbitrateMoneyTotal|money}}</p>
          <div class="caseChartBox">
            <van-progress  pivot-text=""  color="#F5391B"  track-color="#1890FF" :percentage="(parseInt(datainfo.waitPaymentTotal)/(parseInt(datainfo.waitPaymentTotal)+parseInt(datainfo.paymentTotal)))?parseInt(datainfo.waitPaymentTotal)/(parseInt(datainfo.waitPaymentTotal)+parseInt(datainfo.paymentTotal))*100:0" stroke-width="16"/>
          </div>
          <p class="casePs">*本统计以当年数据统计</p>
          <div class="caseMonthNum clearfix">
            <div class="fl halfDiv"> 待缴<span class="money">¥{{datainfo.waitPaymentTotal|money}}</span></div>
            <div class="fl halfDiv">已缴 <span class="money">¥{{datainfo.paymentTotal|money}}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SvgLine from '@/components/SvgLine.vue'
// import { Progress } from 'vant'
import VanProgress from 'vant/lib/progress'
import 'vant/lib/progress/style'

import { api } from '@/utils/api'
export default {
  data () {
    return {
      datainfo: {
        closeCountProportion: '0', // 正常结案总数占比
        monthToYearProportion: '--', // 月同比
        chainRatioProportion: '--', // 周环比
        disputeMoneyTotal: 0, // 标的总额
        disputeMonthProportion: '--', // 标的总额月同比
        disputeRatioProportion: '--', // 标的总额周环比
        dayAverage: 0, // 日均标的额
        arbitrateMoneyTotal: '', // 仲裁费总额
        waitPaymentTotal: 0, // 待缴
        paymentTotal: 0 // 已缴
      },
      applyTotalCount: '',
      monthCount: '',
      listarr: []
    }
  },
  components: { SvgLine, VanProgress },
  methods: {
    getData () {
      api.mockRequest({ success: true, msg: '操作成功', code: '1', data: null, applyTotalCount: '165', monthCount: '165', list: [['1', '0'], ['2', '0'], ['3', '0'], ['4', '165'], ['5', '0'], ['6', '0'], ['7', '0'], ['8', '0'], ['9', '0'], ['10', '0'], ['11', '0'], ['12', '0']] }).then(res => {
        if (res.data.code === '1') {
          this.applyTotalCount = res.data.applyTotalCount
          this.monthCount = res.data.monthCount
          res.data.list.map(el => {
            this.listarr.push(+el[1])
            // var svgwid = document.querySelector('.svgwid')
            // if (svgwid) {
            // this.svgwidth = svgwid.clientWidth - 86
            // }
          })
        }
      })
      api.mockRequest({ success: true, msg: '操作成功', code: '1', data: null, closeCountProportion: '20.83%', monthToYearProportion: '--', chainRatioProportion: '-100.00%', disputeMoneyTotal: '326598.00', disputeMonthProportion: '--', disputeRatioProportion: '-100.00%', dayAverage: '2942.32', arbitrateMoneyTotal: '44852.50', waitPaymentTotal: '25202.50', paymentTotal: '19650.00' }).then(res => {
        this.loading = false
        if (res.data.code === '1') {
          this.datainfo = res.data
        }
      })
      // api.getArbTotalCountInfo().then(res => {
      //   if (res.data.code === '1') {
      //     this.applyTotalCount = res.data.applyTotalCount
      //     this.monthCount = res.data.monthCount
      //     res.data.list.map(el => {
      //       this.listarr.push(+el[1])
      //       // var svgwid = document.querySelector('.svgwid')
      //       // if (svgwid) {
      //       // this.svgwidth = svgwid.clientWidth - 86
      //       // }
      //     })
      //   }
      // })
      // api.getCloseCaseCount().then(res => {
      //   this.loading = false
      //   if (res.data.code === '1') {
      //     this.datainfo = res.data
      //   }
      // })
    },
    getAddorRe (val) {
      if (val === '--') {
        return 1
      } else if (val && val.indexOf('-') > -1) {
        return 2
      } else {
        return 3
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
    .caseRecordTitle
      font-size:12px;
      font-weight:400;
      line-height:18px;
      color:#AEAEAE;
      text-align:left;
      padding-bottom:7px;
    .caseRecord
      width:100%;
      overflow-x: scroll;
      overflow-y: hidden;
      .caseRecordBox
        width:365.4%;
        padding: 0 7px;
      .caseRecordItem
        width:325px;
        height:232px;
        background-color:#ffffff;
        margin:0 7px;
        padding:0 14px;
        .caseText
          font-size:12px;
          color:#9B9B9B;
          padding:24px 0 7px 0;
        .caseNum
          color:#4A4A4A;
          font-size:24px;
          font-weight:bold;
          padding-bottom:19px;
        .caseChartBox
          width:297px;
          height:53px;
          font-size:17px;
        .casePs
          color #AEAEAE
          text-align:left;
          font-size:12px;
          line-height:17px;
          margin:8px 0 8px;
        .caseMonthNum
          text-align:left;
          // padding:15px 0 15px;
          border-top:1px solid #EFEFEF;
          font-size:16px;
          color:#4A4A4A;
          line-height:48px;
          span.one
            font-size:18px;
            line-height:48px;
            margin-left:8px;
            position:relative;
            top:1px;
          span.money
            margin-left:12px;
        div.halfDiv
          width:50%;
          span.percent
            margin-left:3px;
          span.iconzhongcai_sanjiao-shang
            color:#52c41a
            margin-left:3px;
          span.iconzhongcai_sanjiao-xia
            color:#e73236
            margin-left:3px;
</style>
