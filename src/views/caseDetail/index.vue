<template>
  <div class="wrapper">
    <Header>案件详情</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">编号：(2018)北国仲字第1号</div>
        <div class="arbInfo">
          <span class="label">申请人：</span>
          <span>上海指旺信息科技有限公司</span>
        </div>
        <div class="arbInfo">
          <span class="label">案件状态：</span>
          <span class="arbStatus">已申请-管辖权异议</span>
        </div>
        <div class="caseBaseInfoTable">
          <div class="caseBaseInfoItem">
            <span class="label">案由</span>
            <br>
            <span class="text">经济纠纷经济纠纷经济纠纷经济纠纷</span>
          </div>
          <div class="caseBaseInfoItem">
            <span class="label">申请日期</span>
            <br>
            <span class="text">2020.02.18 12:00:00</span>
          </div>
          <div class="caseBaseInfoItem">
            <span class="label">案由案由案由案由案由案由案由案由</span>
            <br>
            <span class="text">经济纠纷经济纠纷经济纠纷经济纠纷经济纠纷</span>
          </div>
        </div>
      </div>
    </section>
    <section class="caseDetail">
      <van-tabs :border="false" :ellipsis="false">
        <van-tab title="申请信息">
          <apply-info></apply-info>
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

export default {
  name: 'CaseDetail',
  data () {
    return {
      id: ''
    }
  },
  components: { Header, applyInfo, caseTracking, jurisdiction },
  methods: {
    getData () {
      api.getArbitralInfoDetail({ arbitralId: this.id }).then(res => {
        if (res.data.code === '1') {
          console.log(res)
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
            height:21px;
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
