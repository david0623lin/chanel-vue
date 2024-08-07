import { createRouter, createWebHistory } from 'vue-router'
import LayoutComponent from '@/components/LayoutComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      meta: { title: '首頁' },
      component: LayoutComponent,
      children: [
        {
          path: '',
          name: '',
          component: () => import("@/views/HomePage.vue")
        },
      ],
    },
    {
      path: '/home2',
      name: 'home2',
      meta: { title: '首頁2' },
      component: LayoutComponent,
      children: [
        {
          path: '',
          name: '',
          component: () => import("@/views/Home2Page.vue")
        },
      ],
    },
  ]
})

export default router
