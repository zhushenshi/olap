<template>
<div class="tabItem">
      <div class="jurisdictItem">
          <h3>基本信息</h3>
          <div class="info">
            <div class="infoLeft">
              <p>异议申请时间</p>
              <p class="infoDetail">{{arbiInfo.decisionCreateTime}}</p>
            </div>
            <span class="infoLine"></span>
            <div class="infoRight">
              <p>异议申请流程</p>
              <p class="infoDetail">立案</p>
            </div>
        </div>
          <div class="info">
            <div class="infoLeft">
              <p>异议申请人</p>
              <p class="infoDetail">{{arbiInfo.decisionProsecutorName}}</p>
            </div>
            <span class="infoLine"></span>
            <div class="infoRight">
            </div>
        </div>
      </div>
       <div class="jurisdictItem">
          <h3>被申请人异议资料</h3>
          <div style=";padding:13px 0;">
            <p class="titleInfo">异议申请书</p>
            <span class="icon iconfont icon-pdf"></span>
            <span class="fileName">仲裁申请书.pdf</span>
          </div>
          <p class="titleInfo">证据资料</p>
         <div class="grayBg">
            <p class="bold black"> 证据一（ZQ1)</p>
            <p class="" style="margin:7px 0 16px 0;">订单编号：MJZH201909241873148780</p>
            <p class="borderBottom"></p>
            <p style="padding:14px 0 0 0;">证据标题：</p>
            <p class="black" style="margin-top:2px;">这里是标题标题标题这里是标题标题标题</p>
            <p style="margin-top:16px;">证明内容：</p>
            <p class="black" style="margin-top:2px;">这里是内容内容</p>
            <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
            <div style="background-color:#FFFFFF;padding:14px;">
              <div>
                <span class="icon iconfont icon-pdf"></span>
                <span class="fileName">仲裁申请书.pdf</span>
              </div>
              <div style="margin-top:12px;">
                <span class="icon iconfont icon-pdf"></span>
                <span class="fileName">仲裁申请书.pdf</span>
              </div>
            </div>
        </div>
         <p class="titleInfo">事实和理由</p>
         <div class="reason">事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容</div>
       </div>
       <div class="jurisdictItem">
         <h3>申请人答辩料</h3>
          <div style=";padding:13px 0;">
            <p class="titleInfo">答辩书</p>
            <span class="icon iconfont icon-pdf"></span>
            <span class="fileName">仲裁申请书.pdf</span>
         </div>
           <p class="titleInfo">证据资料</p>
           <div class="grayBg">
              <p class="bold black"> 证据一（ZQ1)</p>
              <p class="" style="margin:7px 0 16px 0;">订单编号：MJZH201909241873148780</p>
              <p class="borderBottom"></p>
              <p style="padding:14px 0 0 0;">证据标题：</p>
              <p class="black" style="margin-top:2px;">这里是标题标题标题这里是标题标题标题</p>
              <p style="margin-top:16px;">证明内容：</p>
              <p class="black" style="margin-top:2px;">这里是内容内容</p>
              <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
              <div style="background-color:#FFFFFF;padding:14px;">
                <div>
                  <span class="icon iconfont icon-pdf"></span>
                  <span class="fileName">仲裁申请书.pdf</span>
                </div>
                <div style="margin-top:12px;">
                  <span class="icon iconfont icon-pdf"></span>
                  <span class="fileName">仲裁申请书.pdf</span>
                </div>
              </div>
            </div>
         <p class="titleInfo">答辩及质证意见</p>
         <div class="reason">事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容事实和理由内容</div>
       </div>
      </div>
</div>
</template>
<script>
export default {
  name: 'ApplyInfo',
  data () {
    return {
      arbiInfo: {}
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabItem
  padding:17px 15px 14px 14px;
  h3
    font-size:15px;
    font-weight:bold;
    color:#000;
    line-height:21px;
  h3:before
    content: "";
    display inline-block
    width:4px;
    height:16px;
    background-color:#1890FF;
    border-radius:1px;
    vertical-align:text-top;
    margin-right:8px;
  .borderBottom
    border-bottom:1pt solid #F0F0F0
  .icon
    font-size:20px;
  .fileName
    margin-left:8px;
    color:#000000;
  .grayBg
    background-color:#F6F7F9;
    padding:15px 15px 14px 16px;
    margin:14px 0;
  .bold
    font-weight:bold;
  .black
    color:#000000;
  .flexInfoBox
    display:flex;
    position:relative;
    box-sizing:border-box;
    justify-content:space-between;
    margin-top:16px;
    .infoItem
      width:47%;
    .infoLine
      border-right:1px solid #F0F0F0;
      height:65%;
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      margin:auto;
      width:1px;
    .mt2
      margin-top:2px;
  .certificates
    img
      width 79px;
      margin-top:6px;
      margin-right:9px;
    img:nth-child(4)
      margin-right:0;
  /deep/.van-cell
    padding:0;
  /deep/.van-collapse-item__content
    font-size: 15px;
    padding:0;
    line-height:21px;
.jurisdictItem
  margin 9px 0
.info
  display flex
  margin 13px 0
  div
    flex 1
    .infoDetail
      color #333333
  .infoLine
    width 1px
    height 30px
    background #F0F0F0
    display inline-block
    position relative
    top 5px
  .infoRight
    padding-left 9px
  .infoLeft p,.infoRight p
    margin-bottom 5px
.titleInfo
  color #9B9B9B
  font-size 15px
  margin-bottom 2px
.reason
  color #000000
  font-size 15px
  line-height 22px
</style>
