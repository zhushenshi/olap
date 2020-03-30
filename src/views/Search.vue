<template>
  <div class="wrapper">
    <Header :back="back" right="确认" :rightMethod='search'>搜索</Header>
    <div class="serachCnt">
      <input v-model="form.arbNumber" placeholder="请输入案件编号"/>
      <!-- <input v-model="form.arbName" placeholder="请选择案由"/> -->
      <input v-model="form.arbProsecutorName" placeholder="请输入申请人"/>
      <input v-model="form.arbDefendantName" placeholder="请输入被申请人"/>
      <div class="inputArrow">
        <input v-model="form.createTime" readonly @click="openPicker" placeholder="请选择申请时间"/>
        <img src="./../assets/imgs/arrow.png"/>
      </div>
       <datetime-picker ref="picker"  v-model="pickerValue"
          type="date"
          @confirm="handleConfirm">
        </datetime-picker>
    </div>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import { DatetimePicker } from 'mint-ui'
import 'mint-ui/lib/picker/style.css'
import 'mint-ui/lib/popup/style.css'
import 'mint-ui/lib/datetime-picker/style.css'
export default {
  data () {
    return {
      form: {
        createTime: ''
      },
      pickerValue: new Date()
    }
  },
  components: { Header, DatetimePicker },
  methods: {
    back () {
      this.$router.push('/queryArbitral')
    },
    search () {
      this.$router.push({ name: 'QueryArbitral', params: { form: this.form } })
    },
    handleConfirm (val) {
      let m = val.getMonth() + 1
      let d = val.getDate()
      if (m < 10) {
        m = '0' + m
      }
      if (d < 10) {
        d = '0' + d
      }
      const mm = val.getFullYear() + '-' + m + '-' + d
      console.log(mm)
      this.form.createTime = mm
    },
    openPicker () {
      // 如果已经选过日期，则再次打开时间选择器时，日期回显
      // if (this.form.createTime) {
      //   this.pickerValue = this.form.createTime
      // } else {
      //   this.pickerValue = new Date()
      // }
      this.$refs.picker.open()
    }
  },
  created () {

  }
}
</script>
<style lang="stylus" scoped>
.wrapper
  background:#FFFFFF;
  color:#24272B;
  font-size:20px;
  .serachCnt
    margin 50px 20px 0
    input
      background #F8F8F8
      border none
      height 50px
      line-height 50px
      font-size 16px
      padding-left 16px
      border-radius 10px
      width 90%
      margin 10px 0
.inputArrow
  position relative
  img
    right 15px
    top 26px
    position absolute
</style>
