// composables/useApiConfig.js
import { ref, computed } from 'vue';

export function getBoletasHeaders() {
  return {
    'Content-Type': 'application/json',
    'x-project-key': 'Burru',
    'x-project-port': '3003'
  }
}

export function useApiConfig() {
  const baseUrl = ref('https://dno-mid-boletas.jferreyradev.deno.net')
  const endpoints = ref({
    users: '/users',
    user: '/user',
    pers: '/personas',
    per: '/persona',
  });

  const getBaseEndPoint = computed(()=>`${baseUrl.value}`)

  const getUserEndpoint = computed(() => `${baseUrl.value}${endpoints.value.user}`);
  //const getPostsEndpoint = computed(() => `${baseUrl.value}${endpoints.value.posts}`);
  const getPersEndpoint = computed(() => `${baseUrl.value}${endpoints.value.per}`);

  //const getPersEndpoint = computed(() => `${baseUrl.value}${endpoints.value.pers}`);

  const setBaseUrl = (url) => {
    baseUrl.value = url;
  };

  const setEndpoint = (key, endpoint) => {
    endpoints.value[key] = endpoint;
  };

  return {
    baseUrl,
    getBaseEndPoint,
    endpoints,
    getUserEndpoint,
    getPersEndpoint,
    setBaseUrl,
    setEndpoint, getBoletasHeaders
  };
}
