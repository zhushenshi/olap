<template>
  <div>
    <div class="caseData content">
      <div class="caseDataTitle">案件数统计</div>
      <ul class="inline-ul">
        <li :class="{'active':item.value === type}" v-for="(item,index) in timeTypes" :key="index" @click="choseType(item.value)">
          <p>{{item.name}}</p>
        </li>
      </ul>
      <div id="casebartotal" style="height:250px;">
      </div>
      <div class="caseOrderTitle clearfix">
        <span>案件数排名</span>
      </div>
      <ul class="inline-ul">
        <li :class="{'active':item.value === orderType}" v-for="(item,index) in orderTypes" :key="index" @click="choseOrderType(item.value)">
          <p>{{item.label}}</p>
        </li>
      </ul>
      <ul class="caseOrderUl">
        <li class="clearfix" v-for="(item,index) in arbarr" :key="index">
          <span class="caseOrderNum fl">{{index+1}}</span>
          <span class="fl caseOrderName">{{item.name}}</span>
          <span class="fr">{{item.arbCount}}件</span>
        </li>
      </ul>
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
      orderTypes: [{ label: '案由', value: 1 }, { label: '秘书', value: 2 }, { label: '企业', value: 3 }, { label: '仲裁员', value: 4 }],
      type: 3, // 时间类别
      orderType: 1,
      arbarr: [] // 案件数组
    }
  },
  methods: {
    getechartsdata (val) {
      var myChart = echarts.init(document.getElementById('casebartotal'))
      var xAxisdata = val.map(el => el[0]) // 返回x轴日期
      var paymentTotal = val.map(el => el[1])// 返回案件数
      var _this = this
      console.log(12)
      var option = {
        color: ['#1890ff'],
        tooltip: {
          formatter: function (data) {
            var dates = ''; var dated = new Date()
            // eslint-disable-next-line
            if (_this.type == 1) {
              dates = dated.getFullYear() + '-' + (data.name >= 10 ? data.name : '0' + data.name)
              // eslint-disable-next-line
            } else if (_this.type == 2) {
              dates = dated.getFullYear() + '-' + (dated.getMonth() + 1) + '-' + (data.name >= 10 ? data.name : '0' + data.name)
            } else {
              dates = data.name
            }
            return dates + '<br />' + '案件数:' + data.value
          },
          extraCssText: 'color:#000000;background:#FFFFFF;box-shadow:0px 3px 6px rgba(0,0,0,0.16);opacity:0.95;border-radius:5px;font-size:10px;'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisdata,
            axisTick: {
              alignWithLabel: true
            },
            axisLine: { // x轴样式
              show: true,
              lineStyle: {
                color: '#999',
                width: 1,
                type: 'solid'
              }
            }
          }
        ],
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
            name: '案件数: ',
            type: 'bar',
            barWidth: '11',
            data: paymentTotal
          }
        ]
      }
      myChart.setOption(option)
    },
    getArbIndexRanking () {
      api.getArbIndexRanking({ type: this.type, orderType: this.orderType }).then(res => {
        if (res.data.code === '1') {
          this.arbarr = res.data.list
          this.arbarr.map(el => {
            if (el.name.length > 14) {
              el.name = el.name.substr(0, 14)
            }
          })
        }
      })
    },
    choseType (val) { // 选择时间类型 周月 年
      this.type = val
      this.getArbIndexRanking()
      this.getUserIndexHistogram()
    },
    choseOrderType (val) { // 选择排序类型
      this.orderType = val
      this.getArbIndexRanking()
    },
    getUserIndexHistogram () {
      api.getUserIndexHistogram({ type: this.type }).then(res => {
        if (res.data.code === '1') {
          this.getechartsdata(res.data.data)
        }
      })
    }
  },
  created () {
    this.getArbIndexRanking()
    this.getUserIndexHistogram()
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
  .caseOrderTitle
    span
      text-align:left;
      background-color:#1890FF;
      height:24px;
      line-height:24px;
      float:left;
      display inline
      padding:0 18px 0 12px;
      border-top-right-radius:24px;
      border-bottom-right-radius:24px;
      color:#ffffff;
      margin:20px 0 22px;
  .caseOrderUl
    padding:4px 20px 24px 15px;
    color:#4A4A4A;
    li
      margin-top:18px
      line-height:20px;
      span.caseOrderNum
        width:18px;
        height:18px;
        background:#F0F2F5;
        border-radius:50%;
        display:inline-block;
        color:#314659;
        margin-right:9px;
      span.caseOrderName
        max-width:217px;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    li:nth-child(2)
      span.caseOrderNum
        background:#FFB100;
        color:#ffffff;
    li:nth-child(3)
      span.caseOrderNum
        background:#9FBDD5;
        color:#ffffff;
    li:nth-child(1)
      span.caseOrderNum
        background:#D6A99B;
        color:#ffffff;
</style>
