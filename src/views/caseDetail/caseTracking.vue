<template>
<div class="tabItem">
  <div class="itemBox" v-if="type==='one'">
    <p class="topTime">2019年12月</p>
    <div class="item">
      <div class="left">
        <div class="leftTop">12</div>
        <div class="leftBottom">12:00</div>
      </div>
      <div class="right">
        <p>第十一步</p>
        <p class="text">爱丽丝</p>
      </div>
    </div>
    <div class="item">
      <div class="left">
        <div class="leftTop">12</div>
        <div class="leftBottom">12:00</div>
      </div>
      <div class="right">
        <p>第十一步</p>
        <p class="text">爱丽丝</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'CaseTracking',
  data () {
    return {
      type: 'one'
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabItem
  padding:17px 14px 14px 12px;
  font-size:14px;
  color:#24272B;
  .topTime
    line-height:20px;
    margin-bottom:16px;
    text-align:center;
  .item
    display:flex;
    position:relative;
    margin-bottom:16px;
    min-height:70px;
    .left
      text-align:left
      flex:44;
      font-size:16px
      .leftBottom
        color:#9B9B9B;
        font-size:12px;
        margin-left:3px;
        position:absolute;
        bottom:2px;
    .right
      background-color:#F6F7F9;
      flex:305;
      padding:10px 16px;
      font-size:16px
      border-radius:4px;
      .text
        color:#9B9B9B;
        font-size:14px
        margin-top:8px;
  .noData
    min-height:484px;
    color:#BCBCBC;
    line-height:20px;
    padding-top:78px;
    img
      width:128px;
      margin-bottom:8px;
</style>
