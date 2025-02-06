const fetchAPI = async (endPoint: string, options = {}) => {
    try {
      const response = await fetch(endPoint, options);

      if(response.status === 401) {
        window.location.href = '/login'
        throw new Error('Sesion expirada, inicia sesion nuevamente')
    }

      if(!response.ok) {
        const errorData = await response.json().catch(()=> null)
        throw new Error(errorData?.message || 'Error desconocido')
      }
  
      const data = await response.json()
      return data
  
    } catch (error) {
        throw new Error(error instanceof Error? error.message : 'Error desconocido')
    }
  }

  export default fetchAPI