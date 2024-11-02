import { createRouter, createWebHistory } from 'vue-router'
import { computed } from 'vue'

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
        path: '/login',
        component: ()=>import('../views/auth/LoginPage.vue')
      }
    ]
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: ()=>import('../views/Dashboard.vue')
  },
  {
    name: 'tncs',
    path: '/term-and-conditions',
    component: ()=>import('../components/TNCPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next)=>{
//   const excludedRoutes = [
//     'user-signup',
//     'dashboard'
//   ] as string[]

  // const isExcludedRoute = computed(()=> excludedRoutes.includes(to.name as string))

// })



export default router
