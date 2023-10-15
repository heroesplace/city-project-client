import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import GameView from '../views/GameView.vue'

import { useAuth } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/game',
      name: 'game',
      component: GameView
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { checkToken } = useAuth()

  const publicPages = ['login', 'register']

  const authRequired = !publicPages.includes(to.name)

  checkToken().then((isAuthenticated) => {
    console.log("[router] isAuthenticated: " + isAuthenticated)

    if (authRequired && !isAuthenticated) {
      next({ name: 'login' })
    } else if (!authRequired && isAuthenticated) {
      next({ name: 'game' })
    } else {
      next()
    }
  }).catch(() => {
    if (authRequired) {
      next({ name: 'login' })
    } else {
      next()
    }
  })
})

export default router
