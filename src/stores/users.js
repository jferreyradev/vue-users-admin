import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const dni = ref(0)
  const nombre = ref('')
  const apellido = ref('')
  const mail = ref('')
  const idus = ref(0)

  //const doubleCount = computed(() => count.value * 2)

  function setUser(id, dni, nombre, apellido, mail) {
    idus.value = id
    dni.value = dni
    nombre.value = nombre
    apellido.value = apellido
    mail.value = mail
  }

  return { setUser, dni, nombre, apellido, mail }
})
