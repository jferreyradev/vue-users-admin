// composables/useApiConfig.js
import { ref, computed } from 'vue';

export function useApiConfig() {
  const baseUrl = 'https://midliq-api-a4anetp2t24n.deno.dev'
  const baseUrlSp = 'https://midliq-api-we3b884fccey.deno.dev'
  //const baseUrl = ref('https://www.serverburru2.duckdns.org:3005/api');
  const endpoints = ref({
    user: '/view/users',
    //process: '/viewposts',
    pers: '/personas',
    per: '/persona',
  });

  const getUserEndpoint = computed(() => `${baseUrl.value}${endpoints.value.user}`);
  //const getPostsEndpoint = computed(() => `${baseUrl.value}${endpoints.value.posts}`);
  const getPersEndpoint = computed(() => `${baseUrl.value}${endpoints.value.pers}`);

  //const getPersEndpoint = computed(() => `${baseUrl.value}${endpoints.value.pers}`);

  const setBaseUrl = (url) => {
    baseUrl.value = url;
  };

  const setEndpoint = (key, endpoint) => {
    endpoints.value[key] = endpoint;
  };

  return {
    baseUrl,
    endpoints,
    getUserEndpoint,
    getPersEndpoint,
    setBaseUrl,
    setEndpoint,
  };
}