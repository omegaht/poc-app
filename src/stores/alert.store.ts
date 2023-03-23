import { defineStore } from 'pinia'

interface Alert {
  type: string
  message: string
}

interface State {
  alert: Alert | null
}

export const useAlertStore = defineStore({
  id: 'alert',
  state: (): State => ({
    alert: null
  }),
  actions: {
    success(message: string) {
      this.alert = { message, type: 'alert-success' }
    },
    error(message: string) {
      this.alert = { message, type: 'alert-danger' }
    },
    clear() {
      this.alert = null
    }
  }
})
