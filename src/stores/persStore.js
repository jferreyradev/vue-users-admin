import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePersStore = defineStore('pers', () => {
  const pers = ref(null)
  
  const setPers = (persData) => {
    pers.value = persData;
    console.log('------')
    console.log(pers.value)    
  };

  const clearPers = () => {
    pers.value = null;
  };

  return {
    pers,
    setPers,
    clearPers
  };
});
