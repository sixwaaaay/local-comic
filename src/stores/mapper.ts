import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUrlMapperStore = defineStore('urlMapper', () => {

  const baseUrl = ref('')

  //  load from local storage
  const localBaseUrl = localStorage.getItem('baseUrl')
  if (localBaseUrl) {
    setBaseUrl(localBaseUrl)
  }

  function setBaseUrl(url: string) {
    if (url.endsWith('/'))
      url = url.slice(0, -1) // remove trailing slash
    baseUrl.value = url
    localStorage.setItem('baseUrl', baseUrl.value)
  }


  return { baseUrl, setBaseUrl }
})