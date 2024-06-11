<script setup>
import { RouterView, useRouter } from 'vue-router'
import { useUrls } from './composables/useUrls';
import { onMounted } from 'vue';
import { useUser } from '@/composables/useUser'

const router = useRouter()
const { setDesa } = useUrls()

const {reset} = useUser()

function HandleGetOut() {
  reset()
  router.push('/')
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
      <v-btn class="mx-auto" variant="text" > Get data </v-btn>
    </v-footer>
  </v-layout>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
