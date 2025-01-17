import { defineStore } from 'pinia'


export const useUrlStore = defineStore('urlMapper', {
  state: () => ({
    baseUrl: window.location.origin
  }),
  getters: {
    covertUrl: (state) => (url: string) => `${state.baseUrl}/img/${url}`,
    comicsUrl: (state) => `${state.baseUrl}/comics`,
    chaptersUrl: (state) => `${state.baseUrl}/comics/comics`,
  },
  actions: {
    setBaseUrl(url: string) {
      if (url.endsWith('/'))
        url = url.slice(0, -1) // remove trailing slash
      this.baseUrl = url
    }
  },
  persist: {
    storage: localStorage,
    key: 'baseUrl'
  }
})