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
      component: LayoutComponent,
      meta: {
        icon: '/src/assets/feather/airplay.svg'
      },
      children: [
        {
          path: '/home',
          name: 'Home',
          component: () => import("@/views/HomePage.vue"),
          meta: {
            icon: '/src/assets/feather/airplay.svg'
          }
        },
      ],
    },
    {
      path: '/task',
      name: 'Task',
      component: LayoutComponent,
      meta: {
        icon: '/src/assets/feather/airplay.svg'
      },
      children: [
        {
          path: '/task/manage',
          name: 'TaskManage',
          component: () => import("@/views/TaskView.vue"),
          meta: {
            icon: '/src/assets/feather/airplay.svg'
          }
        },
        {
          path: '/task/create',
          name: 'TaskCreate',
          component: () => import("@/views/HomePage.vue"),
          meta: {
            icon: '/src/assets/feather/airplay.svg'
          }
        },
      ],
    },
  ]
})

export default router
