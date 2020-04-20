<template>
  <div class="wrapper">
    <Header right="审核" :rightMethod="rightMethod" :back="backMethod">审核裁决书</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">编号：{{arbiInfo.arbNumber || arbiInfo.arbTemporaryNumber}}</div>
        <div class="arbInfo">
          <span class="label">案由：</span>
          <span @click="toastTex">{{arbiInfo.arbName?arbiInfo.arbName:'/'}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">申请人：</span>
          <span @click="toastTex">{{arbiInfo.arbProsecutorName?arbiInfo.arbProsecutorName:'/'}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">被申请人：</span>
          <span @click="toastTex">{{arbiInfo.arbDefendantName?arbiInfo.arbDefendantName:'/'}}</span>
        </div>
        <div class="arbInfo">
          <span class="label">申请日期：</span>
          <span>{{arbiInfo.createTime?arbiInfo.createTime:'/'}}</span>
        </div>
        <div class="caseStatus">
          待审核
        </div>
      </div>
    </section>
    <section class="caseDetail">
      <ul class="inline-ul">
        <li :class="{'active':item.value === type}" v-for="(item,index) in types" :key="index" @click="tabClick(item.value)">
          <p>{{item.text?item.text:'/'}}</p>
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
            <div class="title">{{item.title?item.title:'/'}}</div>
            <div>
              <span>{{'证据标题'}}:</span>
              <span class="text" @click="toastTex">{{item.evidenceTitle?item.evidenceTitle:'/'}}</span>
            </div>
            <div>证据内容：</div>
            <div class="text wrap" @click="toastClampTex">
              <span v-html="item.evidenceContent?item.evidenceContent:'/'"></span>
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
    backMethod () {
      this.$router.replace('/toDoList')
    },
    tabClick (val) {
      this.type = val
    },
    toastTex (e) {
      if ((e.target.offsetWidth + e.target.previousSibling.offsetWidth) > e.target.parentNode.offsetWidth) {
        this.$Toast({ message: e.target.innerHTML, position: 'middle' })
      }
    },
    toastClampTex (e) {
      if (e.target.offsetHeight > e.target.parentNode.offsetHeight) {
        e.stopPropagation()
        this.$Toast({ message: e.target.innerText, position: 'middle' })
      }
    },
    getData () {
      this.$Indicator.open()
      api.mockRequest({ success: true, msg: '操作成功', code: '1', data: null, id: '79bbaff97ad111ea9c0e005056ae47c6', dictId: '0cd3919e4f8411e89fad005056ae7cd6', arbTemplateId: null, arbProductId: null, arbProductName: '产品1', arbOrderNum: null, arbTradeNum: '20200410101749723582183264346783', arbName: '入伙纠纷', arbDisputeMoney: 1000.0, arbArbitrateMoney: 300.0, arbProcess: '297150', arbProcessExplain: '4', arbProcessTask: '297544', arbProcessTaskExplain: null, arbNumber: '(2020)南仲案字第2-0035号', arbSecretaryId: '191', arbRegisterPassTime: null, arbProsecutorType: 1, arbProsecutorName: '明浔醉', arbDefendantType: null, arbDefendantName: '姬云清', arbAgentPtype: null, arbAgentPName: null, arbDeadline: null, arbApplication: null, arbApplicationDescription: null, arbState: null, arbStatus: 64, arbStopStatus: null, arbChannel: null, arbDelayType: null, arbDelayTime: null, arbClosedType: null, arbClosedTime: null, arbClosedContent: null, arbRootType: null, arbTemporaryNumber: '(2020)南仲（沪）缴字第102号', createTime: '2020-04-10', arbitralPInfo: [{ id: '79bec51c7ad111ea9c0e005056ae47c6', arbitralInfoId: '79bbaff97ad111ea9c0e005056ae47c6', pRealname: '明浔醉', pIdnum: '342211199111111112', nation: '汉', sex: 1, birthday: '1991-11-11', pPhone: '13333333333', pMail: '3027392870@qq.com', pAdress: '天津 天津市 和平区 朝阳大道', pFax: null, pZipcode: '123456', pIdAttachFornt: 'group1/M00/08/E4/rBAKcl6P1ayAL4_OAA0XdvYcAX0579.jpg', pIdAttachRear: 'group1/M00/08/E4/rBAKcl6P1bCACVm9AAuCdngjEqk837.jpg', pIdAttachForntDes: 'YI+fm3g75gne38ZKiPU4Oa7oMbgBTehYYbhXCzldhci0tUgSXZfufXnBR4ghzN8LM1yOquMLnF4JqqCkZ0GG+6vRS0+f+MVePCxyn3Onu/0=', pIdAttachRearDes: 'YI+fm3g75gne38ZKiPU4Oa7oMbgBTehYYbhXCzldhcgt3q24LeiE6F+4c4adhDIlEjDcoZn9G/M6WEctKfSyHqvRS0+f+MVePCxyn3Onu/0=', pStatus: 1, pType: 2, pIdNumAddress: '天津 天津市 和平区 朝阳大道', arbitralAgentInfoResponse: { id: null, agentRealname: null, agentIdnum: null, agentJob: null, agentPhone: null, agentMail: null, agentType: null, agentIdAttachFornt: null, agentIdAttachRear: null, agentLawyerAttach: null, agentProxyAttach: null, agentCounselAttach: null, agentJobAttach: null, agentContractAttach: null, agentIdAttachForntDes: null, agentIdAttachRearDes: null, agentLawyerAttachDes: null, agentProxyAttachDes: null, agentCounselAttachDes: null, agentJobAttachDes: null, agentContractAttachDes: null, status: null, arbitralUserInfoId: null } }], arbitralCoInfo: [{ id: '79bf3bc27ad111ea9c0e005056ae47c6', arbitralInfoId: '79bbaff97ad111ea9c0e005056ae47c6', coName: '姬云清', coIdnum: '123456789098765431', coLegalPerson: '姬云清', coLegalPersonIdnum: '342211199111111111', coPhone: '17777777777', coEmail: '123@qq.com', coAdress: '江苏省 苏州市 姑苏区 观前街', coZipcode: '133133', coStatus: 1, coType: 1, coJob: null, coQueryPassword: null, coLicenceAttach: 'group1/M00/08/E4/rBAKcl6P1lqAWthHAABfdqB43OA612.jpg', coIdAttachFornt: 'group1/M00/08/E4/rBAKcl6P1mmAc_5nAAM-7sI_pa086.jpeg', coIdAttachRear: 'group1/M00/08/E4/rBAKcl6P1m-Aeq1sAAPzheXMNNs924.jpg', coIdPaperAttach: 'group1/M00/08/E4/rBAKcl6P1l-Afqe0AAKQ8q-7YxI953.jpg', coLicenceAttachDes: 'YI+fm3g75gne38ZKiPU4Oa7oMbgBTehYYbhXCzldhciPLYvA0jlof6zMf8HaX2tHYhHTHaTNPTg0ChDcFOf1cKvRS0+f+MVePCxyn3Onu/0=', coIdAttachForntDes: 'YI+fm3g75gne38ZKiPU4Oa7oMbgBTehYYbhXCzldhch6N+WsJsNFEDtS3/XYx99Jh+2w8zjpvaxEqXGeP4FHL7IuCZZlzLljeoAiFCD81bQ=', coIdAttachRearDes: 'YI+fm3g75gne38ZKiPU4Oa7oMbgBTehYYbhXCzldhchrSGGNG2GplvNy/MjQrQJskRuAQuhPWUx5TwBzPirXkKvRS0+f+MVePCxyn3Onu/0=', coIdPaperAttachDes: 'YI+fm3g75gne38ZKiPU4Oa7oMbgBTehYYbhXCzldhchH4yBQav/pSlrj/cQOCqplqEqlIHSy3VJMY51oGzc1Z6vRS0+f+MVePCxyn3Onu/0=', coArrivedAddress: '江苏省 苏州市 姑苏区 观前街', arbitralAgentInfoResponse: { id: null, agentRealname: null, agentIdnum: null, agentJob: null, agentPhone: null, agentMail: null, agentType: null, agentIdAttachFornt: null, agentIdAttachRear: null, agentLawyerAttach: null, agentProxyAttach: null, agentCounselAttach: null, agentJobAttach: null, agentContractAttach: null, agentIdAttachForntDes: null, agentIdAttachRearDes: null, agentLawyerAttachDes: null, agentProxyAttachDes: null, agentCounselAttachDes: null, agentJobAttachDes: null, agentContractAttachDes: null, status: null, arbitralUserInfoId: null } }], arbitralAttachment: [{ success: false, msg: null, code: null, data: null, attachmentEvidenceId: '79bfaf8c7ad111ea9c0e005056ae47c6', attachmentEvidenceStatus: 1, arbitralPtype: 2, evidenceProperty: 2, evidenceName: '证据一', evidenceTitle: '未选择的路', evidenceContent: '两条路都未经脚印污染。留下一条路等改日再见！<br />但我知道路径延绵无尽头，恐怕我难以再回返。<br />也许多少年后在某个地方，我将轻声叹息将往事回顾：<br />一片树林里分出两条路，而我选择了人迹更少的一条，<br />从此决定了我一生的道路。', updateTime: '2020-04-10 10:17:50', updateBy: '2c3063a2725911ea9c0e005056ae47c6', updateProcess: 10, updatePName: '合肥小指', arbAttachmentDatas: [{ attachId: '79c14fb57ad111ea9c0e005056ae47c6', arbitralAttachmentEvidenceId: '79bfaf8c7ad111ea9c0e005056ae47c6', attachName: 'The New Yorker – March 23, 2020-1-38_translation20200324094727.docx', attachUrl: 'group1/M00/08/E3/rBAKcl6P1GyAXM_SACrcddQAXZI82.docx', attachUrlDes: 'YI+fm3g75gk8CPV+PrtrC9BZDg3qBgUUYbhXCzldhcjIsOrmNw1oPP3C7CVDj8iWbW3xmJUXe+foTGTmawGWcdMNYMFahJQEn6Zx5/I/efA=', attachType: 1, attachProperty: 2, attachStatus: null }], arbDebtOrderNum: null, arbDebtNum: null, arbDebtCount: null }, { success: false, msg: null, code: null, data: null, attachmentEvidenceId: '79c01a087ad111ea9c0e005056ae47c6', attachmentEvidenceStatus: 1, arbitralPtype: 2, evidenceProperty: 2, evidenceName: '证据二', evidenceTitle: '热风', evidenceContent: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话，能做事的做事，能发声的发声，有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火，此后如竟没有炬火：我便是唯一的光。', updateTime: '2020-04-10 10:17:50', updateBy: '2c3063a2725911ea9c0e005056ae47c6', updateProcess: 10, updatePName: '合肥小指', arbAttachmentDatas: [{ attachId: '79c1508f7ad111ea9c0e005056ae47c6', arbitralAttachmentEvidenceId: '79c01a087ad111ea9c0e005056ae47c6', attachName: '假装是个申请.jpg', attachUrl: 'group1/M00/08/E3/rBAKcl6P1HiATU_OAAUVD4NG4sM461.jpg', attachUrlDes: 'YI+fm3g75gk8CPV+PrtrC9BZDg3qBgUUYbhXCzldhchARTX0BStdQGy1yxQlM8hmsxlo8EzveI8dHtaLNF1Xx6vRS0+f+MVePCxyn3Onu/0=', attachType: 1, attachProperty: 2, attachStatus: null }], arbDebtOrderNum: null, arbDebtNum: null, arbDebtCount: null }, { success: false, msg: null, code: null, data: null, attachmentEvidenceId: '79c08c777ad111ea9c0e005056ae47c6', attachmentEvidenceStatus: 1, arbitralPtype: 2, evidenceProperty: 1, evidenceName: '仲裁申请书', evidenceTitle: null, evidenceContent: '', updateTime: '2020-04-10 10:17:50', updateBy: '2c3063a2725911ea9c0e005056ae47c6', updateProcess: 10, updatePName: '合肥小指', arbAttachmentDatas: [{ attachId: '79c150ad7ad111ea9c0e005056ae47c6', arbitralAttachmentEvidenceId: '79c08c777ad111ea9c0e005056ae47c6', attachName: '(2020)南仲案字第2-0041号-仲裁裁决书.pdf', attachUrl: 'group1/M00/08/E3/rBAKcl6P1GaAKTLKAAEMc6B5Rx0003.pdf', attachUrlDes: 'YI+fm3g75gk8CPV+PrtrC9BZDg3qBgUUYbhXCzldhchpS9cEfOQk4EdV6SuIvrlWBzoSNABKnk377F3hTgeTZgXkRm5sXgJNOh8OIv+E9BE=', attachType: 1, attachProperty: 1, attachStatus: null }], arbDebtOrderNum: null, arbDebtNum: null, arbDebtCount: null }, { success: false, msg: null, code: null, data: null, attachmentEvidenceId: 'da97f9067ad311ea9c0e005056ae47c6', attachmentEvidenceStatus: 1, arbitralPtype: 1, evidenceProperty: 4, evidenceName: '答辩书', evidenceTitle: '', evidenceContent: '', updateTime: '2020-04-10 10:34:51', updateBy: '191', updateProcess: null, updatePName: '创作秘书1', arbAttachmentDatas: [{ attachId: 'dacc1a207ad311ea9c0e005056ae47c6', arbitralAttachmentEvidenceId: 'da97f9067ad311ea9c0e005056ae47c6', attachName: '直销银行APP操作手册（1.0）.docx', attachUrl: 'group1/M00/08/E5/rBAKcl6P2wiAejMwABmDxUXiqjk58.docx', attachUrlDes: 'YI+fm3g75gmUitI+cqTw1Lz8WDZ+OECBYbhXCzldhcjGLRDAdT/PIYyAdpSirWhyrLsXLSZTw+DFXbkzMcQVetMNYMFahJQEn6Zx5/I/efA=', attachType: 3, attachProperty: 4, attachStatus: null }], arbDebtOrderNum: null, arbDebtNum: null, arbDebtCount: null }, { success: false, msg: null, code: null, data: null, attachmentEvidenceId: 'dab24b927ad311ea9c0e005056ae47c6', attachmentEvidenceStatus: 1, arbitralPtype: 1, evidenceProperty: 5, evidenceName: '证据一', evidenceTitle: '海边的卡夫卡', evidenceContent: '暴风雨结束后，你不会记得自己是怎样活下来的，你甚至不确定暴风雨真的结束了。但有一件事是确定的：当你穿过了暴风雨，你早已不再是原来那个人。', updateTime: '2020-04-10 10:34:51', updateBy: '191', updateProcess: null, updatePName: '创作秘书1', arbAttachmentDatas: [{ attachId: 'dacc1a947ad311ea9c0e005056ae47c6', arbitralAttachmentEvidenceId: 'dab24b927ad311ea9c0e005056ae47c6', attachName: '假装是个申请.jpg', attachUrl: 'group1/M00/08/E5/rBAKcl6P2xuAOF1aAAUVD4NG4sM646.jpg', attachUrlDes: 'YI+fm3g75gmUitI+cqTw1Lz8WDZ+OECBYbhXCzldhcis81QTJ0bdMS8QViGS7ykO9dogMs4lvUKMThoW90zemavRS0+f+MVePCxyn3Onu/0=', attachType: 3, attachProperty: 5, attachStatus: null }], arbDebtOrderNum: null, arbDebtNum: null, arbDebtCount: null }], arbitralContractAdvanceResponse: null, arbitralFundRecordResponse: { id: '79be589e7ad111ea9c0e005056ae47c6', handleCost: 69.23, acceptCost: 230.77, arbDisputeMoney: 1000.0, totalCost: 300.0 }, arbitralRecordResponse: { success: false, msg: null, code: null, data: null, id: null, arbitralInfoId: '79bbaff97ad111ea9c0e005056ae47c6', arbArbitratorId: '192', arbArbitratorName: '自由仲裁员', arbSecretaryId: '191', arbSecretaryName: '创作秘书1', arbitralAwardContext: "<html>\r\n<head>\r\n<meta charset ='utf-8'></meta><style> \r\n* {margin: 0;padding: 0;border: 0;font-size: 20px;}\r\n body {  font-family: FangSong_GB2312;text-indent:2em;}\r\n .wrap {width: 700px;margin: 0 auto;}\r\n.ql-snow .ql-picker.ql-spacing{width:85px}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp0]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp0]::before{content:'正常字距'}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp1]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp1]::before{content:'1倍字距'}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp2]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp2]::before{content:'2倍字距'}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp-1]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp-1]::before{content:'-1倍字距'}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp-2]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp-2]::before{content:'-2倍字距'}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp-3]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp-3]::before{content:'-3倍字距'}.ql-snow .ql-picker.ql-spacing .ql-picker-item[data-value=sp-4]::before,.ql-snow .ql-picker.ql-spacing .ql-picker-label[data-value=sp-4]::before{content:'-4倍字距'}.ql-spacing-sp0{letter-spacing:0}.ql-spacing-sp1{letter-spacing:1px}.ql-spacing-sp2{letter-spacing:2px}.ql-spacing-sp-1{letter-spacing:-1px}.ql-spacing-sp-2{letter-spacing:-2px}.ql-spacing-sp-3{letter-spacing:-3px}.ql-spacing-sp-4{letter-spacing:-4px}\r\n.ql-container {box-sizing: border-box;font-family:FangSong_GB2312;font-size: 20px;height: 100%;margin: 0px;position: relative;}\r\n.ql-container.ql-disabled .ql-tooltip {visibility: hidden;}\r\n.ql-container.ql-disabled .ql-editor ul[data-checked] > li::before {pointer-events: none;}\r\n.ql-clipboard {left: -100000px;height: 1px;overflow-y: hidden;position: absolute;top: 50%;}.ql-clipboard p {margin: 0;padding: 0;}\r\n.ql-editor {box-sizing: border-box;line-height: 1.42;height: 100%;outline: none;overflow-y: auto;padding: 12px 15px;tab-size: 4;-moz-tab-size: 4;text-align: left;white-space: pre-wrap;word-wrap: break-word;}.ql-editor > * {cursor: text;}.ql-editor p,.ql-editor ol,.ql-editor ul,.ql-editor pre,.ql-editor blockquote,.ql-editor h1,.ql-editor h2,.ql-editor h3,.ql-editor h4,.ql-editor h5,.ql-editor h6 {margin: 0;padding: 0;counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;}\r\n.ql-editor ol,.ql-editor ul {padding-left: 1.5em;}.ql-editor ol > li,.ql-editor ul > li {list-style-type: none;}.ql-editor ul > li::before {content: '2';}.ql-editor ul[data-checked=true],.ql-editor ul[data-checked=false] {pointer-events: none;}.ql-editor ul[data-checked=true] > li *,.ql-editor ul[data-checked=false] > li * {pointer-events: all;}.ql-editor ul[data-checked=true] > li::before,.ql-editor ul[data-checked=false] > li::before {color: #777;cursor: pointer;pointer-events: all;}.ql-editor ul[data-checked=true] > li::before {content: '±1';}.ql-editor ul[data-checked=false] > li::before {content: '±0';}.ql-editor li::before {display: inline-block;white-space: nowrap;width: 1.2em;}.ql-editor li:(.ql-direction-rtl)::before {margin-left: -1.5em;margin-right: 0.3em;text-align: right;}.ql-editor li.ql-direction-rtl::before {margin-left: 0.3em;margin-right: -1.5em;}\r\n.ql-editor ol li,.ql-editor ul li {padding-left: 1.5em;}.ql-editor ol li.ql-direction-rtl,.ql-editor ul li.ql-direction-rtl {padding-right: 1.5em;}\r\n.ql-editor ol li {counter-reset: list-1 list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;counter-increment: list-0;}.ql-editor ol li:before {content: counter(list-0, decimal) '. ';}.ql-editor ol li.ql-indent-1 {counter-increment: list-1;}.ql-editor ol li.ql-indent-1:before {content: counter(list-1, lower-alpha) '. ';}.ql-editor ol li.ql-indent-1 {counter-reset: list-2 list-3 list-4 list-5 list-6 list-7 list-8 list-9;}.ql-editor ol li.ql-indent-2 {counter-increment: list-2;}.ql-editor ol li.ql-indent-2:before {content: counter(list-2, lower-roman) '. ';}.ql-editor ol li.ql-indent-2 {counter-reset: list-3 list-4 list-5 list-6 list-7 list-8 list-9;}\r\n.ql-editor ol li.ql-indent-3 {counter-increment: list-3;}.ql-editor ol li.ql-indent-3:before {content: counter(list-3, decimal) '. ';}.ql-editor ol li.ql-indent-3 {counter-reset: list-4 list-5 list-6 list-7 list-8 list-9;}.ql-editor ol li.ql-indent-4 {counter-increment: list-4;}.ql-editor ol li.ql-indent-4:before {content: counter(list-4, lower-alpha) '. ';}.ql-editor ol li.ql-indent-4 {counter-reset: list-5 list-6 list-7 list-8 list-9;}.ql-editor ol li.ql-indent-5 {counter-increment: list-5;}.ql-editor ol li.ql-indent-5:before {content: counter(list-5, lower-roman) '. ';}\r\n.ql-editor ol li.ql-indent-5 {counter-reset: list-6 list-7 list-8 list-9;}.ql-editor ol li.ql-indent-6 {counter-increment: list-6;}.ql-editor ol li.ql-indent-6:before {content: counter(list-6, decimal) '. ';}\r\n.ql-editor ol li.ql-indent-6 {counter-reset: list-7 list-8 list-9;}.ql-editor ol li.ql-indent-7 {counter-increment: list-7;}.ql-editor ol li.ql-indent-7:before {content: counter(list-7, lower-alpha) '. ';}\r\n.ql-editor ol li.ql-indent-7 {counter-reset: list-8 list-9;}.ql-editor ol li.ql-indent-8 {counter-increment: list-8;}.ql-editor ol li.ql-indent-8:before {content: counter(list-8, lower-roman) '. ';}\r\n.ql-editor ol li.ql-indent-8 {counter-reset: list-9;}.ql-editor ol li.ql-indent-9 { counter-increment: list-9;}.ql-editor ol li.ql-indent-9:before {content: counter(list-9, decimal) '. ';}\r\n.ql-editor .ql-indent-1 {padding-left: 3em;}.ql-editor li.ql-indent-1 {padding-left: 4.5em;}.ql-editor .ql-indent-1.ql-direction-rtl.ql-align-right {padding-right: 3em;}\r\n.ql-editor li.ql-indent-1.ql-direction-rtl.ql-align-right {padding-right: 4.5em;}.ql-editor .ql-indent-2 {padding-left: 6em;}.ql-editor li.ql-indent-2 {padding-left: 7.5em;}.ql-editor .ql-indent-2.ql-direction-rtl.ql-align-right {padding-right: 6em;}.ql-editor li.ql-indent-2.ql-direction-rtl.ql-align-right {padding-right: 7.5em;}.ql-editor .ql-indent-3 {padding-left: 9em;}.ql-editor li.ql-indent-3 {padding-left: 10.5em;}.ql-editor .ql-indent-3.ql-direction-rtl.ql-align-right {padding-right: 9em;}.ql-editor li.ql-indent-3.ql-direction-rtl.ql-align-right {padding-right: 10.5em;}.ql-editor .ql-indent-4 {padding-left: 12em;}.ql-editor li.ql-indent-4 { padding-left: 13.5em;}.ql-editor .ql-indent-4.ql-direction-rtl.ql-align-right {padding-right: 12em;}.ql-editor li.ql-indent-4.ql-direction-rtl.ql-align-right {padding-right: 13.5em;}\r\n.ql-editor .ql-indent-5 {padding-left: 15em;}.ql-editor li.ql-indent-5 {padding-left: 16.5em;}.ql-editor .ql-indent-5.ql-direction-rtl.ql-align-right {padding-right: 15em;}.ql-editor li.ql-indent-5.ql-direction-rtl.ql-align-right {padding-right: 16.5em;}.ql-editor .ql-indent-6 {padding-left: 18em;}.ql-editor li.ql-indent-6 {padding-left: 19.5em;}.ql-editor .ql-indent-6.ql-direction-rtl.ql-align-right {padding-right: 18em;}.ql-editor li.ql-indent-6.ql-direction-rtl.ql-align-right {padding-right: 19.5em;}\r\n.ql-editor .ql-indent-7 {padding-left: 21em;}.ql-editor li.ql-indent-7 {padding-left: 22.5em;}\r\n.ql-editor .ql-indent-7.ql-direction-rtl.ql-align-right {padding-right: 21em;}.ql-editor li.ql-indent-7.ql-direction-rtl.ql-align-right {padding-right: 22.5em;}\r\n.ql-editor .ql-indent-8 {padding-left: 24em;}.ql-editor li.ql-indent-8 {padding-left: 25.5em;}.ql-editor .ql-indent-8.ql-direction-rtl.ql-align-right {padding-right: 24em;}\r\n.ql-editor li.ql-indent-8.ql-direction-rtl.ql-align-right {padding-right: 25.5em;}.ql-editor .ql-indent-9 {padding-left: 27em;}.ql-editor li.ql-indent-9 { padding-left: 28.5em;}.ql-editor .ql-indent-9.ql-direction-rtl.ql-align-right {padding-right: 27em;}.ql-editor li.ql-indent-9.ql-direction-rtl.ql-align-right {padding-right: 28.5em;}\r\n.ql-editor .ql-video {display: block;max-width: 100%;}.ql-editor .ql-video.ql-align-center {margin: 0 auto;}.ql-editor .ql-video.ql-align-right {margin: 0 0 0 auto;}\r\n.ql-editor .ql-bg-black {background-color: #000;}.ql-editor .ql-bg-red {background-color: #e60000;}.ql-editor .ql-bg-orange {background-color: #f90;}.ql-editor .ql-bg-yellow {background-color: #ff0;}.ql-editor .ql-bg-green {background-color: #008a00;}.ql-editor .ql-bg-blue {background-color: #06c;}.ql-editor .ql-bg-purple {background-color: #93f;}\r\n.ql-editor .ql-color-white {color: #fff;}.ql-editor .ql-color-red {color: #e60000;}.ql-editor .ql-color-orange {color: #f90;}.ql-editor .ql-color-yellow {color: #ff0;}\r\n.ql-editor .ql-color-green {color: #008a00;}.ql-editor .ql-color-blue {color: #06c;}.ql-editor .ql-color-purple {color: #93f;}.ql-editor .ql-font-serif {font-family: Georgia, Times New Roman, serif;}\r\n.ql-editor .ql-font-monospace {font-family: Monaco, Courier New, monospace;}.ql-editor .ql-size-small {font-size: 0.75em;}.ql-editor .ql-size-large {font-size: 1.5em;}\r\n.ql-editor .ql-size-huge {font-size: 2.5em;}.ql-editor .ql-direction-rtl {direction: rtl;text-align: inherit;}.ql-editor .ql-align-center {text-align: center;}.ql-editor .ql-align-justify {text-align: justify;}\r\n.ql-editor .ql-align-right {text-align: right;}.ql-editor.ql-blank::before {color: rgba(0,0,0,0.6);content: attr(data-placeholder);font-style: italic;left: 15px;pointer-events: none;position: absolute;right: 15px;}\r\n .ql-font-SimSun{font-family:SimSun;}.ql-font-FangSong{font-family:FangSong_GB2312;}.ql-size-erhao{font-size:29px;}.ql-size-sanhao{font-size:21px;}.ql-size-xiaosan{font-size:20px;}\r\n@page {size: 8.5in 11in;margin: 60px;} \r\n.blank {text-indent:2em;}\r\n.clearfloat {clear:both;}\r\n</style>\r\n<title>南平仲裁委员会</title>\r\n<link rel='shortcut icon' href='/olap/dist/favicon.ico'></link>\r\n</head>\r\n<body><div class='wrap'><div class='ql-snow'><div class='ql-editor'><p class=\"ql-align-center\"><span class=\"ql-size-erhao ql-font-SimSun\">南平仲裁委员会</span></p><p class=\"ql-align-center\"><span class=\"ql-size-erhao ql-font-SimSun\">裁决书</span></p><p class=\"ql-align-right\">&#160;<span class=\"ql-size-xiaosan ql-font-FangSong\">(2020)南仲案字第2-0035号</span></p><p class=\"ql-align-center\"><br /></p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;</span>申请人：明浔醉，男，汉，<span class=\"ql-size-xiaosan ql-font-FangSong\">身份证号码：</span>342211199111111112。</p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;住所：</span>天津天津市和平区朝阳大道。</p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;案由：</span>民间借贷纠纷。</p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;</span>被申请人：深圳博泽商业保理有限公司。</p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;法定代表人：</span>王亚楠。</p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;住所：</span>广东省深圳市前海深港合作区前湾一路1号A栋&#160;201室。</p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;南平仲裁委员会</span>（以下简称“本院”）根据申请人深圳博泽商业保理有限公司（以下简称“申请人”）提交的达飞云贷科技（北京）有限公司（以下简称“达飞公司”）与出借人孙磊（以下简称“出借人”）、被申请人*被申请人*（以下简称“被申请人”）于*补充协议签订日期*签订的《补充协议》中约定的仲裁条款及达飞公司、出借人与申请人于*债转日期*签订的《债权转让协议》和申请人的仲裁申请，在纠纷发生后于*立案日期*受理了申请人关于民间借贷纠纷的仲裁申请。</p><p>&#160;&#160;&#160;&#160;根据《北海仲裁委员会/南平仲裁委员会仲裁规则》（以下简称《仲裁规则》）第十三条的规定，本院于*申请人受理发送日期*向申请人的电子邮箱发送了仲裁案件受理通知书、举证通知书、仲裁风险提示书、仲裁权利和义务告知书、诚信仲裁承诺书、关于选定仲裁员和仲裁庭组成方式的函、仲裁文书送达地址确认书、仲裁规则、仲裁员名册；*被申请人受理发送日期*，本院向被申请人的联系方式发送了仲裁案件通知书、仲裁申请书副本及证据、举证通知书、仲裁权利和义务告知书、诚信仲裁承诺书、关于选定仲裁员和仲裁庭组成方式的函、仲裁文书送达地址确认书、仲裁规则、仲裁员名册。申请人于*申请人受理送达日期*接收了上述材料，*被申请人受理送达日期*被申请人邮件被退回，根据《借款协议》关于送达的约定，文书从退回之日起视为送达。在《仲裁规则》规定的期限内，被申请人未向本院提交书面答辩及证据。</p><p>&#160;&#160;&#160;&#160;根据《仲裁规则》第六十条的规定，本案适用简易程序。双方当事人逾期均未选定仲裁员。根据《中华人民共和国仲裁法》（以下简称《仲裁法》）第三十二条、《仲裁规则》第六十一条的规定，本院院长指定自由仲裁员为独任仲裁员。*组庭日期*由自由仲裁员组成本案仲裁庭。本院按照《仲裁规则》的规定于*组庭日期*向双方当事人送达了告知仲裁庭组成通知书、仲裁员接受指定（选定）声明书、开庭通知。在《仲裁规则》规定的期限内，双方当事人均未申请仲裁员回避。</p><p>&#160;&#160;&#160;&#160;仲裁庭于*开庭日期*依法不公开开庭审理本案，申请人的法定代表人王亚楠到庭参加庭审，被申请人经书面通知，无正当理由不到庭，仲裁庭根据《仲裁法》第四十二条第二款的规定，对本案进行缺席审理。</p><p>&#160;&#160;&#160;&#160;申请人在庭审笔录中确认对本案已进行的仲裁程序包括庭前程序及庭审程序均无异议。</p><p>&#160;&#160;&#160;&#160;本案已审理终结，现予以裁决。</p><p class=\"ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;</span>一、&#160;仲裁申请与答辩</p><p>&#160;&#160;&#160;&#160;申请人申请仲裁称：被申请人于*借款日*与出借人孙磊签订了《现金循环贷—借款协议》，约定借款本金总额为*借款本金*，还款时间为*还款到期日*。上述协议签订之后，出借人于*转账日期*向被申请人通过银行转帐方式，实际支付了借款本金共计*借款本金*。之后，被申请人又于*补充协议签订日期*与出借人及服务方达飞云贷科技（北京）有限公司签订了《补充协议》，约定：本协议执行过程中，发生的纠纷，各方应协商解决；如协商不能解决，因本合同引起或者与本合同有关的所有争议，各方均同意提交南平仲裁委员会按现行仲裁规则进行仲裁，仲裁开庭地点在上海，各方同意适用简易程序等明确、具体的争议解决条款；并且明确约定了被申请人*被申请人*的送达地址为*被申请人约定送达地址*，送达电话为*被申请人手机号*。*债转签订日期*，出借人又与申请人及服务方达飞公司签订了《债权转让协议》，申请人依法受让原《借款协议》的全部债权，同时对争议解决条款进行了明确、具体的约定。</p><p>&#160;&#160;&#160;&#160;根据协议的约定，债务应于*还款日*到期，被申请人从*逾期日*起未向申请人履行还款义务。之后，经申请人向被申请人多次催要均未果，申请人认为：被申请人的一系列行为已经构成根本违约，并给申请人造成了经济损失，现申请人向贵委提起仲裁申请，并请求贵委依法裁决。</p><p>&#160;&#160;&#160;&#160;对此申请人提出如下仲裁请求：1、请求裁决被申请人*被申请人*立即偿还尚欠借款本金*借款本金*，并支付尚欠利息*利息+逾期利息*（逾期利息暂计至*逾期利息暂计日*，并继续支付以拖欠的借款本金*借款本金*为基数，按年利率24%计算，至实际履行之日止）2、请求裁决仲裁费由被申请人承担。</p><p>&#160;&#160;&#160;&#160;被申请人未提交书面答辩意见，亦未到庭进行答辩。</p><p class=\"ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;</span>二、&#160;举证与质证</p><p>&#160;&#160;&#160;&#160;申请人围绕自己主张提供的证据有：</p><p>&#160;&#160;&#160;&#160;<span class=\"ql-font-FangSong ql-size-xiaosan\">证据一：The&#160;New&#160;Yorker&#160;–&#160;March&#160;23,&#160;2020-1-38_translation20200324094727,共一份，证明两条路都未经脚印污染。留下一条路等改日再见！</span></p><p><span class=\"ql-font-FangSong ql-size-xiaosan\">但我知道路径延绵无尽头，恐怕我难以再回返。</span></p><p><span class=\"ql-font-FangSong ql-size-xiaosan\">也许多少年后在某个地方，我将轻声叹息将往事回顾：</span></p><p><span class=\"ql-font-FangSong ql-size-xiaosan\">一片树林里分出两条路，而我选择了人迹更少的一条，</span></p><p><span class=\"ql-font-FangSong ql-size-xiaosan\">从此决定了我一生的道路。。</span></p><p><span class=\"ql-font-FangSong ql-size-xiaosan\">证据二：假装是个申请,共一份，证明愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话，能做事的做事，能发声的发声，有一分热，发一分光，就令萤火一般，也可以在黑暗里发一点光，不必等候炬火，此后如竟没有炬火：我便是唯一的光。。</span></p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;被申请人称：</span></p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;直销银行APP操作手册（1</span></p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;被申请人举证如下：</span></p><p><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;&#160;&#160;证据一：假装是个申请,共一份，证明暴风雨结束后，你不会记得自己是怎样活下来的，你甚至不确定暴风雨真的结束了。但有一件事是确定的：当你穿过了暴风雨，你早已不再是原来那个人。。</span></p><p class=\"ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;</span>&#160;三、&#160;事实认定</p><p><span class=\"ql-font-FangSong ql-size-xiaosan\">&#160;&#160;</span>&#160;本案经开庭审理，根据当事人的陈述、举证以及庭审调查情况，仲裁庭查明：</p><p>&#160;&#160;&#160;&#160;*借款协议签订日期*，被申请人与达飞公司签订《借款咨询服务协议》，约定由达飞公司向被申请人提供和平台内出借人双方撮合、信息咨询、信用评估与管理、合同签订、促成双方交易、还款提醒、账户管理、提前还款、还款特殊情况下还款处理、诉讼协助等系列相关咨询服务。《借款咨询服务协议》第五条约定表明，出借人发放借款系通过授权达飞公司或与达飞公司合作的第三方向第三方支付机构或银行金融机构发出支付指令完成。</p><p>&#160;&#160;&#160;&#160;同日，被申请人通过达飞公司运营的“达飞云贷”平台，与出借人签订《借款协议》，借款本金*借款本金*，《借款协议》均约定利率为年化利率为*年利率*，借款期限自*借款开始日*至*还款日*，还款方式为每月还款到期还本。</p><p>&#160;&#160;&#160;&#160;*转账日期*，达飞公司通过金运通支付公司从其金运通账户向被申请人名下的银行账户支付*借款本金*。后被申请人未在协议约定的期限内支付借款利息及本金。</p><p>&#160;&#160;&#160;&#160;*补充协议签订日期*,出借人、被申请人以及达飞公司签订《补充协议》，各方确认了《借款协议》、《借款咨询服务协议》，争议解决条款变更为由南平仲裁委员会仲裁。</p><p>&#160;&#160;&#160;&#160;*债转签订日期*，出借人、达飞公司与申请人签订《债权转让协议》，将本案全部债权转让给申请人。申请人于*债转通知日*以站内信方式通知被申请人债权转让事项。</p><p>&#160;&#160;&#160;&#160;截至提请仲裁之日，被申请人尚欠借款本金*借款本金*，利息*未还利息*及相应逾期利息。</p><p>&#160;&#160;&#160;&#160;直至庭审之日，被申请人仍未按约定偿还上述款项。</p><p class=\"ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;</span>四、&#160;仲裁庭意见</p><p>&#160;&#160;&#160;&#160;根据上述事实，仲裁庭认为：</p><p>&#160;&#160;&#160;&#160;（一）关于合同的效力。</p><p>&#160;&#160;&#160;&#160;达飞公司、出借人与被申请人签订《借款协议》、达飞公司、出借人与申请人签订《债权转让协议》、达飞公司与金运通支付公司签订的《支付服务协议》、达飞公司与中金金融认证中心有限公司签订的《CFCA数字证书合作协议》当事人在协商一致的基础上订立的，是各方的真实意思表示，合同的形式与内容没有违法法律、行政法规的强制性规定，是合法有效的，对各方当事人均具有法律约束力。中金金融认证中心有限公司是经过行政主管部门许可的第三方电子签章供应商，可以通过公开途径查询其资质，故其提供的电子签章服务具有法律效力。</p><p>&#160;&#160;&#160;&#160;本案债权转让事项已由申请人向被申请人的约定送达地址发送通知，应认定对被申请人发生法律效力。</p><p>&#160;&#160;&#160;&#160;达飞公司与被申请人签订的《借款咨询服务协议》中约定，出借人委托达飞公司或与达飞公司合作的第三方向第三方支付机构或银行金融机构发出支付指令完成付款行为。出借人虽不是该协议的签署人，但是其在《补充协议》中确认了《借款咨询服务协议》，应视为对该协议的追认。故《借款咨询服务协议》中出借人委托第三人放款的行为具有法律效力。</p><p>&#160;&#160;&#160;&#160;（二）关于申请人要求被申请人向申请人偿还借款本金*借款本金*的请求。</p><p>&#160;&#160;&#160;&#160;本案中，申请人提供了《借款协议》、《借款咨询服务协议》、《债权转让协议》、代付流水等证据证明申请人委托达飞公司向被申请人支付借款本金。金运通支付公司是中国人民银行许可的第三方支付公司，达飞公司通过其向被申请人支付借款本金的行为，符合法律的规定。被申请人逾期未归还借款本金及利息，被申请人应偿还全部借款本金及拖欠的利息。被申请人未进行抗辩，也未提供相反的证据否定申请人的主张。根据《借款协议》约定，全部借款于*还款日*到期。现申请人请求被申请人偿还借款本金*借款本金*的请求，有事实和法律依据，仲裁庭予以支持。</p><p>&#160;&#160;&#160;&#160;（三）关于申请人要求被申请人支付利息及逾期利息*利息+逾期利息*的仲裁请求。</p><p>&#160;&#160;&#160;&#160;被申请人自*还款日*起未再向申请人履行还款义务的行为已构成违约，按照《借款协议》约定年化利率*年利率*为标准，自*借款开始日*计算至*还款日*借期内未还利息为*未还利息*。《借款协议》中未约定逾期利息的计算标准，参照《最高人民法院关于审理民间借贷案件适用法律若干问题的规定》第二十九条“借贷双方对逾期利率有约定的，从其约定，但以不超过年利率24%为限；约定了借期内的利率但未约定逾期利率，出借人主张借款人自逾期还款之日起按照借期内的利率支付资金占用期间利息的，人民法院应予支持”的规定，现申请人请求按照年利率24%的标准计算逾期利息，超出《借款协议》约定的利率，即年利率*年利率*，故仲裁庭对于超出年化*年利率*的部分不予支持。被申请人应向申请人支付以未还本金*借款本金*为基数，按照年利率*年利率*的标准，自*借款到期日+1日*起计算至实际清偿完毕之日止的逾期利息，逾期利息暂计至*逾期利息暂计日*为*逾期利息*。暂计至*逾期利息暂计日*，利息及逾期利息之和为*利息+逾期利息*，对于超出部分，仲裁庭不予支持。</p><p>&#160;&#160;&#160;&#160;（四）关于申请人要求被申请人支付仲裁费的请求。</p><p>&#160;&#160;&#160;&#160;根据《仲裁规则》第五十七条第一款及第二款的规定，仲裁庭可以在裁决书中确定双方当事人应当承担的仲裁费用，仲裁费用原则上由败诉方承担。本案纠纷系因被申请人违约所致，且申请人的仲裁请求基本得到仲裁庭的支持。因此，仲裁庭对于申请人要求被申请人承担仲裁费的仲裁请求予以支持。</p><p class=\"ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">&#160;&#160;</span>五、&#160;裁决</p><p class=\"ql-align-center\"><br /></p><p>&#160;&#160;&#160;&#160;综上所述，根据《中华人民共和国合同法》第一百零七条、第二百零五条、第二百零六条、第二百零七条之规定，仲裁庭裁决如下：</p><p>&#160;&#160;&#160;&#160;一、被申请人姬云清向申请人深圳博泽商业保理有限公司支付借款本金*借款本金*；</p><p>&#160;&#160;&#160;&#160;二、被申请人姬云清向申请人深圳博泽商业保理有限公司支付利息及逾期利息（以未还本金*借款本金*为基数，按照年化利率*年利率*的计算方式，自*借款开始日*起计至*逾期利息暂计日*止合计*利息+逾期利息*，并继续以未清偿本金为基数，按照年化利率*年利率*的计算方式，自*逾期利息暂计日+1日*起计付至实际清偿完毕之日止）；</p><p>&#160;&#160;&#160;&#160;三、驳回申请人深圳博泽商业保理有限公司的其他仲裁请求；</p><p>&#160;&#160;&#160;&#160;四、本案仲裁费用300元，由被申请人姬云清承担（申请人已预缴该仲裁费，被申请人应迳付给申请人）。</p><p>&#160;&#160;&#160;&#160;以上应由被申请人向申请人支付的款项，被申请人应在本裁决书送达之日起十日内一次性付清。如义务人未能按本裁决指定的期间履行给付金钱的义务，应当依照《中华人民共和国民事诉讼法》第二百五十三条之规定加倍支付迟延履行期间的债务利息。权利人可在本裁决规定的履行期限最后一日起两年内，向有管辖权的人民法院申请强制执行。</p><p><br /></p><p><br /></p><p class=\"ql-indent-6 ql-align-center\"><span class=\"ql-font-FangSong ql-size-xiaosan\">独任仲裁员:自由仲裁员</span></p><p><br /></p><p class=\"ql-indent-6 ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">二</span><span class=\"ql-size-xiaosan ql-font-SimSun\"><span class=\"ql-font-SimSun\">〇</span></span><span class=\"ql-size-xiaosan ql-font-FangSong\">二</span><span class=\"ql-size-xiaosan ql-font-SimSun\"><span class=\"ql-font-SimSun\">〇</span></span><span class=\"ql-size-xiaosan ql-font-FangSong\">年四月十日</span></p><p><br /></p><p class=\"ql-indent-6 ql-align-center\"><span class=\"ql-size-xiaosan ql-font-FangSong\">秘&#160;&#160;书:&#160;创作秘书1</span></p><p class=\"ql-indent-1\"><br /></p></div>\r\n</div>\r\n</div>\r\n</body>\r\n</html>", bTime: '2020-04-11 19:45:00', eTime: '2020-04-11 20:00:00', location: '上海', tribunalType: 1, arbitratorType: null, appArbitratorType: 1, hearRecordContext: null, stopArbStatus: null, defencesState: 2, hearRecordUploadName: null, hearRecordUploadUrl: null }, defencesState: 2, arbitralAgentInfo: null }, 1000).then(res => {
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
      // api.getArbitralInfoDetailBySysAboutJudge({ arbitralId: this.id }).then(res => {
      //   this.$Indicator.close()
      //   if (res.data.code === '1') {
      //     this.arbiInfo = res.data
      //     // eslint-disable-next-line no-prototype-builtins
      //     if (this.arbiInfo.hasOwnProperty('arbitralRecordResponse') && this.arbiInfo.arbitralRecordResponse.arbitralAwardContext) {
      //       // 替换无法被freemarker识别的符号
      //       const htmlString = this.arbiInfo.arbitralRecordResponse.arbitralAwardContext
      //       this.htmlString = htmlString
      //       if (htmlString.indexOf('ql-editor') > -1) {
      //         this.arbitralAwardContext = htmlString.match(/<div class='ql-editor'>([\s\S]*?)<\/div>/)[1].replace(/(&#160;){4,}/g, '&nbsp;&nbsp;&nbsp;&nbsp;')
      //       } else if (htmlString.indexOf('<body>') > -1) {
      //         this.arbitralAwardContext = htmlString.match(/<body>([\s\S]*?)<\/body>/)[1]
      //       } else {
      //         this.arbitralAwardContext = htmlString
      //       }
      //     }
      //     if (!this.arbitralAwardContext) {
      //       this.$Toast({ message: '未查询到裁决书数据' })
      //     }
      //     this.initDataList()
      //   }
      // })
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
            // 1-申请书，2-证据资料，3-其他,  4-被申请人答辩书  5-被申请人答辩证据  6-调解证据  7-管辖权异议申请书  8-管辖权异议证据  9-管辖权异议答辩书  10-管辖权异议答辩证据 11-资料补充
            // if (item.arbitralPtype === 1) {
            //   // item.name = '答辩证据：' + item.name
            //   item.title = '答辩证据资料：'
            // } else if (item.arbitralPtype === 2) {
            //   // item.name = '申请资料：' + item.name
            //   item.title = '申请人证据资料：'
            // }
            item.title = this.getEvidenceProperty(item.evidenceProperty) + ':' + item.evidenceName
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
    getEvidenceProperty (val) {
      // 1-申请书，2-证据资料，3-其他,  4-被申请人答辩书  5-被申请人答辩证据  6-调解证据  7-管辖权异议申请书  8-管辖权异议证据  9-管辖权异议答辩书  10-管辖权异议答辩证据 11-资料补充
      var property = ''
      if (parseInt(val) === 1) {
        property = '申请书'
      } else if (parseInt(val) === 2) {
        property = '证据资料'
      } else if (parseInt(val) === 3) {
        property = '其他'
      } else if (parseInt(val) === 4) {
        property = '被申请人答辩书'
      } else if (parseInt(val) === 5) {
        property = '被申请人答辩证据'
      } else if (parseInt(val) === 6) {
        property = '调解证据'
      } else if (parseInt(val) === 7) {
        property = '管辖权异议申请书'
      } else if (parseInt(val) === 8) {
        property = '管辖权异议证据'
      } else if (parseInt(val) === 9) {
        property = '管辖权异议答辩书'
      } else if (parseInt(val) === 10) {
        property = '管辖权异议答辩证据'
      } else if (parseInt(val) === 11) {
        property = '资料补充'
      } else {
        property = ''
      }
      return property
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
      overflow-y: hidden;
      height:190px;
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
        vertical-align top
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
          word-break: break-all;
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
