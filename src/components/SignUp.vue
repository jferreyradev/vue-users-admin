<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'


const router = useRouter()

const userStore = useUserStore()
const { loading, error, success, auth, allowSign, user } = storeToRefs(userStore)



const userdni = ref('')
const orden = ref('')
const email = ref('')
const password = ref('')
const repassword = ref('')
const attempts = ref(0)

const dialog = ref(false)
const text = ref('')

const dialogConfirm = ref(false)
const textConfirm = ref('')


const signup = async () => {
    await userStore.verifyRegister(userdni.value, orden.value)
    attempts.value++
    if (!allowSign.value) {
        if (!user.value) {
            text.value = 'El DNI o el número de boleta ingresado es incorrecto.'
            dialog.value = true
        } else {
            console.log('El DNI ya se encuentra registrado')
            text.value = 'El DNI ya se encuentra registrado.'
            dialog.value = true
        }

        /*
        console.log(auth.value)
        await boletas.fetchBoletas(userdni.value)
        router.push('boletas')
        */
    }else{
        textConfirm.value = 'Los datos ingresados fueron verificados y puede continuar.\n ¿Desea registrar el usuario?'
        dialogConfirm.value = true
    }
}

async function handleConfirm() {
    const body = {
        'DNI': userdni.value ,
        'Usuario': email.value.split('@')[0] ,
        'Clave': password.value,
        'Mail': email.value,
        'Estado': 1,
        'Rol': 1,
        'App': 1
    }

    try {
        dialogConfirm.value=false
        await userStore.register(body)
        text.value = 'El usuario fue registrado exitosamente.\n Ahora sera dirigido a la pantalla de acceso para ingresar.'
        dialog.value = true
        userStore.$reset()
        router.push('/')
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <v-card class="elevation-12">
        <v-toolbar dark color="primary">
            <v-toolbar-title class="ma-5">Registro de usuario para consultas de boletas</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear color="primary" height="6" indeterminate rounded :active="loading"></v-progress-linear>
        <v-card-text>
            <form ref="form" @submit.prevent="signup()">
                <v-text-field v-model="userdni" name="userdni" label="DNI" type="number" placeholder="Nro. de DNI"
                    required></v-text-field>
                <v-text-field v-model="orden" name="orden" label="Nro. Boleta" type="number"
                    placeholder="Nro. de Boleta" required></v-text-field>
                <v-text-field v-model="email" name="email" label="email" type="email" placeholder="e-mail"
                    required></v-text-field>
                <v-text-field v-model="password" name="password" label="Contraseña" type="password"
                    placeholder="Contraseña" required></v-text-field>
                <v-text-field v-model="repassword" name="password" label="Repetir contraseña" type="password"
                    placeholder="Repetir contraseña" required></v-text-field>
                <v-btn type="submit" class="mt-4" color="primary" value="log in">Registrar</v-btn>
            </form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="router.push('/login')" color="deep-purple-accent-4" text="Cancelar" variant="text"></v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" prepend-icon="mdi-update" :text="text" title="Información">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="dialog = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirm" width="auto">
        <v-card max-width="400" prepend-icon="mdi-update" :text="textConfirm" title="Confirmación">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Si" @click="handleConfirm"></v-btn>
                <v-btn class="ms-auto" text="No" @click="dialogConfirm = false"></v-btn>
            </template>
        </v-card>
    </v-dialog>

</template>