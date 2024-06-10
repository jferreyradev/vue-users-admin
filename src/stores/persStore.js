import { defineStore } from 'pinia'
import { useApiConfig } from '@/composables/useConfigApi'

const { baseUrl, getUserEndpoint, getPersEndpoint } = useApiConfig()

export const usePersStore = defineStore('pers', {
  state: () => ({    
    pers:null,
    loading: false,
    error: null,
    success: false
  }),
  getters: {    
    isValid: (state) => !!state.pers,
    userName: (state) => state.user?.name || ''
  },
  actions: {
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
        console.log(this.pers)
      } catch (error) {
        this.error = error.message
        console.log(error.message)
      } finally {
        this.loading = false
      }
    }
  }
})