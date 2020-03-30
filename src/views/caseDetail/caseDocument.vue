<template>
<div class="tabItem">
  <transition name="fade">
    <div v-if="loading">
      <van-skeleton title :row="10" />
    </div>
    <div v-else>
      <div v-for="(item,index) in documents" :key="index">
        <h3 class="title">{{getProcessName(item.documentType)}}送达流程</h3>
        <div  v-for="(value,inde) in item.list" :key="inde">
          <div class="documentsList">
            <div>{{value.fileName}}</div>
            <div class="edit" @click="seeinfo(value,item.documentType)">查看</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
  <div v-if="show" class="popBox">
    <div class="close" @click="close">
      <span class="icon iconfont iconzhongcai_tuichu"></span>
    </div>
    <div class="documents">
        <div>
          <p class="title">文书送达详情</p>
          <p class="documentsName">
            <span>文书名称：</span>
            <span>{{detalis.fileName}}</span>
          </p>
          <p class="documentsName">
            <span>送达流程：</span>
            <span>{{getProcessName(documentTypeName)}}</span>
          </p>
        </div>
        <div class="documentsObj">
          <van-tabs v-model="active" @click="onClick">
             <van-tab v-for="(val,index) in detalis.list" :key="index" :title="val.userType === 1 ? '被申请人' : val.userType === 2 ? '申请人' : '仲裁员'">
            </van-tab>
            </van-tabs>
        </div>
        <div >
          <div>
            <p class="title">邮件送达</p>
            <p class="documentsName">
              <span>送达地址：</span>
              <span>{{wsobj.emailAddress}}</span>
            </p>
            <p class="documentsName">
              <span>送达时间：</span>
              <span>{{wsobj.documentArrivedTime}}</span>
            </p>
          </div>
          <div class="line"></div>
          <div>
            <p class="title">邮递送达</p>
            <p class="documentsName">
              <span>送达地址：</span>
              <span>{{wsobj.expressAddress}}</span>
              </p>
              <p class="documentsName">
              <span>快递单号：</span>
              <span>{{wsobj.expressNumber}}</span>
              </p>
              <p class="documentsName">
              <span>送达时间：</span>
              <span>{{wsobj.expressTime}}</span>
              </p>
          </div>
          <div class="line"></div>
          <div>
            <p class="title">短信送达</p>
            <p class="documentsName">
              <span>送达地址：</span>
              <span>{{wsobj.userPhone}}</span>
            </p>
            <p class="documentsName">
              <span>送达时间：</span>
              <span>{{wsobj.documentMessageArrivedTime}}</span>
            </p>
          </div>
        </div>
    </div>
  </div>
 <van-overlay :show="show" />
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
      documents: [],
      list: [],
      show: false,
      detalis: [],
      documentTypeName: '0',
      wsobj: {
        wslist: []
      },
      active: 0,
      loading: true
    }
  },
  created () {
    this.queryDocuments()
  },
  methods: {
    getProcessName (documentType) {
      switch (documentType) {
        case '1':
          return '申请'
        case '2':
          return '立案'
        case '3':
          return '组庭'
        case '4':
          return '组庭'
        case '5':
          return '组庭'
        case '6':
          return '裁决'
        case '7':
          return '审核管辖权'
        case '8':
          return ''
        case '9':
          return ''
        case '10':
          return '管辖权异议'
        case '11':
          return '管辖权异议'
        case '12':
          return '管辖权异议'
        case '13':
          return '结案'
        case '14':
          return '管辖权异议'
        default:
          return ''
      }
    },
    getFiletName (documentName) {
      const start = documentName.lastIndexOf('.') ? documentName.lastIndexOf('.') : 0
      const end = documentName.lastIndexOf('-') ? documentName.lastIndexOf('-') + 1 : documentName.length
      return documentName.substring(start, end)
    },
    close () {
      this.show = false
    },
    seeinfo (val, documentType) { // 查看案件文书
      console.log(val)
      this.wsobj = {}
      this.show = true
      this.documentTypeName = documentType
      this.detalis = val
      this.active = 0
      const result = this.detalis.list.find(ele => ele.userType === this.detalis.list[0].userType)
      this.getData(result)
    },
    getData (val) {
      if (val.documentArrivedState === 1) {
        this.wsobj.arrivedType = '邮件送达'
        this.wsobj.emailAddress = val.userEmail
        this.wsobj.documentArrivedTime = val.documentArrivedTime || ''
      }
      if (val.arbitralExpressRecordId) {
        this.wsobj.arrivedType += (val.arrivedType ? ' / 线下邮递' : '线下邮递')
        this.wsobj.emailornumber += (val.emailornumber ? (' / ' + val.expressNumber) : val.expressNumber)
        if (val.arrivedTime) {
          this.wsobj.time += ' / ' + val.arrivedTime
        } else if (val.time) {
          this.wsobj.time += ' / '
        }
      }
    },
    onClick (name, title) {
      let index = ''
      if (title === '被申请人') {
        index = 1
      } else if (title === '申请人') {
        index = 2
      } else if (title === '仲裁员') {
        index = 3
      }
      this.wsobj = {}
      const result = this.detalis.list.find(ele => ele.userType === index)
      this.getData(result)
    },
    queryDocuments () {
      // 文书
      api.queryArbitralDocumentBatch(this.caseDocumentInfo).then((res) => {
        this.loading = false
        if (res.data.code === '1') {
          this.list = res.data.data
          var arr = []
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].fileName = this.getFiletName(this.list[i].documentName)
            if (i === 0) {
              var obj = { list: [{ fileName: '', list: [] }], documentType: this.list[0].documentType }
              obj.list[0].fileName = this.list[0].fileName
              obj.list[0].list.push(this.list[0])
              arr.push(obj)
            } else {
              const leng = arr.length
              console.log(length)
              for (let j = 0; j < leng; j++) {
                if (this.list[i].documentType === arr[j].documentType) {
                  const len = arr[j].list.length
                  for (let k = 0; k < len; k++) {
                    if (this.list[i].fileName === arr[j].list[k].fileName) {
                      arr[j].list[k].list.push(this.list[i])
                      break
                    } else if (this.list[i].fileName !== arr[j].list[k].fileName && k === len - 1) {
                      var ob = { fileName: this.list[i].fileName, list: [] }
                      ob.list.push(this.list[i])
                      arr[j].list.push(ob)
                      break
                    }
                  }
                } else if (this.list[i].documentType !== arr[j].documentType && j === leng - 1) {
                  var o = { list: [{ fileName: '', list: [] }], documentType: this.list[i].documentType }
                  o.list[0].fileName = this.list[i].fileName
                  o.list[0].list.push(this.list[i])
                  arr.push(o)
                }
              }
            }
          }
          console.log(arr)
          this.documents = arr
        }
      })
    }
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
  h3.title:before
    content: "";
    display inline-block
    width:4px;
    height:16px;
    background-color:#1890FF;
    border-radius:1px;
    vertical-align:text-top;
    margin-right:8px;
.documentsList
    padding 7px 0
    color #24272B
    font-size 15px
    display:flex;
    justify-content:space-between
    .edit
      color #1890FF
.documents
  padding 20px 14px
  background #ffffff
  margin-top 36px
  height: 90%;
  overflow: scroll;
  p
    margin 10px 0
  .title
    color #000000
    font-size 16px
  .documentsName
    font-size 15px
    span:nth-child(1)
      color #000000
    span:nth-child(2)
      color #727272
  .documentsObj
    color #198AFF
    margin 30px 0
    text-align center
    line-height 40px
 .popBox {
    display: block;
    background-color: #FFFFFF;
    z-index: 99999;
    width: 90%;
    height: 92%;
    position:fixed;
    top:14px;
    right:14px;
    left:14px;
    bottom:0;
    margin:auto;
}
.van-overlay{
  z-index 9999
  opacity 0.7
}
.line
  height 1px
  background #D3DFEF
.close
  position: absolute;
  right: 10px;
  top: 10px;
  color #CCCCCC
  font-size 20px
>>>[class*=van-hairline]::after{
  border none
  }
>>>.van-tab{
  flex none
}
</style>
