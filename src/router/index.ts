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
    component: ()=>import('../views/Dashboard.vue'),
    children: [
      {
        name: 'overview',
        path: '',
        component: ()=>import('../components/pages/OverviewPage.vue')
      }
    ]
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



export default router
