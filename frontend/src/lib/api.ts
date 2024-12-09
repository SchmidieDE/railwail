


const baseUrl = process.env.VITE_BASE_URL

const api = async (method: string, url: string, data: any) => {
  
  

  
  return fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        accept: "application/json"
      },
      body: JSON.stringify(data)
  })
}

export default api