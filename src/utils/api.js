import { myAxios } from '@/utils/request'
var baseURL = ''
const api = {
  uploadURLNew: baseURL + '/olap-arbitral/api/document/uploadReplaceDocument', // 上传url
  // uploadURLJudgeDocument: baseURL + '/api/document/uploadJudgeDocument',  // 上传url
  uploadURL: baseURL + '/olap-file/fast/file/upload', // 上传url
  multipleUploadURL: baseURL + '/api/file/uploads', // 上传url
  uploadVideoUrl: baseURL + '/olap-arbitral/api/video/uploadVideo', // 上传url
  uploadMergeVideoUrl: baseURL + '/olap-arbitral/api/video/uploadMergeVideo', // 上传url
  uploadReplaceDocument (params) { // 根据当前登录账号获取所有子公司数据
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/uploadReplaceDocument',
      data: params
    })
  },
  uploadJudgeDocument (params) { // 根据当前登录账号获取所有子公司数据
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/uploadJudgeDocument',
      data: params
    })
  },
  uploadMergeHearRecord: baseURL + '/olap-arbitral/api/document/uploadMergeHearRecord',
  uploadHearRecord: baseURL + '/olap-arbitral/api/document/uploadHearRecord',
  uploadBatchFile: baseURL + '/api/uploadBatchFile',
  getImgURL (url) {
    if (typeof url === 'string' && url !== '') {
      // return baseURL + '/oauth/file/downloadImgFile?filePath=' + url    // 预览图片
      return baseURL + '/olap-file/fast/file/downloadImgFile?filePath=' + url // 预览图片
    } else { return '' }
  },
  getPdfURL (url) {
    if (typeof url === 'string' && url !== '') {
      return baseURL + '/olap-file/fast/file/downloadPdfFile?pdfUrl=' + url // 预览pdf附件
    } else { return '' }
  },
  getCodeUrl (uuid) { // 验证码url
    return '/olap-auth/verifycode/' + uuid
  },
  downloadPdfFile (params) { // 下载文书
    return myAxios({
      method: 'get',
      url: '/olap-file/fast/file/downloadPdfFile',
      params: params,
      responseType: 'blob',
      onUploadProgress: function (progressEvent) {
        // console.log(progressEvent.loaded)
      }
    })
  },
  downloadOtherFile (params) { // 下载其他文件（接口有误）
    return myAxios({
      method: 'get',
      url: '/olap-file/fast/file/download',
      // url: '/api/file/downloadOtherFile',
      params: params,
      responseType: 'blob',
      onDownloadProgress: function (progressEvent) {
        // console.log(progressEvent.loaded)
      }
    })
  },
  messageDownloadFile (params) { // 移动端免token下载其他文件
    return myAxios({
      method: 'get',
      url: '/oauth/messageDownloadFile',
      params: params,
      responseType: 'blob',
      onDownloadProgress: function (progressEvent) {
        // console.log(progressEvent.loaded)
      }
    })
  },

  // getMssageDownloadFileURL (url, fileName) {
  //   if (typeof url === 'string' && url !== '') {
  //     return baseURL + '/oauth/messageDownloadFile?filePath=' + url + '&fileName=' + fileName  // 预览pdf附件
  //   } else { return '' }
  // },
  mobileDownloadFileURL (url, fileName) {
    if (typeof url === 'string' && url !== '') {
      return baseURL + '/olap-file/fast/file/download?filePath=' + url + '&fileName=' + fileName // 预览pdf附件
    } else { return '' }
  },
  batchDownloadFile (params) { // 批量下载
    return myAxios({
      method: 'post',
      url: '/olap-file/fast/file/file/batchDownloadFile',
      data: params,
      responseType: 'blob'

    })
  },
  batchDownloadFileProportion (params) { // 批量下载比例
    return myAxios({
      method: 'post',
      url: '/olap-file/fast/file/file/batchDownloadFileProportion',
      params: params

    })
  },
  documentBatchDownload (params) { // 获取文件地址集合
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/documentBatchDownload',
      data: params

    })
  },
  // downloadTempApply () {  // 下载模版
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/document/downloadTempApply',
  //     // params: params,
  //     responseType: 'blob',
  //     onDownloadProgress: function (progressEvent) {
  //       // console.log(progressEvent.loaded)
  //     }
  //   })
  // },
  // sendEmailUpdatePassword (params) {  // 找回密码发送邮件
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/user/sendEmailUpdatePassword',
  //     data: params
  //   })
  // },
  // verifyEmailCode (params) {  // 验证邮件
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/user/verifyEmailCode',
  //     params: params
  //   })
  // },
  // updatePassword (params) {  // 修改密码
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/user/updatePassword',
  //     data: params
  //   })
  // },
  /*
    用户端接口-------------------
  */
  applyJudgeNoPassRemark (params) { // 查询审核不通过备注
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/applyJudgeNoPassRemark',
      params: params
    })
  },
  // getSubcompanyByUserCoInfo (params) {  // 根据当前登录账号获取所有子公司数据
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getSubcompanyByUserCoInfo',
  //     data: params
  //   })
  // },
  // userLogin (params) {  // 登录
  //   return myAxios({
  //     method: 'post',
  //     url: '/login/userLogin',
  //     data: params
  //   })
  // },
  // logout (token) {  // 退出
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/userLogout'
  //   })
  // },
  // addArbitralInfo (params) {  // 保存并提交案件
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/addArbitralInfo',
  //     data: params
  //   })
  // },
  // saveArbitralInfo (params) {  // 保存案件
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/saveArbitralInfo',
  //     data: params
  //   })
  // },
  // getInfoByIdCard (params) {  // 入参身份证号，出参出生日期和性别
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getInfoByIdCard',
  //     data: params
  //   })
  // },
  // getArbitralInfos (params) {  // 新增案件
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getArbitralInfos',
  //     data: params
  //   })
  // },
  // updateArbitralInfoOfDefents (params) {  // 删除被申请人
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/updateArbitralInfoOfDefents',
  //     data: params
  //   })
  // },
  // getFundConfigureByDispute (params) {  // 计算仲裁费
  //   return myAxios({
  //     method: 'post',
  //     url: '/olap-ac-config-np/api/getFundConfigureByDispute',
  //     data: params
  //   })
  // },
  getArbitralInfoDetail (params) { // 获取案件详情
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitralInfoDetail',
      data: params
    })
  },
  // queryMessageListByType (params) {  // 查询消息列表
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/queryMessageListByType',
  //     data: params
  //   })
  // },
  messageDetail (params) { // 消息详情
    return myAxios({
      method: 'get',
      url: '/olap-arbitral/api/messageDetail/' + params.id
      // url: '/olap-arbitral/api/messageSysDetail/' + params.id
    })
  },
  queryArbitralDocumentByself (params) { // 查询当前登录人的文书
    return myAxios({
      method: 'post',
      url: '/api/document/queryArbitralDocumentByself',
      data: params
    })
  },
  /*
    管理端接口-------------------
  */
  sysUserLogin (params) { // 登录
    return myAxios({
      headers: { 'User-Code': 'arbitralNp' },
      method: 'post',
      url: '/olap-auth/login',
      data: params
    })
  },
  sysLogout (token) { // 退出
    return myAxios({
      method: 'get',
      url: '/olap-auth/api/sysUserLogout'
    })
  },
  saveArbitralNumber (params) { // 新增案件编号号段
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/saveArbitralNumber',
      data: params
    })
  },
  updateArbitralNumber (params) { // 修改案件编号号段
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateArbitralNumber',
      data: params
    })
  },
  updateNumberStatus (params) { // 修改案件编号号段
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateArbitralNumberStatus',
      data: params
    })
  },
  checkArbitralNumber (params) { // 校验 案件 可用 号段
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/checkArbitralNumber',
      data: params
    })
  },
  getArbitralNumber (params) { // 获取编号号段list
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getArbitralNumber',
      data: params
    })
  },

  updateSysUser (params) { // 修改仲裁员
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateSysUser',
      data: params
    })
  },

  updateSysUserStatus (params) { // 更新仲裁员状态
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateSysUserStatus',
      data: params
    })
  },

  saveArbSysUser (params) { // 新增仲裁员
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/saveSysUser',
      data: params
    })
  },
  deleteSysUser (params) { // 删除仲裁员
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/deleteSysUser',
      data: params
    })
  },
  uploadArbitratorSignature (params) { // 仲裁员签名上传
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/uploadArbitratorSignature',
      data: params
    })
  },

  getSysUserList (params) { // 获取仲裁员列表
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getSysUserList',
      data: params
    })
  },
  selectRoom () { // 获取直播间列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/selectRoom'
    })
  },

  // ------------------->>>初始化案件参数

  getArbitralInitParameterList (params) { // 获取案件列表
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getArbitralInitParameterList',
      data: params
    })
  },

  getArbitralInitsecretaryList (params) { // 查询办案秘书
    return myAxios({
      method: 'get',
      url: '/olap-ac-config-np/api/getArbitralInitsecretaryList ',
      data: params
    })
  },

  getArbitralFtlTemplateList (params) { // 办案模板列表
    return myAxios({
      method: 'get',
      url: '/olap-ac-config-np/api/arbitralFtlTemplate/getArbitralFtlTemplateList',
      data: params
    })
  },

  updateArbitralInitParameter (params) { // 保存
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateArbitralInitParameter ',
      data: params
    })
  },
  getWorkList (params) { // APP端待办事项列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/app/getWorkList',
      data: params
    })
  },

  // --------初始化案件参数---------<<<<<<<<<<

  getSysDictList (type) { // 查询专业列表和职业列表的 type: 1-专业，2-职业
    return myAxios({
      method: 'get',
      url: '/olap-ac-config-np/api/getSysDictList/' + type
    })
  },
  getAdvanceConfigureDataTable (params) { // 获取合同计算公式list
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getAdvanceConfigureDataTable',
      data: params
    })
  },
  // getAdvanceConfigure (params) {  // 根据id查询合同逾期计算公式对象(用户端)
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/getAdvanceConfigure/' + params.id
  //   })
  // },
  // getContractAdvanceMoney (params) {  // 计算违约金(用户端)
  //   return myAxios({
  //     method: 'post',
  //     url: '/olap-user/api/getContractAdvanceMoney',
  //     data: params
  //   })
  // },
  getPayment (params) { // 查询缴费 记录列表
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getPayment',
      data: params
    })
  },
  recharge (params) { // 充值 提现
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/recharge',
      data: params
    })
  },
  rechargeAddAttach (params) { // 充值 提现
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/rechargeAddAttach',
      data: params
    })
  },
  getPrefunRecord (params) { // 查询充值记录
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getPrefunRecord',
      data: params
    })
  },
  getReconciliation (params) { // 查询对账单
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getReconciliation',
      data: params
    })
  },
  queryPrefunRecordDetailById (params) { // 根据id查看预充值, 缴费 等 记录详情
    return myAxios({
      method: 'get',
      url: '/olap-user/api/arbitralFund/queryPrefunRecordDetailById/' + params.id
    })
  },
  queryPrefunRecordAttachmentById (params) { // 根据id查看预充值附件
    return myAxios({
      method: 'get',
      url: '/olap-user/api/arbitralFund/queryPrefunRecordAttachmentById/' + params.id
    })
  },
  addUserPInfo (params) { // 新增用户个人信息
    return myAxios({
      method: 'post',
      url: '/api/addUserPInfo',
      data: params
    })
  },
  updateUserPInfo (params) { // 更新用户个人信息
    return myAxios({
      method: 'post',
      url: '/api/updateUserPInfo',
      data: params
    })
  },
  getUserPInfo (params) { // 查询用户个人信息
    return myAxios({
      method: 'post',
      url: '/api/getUserPInfo',
      data: params
    })
  },
  addUserCoInfo (params) { // 新增企业用户个人信息
    return myAxios({
      method: 'post',
      url: '/api/addUserCoInfo',
      data: params
    })
  },
  // updateUserCoInfo (params) {  // 更新企业用户个人信息
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/updateUserCoInfo',
  //     data: params
  //   })
  // },
  // getUserCoInfo (params) {  // 查询企业用户个人信息
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getUserCoInfo',
  //     data: params
  //   })
  // },
  // getLoginUserAgentInfo (params) {  // 查询代理人数据
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getLoginUserAgentInfo',
  //     data: params
  //   })
  // },
  adminDelAgent (params) { // 仲裁端删除代理人
    return myAxios({
      method: 'get',
      url: '/api/useraccount/delUserAgentInfo/' + params.id,
      data: params
    })
  },
  // userDelAgentInfo (params) {  // 用户端案件申请删除代理人
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/useraccount/userDelAgentInfo/' + params.id,
  //     data: params
  //   })
  // },
  delAgent (params) { // 删除代理人
    return myAxios({
      method: 'get',
      url: '/api/delUserAgentInfo/' + params.id,
      data: params
    })
  },
  getDict (params) { // 查询字典（案由...）
    return myAxios({
      method: 'post',
      url: '/api/dictIndex',
      data: params
    })
  },
  // getDictSys (params) {  // 查询字典（案由...）
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/dictSysIndex',
  //     data: params
  //   })
  // },
  // getMsgDetail (params) {  // 查询消息详细
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/messageDetail/' + params.id
  //   })
  // },
  queryMessageListByType (params) { // 查询消息列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/queryMessageListByType',
      // url: '/olap-arbitral/api/querySysMessageListByType',
      data: params
    })
  },
  queryArbitralProductListByUserAccountId (params) { // 通过企业登录账号id获取产品列表
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/queryArbitralProductListByUserAccountId',
      params: params
    })
  },
  getArbitralProductList (params) { // 查询产品类型列表
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getArbitralProductList',
      data: params
    })
  },
  getAccountInfo (params) { // 查询企业详情
    return myAxios({
      method: 'post',
      url: '/olap-user/user/sysenterprise/getAccountInfo',
      data: params
    })
  },
  // getUserArbitralProduct (params) {  // 用户端查询产品类型列表
  //   return myAxios({
  //     method: 'get',
  //     url: '/olap-ac-config-np/api/getUserArbitralProduct'
  //   })
  // },
  getProductNumberById (params) { // 根据申请人生成产品编号
    return myAxios({
      method: 'get',
      url: `/olap-ac-config-np/api/getProductNumberById/${params.id}`
    })
  },
  saveArbitralProduct (params) { // 新增产品类型
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/saveArbitralProduct',
      data: params
    })
  },
  updateArbitralProduct (params) { // 修改产品类型
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateArbitralProduct',
      data: params
    })
  },
  getArbitralProductInfo (params) { // 获取产品类型详情
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getArbitralProductInfo',
      params: params
    })
  },
  updateArbitralProductStatus (params) { // 修改产品类型启用或停用
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateArbitralProductStatus',
      data: params
    })
  },
  getCalcRuleList (params) { // 查询费用规则
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getFundRegularList',
      data: params
    })
  },
  getFundRegularNumber (params) { // 生成费用规则编号
    return myAxios({
      method: 'get',
      url: '/olap-ac-config-np/api/getFundRegularNumber'
    })
  },
  saveCalcRule (params) { // 新增费用计算规则
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/saveFundRegular',
      data: params
    })
  },
  updateCalcRuleStatus (params) { // 修改费用计算规则的状态
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateArbitralRegularStatus',
      data: params
    })
  },
  updateCalcRule (params) { // 修改费用计算规则
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/updateFundRegular',
      data: params
    })
  },
  // 流程相关
  applyJurisdictionNoPass (params) { // 审核管辖权不通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/applyJurisdictionNoPass',
      data: params
    })
  },
  applyJurisdictionReject (params) { // 审核管辖权拒绝
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/applyJurisdictionReject',
      data: params
    })
  },
  applyJurisdictionPass (params) { // 审核管辖权通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/applyJurisdictionPass',
      data: params
    })
  },
  applyPass (params) { // 案件申请
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/applyPass',
      data: params
    })
  },
  arbitralAwardArrivedSuccess (params) { // 裁决书送达成功
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/arbitralAwardArrivedSuccess',
      data: params
    })
  },
  saveOrUpdateDefencesAttachInfos (params) { // 批量保存答辩资料
    return myAxios({
      method: 'post',
      // url: '/olap-apply/api/opening/arb/process/saveOrUpdateDefencesAttachInfos',
      url: '/olap-process-np/api/process/saveOrUpdateDefencesAttachInfos',
      data: params
    })
  },
  getDefencesAttachInfos (params) { // 查询答辩资料
    return myAxios({
      method: 'post',
      // url: '/olap-arbitral/arbitral/process/process/getDefencesAttachInfos',
      url: '/olap-process-np/api/process/getDefencesAttachInfos',
      data: params
    })
  },
  defencesSuccess (params) { // 答辩成功
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/defencesSuccess',
      data: params
    })
  },
  noDefences (params) { // 放弃答辩
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/noDefences',
      data: params
    })
  },
  hearDocumentPass (params) { // 审核案件材料通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/hearDocumentPass',
      data: params
    })
  },
  hearDocumentNoPass (params) { // 审核案件材料不通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/hearDocumentNoPass',
      data: params
    })
  },
  addOrUpdateRecallInfo (data, params) { // 撤回案件申请
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/addOrUpdateRecallInfo',
      data,
      params
    })
  },
  getBranchRecallInfos (params) { // 查询申请了撤回的案件
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getBranchRecallInfos',
      data: params
    })
  },
  getPassFirstReviewInfos (params) { // 查询初审过后，待终审的案件
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getPassFirstReviewInfos',
      data: params
    })
  },
  getPassFirstReviewRecallInfos (params) { // 查询初审过后，待终审的案件
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getPassFirstReviewRecallInfos',
      data: params
    })
  },

  getBranchRecallInfo (params) { // 查询某案件是否已撤回
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getBranchRecallInfo',
      data: params
    })
  },
  addRecallInfoFirstReview (params) { // 撤回案件初审
    return myAxios({
      method: 'post',
      url: '/olap-apply/api/addRecallInfoFirstReview',
      data: params
    })
  },
  addRecallInfoSecondReview (params) { // 撤回案件终审
    return myAxios({
      method: 'post',
      url: '/olap-apply/api/addRecallInfoSecondReview',
      data: params
    })
  },
  reviewArbitralAwardPass (params) { // 校对裁决书-保存并提交
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/reviewArbitralAwardPass',
      data: params
    })
  },
  saveArbitralAwardContext (params) { // 校对裁决书-保存
    return myAxios({
      method: 'post',
      // url: '/olap-arbitral/arbitral/process/saveArbitralAwardContext',
      url: '/olap-process-np/api/process/saveArbitralAwardContext',
      data: params
    })
  },
  secondReviewArbitralAwardNoPass (params) { // 审核裁决书不通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/secondReviewArbitralAwardNoPass',
      data: params
    })
  },
  secondReviewArbitralAwardPass (params) { // 审核裁决书通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/secondReviewArbitralAwardPass',
      data: params
    })
  },
  registerDocumentArrivedSuccess (params) { // 立案文书送达成功
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/registerDocumentArrivedSuccess',
      data: params
    })
  },
  getHistroyTaskInst (params) { // 根据流程实例id查询历史活动任务
    return myAxios({
      method: 'get',
      url: '/olap-process-np/api/arbitralInfoPorcess/getHistroyTaskInst',
      params: params
    })
  },
  getPaymentNotice (params) { // 仲裁端案件缴费送达通知查看列表
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/getPaymentNotice',
      data: params
    })
  },
  getGenerateFormalCodeAndSendPaymentEmail (params) { // 仲裁端案件缴费送达通知查看列表
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/getGenerateFormalCodeAndSendPaymentEmail',
      data: params
    })
  },
  getArbitralInfosBySys (params) { // 仲裁端案件查看列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitralInfosBySys',
      data: params
    })
  },
  getArbitralInfoDetailBySys (params) { // 获取案件详情
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitralInfoDetailBySys',
      data: params
    })
  },
  getDebtAuditJurisdictionDetail (params) { // 获取案件详情批次
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getDebtAuditJurisdictionDetail',
      data: params
    })
  },
  getUserAccountList (params) { // 获取用户信息
    return myAxios({
      method: 'post',
      // url: '/olap-arbitral/api/queryUserCoInfo',
      url: '/olap-user/getUserAccountList',
      data: params
    })
  },
  addArbitralAwardTemplate (params) { // 新增裁决书模板
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/ArbitralAwardTemplate/addArbitralAwardTemplate',
      data: params
    })
  },
  updateArbitralAwardTemplate (params) { // 修改裁决书模板
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/ArbitralAwardTemplate/updateArbitralAwardTemplate',
      data: params
    })
  },
  queryArbitralAwardTemplateById (params) { // 查询裁决书模板详情
    return myAxios({
      method: 'get',
      url: '/olap-ac-config-np/api/ArbitralAwardTemplate/queryArbitralAwardTemplateById/' + params.id
    })
  },
  getArbitralAwardTemplate (params) { // 维护裁决书模板列表
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/ArbitralAwardTemplate/getArbitralAwardTemplate',
      data: params
    })
  },
  updateStatusBatch (params) { // 维护裁决书模板列表 批量修改 状态
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/ArbitralAwardTemplate/updateStatusBatch',
      data: params
    })
  },
  queryArbitralDocumentBatch (params) { // 批量查询案件文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryArbitralDocumentBatch',
      data: params
    })
  },
  queryProcessArbitralDocument (params) { // 线上邮递文书查询（已送达的文书不返回）
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryProcessArbitralDocument',
      data: params
    })
  },
  messageArrivedArbitralDocumentBatch (params) { // 短信文书批量送达（已送达的文书不返回）
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/messageArrivedArbitralDocumentBatch',
      data: params
    })
  },
  queryArbitralDocumentMessageRecord (params) { // 短信文书查询（已送达的文书不返回）
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryArbitralDocumentMessageRecord',
      data: params
    })
  },
  queryDocumentMessageSingleArrivedInfo (params) { // 短信单个送达文书查询
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryDocumentMessageSingleArrivedInfo',
      data: params
    })
  },
  queryDocumentMessageBatchArrivedInfo (params) { // 短信批量送达文书查询
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryDocumentMessageBatchArrivedInfo',
      data: params
    })
  },
  sendDocumentMessage (params) { // 短信单个/批量送达
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/sendDocumentMessage',
      data: params
    })
  },
  queryDocumentEmailSingleArrivedInfo (params) { // 邮箱单个送达文书查询
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryDocumentEmailSingleArrivedInfo',
      data: params
    })
  },
  queryDocumentEmailBatchArrivedInfo (params) { // 邮箱批量送达文书查询
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryDocumentEmailBatchArrivedInfo',
      data: params
    })
  },
  sendDocumentEmail (params) { // 邮箱单个送达
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/sendDocumentEmail',
      data: params
    })
  },
  sendBatchDocumentEmail (params) { // 邮箱批量送达
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/sendBatchDocumentEmail',
      data: params
    })
  },
  queryDocumentPostSingleArrivedInfo (params) { // 快递单个送达文书查询
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryDocumentPostSingleArrivedInfo',
      data: params
    })
  },
  queryDocumentPostBatchArrivedInfo (params) { // 快递单个送达文书查询
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryDocumentPostBatchArrivedInfo',
      data: params
    })
  },
  saveOrUpdateArbitralExpressRecordBatch (params) { // 快递单个送达
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/saveOrUpdateArbitralExpressRecordBatch',
      data: params
    })
  },
  querySmsProcessArbitralDocument (params) { // 短信发送文书查询新增19-5-16
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/querySmsProcessArbitralDocument',
      data: params
    })
  },
  arrivedSmsArbitralDocumentBatch (params) { //  短信(发送接口)
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/arrivedSmsArbitralDocumentBatch',
      data: params
    })
  },
  getH5ArbitralList (params) { //  短信(列表接口)
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/smsDocument/getH5ArbitralList',
      data: params
    })
  },
  queryArbitralDocumentExpressRecord (params) { // 线下邮递文书记录查询（包含补发）
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryArbitralDocumentExpressRecord',
      data: params
    })
  },
  arrivedArbitralDocumentBatch (params) { // 批量送达案件文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/arrivedArbitralDocumentBatch',
      data: params
    })
  },
  arrivedArbitralDocument (params) { // 单个送达案件文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/arrivedArbitralDocument',
      params: params
    })
  },
  uploadArbitralDocuments (params) { // 批量上传文书签章
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/uploadArbitralDocuments',
      data: params,
      onUploadProgress: function (progressEvent) {
        // console.log(progressEvent)
      }
    })
  },
  getArbitralTimeLimit (params) { // 查询案件时限设置
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/getArbitralTimeLimit',
      params: params
    })
  },
  saveArbitralTimeLimit (params) { // 新增/修改案件时限设置
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/saveArbitralTimeLimit',
      data: params
    })
  },
  getAllArbitralInfos (params) { //  查询所有的案件
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getAllArbitralInfos',
      data: params
    })
  },
  getOperationalTotal (params) { // 获取案件列表可操作案件数,（目前不兼容仲裁端）
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getOperationalTotal',
      data: params
    })
  },
  getEvidenceSuppleList (params) { //  仲裁端-案件管理-证据补充列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getEvidenceSuppleList',
      data: params
    })
  },
  getEvidenceSuppleInfoByArbId (params) { //   仲裁端-案件管理-证据信息(点开一个显示)
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getEvidenceSuppleInfoByArbId',

      params
    })
  },
  suppleEvidence (params) { //    仲裁端-案件管理-证据补充
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/suppleEvidence',
      data: params
    })
  },
  getArbitralInfoDetailBySysAboutJudge (params) { //  查询案件详细和裁决书html字串
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitralInfoDetailBySysAboutJudge',
      data: params
    })
  },
  arrivedArbitralAwardBatch (params) { //  批量送达案件裁决书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/arrivedArbitralAwardBatch',
      data: params
    })
  },
  postMail (params) { //  线下邮递
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/saveOrUpdateArbitralExpressRecordBatch',
      data: params
    })
  },
  deleteExpressRecord (params) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/deleteArbitralDocumentExpressRecord',
      data: params
    })
  },
  getRecordForTribunalMsg (params) { //  查询组庭时间和仲裁员
    return myAxios({
      method: 'post',
      url: '/api/getRecordForTribunalMsg',
      data: params
    })
  },
  hearJudge (params) { //  管理端组庭
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/hearJudge',
      data: params
    })
  },
  canMergerCourt (params) { //  校验能否组庭
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/canMergerCourt',
      data: params
    })
  },
  mergerCourt (params) { //  批量组庭
    return myAxios({
      method: 'post',
      // url: '/api/process/hearJudge',
      url: '/olap-process-np/api/process/mergerCourt',
      data: params
    })
  },
  hearJudges (params) { //  管理端批量组庭(已弃用,批量组庭用上面的接口)
    return myAxios({
      method: 'post',
      // url: '/api/process/hearJudge',
      url: '/olap-process-np/api/getMergeCourtInfo',
      data: params
    })
  },
  addLiveStudio (params) { //  管理端组庭-直播信息提交
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/live/addLiveStudio',
      data: params
    })
  },
  getAllArbitralInfosAboutReviewJudge (params) { //  审核裁决书-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getAllArbitralInfosAboutReviewJudge',
      data: params
    })
  },
  getAuditJurisdictionArbitralInfos (params) { //  审核管辖权-列表
    return myAxios({
      method: 'post',
      // url: '/olap-arbitral/api/getAuditJurisdictionArbitralInfos',
      url: '/olap-process-np/api/getAuditJurisdictionArbitralList',
      data: params
    })
  },
  batchApplyCheck (params) { //  批量审核管辖权-校验
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/batchProcess/batchApplyCheck',
      data: params
    })
  },
  batchApplyJurisdictionNoPass (params) { // 批量审核管辖权不通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/batchProcess/batchApplyJurisdictionNoPass',
      data: params
    })
  },
  // batchApplyJurisdictionReject (params) {  // 批量审核管辖权拒绝
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/batchProcess/batchApplyJurisdictionReject',
  //     data: params
  //   })
  // },
  batchApplyJurisdictionPass (params) { // 批量审核管辖权通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/batchProcess/batchApplyJurisdictionPass',
      data: params
    })
  },
  getJudgeArbitralInfos (params) { //  校对裁决书-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getJudgeArbitralInfos',
      data: params
    })
  },
  getOfflineTribunalArriveArbitralInfos (params) { //  线下组庭送达-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getOfflineTribunalArriveArbitralInfos',
      data: params
    })
  },
  getMergerCourtArrivedInfo (params) { //  线下合并组庭送达-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getMergerCourtArrivedInfo',
      data: params
    })
  },
  getAdjudicationByRecordArriveArbitralInfos (params) { //  线上书面审理送达-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getAdjudicationByRecordArriveArbitralInfos',
      data: params
    })
  },
  getRegisterArbitralInfos (params) { //  立案-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getRegisterArbitralInfos',
      data: params
    })
  },
  getReplyArbitralInfos (params) { //  答辩-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getReplyArbitralInfos',
      data: params
    })
  },
  getReviewArbitralInfos (params) { //  审核案件材料-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getReviewArbitralInfos',
      data: params
    })
  },
  getTribunalArbitralInfos (params) { //  组庭-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getTribunalArbitralInfos',
      data: params
    })
  },
  getTribunalRecordArbitralInfos (params) { //  开庭笔录-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getTribunalRecordArbitralInfos',
      data: params
    })
  },
  getJudgeArrivedArbitralInfos (params) { //  送达裁决书-列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getJudgeArrivedArbitralInfos',
      data: params
    })
  },
  queryArbitralCourtRecord (params) { //  查询开庭笔录模板
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryArbitralCourtRecord',
      data: params
    })
  },
  hearJudgePaperReach (params) { //  线下审理通知书送达
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/hearJudgePaperReach',
      data: params
    })
  },
  hearJudgeUploadPaperReach (params) { //  书面审理通知书送达
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/hearJudgeUploadPaperReach',
      data: params
    })
  },
  mergeCourtOfflinePaperReach (params) { // 线下合并组庭-文书确认送达复制地
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/mergeCourtOfflinePaperReach',
      data: params
    })
  },
  mergeCourtOnlinePaperReach (params) { // 线下合并组庭-文书确认送达复制地
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/mergeCourtOnlinePaperReach',
      data: params
    })
  },
  hearJudgeOUploadRecord (params) { //  保存并提交开庭笔录
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/hearJudgeOUploadRecord',
      data: params
    })
  },
  saveHearRecordContext (params) { //  保存开庭笔录
    return myAxios({
      method: 'post',
      // url: '/olap-arbitral/arbitral/process/saveHearRecordContext',
      url: '/olap-process-np/api/process/saveHearRecordContext',
      data: params
    })
  },
  queryHearRecordContext (params) { //  查询已保存的开庭笔录详情
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryHearRecordContext',
      data: params
    })
  },
  getMediateArbitralInfos (params) { //  案件调解查看列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getMediateArbitralInfos',
      data: params
    })
  },
  getMediationDocument (params) { //  下载调解书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/getMediationDocument',
      params: params
    })
  },
  saveMediationAttach (params) { //  保存调解附件
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/saveMediationAttach',
      data: params
    })
  },
  arbitralMediateSuccess (params) { //  提交调解
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/arbitralMediateSuccess',
      data: params
    })
  },
  getMediationAttachInfos (params) { //  查询调解资料
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/arbitral/process/getMediationAttachInfos',
      data: params
    })
  },
  // ------------------系统设置------>>>>>>>>>

  getUserList (data) { // 获取用户端账号
    return myAxios({
      url: '/olap-arbitral/api/useraccount/list',
      method: 'post',
      data: data
    })
  },
  getAdministratorList (url) { // 获取管理端账号
    return myAxios({
      url,
      method: 'post'
    })
  },
  getUserAccountInfo (url) { // 获取用户详细信息
    return myAxios({
      url,
      method: 'get'
    })
  },

  saveUserAccountInfo (params) { // 保存前端用户信息
    return myAxios({
      method: 'post',
      url: '/api/useraccount/save',
      data: params
    })
  },

  updateUserAccountInfo (params) { // 更新前端用户信息
    return myAxios({
      method: 'post',
      url: '/api/useraccount/update',
      data: params
    })
  },
  updateUserAccountStatus (params) { // 更新前端用户信息
    return myAxios({
      method: 'post',
      url: '/api/useraccount/updateUserAccountStatus',
      data: params
    })
  },
  deleteUser (params) { // 删除前端用户
    return myAxios({
      method: 'post',
      url: '/api/useraccount/delete',
      data: params
    })
  },
  additableUserCoInfo (params) { // 添加子公司
    return myAxios({
      method: 'post',
      url: '/api/additableUserCoInfo',
      data: params
    })
  },
  queryAdditableUserCoInfo (params) { // 查询所有可设置的子公司/母公司列表
    return myAxios({
      method: 'post',
      url: '/api/queryAdditableUserCoInfo',
      data: params
    })
  },
  queryAdditableUserCoInfoByCompany (params) { // 查询所选公司下的子公司/母公司列表
    return myAxios({
      method: 'post',
      url: '/api/queryAdditableUserCoInfoByCompany',
      data: params
    })
  },
  resetPassword (params) { // 重置密码
    return myAxios({
      method: 'post',
      url: '/api/useraccount/updatePassword',
      params: params
    })
  },
  sendUserAccountAuthEmail (params) { // 发送授权邮件
    return myAxios({
      method: 'post',
      url: '/api/user/sendUserAccountAuthEmail',
      data: params
    })
  },
  getSysUserInfo (url) { // 获取系统用户详细信息
    return myAxios({
      url,
      method: 'post'
    })
  },

  saveSysUser (url) { // 保存系统用户信息
    return myAxios({
      url,
      method: 'post'
    })
  },

  saveAdminSysUser (params) { // 保存系统用户信息
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/user/save',
      data: params
    })
  },

  updateAdminSysUser (params) { // 更新系统用户信息
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/user/update',
      data: params
    })
  },
  deleteAdminSysUser (params) { // 修改账户状态
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/user/delete',
      params: params
    })
  },
  delSysUser (params) { // 删除系统用户
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/user/delSysUser',
      params: params
    })
  },

  getRoleList (url) { // 获取系统角色列表
    return myAxios({
      url,
      method: 'post'
    })
  },

  deleteRole (params) { // 删除系统用户
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/role/delete',
      data: params
    })
  },

  getRoleInfo (url) { // 获取系统用户详细信息
    return myAxios({
      url,
      method: 'post'
    })
  },

  saveRoleInfo (params) { // 保存角色信息
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/role/save',
      data: params
    })
  },
  updateRoleInfo (params) { // 更新角色信息
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/role/update',
      data: params
    })
  },
  getMenuList (url) { // 获取系统菜单列表
    return myAxios({
      url,
      method: 'post'
    })
  },
  menulists () { // 查询菜单权限
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/sys/menu/user'
      // url: '/olap/api/menulists'
    })
  },
  // -------------系统设置--------<<<<<<<<<<<

  // getUserPayment (params) {  //  用户中心账单列表
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/arbitralFund/getUserPayment',
  //     data: params
  //   })
  // },
  // getUserReconciliation (params) {  //  查询用户中心 余额
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/arbitralFund/getUserReconciliation',
  //     data: params
  //   })
  // },
  addOrUpdateProcedure (params) { //  新增、修改仲裁程序
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/procedure/addOrUpdateArbitralProcedure',
      data: params
    })
  },
  queryProcedures (params) { //  查询仲裁程序列表
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/procedure/queryArbitralProcedures',
      data: params
    })
  },
  getProcedures (params) { //  查询所有仲裁程序
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/procedure/getArbitralProcedures',
      data: params
    })
  },
  updateProcedureStatus (params) { //  批量修改仲裁程序状态
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/procedure/updateArbitralProcedureStatus',
      data: params
    })
  },
  getRechargeAuditList (params) { //  获取充值审核列表
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getRechargeAuditList',
      data: params
    })
  },
  rechargeAudit (params) { //  获取充值审核列表
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/rechargeAudit',
      data: params
    })
  },
  getDecisionList (params) { //  获取管辖权异议待申请列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/getDecisionList',
      data: params
    })
  },
  getDecisionGiveList (params) { //  获取管辖权异议送达列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/getDecisionGiveList',
      data: params
    })
  },
  getApplicantList (params) { //  获取管辖权异议申请人集合
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/getApplicantList',
      data: params
    })
  },
  applyDecision (params) { //  管辖权异议申请
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/applyDecision',
      data: params
    })
  },
  descisionDocumentBatch (params) { // 异议批量送达案件文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/descisionDocumentBatch',
      data: params
    })
  },
  updateArbitralDecisionBatch (params) { // 异议批量送达案件文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/updateArbitralDecisionBatch',
      data: params
    })
  },
  decisionDocumentArrivedSuccess (params) { // 异议送达成功
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/decisionDocumentArrivedSuccess',
      data: params
    })
  },
  // saveDecisionDefencesAttachInfos (params) {  // 异议答辩
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/decision/saveDecisionDefencesAttachInfos',
  //     data: params
  //   })
  // },
  getDesisionToExamineList (params) { // 异议审核列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/getDesisionToExamineList',
      data: params
    })
  },
  getArbitralDecisionDetail (params) { // 异议审核详情
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/getArbitralDecisionDetail',
      data: params
    })
  },
  desisionToExamine (params) { // 异议审核
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/decision/desisionToExamine',
      data: params
    })
  },
  updateTemporaryNum (params) { //  获取充值审核列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/updateTemporaryNum',
      params
    })
  },
  getArbitralDecisionReviewInfos (params) { //  管辖权异议【校对裁决书】查看列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/getArbitralDecisionReviewInfos',
      data: params
    })
  },
  getArbitralDecisionCheckInfos (params) { //  管辖权异议【核对裁决书】查看列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/getArbitralDecisionCheckInfos',
      data: params
    })
  },
  getArbitralDecisionVerifyInfos (params) { //  管辖权异议【审核裁决书】查看列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/getArbitralDecisionVerifyInfos',
      data: params
    })
  },
  getArbitralDecisionReviewDetail (params) { //  管辖权异议查看详情【校对决定书】
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/getArbitralDecisionReviewDetail',
      data: params
    })
  },
  arriveArbitralDecisionAwardSuccess (params) { //  管辖权异议查看详情【校对决定书】
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/arriveArbitralDecisionAwardSuccess',
      data: params
    })
  },
  // getArbitralDecisionDetail (params) {  //  管辖权异议查看详情
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/arbitral/decision/getArbitralDecisionDetail',
  //     data: params
  //   })
  // },
  // getArbitralOpenCourtList (params) {  //  管辖权异议查看详情
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getArbitralOpenCourtList',
  //     data: params
  //   })
  // },
  // getTribunalToMergeInfo (params) {  //  管辖权异议查看详情
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/getTribunalToMergeInfo',
  //     data: params
  //   })
  // },
  // mergeOpenCourt (params) {  //  管辖权异议查看详情
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/mergeOpenCourt',
  //     data: params
  //   })
  // },
  checkArbitralDecisionNoPass (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/checkArbitralDecisionNoPass',
      data
    })
  },
  checkArbitralDecisionPass (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/checkArbitralDecisionPass',
      data
    })
  },
  reviewArbitralDecision (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/reviewArbitralDecision',
      data
    })
  },
  verifyArbitralDecisionNoPass (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/verifyArbitralDecisionNoPass',
      data
    })
  },
  verifyArbitralDecisionPass (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/verifyArbitralDecisionPass',
      data
    })
  },
  getTribunalMergeRecordArbitralInfos (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getTribunalMergeRecordArbitralInfos',
      data
    })
  },
  canMergerHear (data) { //  校验是否能合并开庭
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/canMergerHear',
      data
    })
  },
  mergerHear (data) { //  合并开庭
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/mergerHear',
      data
    })
  },
  // mergeOpenCourt (data) {  //  合并开庭(废弃不用)
  //   return myAxios({
  //     method: 'post',
  //     url: '/olap-arbitral/api/mergeOpenCourt',
  //     data
  //   })
  // },
  getTribunalToMergeInfo (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getTribunalToMergeInfo',
      data
    })
  },
  getArbitralOpenCourtList (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitralOpenCourtList',
      data
    })
  },
  getLiveStudioList (data) { //  获取在线直播列表
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/live/getLiveStudioList',
      data
    })
  },
  updateLiveStatus (data) { //  更改直播状态[仲裁用户]
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/live/updateLiveStatus',
      data
    })
  },
  getArbitralInfoDetailForMergeHearRecord (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitralInfoDetailForMergeHearRecord',
      params: data
    })
  },
  getArbitralDecisionAwardArrive (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/getArbitralDecisionAwardArrive',
      data
    })
  },
  getAllArbitralInfosAboutCheckJudge (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getAllArbitralInfosAboutCheckJudge',
      data
    })
  },
  checkArbitralAwardPass (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-process-np/api/process/checkArbitralAwardPass',
      data
    })
  },
  queryArbitralMergeCourtRecord (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryArbitralMergeCourtRecord',
      params: data
    })
  },
  queryMergeHearRecordContext (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/queryMergeHearRecordContext',
      params: data
    })
  },
  hearMergeJudgeOUploadRecord (data) { //  录入合并开庭笔录
    return myAxios({
      method: 'post',
      // url: '/olap-process-np/api/process/hearMergeJudgeOUploadRecord',
      url: '/olap-process-np/api/process/hearMergeJudgeOUploadRecord',
      data
    })
  },
  saveMergeHearRecordContext (data) { //  保存合并开庭笔录html内容
    return myAxios({
      method: 'post',
      // url: '/olap-arbitral/arbitral/process/process/saveMergeHearRecordContext',
      url: '/olap-process-np/api/process/saveMergeHearRecordContext',
      data
    })
  },
  saveArbitralDecisionAward (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/arbitral/decision/saveArbitralDecisionAward',
      data
    })
  },
  deleteArbitralRegular (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-ac-config-np/api/deleteArbitralRegular',
      params
    })
  },
  deleteUploadedCourtRecord (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/deleteUploadedCourtRecord',
      params
    })
  },
  deleteUploadedMergeCourtRecord (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/deleteUploadedMergeCourtRecord',
      params
    })
  },
  getArbitalResourcePool (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getArbitalResourcePool',
      data
    })
  },
  getToBeAllocatedInfo (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/getToBeAllocatedInfo',
      data
    })
  },
  rechargeAuditNp (params) { //  预充值审核-南平
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/np_RechargeAudit',
      data: params
    })
  },
  allocateArbitralInfo (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/allocateArbitralInfo',
      data
    })
  },

  // ----------首页------------------>>>>>>>>>>>>>>>>>
  // getUserIndexArbitralInfo (data) {  //  首页获取案件统计信息
  //   return myAxios({
  //     method: 'post',
  //     url: '/userIndex/getUserIndexArbitralInfo',
  //     data
  //   })
  // },

  addUserFundRecordInfo (data) { //  案件列表充值
    return myAxios({
      method: 'post',
      url: '/api/arbitralFund/addUserFundRecordInfo',
      data
    })
  },
  // userVerifyNewEmail (data) {  // 个人中心-更换邮箱-获取邮箱验证码
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/user/userVerifyNewEmail',
  //     data
  //   })
  // },
  // verifyUserNewEmailCode (data) {  // 个人中心-更换邮箱-验证邮箱验证码
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/user/verifyUserNewEmailCode',
  //     data
  //   })
  // },

  // queryBatchFileApplys (data) {  //  管辖权异议【核对决定书】审核不通过
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/queryBatchFileApplys',
  //     data
  //   })
  // },
  // queryBatchFileApplyDetail (data) {  //  管辖权异议【核对决定书】审核不通过
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/queryBatchFileApplyDetail',
  //     data
  //   })
  // },
  // uploadBatchFile (data) {  //  管辖权异议【核对决定书】审核不通过
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/uploadBatchFile',
  //     data
  //   })
  // },
  // downloadTempOperatingManual (data) {  //  管辖权异议【核对决定书】审核不通过
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/downloadTempOperatingManual',
  //     responseType: 'blob',
  //     data
  //   })
  // },
  // downloadTempBatchApply (data) {  //  管辖权异议【核对决定书】审核不通过
  //   return myAxios({
  //     method: 'get',
  //     url: '/api/downloadTempBatchApply',
  //     responseType: 'blob',
  //     data
  //   })
  // },
  findVideo (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/video/findVideo',
      params
    })
  },
  findMergeVideo (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/video/findMergeVideo',
      params
    })
  },
  deleteVideo (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/video/deleteVideo',
      params
    })
  },
  deleteMergeVideo (params) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/video/deleteMergeVideo',
      params
    })
  },
  // queryArbitralProducts (params) {  //  管辖权异议【核对决定书】审核不通过
  //   return myAxios({
  //     method: 'post',
  //     url: '/api/opening/arb/queryArbitralProducts',
  //     params
  //   })
  // },
  // 会议室相关api
  addMeeting (data) {
    return myAxios({
      method: 'post',
      url: '/api/hst/addMeeting',
      data
    })
  },

  deleteMeeting (params) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/deleteMeeting',
      params
    })
  },
  listMeeting (data) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/listMeeting',
      data
    })
  },
  meetingAccountInfo (data) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/meetingAccountInfo',
      data
    })
  },
  updateMeeting (data) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/updateMeeting',
      data
    })
  },
  createOrUpdateMeetingAccount (params) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/createOrUpdateMeetingAccount',
      params
    })
  },
  existMeetingAccount (data) {
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/hst/existMeetingAccount',
      data
    })
  },

  readSmsDocument (params) { // 手机端查询文书列表
    return myAxios({
      method: 'get',
      // url: '/oauth/messageDocumentList',
      url: '/olap-arbitral/api/document/readSmsDocument',
      params: params
    })
  },
  getBatchDeliveryDocuments (params) { // 查看批量送达文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/getBatchDeliveryDocuments',
      data: params
    })
  },
  getArbitratorSentDocuments (params) { // 查看仲裁员批量送达文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/getArbitratorSentDocuments',
      data: params
    })
  },
  batchDeliveryArbitratorDocuments (params) { // 仲裁员批量送达
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/batchDeliveryArbitratorDocuments',
      data: params
    })
  },
  getUserRechargeRecord (params) { // 用户充值记录列表
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getUserRechargeRecord',
      data: params
    })
  },
  batchDeliveryDocuments (params) { // 批量送达文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/batchDeliveryDocuments',
      data: params
    })
  },
  batchUploadDocuments (params) { // 批量送达文书
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/document/batchUploadDocuments',
      data: params
    })
  },
  downloadTempBatchModifyAward (data) { //  管辖权异议【核对决定书】审核不通过
    return myAxios({
      method: 'get',
      url: '/olap-arbitral/api/downloadTempBatchModifyAward',
      responseType: 'blob',
      data
    })
  },
  getIndexMap (params) { // 地图
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/userIndex/getIndexMap',
      data: params
    })
  },
  getArbPayList (params) { // 财务中心 案件缴费明细
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/financial/getArbPayList',
      data: params
    })
  },
  getCompanyRechargeList (params) { // 财务中心 企业充值明细
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getCompanyRechargeList',
      data: params
    })
  },
  getArbIndexHeadInfo (params) { // 财务中心 头部数据 工作台
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getArbIndexHeadInfo',
      params: params
    })
  },
  queryDictCodes (params) { // 财务中心 头部数据
    return myAxios({
      method: 'post',
      url: '/olap-apply/api/opening/arb/queryDictCodes',
      data: params
    })
  },
  getPaymentStatistics (params) { // 工作台 案件缴费统计
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getPaymentStatistics',
      data: params
    })
  },
  getArbIndexToADoInfo (params) { // 工作台 待办事项
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getArbIndexToADoInfo',
      data: params
    })
  },
  getUserIndexHistogram (params) { // 工作台 案件数统计
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/userIndex/getUserIndexHistogram',
      data: params
    })
  },
  getArbIndexRanking (params) { // 工作台 案由排名
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getArbIndexRanking',
      data: params
    })
  },
  getCompanyArbProportion (params) { // 工作台 企业案件占比
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getCompanyArbProportion',
      data: params
    })
  },
  getCompanyInfo (params) { // 查看企业
    return myAxios({
      method: 'get',
      url: '/olap-user/user/sysenterprise/info/' + params.companyCode
    })
  },
  getCloseCaseCount (params) { // 工作台 企业案件占比
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getCloseCaseCount',
      data: params
    })
  },
  getArbTotalCountInfo (params) { // 工作台 申请案件总数
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/getArbTotalCountInfo',
      data: params
    })
  },
  getCompanyBatchAuditList (params) { // 批量充值审核
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getCompanyBatchAuditList',
      data: params
    })
  },
  getArbitralInfoByBatchNumber (params) { // 批量充值审核下的案情
    return myAxios({
      method: 'post',
      url: '/olap-arbitral/api/financial/getArbitralInfoByBatchNumber',
      data: params
    })
  },
  getBatchAuditRechargeInfo (params) { // 批量充值审核点击查看的 审批详情
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getBatchAuditRechargeInfo',
      params: params
    })
  },
  batchAuditRecharge (params) { // 批量充值审核提交
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/batchAuditRecharge',
      data: params
    })
  },
  getFundListInfo (params) { // 单案查看
    return myAxios({
      method: 'post',
      url: '/olap-user/api/arbitralFund/getFundListInfo',
      params: params
    })
  },
  updateArbName (params) { // 修改案由
    return myAxios({
      method: 'post',
      url: '/olap-apply/api/updateArbName',
      data: params
    })
  }
}
export { api }
