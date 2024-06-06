// src/stores/userStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  
  const setUser = (userData) => {
    user.value = userData;
  };

  const clearUser = () => {
    user.value = null;
  };

  return {    
    user,
    setUser,
    clearUser
  };
});

