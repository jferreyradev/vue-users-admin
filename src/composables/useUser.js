// composables/useUser.js o composables/useUser.ts
import { computed, watch } from 'vue';
import { useUserStore } from '../stores/userStore';

export function useUser() {
  const userStore = useUserStore();

  const pers = computed(()=> userStore.pers );
  const isValid = computed(() => userStore.isValid);

  const user = computed(() => userStore.user);
  const isAuthenticated = computed(() => userStore.isAuthenticated);
  const userName = computed(() => userStore.userName);
  const loading = computed(() => userStore.loading);
  const error = computed(() => userStore.error);
  const success = computed(() => userStore.success);

  // Observa cambios en el estado del usuario
  watch(user, (newValue) => {
    console.log('El usuario ha cambiado:', newValue);
  });

  const setUser = (user) => {
    userStore.setUser(user);
  };

  const clearUser = () => {
    userStore.clearUser();
  };

  const fetchUser = async (v) => {
    await userStore.fetchUser(v);
  };

  const fetchPers = async (v) => {
    console.log('fetch ', v)
    await userStore.fetchPers(v);
  };

  return {
    pers,
    isValid,
    user,
    isAuthenticated,
    userName,
    loading,
    error,
    success,
    setUser,
    clearUser,
    fetchUser,
    fetchPers
  };
}