<template>
<div class="tabItem">
       <h3>组庭送达流程</h3>
</div>
</template>
<script>
import { api } from '@/utils/api'
export default {
  name: 'caseDocument',
  props: {
    caseDocumentInfo: {
      type: Object
    }
  },
  data () {
    return {
    }
  },
  created () {
    console.log(this.caseDocumentInfo, '77777')
  },
  methods: {

  }
}
</script>
<style lang="stylus" scoped>
.tabItem
  padding:17px 15px 14px 14px;
  h3
    font-size:15px;
    font-weight:bold;
    color:#000;
    line-height:21px;
  h3:before
    content: "";
    display inline-block
    width:4px;
    height:16px;
    background-color:#1890FF;
    border-radius:1px;
    vertical-align:text-top;
    margin-right:8px;
</style>
