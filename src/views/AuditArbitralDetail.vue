<template>
  <div class="wrapper">
    <Header :back="back" right="审核" :rightMethod='back'>审核裁决书</Header>
    <section class="casseBaseInfo">
      <div class="casseBaseInfoBox">
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
      <div class="caseDetailsContent caseDetailsContent2">
        <div class="selectBox">
          <div class="item">
            <div class="title">申请人证据资料申请人证据资料申请人证据资料申请人证据资料申请人证据资料</div>
            <div><span>证据1：</span><span class="text">借款协议借款协议借款协议借款协议借款协议借款协议借款协议</span></div>
            <div>证据内容：证据内容：证据内容：证据内容：证据内容：证据内容：</div>
            <div class="text wrap">内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内
              容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容
            </div>
          </div>
          <div class="item">
            5
          </div>
          <div class="item">
            5
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
      console.log(e.target)
      console.log(e.target.offsetWidth)
      console.log(e.target.scrollHeight)
      // div.scrollHeight==div.offsetHeight
    }
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  section.casseBaseInfo
    padding:14px 0 0 0;
    background-color:#FFFFFF;
    text-align:left
    .casseBaseInfoBox
      padding:0 25px 20px 20px;
      position:relative;
      overflow:hidden;
      .arbNumber
        font-size:20px;
        font-weight:500;
        line-height:28px;
        color:#1890FF;
        padding-bottom:5px;
      .arbInfo
        font-size:15px;
        font-weight:400;
        line-height:21px;
        color:#000000;
        margin-top:10px;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        .label
          color:#9B9B9B;
          margin:10px 0 0 3px;
      .caseStatus
        position:absolute;
        right:-45px;
        top:10px;
        background-color:#A5D2FF;
        color:#FFFFFF;
        padding:5px;
        transform:rotate(45deg);
        width:136px;
        text-align:center;
        font-size:15px;
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
    padding:16px 0 10px;
    .selectBox
      white-space: nowrap;
      overflow: auto;
      .item
        width:303px;
        background-color:blue;
        display:inline-block;
        margin:0 7px;
        // height:173px;
        background:#0084FF;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity:1;
        border-radius:5px;
        font-size:15px;
        color:#FFFFFF
        padding:16px 16px 8px 16px;
        line-height:24px;
        >div
          margin:8px 0;
          overflow: hidden;
          text-overflow:ellipsis;
        .title
          font-size:16px
          margin-bottom:14px;
        .text
          color:#C6E4FF;
        .wrap
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;

</style>
