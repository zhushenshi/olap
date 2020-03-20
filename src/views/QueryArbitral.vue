<template>
  <div class="wrapper">
    <div class="queryArbitral">
      <p>
        <span class="caseTitle">案件查询</span>
        <span class="searchIcon" @click="goIntoPage('/queryArbitral/search')">
            <img src="./../assets/imgs/search.png"/>
        </span>
      </p>
    </div>
    <div class="caseStatus">
      <ul>
        <li v-for="item in arbTypes" :key="item.value"  @click="tabFilter(item.value)">
            <span :class="{'activeClass': activeName == item.value}">{{item.label}}</span>
        </li>
      </ul>
    </div>
    <div v-if="filterList.length">
    <div class="tabFilter">
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
              <span class="arbProsecutorName">{{item.arbProsecutorName}}</span>
            </p>
            <p>
              <span class="filterTitle">标的额：</span>
            {{item.arbDisputeMoney | money}}元
            </p>
            <p>
              <span class="filterTitle">申请日期：</span>
            {{item.createTime}}
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
                <!-- <div class="otherStatus">
                  <span class="recall">异议</span>
                </div> -->
             </div>
          </div>
        </li>
      </ul>
    </div>
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
      pageSize: 99999999, // 每页多少条
      formInline: {}
    }
  },
  methods: {
    intoDetail (item) {
      console.log(item)
      this.$router.push({
        path: '/caseDetails',
        query: { id: item.id }
      })
    },
    tabFilter (val) {
      this.activeName = val
      this.search()
    },
    fllter (val) {
      this.sortName = val
      this.getAllArbitralInfos()
    },
    fllters (val) {
      this.caseName = val
      this.getAllArbitralInfos()
    },
    search () { // 表单查询（搜索案件编号、案件名、申请人、被申请人。搜索字符长度不超过20个）
      this.pageNo = 1
      this.getAllArbitralInfos()
    },
    goIntoPage (url) {
      this.$router.push(url)
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
      api.getAllArbitralInfos(params).then(res => {
        // this.loading = false
        if (res.data.code === '1') {
          const tableData = res.data.list
          tableData.forEach(v => {
            v.code = v.arbNumber || v.arbTemporaryNumber
            v.status = util.getStatus(v.arbStatus)
          })
          this.filterList = tableData
        } else {
          this.filterList = []
        }
      })
    }
  },
  mounted () {
    this.activeName = 0
  },
  created () {
    if (this.$route.params.form) {
      this.formInline = this.$route.params.form
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
   .caseTitle
      font-size 30px
      color #ffffff
      text-align left
      padding-left 20px
      font-weight 500
      float left
    .searchIcon
      width 16px
      font-size 16px
      float right
      margin-right 20px
      i
        font-size 50px
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
     display flex
     li
      flex 1
      margin 0 8px
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
            border 1px solid #C5E3FF
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
.arbProsecutorName
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
  display inline-block
  width 60%
  position relative
  top 5px
.noData
  color #727272
  font-size 14px
  margin-top 80px
.filterRs
  margin 0 auto
  position relative
  top 50%
  transform: translateY(-50%)
</style>
