<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'


const router = useRouter()

const userStore = useUserStore()
const { loading, result } = storeToRefs(userStore)

const password = ref('')
const newPassword = ref('')
const repassword = ref('')

const dialog = ref(false)
const text = ref('')

const dialogConfirm = ref(false)

const visiblepass = ref(false)
const visiblenewpass = ref(false)
const visiblepassre = ref(false)

const overlay = ref(false)

const rules = {
    password: [
        value => {
            if (value?.length >= 4) return true
            return 'La clave debe tener al menos 4 caracteres.'
        },
        value => {
            if (/^(?=.*[a-zA-Z])(?=.*\d).{4,}$/.test(value)) return true
            return 'La clave debe tener al menos un número y un caracter.'
        }
    ]
}

async function handlePasswordChange() {
    if (userStore.checkPassword(password.value)) {
        if (userStore.checkPassword(newPassword.value)) {
            text.value = 'No puede usar la misma contraseña que la actual.'
            dialog.value = true
        } else if (newPassword.value !== repassword.value) {
            text.value = 'Los entradas para la nueva contraseña no coinciden.'
            dialog.value = true
        } else {
            console.log('Listo para el cambio')
            try {
                dialogConfirm.value = false
                overlay.value = true
                await userStore.changePassword(newPassword.value)
                overlay.value = false
                text.value = 'El cambio de contraseña fue exitoso.\n Ahora sera dirigido a la pantalla de acceso para ingresar.'
                dialog.value = true
                //userStore.$reset()
                //router.push('/')
            } catch (error) {
                console.log(error)
                text.value = 'Hubo un error en el cmabio de contraseña.'
                dialog.value = true
            }
        }
    } else {
        text.value = 'La contraseña actual ingresada no es correcta.'
        dialog.value = true
    }
}

async function handleConfirm() {
    dialog.value = false
    if (result) {
        userStore.$reset()
        router.push('/')
    }

}

</script>

<template>
    <v-card class="elevation-12 mx-auto" max-width="344">
        <v-toolbar dark color="primary">
            <v-toolbar-title class="ma-5">Registro de usuario para consultas de boletas</v-toolbar-title>
        </v-toolbar>
        <v-progress-linear color="primary" height="6" indeterminate rounded :active="loading"></v-progress-linear>
        <v-card-text>
            <form ref="form" @submit.prevent="handlePasswordChange()">
                <v-text-field v-model="password" name="password" label="Contraseña actual" placeholder="Contraseña"
                    required :rules="rules.password" :append-inner-icon="visiblepass ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visiblepass ? 'text' : 'password'"
                    @click:append-inner="visiblepass = !visiblepass"></v-text-field>
                <v-text-field v-model="newPassword" name="password" label="Nueva contraseña"
                    placeholder="Repetir la nueva contraseña" required
                    :append-inner-icon="visiblepassre ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visiblenewpass ? 'text' : 'password'" :rules="rules.password"
                    @click:append-inner="visiblenewpass = !visiblenewpass"></v-text-field>
                <v-text-field v-model="repassword" name="password" label="Repetir contraseña"
                    placeholder="Repetir contraseña" required
                    :append-inner-icon="visiblepassre ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visiblepassre ? 'text' : 'password'" :rules="rules.password"
                    @click:append-inner="visiblepassre = !visiblepassre"></v-text-field>
                <v-btn type="submit" class="mt-4" color="primary" value="save">Guardar</v-btn>
            </form>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="router.go(-1)" color="deep-purple-accent-4" text="Cancelar" variant="text"></v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="auto">
        <v-card max-width="400" prepend-icon="mdi-update" :text="text" title="Información">
            <template v-slot:actions>
                <v-btn class="ms-auto" text="Ok" @click="handleConfirm"></v-btn>
            </template>
        </v-card>
    </v-dialog>

    <v-overlay :model-value="overlay" persistent class="align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate :active="loading"></v-progress-circular>
    </v-overlay>

</template>