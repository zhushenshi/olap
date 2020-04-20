import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('../views/Portal.vue'),
    redirect: '/portal/home',
    children: [
      {
        path: '/portal/home',
        name: 'portalHome',
        component: () => import(/* webpackChunkName: "portal/Home" */ '../views/home')
      },
      {
        path: '/portal/toDoList',
        name: 'portalToDoList',
        component: () => import(/* webpackChunkName: "portal/toDoList" */ '../views/ToDoList.vue')
      },
      { // 案件查询
        path: '/portal/queryArbitral',
        name: 'portalQueryArbitral',
        component: () => import(/* webpackChunkName: "portal/queryArbitral" */ '../views/QueryArbitral')
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home')
  },
  {
    path: '/toDoList',
    name: 'toDoList',
    component: () => import(/* webpackChunkName: "ToDoList" */ '../views/ToDoList.vue')
  },
  {
    path: '/toDoList/auditArbitralDetail', // 审核裁决书
    name: 'auditArbitralDetail',
    component: () => import(/* webpackChunkName: "auditArbitralDetail" */'../views/AuditArbitralDetail.vue')
  },
  {
    path: '/toDoList/rechargeDetail', // 充值审核
    name: 'rechargeDetail',
    component: () => import(/* webpackChunkName: "rechargeDetail" */'../views/RechargeDetail.vue')
  },
  {
    path: '/toDoList/RechargExamine', // 充值审核审核
    name: 'RechargExamine',
    component: () => import(/* webpackChunkName: "RechargExamine" */ '../views/RechargExamine.vue')
  },
  {
    path: '/toDoList/examine', // 审核裁决书
    name: 'examine',
    component: () => import(/* webpackChunkName: "examine" */ '../views/Examine.vue')
  },
  {
    path: '/toDoList/examine/examineResult', // 审核结果
    name: 'examineResult',
    component: () => import(/* webpackChunkName: "examineResult" */'../views/ExamineResult.vue')
  },
  {
    path: '/toDoList/auditRecharge', // 充值审核
    name: 'auditRecharge ',
    component: () => import(/* webpackChunkName: "auditRecharge" */ '../views/AuditRecharge.vue')
  },
  {
    path: '/caseDetails', // 案件详情
    name: 'CaseDetails',
    component: () => import(/* webpackChunkName: "caseDetail" */ '../views/caseDetail')
  },
  { // 案件查询
    path: '/queryArbitral',
    name: 'QueryArbitral',
    component: () => import(/* webpackChunkName: "QueryArbitral" */ '../views/QueryArbitral.vue')
  },
  {
    path: '/queryArbitral/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue')
  },
  {
    path: '*', // 此处需置于最底部
    redirect: '/404'
  }
]

const router = new VueRouter({
  routes
})

export default router
