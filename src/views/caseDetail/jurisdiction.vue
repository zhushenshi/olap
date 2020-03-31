<template>
<div class="tabItem">
  <collapse v-model="activeNames" bind:change="onChange">
    <collapse-item name="1" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 0 0;">
          <h3>基本信息</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div>
          <div class="flexInfoBox">
            <div class="infoItem">
              <div>异议申请时间</div>
              <div class="black mt2">{{arbiInfo.decisionCreateTime}}</div>
            </div>
            <div class="infoLine"></div>
            <div class="infoItem">
              <div>异议申请流程</div>
              <div class="black mt2">{{getstatus(arbiInfo.arbitralStatus)}}</div>
            </div>
          </div>
          <div class="flexInfoBox">
            <div class="infoItem">
              <div>异议申请人</div>
              <div class="black mt2">被申请人-{{arbiInfo.decisionProsecutorName}}</div>
            </div>
          </div>
        </div>
      </div>
    </collapse-item>
    <collapse-item name="2" :is-link="false" :border="false">
      <template slot="title">
        <div style="padding:15px 0 0 0;">
          <h3>被申请人异议资料</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div class="flexInfoBox">
          <div>
            <div>异议申请书</div>
            <div v-if="dissentApplication&&dissentApplication.length>0&&dissentApplication[0].arbAttachmentDatas&&dissentApplication[0].arbAttachmentDatas.length>0">
              <div class="black mt2 fileBox" v-for="(evidence, index) in dissentApplication" :key="index">
                <div v-for="(file, ind) in evidence.arbAttachmentDatas" :key="'a'+ind">
                  <span class="icon iconfont" :class="util.getFileIcon(file.attachName)" @click="previewFile(file.attachName,file.attachUrlDes)"></span>
                  <span class="fileName" :href="file.attachUrlDes">{{file.attachName}}</span>
                </div>
              </div>
            </div>
            <div class="black mt2 fileBox" v-else>/ </div>
          </div>
        </div>
        <div style="margin-top:14px;">证据资料</div>
        <div class="grayBg" v-for="(evidence, index) in dissentAttachment" :key="index">
          <p class="bold black"> {{evidence.evidenceName}}</p>
          <!-- <p style="margin:7px 0 7px 0;">({{evidence.arbDebtNum}})</p> -->
          <!-- <p style="margin:7px 0 7px 0;">订单编号：{{'evidence.arbDebtOrderNum'}}</p> -->
          <p class="borderBottom" style="padding-top:9px;"></p>
          <p style="padding:14px 0 0 0;">证据标题：</p>
          <p class="black" style="margin-top:2px;">{{evidence.evidenceTitle}}</p>
          <p style="margin-top:16px;">证明内容：</p>
          <p class="black" style="margin-top:2px;line-height:22px;"><b v-html="evidence.evidenceContent"></b></p>
          <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
          <div style="background-color:#FFFFFF;padding:2px 14px 14px 14px;">
            <div style="margin-top:12px;" v-for="(file, ind) in evidence.arbAttachmentDatas" :key="'b'+ind" @click="previewFile(file.attachName,file.attachUrlDes)">
              <span class="icon iconfont" :class="util.getFileIcon(file.attachName)"></span>
              <span class="fileName">{{file.attachName}}</span>
            </div>
          </div>
        </div>
        <div class="flexInfoBox">
          <div>
            <div>事实和理由</div>
            <div class="black mt2">{{arbiInfo.remark}}</div>
          </div>
        </div>
      </div>
    </collapse-item>
    <collapse-item name="2" :is-link="false" :border="false" v-if="dissentReplyApplication.length>0">
      <template slot="title">
        <div style="padding:15px 0 0 0;">
          <h3>申请人答辩资料</h3>
        </div>
      </template>
      <div class="tabItemContainer">
        <div class="flexInfoBox">
          <div>
            <div>答辩书</div>
            <div v-if="dissentReplyApplication&&dissentReplyApplication.length>0&&dissentReplyApplication[0].arbAttachmentDatas&&dissentReplyApplication[0].arbAttachmentDatas.length>0">
              <div class="black mt2 fileBox" v-for="(evidence, index) in dissentReplyApplication" :key="'c'+index">
                <div v-for="(file, ind) in evidence.arbAttachmentDatas" :key="'d'+ind"  @click="previewFile(file.attachName,file.attachUrlDes)">
                  <span class="icon iconfont" :class="util.getFileIcon(file.attachName)"></span>
                  <span class="fileName" :href="file.attachUrlDes">{{file.attachName}}</span>
                </div>
              </div>
            </div>
            <div class="black mt2 fileBox" v-else>/ </div>
          </div>
        </div>
        <div style="margin-top:14px;">证据资料</div>
        <div class="grayBg" v-for="(evidence, index) in dissentReplyAttachment" :key="'e'+index">
          <p class="bold black"> {{evidence.evidenceName}}</p>
          <p class="borderBottom" style="padding-top:9px;"></p>
          <p style="padding:14px 0 0 0;">证据标题：</p>
          <p class="black" style="margin-top:2px;">{{evidence.evidenceTitle}}</p>
          <p style="margin-top:16px;">证明内容：</p>
          <p class="black" style="margin-top:2px;line-height:22px;"><b v-html="evidence.evidenceContent"></b></p>
          <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
          <div style="background-color:#FFFFFF;padding:2px 14px 14px 14px;">
            <div style="margin-top:12px;" v-for="(file, ind) in evidence.arbAttachmentDatas" :key="'f'+ind"  @click="previewFile(file.attachName,file.attachUrlDes)">
              <span class="icon iconfont" :class="util.getFileIcon(file.attachName)"></span>
              <span class="fileName">{{file.attachName}}</span>
            </div>
          </div>
        </div>
        <div class="flexInfoBox">
          <div>
            <div>事实和理由</div>
            <div class="black mt2">{{arbiInfo.defenceRemark}}</div>
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
  // props: {
  //   dissentApplication: {
  //     type: Array
  //   }
  // },
  props: ['dissentApplication', 'dissentAttachment', 'dissentReplyApplication', 'arbiInfo'],
  components: { Collapse, CollapseItem },
  data () {
    return {
      activeNames: ['1', '2', '3', '4'],
      util
    }
  },
  methods: {
    getstatus (val) {
      var status = ''
      DICT.arbStatus.map(el => {
        if (el.value.split(',').map(el => +el).indexOf(val) > -1) {
          status = el.label
        }
      })
      return status
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../stylus/caseDetails.styl";
</style>
