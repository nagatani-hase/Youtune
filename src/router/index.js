import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Timer',
    component: () => import('../views/Timer.vue')
  },
  {
    path: '/youSupport',
    name: 'YouSupport',
    component: () => import('../views/YouSupport.vue')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
