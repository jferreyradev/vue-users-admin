<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useUrls } from './composables/useUrls';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const user = useUserStore()
const { loading, error, success, auth } = storeToRefs(user)

const router = useRouter()
const { setDesa } = useUrls()

function handleLogout() {

  console.log('Salir')
  user.$reset()
  router.push('/')

}

onMounted(() => {
  setDesa()
})

</script>

<template>

  <v-layout class="rounded rounded-md d-flex flex-column mb-6 ">
    <v-app-bar >
      <v-app-bar-title >Boletas - Municipalidad de Concepción</v-app-bar-title>

      <v-spacer></v-spacer>
      <v-menu >
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>

            <v-list>
              <v-list-item title="Perfil" @click="()=>console.log('Perfil')"/>
              <v-list-item title="Cambio de contraseña" @click="()=>console.log('Cambio de contraseña')"/>
              <v-list-item title="Salir" @click="()=>console.log('Salir')" />
            </v-list>
          </v-menu>
      <v-btn class="bg-blue-darken-2" @click="handleLogout" v-show="auth"> Salir </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <RouterView />
        </v-row>
      </v-container>
    </v-main>
    <v-footer>
    <v-row justify="center" no-gutters>
      <v-col class="text-center ma-1" cols="6">
        {{ new Date().getFullYear() }} — <strong>Tucumán</strong>
      </v-col>
    </v-row>
  </v-footer>

  </v-layout>
  <!-- 
  <v-layout>
    <v-app-bar color="teal-darken-4">
      
      <template v-slot:image>
        <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
      </template>


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
-->
</template>

<style scoped></style>
