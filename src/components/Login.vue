<script setup>
import Register from './Register.vue'
import LoginPassword from './LoginPassword.vue'
import LoginDNI from './LoginDNI.vue'
import LiqBoletas from './LiqBoletas.vue'

import { usePersController } from '../composables/usePersController'
import { useUserController } from '@/composables/useUserController'

const { verify } = usePersController()
const { logged, registred } = useUserController()

//const persStore = usePersStore()

//const { auth, user } = useUserStore()

function login() {
  /*if (this.$refs.form.validate()) {
    this.$router.push('/dashboard');
  }*/
}
</script>

<template>
  <v-container fluid>
    <v-row>
      <LoginDNI v-if="!verify" />
      <Register v-else-if="!registred" />
      <LoginPassword v-else />
    </v-row>
    <v-row>
      <LiqBoletas v-if="logged" />
    </v-row>
  </v-container>

  <!-- <v-container fluid>
        <v-row v-if="pers && !storeUser.user">
          <Register />
        </v-row>
        <v-row v-else-if="pers && storeUser.user">
          <LoginPassword />
        </v-row>
        <v-row v-else>
          <LoginDNI />
        </v-row>
      </v-container> -->
</template>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
