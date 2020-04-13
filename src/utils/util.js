import { Pdf, Word } from '@/const/img'
import DICT from '@/const/dict'
import { api } from '@/utils/api'

const util = {
  uuidfn () { // uuid
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    var uuid = s.join('')
    return uuid
  },
  getFileIcon (name) { // 得到文件类选图标
    var iconClass = ''
    var lastName = name.substring(name.lastIndexOf('.')).toLowerCase()
    if (lastName === '.pdf') {
      iconClass = 'iconzhongcai_pdf'
    } else if (lastName === '.doc' || lastName === '.docx') {
      iconClass = 'iconzhongcai_word'
    } else if (lastName === '.png' || lastName === '.jpg' || lastName === '.jpeg') {
      iconClass = 'iconzhongcai_tupian'
    } else {
      iconClass = ''
    }
    return iconClass
  },
  getIcon (name) { // 得到文件类选图标
    var url = ''
    var lastName = name.substring(name.lastIndexOf('.')).toLowerCase()
    if (lastName === '.pdf') {
      url = Pdf
    } else {
      url = Word
    }
    return url
  },
  subtr (arg1, arg2) { // 小数计算
    var r1, r2, m, n
    try {
      r1 = arg1.toString().split('.')[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split('.')[1].length
    } catch (e) {
      r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    n = (r1 >= r2) ? r1 : r2
    return ((arg1 * m - arg2 * m) / m).toFixed(n)
  },
  exchangeIndex (num) { // 数字转换汉字
    num = '' + num
    if (num.length > 2) {
      return num
    }
    var china = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
    var arr = []
    var english = num.split('')
    for (var i = 0; i < english.length; i++) {
      arr[i] = china[english[i]]
    }
    if (arr.length > 1) {
      arr.splice(1, 0, '十')
      if (arr[0] === '一') {
        arr.splice(0, 1)
      }
      if (arr[arr.length - 1] === '零') {
        arr.splice(arr.length - 1, 1)
      }
    }
    return arr.join('')
  },
  getStatus (arbStatus) {
    let status = ''
    const arr = DICT.arbStatus
    for (let i = 0, len = arr.length; i < len; i++) {
      const a = arr[i].value.split(',')
      arbStatus = '' + arbStatus
      if (a.indexOf(arbStatus) > -1) {
        status = arr[i].label
        break
      }
    }
    return status
  },
  formatTime (date, fmt) { // author: meizz
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    }
    return fmt
  },
  prefixInteger (num, length) { // 设置前缀0
    return (Array(length).join('0') + num).slice(-length)
  },
  // 格式化数字为金额：每三位加逗号
  toThousands (number) {
    let num = (number || 0).toString()
    let result = ''
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result
      num = num.slice(0, num.length - 3)
    }
    if (num) {
      result = num + result
    }
    return result
  },
  encodeHTML (str) {
    if (typeof str === 'string') {
      return str.replace(/\n/g, '<br />')
    } else return ''
  },
  decodeTEXT (str) {
    if (typeof str === 'string') {
      return str.replace(/<br \/>/g, '\n')
    } else return ''
  },
  greeting (name) {
    const myDate = new Date()
    const ngeHour = myDate.getHours()
    let warmprompt = ''
    if (ngeHour === 0) {
      warmprompt = '现在已经过凌晨了，身体是无价的资本喔，小伙伴早点休息吧！'
    }
    if (ngeHour === 1) {
      warmprompt = '凌晨1点多了，工作是永远都做不完的，小伙伴别熬坏身子！'
    }
    if (ngeHour === 2) {
      warmprompt = '亲爱的小伙伴该休息了，身体可是革命的本钱啊！'
    }
    if (ngeHour === 3) {
      warmprompt = '夜深了，熬夜很容易导致身体内分泌失调，长痘痘的！'
    }
    if (ngeHour === 4) {
      warmprompt = '四点过了额(⊙o⊙)…，你明天不学习工作吗？？？'
    }
    if (ngeHour === 5) {
      warmprompt = '你知道吗，此时是国内网络速度最快的时候！'
    }
    if (ngeHour === 6) {
      warmprompt = '清晨好，这么早就来网站啦，谢谢小伙伴的关注哦，昨晚做的梦好吗？'
    }
    if (ngeHour === 7) {
      warmprompt = '新的一天又开始了，祝你过得快乐！'
    }
    if (ngeHour === 8) {
      warmprompt = '小伙伴早上好哦，一天之际在于晨，又是美好的一天！'
    }
    if ((ngeHour === 9) || (ngeHour === 10)) {
      warmprompt = '上午好！今天你看上去好精神哦！'
    }
    if ((ngeHour === 11) || (ngeHour === 12)) {
      warmprompt = '小伙伴啊！该吃午饭啦！有什么好吃的？您有中午休息的好习惯吗？'
    }
    if ((ngeHour >= 13) && (ngeHour <= 17)) {
      warmprompt = '下午好！外面的天气好吗？记得朵朵白云曾捎来朋友殷殷的祝福。'
    }
    if ((ngeHour >= 17) && (ngeHour <= 18)) {
      warmprompt = '太阳落山了！快看看夕阳吧！如果外面下雨，就不必了 ^_^ '
    }
    if ((ngeHour >= 18) && (ngeHour <= 19)) {
      warmprompt = '晚上好，小伙伴今天的心情怎么样？去留言板诉说一下吧！'
    }
    if ((ngeHour >= 19) && (ngeHour <= 21)) {
      warmprompt = '忙碌了一天，累了吧？去看看最新的新闻资讯醒醒脑吧！'
    }
    if ((ngeHour >= 22) && (ngeHour <= 23)) {
      warmprompt = '这么晚了，小伙伴还在上网？早点洗洗睡吧，睡前记得洗洗脸喔！明天一天都会萌萌哒！'
    }
    return warmprompt
  },
  formatEmailData (data) {
    const obj = {}
    const array = []
    data.forEach(item => {
      if (obj[item.arbNumber + item.userName] === undefined) {
        const roleName = item.userType === 1 ? '被申请人' : item.userType === 2 ? '申请人' : '仲裁员'
        obj[item.arbNumber + item.userName] = {
          arbNumber: item.arbNumber,
          userName: item.userName,
          roleName: roleName,
          userEmail: item.userEmail,
          documents: [],
          checkList: [],
          oldCheckList: [],
          arbitralInfoId: item.arbitralInfoId
        }
      }
      item.previewUrl = api.getPdfURL(item.restartUpaloadUrl || item.documentSignatureUrlDes || item.documentGeneratorUrlDes)
      item.url = api.getPdfURL(item.documentGeneratorUrlDes)
      const line = obj[item.arbNumber + item.userName]

      // if (item.isUpload === 1 && !item.documentSignatureUrlDes && item.documentName.indexOf('接受指定') > -1) {
      // if (item.isUpload === 1 && !item.documentSignatureUrlDes) {
      //   item.updateTime = '暂无'
      //   item.disabled = true
      // }
      item.unSend = true
      if (item.documentArrivedState === 1 || item.documentArrivedType === 3) {
        item.unSend = false
      } else {
        if (item.isSend === 1) {
          item.disabled = true
          line.checkList.push(item.arbitralDocumentId)
        }
      }
      line.documents.push(item)
    })
    for (const key in obj) {
      array.push(obj[key])
    }
    return array
  },
  sortfn (val, item, _this) {
    if (val.order === 'descending') {
      _this.$refs.datalist.paramsFilter[item] = 2
    } else if (val.order === 'ascending') {
      _this.$refs.datalist.paramsFilter[item] = 1
    } else {
      _this.$refs.datalist.paramsFilter[item] = ''
    }
    if (_this.$refs.datalist.paramsFilter.arbName) {
      if (Array.isArray(_this.$refs.datalist.paramsFilter.arbName)) {
        _this.$refs.datalist.paramsFilter.arbName = _this.$refs.datalist.paramsFilter.arbName[_this.$refs.datalist.paramsFilter.arbName.length - 1]
      }
    }
    console.log(_this.$route.query.pageNo, '_this.$route.query.pageNo')
    _this.$refs.datalist.paramsFilter.pageNo = _this.$route.query.pageNo || 1
    _this.$refs.datalist.paramsFilter.pageSize = _this.$route.query.pageSize || 10
    _this.getLists(_this.$refs.datalist.paramsFilter)
  },

  // 排序-动态方法
  sortList (column, params, _this, functionName) {
    // 置空原有排序-2.1需求 只保留一种排序
    delete params.sortArbNumber
    delete params.sortCreateTime
    delete params.sortUpdateTime
    let keyName = ''
    if (column.prop === 'code' || (column.prop.indexOf('Number') !== -1 && column.prop.indexOf('arb') !== -1)) {
      // 参数名-案件编号排序
      keyName = 'sortArbNumber'
    } else if (column.prop === 'createTime') {
      // 参数名-创建时间排序
      keyName = 'sortCreateTime'
    } else if (column.prop === 'updateTime') {
      // 参数名-更新时间排序
      keyName = 'sortUpdateTime'
    }
    // 重新赋值排序
    _this.formInline = Object.assign({}, params, {
      [keyName]: column.order === 'descending' ? 1 : column.order === 'ascending' ? 2 : ''
    })
    // 执行传入方法
    functionName()
  }
}

export default util
