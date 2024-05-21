// src/composables/useFetch.js
import { ref } from 'vue';

export function useFetch() {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const fetchData = async (url,type,body) => {
        loading.value = true;
        error.value = null;
        try {
            let requestOptions
            if (body) {
                requestOptions = {
                    method: `${type}`, // POST, etc
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                }
            }
            const response = await fetch(url,requestOptions ? requestOptions : null);
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            }
            data.value = await response.json();
        } catch (err) {
            error.value = err.message;
        } finally {
            loading.value = false;
        }
    };

    return { data, error, loading, fetchData };
}
