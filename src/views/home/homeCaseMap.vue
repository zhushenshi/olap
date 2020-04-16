<template>
  <div>
    <div class="caseData content" v-if="show">
      <div class="caseDataPieTitle">案件(被申请人)地域分布</div>
      <china-map  ref="chinaMap" :chinajson='chinajson' :inRangeMax="inRangeMax"></china-map>
    </div>
  </div>
</template>
<script>
import ChinaMap from '@/components/ChinaMap.vue'
import { api } from '@/utils/api'
export default {
  data () {
    return {
      chinajson: [],
      show: false,
      inRangeMax: 100
    }
  },
  components: { ChinaMap },
  methods: {
    setEchartsMap (data) {
      if (data.code === '1') {
        this.chinajson = data.data
        var num = 0
        this.chinajson.map(el => {
          el.name = el.name.replace('省', '')
          if (el.name === '内蒙古自治区') {
            el.name = '内蒙古'
          }
          if (el.name.length > 3) {
            el.name = el.name.substr(0, 2)
          }
          if (el.value > this.inRangeMax) {
            this.inRangeMax = el.value
          }
          num += Number(el.value)
        })

        this.chinajson.map(el => {
          el.percent = (el.value / num * 100).toFixed(2) + '%'
        })
      }
    },
    getData () {
      api.mockRequest({ success: true, msg: '操作成功', code: '1', data: [{ name: '北京', value: '62', children: null }, { name: '上海', value: '12', children: null }, { name: '天津', value: '1', children: null }, { name: '重庆', value: '0', children: null }, { name: '台湾省', value: '2', children: null }, { name: '香港特别行政区', value: '29', children: null }, { name: '澳门特别行政区', value: '1', children: null }, { name: '黑龙江省', value: '0', children: [{ name: '哈尔滨市', value: '0' }, { name: '齐齐哈尔市', value: '0' }, { name: '牡丹江市', value: '0' }, { name: '大庆市', value: '0' }, { name: '伊春市', value: '0' }, { name: '双鸭山市', value: '0' }, { name: '鹤岗市', value: '0' }, { name: '鸡西市', value: '0' }, { name: '佳木斯市', value: '0' }, { name: '七台河市', value: '0' }, { name: '黑河市', value: '0' }, { name: '绥化市', value: '0' }, { name: '大兴安岭市', value: '0' }] }, { name: '吉林省', value: '0', children: [{ name: '长春市', value: '0' }, { name: '延边市', value: '0' }, { name: '吉林市', value: '0' }, { name: '白山市', value: '0' }, { name: '白城市', value: '0' }, { name: '四平市', value: '0' }, { name: '松原市', value: '0' }, { name: '辽源市', value: '0' }, { name: '大安市', value: '0' }, { name: '通化市', value: '0' }] }, { name: '辽宁省', value: '0', children: [{ name: '沈阳市', value: '0' }, { name: '大连市', value: '0' }, { name: '葫芦岛市', value: '0' }, { name: '旅顺市', value: '0' }, { name: '本溪市', value: '0' }, { name: '抚顺市', value: '0' }, { name: '铁岭市', value: '0' }, { name: '辽阳市', value: '0' }, { name: '营口市', value: '0' }, { name: '阜新市', value: '0' }, { name: '朝阳市', value: '0' }, { name: '锦州市', value: '0' }, { name: '丹东市', value: '0' }, { name: '鞍山市', value: '0' }] }, { name: '内蒙古自治区', value: '21', children: [{ name: '呼和浩特市', value: '21' }, { name: '呼伦贝尔市', value: '0' }, { name: '锡林浩特市', value: '0' }, { name: '包头市', value: '0' }, { name: '赤峰市', value: '0' }, { name: '海拉尔市', value: '0' }, { name: '乌海市', value: '0' }, { name: '鄂尔多斯市', value: '0' }, { name: '通辽市', value: '0' }] }, { name: '河北省', value: '0', children: [{ name: '石家庄市', value: '0' }, { name: '唐山市', value: '0' }, { name: '张家口市', value: '0' }, { name: '廊坊市', value: '0' }, { name: '邢台市', value: '0' }, { name: '邯郸市', value: '0' }, { name: '沧州市', value: '0' }, { name: '衡水市', value: '0' }, { name: '承德市', value: '0' }, { name: '保定市', value: '0' }, { name: '秦皇岛市', value: '0' }] }, { name: '河南省', value: '0', children: [{ name: '郑州市', value: '0' }, { name: '开封市', value: '0' }, { name: '洛阳市', value: '0' }, { name: '平顶山市', value: '0' }, { name: '焦作市', value: '0' }, { name: '鹤壁市', value: '0' }, { name: '新乡市', value: '0' }, { name: '安阳市', value: '0' }, { name: '濮阳市', value: '0' }, { name: '许昌市', value: '0' }, { name: '漯河市', value: '0' }, { name: '三门峡市', value: '0' }, { name: '南阳市', value: '0' }, { name: '商丘市', value: '0' }, { name: '信阳市', value: '0' }, { name: '周口市', value: '0' }, { name: '驻马店市', value: '0' }] }, { name: '山东省', value: '0', children: [{ name: '济南市', value: '0' }, { name: '青岛市', value: '0' }, { name: '淄博市', value: '0' }, { name: '威海市', value: '0' }, { name: '曲阜市', value: '0' }, { name: '临沂市', value: '0' }, { name: '烟台市', value: '0' }, { name: '枣庄市', value: '0' }, { name: '聊城市', value: '0' }, { name: '济宁市', value: '0' }, { name: '菏泽市', value: '0' }, { name: '泰安市', value: '0' }, { name: '日照市', value: '0' }, { name: '东营市', value: '0' }, { name: '德州市', value: '0' }, { name: '滨州市', value: '0' }, { name: '莱芜市', value: '0' }, { name: '潍坊市', value: '0' }] }, { name: '山西省', value: '0', children: [{ name: '太原市', value: '0' }, { name: '阳泉市', value: '0' }, { name: '晋城市', value: '0' }, { name: '晋中市', value: '0' }, { name: '临汾市', value: '0' }, { name: '运城市', value: '0' }, { name: '长治市', value: '0' }, { name: '朔州市', value: '0' }, { name: '忻州市', value: '0' }, { name: '大同市', value: '0' }, { name: '吕梁市', value: '0' }] }, { name: '江苏省', value: '34', children: [{ name: '南京市', value: '0' }, { name: '苏州市', value: '33' }, { name: '昆山市', value: '0' }, { name: '南通市', value: '0' }, { name: '太仓市', value: '0' }, { name: '吴县市', value: '0' }, { name: '徐州市', value: '0' }, { name: '宜兴市', value: '0' }, { name: '镇江市', value: '0' }, { name: '淮安市', value: '0' }, { name: '常熟市', value: '0' }, { name: '盐城市', value: '0' }, { name: '泰州市', value: '0' }, { name: '无锡市', value: '0' }, { name: '连云港市', value: '0' }, { name: '扬州市', value: '0' }, { name: '常州市', value: '1' }, { name: '宿迁市', value: '0' }] }, { name: '安徽省', value: '0', children: [{ name: '合肥市', value: '0' }, { name: '巢湖市', value: '0' }, { name: '黄山市', value: '0' }, { name: '蚌埠市', value: '0' }, { name: '安庆市', value: '0' }, { name: '六安市', value: '0' }, { name: '滁州市', value: '0' }, { name: '马鞍山市', value: '0' }, { name: '阜阳市', value: '0' }, { name: '宣城市', value: '0' }, { name: '铜陵市', value: '0' }, { name: '淮北市', value: '0' }, { name: '芜湖市', value: '0' }, { name: '毫州市', value: '0' }, { name: '宿州市', value: '0' }, { name: '淮南市', value: '0' }, { name: '池州市', value: '0' }] }, { name: '陕西省', value: '0', children: [{ name: '西安市', value: '0' }, { name: '韩城市', value: '0' }, { name: '安康市', value: '0' }, { name: '汉中市', value: '0' }, { name: '宝鸡市', value: '0' }, { name: '咸阳市', value: '0' }, { name: '榆林市', value: '0' }, { name: '渭南市', value: '0' }, { name: '商洛市', value: '0' }, { name: '铜川市', value: '0' }, { name: '延安市', value: '0' }] }, { name: '宁夏回族自治区', value: '0', children: [{ name: '银川市', value: '0' }, { name: '固原市', value: '0' }, { name: '中卫市', value: '0' }, { name: '石嘴山市', value: '0' }, { name: '吴忠市', value: '0' }] }, { name: '甘肃省', value: '0', children: [{ name: '兰州市', value: '0' }, { name: '白银市', value: '0' }, { name: '庆阳市', value: '0' }, { name: '酒泉市', value: '0' }, { name: '天水市', value: '0' }, { name: '武威市', value: '0' }, { name: '张掖市', value: '0' }, { name: '甘南市', value: '0' }, { name: '临夏市', value: '0' }, { name: '平凉市', value: '0' }, { name: '定西市', value: '0' }, { name: '金昌市', value: '0' }] }, { name: '青海省', value: '0', children: [{ name: '西宁市', value: '0' }, { name: '海北市', value: '0' }, { name: '海西市', value: '0' }, { name: '黄南市', value: '0' }, { name: '果洛市', value: '0' }, { name: '玉树市', value: '0' }, { name: '海东市', value: '0' }, { name: '海南市', value: '0' }] }, { name: '湖北省', value: '0', children: [{ name: '武汉市', value: '0' }, { name: '宜昌市', value: '0' }, { name: '黄冈市', value: '0' }, { name: '恩施市', value: '0' }, { name: '荆州市', value: '0' }, { name: '神农架市', value: '0' }, { name: '十堰市', value: '0' }, { name: '咸宁市', value: '0' }, { name: '襄樊市', value: '0' }, { name: '孝感市', value: '0' }, { name: '随州市', value: '0' }, { name: '黄石市', value: '0' }, { name: '荆门市', value: '0' }, { name: '鄂州市', value: '0' }] }, { name: '湖南省', value: '10', children: [{ name: '长沙市', value: '0' }, { name: '邵阳市', value: '0' }, { name: '常德市', value: '0' }, { name: '郴州市', value: '0' }, { name: '吉首市', value: '0' }, { name: '株洲市', value: '10' }, { name: '娄底市', value: '0' }, { name: '湘潭市', value: '0' }, { name: '益阳市', value: '0' }, { name: '永州市', value: '0' }, { name: '岳阳市', value: '0' }, { name: '衡阳市', value: '0' }, { name: '怀化市', value: '0' }, { name: '韶山市', value: '0' }, { name: '张家界市', value: '0' }] }, { name: '浙江省', value: '0', children: [{ name: '杭州市', value: '0' }, { name: '湖州市', value: '0' }, { name: '金华市', value: '0' }, { name: '宁波市', value: '0' }, { name: '丽水市', value: '0' }, { name: '绍兴市', value: '0' }, { name: '雁荡山市', value: '0' }, { name: '衢州市', value: '0' }, { name: '嘉兴市', value: '0' }, { name: '台州', value: '0' }, { name: '舟山', value: '0' }, { name: '温州', value: '0' }] }, { name: '江西省', value: '0', children: [{ name: '南昌市', value: '0' }, { name: '萍乡市', value: '0' }, { name: '九江市', value: '0' }, { name: '上饶市', value: '0' }, { name: '抚州市', value: '0' }, { name: '吉安市', value: '0' }, { name: '鹰潭市', value: '0' }, { name: '宜春市', value: '0' }, { name: '新余市', value: '0' }, { name: '景德镇市', value: '0' }, { name: '赣州市', value: '0' }] }, { name: '福建省', value: '0', children: [{ name: '福州市', value: '0' }, { name: '厦门市', value: '0' }, { name: '龙岩市', value: '0' }, { name: '南平市', value: '0' }, { name: '宁德市', value: '0' }, { name: '莆田市', value: '0' }, { name: '泉州市', value: '0' }, { name: '三明市', value: '0' }, { name: '漳州市', value: '0' }] }, { name: '贵州省', value: '0', children: [{ name: '贵阳市', value: '0' }, { name: '安顺市', value: '0' }, { name: '赤水市', value: '0' }, { name: '遵义市', value: '0' }, { name: '铜仁市', value: '0' }, { name: '六盘水市', value: '0' }, { name: '毕节市', value: '0' }, { name: '凯里市', value: '0' }, { name: '都匀市', value: '0' }] }, { name: '四川省', value: '0', children: [{ name: '成都市', value: '0' }, { name: '泸州市', value: '0' }, { name: '内江市', value: '0' }, { name: '凉山市', value: '0' }, { name: '阿坝市', value: '0' }, { name: '巴中市', value: '0' }, { name: '广元市', value: '0' }, { name: '乐山市', value: '0' }, { name: '绵阳市', value: '0' }, { name: '德阳市', value: '0' }, { name: '攀枝花市', value: '0' }, { name: '雅安市', value: '0' }, { name: '宜宾市', value: '0' }, { name: '自贡市', value: '0' }, { name: '甘孜州市', value: '0' }, { name: '达州市', value: '0' }, { name: '资阳市', value: '0' }, { name: '广安市', value: '0' }, { name: '遂宁市', value: '0' }, { name: '眉山市', value: '0' }, { name: '南充市', value: '0' }] }, { name: '广东省', value: '0', children: [{ name: '广州市', value: '0' }, { name: '深圳市', value: '0' }, { name: '潮州市', value: '0' }, { name: '韶关市', value: '0' }, { name: '湛江市', value: '0' }, { name: '惠州市', value: '0' }, { name: '清远市', value: '0' }, { name: '东莞市', value: '0' }, { name: '江门市', value: '0' }, { name: '茂名市', value: '0' }, { name: '肇庆市', value: '0' }, { name: '汕尾市', value: '0' }, { name: '河源市', value: '0' }, { name: '揭阳市', value: '0' }, { name: '梅州市', value: '0' }, { name: '中山市', value: '0' }, { name: '德庆市', value: '0' }, { name: '阳江市', value: '0' }, { name: '云浮市', value: '0' }, { name: '珠海市', value: '0' }, { name: '汕头市', value: '0' }, { name: '佛山市', value: '0' }] }, { name: '广西壮族自治区', value: '0', children: [{ name: '南宁市', value: '0' }, { name: '桂林市', value: '0' }, { name: '阳朔市', value: '0' }, { name: '柳州市', value: '0' }, { name: '梧州市', value: '0' }, { name: '玉林市', value: '0' }, { name: '桂平市', value: '0' }, { name: '贺州市', value: '0' }, { name: '钦州市', value: '0' }, { name: '贵港市', value: '0' }, { name: '防城港市', value: '0' }, { name: '百色市', value: '0' }, { name: '北海市', value: '0' }, { name: '河池市', value: '0' }, { name: '来宾市', value: '0' }, { name: '崇左市', value: '0' }] }, { name: '云南省', value: '0', children: [{ name: '昆明市', value: '0' }, { name: '保山市', value: '0' }, { name: '楚雄市', value: '0' }, { name: '德宏市', value: '0' }, { name: '红河市', value: '0' }, { name: '临沧市', value: '0' }, { name: '怒江市', value: '0' }, { name: '曲靖市', value: '0' }, { name: '思茅市', value: '0' }, { name: '文山市', value: '0' }, { name: '玉溪市', value: '0' }, { name: '昭通市', value: '0' }, { name: '丽江市', value: '0' }, { name: '大理市', value: '0' }] }, { name: '海南省', value: '1', children: [{ name: '海口市', value: '0' }, { name: '三亚市', value: '0' }, { name: '儋州市', value: '0' }, { name: '琼山市', value: '0' }, { name: '通什市', value: '0' }, { name: '文昌市', value: '0' }] }, { name: '新疆维吾尔族自治区', value: '0', children: [{ name: '乌鲁木齐市', value: '0' }, { name: '阿勒泰市', value: '0' }, { name: '阿克苏市', value: '0' }, { name: '昌吉市', value: '0' }, { name: '哈密市', value: '0' }, { name: '和田市', value: '0' }, { name: '喀什', value: '0' }, { name: '克拉玛依', value: '0' }, { name: '石河子', value: '0' }, { name: '塔城市', value: '0' }, { name: '库尔勒市', value: '0' }, { name: '吐鲁番市', value: '0' }, { name: '伊宁市', value: '0' }] }, { name: '西藏自治区', value: '0', children: [{ name: '拉萨市', value: '0' }, { name: '日喀则市', value: '0' }, { name: '昌都市', value: '0' }, { name: '林芝市', value: '0' }, { name: '山南市', value: '0' }, { name: '阿里地区', value: '0' }, { name: '那曲地区', value: '0' }] }] }).then(res => {
        if (res.data.success) {
          this.show = true
          this.setEchartsMap(res.data)
        }
      })
      // api.getIndexMap().then((res) => {
      //   if (res.data.success) {
      //     this.show = true
      //     this.setEchartsMap(res.data)
      //   }
      // })
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
  padding-bottom:5px;
  overflow:hidden;
  .caseDataPieTitle
    height:25px;
    font-size:18px;
    line-height:25px;
    color:#4A4A4A;
</style>
