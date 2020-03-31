<template>
  <div class="wrapper">
    <img src="../assets/404.png" alt="404">
    <img src="../assets/404_msg.png" alt="404" class="msg">
    <div class="btn">
      <Button type="primary" block class="myBtn" @click="$router.push('/home')">返回首页</Button>
    </div>
  </div>
</template>
<script>
import { Button } from 'vant'
import 'vant/lib/button/style'
export default {
  components: { Button }
}
</script>
<style lang="stylus" scoped>
.wrapper
  background-color:#67ACE4;
  padding-top:20%;
  img
    width:60%;
  .msg
    margin-top:50px;
  .btn
    margin:0 auto;
    width:280px;
    // height:45px;
    .myBtn
      // color:#1890FF!important;
      // font-size:18px;
      border-radius:5px;
      margin-top 41px;
</style>
