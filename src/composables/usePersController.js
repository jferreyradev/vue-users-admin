// src/composables/useUserController.js
import { ref } from 'vue';
import { usePersStore } from '../stores/persStore';
import {useUrls} from './useUrls';

export const usePersController = () => {
    const persStore = usePersStore();
    const loading = ref('')
    const error = ref('')
    const data = ref(null)
    const url_api = 'https://midliq-api-7g0abd0mn8x4.deno.dev' //desa conc

    //const {url_api} = useUrls()

    const fetchPers = async (userId) => {
        loading.value = true;
        error.value = null;
        try {
            const response = await fetch(`${url_api}/api/view/personaLista?Documento=${userId}`);
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
