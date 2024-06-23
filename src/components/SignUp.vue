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

const visiblepass = ref(false)
const visiblepassre = ref(false)

const rules = {
    number: [
        value => {
            if (value?.length > 0) return true
            return 'Debe ingresar un número.'
        },
        value => {
            if (/[0-9]/.test(value)) return true
            return 'El nro de boleta debe contener digitos solamente.'
        },
    ],
    email: [
        value => {
            //if (/^[a-z.-][0-9]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true
            if (/.+@.+\..+/.test(value)) return true
            return 'El e-mail debe ser válido.'
        },
        value => {
            if (value) return true
            return 'Debe ingresar su E-mail.'
        }
    ],
    dni: [
        value => {
            if (value?.length > 6 && /[0-9]+/.test(value)) return true
            return 'El DNI debe tener al menos 7 digitos'
        }
    ],
    password: [
        value => {
            if (value?.length>=4) return true
            return 'La clave debe tener al menos 4 caracteres.'
        },
        value => {
            if (/^(?=.*[a-zA-Z])(?=.*\d).{4,}$/.test(value)) return true
            return 'La clave debe tener al menos un número y un caracter.'
        }
    ]
}

const signup = async () => {
    if (password.value === repassword.value) {
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
        } else {
            textConfirm.value = 'Los datos ingresados fueron verificados y puede continuar.\n ¿Desea registrar el usuario?'
            dialogConfirm.value = true
        }
    }else{
        text.value = 'Las contraseñas no coinciden. Revise por favor.'
        dialog.value = true
    }
}

async function handleConfirm() {
    const body = {
        'DNI': userdni.value,
        'Usuario': email.value.split('@')[0],
        'Clave': password.value,
        'Mail': email.value,
        'Estado': 1,
        'Rol': 1,
        'App': 1
    }

    try {
        dialogConfirm.value = false
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
                    required :rules="rules.dni"></v-text-field>
                <v-text-field v-model="orden" name="orden" label="Nro. Boleta" type="number"
                    placeholder="Nro. de Boleta" required :rules="rules.number"></v-text-field>
                <v-text-field v-model="email" name="email" label="email" type="email" placeholder="e-mail" required
                    :rules="rules.email"></v-text-field>
                <v-text-field v-model="password" name="password" label="Contraseña" placeholder="Contraseña" required
                    :rules="rules.password"
                    :append-inner-icon="visiblepass ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visiblepass ? 'text' : 'password'"
                    @click:append-inner="visiblepass = !visiblepass"></v-text-field>
                <v-text-field v-model="repassword" name="password" label="Repetir contraseña"
                    placeholder="Repetir contraseña" required
                    :append-inner-icon="visiblepassre ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visiblepassre ? 'text' : 'password'"
                    @click:append-inner="visiblepassre = !visiblepassre"></v-text-field>
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