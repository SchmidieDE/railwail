const api = (type: string, url: string, data: any) => {
  const baseUrl = process.env.BACKEND_URL

  return fetch(baseUrl + url, {
      method: type,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  })
}

export default api