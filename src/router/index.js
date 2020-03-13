import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/toDoList',
    name: 'toDoList',
    component: () => import('../views/ToDoList.vue')
  },
  {
    path: '/toDoList/auditArbitralDetail', // 审核裁决书
    name: 'auditArbitralDetail',
    component: () => import('../views/AuditArbitralDetail.vue')
  },
  {
    path: '/toDoList/examine', // 审核裁决书
    name: 'examine',
    component: () => import('../views/Examine.vue')
  },
  {
    path: '/toDoList/examine/examineResult', // 审核结果
    name: 'examineResult',
    component: () => import('../views/ExamineResult.vue')
  },
  {
    path: '/toDoList/auditRecharge', // 充值审核
    name: 'auditRecharge ',
    component: () => import('../views/AuditRecharge.vue')
  },
  {
    path: '/caseDetails', // 案件详情
    name: 'CaseDetails ',
    component: () => import('../views/CaseDetails.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
