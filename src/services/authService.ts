// const URL_BASE = 'http://localhost:3000/api/'
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE
export const loginUser = async (email:string, password: string) => {

    try {
        const response = await fetch(API_URL_BASE + 'auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include'
                
            }
        )
        if(!response.ok){
            throw new Error('Error al iniciar sesión')
        }
        return await response.json()
        
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}


export const registerUser = async (name:string, surname:string, email:string, password: string, role:string, course:string) => {

    try {
        const response = await fetch(API_URL_BASE + 'auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, surname, email, password, role, course }),
                credentials: 'include'
                
            }
        )
        if(!response.ok){
            throw new Error('Error al registrarse')
        }
        return response.json()
        
    } catch (error) {
        const msg = error instanceof Error ? error.message : 'Error desconocido'
        throw new Error(msg)
    }
}