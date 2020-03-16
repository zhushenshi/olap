<template>
  <div class="wrapper">
    <Header>案件详情</Header>
    <section class="casseBaseInfo">
      <div class="caseBaseInfoBox">
        <div class="arbNumber">编号：(2018)北国仲字第1号</div>
        <div class="arbInfo">
          <span class="label">申请人：</span>
          <span>上海指旺信息科技有限公司</span>
        </div>
        <div class="arbInfo">
          <span class="label">案件状态：</span>
          <span class="arbStatus">已申请-管辖权异议</span>
        </div>
        <div class="caseBaseInfoTable">
          <div class="caseBaseInfoItem">
            <span class="label">案由</span>
            <br>
            <span class="text">经济纠纷经济纠纷经济纠纷经济纠纷</span>
          </div>
          <div class="caseBaseInfoItem">
            <span class="label">申请日期</span>
            <br>
            <span class="text">2020.02.18 12:00:00</span>
          </div>
          <div class="caseBaseInfoItem">
            <span class="label">案由案由案由案由案由案由案由案由</span>
            <br>
            <span class="text">经济纠纷经济纠纷经济纠纷经济纠纷经济纠纷</span>
          </div>
        </div>
      </div>
    </section>
    <section class="caseDetail">
      <van-tabs :border="false" :ellipsis="false">
        <van-tab title="申请信息">
          <div class="tabItem">
            <div>
              <h3>申请仲裁书</h3>
              <div class="borderBottom" style=";padding:13px 0;">
                <span class="icon iconfont icon-pdf"></span>
                <span class="fileName">仲裁申请书.pdf</span>
              </div>
            </div>
            <div style="padding:16px 0 0 0;">
              <h3>证据资料(2个债权)</h3>
              <div class="grayBg">
               <p class="bold black"> 证据一（ZQ1)</p>
               <p class="" style="margin:7px 0 16px 0;">订单编号：MJZH201909241873148780</p>
               <p class="borderBottom"></p>
               <p style="padding:14px 0 0 0;">证据标题：</p>
               <p class="black" style="margin-top:2px;">这里是标题标题标题这里是标题标题标题</p>
                <p style="margin-top:16px;">证明内容：</p>
                <p class="black" style="margin-top:2px;">这里是内容内容</p>
                <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
                <div style="background-color:#FFFFFF;padding:14px;">
                  <div>
                    <span class="icon iconfont icon-pdf"></span>
                    <span class="fileName">仲裁申请书.pdf</span>
                  </div>
                  <div style="margin-top:12px;">
                    <span class="icon iconfont icon-pdf"></span>
                    <span class="fileName">仲裁申请书.pdf</span>
                  </div>
                </div>
              </div>
              <p class="borderBottom" style="margin-top:14px;"></p>
            </div>
            <div style="padding:16px 0 0 0;">
              <h3>申请人信息1</h3>
              <div>
                <div class="flexInfoBox">
                  <div class="infoItem">
                    <div>公司名称</div>
                    <div class="black mt2">互联网金融</div>
                  </div>
                  <div class="infoLine"></div>
                  <div class="infoItem">
                    <div>统一信用代码</div>
                    <div class="black mt2">9875246464654</div>
                  </div>
                </div>
                <div class="flexInfoBox">
                  <div class="infoItem">
                    <div>注册地址</div>
                    <div class="black mt2">上海市黄浦区南京西路1200号</div>
                  </div>
                  <div class="infoLine"></div>
                  <div class="infoItem">
                    <div>约定送达地址</div>
                    <div class="black mt2">上海市黄浦区南京西路1200号</div>
                  </div>
                </div>
                <div class="flexInfoBox">
                  <div class="infoItem">
                    <div>邮编</div>
                    <div class="black mt2">/</div>
                  </div>
                  <div class="infoLine"></div>
                  <div class="infoItem">
                    <div>法定代表人</div>
                    <div class="black mt2">金成日</div>
                  </div>
                </div>
                <div class="flexInfoBox">
                  <div class="infoItem">
                    <div>身份证号</div>
                    <div class="black mt2">3101 0920 0009 0998 90</div>
                  </div>
                  <div class="infoLine"></div>
                  <div class="infoItem">
                    <div>手机号码</div>
                    <div class="black mt2">13635347890</div>
                  </div>
                </div>
                <div class="margin-top:20px;">
                  <div>证件资料</div>
                  <div class="certificates">
                    <img src="../../src/assets/imgs/chongzhi@2x.png" alt="">
                    <img src="../../src/assets/imgs/chongzhi@2x.png" alt="">
                    <img src="../../src/assets/imgs/chongzhi@2x.png" alt="">
                    <img src="../../src/assets/imgs/chongzhi@2x.png" alt="">
                  </div>
                </div>
                <div class="black bold" style="margin-top:20px;">
                  代理人信息
                </div>
                <div class="flexInfoBox">
                  <div class="infoItem">
                    <div>姓名</div>
                    <div class="black mt2">金成日</div>
                  </div>
                  <div class="infoLine"></div>
                  <div class="infoItem">
                    <div>职务</div>
                    <div class="black mt2">律师</div>
                  </div>
                </div>
              </div>
            </div>
            <div style="height:500px;"></div>
          </div>
        </van-tab>
        <van-tab title="案件追踪">
          <div class="tabItem">
            <van-collapse v-model="activeNames" bind:change="onChange">
              <van-collapse-item name="1" :is-link="false">
                <template slot="title">
                  <div>
                    <h3>申请仲裁书</h3>
                  </div>
                </template>
                <div class="borderBottom" style=";padding:13px 0;">
                  <span class="icon iconfont icon-pdf"></span>
                  <span class="fileName">仲裁申请书.pdf</span>
                </div>
              </van-collapse-item>
              <van-collapse-item name="2" :is-link="false">
                <template slot="title">
                  <div style="padding:16px 0 0 0;">
                    <h3>证据资料(2个债权)</h3>
                  </div>
                </template>
                <div >
                  <div class="grayBg">
                  <p class="bold black"> 证据一（ZQ1)</p>
                  <p class="" style="margin:7px 0 16px 0;">订单编号：MJZH201909241873148780</p>
                  <p class="borderBottom"></p>
                  <p style="padding:14px 0 0 0;">证据标题：</p>
                  <p class="black" style="margin-top:2px;">这里是标题标题标题这里是标题标题标题</p>
                    <p style="margin-top:16px;">证明内容：</p>
                    <p class="black" style="margin-top:2px;">这里是内容内容</p>
                    <p style="margin-top:16px;margin-bottom:4px;">证据附件</p>
                    <div style="background-color:#FFFFFF;padding:14px;">
                      <div>
                        <span class="icon iconfont icon-pdf"></span>
                        <span class="fileName">仲裁申请书.pdf</span>
                      </div>
                      <div style="margin-top:12px;">
                        <span class="icon iconfont icon-pdf"></span>
                        <span class="fileName">仲裁申请书.pdf</span>
                      </div>
                    </div>
                  </div>
                  <p class="borderBottom" style="margin-top:14px;"></p>
                </div>
              </van-collapse-item>
            </van-collapse>
          </div>
        </van-tab>
        <van-tab title="网络会议资料">内容 2</van-tab>
        <van-tab title="案件追踪">内容 2</van-tab>
        <van-tab title="案件追踪">内容 2</van-tab>
        <van-tab title="案件追踪">内容 2</van-tab>
      </van-tabs>
    </section>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
  data () {
    return {
      active: 0,
      activeNames: ['1']
    }
  },
  components: { Header },
  methods: {
  },
  created () {
  }
}
</script>
<style lang="stylus" scoped>
// @import "../stylus/caseBaseInfo.styl";
.wrapper
  .caseDetail
    text-align:left;
    margin-top:14px;
    color:#9B9B9B;
    background:#FFFFFF;
    font-size:15px;
    line-height:21px;
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
      .borderBottom
        border-bottom:1pt solid #F0F0F0
      .icon
        font-size:20px;
      .fileName
        margin-left:8px;
        color:#000000;
      .grayBg
        background-color:#F6F7F9;
        padding:15px 15px 14px 16px;
        margin-top:14px;
      .bold
        font-weight:bold;
      .black
        color:#000000;
      .flexInfoBox
        display:flex;
        position:relative;
        box-sizing:border-box;
        justify-content:space-between;
        margin-top:16px;
        .infoItem
          width:47%;
        .infoLine
          border-right:1px solid #F0F0F0;
          height:65%;
          position:absolute;
          left:0;
          right:0;
          top:0;
          bottom:0;
          margin:auto;
          width:1px;
        .mt2
          margin-top:2px;
      .certificates
        img
          width 79px;
          margin-top:6px;
          margin-right:9px;
        img:nth-child(4)
          margin-right:0;
      /deep/.van-cell
        padding:0;
      /deep/.van-collapse-item__content
        font-size: 15px;
        padding:0;
        line-height:21px;
/deep/.van-tabs--line .van-tabs__wrap
  height:46px;
/deep/.van-tab
  font-size:15px
  line-height:46px;
  min-width:87px;
/deep/ .van-tabs__line
  width:60px!important;
  background-color: #1890ff!important;
/deep/ .van-tab--active
  color:#1890ff;
</style>
<style lang="stylus" scoped>
.wrapper
  section.casseBaseInfo
    padding:14px 0 0 0;
    background-color:#FFFFFF;
    text-align:left
    .caseBaseInfoBox
      padding:0 25px 12px 20px;
      position:relative;
      overflow:hidden;
      .arbNumber
        font-size:20px;
        font-weight:500;
        line-height:28px;
        color:#1890FF;
        .titleIcon
          vertical-align:middle;
      .arbInfo
        font-size:15px;
        font-weight:400;
        line-height:21px;
        color:#000000;
        margin-top:13px;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space:nowrap;
        .label
          color:#9B9B9B;
          margin:10px 0 0 3px;
        .arbStatus
          color: #1890FF;
          display:inline-block;
          line-height:21px;
          height:21px;
          background: #C4E3FF;
          border-radius:18px;
          padding:0 12px 0 10px;
      .caseBaseInfoTable
        display: flex;
        margin-top:12px;
        .caseBaseInfoItem
          flex:1;
          overflow: hidden;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          white-space:nowrap;
          text-align:center;
          line-height:21px;
          .label
            color:#9B9B9B
          .text
            color:#24272B;
            line-height:29px;
</style>
