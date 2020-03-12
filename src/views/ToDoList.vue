<template>
  <div class="wrapper">
    <header>
        <div class="headerBox">
          <div class="title">待办事项</div>
          <div class="avatar">
            <img src="./../assets/imgs/home/avatar.png" alt="">
          </div>
        </div>
    </header>
    <section>
      <div class="tabContent clearfix">
        <div class="tab fl" :class="type==='one'?'tabActive':''" @click="tabClick('one')">全部</div>
        <div class="tab fl" :class="type==='two'?'tabActive':''" @click="tabClick('two')">裁决书</div>
        <div class="tab fl" :class="type==='three'?'tabActive':''" @click="tabClick('three')">充值</div>
      </div>
      <div class="listContent">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <div class="itemBox" v-if="type==='one'">
            <p class="topTime">2019年12月</p>
            <div class="item">
              <div class="left">
                <div class="leftTop">12</div>
                <div class="leftBottom">12:00</div>
              </div>
              <div class="right">
                <div class="itemInfo">
                  <div class="itemInfoRow itemInfoTop">
                    <img src="./../assets/imgs/shenhe.png" alt="">
                    <span>(2018)北国仲字第1号北国仲字第1号北国仲字第1号</span>
                  </div>
                  <div class="itemInfoRow">
                    <span class="label">申请人：</span>
                    <span>上海指旺信息科技有限公司</span>
                  </div>
                  <div class="itemInfoRow">
                    <span class="label">申请时间：</span>
                    <span>2020.02.02 12:00:00</span>
                  </div>
                </div>
                <div class="operateBtn">审核判决书</div>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <div class="leftTop">12</div>
                <div class="leftBottom">12:00</div>
              </div>
              <div class="right">
                <div class="itemInfo">
                  <div class="itemInfoRow itemInfoTop">
                    <img src="./../assets/imgs/shenhe.png" alt="">
                    <span>(2018)北国仲字第1号北国仲字第1号北国仲字第1号</span>
                  </div>
                  <div class="itemInfoRow">
                    <span class="label">批量编号：</span>
                    <span>PL2795910109</span>
                  </div>
                  <div class="itemInfoRow">
                    <span class="label">仲裁费：</span>
                    <span>234.00元</span>
                  </div>
                </div>
                <div class="operateBtn operateBtnRecharge">审核判决书</div>
              </div>
            </div>
            <div class="item">
              <div class="left">
                <div class="leftTop">12</div>
                <div class="leftBottom">12:00</div>
              </div>
              <div class="right">
                <div class="itemInfo">
                  <div class="itemInfoRow itemInfoTop">
                    <img src="./../assets/imgs/shenhe.png" alt="">
                    <span>上海指旺信息科技有限公司</span>
                  </div>
                  <div class="itemInfoRow">
                    <span class="label">案件编号：</span>
                    <span>(2018)北国仲字第1号</span>
                  </div>
                  <div class="itemInfoRow">
                    <span class="label">仲裁费：</span>
                    <span>234.00元</span>
                  </div>
                </div>
                <div class="operateBtn operateBtnRechargeSingle">审核判决书</div>
              </div>
            </div>
          </div>
          <div class="noData" v-if="type!=='one'">
            <img src="./../assets/imgs/noData@2x.png" alt="">
            <p>无任何记录</p>
          </div>
        </van-pull-refresh>
      </div>
      <!-- <div class="listContent">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        </van-pull-refresh>
      </div> -->
    </section>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isLoading: '',
      type: 'one'
    }
  },
  methods: {
    tabClick (val) {
      this.type = val
    },
    onRefresh () {
      this.isLoading = false
    }
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  color:#4A4A4A;
  header
    background:linear-gradient(135deg,rgba(0,108,255,0.81) 0%,rgba(0,72,157,1) 100%);
    text-align:center;
    padding:66px 14px 9px 20px;
    .headerBox
      display:flex;
      text-align:left;
      justify-content:space-between;
      .title
        font-size:30px;
        line-height:42px;
        height:42px;
        font-weight:500;
        color:#ffffff;
      .avatar
        height:37px;
        width:37px;
        position relative
        top:2px;
  section
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
</style>
