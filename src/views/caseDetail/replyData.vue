<template>
<div class="tabItem">
  <collapse v-model="activeNames" bind:change="onChange">
    <collapse-item name="1" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 14px 0;">
          <h3>答辩书</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div v-for="(evidence, index) in replyBrief" :key="'e'+index">
          <div v-for="(file,i) in evidence.arbAttachmentDatas" :key="i" @click="previewFile(file.attachName,file.attachUrlDes)">
            <span class="icon iconfont" :class="util.getFileIcon(file.attachName)"></span>
            <span class="fileName">{{file.attachName}}</span>
          </div>
        </div>
      </div>
    </collapse-item>
    <collapse-item name="2" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 14px 0;">
          <h3>证据资料</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div class="grayBg" v-for="(evidence, index) in replyLists" :key="'l'+index">
          <p class="bold black"> {{evidence.evidenceName}}</p>
          <p class="borderBottom" style="padding-top:9px;"></p>
          <p style="padding:14px 0 0 0;">证据标题：</p>
          <p class="black" style="margin-top:2px;">{{evidence.evidenceTitle}}</p>
          <p style="margin-top:16px;">证明内容：</p>
          <p class="black" style="margin-top:2px;line-height:22px;"><b v-html="evidence.evidenceContent"></b></p>
          <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
          <div style="background-color:#FFFFFF;padding:2px 14px 14px 14px;word-wrap: break-word;word-break: normal;">
            <div style="margin-top:12px;" v-for="(file, ind) in evidence.arbAttachmentDatas" :key="'j'+ind" @click="previewFile(file.attachName,file.attachUrlDes)">
              <span class="icon iconfont" :class="util.getFileIcon(file.attachName)"></span>
              <span class="fileName">{{file.attachName}}</span>
            </div>
          </div>
        </div>
      </div>
    </collapse-item>
  </collapse>
</div>
</template>
<script>
import util from '@/utils/util'
import { Collapse, CollapseItem } from 'vant'
export default {
  name: 'ReplyData',
  props: ['replyBrief', 'replyLists', 'previewFile'],
  components: { Collapse, CollapseItem },
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      util
    }
  },
  methods: {
    // previewFile (name, url) {
    //   console.log()
    //   this.$parent.previewFile(name, url)
    // }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../stylus/caseDetails.styl";
</style>
