<template>
  <div>
    <div class="caseData content">
      <div class="caseDataPieTitle">企业案件占比</div>
      <div id="echartspercent" style="width:100%;height:273px;"></div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { api } from '@/utils/api'

export default {
  data () {
    return {
    }
  },
  methods: {
    setEchartsPie (data) {
      var myChart = echarts.init(document.getElementById('echartspercent'))

      const dataName = []
      let total = 0
      data.forEach((res) => {
        dataName.push(res.name)
        total += parseFloat(res.value) * 10000
      })
      total = total / 10000
      const option = {
        title: {
          zlevel: 0,
          text: [
            '{value|' + total + '}', '{name|案件总数}'
          ].join('\n'),
          rich: {
            value: {
              color: '#303133',
              fontSize: 40,
              fontWeight: 'bold',
              lineHeight: 40
            },
            name: {
              color: '#909399',
              lineHeight: 20
            }
          },
          top: 'center',
          left: '50%',
          textAlign: 'center',
          textStyle: {
            rich: {
              value: {
                color: '#1890FF',
                fontSize: 29,
                lineHeight: 35
              },
              name: {
                color: '#9B9B9B',
                lineHeight: 20,
                fontSize: 14

              }
            }
          }
        },
        gread: {
          height: '66%'
        },
        // tooltip: { // 悬停指示
        //   trigger: 'item',
        //   formatter: '{b}: {c}'
        //   // formatter: '{b}: {c} ({d}%)'
        // },
        tooltip: {
          trigger: 'item',
          formatter: function (data) {
            // console.log(data)
            // var dates = ''; var dated = new Date()
            // if (_this.type == 1) {
            //   dates = dated.getFullYear() + '-' + (data[0].name >= 10 ? data[0].name : '0' + data[0].name)
            // } else if (_this.type == 2) {
            //   dates = dated.getFullYear() + '-' + (dated.getMonth() + 1) + '-' + (data[0].name >= 10 ? data[0].name : '0' + data[0].name)
            // } else {
            //   dates = data[0].name
            // }
            return data.marker + data.data.name + '<br />' + '<span style="float:left;margin:10px 0 0 15px;font-size:16px;">' + data.data.value + '件' + '</span>'
          },
          extraCssText: 'color:#000000;background:#FFFFFF;box-shadow:0px 3px 6px rgba(0,0,0,0.16);opacity:0.95;border-radius:5px;font-size:12px;padding:5px;'
        },
        // legend: {
        //   itemHeight: 8,
        //   itemWidth: 8,
        //   orient: 'vertical',
        //   x: '30%',
        //   y: '30',
        //   icon: 'circle',
        //   data: dataName,
        //   formatter: function (name) {
        //     // 获取legend显示内容

        //     const data = option.series[0].data
        //     let total = 0
        //     let tarValue = 0
        //     for (let i = 0, l = data.length; i < l; i++) {
        //       total += data[i].value
        //       if (data[i].name == name) {
        //         tarValue = data[i].value
        //       }
        //     }
        //     const p = (tarValue / total * 100).toFixed(2)
        //     return '{a|' + name.substr(0, 19) + '}' + '{b|  ' + p + '%  ' + '}' + '{d| |}' + '{c|' + tarValue + '件}'
        //   },
        //   textStyle: {

        //     rich: {
        //       a: {
        //         fontSize: 14,
        //         align: 'left',
        //         width: 270,
        //         height: 32

        //       },
        //       b: {
        //         fontSize: 14,
        //         width: 60,
        //         padding: [0, 5, 0, 5]
        //       },
        //       c: {
        //         fontSize: 14

        //       },
        //       d: {
        //         fontSize: 14,
        //         padding: [0, 5, 0, 0]

        //       }
        //     }

        //   }

        // },

        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['51%', '71%'],
            center: ['50%', '50%'],
            stillShowZeroSum: false,
            avoidLabelOverlap: false,
            zlevel: 1,
            label: {
              normal: {
                padding: [30, 30, 30, 30],
                backgroundColor: '#fff',
                show: false,
                position: 'center',
                formatter: [
                  '{name|{b}}',
                  '{value|{c}}'

                ].join('\n'),
                rich: {
                  value: {
                    color: '#303133',
                    fontSize: 40,
                    fontWeight: 'bold',
                    lineHeight: 40
                  },
                  name: {
                    color: '#909399',
                    lineHeight: 20,
                    fontSize: 16
                  }
                }
              }

            },
            data: data
          }
        ],
        color: ['#4090f8', '#72c040', '#f5da4d', '#df5567', '#8f66de', '#59c0c0', '#ec913a', '#CEDBFB']
      }
      myChart.setOption(option)
    },
    getData () {
      api.getCompanyArbProportion({}).then(res => {
        if (res.data.code === '1') {
          var arr = []
          res.data.list.map(el => {
            arr.push({ value: +el.arbCount, name: el.name })
          })
          this.setEchartsPie(arr)
        }
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
<style lang="stylus" scoped>
.caseData
  margin-top:14px;
  border-radius:5px;
  background-color:#FFFFFF;
  box-shadow:0px 3px 6px rgba(0,0,0,0.16);
  padding-top:21px;
  .caseDataPieTitle
    height:25px;
    font-size:18px;
    line-height:25px;
    color:#4A4A4A;
</style>
