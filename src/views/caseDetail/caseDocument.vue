<template>
<div class="tabItem">
  <div v-for="(item,index) in documents" :key="index">
    <h3>{{getProcessName(item.documentType)}}送达流程</h3>
    <div  v-for="(value,inde) in item.list" :key="inde">
      <div class="documentsList">
        <div>{{value.fileName}}</div>
        <div class="edit" @click="seeinfo(value)">查看</div>
      </div>
    </div>
  </div>
  <div v-if="show" class="popBox">
    <div class="close" @click="close">
      <span class="icon iconfont iconzhongcai_tuichu"></span>
    </div>
    <div class="documents">
        <div>
          <p class="title">文书送达详情</p>
          <p class="documentsName">
            <span>文书名称：</span>
            <span>{{wsobj.documentName}}</span>
          </p>
          <p class="documentsName">
            <span>送达流程：</span>
            <span>{{wsobj.arbitralStatus}}</span>
          </p>
        </div>
        <div class="documentsObj" v-for="(ite,ind) in wsobj.list" :key="'i'+ind">
          <span v-if="ite.userType == 1">申请人</span>
          <span v-else-if="ite.userType == 2">被申请人</span>
          <span v-else>仲裁员</span>
        </div>
        <div v-for="(ite,ind) in wsobj.list" :key="'i'+ind">
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
      wsobj: {
        wslist: []
      }
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
    getStatus (documentType) {
      switch (documentType) {
        case '1':
          return '缴费通知书'
        case '2':
          return '立案通知书'
        case '3':
          return '仲裁员通知书'
        case '4':
          return '组庭开庭通知书'
        case '5':
          return '开庭笔录'
        case '6':
          return '裁决书'
        case '7':
          return '不予受理通知书'
        case '8':
          return '调解书'
        case '9':
          return '调解笔录'
        case '10':
          return '管辖权异议申请书'
        case '11':
          return '管辖权异议申请附件'
        case '12':
          return '管辖权异议决定书'
        case '13':
          return '委托执行书'
        case '14':
          return '管辖权异议资料'
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
    seeinfo (val) { // 查看案件文书
      this.show = true
      this.wsobj = val

      console.log(val)
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
    queryDocuments () {
      // 文书
      api.queryArbitralDocumentBatch(this.caseDocumentInfo).then((res) => {
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
          // for (let i = 0; i < this.list.length; i++) {
          //   this.list[i].fileName = this.getFiletName(this.list[i].documentName)
          //   if (i === 0) {
          //     var obj = { list: [{ fileName: '', list: [] }], documentType: this.list[0].documentType }
          //     obj.list[0].fileName = this.list[0].fileName
          //     obj.list[0].list.push(this.list[0])
          //     arr.push(obj)
          //     console.log(arr)
          //   } else {
          //     var length = arr.length
          //     for (let j = 0; j < length; j++) {
          //       if (this.list[i].documentType === arr[j].documentType) {
          //         const len = arr[j].list.length
          //         for (let k = 0; k < len; k++) {
          //           if (this.list[i].fileName === arr[j].list[k].fileName) {
          //             arr[j].list[k].list.push(this.list[i])
          //           } else if (this.list[i].fileName !== arr[j].list[k].fileName && k === len - 1) {
          //             var ob = { fileName: this.list[i].fileName, list: [] }
          //             ob.list.push(this.list[i])
          //             arr[j].list.push(ob)
          //           }
          //         }
          //       } else if (this.list[i].documentType !== arr[j].documentType && j === length - 1) {
          //         var o = { list: [{ fileName: '', list: [] }], documentType: this.list[i].documentType }
          //         o.list[0].fileName = this.list[i].fileName
          //         o.list[0].list.push(this.list[i])
          //         arr.push(o)
          //         console.log(arr)
          //       }
          //     }
          //   }
          // }
          // for (let i = 0; i < this.list.length; i++) {
          //   if (i === 0) {
          //     var obj = { }
          //     obj.list = []
          //     obj.documentType = this.list[0].documentType
          //     obj.list.push(this.list[0])
          //     arr.push(obj)
          //   } else {
          //     var length = arr.length
          //     for (let j = 0; j < length; j++) {
          //       if (this.list[i].documentType === arr[j].documentType) {
          //         arr[j].list.push(this.list[i])
          //         break
          //       } else if (this.list[i].documentType !== arr[j].documentType && j === length - 1) {
          //         var ob = { }
          //         ob.list = []
          //         ob.documentType = this.list[i].documentType
          //         ob.list.push(this.list[i])
          //         arr.push(ob)
          //         break
          //       }
          //     }
          //   }
          // }
          console.log(arr)
          this.documents = arr
          // res.data.data.forEach(item => {
          //   if (this.endName !== 'user' || (this.endName === 'user' && item.documentArrivedType)) {
          //     item.arrivedType = ''
          //     item.emailornumber = ''
          //     item.time = ''
          //     if (item.documentArrivedState === 1) {
          //       item.arrivedType = '邮件送达'
          //       item.emailornumber = item.userEmail
          //       item.time = item.documentArrivedTime || ''
          //     }
          //     if (item.arbitralExpressRecordId) {
          //       item.arrivedType += (item.arrivedType ? ' / 线下邮递' : '线下邮递')
          //       item.emailornumber += (item.emailornumber ? (' / ' + item.expressNumber) : item.expressNumber)
          //       if (item.arrivedTime) {
          //         item.time += ' / ' + item.arrivedTime
          //       } else if (item.time) {
          //         item.time += ' / '
          //       }
          //     }
          //     data.push(item)
          //   }
          // })
          // this.documents = data
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
  h3:before
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
    border-bottom 2px solid #198AFF
    width 20%
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
</style>
