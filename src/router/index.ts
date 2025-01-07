import { createRouter, createWebHistory,  type RouteLocationNormalized} from 'vue-router'
import { computed } from 'vue'
import { useAuthStore } from '@/stores'


const routes = [
  {
    name: 'Home',
    path: '/',
    redirect: '/auth'
  },
  {
    name: 'auth',
    path: '/auth',
    component: ()=> import('../views/auth/UsersPage.vue'),
    children: [
      {
        name: 'user-signup',
        path: '',
        component: ()=> import('../views/auth/SignupPage.vue')
      },
      {
        name: 'user-login',
        path: 'login',
        component: ()=>import('../views/auth/LoginPage.vue'),
        // component: ()=>import('../views/auth/ReferralRegister.vue'),
      },
    ],
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: ()=>import('../views/Dashboard.vue'),
    redirect: {name: 'overview'},
    children: [
      {
        name: 'overview',
        path: '',
        component: ()=>import('../components/pages/OverviewPage.vue')
      },
      {
        name: 'statistics',
        path: 'statistics',
        component: ()=>import('../components/pages/StatisticsPage.vue')
      },
      {
        name: 'transactions',
        path: 'transactions',
        component: ()=>import('../components/pages/TransactionsPage.vue')
      }
    ],
    meta: {
      requiresAuth: true
    }
  },

  {
    name: 'ReferralRegister',
    path: '/referral-register',
    component: ()=>import('../views/auth/ReferralRegister.vue'),
    props: (route: RouteLocationNormalized)=>{
      const { query } = route
      return {
        referrer: query.referrer
      }
    },
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'tncs',
    path: '/term-and-conditions',
    component: ()=>import('../components/TNCPage.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    name: 'not-found',
    path: '/:pathMatch(.*)*',
    component: ()=>import('../views/NotFoundPage.vue'),
    meta: {
      requiresAuth: false
    }


  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  const authStore = useAuthStore()
  const requiresAuth = to.meta.requiresAuth as boolean
  // const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  console.log(authStore.userIsLoggedIn)
  if(!requiresAuth){
    console.log(requiresAuth)
    console.log('no auth required')
    next()
  }
  else{
    if(!authStore.userIsLoggedIn){
      console.log('not logged in')
      console.log(authStore.userIsLoggedIn)
      next({
        name: 'user-login'
      })
    }
    else{
      console.log('logged in')
      next()
    }

  }
})

export default router
