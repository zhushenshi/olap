<template>
  <div class="Myheader">
  <div :class="{header:true,lHeader:isliuhai}" :style="{backgroundColor:bgColor}">
    <div class="headerContent">
      <span class="icon iconfont iconzhongcai_zuo left" @click="goBack" v-if="backShow"></span>
      <div class="title">
        <slot></slot>
      </div>
      <span class="right" v-if="right" @click="rightMethod">{{right}}</span>
    </div>
  </div>
  <div :class="{place:true,lPlace:isliuhai}"></div>
  </div>
</template>
<script>
export default {
  props: {
    back: {
      type: Function
    },
    backShow: {
      type: Boolean,
      default: true
    },
    right: {
      type: String,
      default: ''
    },
    rightMethod: {
      type: Function,
      default: () => {
        console.log('测试')
      }
    },
    bgColor: {
      type: String,
      default: '#ffffff'
    }
  },
  data () {
    return {
      isliuhai: false// 1 非刘海 2liuhia
    }
  },
  methods: {
    goBack () {
      if (this.back) {
        this.back()
      } else {
        this.$router.go(-1)
      }
    }
  },
  created () {
    this.isliuhai = localStorage.getItem('isliuhai') ? parseInt(localStorage.getItem('isliuhai')) === 2 : false
  }
}
</script>
<style lang="stylus" scoped>
.Myheader
  color:#24272B;
  // background-color:#FFFFFF;
.header
  height:64px;
  padding-top:20px;
  font-size:18px;
  position:fixed;
  right:0;
  left:0;
  z-index:100;
  .headerContent
    line-height:44px;
    height:44px;
    position:relative;
  .title
    max-width: 60%;
    margin: 0 auto;
  .left
    position:absolute;
    left:14px;
    font-weight:600;
    color:#8795A8;
    font-size:16px;
  .right
    position:absolute;
    right:13px;
    top:0;
    font-size:17px;
    color:#1890FF;
.lHeader
  padding-top:44px;
  height:88px;
.place
  height:64px;
.lPlace
  height:88px;
</style>
