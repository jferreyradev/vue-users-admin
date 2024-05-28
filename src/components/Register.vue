<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { useUserController } from '@/composables/useUserController';
import { usePersStore } from '../stores/persStore';
import { usePersController } from '@/composables/usePersController';

// Instancia el store y el controlador
const store = usePersStore();
const user = useUserStore()

const { fetchUser, clearUser, register } = useUserController()
const { clearPers } = usePersController()

// Expone las propiedades del store y las funciones del controlador

const pass = ref('')
const mail = ref('')
const pass2 = ref('')

const snackbar = ref(false)
const text = ref('')

async function login() {
    const body = {
        'DNI': store.pers.DNI,
        'Usuario': '',
        'Clave': pass,
        'Mail': mail,
        'Estado': 1,
        'Rol': 1,
        'App': 1
    }
    console.log(body)
    await register(body)
}

const rules = [
    value => {
        if (value?.length > 6 && /[0-9]+/.test(value)) return true
        return 'El DNI debe tener al menos 7 digitos'
    },
]
const emailRules = [
    value => {
        if (value) return true

        return 'Debe ingresar su E-mail.'
    },
    value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'El E-mail debe ser válido.'
    },
]
const submitBtn = ref();
const submit = () => submitBtn.value.click();

</script>

<template>
    <v-container>
        <v-row justify="center" v-if="store.pers">
            <v-col cols="6" md="6">
                <v-card>
                    <v-card-title>
                        <h3>Nuevo usuario</h3>
                        <span class="headline">{{ store.pers.APELLIDO }} , {{ store.pers.NOMBRE }}</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" @submit.prevent="login">
                            <v-text-field type="email" v-model="mail" :rules="emailRules" label="email"
                                required></v-text-field>
                            <v-text-field type="password" v-model="pass" label="Password" required></v-text-field>
                            <v-text-field type="password" v-model="pass2" label="Re Password" required></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="secondary" @click="clearPers">Volver</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Registrar e ingresar</v-btn>
                        <button ref="submitBtn" type="submit" class="d-none">Submit</button>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>

    </v-container>
            <div>
            <v-snackbar v-model="snackbar">
                {{ text }}

                <template v-slot:actions>
                    <v-btn color="pink" variant="text" @click="snackbar = false">
                        Cerrar
                    </v-btn>
                </template>
            </v-snackbar>
        </div>
</template>