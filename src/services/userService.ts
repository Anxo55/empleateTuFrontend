// const URL_BASE = 'http://localhost:3000/api/'
const API_URL_BASE = import.meta.env.VITE_API_BASE_URL
export const getUsers = async () => {
    try {
        const response = await fetch(API_URL_BASE + '/users/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(!response) {
            throw new Error('Fallo al obtener los usuarios')
        }
        return await response.json()
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}