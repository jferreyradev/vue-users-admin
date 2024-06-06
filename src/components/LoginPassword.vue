<script setup>
import { ref } from 'vue';
import { usePersStore } from '../stores/persStore';
import { usePersController } from '../composables/usePersController';
import { useUserStore } from '@/stores/userStore';
import { useUserController } from '@/composables/useUserController';
import { useRouter } from 'vue-router'
const router = useRouter()


// Instancia el store y el controlador
const store = usePersStore();
const { user } = useUserStore()
const { fetchPers, loading, error, clearPers, verify } = usePersController();
const { fetchUser, auth, setAuth } = useUserController()

// Expone las propiedades del store y las funciones del controlador

const snackbar = ref(false)
const text = ref('')

const password = ref('')

function fnverify() {
  /*await fetchPers(dni.value)
  if (!store.pers){
    snackbar.value=true
    text.value = 'No hay datos para el DNI ingresado'
  }else{
    await fetchUser(dni.value)
    if(user.user){
      console.log('Registrado')
    }else{
      console.log('NO Registrado')
    }
  }*/
  console.log(user.ID)
  console.log(user.PASSWORD)
  console.log(password.value)
  console.log('Aca hay que verificar el password')

  if (user.PASSWORD === password.value) {
    setAuth(true)
    //router.push('boletas')
  }
    
}

const passwordRules = [
  v => !!v || 'Password is required',
  v => v.length >= 6 || 'Password must be at least 6 characters',
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
            <span class="headline">Login</span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" @submit.prevent="verify" >
              <v-text-field v-model="password" :rules="passwordRules" label="Password" type="password"
                required></v-text-field>
            </v-form>
            <span v-if="loading">Verificando...</span>
            <span v-else-if="error">Ocurrio un error en la verificación</span>
          </v-card-text>
          <v-card-actions>
            <v-btn color="secondary" @click="clearPers">Volver</v-btn>
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