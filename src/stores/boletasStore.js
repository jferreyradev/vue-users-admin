import { defineStore } from 'pinia'
import { useApiConfig } from '@/composables/useConfigApi'

const { baseUrl } = useApiConfig()

export const useBoletasStore = defineStore('boletas', {
    state: () => ({
        boletas: null, // Estado inicial del usuario
        loading: false,
        error: null,
        success: false
    }),
    getters: {
        isRegistred: (state) => !!state.user,
        isAuthenticated: (state) => !!state.auth,
        isValid: (state) => !!state.pers,
        userName: (state) => state.user?.name || ''
    },
    actions: {
        async fetchBoletas(dni) {
            this.loading = true
            this.error = null
            this.success = false

            try {
                const response = await fetch(`${baseUrl.value}/boletas/${dni}`) // Cambia la URL a la de tu API
                if (!response.ok) {
                    throw new Error('Error fetching user')
                }
                const data = await response.json()
                this.boletas = data
                this.success = true
            } catch (error) {
                this.error = error.message
            } finally {
                this.loading = false
            }
        },
        async setBoleta(bodyIn) {
            this.loading = true
            this.error = null
            console.log(bodyIn)
            try {
                const requestOptions = {
                    method: `POST`, // POST, etc
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(bodyIn)
                }
                await fetch(`${baseUrl.value}/estadoBoleta`, requestOptions)

            } catch (err) {
                this.error = err
                console.log(err)
            } finally {
                this.loading = false
            }
        },
        clearBoletas() {
            this.boletas = null
            this.success = false
        },

    }
})