


const api = (type: string, url: string, data: any) => {
  
  

  
  const baseUrl = import.meta.env.VITE_BACKEND_URL 
  
  console.log(baseUrl, "BASE URL")


  return fetch(baseUrl + url, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
}

export default api