<template>
<div class="tabItem">
  <div class="itemBox" v-for="(item,index) in histroyTaskInst" :key="index">
    <p class="topTime">{{item.endTime |formatDate}}</p>
    <div class="item">
      <div class="left">
        <div class="leftTop">{{item.endTime | formathh}}</div>
        <div class="leftBottom">{{item.endTime|formatms}}</div>
      </div>
      <div class="right">
        <p>{{item.index}}：{{item.taskName}}</p>
        <p class="text">{{item.assignee}}</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { api } from '@/utils/api'
export default {
  name: 'CaseTracking',
  data () {
    return {
      type: 'one',
      histroyTaskInst: []
    }
  },
  created () {
    this.getHistroyTaskInst()
  },
  methods: {
    getHistroyTaskInst () { // 案件追踪
      api.getHistroyTaskInst({
        arbProcess: '217526'
      }).then((res) => {
        if (res.data.code === '1') {
          this.histroyTaskInst = res.data.data
          const len = this.histroyTaskInst.length
          this.histroyTaskInst.forEach((v, i) => {
            v.index = '第' + (len - i) + '步'
          })
        }
      })
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
