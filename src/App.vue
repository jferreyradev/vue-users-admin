<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useUrls } from './composables/useUrls';
import { onMounted } from 'vue';
import { useUser } from '@/composables/useUser'

const router = useRouter()
const { setDesa } = useUrls()

const { reset } = useUser()

function HandleGetOut() {
  console.log('Salir')
  router.push('/')
  reset()
}

onMounted(() => {
  setDesa()
})

</script>

<template>

  <v-layout>
    <v-app-bar color="teal-darken-4">
      <!-- image="https://picsum.photos/1920/1080?random"> -->
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>

      <v-app-bar-title>Boletas - Municipalidad de Concepción</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-btn @click="HandleGetOut"> Salir </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <RouterView />
        </v-row>
      </v-container>
    </v-main>
    <v-footer name="footer" app>
      Contacto
    </v-footer>
  </v-layout>

</template>

<style scoped>
</style>
