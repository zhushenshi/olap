<template>
  <div>
    <div class="caseData content">
      <div class="caseDataTitle">案件缴费统计</div>
      <ul class="inline-ul">
        <li :class="{'active':item.value === type}" v-for="(item,index) in timeTypes" :key="index" @click="choseType(item.value,item.name)">
          <p>{{item.name}}</p>
        </li>
      </ul>
      <div class="caseMoney">
        <div class="clearfix">
          <div class="fl half caseMoneyLabel">{{name}}缴费总额(元)</div>
          <div class="fr half caseMoneyLabel">{{name}}待缴总额(元)</div>
        </div>
        <div class="clearfix">
          <div class="fl half caseMoneyNum">{{paymentTotal|money}}</div>
          <div class="fl half caseMoneyNum">{{waitPaymentTotal|money}}</div>
        </div>
          <div id="echartspay" style="width:100%;height:247px;">

          </div>
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { api } from '@/utils/api'
export default {
  data () {
    return {
      timeTypes: [{ name: '本周', value: 3 }, { name: '本月', value: 2 }, { name: '本年', value: 1 }], // 初始化 案件数据统计筛选条件,
      type: 3,
      name: '本周',
      paymentTotal: 0, // 缴费总额
      waitPaymentTotal: 0// 待缴总额
    }
  },
  methods: {
    getmoneyechartsdata (val) {
      var myChart = echarts.init(document.getElementById('echartspay'))

      var xAxisdata = val.map(el => el[0]); var // 返回x轴日期
        paymentTotal = val.map(el => el[1]); var // 返回总缴费
        waitPaymentTotal = val.map(el => el[2])// 返回代缴

      var _this = this

      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: '' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (data) {
            console.log(data)
            var dates = ''; var dated = new Date()
            // eslint-disable-next-line
            if (_this.type == 1) {
              dates = dated.getFullYear() + '-' + (data[0].name >= 10 ? data[0].name : '0' + data[0].name)
              // eslint-disable-next-line
            } else if (_this.type == 2) {
              dates = dated.getFullYear() + '-' + (dated.getMonth() + 1) + '-' + (data[0].name >= 10 ? data[0].name : '0' + data[0].name)
            } else {
              dates = data[0].name
            }
            return dates + '<br />' + data[0].marker + '缴费: ' + data[0].value + '元' + '<br />' + data[1].marker + '待缴: ' + data[1].value + '元'
          },
          extraCssText: 'color:#000000;background:#FFFFFF;box-shadow:0px 3px 6px rgba(0,0,0,0.16);opacity:0.95;border-radius:5px;'
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: xAxisdata,
          axisLine: { // x轴样式
            show: true,
            lineStyle: {
              color: '#999',
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          // type: 'value',
          minInterval: 1,
          axisLine: { // y轴样式
            show: true,
            lineStyle: {
              color: 'rgba(0,0,0,0.65)',
              width: 0,
              type: 'dashed'
            }
          },
          axisTick: {
            interval: 0,
            show: false
          },
          splitLine: { // 格线样式
            show: true,
            lineStyle: {
              color: '#E8E8E8',
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '缴费总额',
            symbol: 'none',
            type: 'line',
            stack: '总量',
            data: paymentTotal

          },
          {
            name: '待缴费总额',
            symbol: 'none',
            type: 'line',
            stack: '总量2',
            data: waitPaymentTotal
          }
        ],
        color: ['#5bacfd', '#7ED321']

      }
      myChart.setOption(option)
    },
    choseType (val, name) { // 选择时间类型 周月 年
      this.type = val
      this.name = name
      this.getData()
    },
    getData () {
      api.mockRequest({ success: true, msg: '操作成功', code: '1', data: [['星期一', '300.00', '2100.00', '2020-04-13'], ['星期二', '300.00', '0.00', '2020-04-14'], ['星期三', '0.00', '3600.00', '2020-04-15'], ['星期四', '2400.00', '9300.00', '2020-04-16'], ['星期五', '0', '0', '--'], ['星期六', '0', '0', '--'], ['星期日', '0', '0', '--']], paymentTotal: '3000.00', waitPaymentTotal: '15000.00' }).then(res => {
        if (res.data.code === '1') {
          this.getmoneyechartsdata(res.data.data)
          this.waitPaymentTotal = res.data.waitPaymentTotal
          this.paymentTotal = res.data.paymentTotal
        }
      })
      // api.getPaymentStatistics({ type: this.type }).then(res => {
      //   if (res.data.code === '1') {
      //     this.getmoneyechartsdata(res.data.data)
      //     this.waitPaymentTotal = res.data.waitPaymentTotal
      //     this.paymentTotal = res.data.paymentTotal
      //   }
      // })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
.caseData
  margin-top:14px;
  border-radius:5px;
  background-color:#FFFFFF;
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  padding-top:21px;
  .caseDataTitle
    height:25px;
    font-size:18px;
    line-height:25px;
    color:#4A4A4A;
    margin-bottom:16px;
  .caseDataPieTitle
    height:25px;
    font-size:18px;
    line-height:25px;
    color:#4A4A4A;
  .caseMoney
    margin-top:18px;
    .caseMoneyNum
      height:20px;
      font-size:20px;
      font-weight:bold;
      line-height:24px;
      color:#42505C;
      margin-top:14px;
    .caseMoneyLabel
      height:20px;
      font-size:14px;
      font-weight:400;
      line-height:20px;
      color:#9B9B9B;
</style>
