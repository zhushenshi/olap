(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["ToDoList"],{"02de":function(t,e,i){"use strict";function a(t){var e=window.getComputedStyle(t),i="none"===e.display,a=null===t.offsetParent&&"fixed"!==e.position;return i||a}i.d(e,"a",(function(){return a}))},"11ce":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADpUlEQVRIS7WVS2hcdRTGf+fOTF5CO02TmbE+Undd+EClil2ISquJ0CwKFoRGCIitpCaZadJYFTuowbammWlrQQWfoJVUqEWqEYK4EBciVRcuBFHRKs5MbCJKTDJz7yc38zCxk0w2vcv7P+f7zvn+3zl/4zJ/Vgu/+aDWhNYxBGyWeCl7FWfZaW6tvPL58gQPKNC6hS7HOGiwsZQgwYRcBrP77JvVkFQlaDmmWx3xrGO0Iy6JEeQRRyhwPDNo2ZWIliSHUwrXG08b7AEaV1HhV4gdv8ftp+ViiwRJOa3NPOR4C+DXrQJYEq/OweB03KZX7CByVDc5AQ4B7asA9kP8e3gt08ij7LZ881Fd4/+8uM9+qZZvsbTGMe6tpnWVhCXg0RO6x1zGAMcr8GB2wD7+f46tfV7r6hvYa8aQwRUrdSHxdqaJbr/y1pQ6HOMdg3CprU8y/WzFTIsxSpcsi6S5wWAY6DAIVIL88GLUnOtxfS5h37ekdFfAOFMGXyCA31yxfTJu55cQ+BqGAhxDBLw8A06QTWacwGhbHCj4NTPNtUAwtpbvsMps/FeLmPRgWy5uX1cGLZLSuGPcV/ox5YkXC/O8Emyg2xEHynYVTJPn6swAM7E072HsqCan34knHjbjfLbfMhZ9QRFCPGdiF1b0vsS3iAN5+CFkHDajQyDP6Mz12YcbkmoqrGHIHLYabFmG6G/XpbOormSxFJvlcNzgNl91iQLGuOcRdwK0yePm/BxjU4/bz35KNK3bDc4B65czhsQ5az2imFPHM3g4syGG6wrc7RjDBrGybIgP8uLkHwn7ogwOnDWILgsOrvlSRdL6yCkNmSCDeGpulon6Rp4w6AIaJMYyf9JF0uarVD4n6DE4XOlGzHvwZDZuIxYeUVt9kDSwvWRP35hfyqXXFflAkJ6QR8+FhP1TDdz12J1L8FY0zSmDnQJPMJTtY9SficodtKZpd4xDBjeW2p4VnJopsP+vAZtcP6JNwSCflmURFDyPR3IJ3vCvLJxUuD5Mt8SP2bi9X7HpYg03vKymwgz7HWOv3+6CcwrcmRuwzyIpJf23oWgK5l2HPbk+e32lyffPqr4HsZQ2yhgFOvHYlUnYuy0p3RI0JgQhTzyWi/OmX7m/if1dVJUoaYWVX7Q72OYY92c+J85pc1tSutI1QlP9RauSVF00zGlUdcV7ntFb800mqYbmZlou9tqFS6uURUfpx2FhZS/ZQVpY6ydrE9QSucb5ZSf4FwvkcxGVqmvdAAAAAElFTkSuQmCC"},"131c":function(t,e,i){},"2bdd":function(t,e,i){"use strict";var a=i("d282"),s=i("02de"),n=i("a8c1"),r=i("5fbe"),o=i("543e"),c=Object(a["a"])("list"),l=c[0],d=c[1],h=c[2];e["a"]=l({mixins:[Object(r["a"])((function(t){this.scroller||(this.scroller=Object(n["d"])(this.$el)),t(this.scroller,"scroll",this.check)}))],model:{prop:"loading"},props:{error:Boolean,loading:Boolean,finished:Boolean,errorText:String,loadingText:String,finishedText:String,immediateCheck:{type:Boolean,default:!0},offset:{type:[Number,String],default:300},direction:{type:String,default:"down"}},data:function(){return{innerLoading:this.loading}},updated:function(){this.innerLoading=this.loading},mounted:function(){this.immediateCheck&&this.check()},watch:{loading:"check",finished:"check"},methods:{check:function(){var t=this;this.$nextTick((function(){if(!(t.innerLoading||t.finished||t.error)){var e,i=t.$el,a=t.scroller,n=t.offset,r=t.direction;e=a.getBoundingClientRect?a.getBoundingClientRect():{top:0,bottom:a.innerHeight};var o=e.bottom-e.top;if(!o||Object(s["a"])(i))return!1;var c=!1,l=t.$refs.placeholder.getBoundingClientRect();c="up"===r?e.top-l.top<=n:l.bottom-e.bottom<=n,c&&(t.innerLoading=!0,t.$emit("input",!0),t.$emit("load"))}}))},clickErrorText:function(){this.$emit("update:error",!1),this.check()},genLoading:function(){var t=this.$createElement;if(this.innerLoading&&!this.finished)return t("div",{class:d("loading"),key:"loading"},[this.slots("loading")||t(o["a"],{attrs:{size:"16"}},[this.loadingText||h("loading")])])},genFinishedText:function(){var t=this.$createElement;if(this.finished){var e=this.slots("finished")||this.finishedText;if(e)return t("div",{class:d("finished-text")},[e])}},genErrorText:function(){var t=this.$createElement;if(this.error){var e=this.slots("error")||this.errorText;if(e)return t("div",{on:{click:this.clickErrorText},class:d("error-text")},[e])}}},render:function(){var t=arguments[0],e=t("div",{ref:"placeholder",class:d("placeholder")});return t("div",{class:d(),attrs:{role:"feed","aria-busy":this.innerLoading}},["down"===this.direction?this.slots():e,this.genLoading(),this.genFinishedText(),this.genErrorText(),"up"===this.direction?this.slots():e])}})},3666:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"wrapper"},[a("header",{staticClass:"default",class:{active:t.headerShow}},[a("div",{staticClass:"headerBox"},[a("div",{staticClass:"title",style:{"font-size":t.titleFonSize}},[t._v("待办事项")]),a("div",{staticClass:"avatar",on:{click:t.popPersonalCenter}},[a("img",{attrs:{src:i("49ed"),alt:""}})])]),a("div",{staticClass:"tabContent clearfix"},[a("div",{staticClass:"tab fl",class:0===t.type?"tabActive":"",on:{click:function(e){return t.tabClick(0)}}},[t._v("全部")]),a("div",{staticClass:"tab fl",class:1===t.type?"tabActive":"",on:{click:function(e){return t.tabClick(1)}}},[t._v("裁决书")]),a("div",{staticClass:"tab fl",class:2===t.type?"tabActive":"",on:{click:function(e){return t.tabClick(2)}}},[t._v("充值")])])]),t.headerShow?a("header",{staticClass:"default",staticStyle:{opacity:"0"}},[a("div",{staticClass:"headerBox"},[a("div",{staticClass:"title"},[t._v("待办事项")]),a("div",{staticClass:"avatar",on:{click:t.popPersonalCenter}},[a("img",{attrs:{src:i("49ed"),alt:""}})])]),a("div",{staticClass:"tabContent clearfix"},[a("div",{staticClass:"tab fl",class:0===t.type?"tabActive":"",on:{click:function(e){return t.tabClick(0)}}},[t._v("全部")]),a("div",{staticClass:"tab fl",class:1===t.type?"tabActive":"",on:{click:function(e){return t.tabClick(1)}}},[t._v("裁决书")]),a("div",{staticClass:"tab fl",class:2===t.type?"tabActive":"",on:{click:function(e){return t.tabClick(2)}}},[t._v("充值")])])]):t._e(),a("section",[t.filterList.length?a("div",{staticClass:"listContent"},[a("pull-refresh",{on:{refresh:t.onRefresh},model:{value:t.refreshing,callback:function(e){t.refreshing=e},expression:"refreshing"}},[a("List",{attrs:{finished:t.finished,"finished-text":"没有更多了",offset:t.offset},on:{load:t.onLoad},model:{value:t.loadMore,callback:function(e){t.loadMore=e},expression:"loadMore"}},t._l(t.filterList,(function(e,s){return a("div",{key:s,staticClass:"itemBox"},t._l(e.yearData,(function(s,n){return a("div",{key:n},[a("p",{staticClass:"topTime"},[t._v(t._s(e.year)+"年"+t._s(s.month)+"月")]),t._l(s.monthData,(function(e,s){return a("div",{key:s},[e?a("div",{staticClass:"leftTop"},[t._v(t._s(e.day.replace(/\b(0+)/gi,"")))]):t._e(),t._l(e.dataList,(function(e,s){return a("div",{key:s},[2!=t.type&&null==e.rechargeData?a("div",{staticClass:"item",on:{click:function(i){return t.goToDetail(e.arbitralData.id)}}},[a("div",{staticClass:"left"},[e.arbitralData?a("div",{staticClass:"leftBottom"},[t._v(t._s(t._f("formathm")(e.arbitralData.createTime)))]):t._e()]),a("div",{staticClass:"right"},[a("div",{staticClass:"itemInfo"},[a("div",{staticClass:"itemInfoRow itemInfoTop"},[a("span",[a("img",{attrs:{src:i("11ce"),alt:""}})]),e.arbitralData?a("span",{on:{click:t.toastTex}},[t._v(t._s(e.arbitralData.arbNumber||e.arbitralData.arbTemporaryNumber))]):t._e()]),a("div",{staticClass:"itemInfoRow"},[a("span",{staticClass:"label"},[t._v("申请人：")]),e.arbitralData?a("span",{on:{click:t.toastTex}},[t._v(t._s(e.arbitralData.arbProsecutorName))]):t._e()]),a("div",{staticClass:"itemInfoRow"},[a("span",{staticClass:"label"},[t._v("申请时间：")]),e.arbitralData?a("span",{on:{click:t.toastTex}},[t._v(t._s(e.arbitralData.createTime))]):t._e()])]),a("div",{staticClass:"operateBtn"},[t._v("审核裁决书")])])]):t._e(),1!=t.type&&null==e.arbitralData?a("div",{staticClass:"item",on:{click:function(i){return t.goToRecharge(e.rechargeData)}}},[a("div",{staticClass:"left"},[e.rechargeData?a("div",{staticClass:"leftBottom"},[t._v(t._s(t._f("formathm")(e.rechargeData.createTime)))]):t._e()]),a("div",{staticClass:"right"},[a("div",{staticClass:"itemInfo"},[a("div",{staticClass:"itemInfoRow itemInfoTop"},[a("img",{attrs:{src:i("11ce"),alt:""}}),e.rechargeData?a("span",{on:{click:t.toastTex}},[t._v(t._s(e.rechargeData.applicant))]):t._e()]),a("div",{staticClass:"itemInfoRow"},[a("span",{staticClass:"label"},[t._v("充值金额：")]),e.rechargeData?a("span",{on:{click:t.toastTex}},[t._v(t._s(e.rechargeData.money?e.rechargeData.money:"0")+"元")]):t._e()]),a("div",{staticClass:"itemInfoRow"},[a("span",{staticClass:"label"},[t._v("充值时间：")]),e.rechargeData?a("span",{on:{click:t.toastTex}},[t._v(t._s(e.rechargeData.capitalTime))]):t._e()])]),a("div",{staticClass:"operateBtn operateBtnRecharge"},[t._v("充值审核")])])]):t._e()])}))],2)}))],2)})),0)})),0)],1)],1):t._e(),t.filterList.length?t._e():a("div",{staticClass:"noData"},[a("img",{attrs:{src:i("fc39"),alt:""}}),a("p",[t._v("无任何记录")])])])])},s=[],n=i("7c15"),r=i("58e6"),o=i("2bdd"),c=(i("cca4"),i("71cf"),{data:function(){return{type:0,filterList:[],pageNo:1,pageSize:10,loadMore:!1,finished:!1,refreshing:!1,offset:100,headerShow:!1,titleFonSize:"0.8rem"}},components:{PullRefresh:r["a"],List:o["a"]},methods:{tabClick:function(t){this.type=t,this.pageNo=1,this.filterList=[],this.getData()},onLoad:function(){this.pageNo++,this.loadMore=!0,this.getData()},onRefresh:function(){this.finished=!1,this.refreshing=!0,this.pageNo=1,this.getData()},toastTex:function(t){t.target.offsetWidth+t.target.previousSibling.offsetWidth>t.target.parentNode.offsetWidth&&(t.stopPropagation(),this.$Toast({message:t.target.innerHTML,position:"middle"}))},getData:function(){var t=this,e=Object.assign({pageNo:this.pageNo,pageSize:this.pageSize,type:this.type});this.$Indicator.open(),n["a"].getWorkList(e).then((function(e){if("1"===e.data.code){t.$Indicator.close();var i=e.data.list;t.filterList=e.data.list,t.filterList.length>=40&&(t.finished=!0),t.loadMore&&(t.$nextTick((function(){t.loadMore=!1})),i.length<10&&(t.finished=!0)),t.refreshing&&(t.refreshing=!1,t.filterList=i,t.finished&&(t.finished=!1))}else t.$Indicator.close(),t.filterList=[]}))},goToDetail:function(t){this.$router.push({path:"/toDoList/auditArbitralDetail",query:{id:t}})},goToRecharge:function(t){console.log(t);var e=JSON.stringify(t);this.$router.push({path:"/toDoList/rechargeDetail",query:{rechargeData:e}})},popPersonalCenter:function(){var t=navigator.userAgent.toLowerCase();/iphone|ipad|ipod/.test(t)?window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.popPersonalCenter.postMessage([""]):/android/.test(t)&&window.object&&"function"===typeof window.object.popPersonalCenter&&window.object.popPersonalCenter()}},created:function(){this.getData()},mounted:function(){var t=this;window.onscroll=function(){var e=document.documentElement.scrollTop||document.body.scrollTop;e>53?(t.titleFonSize="0.48rem",t.headerShow=!0):(t.headerShow=!1,t.titleFonSize="0.8rem")}},destroyed:function(){window.onscroll=null}}),l=c,d=(i("44b3"),i("2877")),h=Object(d["a"])(l,a,s,!1,null,"73578452",null);e["default"]=h.exports},"44b3":function(t,e,i){"use strict";var a=i("dd4c"),s=i.n(a);s.a},"49ed":function(t,e,i){t.exports=i.p+"img/defult_head_url.dbe83ec2.png"},"543e":function(t,e,i){"use strict";var a=i("2638"),s=i.n(a),n=i("d282"),r=i("ea8e"),o=i("ba31"),c=Object(n["a"])("loading"),l=c[0],d=c[1];function h(t,e){if("spinner"===e.type){for(var i=[],a=0;a<12;a++)i.push(t("i"));return i}return t("svg",{class:d("circular"),attrs:{viewBox:"25 25 50 50"}},[t("circle",{attrs:{cx:"50",cy:"50",r:"20",fill:"none"}})])}function u(t,e,i){if(i.default){var a=e.textSize&&{fontSize:Object(r["a"])(e.textSize)};return t("span",{class:d("text"),style:a},[i.default()])}}function f(t,e,i,a){var n=e.color,c=e.size,l=e.type,f={color:n};if(c){var g=Object(r["a"])(c);f.width=g,f.height=g}return t("div",s()([{class:d([l,{vertical:e.vertical}])},Object(o["b"])(a,!0)]),[t("span",{class:d("spinner",l),style:f},[h(t,e)]),u(t,e,i)])}f.props={color:String,size:[Number,String],vertical:Boolean,textSize:[Number,String],type:{type:String,default:"circular"}},e["a"]=l(f)},"58e6":function(t,e,i){"use strict";var a=i("d282"),s=i("1325"),n=i("a8c1"),r=i("3875"),o=i("543e"),c=Object(a["a"])("pull-refresh"),l=c[0],d=c[1],h=c[2],u=50,f=["pulling","loosing","success"];e["a"]=l({mixins:[r["a"]],props:{disabled:Boolean,successText:String,pullingText:String,loosingText:String,loadingText:String,value:{type:Boolean,required:!0},successDuration:{type:[Number,String],default:500},animationDuration:{type:[Number,String],default:300},headHeight:{type:[Number,String],default:u}},data:function(){return{status:"normal",distance:0,duration:0}},computed:{touchable:function(){return"loading"!==this.status&&"success"!==this.status&&!this.disabled},headStyle:function(){if(this.headHeight!==u)return{height:this.headHeight+"px"}}},watch:{value:function(t){this.duration=this.animationDuration,t?this.setStatus(+this.headHeight,!0):this.slots("success")||this.successText?this.showSuccessTip():this.setStatus(0,!1)}},mounted:function(){this.bindTouchEvent(this.$refs.track),this.scrollEl=Object(n["d"])(this.$el)},methods:{checkPullStart:function(t){this.ceiling=0===Object(n["c"])(this.scrollEl),this.ceiling&&(this.duration=0,this.touchStart(t))},onTouchStart:function(t){this.touchable&&this.checkPullStart(t)},onTouchMove:function(t){this.touchable&&(this.ceiling||this.checkPullStart(t),this.touchMove(t),this.ceiling&&this.deltaY>=0&&"vertical"===this.direction&&(Object(s["c"])(t),this.setStatus(this.ease(this.deltaY))))},onTouchEnd:function(){var t=this;this.touchable&&this.ceiling&&this.deltaY&&(this.duration=this.animationDuration,"loosing"===this.status?(this.setStatus(+this.headHeight,!0),this.$emit("input",!0),this.$nextTick((function(){t.$emit("refresh")}))):this.setStatus(0))},ease:function(t){var e=+this.headHeight;return t>e&&(t=t<2*e?e+(t-e)/2:1.5*e+(t-2*e)/4),Math.round(t)},setStatus:function(t,e){var i;i=e?"loading":0===t?"normal":t<this.headHeight?"pulling":"loosing",this.distance=t,i!==this.status&&(this.status=i)},genStatus:function(){var t=this.$createElement,e=this.status,i=this.distance,a=this.slots(e,{distance:i});if(a)return a;var s=[],n=this[e+"Text"]||h(e);return-1!==f.indexOf(e)&&s.push(t("div",{class:d("text")},[n])),"loading"===e&&s.push(t(o["a"],{attrs:{size:"16"}},[n])),s},showSuccessTip:function(){var t=this;this.status="success",setTimeout((function(){t.setStatus(0)}),this.successDuration)}},render:function(){var t=arguments[0],e={transitionDuration:this.duration+"ms",transform:this.distance?"translate3d(0,"+this.distance+"px, 0)":""};return t("div",{class:d()},[t("div",{ref:"track",class:d("track"),style:e},[t("div",{class:d("head"),style:this.headStyle},[this.genStatus()]),this.slots()])])}})},"71cf":function(t,e,i){i("a29f"),i("7565"),i("131c")},7565:function(t,e,i){},cc92:function(t,e,i){},cca4:function(t,e,i){i("a29f"),i("7565"),i("cc92")},dd4c:function(t,e,i){},fc39:function(t,e,i){t.exports=i.p+"img/noData@2x.15e11f3e.png"}}]);