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
      path: '/schedule',
      name: 'Schedule',
      component: LayoutComponent,
      meta: {
        icon: '/src/assets/feather/calendar.svg'
      },
      children: [
        {
          path: '/schedule/task',
          name: 'Task',
          component: () => import("@/views/TaskView.vue"),
          meta: {
            icon: '/src/assets/feather/layers.svg'
          }
        },
        {
          path: '/schedule/cron',
          name: 'Cron',
          component: () => import("@/views/CronView.vue"),
          meta: {
            icon: '/src/assets/feather/package.svg'
          }
        },
      ],
    },
  ]
})

export default router
