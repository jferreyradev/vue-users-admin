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

const login = async () => {
    await user.login(userdni.value, password.value)
    attempts.value++
    if (!auth.value) {
        text.value = 'El DNI o la contraseña ingresada es incorrecta.'
        dialog.value = true
    }
    console.log(auth.value)
    await boletas.fetchBoletas(userdni.value)
    router.push('boletas')
}

function handleNewUser() {
    router.push('signup')
}
</script>

<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title class="ma-5">Ingreso a boletas del empleado</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear color="primary" height="6" indeterminate rounded :active="loading"></v-progress-linear>
        <v-card-text>
            <form ref="form" @submit.prevent="login()">
                <v-text-field v-model="userdni" name="userdni" label="DNI" type="number" placeholder="Nro. de DNI"
                    required></v-text-field>

                <v-text-field v-model="password" name="password" label="Contraseña" type="password"
                    placeholder="Contraseña" required></v-text-field>
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

</template>
