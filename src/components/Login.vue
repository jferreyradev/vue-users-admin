<script setup>
import { ref, toValue } from 'vue'
import { useFetch } from '@/composables/fetch.js'
import { useUserStore } from '@/stores/users.js'

const store = useUserStore()

const localDni = ref('')

const URL_API = 'https://midliq-api-jr2sc3ef7gnx.deno.dev/api'

const { data, error, isPending, getData } = useFetch()

async function login() {
  //store.dni = localDni.value
  await getData(`${URL_API}/view/users?DNI=${localDni.value}`)
  if (data) {
    console.log(data)
    console.log(store.value)
  }
}
</script>

<template>
  <div>
    <input type="number" v-model="localDni" placeholder="DNI" />
    <button @click="login">Verificar</button>
    <div>
      <span v-if="data">{{ data }}</span>
      <span v-else-if="isPending">Verificando</span>
      <span v-else> No hay datos</span>
    </div>
  </div>
</template>
