// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const auth = ref(false)
  
  const setUser = (userData) => {
    user.value = userData;
  };

  const clearUser = () => {
    user.value = null;
  };

  const setAuth = () => {
    auth.value = true
  }

  const clearAuth = () => {
    auth.value = false
  }

  return {
    auth,
    setAuth,
    clearAuth,
    user,
    setUser,
    clearUser
  };
});

