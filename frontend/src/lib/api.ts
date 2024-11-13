


const api = (type: string, url: string, data: any) => {
  
  

  
  return fetch(url, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
}

export default api