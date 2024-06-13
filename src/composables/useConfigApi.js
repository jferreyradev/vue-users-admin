// composables/useApiConfig.js
import { ref, computed } from 'vue';

export function useApiConfig() {
  const baseUrl = ref('https://midliq-api-mkre08nv6x2j.deno.dev')
  //const baseUrlSp = 'https://midliq-api-we3b884fccey.deno.dev'
  //const baseUrl = ref('https://www.serverburru2.duckdns.org:3005/api');
  const endpoints = ref({
    users: '/users',
    user: '/user',
    //process: '/viewposts',
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
    setEndpoint,
  };
}