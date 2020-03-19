<template>
<div class="tabItem">
  <div class="itemBox" v-for="(item,index) in arr" :key="index">
    <p class="topTime">{{item[0].endTime | formatm}}</p>
    <div class="item" v-for="(ite,inde) in item" :key="inde">
      <div class="left">
        <div class="leftTop">{{ite.endTime | formatDay}}</div>
        <div class="leftBottom">{{ite.endTime | formathm}}</div>
      </div>
      <div class="right">
        <p>{{ite.index}}：{{ite.taskName}}</p>
        <p class="text">{{ite.assignee}}</p>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { api } from '@/utils/api'
export default {
  name: 'CaseTracking',
  props: {
    arbProcess: {
      type: String
    }
  },
  data () {
    return {
      type: 'one',
      histroyTaskInst: [],
      arr: []
    }
  },
  created () {
    this.getHistroyTaskInst()
    console.log(this.arbProcess, '77777')
  },
  methods: {
    getHistroyTaskInst () { // 案件追踪
      api.getHistroyTaskInst({
        arbProcess: this.arbProcess
      }).then((res) => {
        if (res.data.code === '1') {
          this.histroyTaskInst = res.data.data
          const len = this.histroyTaskInst.length
          this.histroyTaskInst.forEach((v, i) => {
            v.index = '第' + (len - i) + '步'
          })
          var arr = []
          for (let i = 0; i < this.histroyTaskInst.length; i++) {
            if (i === 0) {
              const ar = []
              ar.push(this.histroyTaskInst[0])
              arr.push(ar)
            } else {
              console.log(arr[arr.length - 1])
              if (this.histroyTaskInst[i].endTime.slice(0, 9) === arr[arr.length - 1][0].endTime.slice(0, 9)) {
                arr[arr.length - 1].push(this.histroyTaskInst[i])
              } else {
                const a = []
                a.push(this.histroyTaskInst[i])
                arr.push(a)
              }
            }
          }
          console.log(arr)
          this.arr = arr
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabItem
  padding:17px 14px 14px 12px!important;
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
