import router from '@/router'
import { defineStore } from 'pinia'

interface SessionState {
  user: {
    email: string
    password: string
  } | null
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): SessionState => {
    try {
      const session = localStorage.getItem('session')
      if (session) {
        return {
          user: JSON.parse(session)
        }
      }
      return { user: null }
    } catch (error) {
      return { user: null }
    }
  },

  actions: {
    login(email: string, password: string) {
      this.user = {
        email,
        password
      }
      try {
        localStorage.setItem('session', JSON.stringify(this.user))
        return router.push('/home')
      } catch (error) {
        console.log('Something went wrong, writing in localStorage', error)
      }
    },
    logout(): void {
      this.user = null
      localStorage.removeItem('session')
      localStorage.removeItem('favorites')
    }
  }
})
