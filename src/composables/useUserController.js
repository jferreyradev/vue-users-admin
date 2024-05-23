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
        try {
            console.log(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/view/users?DNI=${userId}`)
            const response = await fetch(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/view/users?DNI=${userId}`);
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

    const register = async (body)=>{
        loading.value = true;
        error.value = null;
        try {
            const requestOptions = {
                method: `POST`, // POST, etc
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({body})
            }
            const response = await fetch(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/sp/nuevoUsuario`,requestOptions);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            console.log(response)
            const data = await response.json();
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
        register
    };
};
