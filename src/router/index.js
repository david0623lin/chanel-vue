import { createRouter, createWebHistory } from 'vue-router'
import LayoutComponent from '@/components/LayoutComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'Home',
      meta: { 
        title: '首頁',
      },
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
      path: '/task',
      name: 'Task',
      meta: { 
        title: '任務管理',
      },
      component: LayoutComponent,
      children: [
        {
          path: '',
          name: '',
          component: () => import("@/views/TaskView.vue")
        },
      ],
    },
  ]
})

export default router
