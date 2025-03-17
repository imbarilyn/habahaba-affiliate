import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized, type RouteLocationNormalizedLoaded
} from 'vue-router'
import { useAuthStore } from '@/stores'

const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/auth',
  },
  {
    name: 'auth',
    path: '/auth',
    component: () => import('../views/auth/UsersPage.vue'),
    children: [
      {
        name: 'user-signup',
        path: '',
        component: () => import('../views/auth/SignupPage.vue'),
        beforeEnter: (to:RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext)=>{
          const authStore = useAuthStore()
          if(authStore.everLoggedIn){
            console.log('ever logged in')
            next({
              name: 'user-login'
            })
          }
          else {
            next()
          }
        }
      },
      {
        name: 'user-login',
        path: 'login',
        component: () => import('../views/auth/LoginPage.vue'),
      },
      {
        name: 'forgot-password',
        path: 'forgot-password',
        component: ()=>import('../views/auth/ForgotPassword.vue')
      },
      {
        name: 'reset-password',
        path: 'reset-password',
        component: ()=>import('../views/auth/ResetPassword.vue'),
        props: (route: RouteLocationNormalized)=>{
          const { query } = route
          return {
            accessToken: query.accessToken,
          }
        }
      }
    ],
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue'),
    redirect: { name: 'overview' },
    children: [
      {
        name: 'overview',
        path: '',
        component: () => import('../components/pages/OverviewPage.vue'),
      },
      {
        name: 'statistics',
        path: 'statistics',
        component: () => import('../components/pages/StatisticsPage.vue'),
      },
      {
        name: 'transactions',
        path: 'transactions',
        component: () => import('../components/pages/TransactionsPage.vue'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },

  {
    name: 'ReferralRegister',
    path: '/referral-register',
    component: () => import('../views/auth/ReferralRegister.vue'),
    props: (route: RouteLocationNormalizedLoaded) => {
      const { query } = route
      return {
        referrer: query.referrer,
      }
    },
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: 'tncs',
    path: '/term-and-conditions',
    component: () => import('../components/TNCPage.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFoundPage.vue'),
    meta: {
      requiresAuth: false,
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth as boolean
  // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (!requiresAuth) {
    next()
  } else {
    if (!authStore.userIsLoggedIn) {
      next({
        name: 'user-login',
      })
    } else {
      next()
    }
  }
})

export default router
