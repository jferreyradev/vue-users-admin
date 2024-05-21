<script setup>
import { onMounted } from 'vue';
import { usePersStore } from '../stores/persStore';
import { usePersController } from '../composables/usePersController';

// Instancia el store y el controlador
const store = usePersStore();
const { fetchPers, clearPers, loading, error } = usePersController();

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
    <div v-else-if="store.pers">
      <h1>Bienvenido, {{ store.pers }}</h1>
      <p>Email: {{  }}</p>
      <button @click="clearPers">Cerrar sesión</button>
    </div>
    <div v-else>
      <p>No se encontró al usuario.</p>
      <button @click="fetchPers('26506523')">Cargar Usuario</button>
    </div>
    
    
  </div>
</template>