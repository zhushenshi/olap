<template>
<div class="tabItem">
  <transition name="fade">
    <pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div v-if="loading">
        <div class="itemBox" v-for="item in 2" :key="item">
          <div class="topTime" v-show="item==1">
            <div class="skeleton" style="width:21%;height:18px;margin:auto;"></div>
          </div>
          <div class="item">
            <div class="left">
              <div class="leftTop"><div class="skeleton" style="width:20px;height:20px;"></div></div>
              <div class="leftBottom"><div class="skeleton" style="width:20px;height:20px;"></div></div>
            </div>
            <div class="right">
              <p></p>
              <p class="text"></p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
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
    </pull-refresh>
  </transition>
</div>
</template>
<script>
import { api } from '@/utils/api'
import { PullRefresh } from 'vant'
import 'vant/lib/pull-refresh/style'
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
      arr: [],
      loading: true,
      refreshing: false
    }
  },
  components: { PullRefresh },
  created () {
    this.getHistroyTaskInst()
    console.log(this.arbProcess, '77777')
  },
  methods: {
    onRefresh () {
      this.refreshing = true
      this.getHistroyTaskInst()
    },
    getHistroyTaskInst () { // 案件追踪
      api.getHistroyTaskInst({
        arbProcess: this.arbProcess
      }).then((res) => {
        this.loading = false
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
              if (this.histroyTaskInst[i].endTime.slice(0, 8) === arr[arr.length - 1][0].endTime.slice(0, 8)) {
                arr[arr.length - 1].push(this.histroyTaskInst[i])
              } else {
                const a = []
                a.push(this.histroyTaskInst[i])
                arr.push(a)
              }
            }
          }
          if (this.refreshing) { // 关闭下拉刷新
            this.refreshing = false // 关闭下拉刷新中
            this.arr = arr// 重新给数据赋值
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
