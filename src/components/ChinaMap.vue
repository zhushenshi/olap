<template>
    <div >
    <div style="background:#fff;" >
           <div id="chinamap"></div>
        </div>

    </div>

</template>

<script>

import 'echarts/map/js/china.js'
var echarts = require('echarts')

export default {
  name: 'Msg',
  props: {
    inRangeMax: {
      type: Number,
      default: 100
    },
    chinajson: {
      type: Array,
      default () {
        return [{ name: '南海诸岛', value: 0 },
          { name: '北京', value: 0 },
          { name: '天津', value: 0 },
          { name: '上海', value: 0 },
          { name: '重庆', value: 0 },
          { name: '河北', value: 0 },
          { name: '河南', value: 0 },
          { name: '云南', value: 0 },
          { name: '辽宁', value: 0 },
          { name: '黑龙江', value: 0 },
          { name: '湖南', value: 0 },
          { name: '安徽', value: 0 },
          { name: '山东', value: 0 },
          { name: '新疆', value: 0 },
          { name: '江苏', value: 0 },
          { name: '浙江', value: 0 },
          { name: '江西', value: 0 },
          { name: '湖北', value: 0 },
          { name: '广西', value: 0 },
          { name: '甘肃', value: 0 },
          { name: '山西', value: 0 },
          { name: '内蒙古', value: 0 },
          { name: '陕西', value: 0 },
          { name: '吉林', value: 0 },
          { name: '福建', value: 0 },
          { name: '贵州', value: 0 },
          { name: '广东', value: 0 },
          { name: '青海', value: 0 },
          { name: '西藏', value: 0 },
          { name: '四川', value: 0 },
          { name: '宁夏', value: 0 },
          { name: '海南', value: 0 },
          { name: '台湾', value: 0 },
          { name: '香港', value: 0 },
          { name: '澳门', value: 0 }]
      }

    },
    mapconfigprop: {
      type: Object,
      default () {
        return {
          zoom: 1,
          roam: false,
          areaColor: '#877df2', // 选择区域的颜色
          inRangeColor: ['#e7e9f0', '#567ffd'], // 取值范围的颜色
          inRangeMin: 0, // 取值范围最小值
          inRangeMax: 500 // 取值范围最大值

        }
      }
    }
  },
  watch: {
    chinajson: {
      handler (val) {
        if (val.some(el => el.name === '安徽')) {
          console.log(val, 'chin')
          this.getMapJson(val)
          this.chinadata = JSON.parse(JSON.stringify(val))
        } else {
          this.loadmap(this.selected, this.getChinaMap, val)
        }
      },
      deep: true
    },
    mapconfigprop: {
      handler (val) {
        this.mapconfig = Object.assign(this.mapconfig, val)
        this.mapconfig.inRangeMax = this.inRangeMax
      },
      immediate: true, // 很重要！！！

      deep: true

    }

  },

  data () {
    return {
      provinces: ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin', 'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan', 'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang', 'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing', 'xianggang', 'aomen', 'taiwan'],
      provincesText: ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'],
      selected: 'china',
      chinaMapEcharts: '',
      prvaluse: [],
      chinadata: [],
      mapconfig: {
        zoom: 1.23,
        roam: false,
        areaColor: '#F3B329', // 选择区域的颜色
        inRangeColor: ['#e7e9f0', '#567ffd'], // 取值范围的颜色
        inRangeMin: 0, // 取值范围最小值
        inRangeMax: 200 // 取值范围最大值
      }
    }
  },

  methods: {
    getChinaMap (param, arr) {
      var dataList = arr
      this.chinaMapEcharts = echarts.init(document.getElementById('chinamap'))
      // var _this = this
      var option = {
        toolbox: {
          padding: 60,
          left: 10,
          show: true,
          // feature : {
          //     mark : {show: true},
          //     myTool2:{//自定义按钮 danielinbiti,这里增加，selfbuttons可以随便取名字
          //         show:true,//是否显示
          //         title:'返回全国数据', //鼠标移动上去显示的文字
          //         icon:'path://M525.4 721.2H330.9c-9 0-18.5-7.7-18.5-18.1V311c0-9 9.3-18.1 18.5-18.1h336.6c9.3 0 18.5 9.1 18.5 18.1v232.7c0 6 8.8 12.1 15 12.1 6.2 0 15-6 15-12.1V311c0-25.6-25.3-48.9-50.1-48.9h-335c-26.2 0-50.1 23.3-50.1 48.9v389.1c0 36.3 20 51.5 50.1 51.5h197.6c6.2 0 9.3-7.5 9.3-15.1 0-6-6.2-15.3-12.4-15.3zM378.8 580.6c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h141.4c6.2 0 12.3-5.8 12.3-13.4 0.3-9.5-6.2-15.9-12.3-15.9H378.8z m251.6-91.2c0-6-6.2-14.6-12.3-14.6H375.7c-6.2 0-12.4 8.6-12.4 14.6s6.2 14.6 12.4 14.6h240.8c6.2 0.1 13.9-8.5 13.9-14.6z m-9.2-120.5H378.8c-6.2 0-12.3 8.6-12.3 14.6s6.2 14.6 12.3 14.6h240.8c7.7 0 13.9-8.6 13.9-14.6s-6.2-14.6-12.3-14.6z m119.4 376.6L709 714.1c9.2-12 14.6-27 14.6-43.2 0-39.4-32.1-71.4-71.8-71.4-39.7 0-71.8 32-71.8 71.4s32.1 71.4 71.8 71.4c16.3 0 31.3-5.4 43.4-14.5l31.6 31.5c3.8 3.8 10 3.8 13.8 0 3.8-3.8 3.8-10 0-13.8z m-88.8-23.6c-28.3 0-51.3-22.8-51.3-51s23-51 51.3-51c28.3 0 51.3 22.8 51.3 51s-23 51-51.3 51z', //图标
          //         onclick:function() {//点击事件,这里的option1是chart的option信息
          //           _this.getChinaMap('china',_this.chinadata)
          //           _this.$emit('dada',_this.chinadata)
          //         }
          //     }
          // },
          tooltip: { // 和 option.tooltip 的配置项相同
            show: true,
            formatter: function (param) {
              return '<div>' + param.title + '</div>' // 自定义的 DOM 结构
            },
            backgroundColor: '#222',
            textStyle: {
              fontSize: 12
            },
            extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);' // 自定义的 CSS 样式
          }

        },
        tooltip: {
          formatter: function (params, ticket, callback) {
            console.log(params, 'params')
            // return params.seriesName + '<br />' + params.name + '：' + params.value + ' | ' + params.data.percent
            return '<div style="font-size:10px;text-align:left;padding:5px;"><div style="border-bottom:1px solid #f0f0f0;">' + params.name + '</div><div>' +
            params.marker + '<span>案件个数</span><span style="margin-left:5px;">' + params.value + '</span><span style="margin-left:5px;">' + params.data.percent + '</span></div></div>'
          }, // 数据格式化
          extraCssText: 'color:#000000;background:#FFFFFF;box-shadow:0px 3px 6px rgba(0,0,0,0.16);opacity:0.95;border-radius:5px;font-size:10px;padding:0;'
        },
        visualMap: {
          itemWidth: 10, // 图形的宽度，即长条的宽度。
          itemHeight: 100,
          orient: 'horizontal',
          inverse: true,
          min: this.mapconfig.inRangeMin,
          max: this.mapconfig.inRangeMax,
          left: '20px',
          top: 'bottom',
          text: ['高', '低'], // 取值范围的文字
          inRange: {
            color: this.mapconfig.inRangeColor// 取值范围的颜色
          },
          show: true// 图注
        },
        geo: {
          map: param,
          roam: this.mapconfig.roam, // 不开启缩放和平移
          zoom: this.mapconfig.zoom, // 视角缩放比例
          label: {
            normal: {
              show: false,
              fontSize: '10',
              color: 'rgba(0,0,0,0.7)'
            },
            emphasis: {
              color: '#fff'

            }
          },
          itemStyle: {
            normal: {

              borderColor: '#fff' // 地图边框颜色

            },
            emphasis: {
              color: '#fff',
              borderWidth: '20px',
              areaColor: '#8773f2'

            }
          }

        },
        series: [
          {
            name: '案件人数',
            type: 'map',
            geoIndex: 0,
            data: dataList

          }
        ]
      }
      this.chinaMapEcharts.setOption(option)
    },
    loadmap (name, callback, arr) {
      const pinyinName = this.provinces[this.provincesText.indexOf(name)]
      this.selected = pinyinName
      if (pinyinName) {
        // const currentMap = require(`echarts/map/js/province/${pinyinName}.js`)
        callback(name, arr)
      }
    },
    getMapJson (param) {
      this.getChinaMap(this.selected, param)
      // var _this = this
      //    this.chinaMapEcharts.on('click', function (params) {
      //        _this.selected=params.name
      //       if(params.name&&params.name!='重庆'&&params.name!='上海'&&params.name!='北京'&&params.name!='香港'&&params.name!='澳门'&&params.name!='天津'){
      //         _this.$emit('areafn',params)
      //       }

      //   });
    }

  },
  mounted () {
    // var chinajson = [{ name: '南海诸岛', value: 0 },
    //   { name: '北京', value: 0, percent: '0' },
    //   { name: '天津', value: 0, percent: '0' },
    //   { name: '上海', value: 0, percent: '0' },
    //   { name: '重庆', value: 0, percent: '0' },
    //   { name: '河北', value: 0, percent: '0' },
    //   { name: '河南', value: 0, percent: '0' },
    //   { name: '云南', value: 0, percent: '0' },
    //   { name: '辽宁', value: 0, percent: '0' },
    //   { name: '黑龙江', value: 0, percent: '0' },
    //   { name: '湖南', value: 0, percent: '0' },
    //   { name: '安徽', value: 0, percent: '0' },
    //   { name: '山东', value: 0, percent: '0' },
    //   { name: '新疆', value: 0, percent: '0' },
    //   { name: '江苏', value: 0, percent: '0' },
    //   { name: '浙江', value: 0, percent: '0' },
    //   { name: '江西', value: 0, percent: '0' },
    //   { name: '湖北', value: 0, percent: '0' },
    //   { name: '广西', value: 0, percent: '0' },
    //   { name: '甘肃', value: 0, percent: '0' },
    //   { name: '山西', value: 0, percent: '0' },
    //   { name: '内蒙古', value: 0, percent: '0' },
    //   { name: '陕西', value: 0, percent: '0' },
    //   { name: '吉林', value: 0, percent: '0' },
    //   { name: '福建', value: 0, percent: '0' },
    //   { name: '贵州', value: 0, percent: '0' },
    //   { name: '广东', value: 0, percent: '0' },
    //   { name: '青海', value: 0, percent: '0' },
    //   { name: '西藏', value: 0, percent: '0' },
    //   { name: '四川', value: 0, percent: '0' },
    //   { name: '宁夏', value: 0, percent: '0' },
    //   { name: '海南', value: 0, percent: '0' },
    //   { name: '台湾', value: 0, percent: '0' },
    //   { name: '香港', value: 0, percent: '0' },
    //   { name: '澳门', value: 0, percent: '0' }]
    if (this.chinajson.some(el => el.name === '安徽')) {
      console.log(this.chinajson, 'chin')
      this.getMapJson(this.chinajson)
      this.chinadata = JSON.parse(JSON.stringify(this.chinajson))
    } else {
      this.loadmap(this.selected, this.getChinaMap, this.chinajson)
    }
    setTimeout(() => {
      console.log(this)
      this.mapconfig.inRangeMax = 100
    }, 5000)
  }
}
</script>
<style lang="stylus" scoped>
#chinamap
    height:245px;
</style>
