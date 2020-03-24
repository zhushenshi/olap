<template>
  <div class="wrapper">
    <img src="../../src/assets/imgs/Done@2x.png" alt="">
    <div>审核成功</div>
    <van-button round type="info" block color="#1890FF" class="mybtn" @click="goTopage()">返回待办</van-button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      message: ''
    }
  },
  methods: {
    goTopage(){
        this.$router.push({ path: '/toDoList' })
    }
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  background:#FFFFFF;
  color:#4A4A4A;
  font-size:20px;
  line-height:28px;
  img
    width:188px;
    margin:118px auto 25px;
  .mybtn
    width:200px;
    margin:71px auto 0;
    height:46px;
    font-size:16px;
</style>
