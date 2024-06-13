<script setup>
import { useUser } from '@/composables/useUser'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const {
  pers,
  user,
  loading,
  error,
  success,
  fetchPers,
  fetchUser,
  isAuthenticated,
  isValid,
  isRegistred,
  reset
} = useUser()

// Expone las propiedades del store y las funciones del controlador
const dni = ref('')
const snackbar = ref(false)

const text = ref('')
const showMessage = ref(false)
const password = ref('')

function fnreset() {
  console.log('Reset')
  reset()
  showMessage.value = false
  dni.value = ''

  console.log(pers.value, user.value)
}

async function fnverify() {
  console.log('Verificando ', dni.value)

  showMessage.value = true

  await fetchPers(dni.value)
  await fetchUser(dni.value)

  console.log(isValid.value, isRegistred.value)

  console.log(pers.value)
  console.log(user.value)
}

function fnlogin() {
  console.log(user.value?.PASSWORD)
  if (user.value?.PASSWORD === password.value) {
    console.log('A boletas')
    router.push('/boletas')
  }
}

function handleRegister() {
  console.log('a Registro')
  router.push('/register')
}

const rules = [
  (value) => {
    if (value?.length > 6 && /[0-9]+/.test(value)) return true
    return 'El DNI debe tener al menos 7 digitos'
  }
]

const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) => v.length >= 6 || 'Password must be at least 6 characters'
]

const submitBtn = ref()
const submit = () => submitBtn.value.click()

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
              <v-text-field :disabled="!isRegistred" class="mt-5" v-model="password" :rules="passwordRules"
                label="Password" type="password" required></v-text-field>
            </v-form>
            <span v-if="loading">Verificando...</span>
            <!-- <span v-else-if="error">Ocurrio un error en la verificación</span> -->

            <div>
              <div class="mt-5">
                <span v-if="pers && isValid"> El DNI corresponde a un empleado del municipio. </span>
                <span v-else-if="pers"> El DNI NO corresponde a un empleado del municipio. </span>
                <span v-else>Debe ingresar su DNI para la verificación.</span>
              </div>

              <div class="mt-5" v-if="user">
                <div v-if="isRegistred">
                  <span>El DNI está registrado como usuario.</span>
                </div>
              </div>
              <div v-if="pers && !isRegistred ">
                <span>No se encuentra registrado como usuario. ¿Desea hacerlo? </span>
                <div class="d-flex justify-space-evenly mt-5">
                  <v-btn color="primary" @click="handleRegister">Si</v-btn>
                  <v-btn @click="fnreset" color="primary">No</v-btn>
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="fnreset">Cancelar</v-btn>
            <v-spacer></v-spacer>
            <v-btn v-if="!pers" color="primary" @click="fnverify">Verificar</v-btn>
            <button ref="submitBtn" type="submit" class="d-none">Submit</button>

            <v-btn v-if="pers && isValid" color="primary" @click="fnlogin">Ingresar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
   
  </v-container>

  <div>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:actions>
        <v-btn color="pink" variant="text" @click="snackbar = false"> Cerrar </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
