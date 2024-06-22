import { ref } from 'vue'

export const useUrls = () => {
  //const url_desa = 'https://midliq-api-7g0abd0mn8x4.deno.dev'
  const url_desa = 'https://midliq-api-4jq97kh2395g.deno.dev'
  const url_sp_desa = 'https://midliq-api-we3b884fccey.deno.dev'

  const url_api = ref('')
  const url_sp = ref('')

  function setDesa() {
    url_api.value = url_desa
    url_sp.value = url_sp_desa

    console.log(`ep: ${url_api.value}`)
  }

  return { url_api, url_sp, setDesa }
}
