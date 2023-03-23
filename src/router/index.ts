import { useAuthStore, useAlertStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/session/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/detail/:pokemonId/',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
      props: true
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue')
    }
  ]
})

router.beforeEach(async (to) => {
  const alertStore = useAlertStore()
  alertStore.clear()

  const publicPages = ['/']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (to.path === '/' && authStore.user) {
    return '/home'
  }

  if (authRequired && !authStore.user) {
    return '/'
  }
})

export default router
