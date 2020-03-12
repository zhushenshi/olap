import moment from 'moment'
export default {
  // 格式化时间
  formatDate: value => {
    let date = ''
    if (value) date = moment(value).format('YYYY-MM-DD')
    return date
  },
  formatHour: value => {
    let date = ''
    if (value) date = moment(value).format('YYYY-MM-DD HH:mm:ss')
    return date
  },
  formatMinute: value => {
    let date = ''
    if (value) date = moment(value).format('YYYY-MM-DD HH:mm')
    return date
  },
  formatSex: value => {
    let sex = ''
    if (value === '1') sex = '男'
    else if (value === '2') sex = '女'
    return sex
  },
  toMoney: value => {
    let num = 0
    let result = ''
    value = Number(value || 0).toFixed(2)
    const arr = value.toString().split('.')
    if (arr[0]) {
      num = arr[0].toString().replace(/\D/g, '')
      while (num.length > 3) {
        result = ',' + num.slice(-3) + result
        num = num.slice(0, num.length - 3)
      }
      if (num) {
        result = num + result
      }
    }
    return result + '.' + arr[1] || 0.00
  },
  toThousands: value => {
    let num = 0
    let result = ''
    if (value) {
      num = value.toString().replace(/\D/g, '')
    }
    while (num.length > 3) {
      result = ',' + num.slice(-3) + result
      num = num.slice(0, num.length - 3)
    }
    if (num) {
      result = num + result
    }
    return result || 0
  },
  money: val => {
    var regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
    if (val != '' && val) {
      return parseFloat(('' + val).replace(/,/g, ''))
        .toFixed(2)
        .replace(regExpInfo, '$1,')
    } else {
      return 0
    }
  },
  userTypeFilter: value => {
    let type = ''
    if (value === 1) type = '被申请人'
    else if (value === 2) type = '申请人'
    else if (value === 3) type = '仲裁员'
    return type
  },
  arbstatus: val => {
    let state = ''
    const arr = [
      { value: [10, 11, 12], label: '申请' },
      { value: [20, 21], label: '立案' },
      { value: [30], label: '答辩' },
      { value: [41, 42], label: '组庭' },
      { value: [51, 53], label: '审理' },
      { value: [52, 54, 60, 61, 62, 63, 64], label: '裁决' },
      { value: [70, 71], label: '结案' }
    ]
    arr.map(el => {
      if (el.value.filter(ele => ele == val).length > 0) {
        state = el.label
      }
    })
    return state || val
  }
}

// export function toThousandslsFilter (num) {
//   return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
// }
