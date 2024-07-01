<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

import { useBoletasStore } from '@/stores/boletasStore';
const boletas = useBoletasStore()

const router = useRouter()

const user = useUserStore()
const { loading, error, success, auth } = storeToRefs(user)

const userdni = ref('')
const password = ref('')
const attempts = ref(0)

const dialog = ref(false)
const text = ref('')

const visiblepass = ref(false)
const overlay = ref(false)

const dnirules = [
    value => {
        if (value?.length > 6 && /[0-9]+/.test(value)) return true
        return 'El DNI debe tener al menos 7 digitos'
    }
]

const login = async () => {
    overlay.value=true
    await user.login(userdni.value, password.value)
    overlay.value=false
    attempts.value++
    if (!auth.value) {
        text.value = 'El DNI o la contraseña ingresada es incorrecta.'
        dialog.value = true
    } else {
        overlay.value=true
        await boletas.fetchBoletas(userdni.value)
        overlay.value=false
        router.push('boletas')
    }


}

function handleNewUser() {
    router.push('signup')
}
</script>

<template>
    <v-card class="elevation-12 mx-auto" max-width="344">
        <v-toolbar dark color="primary">
            <v-toolbar-title class="ma-5">Ingreso a boletas del empleado</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear color="primary" height="6" indeterminate rounded :active="loading"></v-progress-linear>
        <v-card-text>
            <form ref="form" @submit.prevent="login()">
                <v-text-field v-model.trim="userdni" name="userdni" label="DNI" type="number" placeholder="Nro. de DNI"
                    required :rules="dnirules"></v-text-field>

                <v-text-field v-model.trim="password" name="password" label="Contraseña" placeholder="Contraseña" required
                    :append-inner-icon="visiblepass ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visiblepass ? 'text' : 'password'"
                    @click:append-inner="visiblepass = !visiblepass"></v-text-field>
                <v-btn type="submit" class="mt-4" color="primary" value="log in">Login</v-btn>
            </form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="handleNewUser" color="deep-purple-accent-4" text="Nuevo usuario" variant="text"></v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" prepend-icon="mdi-update" :text="text" title="Información">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-overlay
      :model-value="overlay"
      persistent
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
        :active="loading"
      ></v-progress-circular>
    </v-overlay>


</template>
