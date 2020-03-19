<template>
<div class="tabItem">
  <van-collapse v-model="activeNames" bind:change="onChange">
    <van-collapse-item name="1" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 14px 0;">
          <h3>网络会议信息</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div class="flexInfoBox">
          <div class="infoItem">
            <div>网络会议名称</div>
            <div class="black mt2">{{'北国仲字第1号庭审'}}</div>
          </div>
          <div class="infoLine"></div>
          <div class="infoItem">
            <div>网络会议开始时间</div>
            <div class="black mt2">{{'2019.01.01 12:00:00'}}</div>
          </div>
        </div>
        <div class="flexInfoBox">
          <div>
            <div>网络会议结束时间</div>
            <div class="black mt2">{{'2019.01.01 12:00:00'}}</div>
          </div>
        </div>
      </div>
    </van-collapse-item>
    <van-collapse-item name="2" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 14px 0;">
          <h3>网络会议视频</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div class="flexInfoBox">
          <div class="infoItem">
            <video src="/i/movie.ogg" controls="controls">
            your browser does not support the video tag
            </video>
            <div class="black text-center">标题标题标题标题标题标题</div>
          </div>
          <div class="infoItem">
            <video src="/i/movie.ogg" controls="controls">
            your browser does not support the video tag
            </video>
            <div class="black text-center">标题标题标题标题标题标题</div>
          </div>
        </div>
      </div>
    </van-collapse-item>
  </van-collapse>
</div>
</template>
<script>
import util from '@/utils/util'
export default {
  name: 'VideoData',
  props: ['supplementaryArrs', 'supplementaryArrb'],
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      util
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../stylus/caseDetails.styl";
</style>
