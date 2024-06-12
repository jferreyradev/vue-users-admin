// composables/useUser.js o composables/useUser.ts
import { computed, watch } from 'vue'
import { useUserStore } from '../stores/userStore'

export function useUser() {
  const userStore = useUserStore()

  const pers = computed(() => userStore.pers)
  const user = computed(() => userStore.user)

  const isValid = computed(() => userStore.isValid)
  const isAuthenticated = computed(() => userStore.isAuthenticated)
  const isRegistred = computed(() => userStore.isRegistred)

  const userName = computed(() => userStore.userName)
  const loading = computed(() => userStore.loading)
  const error = computed(() => userStore.error)
  const success = computed(() => userStore.success)

  // Observa cambios en el estado del usuario
  watch(user, (newValue) => {
    console.log('El usuario ha cambiado:', newValue)
  })

  const setUser = (user) => {
    userStore.setUser(user)
  }

  const setPers = (pers) => {
    userStore.setPers(pers)
  }

  const clearUser = () => {
    userStore.clearUser()
  }

  const clearPers = () => {
    userStore.clearPers()
  }

  const fetchUser = async (v) => {
    await userStore.fetchUser(v)
  }

  const fetchPers = async (v) => {
    await userStore.fetchPers(v)
  }

  const reset = () => {
    console.log('reset desde composable')
    userStore.clearUser()
    userStore.clearPers()
  }

  const register = async (b) => {
    userStore.register(b)
  }

  return {
    pers,
    user,
    isValid,
    isAuthenticated,
    isRegistred,
    userName,
    loading,
    error,
    success,
    setUser,
    setPers,
    clearUser,
    clearPers,
    fetchUser,
    fetchPers,
    reset,
    register
  }
}
