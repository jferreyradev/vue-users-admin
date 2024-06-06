<script setup lang="ts">
import Login from '@/components/Login.vue'
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
      <v-btn> Salir </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <span> Se verifica si el DNI es válido en el sistema. </span>
        </v-row>
        <v-row>
          <Login />
        </v-row>
      </v-container>
    </v-main>
    <v-footer name="footer" app>
      <v-btn class="mx-auto" variant="text" > Get data </v-btn>
    </v-footer>
  </v-layout>
</template>
