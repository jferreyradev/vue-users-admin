// stores/userStore.js o stores/userStore.ts
import { defineStore } from 'pinia'
import { useApiConfig } from '@/composables/useConfigApi'

const { baseUrl } = useApiConfig()

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // Estado inicial del usuario
    pers: null,
    loading: false,
    result: '',
    error: null,
    success: false,
    auth: false,
    allowSign: false
  }),
  getters: {
    isRegistred: (state) => !!state.user,
    isAuthenticated: (state) => !!state.auth,
    isValid: (state) => !!state.pers,
    userName: (state) => state.user?.name || '',
    checkPassword(state) {
      return (pass) => (atob(state.user?.PASSWORD) || '') === pass
    },
  },
  actions: {
    async login(dni, pass) {
      await this.fetchUser(dni)
      if (this.user) {
        if (atob(this.user?.PASSWORD) === pass) this.auth = true
      }
    },
    async verifyRegister(dni, orden) {
      await this.fetchUser(dni)
      if (!this.user) {
        await this.fetchPersCargo(dni)
        if (this.pers?.ORDEN == orden) this.allowSign = true
      }
    },
    async getData(dni) {
      this.fetchUser(dni)
    },
    async fetchUser(dni) {
      this.loading = true
      this.error = null
      this.success = false
      this.user = null
      this.auth = false
      try {
        console.log('try user', dni, `${baseUrl.value}/user/${dni}`)

        const response = await fetch(`${baseUrl.value}/user/${dni}`) // Cambia la URL a la de tu API
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

    setPers(pers) {
      this.pers = pers
      this.success = true
    },
    setUser(user) {
      this.user = user
      this.success = true
    },
    clearUser() {
      this.user = null
      this.success = true
    },
    clearPers() {
      this.pers = null
      this.success = true
    },

    async fetchPers(dni) {
      this.loading = true
      this.error = null
      this.success = false
      this.pers = null
      this.allowSign = false
      try {
        console.log('try pers', dni, `${baseUrl.value}/persona/${dni}`)

        const response = await fetch(`${baseUrl.value}/persona/${dni}`)

        if (!response.ok) {
          throw new Error('Error fetching user')
        }
        const data = await response.json()
        this.pers = data[0]
        this.success = true
        console.log('------ Persona')
        console.log(this.pers)
      } catch (error) {
        this.error = error.message
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },

    async fetchPersCargo(dni) {
      this.loading = true
      this.error = null
      this.success = false
      this.pers = null
      this.allowSign = false
      try {
        console.log('try pers', dni, `${baseUrl.value}/personacargo/${dni}`)

        const response = await fetch(`${baseUrl.value}/personacargo/${dni}`)

        if (!response.ok) {
          throw new Error('Error fetching user')
        }
        const data = await response.json()
        this.pers = data[0]
        this.success = true
        console.log('------ Persona')
        console.log(this.pers)
      } catch (error) {
        this.error = error.message
        console.log(error.message)
      } finally {
        this.loading = false
      }
    },

    async register(bodyIn) {
      this.loading = true
      this.error = null
      bodyIn.Clave = btoa(bodyIn.Clave)
      console.log(bodyIn)
      try {
        const requestOptions = {
          method: `POST`, // POST, etc
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyIn)
        }
        //const response = await fetch(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/sp/nuevoUsuario`,requestOptions);
        //const response = await fetch(`http://www.serverburru2.duckdns.org:3005/api/sp/nuevoUsuario`,requestOptions);
        //const url_sp = 'https://midliq-api-a4anetp2t24n.deno.dev'
        //const url_sp = 'https://midliq-api-a4anetp2t24n.deno.dev'
        await fetch(`${baseUrl.value}/user`, requestOptions)
        //console.log(response)
        //data.value = await response.json();
        //userStore.setUser(data[0]);
        //console.log(userStore.user)
        //console.log(data.value)
        //const data = await response.json()
        //data.value = {status:'OK'}
        //this.perso = data[0]
        //this.logged = true
      } catch (err) {
        this.error = err
        console.log(err)
      } finally {
        this.loading = false
      }
    },

    async changePassword(newPass) {
      this.loading = true
      this.error = null

      console.log(this.user.ID, newPass)
      try {
        const bodyIn = {
          'IdUsuario': this.user.ID,
          'Clave': btoa(newPass)
        }
        const requestOptions = {
          method: `POST`, // POST, etc
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyIn)
        }
        const res = await fetch(`${baseUrl.value}/claveUsuario`, requestOptions)
        console.log(res)
        this.result = res
      } catch (err) {
        this.error = err
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
})
