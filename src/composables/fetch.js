// fetch.js
import { ref, watchEffect } from 'vue'

export function useFetch() {
  const error = ref(null)
  const isPending = ref(false)
  const data = ref({})

  async function getData(url, type, body) {
    isPending.value = true
    data.value = null
    error.value = null

    let requestOptions

    if (body) {
      requestOptions = {
        method: `${type}`, // POST, etc
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    }

    fetch(url, requestOptions ? requestOptions : null)
      .then((res) => res.json())
      .then((_data) => {
        data.value = _data
        isPending.value = false
      })
      .catch((err) => {
        error.value = err
        isPending.value = false
      })
  }

  /*
  watchEffect(() => {
    console.log('WatchEffect')
    if (getUrl()) {
      isPending.value = true
      data.value = null
      error.value = null

      let requestOptions

      if (body) {
        requestOptions = {
          method: `${type}`, // POST, etc
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      }

      fetch(getUrl(), requestOptions ? requestOptions : null)
        .then((res) => res.json())
        .then((_data) => {
          data.value = _data
          isPending.value = false
        })
        .catch((err) => {
          error.value = err
          isPending.value = false
        })
    }
  })
  */

  return { data, error, isPending, getData }
}
