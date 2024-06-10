// stores/userStore.js o stores/userStore.ts
import { defineStore } from 'pinia'
import { useApiConfig } from '@/composables/useConfigApi'

const { baseUrl, getUserEndpoint, getPersEndpoint } = useApiConfig()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Estado inicial del usuario
    pers:null,
    loading: false,
    error: null,
    success: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,    
    isValid: (state) => !!state.pers,
    userName: (state) => state.user?.name || ''
  },
  actions: {
    async fetchUser(dni) {
      this.loading = true
      this.error = null
      this.success = false

      try {

        console.log('try user', dni, `https://midliq-api-seayym7b0jcy.deno.dev/user/${dni}`)

        const response = await fetch(`https://midliq-api-seayym7b0jcy.deno.dev/user/${dni}`) // Cambia la URL a la de tu API
        if (!response.ok) {
          throw new Error('Error fetching user')
        }
        const data = await response.json()
        this.user = data[0]
        this.success = true
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },

    setUser(user) {
      this.user = user
      this.success = true
    },
    clearUser() {
      this.user = null
      this.success = false
    },

    async fetchPers(dni) {
      this.loading = true
      this.error = null
      this.success = false
      try {        
        
        console.log('try pers', dni, `https://midliq-api-seayym7b0jcy.deno.dev/persona/${dni}`)

        const response = await fetch(
          `https://midliq-api-seayym7b0jcy.deno.dev/persona/${dni}`)

        if (!response.ok) {
          throw new Error('Error fetching user')
        }
        const data = await response.json()
        this.pers = data[0]
        this.success = true
        console.log(data[0])
      } catch (error) {
        this.error = error.message
        console.log(error.message)
      } finally {
        this.loading = false
      }
    }
  }
})
