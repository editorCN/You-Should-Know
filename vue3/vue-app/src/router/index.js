import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
  {
    path: '/',
    component: _ => import('../pages/home.vue')
  },
  {
    path: '/about',
    component: _ => import('../pages/about.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
