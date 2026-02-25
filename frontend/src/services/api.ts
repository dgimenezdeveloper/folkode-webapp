export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

/**
 * Función genérica para hacer fetch con manejo de errores y Content-Type automático.
 * Por defecto asume que enviamos JSON, a menos que sea FormData.
 */
export async function fetchApi<T>(
    endpoint: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_URL}${endpoint}`

    const headers = new Headers(options.headers || {})

    // Agregar token de autorización si lo tienes en el frontend (ej. NextAuth session)
    // const token = obtenerTokenDeDondeSea()
    // if (token) headers.set('Authorization', `Bearer ${token}`)

    // Si el body NO es FormData, enviamos Application/JSON
    if (options.body && !(options.body instanceof FormData)) {
        headers.set('Content-Type', 'application/json')
        if (typeof options.body !== 'string') {
            options.body = JSON.stringify(options.body)
        }
    }

    const config: RequestInit = {
        ...options,
        headers,
    }

    const response = await fetch(url, config)

    // Manejo de códigos 204 No Content
    if (response.status === 204) {
        return {} as T
    }

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || `Error status: ${response.status}`)
    }

    return data
}
