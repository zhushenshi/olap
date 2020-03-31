<template>
<div class="tabItem">
  <collapse v-model="activeNames" bind:change="onChange">
    <collapse-item name="1" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 0px 0;">
          <h3>{{'撤回资料'}}</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div>
          <div class="flexInfoBox">
            <div class="infoItem">
              <div>申请撤回时间</div>
              <div class="black mt2">{{arbRecallApplyInfoResponse.applyRecallTime}}</div>
            </div>
            <div class="infoLine"></div>
            <div class="infoItem">
              <div>申请撤回流程</div>
              <div class="black mt2">{{DICT.getArbStatusName(arbRecallApplyInfoResponse.applyRecallProcedure)}}</div>
            </div>
          </div>
          <div class="flexInfoBox">
            <div>
              <div class="fileBox">撤回申请书</div>
              <div class="black mt2 fileBox" v-if="arbRecallApplyInfoResponse.recallPetitionName" @click="previewFile(arbRecallApplyInfoResponse.recallPetitionName,arbRecallApplyInfoResponse.recallPetitionUrl)">
                <span class="icon iconfont" :class="util.getFileIcon(arbRecallApplyInfoResponse.recallPetitionName)"></span>
                <span class="fileName" :href="arbRecallApplyInfoResponse.recallPetitionUrl">{{arbRecallApplyInfoResponse.recallPetitionName}}</span>
              </div>
              <div class="black mt2 fileBox" v-else>
                /
              </div>
            </div>
          </div>
          <div class="flexInfoBox">
            <div>
              <div>撤回初审结果</div>
              <div class="black mt2">{{arbRecallApplyInfoResponse.recallFirstTrialResult?arbRecallApplyInfoResponse.recallFirstTrialResult:'/'}}</div>
            </div>
          </div>
          <div class="flexInfoBox">
            <div>
              <div>初审意见</div>
              <div class="black mt2">{{arbRecallApplyInfoResponse.firstTrialAdvice?arbRecallApplyInfoResponse.firstTrialAdvice:'/'}}</div>
            </div>
          </div>
          <div class="flexInfoBox">
            <div>
              <div>撤回终审结果</div>
              <div class="black mt2">{{arbRecallApplyInfoResponse.recallFinalTrialResult?arbRecallApplyInfoResponse.recallFinalTrialResult:'/'}}</div>
            </div>
          </div>
          <div class="flexInfoBox">
            <div>
              <div>终审意见</div>
              <div class="black mt2">{{arbRecallApplyInfoResponse.finalTrialAdvice?arbRecallApplyInfoResponse.finalTrialAdvice:'/'}}</div>
            </div>
          </div>
        </div>
      </div>
    </collapse-item>
  </collapse>
</div>
</template>
<script>
import { Collapse, CollapseItem } from 'vant'
import util from '@/utils/util'
import DICT from '@/const/dict'
export default {
  name: 'ApplyInfo',
  props: ['arbRecallApplyInfoResponse', 'previewFile'],
  components: { Collapse, CollapseItem },
  data () {
    return {
      activeNames: ['1'], // 调解资料
      util,
      DICT
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../stylus/caseDetails.styl";
</style>
