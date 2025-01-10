import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
} from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { isAuthenticated } from '@/utils/auth'

const newRoutes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/pages/Login.vue'),
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          if (isAuthenticated()) {
            next('/')
          } else {
            next()
          }
        },
      },
    ],
  },
  {
    path: '/register',
    component: AuthLayout,
    children: [
      {
        path: '',
        name: 'Register',
        component: () => import('@/pages/Register.vue'),
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          if (isAuthenticated()) {
            next('/')
          } else {
            next()
          }
        },
      },
    ],
  },
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/pages/Store.vue'),
        beforeEnter: (
          to: RouteLocationNormalized,
          from: RouteLocationNormalized,
          next: NavigationGuardNext
        ) => {
          if (!isAuthenticated()) {
            next('/login')
          } else {
            next()
          }
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: newRoutes,
})

export default router
