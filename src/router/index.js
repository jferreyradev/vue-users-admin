import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUpView.vue')
    },
    {
      path: '/boletas',
      name: 'boletas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/BoletasView.vue')
    }
  ]
})

router.beforeEach((to,from, next) => {

  const useUser = useUserStore()
  const { auth } = storeToRefs(useUser)

  const publicPages = ['/','/login','/signup']
  const authRequired = !publicPages.includes(to.path)
  
  if (authRequired && !auth.value ) {
    console.log('To Login')
    return next('/login')
  }
  //router.push('/')
  next()
})

export default router