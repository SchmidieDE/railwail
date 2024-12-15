/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

const baseUrl = import.meta.env.VITE_BASE_URL

const api = {
  request: async (method: string, url: string, data?: any) => {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      mode: 'cors',
      credentials: 'include'
    }

    if (data) {
      options.body = JSON.stringify(data)
    }

    return fetch(`/api${url}`, options)
  },

  get: (url: string) => {
    return api.request('GET', url)
  },

  post: (url: string, data: any) => {
    return api.request('POST', url, data)
  },

  put: (url: string, data: any) => {
    return api.request('PUT', url, data)
  },

  delete: (url: string) => {
    return api.request('DELETE', url)
  }
}

export default api