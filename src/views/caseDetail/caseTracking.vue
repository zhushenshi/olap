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
          <p class="topTime">{{item.endTime}}</p>
          <div v-for="(value1,index1) in item.list" :key="index1">
             <div class="fileName">{{value1.fileName}}</div>
             <div  v-for="(ite,inde) in value1" :key="inde">
             <div v-for="(value,ind) in ite" :key="ind">
               <div   class="item" v-if="value.taskName" >
                <div class="left">
                  <div class="leftBottom">{{value.endTime | formathm}}</div>
                </div>
                <div class="right" >
                  <p>{{value.index}}：{{value.taskName}}</p>
                  <p class="text">{{value.assignee}}</p>
                </div>
                </div>
          </div>
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
      refreshing: false,
      list: []
    }
  },
  components: { PullRefresh },
  created () {
    this.getHistroyTaskInst()
    console.log(this.arbProcess)
  },
  methods: {
    addComment () {
    // 添加完评论后发射监听事件，param是要添加的那条评论消息
      this.$emit('add-comment')
    },
    onRefresh () {
      this.refreshing = true
      if (this.refreshing) { // 关闭下拉刷新
        this.addComment()
        console.log('pppp')
        this.refreshing = false // 关闭下拉刷新中
      }
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
          this.list = this.histroyTaskInst
          for (let i = 0; i < this.list.length; i++) {
            var endTime = this.list[i].endTime
            var endTimes = endTime.slice(0, 7)
            this.list[i].fileName = endTime.slice(8, 11)
            if (i === 0) {
              var obj = { list: [{ fileName: '', list: [] }], endTime: endTimes }
              obj.list[0].fileName = this.list[0].fileName
              obj.list[0].list.push(this.list[0])
              arr.push(obj)
            } else {
              const leng = arr.length
              for (let j = 0; j < leng; j++) {
                if (endTimes === arr[j].endTime) {
                  const len = arr[j].list.length
                  for (let k = 0; k < len; k++) {
                    if (this.list[i].fileName === arr[j].list[k].fileName) {
                      arr[j].list[k].list.push(this.list[i])
                      break
                    } else if (this.list[i].fileName !== arr[j].list[k].fileName && k === len - 1) {
                      var ob = { fileName: this.list[i].fileName, list: [] }
                      ob.list.push(this.list[i])
                      arr[j].list.push(ob)
                      break
                    }
                  }
                } else if (this.list[i].endTime !== arr[j].endTime && j === leng - 1) {
                  var o = { list: [{ fileName: '', list: [] }], endTime: endTimes }
                  o.list[0].fileName = this.list[i].fileName
                  o.list[0].list.push(this.list[i])
                  arr.push(o)
                }
              }
            }
          }
          this.arr = arr
          console.log(this.arr)
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
.fileName
  position absolute
</style>
