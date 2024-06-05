<script setup>
import { useUserStore } from '@/stores/userStore';
import { usePersStore } from '@/stores/persStore';
import { useUserController } from '@/composables/useUserController';
import Register from './Register.vue';
import LoginPassword from './LoginPassword.vue';
import LoginDNI from './LoginDNI.vue'
import { onMounted } from 'vue';

// Instancia el store y el controlador
const storePers = usePersStore();
const storeUser = useUserStore()


function login() {
  /*if (this.$refs.form.validate()) {
    this.$router.push('/dashboard');
  }*/
}

onMounted(()=>{
  console.log(storePers.pers)
})

</script>

<template>
<!--   <div>
    <h1>data</h1>
    <span>{{ storePers.pers }}</span>
    <span>{{ storeUser.user }}</span>
  </div> -->

<div v-if="storePers.pers && !storeUser.user">
    <Register />
</div>
<div v-else-if="storePers.pers && storeUser.user">
    <LoginPassword></LoginPassword>
</div>
<div v-else>
  <LoginDNI v-if="!storePers.pers" ></LoginDNI>
</div>
</template>

<style scoped>
.headline {
  font-weight: bold;
}
</style>
