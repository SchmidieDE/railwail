/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}




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

    const token = localStorage.getItem('token')
    if (token) {
      // USE FUCKING TOKEN NOT BEARED BECAUSE OF KNOW !!
      options.headers['Authorization'] = `Token ${token}`
      // Send token in header if it exists everytime 
      // it will only be checked on backend if valid by knox!
    }

    

    if (data) {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(`/api${url}`, options)
    if (response.status === 401) {
      localStorage.removeItem('token')
      if (url !== '/login/') {
        //console.log('redirecting to login', url)
        // only if user is not already on login page 
        window.location.href = '/login' // user will be redirected of token is tampered instantly not after next request 
      }
      return new Response('Unauthorized', { status: 401 })
    }
    return response
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