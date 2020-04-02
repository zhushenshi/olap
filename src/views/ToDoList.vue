<template>
  <div class="wrapper">
    <header class="default" :class="{active:headerShow}">
        <div class="headerBox">
          <div class="title" :style="{'font-size':titleFonSize}">待办事项</div>
          <div class="avatar" @click="popPersonalCenter">
            <img src="./../assets/imgs/home/avatar.png" alt="">
          </div>
        </div>
        <div class="tabContent clearfix">
          <div class="tab fl" :class="type===0?'tabActive':''" @click="tabClick(0)">全部</div>
          <div class="tab fl" :class="type===1?'tabActive':''" @click="tabClick(1)">裁决书</div>
          <div class="tab fl" :class="type===2?'tabActive':''" @click="tabClick(2)">充值</div>
        </div>
    </header>
    <header class="default" style="opacity:0;" v-if="headerShow">
        <div class="headerBox">
          <div class="title">待办事项</div>
          <div class="avatar" @click="popPersonalCenter">
            <img src="./../assets/imgs/home/avatar.png" alt="">
          </div>
        </div>
        <div class="tabContent clearfix">
          <div class="tab fl" :class="type===0?'tabActive':''" @click="tabClick(0)">全部</div>
          <div class="tab fl" :class="type===1?'tabActive':''" @click="tabClick(1)">裁决书</div>
          <div class="tab fl" :class="type===2?'tabActive':''" @click="tabClick(2)">充值</div>
        </div>
    </header>
    <section>
      <div class="listContent" v-if="filterList.length">
        <pull-refresh v-model="refreshing" @refresh="onRefresh">
          <List v-model="loadMore" :finished="finished" finished-text="没有更多了" :offset=offset @load="onLoad">
           <div class="itemBox" v-for="(item,index) in filterList" :key="index">
             <div v-for="(value,ind) in item.yearData" :key="ind">
               <p class="topTime">{{item.year}}年{{value.month}}</p>
               <div v-for="(value1,index1) in value.monthData" :key="index1">
                 <div class="leftTop" v-if="value1">{{value1.day.replace(/\b(0+)/gi,"")}}</div>
                 <div v-for="(value2,index2) in value1.dataList" :key="index2">
                  <div class="item" v-if="type!=2 && value2.rechargeData ==null" @click="goToDetail(value2.arbitralData.id)">
                    <div class="left">
                      <div class="leftBottom" v-if="value2.arbitralData">{{value2.arbitralData.createTime | formathm}}</div>
                    </div>
                    <div class="right">
                      <div class="itemInfo">
                        <div class="itemInfoRow itemInfoTop">
                          <img src="./../assets/imgs/shenhe.png" alt="">
                          <span v-if="value2.arbitralData">{{value2.arbitralData.arbNumber || value2.arbitralData.arbTemporaryNumber}}</span>
                        </div>
                        <div class="itemInfoRow">
                          <span class="label">申请人：</span>
                          <span v-if="value2.arbitralData">{{value2.arbitralData.arbProsecutorName}}</span>
                        </div>
                        <div class="itemInfoRow">
                          <span class="label">申请时间：</span>
                          <span v-if="value2.arbitralData">{{value2.arbitralData.createTime}}</span>
                        </div>
                      </div>
                      <div class="operateBtn" >审核判决书</div>
                    </div>
                    </div>
                  <div class="item"  v-if="type!=1 && value2.arbitralData ==null" @click="goToRecharge(value2.rechargeData)">
                    <div class="left">
                      <!-- <div class="leftTop">{{value1.day}}</div> -->
                      <div class="leftBottom" v-if="value2.rechargeData">{{value2.rechargeData.createTime | formathm}}</div>
                    </div>
                    <div class="right">
                        <div class="itemInfo">
                        <div class="itemInfoRow itemInfoTop">
                          <img src="./../assets/imgs/shenhe.png" alt="">
                          <span v-if="value2.rechargeData">{{value2.rechargeData.applicant}}</span>
                        </div>
                         <!-- <div class="itemInfoRow">
                          <span class="label">案件编号：</span>
                           <span v-if="value2.rechargeData">{{value2.rechargeData.caseNumber}}</span>
                        </div> -->
                        <div class="itemInfoRow">
                          <span class="label">仲裁费：</span>
                          <span v-if="value2.rechargeData">{{value2.rechargeData.money}}元</span>
                        </div>
                      </div>
                      <div class="operateBtn operateBtnRecharge">单案充值审核</div>
                    </div>
                </div>
          </div>
          </div>
          </div>
          </div>
          </List>
        </pull-refresh>
      </div>
       <div class="noData" v-if="!filterList.length">
            <img src="./../assets/imgs/noData@2x.png" alt="">
            <p>无任何记录</p>
       </div>
    </section>
  </div>
</template>
<script>
import { api } from '@/utils/api'
import { PullRefresh, List } from 'vant'
import 'vant/lib/pull-refresh/style'
import 'vant/lib/list/style'
export default {
  data () {
    return {
      type: 0,
      filterList: [],
      pageNo: 1,
      pageSize: 10, // 每页多少条
      loadMore: false,
      finished: false,
      refreshing: false,
      offset: 100,
      headerShow: false,
      titleFonSize: '0.8rem'
    }
  },
  components: { PullRefresh, List },
  methods: {
    tabClick (val) {
      this.type = val
      this.pageNo = 1
      this.filterList = []
      this.getData()
    },
    onLoad () {
      this.pageNo++
      this.loadMore = true
      this.getData()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.refreshing = true
      this.pageNo = 1
      this.getData()
    },
    getData () {
      const params = Object.assign({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        type: this.type
      })
      this.$Indicator.open()
      api.getWorkList(params).then(res => {
        if (res.data.code === '1') {
          this.$Indicator.close()
          const list = res.data.list
          this.filterList = res.data.list
          if (this.filterList.length >= 40) {
            this.finished = true
          }
          if (this.loadMore) { // 上拉加载
            // this.filterList = this.filterList.concat(list) // 上拉加载新数据添加到数组中
            this.$nextTick(() => { // 在下次 DOM 更新循环结束之后执行延迟回调
              this.loadMore = false // 关闭上拉加载中
            })
            if (list.length < 10) { // 没有更多数据
              this.finished = true // 上拉加载完毕
            }
          }
          if (this.refreshing) { // 关闭下拉刷新
            this.refreshing = false // 关闭下拉刷新中
            this.filterList = list // 重新给数据赋值
            if (this.finished) { // 如果上拉加载完毕为true则设为false。解决上拉加载完毕后再下拉刷新就不会执行上拉加载问题
              this.finished = false
            }
          }
        } else {
          this.$Indicator.close()
          this.filterList = []
        }
      })
    },
    goToDetail (id) {
      this.$router.push({
        path: '/toDoList/auditArbitralDetail',
        query: { id: id }
      })
    },
    goToRecharge (value) {
      console.log(value)
      const rechargeData = JSON.stringify(value)
      this.$router.push({
        path: '/toDoList/rechargeDetail',
        query: { rechargeData: rechargeData }
      })
    },
    popPersonalCenter () {
      var ua = navigator.userAgent.toLowerCase()
      if (/iphone|ipad|ipod/.test(ua)) {
        if (window.webkit && window.webkit.messageHandlers) {
          window.webkit.messageHandlers.popPersonalCenter.postMessage([''])
        } else {}
      } else if (/android/.test(ua)) {
        if (window.object && typeof (window.object.popPersonalCenter) === 'function') {
          window.object.popPersonalCenter()
        }
      }
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    const This = this
    window.onscroll = function () {
      var topHeight = document.documentElement.scrollTop || document.body.scrollTop// 滚动条y轴上的距离
      if (topHeight > 53) {
        This.titleFonSize = 0.48 + 'rem'
        This.headerShow = true
      } else {
        This.headerShow = false
        This.titleFonSize = 0.8 + 'rem'
      }
    }
  },
  destroyed () {
    window.onscroll = null
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  color:#4A4A4A;
  transition: all 2s;
  header.default
    .headerBox
      background:linear-gradient(135deg,rgba(0,108,255,0.81) 0%,rgba(0,72,157,1) 100%);
      text-align:center;
      padding:66px 14px 9px 20px;
      display:flex;
      text-align:left;
      justify-content:space-between;
      .title
        font-size:30px;
        line-height:42px;
        height:42px;
        font-weight:500;
        color:#ffffff;
        transition:all liner 2s
      .avatar
        height:37px;
        width:37px;
        position relative
        top:2px;
  header.active
    position:fixed;
    left:0;
    right:0;
    z-index:1000;
    background-color:#f0f0f0;
    .headerBox
      background:linear-gradient(135deg,rgba(0,108,255,0.81) 0%,rgba(0,72,157,1) 100%);
      text-align:center;
      padding:20px 0 0 0;
      text-align:center;
      .title
        font-size:18px;
        line-height:42px;
        height:42px;
        color:#ffffff;
        margin:auto;
      .avatar
        display:none
  .tabContent
    width:347px
    margin:12px auto 14px;
    .tab
      width:33.33%;
      font-size:15px;
      line-height:40px;
      background:#FFFFFF
      color:#1890FF;
    :first-child
      border-right :1pt solid #F5F5F5;
      border-radius:4px 0px 0px 4px;
    :last-child
      border-left :1pt solid #F5F5F5;
      border-radius:0px 4px 4px 0px;
    .tabActive
      background:#1890FF;
      color:#FFFFFF;
  section
    .listContent
      .itemBox
        min-height:484px;
        padding:0 13px 0 11px
        .topTime
          line-height:20px;
          margin-bottom:7px;
        .item
          display:flex;
          position:relative;
          margin-bottom:14px;
          .left
            text-align:left
            flex:42;
            font-size:24px
            .leftBottom
              color:#9B9B9B;
              font-size:12px;
              margin-left:3px;
              position:absolute;
              bottom:2px;
          .right
            background-color:#FFFFFF;
            flex:309;
            display:flex;
            justify-content:space-between;
            .itemInfo
              width:253px;
              padding:18px 0 14px 14px;
              text-align:left;
              .itemInfoRow
                height:21px;
                line-height:21px;
                font-size:15px;
                color:#000000;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                .label
                  color:#9B9B9B;
              :nth-child(2)
                margin:12px 0 9px;
              .itemInfoTop
                font-weight:600;
                font-size:17px;
                height:24px;
                line-height:24px;
                img
                  width:24px;
                  vertical-align:middle;
                  margin-right:12px;
            .operateBtn
              width:36px;
              color:#FFFFFF;
              border-radius:0px 4px 4px 0px;
              padding:14px 8px 13px;
              text-align:center;
              background:#41A3FC;
            .operateBtnExamine
              background:#41A3FC;
            .operateBtnRecharge
              background:#22D3B0;
            .operateBtnRechargeSingle
              background:#6ED582;
    .noData
      min-height:484px;
      color:#BCBCBC;
      line-height:20px;
      padding-top:78px;
      img
        width:128px;
        margin-bottom:8px;
.leftTop{
 font-size:24px
 position absolute
}
</style>
