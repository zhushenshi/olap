<template>
  <div>
    <div class="caseData content" v-if="show">
      <div class="caseDataPieTitle">案件(被申请人)地域分布</div>
      <china-map  ref="chinaMap" :chinajson='chinajson'></china-map>
    </div>
  </div>
</template>
<script>
import ChinaMap from '@/components/ChinaMap.vue'
import { api } from '@/utils/api'
export default {
  data () {
    return {
      chinajson: [],
      show: false
    }
  },
  components: { ChinaMap },
  methods: {
    setEchartsMap (data) {
      if (data.code === '1') {
        this.chinajson = data.data
        var num = 0
        this.chinajson.map(el => {
          el.name = el.name.replace('省', '')
          if (el.name === '内蒙古自治区') {
            el.name = '内蒙古'
          }
          if (el.name.length > 3) {
            el.name = el.name.substr(0, 2)
          }
          num += Number(el.value)
        })

        this.chinajson.map(el => {
          el.percent = (el.value / num * 100).toFixed(2) + '%'
        })
      }
    },
    getData () {
      api.getIndexMap().then((res) => {
        if (res.data.success) {
          this.show = true
          this.setEchartsMap(res.data)
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
.caseData
  margin-top:14px;
  border-radius:5px;
  background-color:#FFFFFF;
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  padding-top:21px;
  .caseDataPieTitle
    height:25px;
    font-size:18px;
    line-height:25px;
    color:#4A4A4A;
</style>
