<template>
  <div class="wrapper">
    <Header right="审核" :rightMethod="rightMethod">审核裁决书</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">编号：{{arbiInfo.arbNumber || arbiInfo.arbTemporaryNumber}}</div>
        <div class="arbInfo">
          <span class="label">案由：</span>
          <span>{{arbiInfo.arbName}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">申请人：</span>
          <span>{{arbiInfo.arbProsecutorName}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">被申请人：</span>
          <span @click="toastTex">{{arbiInfo.arbDefendantName}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">申请日期：</span>
          <span>{{arbiInfo.createTime}}</span>
        </div>
        <div class="caseStatus">
          待审核
        </div>
      </div>
    </section>
    <section class="caseDetail">
      <ul class="inline-ul">
        <li :class="{'active':item.value === type}" v-for="(item,index) in types" :key="index" @click="tabClick(item.value)">
          <p>{{item.text}}</p>
        </li>
      </ul>
      <div class="caseDetailsContent" v-if="type===0">
        <!-- <quill-editor
          v-model="arbitralAwardContext"
          ref="quillEditor"
          :options="editorOption"">
        </quill-editor> -->
        <div v-html="arbitralAwardContext" class="ql-editor"></div>
      </div>
      <div class="caseDetailsContent caseDetailsContent2" v-if="type!==0">
        <div class="selectBox">
          <div class="item" :class="{'active':item.attachmentEvidenceId===attachmentEvidenceId}" v-for="item in evidences" :key="item.attachmentEvidenceId" @click="selectEvidence(item)">
            <div class="title">{{item.title}}</div>
            <div>
              <span>{{item.evidenceTitle?item.evidenceTitle:'证据标题'}}:</span>
              <span class="text">{{item.evidenceName}}</span>
            </div>
            <div>证据内容：</div>
            <div class="text wrap">
              {{item.evidenceContent}}
            </div>
            <span class="icon iconfont iconzhongcai_qipao-jiao triangle"></span>
          </div>
        </div>
        <div class="selectContent">
          <div class="imgBox" v-for="(ite,index) in selectContent" :key="index">
            <div v-if="ite.type === 'iconzhongcai_tupian'">
              <img :src="api.getImgURL(ite.attachUrlDes)" alt="">
            </div>
            <div v-else-if="ite.type==='iconzhongcai_pdf'">
              <iframe :src="'./PDF/web/viewer.html?file=/olap-file/fast/file/downloadPdfFile?pdfUrl='+ite.attachUrlDes" frameborder="0" style="width:100%;min-height:400px;"></iframe>
            </div>
            <div v-else>
              此文件暂无法在页面中预览
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'

import { api } from '@/utils/api'
import util from '@/utils/util'

export default {
  data () {
    return {
      types: [
        {
          text: '裁决书内容',
          value: 0
        },
        {
          text: '证据资料',
          value: 1
        }
      ],
      type: 0,
      id: '',
      arbiInfo: {},
      htmlString: '',
      arbitralAwardContext: '',
      editorOption: {
        placeholder: '输入内容',
        modules: {
          toolbar: [
          //   ['bold', 'italic', 'underline', 'strike'],
          //   [{ indent: '-1' }, { indent: '+1' }],
          //   [{ size: this.GLOBAL.fontsizes }],
          //   [{ font: this.GLOBAL.fonts }],
          //   [{ spacing: ['sp0', 'sp1', 'sp2', 'sp-1', 'sp-2', 'sp-3', 'sp-4'] }],
          //   [{ color: [] }, { background: [] }],
          //   [{ align: [] }],
          //   ['clean']
          ]
        }
      },
      evidences: [],
      evidenceName: '',
      selectContent: [],
      attachmentEvidenceId: '',
      api
    }
  },
  components: { Header },
  methods: {
    rightMethod () {
      this.$router.push({ name: 'examine', params: { arbiInfo: this.arbiInfo } })
    },
    tabClick (val) {
      this.type = val
    },
    toastTex (e) {
      // console.log(e.target.innerHTML)
      // console.log(e.target.offsetWidth)
      // console.log(e.target.previousSibling.offsetWidth)
      // console.log(e.target.parentNode.offsetWidth)
      if ((e.target.offsetWidth + e.target.previousSibling.offsetWidth) > e.target.parentNode.offsetWidth) {
        this.$Toast({ message: e.target.innerHTML, position: 'middle' })
      }
      // div.scrollHeight==div.offsetHeight
    },
    getData () {
      this.$Indicator.open()
      api.getArbitralInfoDetailBySysAboutJudge({ arbitralId: this.id }).then(res => {
        this.$Indicator.close()
        if (res.data.code === '1') {
          this.arbiInfo = res.data
          // eslint-disable-next-line no-prototype-builtins
          if (this.arbiInfo.hasOwnProperty('arbitralRecordResponse') && this.arbiInfo.arbitralRecordResponse.arbitralAwardContext) {
            // 替换无法被freemarker识别的符号
            const htmlString = this.arbiInfo.arbitralRecordResponse.arbitralAwardContext
            this.htmlString = htmlString
            if (htmlString.indexOf('ql-editor') > -1) {
              this.arbitralAwardContext = htmlString.match(/<div class='ql-editor'>([\s\S]*?)<\/div>/)[1].replace(/(&#160;){4,}/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            } else if (htmlString.indexOf('<body>') > -1) {
              this.arbitralAwardContext = htmlString.match(/<body>([\s\S]*?)<\/body>/)[1]
            } else {
              this.arbitralAwardContext = htmlString
            }
          }
          if (!this.arbitralAwardContext) {
            this.$Toast({ message: '未查询到裁决书数据' })
          }
          this.initDataList()
        }
      })
    },
    initDataList () {
      const arbitralAttachments = this.arbiInfo.arbitralAttachment || this.arbiInfo.arbitralAttachments
      if (arbitralAttachments instanceof Array) {
        if (arbitralAttachments.length === 0) {
          this.$Toast({ message: '决定书不存在，请检查案件数据' })
        } else {
          const list = [6, 7, 8, 9, 10]
          this.evidences = arbitralAttachments.filter(val => list.indexOf(val.evidenceProperty) === -1).map(item => {
            item.name = (item.evidenceName || '') + '：' + (item.evidenceTitle || '')
            if (item.arbitralPtype === 1) {
              // item.name = '答辩证据：' + item.name
              item.title = '答辩证据资料：'
            } else if (item.arbitralPtype === 2) {
              // item.name = '申请资料：' + item.name
              item.title = '申请人证据资料：'
            }
            return item
          })
          this.evidenceName = this.evidences[0].attachmentEvidenceId
          // this.getEvidence(this.evidenceName)
          this.application = (arbitralAttachments.find(val => val.evidenceProperty === 1) || { arbAttachmentDatas: [] }).arbAttachmentDatas.find(val => val.attachType === 1)
          if (this.application) {
            const lastName = this.application.attachName.substring(this.application.attachName.lastIndexOf('.')).toLowerCase()
            if (/\.jpg|\.png|\.jpeg/.test(lastName)) {
              this.imgURL = api.getImgURL(this.application.attachUrlDes)
            } else if (/\.pdf/.test(lastName)) {
              api.downloadPdfFile({
                pdfUrl: this.application.attachUrlDes
              }).then(res => {
                if (res.data instanceof Blob) {
                  this.pdfURL = window.URL.createObjectURL(res.data)
                }
              })
            } else {
              this.isOtherFile = true
            }
          }
        }
      }
      if (Array.isArray(this.evidences) && this.evidences.length > 0) {
        this.selectEvidence(this.evidences[0])
      }
    },
    selectEvidence (item) {
      this.attachmentEvidenceId = item.attachmentEvidenceId
      item.arbAttachmentDatas.forEach((ele, i) => {
        ele.type = util.getFileIcon(ele.attachName)
      })
      this.selectContent = item.arbAttachmentDatas
    }
  },
  created () {
    this.id = this.$route.query.id
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
@import "../stylus/caseBaseInfo.styl";
.wrapper
  .caseDetail
    text-align:left;
    padding:14px 0 0 0;
    color:#727272;
    .inline-ul
      li
        text-align:center;
        margin: 0 15px;
      li.active
        color:#000000;
        font-weight:500;
      li:after
        height: 3px;
        width:23px;
  .caseDetailsContent
    background-color:#FFFFFF;
    padding:24px 30px 9px;
    color:#727272;
    line-height:24px;
    margin-top:7px;
  .caseDetailsContent2
    padding:16px 0 0;
    .selectBox
      white-space: nowrap;
      overflow-x: scroll;
      overflow-y : hidden;
      .item
        width:303px;
        display:inline-block;
        margin:0 7px;
        margin-bottom:18px
        background:#FFFFFF;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        opacity:1;
        border-radius:5px;
        font-size:15px;
        color:#9B9B9B
        padding:8px 16px 9px 16px;
        line-height:22px;
        position: relative;
        >div
          margin:8px 0;
          overflow: hidden;
          text-overflow:ellipsis;
        .title
          font-size:16px
          margin-bottom:14px;
        .text
          color:#000000;
        .wrap
          white-space: normal;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          min-height:44px;
        .triangle
          opacity:0;
          position:absolute;
          color:#0084FF;
          left:0;
          right:0;
          bottom:-12px;
          margin:auto;
          font-size:36px;
          text-align:center;
      .active
        background:#0084FF;
        color:#FFFFFF
        .text
          color:#C6E4FF;
        .triangle
          opacity:1;
          position:absolute;
          color:#0084FF;
          left:0;
          right:0;
          bottom:-12px;
          margin:auto;
          font-size:36px;
          text-align:center;
    .selectContent
      padding:14px;
      .imgBox
        padding:14px;
        img
          width:100%;
</style>
