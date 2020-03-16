<template>
  <div class="wrapper">
    <Header :back="back" right="审核" :rightMethod='back'>审核裁决书</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">编号：(2018)北国仲字第1号</div>
        <div class="arbInfo">
          <span class="label">案由：</span>
          <span>经济纠纷</span>
        </div>
        <div class="arbInfo">
          <span class="label">申请人：</span>
          <span>上海指旺信息科技有限公司</span>
        </div>
        <div class="arbInfo">
          <span class="label">被申请人：</span>
          <span @click="toastTex">多多、上海指旺信息科技有限公司、合肥小指信息科技有限公司</span>
        </div>
        <div class="arbInfo">
          <span class="label">申请日期：</span>
          <span>2020.02.02 12:00:00</span>
        </div>
        <div class="caseStatus">
          待审核
        </div>
      </div>
    </section>
    <section class="caseDetail">
      <ul class="inline-ul">
        <li :class="{'active':item.value === type}" v-for="(item,index) in types" :key="index" @click="tabClick(item.value)">
          <p>{{item.text}}</p>
        </li>
      </ul>
      <div class="caseDetailsContent" v-if="type===0">
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
        内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
      </div>
      <div class="caseDetailsContent caseDetailsContent2" v-if="type!==0">
        <div class="selectBox">
          <div class="item active">
            <div class="title">申请人证据资料</div>
            <div><span>证据1：</span><span class="text">借款协议</span></div>
            <div>证据内容：：</div>
            <div class="text wrap">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </div>
            <span class="icon iconfont icon-xiangxia triangle"></span>
          </div>
          <div class="item">
            <div class="title">申请人证据资料</div>
            <div><span>证据1：</span><span class="text">借款协议借款协议借款协议借款协议借款协议借款协议借款协议</span></div>
            <div>证据内容：</div>
            <div class="text wrap">内容内容内容内容内容内容内容内容
            </div>
            <span class="icon iconfont icon-xiangxia triangle"></span>
          </div>
          <div class="item">
            <div class="title">申请人证据资料</div>
            <div><span>证据1：</span><span class="text">借款协议借款协议借款协议借款协议借款协议借款协议借款协议</span></div>
            <div>证据内容：</div>
            <div class="text wrap">内容内容内容内容内容内容内容内容
            </div>
            <span class="icon iconfont icon-xiangxia triangle"></span>
          </div>
        </div>
        <div class="selectContent">
          <div class="imgBox">
            <img src="./../assets/imgs/fapiao.png" alt="">
          </div>
          <div class="imgBox">
            <img src="./../assets/imgs/fapiao.png" alt="">
          </div>
          <div class="imgBox">
            <img src="./../assets/imgs/fapiao.png" alt="">
          </div>
          <div class="imgBox">
            <img src="./../assets/imgs/fapiao.png" alt="">
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  data () {
    return {
      types: [
        {
          text: '裁决书内容',
          value: 0
        },
        {
          text: '证件资料',
          value: 1
        }
      ],
      type: 0
    }
  },
  components: { Header },
  methods: {
    back () {
      console.log('传入的back')
    },
    tabClick (val) {
      this.type = val
    },
    toastTex (e) {
      console.log(e.target.innerHTML)
      console.log(e.target.offsetWidth)
      // console.log(e.target.scrollWidth)
      console.log(e.target.previousSibling.offsetWidth)
      console.log(e.target.parentNode.offsetWidth)
      if ((e.target.offsetWidth + e.target.previousSibling.offsetWidth) > e.target.parentNode.offsetWidth) {
        this.$Toast({ message: e.target.innerHTML, position: 'middle' })
      }
      // div.scrollHeight==div.offsetHeight
    }
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
@import "../stylus/caseBaseInfo.styl";
.wrapper
  .caseDetail
    text-align:left;
    padding:14px 0 0 0;
    color:#727272;
    .inline-ul
      li
        text-align:center;
        margin: 0 15px;
      li.active
        color:#000000;
        font-weight:500;
      li:after
        height: 3px;
        width:23px;
  .caseDetailsContent
    background-color:#FFFFFF;
    padding:24px 30px 9px;
    color:#727272;
    line-height:24px;
    margin-top:7px;
  .caseDetailsContent2
    padding:16px 0 0;
    .selectBox
      white-space: nowrap;
      overflow: auto;
      .item
        width:303px;
        display:inline-block;
        margin:0 7px;
        margin-bottom:18px
        background:#FFFFFF;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity:1;
        border-radius:5px;
        font-size:15px;
        color:#9B9B9B
        padding:8px 16px 9px 16px;
        line-height:22px;
        position: relative;
        >div
          margin:8px 0;
          overflow: hidden;
          text-overflow:ellipsis;
        .title
          font-size:16px
          margin-bottom:14px;
        .text
          color:#000000;
        .wrap
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          min-height:44px;
        .triangle
          opacity:0;
          position:absolute;
          color:#0084FF;
          left:0;
          right:0;
          bottom:-12px;
          margin:auto;
          font-size:36px;
          text-align:center;
      .active
        background:#0084FF;
        color:#FFFFFF
        .text
          color:#C6E4FF;
        .triangle
          opacity:1;
          position:absolute;
          color:#0084FF;
          left:0;
          right:0;
          bottom:-12px;
          margin:auto;
          font-size:36px;
          text-align:center;
    .selectContent
      padding:14px;
      .imgBox
        padding:14px;
        img
          width:100%;
</style>
