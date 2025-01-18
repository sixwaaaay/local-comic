import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUrlStore = defineStore('urlMapper', () => {
  const baseUrl = ref(window.location.origin)
  return {
    baseUrl,
    covertUrl: computed(() => (url: string) => `${baseUrl.value}/img/${url}`),
    comicsUrl: computed(() => `${baseUrl.value}/comics`),
    chaptersUrl: computed(() => `${baseUrl.value}/comics/comics`),
    imagesUrl: computed(() => `${baseUrl.value}/comics/chapters`),
    setBaseUrl: (url: string) => {
      if (url.endsWith('/'))
        url = url.slice(0, -1); // remove trailing slash
      baseUrl.value = url;
    }
  }
}, { persist: { storage: localStorage, key: 'baseUrl' } });