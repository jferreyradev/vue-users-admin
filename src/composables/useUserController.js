// src/composables/useUserController.js
import { ref } from 'vue';
import { useUserStore } from '../stores/userStore';

export const useUserController = () => {
    const userStore = useUserStore();
    const loading = ref('')
    const error = ref('')
    const data = ref(null)

    const fetchUser = async (userId) => {
        loading.value = true;
        error.value = null;
        const url_api = 'https://midliq-api-7g0abd0mn8x4.deno.dev'
        try {
            const response = await fetch(`${url_api}/api/view/users?DNI=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            console.log(response)
            const data = await response.json();
            userStore.setUser(data[0]);
            console.log(userStore.user)
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    const register = async (bodyIn)=>{
        loading.value = true;
        error.value = null;
        console.log(bodyIn)
        try {
            const requestOptions = {
                method: `POST`, // POST, etc
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyIn)
            }
            //const response = await fetch(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/sp/nuevoUsuario`,requestOptions);
            //const response = await fetch(`http://www.serverburru2.duckdns.org:3005/api/sp/nuevoUsuario`,requestOptions);
            const url_sp = 'https://midliq-api-a4anetp2t24n.deno.dev'
            const response = await fetch(`${url_sp}/user`,requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            console.log(response)
            data.value = await response.json();
            //userStore.setUser(data[0]);
            console.log(userStore.user)
            console.log(data.value)
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    const log = async (bodyIn)=>{
        loading.value = true;
        error.value = null;
        console.log(bodyIn)
        try {
            const requestOptions = {
                method: `POST`, // POST, etc
                headers: { 'Content-Type': 'application/json' },
                body: bodyIn
            }
            //const response = await fetch(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/sp/nuevoUsuario`,requestOptions);
            //const response = await fetch(`http://www.serverburru2.duckdns.org:3005/api/sp/nuevoUsuario`,requestOptions);
            const url_sp = 'https://midliq-api-a4anetp2t24n.deno.dev'
            const response = await fetch(`${url_sp}/log`,requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            console.log(response)
            data.value = await response.json();
            //userStore.setUser(data[0]);
            console.log(userStore.user)
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    const clearUser = () => {
        userStore.clearUser();
    };

    return {
        data,
        loading,
        error,
        fetchUser,
        clearUser,
        register,
        log
    };
};
