<script setup>
import { ref } from 'vue';
import { usePersStore } from '../stores/persStore';
import { usePersController } from '../composables/usePersController';
import { useUserStore } from '@/stores/userStore';
import { useUserController } from '@/composables/useUserController';

// Instancia el store y el controlador
const store = usePersStore();
const { user } = useUserStore()
const { fetchPers, loading, error, verify } = usePersController();
const { fetchUser, setRegistred, registred } = useUserController();

// Expone las propiedades del store y las funciones del controlador
const dni = ref('')
const snackbar = ref(false)
const text = ref('')

async function fnverify() {

  await fetchPers(dni.value)
  console.log(store.pers)
  
  if (!verify){
    snackbar.value=true
    text.value = 'No hay datos para el DNI ingresado'
  }else{
    await fetchUser(dni.value)

    if(registred){
      console.log('Registrado')
      setRegistred(true)
    }else{
      console.log('NO Registrado')
      setRegistred(false)
    }
  }  
}

const rules = [
  value => {
    if (value?.length > 6 && /[0-9]+/.test(value)) return true
    return 'El DNI debe tener al menos 7 digitos'
  },
]

const submitBtn = ref();
const submit = () => submitBtn.value.click();

</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6" md="6">
        <v-card>
          <v-card-title>
            <span class="headline">Ingresar</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="fnverify">
              <v-text-field v-model="dni" :rules="rules" type="number" label="DNI" required></v-text-field>
            </v-form>
            <span v-if="loading">Verificando...</span>
            <span v-else-if="error">Ocurrio un error en la verificación</span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="fnverify">Verificar</v-btn>
            <button ref="submitBtn" type="submit" class="d-none">Submit</button>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <div>
      <v-snackbar
      v-model="snackbar"
    >
      {{ text }}

      <template v-slot:actions>
        <v-btn
          color="pink"
          variant="text"
          @click="snackbar = false"
        >
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
    </div>
  </v-container>
</template>