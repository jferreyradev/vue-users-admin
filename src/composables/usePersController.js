// src/composables/useUserController.js
import { ref } from 'vue';
import { usePersStore } from '../stores/persStore';

export const usePersController = () => {
    const persStore = usePersStore();
    const loading = ref('')
    const error = ref('')
    const data = ref(null)

    const fetchPers = async (userId) => {
        loading.value = true;
        error.value = null;
        try {
            console.log(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/view/personaLista?Documento=${userId}`)
            const response = await fetch(`https://midliq-api-jr2sc3ef7gnx.deno.dev/api/view/personaLista?Documento=${userId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            
            const data = await response.json();
            console.log(data)
            persStore.setPers(data[0]);
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };

    const clearPers = () => {
        persStore.clearPers();
    };

    return {
        data,
        loading,
        error,
        fetchPers,
        clearPers,
    };
};
