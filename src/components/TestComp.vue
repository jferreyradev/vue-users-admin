<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '../stores/userStore';
import { useUserController } from '../composables/useUserController';

// Instancia el store y el controlador
const store = useUserStore();
const { fetchUser, clearUser, loading, error } = useUserController();

// Monta el componente y llama a fetchUser
onMounted(() => {
  //fetchUser(1); // Asume que queremos obtener los datos del usuario con ID 1 al montar el componente
});

// Expone las propiedades del store y las funciones del controlador

</script>

<template>
  <div>
    <div v-if="loading">Cargando datos del usuario...</div>
    <div v-else-if="error">Error: {{ error }}</div>
    <div v-else-if="store.user">
      <h1>Bienvenido, {{ store.user }}</h1>
      <p>Email: {{  }}</p>
      <button @click="clearUser">Cerrar sesión</button>
    </div>
    <div v-else>
      <p>No se encontró al usuario.</p>
      <button @click="fetchUser('26579673')">Cargar Usuario</button>
    </div>
    
    
  </div>
</template>